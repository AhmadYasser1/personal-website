import type { AuditConfig, PageConfig } from "../config";
import type {
  CrUXFieldData,
  CrUXMetric,
  CrUXMetricCategory,
  LighthouseLabData,
  PSIPageResult,
  PSIStrategy,
} from "../types";

/**
 * Fetch performance data from Google PageSpeed Insights API.
 *
 * Runs Lighthouse lab tests and returns CrUX field data when available.
 * Each call takes ~10-20 seconds (Lighthouse runs a full page analysis).
 *
 * Rate limit: 25,000 queries/day with API key.
 * We run 7 pages × 2 strategies = 14 calls per audit (well within limits).
 */
export async function collectPSIData(
  config: AuditConfig,
): Promise<{ results: Map<string, { mobile: PSIPageResult | null; desktop: PSIPageResult | null }>; errors: string[] }> {
  const results = new Map<string, { mobile: PSIPageResult | null; desktop: PSIPageResult | null }>();
  const errors: string[] = [];

  for (const page of config.pages) {
    const pageResults: { mobile: PSIPageResult | null; desktop: PSIPageResult | null } = {
      mobile: null,
      desktop: null,
    };

    // Run mobile and desktop sequentially to avoid rate limit spikes
    for (const strategy of ["mobile", "desktop"] as const) {
      try {
        const result = await fetchPSIPage(config, page, strategy);
        pageResults[strategy] = result;
      } catch (error) {
        const msg = `PSI ${strategy} failed for ${page.path}: ${error instanceof Error ? error.message : String(error)}`;
        console.warn(`  ⚠️  ${msg}`);
        errors.push(msg);
      }
    }

    results.set(page.path, pageResults);
  }

  return { results, errors };
}

// ---------------------------------------------------------------------------
// Single page fetch + parse
// ---------------------------------------------------------------------------

async function fetchPSIPage(
  config: AuditConfig,
  page: PageConfig,
  strategy: PSIStrategy,
): Promise<PSIPageResult> {
  const url = new URL(config.psi.endpoint);
  url.searchParams.set("url", page.url);
  url.searchParams.set("key", config.psi.apiKey);
  url.searchParams.set("strategy", strategy);
  url.searchParams.set("category", "performance");

  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`PSI API ${response.status}: ${body.slice(0, 200)}`);
  }

  const data = await response.json();
  return parsePSIResponse(data, page.url, strategy);
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

function parsePSIResponse(
  data: Record<string, unknown>,
  url: string,
  strategy: PSIStrategy,
): PSIPageResult {
  const field = parseCrUXData(data.loadingExperience as Record<string, unknown> | undefined);
  const lab = parseLighthouseData(data.lighthouseResult as Record<string, unknown> | undefined);

  return {
    url,
    strategy,
    field,
    lab,
    fetchedAt: new Date().toISOString(),
  };
}

function parseCrUXData(
  loadingExperience: Record<string, unknown> | undefined,
): CrUXFieldData {
  if (!loadingExperience?.metrics) {
    return {
      available: false,
      overallCategory: null,
      lcp: null,
      fcp: null,
      cls: null,
      inp: null,
      ttfb: null,
    };
  }

  const metrics = loadingExperience.metrics as Record<string, Record<string, unknown>>;

  return {
    available: true,
    overallCategory: (loadingExperience.overall_category as string) ?? null,
    lcp: extractCrUXMetric(metrics.LARGEST_CONTENTFUL_PAINT_MS),
    fcp: extractCrUXMetric(metrics.FIRST_CONTENTFUL_PAINT_MS),
    cls: extractCrUXMetric(metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE),
    inp: extractCrUXMetric(metrics.INTERACTION_TO_NEXT_PAINT),
    ttfb: extractCrUXMetric(metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE),
  };
}

function extractCrUXMetric(
  metric: Record<string, unknown> | undefined,
): CrUXMetric | null {
  if (!metric) return null;
  return {
    percentile: (metric.percentile as number) ?? 0,
    category: (metric.category as CrUXMetricCategory) ?? "NONE",
  };
}

function parseLighthouseData(
  lighthouseResult: Record<string, unknown> | undefined,
): LighthouseLabData {
  const categories = lighthouseResult?.categories as Record<string, Record<string, unknown>> | undefined;
  const audits = lighthouseResult?.audits as Record<string, Record<string, unknown>> | undefined;

  const perfScore = (categories?.performance?.score as number) ?? 0;

  function auditValue(key: string): number {
    return (audits?.[key]?.numericValue as number) ?? 0;
  }

  return {
    performanceScore: perfScore,
    lcp: auditValue("largest-contentful-paint"),
    fcp: auditValue("first-contentful-paint"),
    cls: auditValue("cumulative-layout-shift"),
    tbt: auditValue("total-blocking-time"),
    speedIndex: auditValue("speed-index"),
    interactive: auditValue("interactive"),
  };
}
