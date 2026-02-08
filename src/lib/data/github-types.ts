// ─── GitHub GraphQL Response Types ───

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
  isArchived: boolean;
  isFork: boolean;
}

export interface ContributionDay {
  date: string; // "YYYY-MM-DD"
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface PullRequest {
  title: string;
  url: string;
  state: "merged" | "open" | "closed";
  createdAt: string;
  mergedAt: string | null;
  repository: {
    nameWithOwner: string;
    url: string;
  };
  additions: number;
  deletions: number;
}

export interface GitHubStats {
  totalContributions: number;
  totalCommits: number;
  totalPRs: number;
  totalRepos: number;
}

export interface MonthlyActivity {
  month: string; // "Jan", "Feb", etc.
  commits: number;
  pullRequests: number;
  yearMonth: string; // "2024-5" for year-month key
}

export interface CommitEvent {
  message: string;
  committedDate: string;
  url: string;
  repository: {
    nameWithOwner: string;
  };
}

// ─── Aggregated Page Data ───

export interface OpenSourcePageData {
  repos: GitHubRepo[];
  pullRequests: PullRequest[];
  stats: GitHubStats;
  contributionDays: ContributionDay[];
  monthlyActivity: MonthlyActivity[];
  recentCommits: CommitEvent[];
  fetchedAt: string; // ISO timestamp
}
