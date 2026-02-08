import { unstable_cache } from "next/cache";
import type {
  GitHubRepo,
  ContributionDay,
  PullRequest,
  GitHubStats,
  MonthlyActivity,
  CommitEvent,
  OpenSourcePageData,
} from "@/lib/data/github-types";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_USERNAME = "AhmadYasser1";

// ─── GraphQL Helper ───

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN not configured");

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const remaining = res.headers.get("X-RateLimit-Remaining");
    if (remaining === "0") throw new Error("GitHub rate limit exceeded");
    throw new Error(`GitHub GraphQL error: ${res.status}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ─── GraphQL Queries ───

const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalRepositoriesWithContributedCommits
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
        nodes {
          stargazerCount
        }
      }
    }
  }
`;

const REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
            updatedAt
            isArchived
          }
        }
      }
      repositories(
        first: 20
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage { name color }
          updatedAt
          isArchived
        }
      }
    }
  }
`;

const PRS_QUERY = `
  query($query: String!) {
    search(query: $query, type: ISSUE, first: 20) {
      issueCount
      nodes {
        ... on PullRequest {
          title
          url
          state
          createdAt
          mergedAt
          additions
          deletions
          repository {
            nameWithOwner
            url
          }
        }
      }
    }
  }
`;

const COMMITS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(
        first: 5
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          nameWithOwner
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 5) {
                  nodes {
                    message
                    committedDate
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── Data Transformations ───

interface RawContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

function calculateLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function transformContributions(
  weeks: Array<{ contributionDays: RawContributionDay[] }>
): ContributionDay[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: calculateLevel(day.contributionCount),
    }))
  );
}

function aggregateMonthlyActivity(
  days: ContributionDay[]
): MonthlyActivity[] {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const monthMap = new Map<string, number>();

  for (const day of days) {
    const date = new Date(day.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    monthMap.set(key, (monthMap.get(key) || 0) + day.count);
  }

  const entries = Array.from(monthMap.entries());
  // Take last 12 months
  const recent = entries.slice(-12);

  return recent.map(([key, commits]) => {
    const monthIdx = parseInt(key.split("-")[1]);
    return {
      month: months[monthIdx],
      commits,
      pullRequests: 0, // Will be enriched with PR data
      yearMonth: key,
    };
  });
}

// ─── Cached Fetch Functions ───

interface ContributionsResponse {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalRepositoriesWithContributedCommits: number;
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{ contributionDays: RawContributionDay[] }>;
      };
    };
    repositories: {
      totalCount: number;
      nodes: Array<{ stargazerCount: number }>;
    };
  };
}

interface ReposResponse {
  user: {
    pinnedItems: {
      nodes: Array<GitHubRepo & { __typename?: string }>;
    };
    repositories: {
      nodes: Array<GitHubRepo & { __typename?: string }>;
    };
  };
}

interface PRsResponse {
  search: {
    issueCount: number;
    nodes: Array<{
      title: string;
      url: string;
      state: "OPEN" | "MERGED" | "CLOSED";
      createdAt: string;
      mergedAt: string | null;
      additions: number;
      deletions: number;
      repository: {
        nameWithOwner: string;
        url: string;
      };
    }>;
  };
}

interface CommitsResponse {
  user: {
    repositories: {
      nodes: Array<{
        name: string;
        nameWithOwner: string;
        defaultBranchRef: {
          target: {
            history: {
              nodes: Array<{
                message: string;
                committedDate: string;
                url: string;
              }>;
            };
          };
        } | null;
      }>;
    };
  };
}

async function fetchContributions(): Promise<ContributionsResponse> {
  return graphqlFetch<ContributionsResponse>(CONTRIBUTIONS_QUERY, {
    username: GITHUB_USERNAME,
  });
}

async function fetchRepos(): Promise<ReposResponse> {
  return graphqlFetch<ReposResponse>(REPOS_QUERY, {
    username: GITHUB_USERNAME,
  });
}

async function fetchPullRequests(): Promise<PRsResponse> {
  return graphqlFetch<PRsResponse>(PRS_QUERY, {
    query: `is:pr author:${GITHUB_USERNAME} -user:${GITHUB_USERNAME}`,
  });
}

async function fetchCommits(): Promise<CommitsResponse> {
  return graphqlFetch<CommitsResponse>(COMMITS_QUERY, {
    username: GITHUB_USERNAME,
  });
}

export const getCachedContributions = unstable_cache(
  fetchContributions,
  ["github-contributions"],
  { revalidate: 300, tags: ["github"] }
);

export const getCachedRepos = unstable_cache(
  fetchRepos,
  ["github-repos"],
  { revalidate: 300, tags: ["github"] }
);

export const getCachedPullRequests = unstable_cache(
  fetchPullRequests,
  ["github-prs"],
  { revalidate: 300, tags: ["github"] }
);

export const getCachedCommits = unstable_cache(
  fetchCommits,
  ["github-commits"],
  { revalidate: 300, tags: ["github"] }
);

// ─── Aggregator ───

const EMPTY_DATA: OpenSourcePageData = {
  repos: [],
  pullRequests: [],
  stats: {
    totalContributions: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalRepos: 0,
    totalStars: 0,
  },
  contributionDays: [],
  monthlyActivity: [],
  recentCommits: [],
  fetchedAt: new Date().toISOString(),
};

export async function getOpenSourceData(): Promise<OpenSourcePageData> {
  if (!process.env.GITHUB_TOKEN) {
    return EMPTY_DATA;
  }

  const [contribResult, reposResult, prsResult, commitsResult] =
    await Promise.allSettled([
      getCachedContributions(),
      getCachedRepos(),
      getCachedPullRequests(),
      getCachedCommits(),
    ]);

  // Extract contributions
  const contrib =
    contribResult.status === "fulfilled" ? contribResult.value : null;
  const contribCollection = contrib?.user.contributionsCollection;
  const calendar = contribCollection?.contributionCalendar;

  const contributionDays = calendar
    ? transformContributions(calendar.weeks)
    : [];

  const totalStars =
    contrib?.user.repositories.nodes.reduce(
      (sum, r) => sum + r.stargazerCount,
      0
    ) ?? 0;

  // Extract repos
  const reposData =
    reposResult.status === "fulfilled" ? reposResult.value : null;
  const pinnedNames = new Set(
    reposData?.user.pinnedItems.nodes.map((r) => r.name) ?? []
  );
  const pinned = (reposData?.user.pinnedItems.nodes ?? []).filter(
    (r) => !r.isArchived
  );
  const starred = (reposData?.user.repositories.nodes ?? []).filter(
    (r) => !r.isArchived && !pinnedNames.has(r.name)
  );
  const repos: GitHubRepo[] = [...pinned, ...starred].slice(0, 12);

  // Extract PRs
  const prsData =
    prsResult.status === "fulfilled" ? prsResult.value : null;
  const pullRequests: PullRequest[] = (prsData?.search.nodes ?? [])
    .filter((pr) => pr.title && pr.repository)
    .map((pr) => ({
      title: pr.title,
      url: pr.url,
      state: pr.mergedAt
        ? ("merged" as const)
        : (pr.state.toLowerCase() as "open" | "closed"),
      createdAt: pr.createdAt,
      mergedAt: pr.mergedAt,
      repository: pr.repository,
      additions: pr.additions ?? 0,
      deletions: pr.deletions ?? 0,
    }));

  // Extract commits
  const commitsData =
    commitsResult.status === "fulfilled" ? commitsResult.value : null;
  const recentCommits: CommitEvent[] = (
    commitsData?.user.repositories.nodes ?? []
  )
    .flatMap((repo) =>
      (repo.defaultBranchRef?.target.history.nodes ?? []).map((commit) => ({
        message: commit.message.split("\n")[0], // First line only
        committedDate: commit.committedDate,
        url: commit.url,
        repository: { nameWithOwner: repo.nameWithOwner },
      }))
    )
    .sort(
      (a, b) =>
        new Date(b.committedDate).getTime() -
        new Date(a.committedDate).getTime()
    )
    .slice(0, 15);

  // Build monthly activity
  const monthlyActivity = aggregateMonthlyActivity(contributionDays);

  // Enrich monthly activity with PR counts
  for (const pr of pullRequests) {
    const date = new Date(pr.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const monthEntry = monthlyActivity.find((m) => m.yearMonth === key);
    if (monthEntry) {
      monthEntry.pullRequests += 1;
    }
  }

  const stats: GitHubStats = {
    totalContributions: calendar?.totalContributions ?? 0,
    totalCommits: contribCollection?.totalCommitContributions ?? 0,
    totalPRs: prsData?.search.issueCount ?? pullRequests.length,
    totalRepos:
      contrib?.user.repositories.totalCount ?? repos.length,
    totalStars,
  };

  return {
    repos,
    pullRequests,
    stats,
    contributionDays,
    monthlyActivity,
    recentCommits,
    fetchedAt: new Date().toISOString(),
  };
}
