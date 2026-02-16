import * as fs from "node:fs";
import * as path from "node:path";
import type { AuditReport, TrendDelta, TrendDirection, WeeklyTrend } from "../types";

/**
 * Calculate week-over-week trends by comparing the current report
 * against the previous week's saved data.
 *
 * Previous data is loaded from `{dataDir}/previous-report.json`.
 * After comparison, the current report is saved for next week.
 *
 * If no previous data exists (first run), all deltas are null.
 */
export function calculateTrends(
  current: AuditReport,
  dataDir: string,
): WeeklyTrend {
  const previousPath = path.join(dataDir, "previous-report.json");
  const previous = loadPreviousReport(previousPath);

  // Aggregate mobile performance across all pages (average)
  const currentMobileAvg = averageMobileMetrics(current);
  const previousMobileAvg = previous ? averageMobileMetrics(previous) : null;

  const trend: WeeklyTrend = {
    generatedAt: current.generatedAt,
    performanceScore: buildDelta(
      currentMobileAvg?.performanceScore ?? null,
      previousMobileAvg?.performanceScore ?? null,
      "higher-is-better",
    ),
    lcp: buildDelta(
      currentMobileAvg?.lcp ?? null,
      previousMobileAvg?.lcp ?? null,
      "lower-is-better",
    ),
    fcp: buildDelta(
      currentMobileAvg?.fcp ?? null,
      previousMobileAvg?.fcp ?? null,
      "lower-is-better",
    ),
    cls: buildDelta(
      currentMobileAvg?.cls ?? null,
      previousMobileAvg?.cls ?? null,
      "lower-is-better",
    ),
    tbt: buildDelta(
      currentMobileAvg?.tbt ?? null,
      previousMobileAvg?.tbt ?? null,
      "lower-is-better",
    ),
    totalSessions: buildDelta(
      current.clarity?.totalSessions ?? null,
      previous?.clarity?.totalSessions ?? null,
      "higher-is-better",
    ),
    rageClicks: buildDelta(
      current.clarity?.rageClicks ?? null,
      previous?.clarity?.rageClicks ?? null,
      "lower-is-better",
    ),
    deadClicks: buildDelta(
      current.clarity?.deadClicks ?? null,
      previous?.clarity?.deadClicks ?? null,
      "lower-is-better",
    ),
  };

  return trend;
}

/**
 * Save the current report as the baseline for next week's trend comparison.
 */
export function savePreviousReport(
  report: AuditReport,
  dataDir: string,
): void {
  fs.mkdirSync(dataDir, { recursive: true });
  const filePath = path.join(dataDir, "previous-report.json");
  fs.writeFileSync(filePath, JSON.stringify(report, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadPreviousReport(filePath: string): AuditReport | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as AuditReport;
  } catch {
    return null;
  }
}

interface AveragedMetrics {
  performanceScore: number;
  lcp: number;
  fcp: number;
  cls: number;
  tbt: number;
}

function averageMobileMetrics(report: AuditReport): AveragedMetrics | null {
  const mobilePages = report.pages
    .map((p) => p.psiMobile?.lab)
    .filter((lab): lab is NonNullable<typeof lab> => lab != null);

  if (mobilePages.length === 0) return null;

  const sum = mobilePages.reduce(
    (acc, lab) => ({
      performanceScore: acc.performanceScore + lab.performanceScore,
      lcp: acc.lcp + lab.lcp,
      fcp: acc.fcp + lab.fcp,
      cls: acc.cls + lab.cls,
      tbt: acc.tbt + lab.tbt,
    }),
    { performanceScore: 0, lcp: 0, fcp: 0, cls: 0, tbt: 0 },
  );

  const count = mobilePages.length;
  return {
    performanceScore: sum.performanceScore / count,
    lcp: sum.lcp / count,
    fcp: sum.fcp / count,
    cls: sum.cls / count,
    tbt: sum.tbt / count,
  };
}

type DeltaDirection = "higher-is-better" | "lower-is-better";

function buildDelta(
  current: number | null,
  previous: number | null,
  direction: DeltaDirection,
): TrendDelta | null {
  if (current === null) return null;

  const delta = previous !== null ? current - previous : null;

  let trendDirection: TrendDirection = "flat";
  if (delta !== null && Math.abs(delta) > 0.001) {
    if (direction === "higher-is-better") {
      trendDirection = delta > 0 ? "up" : "down";
    } else {
      trendDirection = delta < 0 ? "up" : "down";
    }
  }

  return {
    current,
    previous,
    delta,
    direction: trendDirection,
  };
}
