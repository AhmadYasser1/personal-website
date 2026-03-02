import type { AuditConfig } from "../config";
import type { BehavioralData, BehavioralPageData } from "../types";

/**
 * Fetch behavioral data from PostHog Query API.
 *
 * Uses the HogQL query endpoint to aggregate session and event data
 * into a format compatible with the audit pipeline.
 *
 * Auth: Personal API key via Authorization header
 */
export async function collectPostHogData(
  config: AuditConfig,
): Promise<BehavioralData> {
  const { apiKey, projectId, endpoint, numDays } = config.posthog;
  const baseUrl = `${endpoint}/api/projects/${projectId}`;

  const [sessions, events, pages] = await Promise.all([
    querySessionMetrics(baseUrl, apiKey, numDays),
    queryEventMetrics(baseUrl, apiKey, numDays),
    queryTopPages(baseUrl, apiKey, numDays),
  ]);

  return {
    deadClicks: events.deadClicks,
    rageClicks: events.rageClicks,
    excessiveScrolls: events.excessiveScrolls,
    quickbackClicks: events.quickbackClicks,
    scriptErrors: events.scriptErrors,
    errorClicks: events.errorClicks,
    averageScrollDepth: events.averageScrollDepth,
    totalSessions: sessions.totalSessions,
    botSessions: 0,
    distinctUsers: sessions.distinctUsers,
    pagesPerSession: sessions.pagesPerSession,
    totalEngagementTime: sessions.totalEngagementTime,
    activeEngagementTime: sessions.activeEngagementTime,
    topPages: pages,
  };
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

interface SessionMetrics {
  totalSessions: number;
  distinctUsers: number;
  pagesPerSession: number | null;
  totalEngagementTime: number | null;
  activeEngagementTime: number | null;
}

async function querySessionMetrics(
  baseUrl: string,
  apiKey: string,
  numDays: number,
): Promise<SessionMetrics> {
  const query = `
    SELECT
      count(DISTINCT $session_id) as total_sessions,
      count(DISTINCT person_id) as distinct_users,
      avg(session_duration) as avg_session_duration
    FROM events
    WHERE timestamp > now() - interval ${numDays} day
      AND $session_id IS NOT NULL
  `;

  const result = await hogqlQuery(baseUrl, apiKey, query);
  const row = result?.results?.[0] ?? [];

  return {
    totalSessions: Number(row[0]) || 0,
    distinctUsers: Number(row[1]) || 0,
    pagesPerSession: null,
    totalEngagementTime: Number(row[2]) || null,
    activeEngagementTime: null,
  };
}

interface EventMetrics {
  deadClicks: number;
  rageClicks: number;
  excessiveScrolls: number;
  quickbackClicks: number;
  scriptErrors: number;
  errorClicks: number;
  averageScrollDepth: number | null;
}

async function queryEventMetrics(
  baseUrl: string,
  apiKey: string,
  numDays: number,
): Promise<EventMetrics> {
  const query = `
    SELECT
      countIf(event = '$autocapture' AND properties.$event_type = 'rageclick') as rage_clicks,
      countIf(event = '$autocapture' AND properties.$event_type = 'deadclick') as dead_clicks,
      countIf(event = '$exception') as script_errors
    FROM events
    WHERE timestamp > now() - interval ${numDays} day
  `;

  const result = await hogqlQuery(baseUrl, apiKey, query);
  const row = result?.results?.[0] ?? [];

  return {
    rageClicks: Number(row[0]) || 0,
    deadClicks: Number(row[1]) || 0,
    scriptErrors: Number(row[2]) || 0,
    excessiveScrolls: 0,
    quickbackClicks: 0,
    errorClicks: 0,
    averageScrollDepth: null,
  };
}

async function queryTopPages(
  baseUrl: string,
  apiKey: string,
  numDays: number,
): Promise<BehavioralPageData[]> {
  const query = `
    SELECT
      properties.$current_url as url,
      count() as page_views,
      count(DISTINCT $session_id) as sessions
    FROM events
    WHERE event = '$pageview'
      AND timestamp > now() - interval ${numDays} day
    GROUP BY url
    ORDER BY page_views DESC
    LIMIT 10
  `;

  const result = await hogqlQuery(baseUrl, apiKey, query);
  const rows = result?.results ?? [];

  return rows.map((row: unknown[]) => ({
    title: String(row[0] ?? ""),
    pageViews: Number(row[1]) || 0,
    sessions: Number(row[2]) || 0,
  }));
}

// ---------------------------------------------------------------------------
// HogQL query executor
// ---------------------------------------------------------------------------

interface HogQLResult {
  results: unknown[][];
}

async function hogqlQuery(
  baseUrl: string,
  apiKey: string,
  query: string,
): Promise<HogQLResult> {
  const response = await fetch(`${baseUrl}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kind: "HogQLQuery",
      query: query.trim(),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `PostHog API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<HogQLResult>;
}
