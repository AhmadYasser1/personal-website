import * as fs from "node:fs";
import * as path from "node:path";
import { loadConfig } from "./config";
import { collectAllData } from "./collect";
import { generateFindings } from "./aggregators/findings";
import { calculateTrends, savePreviousReport } from "./aggregators/trends";
import { generateMarkdownReport } from "./reporters/markdown";
import type { AuditReport } from "./types";

async function main(): Promise<void> {
  console.log("📊 Analytics Audit — starting...\n");

  const config = loadConfig();
  console.log(`Site: ${config.siteUrl}`);
  console.log(`Pages: ${config.pages.length}`);
  console.log(`Clarity window: ${config.clarity.numDays} days`);
  console.log(`Data dir: ${config.dataDir}\n`);

  // Phase 10: run data collectors
  const { clarity, pages, errors } = await collectAllData(config);

  const report: AuditReport = {
    generatedAt: new Date().toISOString(),
    clarity,
    pages,
    errors,
  };

  // Phase 11: aggregation + reporting
  console.log("📊 Analyzing data...\n");

  const findings = generateFindings(report, config.thresholds);
  const trends = calculateTrends(report, config.dataDir);
  const markdown = generateMarkdownReport(report, findings, trends);

  // Write report to disk
  fs.mkdirSync(config.dataDir, { recursive: true });
  const reportPath = path.join(config.dataDir, "audit-report.md");
  fs.writeFileSync(reportPath, markdown, "utf-8");

  // Save current data for next week's trend comparison
  savePreviousReport(report, config.dataDir);

  // Console summary
  console.log("─".repeat(50));
  console.log(`✅ Audit complete — generated at ${report.generatedAt}`);
  console.log(`   Clarity: ${report.clarity ? "collected" : "no data"}`);
  console.log(`   Pages analyzed: ${report.pages.length}`);
  console.log(`   Findings: ${findings.length}`);

  const critical = findings.filter((f) => f.severity === "critical").length;
  const warnings = findings.filter((f) => f.severity === "warning").length;
  const info = findings.filter((f) => f.severity === "info").length;

  if (findings.length > 0) {
    console.log(`     🔴 Critical: ${critical}  🟡 Warning: ${warnings}  🔵 Info: ${info}`);
  }

  if (report.errors.length > 0) {
    console.log(`   ⚠️  Collection errors: ${report.errors.length}`);
  }

  console.log(`\n   📄 Report saved to: ${reportPath}`);
  console.log();
}

main().catch((error: unknown) => {
  console.error("❌ Audit failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
