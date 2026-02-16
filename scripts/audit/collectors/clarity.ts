import type { AuditConfig } from "../config";
import type {
  ClarityApiResponse,
  ClarityData,
  ClarityMetricEntry,
  ClarityPageData,
} from "../types";

/**
 * Fetch behavioral data from Microsoft Clarity Data Export API.
 *
 * Endpoint: /export-data/api/v1/project-live-insights
 * Auth: Bearer JWT token
 * Rate limit: 10 calls/project/day
 *
 * Returns a flat array of metric entries. We normalize this into a
 * structured ClarityData object for downstream consumption.
 */
export async function collectClarityData(
  config: AuditConfig,
): Promise<ClarityData> {
  const url = new URL(config.clarity.endpoint);
  url.searchParams.set("numOfDays", String(config.clarity.numDays));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.clarity.apiToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Clarity API error: ${response.status} ${response.statusText}`,
    );
  }

  const raw: ClarityApiResponse = await response.json();
  return parseClarityResponse(raw);
}

// ---------------------------------------------------------------------------
// Parsing helpers
// ---------------------------------------------------------------------------

function findMetric(
  data: ClarityApiResponse,
  name: string,
): ClarityMetricEntry | undefined {
  return data.find((m) => m.metricName === name);
}

function getSessionCount(entry: ClarityMetricEntry | undefined): number {
  if (!entry?.information?.[0]) return 0;
  const info = entry.information[0];
  if ("sessionsCount" in info && typeof info.sessionsCount === "string") {
    return parseInt(info.sessionsCount, 10) || 0;
  }
  return 0;
}

function parseClarityResponse(raw: ClarityApiResponse): ClarityData {
  // Session-based metrics (dead clicks, rage clicks, etc.)
  const deadClicks = getSessionCount(findMetric(raw, "DeadClickCount"));
  const rageClicks = getSessionCount(findMetric(raw, "RageClickCount"));
  const excessiveScrolls = getSessionCount(findMetric(raw, "ExcessiveScroll"));
  const quickbackClicks = getSessionCount(findMetric(raw, "QuickbackClick"));
  const scriptErrors = getSessionCount(findMetric(raw, "ScriptErrorCount"));
  const errorClicks = getSessionCount(findMetric(raw, "ErrorClickCount"));

  // Scroll depth
  const scrollEntry = findMetric(raw, "ScrollDepth");
  const scrollInfo = scrollEntry?.information?.[0];
  const averageScrollDepth: number | null =
    scrollInfo && "averageScrollDepth" in scrollInfo
      ? (scrollInfo.averageScrollDepth as number | null) ?? null
      : null;

  // Traffic
  const trafficEntry = findMetric(raw, "Traffic");
  const trafficInfo = trafficEntry?.information?.[0];
  let totalSessions = 0;
  let botSessions = 0;
  let distinctUsers = 0;
  let pagesPerSession: number | null = null;

  if (trafficInfo && "totalSessionCount" in trafficInfo) {
    totalSessions = parseInt(trafficInfo.totalSessionCount as string, 10) || 0;
    botSessions =
      parseInt(trafficInfo.totalBotSessionCount as string, 10) || 0;
    distinctUsers = parseInt(trafficInfo.distinctUserCount as string, 10) || 0;
    pagesPerSession =
      (trafficInfo.pagesPerSessionPercentage as number | null) ?? null;
  }

  // Engagement
  const engagementEntry = findMetric(raw, "EngagementTime");
  const engagementInfo = engagementEntry?.information?.[0];
  let totalEngagementTime: number | null = null;
  let activeEngagementTime: number | null = null;

  if (engagementInfo && "totalTime" in engagementInfo) {
    totalEngagementTime = (engagementInfo.totalTime as number | null) ?? null;
    activeEngagementTime = (engagementInfo.activeTime as number | null) ?? null;
  }

  // Popular pages
  const pagesEntry = findMetric(raw, "PopularPages");
  const topPages: ClarityPageData[] = (pagesEntry?.information ?? [])
    .filter(
      (info): info is Record<string, unknown> =>
        typeof info === "object" && info !== null && "name" in info,
    )
    .map((info) => ({
      title: String(info.name ?? ""),
      sessions: parseInt(String(info.sessionsCount ?? "0"), 10) || 0,
      pageViews: parseInt(String(info.pagesViews ?? "0"), 10) || 0,
    }));

  return {
    deadClicks,
    rageClicks,
    excessiveScrolls,
    quickbackClicks,
    scriptErrors,
    errorClicks,
    averageScrollDepth,
    totalSessions,
    botSessions,
    distinctUsers,
    pagesPerSession,
    totalEngagementTime,
    activeEngagementTime,
    topPages,
  };
}
