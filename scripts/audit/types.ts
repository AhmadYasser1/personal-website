/**
 * Shared types for the analytics audit pipeline.
 *
 * Two data sources:
 * - PostHog (behavioral: rage clicks, dead clicks, scroll depth, sessions)
 * - Google PageSpeed Insights (performance: CWV lab data, CrUX field data when available)
 */

// ---------------------------------------------------------------------------
// Behavioral data types (provider-agnostic)
// ---------------------------------------------------------------------------

/** Normalized behavioral data from analytics provider */
export interface BehavioralData {
  readonly deadClicks: number;
  readonly rageClicks: number;
  readonly excessiveScrolls: number;
  readonly quickbackClicks: number;
  readonly scriptErrors: number;
  readonly errorClicks: number;
  readonly averageScrollDepth: number | null;
  readonly totalSessions: number;
  readonly botSessions: number;
  readonly distinctUsers: number;
  readonly pagesPerSession: number | null;
  readonly totalEngagementTime: number | null;
  readonly activeEngagementTime: number | null;
  readonly topPages: readonly BehavioralPageData[];
}

export interface BehavioralPageData {
  readonly title: string;
  readonly sessions: number;
  readonly pageViews: number;
}

// ---------------------------------------------------------------------------
// PageSpeed Insights API types (from /pagespeedonline/v5/runPagespeed)
// ---------------------------------------------------------------------------

export type PSIStrategy = "mobile" | "desktop";

export type CrUXMetricCategory = "FAST" | "AVERAGE" | "SLOW" | "NONE";

export interface CrUXMetric {
  readonly percentile: number;
  readonly category: CrUXMetricCategory;
}

/** CrUX field data (real-user metrics). May be empty for low-traffic sites. */
export interface CrUXFieldData {
  readonly available: boolean;
  readonly overallCategory: string | null;
  readonly lcp: CrUXMetric | null;
  readonly fcp: CrUXMetric | null;
  readonly cls: CrUXMetric | null;
  readonly inp: CrUXMetric | null;
  readonly ttfb: CrUXMetric | null;
}

/** Lighthouse lab data (synthetic test) */
export interface LighthouseLabData {
  readonly performanceScore: number;
  readonly lcp: number;
  readonly fcp: number;
  readonly cls: number;
  readonly tbt: number;
  readonly speedIndex: number;
  readonly interactive: number;
}

export interface PSIPageResult {
  readonly url: string;
  readonly strategy: PSIStrategy;
  readonly field: CrUXFieldData;
  readonly lab: LighthouseLabData;
  readonly fetchedAt: string;
}

// ---------------------------------------------------------------------------
// Unified audit types (cross-source)
// ---------------------------------------------------------------------------

export interface PageMetrics {
  readonly path: string;
  readonly name: string;
  readonly psiMobile: PSIPageResult | null;
  readonly psiDesktop: PSIPageResult | null;
}

export interface AuditReport {
  readonly generatedAt: string;
  readonly behavioral: BehavioralData | null;
  readonly pages: readonly PageMetrics[];
  readonly errors: readonly CollectorError[];
}

export interface CollectorError {
  readonly source: "posthog" | "psi";
  readonly message: string;
  readonly timestamp: string;
}

// ---------------------------------------------------------------------------
// Trend types (week-over-week comparison)
// ---------------------------------------------------------------------------

export type TrendDirection = "up" | "down" | "flat";

export interface TrendDelta {
  readonly current: number;
  readonly previous: number | null;
  readonly delta: number | null;
  readonly direction: TrendDirection;
}

export interface WeeklyTrend {
  readonly generatedAt: string;
  readonly performanceScore: TrendDelta | null;
  readonly lcp: TrendDelta | null;
  readonly fcp: TrendDelta | null;
  readonly cls: TrendDelta | null;
  readonly tbt: TrendDelta | null;
  readonly totalSessions: TrendDelta | null;
  readonly rageClicks: TrendDelta | null;
  readonly deadClicks: TrendDelta | null;
}

// ---------------------------------------------------------------------------
// Finding / priority types
// ---------------------------------------------------------------------------

export type Severity = "critical" | "warning" | "info";

export interface AuditFinding {
  readonly severity: Severity;
  readonly category: "performance" | "behavioral" | "accessibility";
  readonly page: string | null;
  readonly metric: string;
  readonly value: number;
  readonly threshold: number;
  readonly message: string;
  readonly recommendation: string;
}
