# Adversarial Performance & Analytics Overhaul Prompt

**Date:** 2026-03-01
**Project:** Personal Website (ayasser.com)
**Technique:** Adversarial Debate Swarm (PhD-level agents)

---

## Master Prompt

Spin up a swarm of adversarial debate agents — PhD-level web performance researchers and senior Next.js/Vercel platform engineers — to validate the entire performance pipeline of this personal website and find every gap that is preventing us from hitting 95+ Lighthouse/Speed Insights scores on both desktop and mobile. Also replace Microsoft Clarity (which is broken/not showing data) with PostHog as the behavioral analytics provider.

### Step 0: Codebase Indexing & Historical Context

Before touching ANY code:

1. **Index the codebase with Noodlbox.** Run `noodlbox_analyze` on the repository to build the knowledge graph. Even if it was indexed before, force a re-analysis to pick up all recent changes. Every subsequent exploration MUST use Noodlbox — `noodlbox_query_with_context` for searching, `noodlbox_symbol_context` for deep-diving into symbols, `noodlbox_detect_impact` before any commit.

2. **Read every previous phase's commits and changes (Phase 4 through Phase 19).** These are the optimization milestones already completed:
   - Phase 4: ExperienceCloud component integration
   - Phase 5: Clarity production-only hardening + performance budgets
   - Phase 6: Dynamic import Testimonials + CustomCursor (code splitting)
   - Phase 13: Image `sizes` attributes + desktop CI gate + performance baseline doc
   - Phase 14: Remove `filter:blur` on mobile, defer below-fold animations, skip SplitText on mobile
   - Phase 15: `startTransition` for filter/tab state updates
   - Phase 16: Tighten Lighthouse CI budgets + `stale-while-revalidate` cache headers
   - Phase 17: Skip PageTransition animation on initial load, remove navbar slide-in, remove GSAP mobile hero branch
   - Phase 18: Dynamic import GSAP in Hero component, defer Lenis loading with dynamic imports and custom `useLenis` hook
   - Phase 19: Enable ISR on `/open-source` page

   You MUST understand what each phase did before proposing changes — do not undo optimizations that previous phases deliberately introduced.

3. **Read the performance baseline document at `docs/performance-baseline.md`.** This contains:
   - LCP element identification (all pages use `<h1>` text, not images)
   - TTFB by region (Egypt ~2.15s accepted limitation on Vercel Hobby tier)
   - Desktop Lighthouse CI: 100 (lab) — but Vercel Speed Insights field data is LOWER
   - Mobile Lighthouse CI: 87 (lab) — Vercel field data is EVEN LOWER
   - Primary bottlenecks: GSAP SplitText blocking LCP (3.7s on mobile), TBT 300ms, INP 432ms

4. **Pull actual Vercel Speed Insights field data.** The lab scores (100 desktop / 87 mobile) are NOT the real scores. Use the Vercel MCP/SDK or dashboard to read the actual Core Web Vitals field data (LCP, INP, CLS) for both desktop and mobile. These real-world scores are the baseline we are optimizing against.

### Step 1: Adversarial Debate Swarm

Spawn 6+ agents that debate every performance decision. Each agent must read the full codebase using Noodlbox before making claims. Every finding must cite specific files, line numbers, and metrics.

#### Agent Roster

| Agent | Role | Expertise | Mandate |
|-------|------|-----------|---------|
| **Performance Advocate** | Argues current architecture is sound | Next.js App Router, React Server Components, Vercel Edge | Defend existing optimizations. Explain why each Phase 4-19 decision was correct. Identify what's already working. |
| **Performance Adversary** | Finds every gap, bottleneck, and missed opportunity | Core Web Vitals, Chrome DevTools, Lighthouse internals | Attack every assumption. Find GSAP/Lenis/Motion code that blocks rendering. Identify unused JS, render-blocking patterns, layout shifts. Must cite file:line for every claim. |
| **Next.js Platform Specialist** | Deep Next.js 16 + Vercel Hobby tier expertise | App Router, React Compiler, Turbopack, ISR, PPR, Edge Runtime | Identify Next.js-specific optimizations not yet used: Partial Prerendering, `loading.tsx` boundaries, route-level code splitting, `unstable_noStore`, server component data fetching patterns. |
| **Animation & Rendering Expert** | GSAP + Motion + Lenis specialist | GPU compositing, `will-change`, `requestIdleCallback`, IntersectionObserver | Audit every animation for render-blocking behavior. Identify GSAP plugins loaded but not used on mobile. Find animation-triggered layout thrashing. Propose progressive enhancement (static first → animate after LCP). |
| **Analytics Migration Specialist** | PostHog integration expert | PostHog JS SDK, feature flags, session replay, consent management | Plan the complete Clarity → PostHog migration. Map every Clarity touchpoint to PostHog equivalent. Design consent-aware initialization. Update CSP headers, audit scripts, cookie banner. |
| **Infrastructure & Delivery Expert** | Vercel config, CDN, caching, headers | Cache-Control, CSP, `next.config.ts`, Edge functions, image optimization | Audit all response headers. Find missing cache opportunities. Optimize CSP for PostHog domains. Check if `inlineCss: true` is helping or hurting. Verify image optimization config. |

#### Debate Rules

- **Every claim must be backed by evidence**: file path, line number, Lighthouse audit name, or CWV metric.
- **Advocate rebuttals are mandatory**: if the adversary raises an issue, the advocate must either accept it or explain why the current approach is better. No silent acceptance.
- **Surviving findings become action items**: any adversary finding that survives the advocate's rebuttal becomes a mandatory fix.
- **No new features**: we are NOT adding functionality. We are making what exists faster and replacing Clarity with PostHog. No new pages, components, or capabilities.
- **Mobile-first priority**: mobile scores are worse than desktop. Mobile fixes take precedence.

### Step 2: Performance Pipeline Validation

Read every file in the rendering pipeline and validate it end-to-end:

```
app/layout.tsx (RootLayout)
  → ThemeProvider (next-themes)
    → MotionProvider (motion/react LazyMotion)
      → SmoothScrollProvider (Lenis + GSAP ScrollTrigger)
        → ScrollConfig
        → Navbar
        → PageTransition (AnimatePresence + motion/react)
          → {children} (page content)
        → Footer
        → CookieConsentBanner
        → CustomCursorLoader
  → SpeedInsights (conditional: VERCEL=1)
  → Analytics (conditional: VERCEL=1)
  → ClarityProvider (conditional: CLARITY_PROJECT_ID + production)
```

For EACH component in this tree:
1. Is it a Server Component or Client Component? Should it be the other?
2. Does it block the critical rendering path?
3. Does it load JS that isn't needed on initial render?
4. Does it cause layout shifts (CLS)?
5. Does it contribute to Total Blocking Time (TBT)?
6. Could it be deferred, lazy-loaded, or eliminated?

### Step 3: Specific Files to Audit

Every single one of these files must be read, analyzed, and validated:

**Core Layout & Routing:**
- `src/app/layout.tsx` — RootLayout, provider nesting order, conditional rendering
- `src/app/page.tsx` — Homepage, Server vs Client boundary
- `src/app/globals.css` — CSS size, unused rules, animation keyframes
- `next.config.ts` — CSP headers, `optimizePackageImports`, `inlineCss`, `reactCompiler`
- `lighthouserc.json` — CI thresholds and assertion config

**Animation Layer (PRIMARY BOTTLENECK):**
- `src/components/home/hero.tsx` — GSAP SplitText, dynamic imports, mobile guard
- `src/components/page-transition.tsx` — AnimatePresence, FrozenRouter, ScrollTrigger refresh
- `src/components/smooth-scroll-provider.tsx` — Lenis init, RAF loop, ScrollTrigger sync
- `src/components/ui/animated-section.tsx` — IntersectionObserver animations
- `src/components/ui/animated-counter.tsx` — Number animation
- `src/components/ui/kinetic-text.tsx` — Text animations
- `src/components/ui/split-text-reveal.tsx` — SplitText usage
- `src/components/ui/magnetic-element.tsx` — Mouse-follow effect
- `src/components/ui/tilt-card.tsx` — 3D tilt effect
- `src/components/ui/custom-cursor.tsx` — Custom cursor (desktop only)
- `src/components/ui/custom-cursor-loader.tsx` — Dynamic loader for cursor
- `src/components/ui/fade-content.tsx` — Fade animations
- `src/components/motion-provider.tsx` — LazyMotion configuration
- `src/components/ui/star-border.tsx` — Border animation

**Analytics (TO BE REPLACED):**
- `src/lib/clarity.ts` — Microsoft Clarity SDK init, event tracking, session tagging
- `src/components/clarity-provider.tsx` — Client-side Clarity initialization
- `src/components/cookie-consent-banner.tsx` — Consent with `grantClarityConsent()`
- `scripts/audit/config.ts` — Audit config with Clarity API settings
- `scripts/audit/collectors/clarity.ts` — Clarity Data Export API collector
- `scripts/audit/reporters/markdown.ts` — Report generation referencing Clarity
- `scripts/audit/index.ts` — Audit orchestrator
- `scripts/audit/collect.ts` — Data collection coordinator
- `scripts/audit/aggregators/trends.ts` — Trend analysis

**Performance Infrastructure:**
- `.github/workflows/bundle-analysis.yml` — Bundle size CI
- `src/env.ts` — T3 env validation (may need PostHog vars)
- `src/config/site.ts` — Site metadata config

### Step 4: Clarity → PostHog Migration

Complete surgical replacement. No Clarity code must remain.

**Remove:**
- `src/lib/clarity.ts` — delete entirely
- `src/components/clarity-provider.tsx` — delete entirely
- `@microsoft/clarity` from `package.json`
- All Clarity references in CSP headers (`next.config.ts`): `https://www.clarity.ms`, `https://*.clarity.ms`
- `CLARITY_PROJECT_ID` from env references
- `grantClarityConsent()` from cookie consent banner

**Remove from Vercel Environment Variables (via Vercel CLI or dashboard):**
- `CLARITY_PROJECT_ID` — remove from all environments (Production, Preview, Development)
- `CLARITY_API_TOKEN` — remove from all environments

**Add:**
- `posthog-js` package
- `src/lib/posthog.ts` — PostHog client init with consent awareness
- `src/components/posthog-provider.tsx` — Client component, consent-gated, replaces ClarityProvider in layout.tsx
- PostHog domains in CSP: `https://us.i.posthog.com` (or `eu.i.posthog.com`)
- `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` env vars
- Update cookie consent banner to call `posthog.opt_in_capturing()` / `posthog.opt_out_capturing()` instead of Clarity consent

**Add to Vercel Environment Variables (via Vercel CLI or dashboard):**
- `NEXT_PUBLIC_POSTHOG_KEY` — set for all environments (Production, Preview, Development)
- `NEXT_PUBLIC_POSTHOG_HOST` — set to `https://us.i.posthog.com` for all environments
- Use `vercel env add` or the Vercel dashboard to add these. You MUST add them to Vercel before deploying the PostHog changes, otherwise the provider will silently fail in production.

**Update audit scripts:**
- Replace `scripts/audit/collectors/clarity.ts` with `scripts/audit/collectors/posthog.ts`
- Update `scripts/audit/config.ts` to reference PostHog API instead of Clarity API
- Update the markdown reporter to use PostHog data structure
- Keep the same behavioral metrics where PostHog equivalents exist (session counts, rage clicks via autocapture, etc.)

### Step 5: Performance Targets

| Metric | Current (Field) | Target | How to Measure |
|--------|-----------------|--------|----------------|
| Desktop Performance Score | READ FROM VERCEL | 95+ | Vercel Speed Insights field data |
| Mobile Performance Score | READ FROM VERCEL | 95+ | Vercel Speed Insights field data |
| LCP (Mobile) | ~3.7s (lab) | < 2.5s | Lighthouse CI + field data |
| LCP (Desktop) | ~1.2s (lab) | < 1.5s | Lighthouse CI + field data |
| TBT (Mobile) | ~300ms | < 150ms | Lighthouse CI |
| INP (Mobile) | ~432ms | < 200ms | Vercel Speed Insights field data |
| CLS | ~0.05 | < 0.05 | Lighthouse CI + field data |
| FCP (Mobile) | ~1.8s | < 1.5s | Lighthouse CI |

### Step 6: Known Constraints (DO NOT TRY TO FIX)

- **TTFB from Egypt (~2.15s)**: Vercel Hobby tier limitation. Nearest edge is EU Frankfurt. Cannot be fixed without upgrading to Pro plan. ACCEPTED.
- **Vercel Hobby tier**: No Edge Middleware, no regional edge compute. Work within these limits.
- **GSAP license**: GSAP plugins (SplitText, ScrollTrigger) are paid — they're already in the project. Don't remove them, optimize their loading.

### Step 7: Claude Flow Tooling

Use EVERY available Claude Flow tool. This is not optional:

- **Noodlbox**: `noodlbox_analyze` (index), `noodlbox_query_with_context` (search), `noodlbox_symbol_context` (deep dive), `noodlbox_detect_impact` (before every commit)
- **Memory**: Store patterns, findings, and decisions in Claude Flow memory for cross-session persistence
- **Hooks**: `pre-task` and `post-task` for every task. `pre-edit` and `post-edit` for every file modification. `pre-command` for risk assessment.
- **Intelligence**: Pattern store for performance patterns found. Trajectory tracking for the overall optimization journey.
- **Workers**: Dispatch `optimize`, `benchmark`, `audit`, `testgaps` workers as appropriate.
- **Diff Analysis**: `analyze_diff` before every commit to assess risk and classify changes.

### Step 8: Documentation Discipline

Every gap found follows this lifecycle:

```
IDENTIFIED → DOCUMENTED → VERIFIED → FIXED → DOCUMENTED AGAIN → COMMITTED → PUSHED → DOCUMENTED AGAIN
```

1. **Gap Register**: Maintain a running list of every performance gap and analytics gap found.
2. **Each fix gets its own commit** with a conventional commit message referencing the gap.
3. **Before/after metrics** for every performance change — run Lighthouse locally before and after.
4. **Run the full verification chain after each fix**: `npm run lint && npx tsc --noEmit && npm run build`
5. **Update `docs/performance-baseline.md`** with new metrics after all fixes are applied.

### Step 9: Verification Gate

Before declaring the milestone complete:

1. Run `npm run build` — must succeed with zero warnings
2. Run `npm run lint` — must pass clean
3. Run `npx tsc --noEmit` — must pass clean
4. Run local Lighthouse on `/`, `/projects`, `/contact`, `/experience` for both mobile and desktop presets
5. Verify PostHog is initializing correctly (check browser console for PostHog logs)
6. Verify cookie consent banner works with PostHog opt-in/opt-out
7. Verify CSP headers allow PostHog and block Clarity
8. Run `noodlbox_detect_impact` on all changes to verify blast radius
9. Deploy to Vercel preview and check Speed Insights dashboard for real field data
10. All 7 pages (`/`, `/about`, `/projects`, `/experience`, `/contact`, `/open-source`, `/research`) must load without console errors

### The Goal

This website is a personal portfolio for a CS graduate and HCI researcher. The goal is to make it **blazing fast** — a 95+ score portfolio site reflects engineering excellence. Every millisecond of LCP, every frame of jank, every kilobyte of unused JS is a signal to recruiters and hiring managers. The performance IS the portfolio.

---

## How to Use This Prompt

1. Open a new Claude Code session in the `personal-website` project
2. Paste this entire prompt
3. Claude will index with Noodlbox, spin up the debate agents, and begin the systematic audit
4. Review findings, approve fixes, verify metrics
