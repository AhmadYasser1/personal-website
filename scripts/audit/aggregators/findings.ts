import type { Thresholds } from "../config";
import type {
  AuditFinding,
  AuditReport,
  ClarityData,
  PageMetrics,
  Severity,
} from "../types";

/**
 * Analyze the audit report and produce a prioritized list of findings.
 *
 * Checks:
 * 1. Performance thresholds per page (LCP, FCP, TBT, CLS, perf score)
 * 2. Behavioral signals from Clarity (rage clicks, dead clicks, etc.)
 * 3. Cross-page patterns (consistent poor mobile scores, etc.)
 *
 * Findings are sorted by severity (critical > warning > info) then by
 * the magnitude of the threshold breach.
 */
export function generateFindings(
  report: AuditReport,
  thresholds: Thresholds,
): AuditFinding[] {
  const findings: AuditFinding[] = [];

  // Performance findings (per page, per strategy)
  for (const page of report.pages) {
    checkPagePerformance(page, "mobile", thresholds, findings);
    checkPagePerformance(page, "desktop", thresholds, findings);
  }

  // Behavioral findings (site-wide from Clarity)
  if (report.clarity) {
    checkBehavioralSignals(report.clarity, thresholds, findings);
  }

  // Sort: critical first, then by how far over threshold
  return findings.sort((a, b) => {
    const severityOrder: Record<Severity, number> = {
      critical: 0,
      warning: 1,
      info: 2,
    };
    const sDiff = severityOrder[a.severity] - severityOrder[b.severity];
    if (sDiff !== 0) return sDiff;

    // Within same severity, sort by breach magnitude (higher = worse)
    const aBreach = a.threshold > 0 ? a.value / a.threshold : 0;
    const bBreach = b.threshold > 0 ? b.value / b.threshold : 0;
    return bBreach - aBreach;
  });
}

// ---------------------------------------------------------------------------
// Performance checks
// ---------------------------------------------------------------------------

function checkPagePerformance(
  page: PageMetrics,
  strategy: "mobile" | "desktop",
  thresholds: Thresholds,
  findings: AuditFinding[],
): void {
  const result = strategy === "mobile" ? page.psiMobile : page.psiDesktop;
  if (!result) return;

  const { lab } = result;
  const label = `${page.name} (${strategy})`;

  // Performance score
  if (lab.performanceScore < thresholds.minPerfScore) {
    findings.push({
      severity: lab.performanceScore < 0.5 ? "critical" : "warning",
      category: "performance",
      page: label,
      metric: "Performance Score",
      value: Math.round(lab.performanceScore * 100),
      threshold: Math.round(thresholds.minPerfScore * 100),
      message: `${label} scored ${Math.round(lab.performanceScore * 100)}/100 (threshold: ${Math.round(thresholds.minPerfScore * 100)})`,
      recommendation:
        strategy === "mobile"
          ? "Audit largest-contentful-paint and total-blocking-time. Consider code-splitting, image optimization, or reducing JS bundle."
          : "Review server response time and render-blocking resources.",
    });
  }

  // LCP
  if (lab.lcp > thresholds.lcpMs) {
    findings.push({
      severity: lab.lcp > thresholds.lcpMs * 2 ? "critical" : "warning",
      category: "performance",
      page: label,
      metric: "LCP",
      value: Math.round(lab.lcp),
      threshold: thresholds.lcpMs,
      message: `${label} LCP is ${(lab.lcp / 1000).toFixed(1)}s (budget: ${(thresholds.lcpMs / 1000).toFixed(1)}s)`,
      recommendation:
        "Check hero image size, font loading strategy, and server response time. Preload critical above-the-fold resources.",
    });
  }

  // FCP
  if (lab.fcp > thresholds.fcpMs) {
    findings.push({
      severity: lab.fcp > thresholds.fcpMs * 2 ? "critical" : "warning",
      category: "performance",
      page: label,
      metric: "FCP",
      value: Math.round(lab.fcp),
      threshold: thresholds.fcpMs,
      message: `${label} FCP is ${(lab.fcp / 1000).toFixed(1)}s (budget: ${(thresholds.fcpMs / 1000).toFixed(1)}s)`,
      recommendation:
        "Reduce render-blocking CSS/JS. Consider inlining critical CSS and deferring non-essential scripts.",
    });
  }

  // TBT
  if (lab.tbt > thresholds.tbtMs) {
    findings.push({
      severity: lab.tbt > thresholds.tbtMs * 2 ? "critical" : "warning",
      category: "performance",
      page: label,
      metric: "TBT",
      value: Math.round(lab.tbt),
      threshold: thresholds.tbtMs,
      message: `${label} TBT is ${Math.round(lab.tbt)}ms (budget: ${thresholds.tbtMs}ms)`,
      recommendation:
        "Break up long tasks. Review GSAP animations, third-party scripts, and hydration cost.",
    });
  }

  // CLS
  if (lab.cls > thresholds.cls) {
    findings.push({
      severity: lab.cls > thresholds.cls * 2.5 ? "critical" : "warning",
      category: "performance",
      page: label,
      metric: "CLS",
      value: parseFloat(lab.cls.toFixed(3)),
      threshold: thresholds.cls,
      message: `${label} CLS is ${lab.cls.toFixed(3)} (budget: ${thresholds.cls})`,
      recommendation:
        "Set explicit dimensions on images/embeds. Avoid injecting content above existing content after load.",
    });
  }
}

// ---------------------------------------------------------------------------
// Behavioral checks (Clarity)
// ---------------------------------------------------------------------------

function checkBehavioralSignals(
  clarity: ClarityData,
  thresholds: Thresholds,
  findings: AuditFinding[],
): void {
  // Rage clicks
  if (clarity.rageClicks > thresholds.maxRageClicks) {
    findings.push({
      severity:
        clarity.rageClicks > thresholds.maxRageClicks * 3
          ? "critical"
          : "warning",
      category: "behavioral",
      page: null,
      metric: "Rage Clicks",
      value: clarity.rageClicks,
      threshold: thresholds.maxRageClicks,
      message: `${clarity.rageClicks} rage click sessions detected (threshold: ${thresholds.maxRageClicks})`,
      recommendation:
        "Review Clarity session recordings for rage clicks. Look for non-clickable elements that appear clickable, slow-responding buttons, or broken interactive elements.",
    });
  }

  // Dead clicks
  if (clarity.deadClicks > thresholds.maxDeadClicks) {
    findings.push({
      severity:
        clarity.deadClicks > thresholds.maxDeadClicks * 3
          ? "critical"
          : "warning",
      category: "behavioral",
      page: null,
      metric: "Dead Clicks",
      value: clarity.deadClicks,
      threshold: thresholds.maxDeadClicks,
      message: `${clarity.deadClicks} dead click sessions detected (threshold: ${thresholds.maxDeadClicks})`,
      recommendation:
        "Review Clarity heatmaps. Dead clicks often indicate misleading visual cues — elements that look clickable but aren't (cards without links, styled text, decorative icons).",
    });
  }

  // Script errors (any is a problem)
  if (clarity.scriptErrors > 0) {
    findings.push({
      severity: clarity.scriptErrors > 5 ? "critical" : "warning",
      category: "behavioral",
      page: null,
      metric: "Script Errors",
      value: clarity.scriptErrors,
      threshold: 0,
      message: `${clarity.scriptErrors} sessions had JavaScript errors`,
      recommendation:
        "Check Clarity's error dashboard and browser console logs. Fix any uncaught exceptions affecting user experience.",
    });
  }

  // Excessive scrolling
  if (clarity.excessiveScrolls > 0) {
    findings.push({
      severity: "info",
      category: "behavioral",
      page: null,
      metric: "Excessive Scrolling",
      value: clarity.excessiveScrolls,
      threshold: 0,
      message: `${clarity.excessiveScrolls} sessions had excessive scrolling — users may be struggling to find content`,
      recommendation:
        "Review page structure and navigation. Consider adding anchor links, table of contents, or reorganizing content hierarchy.",
    });
  }

  // Quickback clicks (users navigated then immediately went back)
  if (clarity.quickbackClicks > 0) {
    findings.push({
      severity: clarity.quickbackClicks > 5 ? "warning" : "info",
      category: "behavioral",
      page: null,
      metric: "Quickback Clicks",
      value: clarity.quickbackClicks,
      threshold: 0,
      message: `${clarity.quickbackClicks} quickback sessions — users clicked a link then immediately returned`,
      recommendation:
        "Review link destinations. Quickbacks suggest link text/context didn't match the destination content.",
    });
  }

  // Low scroll depth (if data available)
  if (
    clarity.averageScrollDepth !== null &&
    clarity.averageScrollDepth < 50 &&
    clarity.totalSessions > 10
  ) {
    findings.push({
      severity: "info",
      category: "behavioral",
      page: null,
      metric: "Scroll Depth",
      value: Math.round(clarity.averageScrollDepth),
      threshold: 50,
      message: `Average scroll depth is ${Math.round(clarity.averageScrollDepth)}% — less than half of visitors scroll past the fold`,
      recommendation:
        "Review above-the-fold content. Ensure the most important content is visible immediately. Consider adding visual cues to scroll.",
    });
  }
}
