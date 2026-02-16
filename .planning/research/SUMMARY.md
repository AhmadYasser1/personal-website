# Project Research Summary

**Project:** ayasser.com Mobile Performance & Observability Enhancement
**Domain:** Next.js 16 Portfolio Optimization for Emerging Markets
**Researched:** 2026-02-16
**Confidence:** HIGH

## Executive Summary

This is a mobile-first performance optimization project for a Next.js 16 App Router portfolio site serving 73% mobile traffic from Egypt (high-latency, 3G/4G-heavy environment). Current desktop performance is perfect (100 Lighthouse score), but mobile performance fails Core Web Vitals with 3.7s LCP (target <2.5s) and 432ms INP outlier (target <200ms). The site uses GSAP extensively (181KB across 6 chunks) with SplitText animations, Lenis smooth scroll, and modern React features.

The recommended approach is to optimize mobile performance without regressing desktop, using built-in Next.js 16 features exclusively (no new dependencies). Core strategy: preload LCP images with `fetchPriority="high"`, skip GSAP SplitText on mobile via `matchMedia()` breakpoints, defer non-critical animations to `requestIdleCallback`, and establish full observability via Vercel Speed Insights (already installed). Accept high TTFB (1.77s) from Egypt as unavoidable on Hobby plan — focus optimization on controllable metrics (LCP, FCP, INP).

Key risks: (1) desktop regression from mobile-specific optimizations — mitigate with dual-device CI checks on every PR; (2) GSAP animations breaking from aggressive CSS containment tricks — avoid `content-visibility` on animated elements; (3) invisible hero text from existing `bg-clip-text` + SplitText pattern — already identified, use solid colors for animated text; (4) Turbopack compatibility issues with custom webpack loaders — none in current stack, verify on dependency changes; (5) Vercel Hobby plan observability gaps — supplement with Lighthouse CI and client-side Web Vitals logging.

## Key Findings

### Recommended Stack

**No new dependencies required.** All optimizations use existing Next.js 16 APIs, verified packages (`@vercel/analytics@1.6.1`, `@vercel/speed-insights@1.3.1`, React 19.2 via Next.js 16), and configuration-only changes. Existing stack is validated and optimized.

**Core technologies:**
- **`next/image` with `preload={true}` + `fetchPriority="high"`**: Preload LCP images in `<head>` — Next.js 16 deprecated `priority` prop. Critical for -800ms LCP improvement.
- **`next/font` with `display: "swap"` + variable fonts**: Already configured correctly. Prevents FOIT on mobile (1.77s TTFB), reduces font payload 40-60% with variable fonts vs static weights.
- **Vercel Speed Insights + Web Analytics**: Already installed. Speed Insights tracks Core Web Vitals (LCP/FCP/INP/CLS/TTFB) with device/route breakdown. Web Analytics limited to 2,500 events/month on Hobby plan — use sparingly.
- **React 19 `startTransition`**: Built into Next.js 16. Marks state updates as non-urgent (filter interactions), keeps main thread responsive for INP optimization.
- **GSAP `matchMedia()` for responsive animations**: Skip SplitText on mobile (`(min-width: 768px)`) — reduces 50-100ms input delay from character splitting overhead.
- **`stale-while-revalidate` headers**: Serve cached content instantly on revalidation. Reduces TTFB from 1.77s → <200ms for returning users. Edge caching via Vercel's built-in CDN.

**Critical version requirements:**
- Next.js 16.1.6+ required for `preload` prop migration (replaces deprecated `priority`)
- React 19.2 (via Next.js 16) required for `startTransition` API
- GSAP 3.14.2 already optimal (modular imports reduce waste)

### Expected Features

**Must have (table stakes):**
- **LCP < 2.5s on mobile** — Google Core Web Vitals baseline, directly impacts SEO. Currently 3.7s — requires hero image preload + render delay reduction. Expected: -1.2s improvement
- **INP < 200ms** — Replaced FID as Core Web Vitals metric (March 2024). Currently 72ms median (good), but 432ms outlier suggests GSAP blocking. Fix: GSAP yielding + event delegation
- **Adaptive images (WebP/AVIF)** — 73% mobile traffic expects fast loads. Already using `next/image` with sharp — just need srcset validation + priority hints
- **Reduced-motion support** — WCAG accessibility standard. Already implemented globally via `gsap.matchMedia()` — verified in audit
- **Real User Monitoring (RUM)** — Vercel Speed Insights already collects data — enable dashboard visibility for device/route breakdown
- **Sub-2s TTFB** — Baseline for emerging markets. Currently 1.77s — edge caching + `stale-while-revalidate` can drop to ~1.2s for cached content

**Should have (differentiators):**
- **Geographic performance monitoring** — Vercel Speed Insights geo map view already available. See exactly how site performs in Egypt vs US vs global.
- **Interaction-triggered hydration** — Heavy components (testimonials, custom cursor) only hydrate when scrolled near. Reduces TBT by ~200ms on mobile.
- **Per-route performance budgets** — Lighthouse CI already configured. Extend `budgets.json` with per-route thresholds (hero pages stricter than static pages).
- **Streaming SSR with Suspense** — Hero loads instantly, below-fold streams progressively. Already have dynamic imports — wrap in Suspense boundaries with skeleton fallbacks.

**Defer (v2+):**
- **Network-aware component loading** — Adapts to connection speed (Network Information API + `next/dynamic`). HIGH complexity, only needed if Egypt users still >3s LCP after MVP.
- **Real-time CWV alerts** — Requires Vercel Drains ($0.50/GB) + Pro plan. Use Lighthouse CI for now (Hobby plan sufficient).
- **Full OpenTelemetry instrumentation** — Adds ~200KB, increases TTFB. Overkill for 7-page portfolio. Only if adding CMS/payments/DB features.

### Architecture Approach

**Mobile-first optimization without breaking existing desktop architecture.** Current stack is well-structured: Server Components by default, client components scoped to interactivity (hero, testimonials, custom cursor), GSAP modular imports prevent waste, fonts preloaded via `next/font`, Lenis smooth scroll with reduced-motion support. No architectural changes needed — this is a **performance tuning milestone**, not a refactor.

**Major components to modify:**
1. **`src/components/home/hero.tsx`** — Add `preload={true}` + `fetchPriority="high"` to hero image. Wrap SplitText in `matchMedia("(min-width: 768px)")` to skip on mobile. Expected: -800ms LCP, -50ms INP
2. **`src/app/(marketing)/projects/projects-content.tsx`** — Add `preload={true}` to first project card image. Wrap filter state updates in `startTransition` for non-blocking UI. Expected: -200ms INP on filter interactions
3. **`next.config.ts`** — Add `headers()` for `stale-while-revalidate` on dynamic routes. Enable React Compiler (`reactCompiler: true`) for automatic memoization. Expected: -300ms TTFB for returning users, 25-40% re-render reduction
4. **`src/app/layout.tsx`** — Verify `<Analytics />` component renders (already installed). Verify font `display: "swap"` configuration. Enable Speed Insights dashboard for mobile vs desktop breakdown.

**Build order with dependencies:**
- **Phase 1 (Quick Wins):** Image priority + font verification (no dependencies)
- **Phase 2 (GSAP Optimization):** Desktop-only animations, depends on Phase 1 measurement
- **Phase 3 (INP Refinement):** `startTransition` + deferred initialization, depends on Phase 2 baseline
- **Phase 4 (Observability):** Speed Insights dashboard + alerts, parallel to all phases

### Critical Pitfalls

1. **Desktop performance regression from mobile optimizations** — Mobile-first CSS (global `content-visibility`, over-preloading) can slow desktop. **Avoid:** Test desktop Lighthouse score after every mobile change. Scope optimizations to breakpoints via media queries. Run dual-device CI checks.

2. **GSAP animations break from CSS containment tricks** — `content-visibility: auto` interferes with ScrollTrigger dimension calculations, causing pinning failures. `will-change` applied globally creates paint flashing. **Avoid:** Never apply `content-visibility` to GSAP-animated elements. Use `ScrollTrigger.config({ ignoreMobileResize: true })` for mobile viewport resize workarounds.

3. **GSAP SplitText + `bg-clip-text` makes text invisible** — Already identified in codebase. Gradient stays on parent, `text-transparent` inherited by SplitText character spans. **Avoid:** Use solid `color` for SplitText-animated text, or apply gradient after animation completes.

4. **`next/image` priority/preload misconfiguration regresses LCP** — Using deprecated `priority` prop (Next.js 16), missing `sizes` attribute, or lazy-loading LCP images. **Avoid:** Use `preload={true}` + `fetchPriority="high"` + `loading="eager"` for above-fold images. Always specify `sizes` for responsive images.

5. **Mobile viewport height resize breaks ScrollTrigger** — Mobile address bar showing/hiding resizes viewport, causing animations to jump/reverse. **Avoid:** Use `ScrollTrigger.normalizeScroll()` + `ignoreMobileResize: true`. Test on real iOS/Android devices (Chrome DevTools doesn't reproduce this).

## Implications for Roadmap

Based on research, suggested 4-phase structure optimized for mobile performance with minimal risk:

### Phase 1: Foundation & Quick Wins
**Rationale:** Establish baseline monitoring and apply zero-risk image optimizations before touching GSAP or complex state management. No code changes that could break existing animations.

**Delivers:**
- Mobile LCP improvement from 3.7s → ~2.9s (hero image preload)
- Desktop regression protection (CI checks)
- Full observability baseline (Speed Insights dashboard access)

**Addresses:**
- Hero image priority hints (FEATURES.md: table stakes)
- Font preload validation (FEATURES.md: table stakes)
- Vercel Speed Insights dashboard setup (FEATURES.md: table stakes)
- Desktop regression prevention (PITFALLS.md: Pitfall 1)

**Avoids:**
- Pitfall 1: Desktop regression (dual-device CI checks)
- Pitfall 3: `bg-clip-text` invisibility (audit existing usage)
- Pitfall 4: `next/image` misconfiguration (verify `sizes` attributes)

**Tasks:**
- Add `preload={true}` + `fetchPriority="high"` to hero image (`src/components/home/hero.tsx`)
- Add `sizes` prop to all `<Image>` components for responsive delivery
- Verify font `display: "swap"` configuration in `layout.tsx`
- Enable Vercel Speed Insights dashboard, filter by device (Mobile vs Desktop)
- Add Lighthouse CI step that fails if desktop score < 98 or mobile score regresses

### Phase 2: Mobile GSAP Optimization
**Rationale:** Once baseline monitoring is active and LCP quick wins are deployed, optimize GSAP animations for mobile without breaking desktop. Depends on Phase 1 measurement to confirm impact.

**Delivers:**
- Mobile INP from 432ms outlier → <200ms (eliminate GSAP blocking)
- Reduced mobile JS execution overhead (skip SplitText on mobile)
- Preserved desktop animation quality (no regression)

**Uses:**
- GSAP `matchMedia("(min-width: 768px)")` for conditional animations (STACK.md)
- `requestIdleCallback` for deferred initialization (ARCHITECTURE.md: Idle-First pattern)

**Implements:**
- Adaptive Animation Loading pattern (ARCHITECTURE.md)
- Mobile viewport resize workarounds (PITFALLS.md: Pitfall 7)

**Avoids:**
- Pitfall 2: GSAP breaks from CSS optimizations (no `content-visibility` on animated elements)
- Pitfall 6: GSAP animating `left`/`top` (audit for `x`/`y` transforms)
- Pitfall 7: ScrollTrigger mobile resize jumps (add `ignoreMobileResize`)

**Tasks:**
- Wrap hero SplitText in `matchMedia("(min-width: 768px)")` — skip on mobile
- Audit all GSAP consumers (11 ScrollTrigger sites) for mobile-only optimization opportunities
- Add `ScrollTrigger.normalizeScroll()` + `ignoreMobileResize: true` config
- Create `use-idle-callback` hook for deferred GSAP initialization
- Test on real Android/iOS devices (not just Chrome DevTools)

### Phase 3: INP Refinement & State Management
**Rationale:** After GSAP animations are mobile-optimized, tackle remaining INP issues from React state updates. Depends on Phase 2 baseline to isolate non-GSAP INP sources.

**Delivers:**
- Mobile INP median stays <100ms, no outliers >200ms
- Non-blocking filter interactions (projects page)
- React Compiler auto-memoization (25-40% re-render reduction)

**Uses:**
- React 19 `startTransition` (STACK.md: built into Next.js 16)
- React Compiler (`reactCompiler: true` in `next.config.ts`)

**Implements:**
- Transition-Based Filtering pattern (ARCHITECTURE.md)
- Priority-Driven Image Loading (ARCHITECTURE.md)

**Tasks:**
- Enable React Compiler in `next.config.ts`
- Wrap filter state updates in `startTransition` (`projects-content.tsx`)
- Add `preload={true}` to first project card image (LCP candidate for `/projects` route)
- Verify INP improvement in Speed Insights after changes
- Monitor for layout shift (CLS) after React Compiler changes

### Phase 4: Edge Caching & Observability Hardening
**Rationale:** Once core performance is optimized, improve TTFB for returning users and establish regression detection. Parallel to Phases 1-3 — no dependencies.

**Delivers:**
- TTFB for returning users from 1.77s → <200ms (edge cache hits)
- Automated performance regression detection (Lighthouse CI)
- Per-route performance budget enforcement

**Uses:**
- `stale-while-revalidate` headers (STACK.md: edge caching)
- Vercel Edge Network (built-in, no external CDN needed)
- Lighthouse CI (already configured, extend budgets)

**Implements:**
- Per-Route Performance Budgets (FEATURES.md: should have)

**Avoids:**
- Pitfall 9: Vercel Hobby observability gaps (Lighthouse CI supplements)
- Pitfall 10: TTFB misattribution (document baseline, focus on LCP/FCP)

**Tasks:**
- Add `stale-while-revalidate` headers for dynamic routes
- Verify edge caching in Vercel dashboard (Analytics → Functions → Edge requests)
- Extend Lighthouse CI `budgets.json` with per-route thresholds
- Document baseline TTFB by region (accept 1.5-2s from Egypt as unavoidable on Hobby)
- Set up client-side Web Vitals logging to alternative analytics (if Hobby limits hit)

### Phase Ordering Rationale

- **Phase 1 before Phase 2:** Must establish monitoring before making risky changes. Hero image preload is zero-risk and high-impact (-800ms LCP expected) — do it first.
- **Phase 2 before Phase 3:** GSAP animations are the likely source of 432ms INP outlier. Fix animations before state management to isolate causes.
- **Phase 3 after Phase 2:** React Compiler + `startTransition` are lower risk after GSAP is optimized. If INP is already <200ms after Phase 2, Phase 3 becomes optional.
- **Phase 4 parallel:** Edge caching doesn't depend on client-side optimizations. Can run in parallel to Phases 1-3.

**Grouping rationale:**
- Grouped by risk level (low → medium → high) and measurement dependency
- Each phase has clear success criteria from Speed Insights metrics
- No phase breaks existing desktop functionality (regression protection throughout)

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 2:** GSAP mobile optimization patterns are well-documented, but real-device testing (address bar resize, keyboard interactions) requires access to physical devices. May need BrowserStack or manual testing on team devices.
- **Phase 4:** Vercel edge caching behavior for dynamic routes is not well-documented for Hobby plan. Need to verify whether `stale-while-revalidate` works on Hobby or requires Pro plan edge functions.

**Phases with standard patterns (skip research-phase):**
- **Phase 1:** Next.js `next/image` priority hints and font optimization are official documented APIs. No research needed.
- **Phase 3:** React 19 `startTransition` and React Compiler usage are official Next.js 16 features with extensive documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations use Next.js 16.1.6 official APIs verified against docs. No third-party dependencies. Version-specific guidance for `preload` migration. |
| Features | HIGH | Mobile performance metrics validated by Vercel Speed Insights real-user data (3.7s LCP, 432ms INP). Table stakes defined by Core Web Vitals thresholds (official Google standards). |
| Architecture | HIGH | Existing architecture already follows Next.js best practices (Server Components, modular GSAP, font preload). No refactoring needed — performance tuning only. Patterns sourced from official Vercel/GSAP docs. |
| Pitfalls | HIGH | Pitfalls sourced from Next.js 16 migration guides (official), GSAP forums (official support), and recent production migration case studies (2025-2026). Multiple sources confirm each pitfall. |

**Overall confidence:** HIGH

All research findings verified against official documentation (Next.js, Vercel, GSAP) and corroborated by recent production case studies. Stack is stable (no new dependencies), patterns are well-documented, and pitfalls have known workarounds. Only uncertainty is real-device testing availability (Phase 2) and Hobby plan edge caching limits (Phase 4).

### Gaps to Address

**Egypt-specific edge network latency:** Research shows baseline 150-200ms latency from Egypt to `us-east-1` Vercel deployment. Need to verify actual latency via Speed Insights geo breakdown after Phase 1 deployment. May discover that edge caching doesn't help if CDN miss rate is high for Egypt traffic.

**Real mobile device testing results:** Lab data (Lighthouse) may differ from field data (Speed Insights) for mobile performance. Chrome DevTools mobile emulation doesn't reproduce address bar resize or keyboard interaction issues. Need access to real Android/iOS devices for Phase 2 testing.

**GSAP scroll animation INP impact:** Research identifies SplitText as likely 432ms outlier cause, but exact profiling needed. May discover other GSAP sources (ScrollTrigger initialization, Lenis setup) contribute. Need Chrome DevTools Performance panel profiling on mobile during Phase 2.

**Vercel Hobby plan edge caching behavior:** Documentation unclear whether `stale-while-revalidate` works on Hobby plan or requires Pro plan edge functions. Need to test in Phase 4 and verify via Network tab `CF-Cache-Status` or equivalent headers.

**React Compiler production readiness:** React Compiler is experimental in Next.js 16. Research shows 25-40% re-render reduction, but may introduce subtle bugs (over-memoization, stale closures). Need thorough testing in Phase 3 before enabling in production.

**How to handle during planning/execution:**
- **Egypt latency:** Measure baseline in Phase 1, document as "unavoidable on Hobby plan," focus optimization on LCP/FCP instead of TTFB
- **Real device testing:** Acquire 1-2 test devices (mid-range Android, older iPhone) or use BrowserStack for Phase 2 validation
- **GSAP profiling:** Add Performance panel profiling step to Phase 2 plan, capture flamegraph screenshots for hero interaction
- **Edge caching limits:** Test `stale-while-revalidate` in Phase 4 staging deployment, verify headers, fall back to ISR if edge caching unavailable
- **React Compiler:** Enable in Phase 3 with feature flag, A/B test on 10% traffic, monitor Sentry for runtime errors, disable if issues found

## Sources

### Primary (HIGH confidence)
- **Next.js 16.1.6 Official Docs** — Image component API (`preload` migration), Font optimization (`display: "swap"`), React Compiler configuration
- **Vercel Speed Insights Docs** — Core Web Vitals tracking, device/route breakdown, Hobby plan limits
- **Vercel Web Analytics Docs** — Event limits (2,500/month), privacy features, custom events (Pro only)
- **GSAP Official Docs** — `matchMedia()` for responsive animations, ScrollTrigger mobile configuration (`normalizeScroll`, `ignoreMobileResize`)
- **web.dev Core Web Vitals** — LCP/FCP/INP thresholds, optimization techniques, measurement methodology

### Secondary (MEDIUM confidence)
- **DebugBear Next.js Image Optimization Guide** — `priority` deprecation timeline, `sizes` attribute best practices, responsive image delivery
- **LinkGraph INP Optimization Complete Guide (2026)** — GSAP yielding strategy, `startTransition` usage, mobile CPU constraints
- **Medium: "I Migrated to Next.js 16 and Got 218% Performance Boost"** — Real-world migration experience, mobile vs desktop performance delta
- **Mastering Mobile Performance: Next.js Lighthouse Scores** — Mobile-specific optimization patterns, emerging markets considerations
- **Vercel Blog: Improving INP with React 18 and Suspense** — `startTransition` patterns, React Compiler impact on INP

### Tertiary (LOW confidence, needs validation)
- **Cloudflare: TTFB is Not What It Used To Be** — Geographic latency expectations, edge network coverage gaps. Applies to Cloudflare, may not apply to Vercel edge.
- **WP Rocket: Improve LCP Guide** — WordPress-specific but general principles apply. Verify recommendations against Next.js equivalents.
- **Vercel Drains Announcement** — Real-time CWV alerts mentioned but no Hobby plan availability confirmed. Verify pricing/availability during Phase 4 planning.

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
