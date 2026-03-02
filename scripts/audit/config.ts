import { z } from "zod";

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

const PageSchema = z.object({
  path: z.string(),
  name: z.string(),
  url: z.string().url(),
});

const PostHogConfigSchema = z.object({
  apiKey: z.string().min(1, "POSTHOG_PERSONAL_API_KEY is required"),
  projectId: z.string().min(1, "POSTHOG_PROJECT_ID is required"),
  endpoint: z.string().url(),
  numDays: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(7)]),
});

const PSIConfigSchema = z.object({
  apiKey: z.string().min(1, "PSI_API_KEY is required"),
  endpoint: z.string().url(),
});

const ThresholdsSchema = z.object({
  /** LCP budget in milliseconds (Lighthouse CI: 2500) */
  lcpMs: z.number(),
  /** FCP budget in milliseconds (Lighthouse CI: 1800) */
  fcpMs: z.number(),
  /** TBT budget in milliseconds (Lighthouse CI: 300) */
  tbtMs: z.number(),
  /** CLS budget (Lighthouse CI: 0.1) */
  cls: z.number(),
  /** Minimum Lighthouse performance score (0-1) */
  minPerfScore: z.number().min(0).max(1),
  /** Max rage clicks before flagging */
  maxRageClicks: z.number(),
  /** Max dead clicks before flagging */
  maxDeadClicks: z.number(),
});

const AuditConfigSchema = z.object({
  siteUrl: z.string().url(),
  pages: z.array(PageSchema),
  posthog: PostHogConfigSchema,
  psi: PSIConfigSchema,
  thresholds: ThresholdsSchema,
  /** Directory for intermediate data (gitignored) */
  dataDir: z.string(),
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AuditConfig = z.infer<typeof AuditConfigSchema>;
export type PageConfig = z.infer<typeof PageSchema>;
export type Thresholds = z.infer<typeof ThresholdsSchema>;

// ---------------------------------------------------------------------------
// Config loader
// ---------------------------------------------------------------------------

const SITE_URL = "https://ayasser.com";

const PAGES: z.input<typeof PageSchema>[] = [
  { path: "/", name: "Homepage", url: `${SITE_URL}/` },
  { path: "/about", name: "About", url: `${SITE_URL}/about` },
  { path: "/projects", name: "Projects", url: `${SITE_URL}/projects` },
  { path: "/experience", name: "Experience", url: `${SITE_URL}/experience` },
  { path: "/contact", name: "Contact", url: `${SITE_URL}/contact` },
  { path: "/open-source", name: "Open Source", url: `${SITE_URL}/open-source` },
  { path: "/research", name: "Research", url: `${SITE_URL}/research` },
];

/** Thresholds aligned with Lighthouse CI budgets from lighthouserc.json */
const DEFAULT_THRESHOLDS: z.input<typeof ThresholdsSchema> = {
  lcpMs: 2500,
  fcpMs: 1800,
  tbtMs: 300,
  cls: 0.1,
  minPerfScore: 0.7,
  maxRageClicks: 3,
  maxDeadClicks: 5,
};

export function loadConfig(): AuditConfig {
  const raw = {
    siteUrl: SITE_URL,
    pages: PAGES,
    posthog: {
      apiKey: process.env.POSTHOG_PERSONAL_API_KEY ?? "",
      projectId: process.env.POSTHOG_PROJECT_ID ?? "",
      endpoint: "https://us.i.posthog.com",
      numDays: 3 as const,
    },
    psi: {
      apiKey: process.env.PSI_API_KEY ?? "",
      endpoint: "https://www.googleapis.com/pagespeedonline/v5/runPagespeed",
    },
    thresholds: DEFAULT_THRESHOLDS,
    dataDir: ".audit-data",
  };

  const result = AuditConfigSchema.safeParse(raw);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid audit config:\n${issues}`);
  }

  return result.data;
}
