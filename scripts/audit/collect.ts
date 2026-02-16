import type { AuditConfig } from "./config";
import type { ClarityData, CollectorError, PageMetrics } from "./types";
import { collectClarityData } from "./collectors/clarity";
import { collectPSIData } from "./collectors/psi";

interface CollectionResult {
  readonly clarity: ClarityData | null;
  readonly pages: readonly PageMetrics[];
  readonly errors: readonly CollectorError[];
}

/**
 * Run all data collectors in parallel where possible.
 *
 * Clarity: single API call (batched by the API itself)
 * PSI: sequential per-page (Lighthouse analysis takes ~10-20s each)
 *
 * If one collector fails entirely, the other still runs.
 */
export async function collectAllData(
  config: AuditConfig,
): Promise<CollectionResult> {
  const errors: CollectorError[] = [];

  // Run Clarity and PSI in parallel (Clarity is fast, PSI is slow)
  console.log("📡 Collecting data...\n");

  const [clarityResult, psiResult] = await Promise.allSettled([
    collectClarity(config),
    collectPSI(config),
  ]);

  // Process Clarity result
  let clarity: ClarityData | null = null;
  if (clarityResult.status === "fulfilled") {
    clarity = clarityResult.value;
    console.log(`  ✅ Clarity: ${clarity.totalSessions} sessions, ${clarity.distinctUsers} users`);
  } else {
    const msg = clarityResult.reason instanceof Error
      ? clarityResult.reason.message
      : String(clarityResult.reason);
    console.warn(`  ❌ Clarity failed: ${msg}`);
    errors.push({
      source: "clarity",
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
    const successCount = pages.filter((p) => p.psiMobile || p.psiDesktop).length;
    console.log(`  ✅ PSI: ${successCount}/${config.pages.length} pages analyzed`);
  } else {
    const msg = psiResult.reason instanceof Error
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
  return { clarity, pages, errors };
}

// ---------------------------------------------------------------------------
// Collector wrappers (add timing + logging)
// ---------------------------------------------------------------------------

async function collectClarity(config: AuditConfig): Promise<ClarityData> {
  console.log("  🔍 Clarity: fetching behavioral data...");
  const start = Date.now();
  const data = await collectClarityData(config);
  console.log(`  🔍 Clarity: done in ${((Date.now() - start) / 1000).toFixed(1)}s`);
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
