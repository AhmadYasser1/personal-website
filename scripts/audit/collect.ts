import type { AuditConfig } from "./config";
import type { BehavioralData, CollectorError, PageMetrics } from "./types";
import { collectPostHogData } from "./collectors/posthog";
import { collectPSIData } from "./collectors/psi";

interface CollectionResult {
  readonly behavioral: BehavioralData | null;
  readonly pages: readonly PageMetrics[];
  readonly errors: readonly CollectorError[];
}

/**
 * Run all data collectors in parallel where possible.
 *
 * PostHog: single API call (batched by the API itself)
 * PSI: sequential per-page (Lighthouse analysis takes ~10-20s each)
 *
 * If one collector fails entirely, the other still runs.
 */
export async function collectAllData(
  config: AuditConfig,
): Promise<CollectionResult> {
  const errors: CollectorError[] = [];

  // Run PostHog and PSI in parallel (PostHog is fast, PSI is slow)
  console.log("📡 Collecting data...\n");

  const [posthogResult, psiResult] = await Promise.allSettled([
    collectBehavioral(config),
    collectPSI(config),
  ]);

  // Process PostHog result
  let behavioral: BehavioralData | null = null;
  if (posthogResult.status === "fulfilled") {
    behavioral = posthogResult.value;
    console.log(
      `  ✅ PostHog: ${behavioral.totalSessions} sessions, ${behavioral.distinctUsers} users`,
    );
  } else {
    const msg =
      posthogResult.reason instanceof Error
        ? posthogResult.reason.message
        : String(posthogResult.reason);
    console.warn(`  ❌ PostHog failed: ${msg}`);
    errors.push({
      source: "posthog",
      message: msg,
      timestamp: new Date().toISOString(),
    });
  }

  // Process PSI result
  let pages: PageMetrics[] = [];
  if (psiResult.status === "fulfilled") {
    pages = psiResult.value.pages;
    for (const err of psiResult.value.errors) {
      errors.push({
        source: "psi",
        message: err,
        timestamp: new Date().toISOString(),
      });
    }
    const successCount = pages.filter(
      (p) => p.psiMobile || p.psiDesktop,
    ).length;
    console.log(
      `  ✅ PSI: ${successCount}/${config.pages.length} pages analyzed`,
    );
  } else {
    const msg =
      psiResult.reason instanceof Error
        ? psiResult.reason.message
        : String(psiResult.reason);
    console.warn(`  ❌ PSI failed entirely: ${msg}`);
    errors.push({
      source: "psi",
      message: msg,
      timestamp: new Date().toISOString(),
    });
  }

  if (errors.length > 0) {
    console.warn(`\n  ⚠️  ${errors.length} error(s) during collection`);
  }

  console.log();
  return { behavioral, pages, errors };
}

// ---------------------------------------------------------------------------
// Collector wrappers (add timing + logging)
// ---------------------------------------------------------------------------

async function collectBehavioral(
  config: AuditConfig,
): Promise<BehavioralData> {
  console.log("  🔍 PostHog: fetching behavioral data...");
  const start = Date.now();
  const data = await collectPostHogData(config);
  console.log(
    `  🔍 PostHog: done in ${((Date.now() - start) / 1000).toFixed(1)}s`,
  );
  return data;
}

async function collectPSI(
  config: AuditConfig,
): Promise<{ pages: PageMetrics[]; errors: string[] }> {
  console.log("  🔍 PSI: analyzing pages (this takes a few minutes)...");
  const start = Date.now();

  const { results, errors } = await collectPSIData(config);

  const pages: PageMetrics[] = config.pages.map((page) => {
    const result = results.get(page.path);
    return {
      path: page.path,
      name: page.name,
      psiMobile: result?.mobile ?? null,
      psiDesktop: result?.desktop ?? null,
    };
  });

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`  🔍 PSI: done in ${elapsed}s`);

  return { pages, errors };
}
