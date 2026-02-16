# Feature Research

**Domain:** Mobile Performance Optimization & Full Observability for Portfolio Site
**Researched:** 2026-02-16
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = site feels slow or broken (especially on mobile).

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| LCP < 2.5s on mobile | Google Core Web Vitals baseline, directly impacts SEO rankings and user retention | MEDIUM | Currently 3.7s — requires hero image optimization, fetchpriority hints, and render delay reduction. Expected impact: 1.2s improvement |
| INP < 200ms | Replaced FID in March 2024 as CWV metric, measures all interactions throughout page lifecycle | MEDIUM | Currently 72ms (good), but 432ms outlier suggests JS blocking. Need GSAP yielding + event delegation |
| Adaptive images (WebP/AVIF) | 73% mobile traffic expects fast loads regardless of device — mobile-sized images critical | LOW | Already using next/image with sharp, just need srcset validation + priority hints |
| Reduced-motion support | Accessibility standard (WCAG), prevents motion sickness | LOW | Already implemented globally via gsap.matchMedia(), verified in audit |
| Real User Monitoring (RUM) | Users expect modern sites to self-improve over time based on actual usage data | LOW | Vercel Speed Insights already collects this — just need to enable dashboard visibility |
| Sub-2s TTFB | Baseline for emerging markets (Egypt = 73% traffic). Over 2s feels broken on 3G/4G | MEDIUM | Currently 1.77s — CDN edge caching + preconnect to external origins can drop to ~1.2s |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable for a modern portfolio.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Network-aware component loading | Portfolio adapts to user's connection speed — shows lightweight version on slow networks | HIGH | Use Network Information API + next/dynamic with custom loading strategy. Emerging markets value (Egypt 3G/4G) |
| Geographic performance monitoring | See exactly how site performs in Egypt vs US vs global — optimize for actual user locations | LOW | Vercel Speed Insights geo map view already available, just need to review and act on data |
| Interaction-triggered hydration | Heavy components (testimonials carousel, custom cursor) only hydrate when user scrolls near or interacts | MEDIUM | Use intersection observer + React.lazy() wrapper. Reduces TBT by ~200ms on mobile |
| Streaming SSR with granular Suspense | Hero loads instantly, below-fold streams in progressively — users see content in <1s even on slow connections | MEDIUM | Already have dynamic imports, need to wrap in Suspense boundaries with skeleton fallbacks |
| Per-route performance budgets | Each page type has its own LCP/FCP/INP targets based on actual traffic patterns | LOW | Lighthouse CI already configured — extend budgets.json with per-route thresholds |
| Real-time CWV alerts | Get notified when mobile performance degrades below thresholds before users churn | MEDIUM | Requires Vercel Drains ($0.50/GB) to export Speed Insights → custom alerting (Upstash/Trigger.dev) |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for mobile performance or observability.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Real-time analytics dashboard | "I want live traffic graphs" | Adds 50KB+ of charting libs + WebSocket overhead, delays LCP, often unused | Use Vercel Analytics dashboard — it's already built, doesn't impact performance |
| Animated page transitions | "Every modern site has smooth transitions between routes" | Adds complexity, delays navigation, conflicts with prefers-reduced-motion, hurts INP | Use subtle fade on navigation state + View Transitions API (zero-JS when supported) |
| Auto-playing video backgrounds | "It looks impressive on Awwwards sites" | 3-10MB video payloads destroy mobile LCP, wastes bandwidth in emerging markets | Use optimized AVIF hero image with subtle CSS animation — same visual impact, 50x smaller |
| Client-side form validation libraries | "We need robust validation" | Adds 20-40KB for features already in HTML5 + React Hook Form. Delays interactivity | Use native HTML5 validation + server-side validation in Server Actions |
| Full OpenTelemetry instrumentation | "We need traces for everything" | Adds ~200KB to bundle, increases TTFB, overkill for 7-page portfolio. Vendor lock-in if not careful | Use Vercel Speed Insights (built-in, zero bundle cost) + selective tracing for Server Actions only |
| Third-party chat widgets | "I want live chat for visitors" | Adds 100-200KB, delays LCP by 500-800ms, tanks mobile performance, rarely used on portfolios | Use email contact form + social links — 0KB, instant |

## Feature Dependencies

```
Mobile LCP Optimization
    ├──requires──> Hero Image Priority Hints (fetchpriority="high")
    │                   └──requires──> Image format validation (WebP/AVIF)
    ├──requires──> Font Preload Strategy
    │                   └──requires──> Subset + woff2 validation
    └──requires──> Render Delay Reduction
                        └──requires──> Critical CSS extraction

INP Optimization
    ├──requires──> GSAP Yielding (scheduler.yield())
    ├──requires──> Interaction-Triggered Hydration
    │                   └──requires──> Intersection Observer setup
    └──requires──> Event Delegation (not per-element handlers)

Network-Aware Loading
    ├──requires──> Network Information API detection
    ├──requires──> Component lazy loading (next/dynamic)
    └──enhances──> Streaming SSR (better experience on slow networks)

Real-Time CWV Alerts
    ├──requires──> Vercel Drains (Pro plan, $0.50/GB)
    ├──requires──> External alerting service (Upstash/Trigger.dev)
    └──conflicts──> Hobby plan constraints (2,500 events/month limit)

Geo Performance Monitoring
    ├──requires──> Vercel Speed Insights enabled
    └──enhances──> Network-Aware Loading (informs adaptive thresholds)

Per-Route Budgets
    ├──requires──> Lighthouse CI workflow (already exists)
    └──enhances──> Real-Time Alerts (provides threshold values)
```

### Dependency Notes

- **Mobile LCP Optimization requires Hero Image Priority Hints:** Can't improve LCP without telling browser to prioritize the LCP element. fetchpriority="high" on hero image is non-negotiable.
- **INP Optimization requires GSAP Yielding:** GSAP animations block main thread. scheduler.yield() lets browser handle interactions between animation frames.
- **Network-Aware Loading enhances Streaming SSR:** On slow networks, streaming + adaptive loading compounds benefits — users get instant hero + deferred heavy components.
- **Real-Time CWV Alerts conflicts with Hobby plan:** Vercel Drains requires Pro plan ($20/month). Hobby plan limited to 2,500 events/month and no commercial use.
- **Geo Performance Monitoring requires Speed Insights:** Already collecting data, just need to surface in workflow. Free on Hobby plan.

## MVP Definition

### Launch With (Current Milestone)

Minimum viable optimizations to get mobile performance from 3.7s LCP → <2.5s and enable baseline observability.

- [x] **Hero image priority hints** — fetchpriority="high" on LCP image, preconnect to external origins. Expected: -800ms LCP
- [x] **Font preload validation** — Verify Space Grotesk + Inter woff2 subset is minimal, preload only critical weights. Expected: -200ms FCP
- [ ] **Critical CSS extraction** — Inline above-fold styles, defer below-fold CSS. Expected: -300ms render delay
- [ ] **GSAP yielding strategy** — Wrap long animations in scheduler.yield() to prevent INP spikes. Expected: eliminate 432ms outlier
- [ ] **Vercel Speed Insights dashboard review** — Enable, analyze geo performance (Egypt focus), set baseline metrics
- [ ] **Lighthouse CI per-route budgets** — Extend budgets.json with route-specific thresholds (hero pages stricter than static pages)
- [ ] **Interaction-triggered hydration for heavy components** — Defer CustomCursor, Testimonials hydration until scroll proximity. Expected: -150ms TBT

### Add After Validation (Post-Launch Enhancements)

Features to add once core mobile performance hits <2.5s LCP and observability is baseline-operational.

- [ ] **Network-aware component loading** — Detect effective connection type, serve lightweight variants on slow networks. Trigger: if Egypt mobile users still >3s LCP after MVP
- [ ] **Streaming SSR with granular Suspense** — Wrap below-fold Server Components in Suspense with skeleton fallbacks. Trigger: when adding new dynamic sections
- [ ] **Geographic CDN optimization** — If TTFB remains >1.5s in Egypt, investigate CDN edge node coverage or add Cloudflare in front of Vercel
- [ ] **Real-time CWV alerts (if Pro plan)** — Set up Vercel Drains → Upstash/Trigger.dev for regression alerts. Trigger: when site becomes commercial or traffic >10K/month

### Future Consideration (v2+)

Features to defer until portfolio site scales or becomes a commercial product.

- [ ] **Full OpenTelemetry instrumentation** — Add tracing for Server Actions, database queries. Why defer: overkill for 7-page static site, adds complexity
- [ ] **A/B testing for performance optimizations** — Test network-aware loading vs standard loading. Why defer: need statistically significant traffic (>50K/month)
- [ ] **Edge-rendered personalization** — Serve different hero content based on geo/device. Why defer: requires Middleware complexity, minimal value for portfolio
- [ ] **Predictive prefetching** — ML-based link prefetch based on user behavior patterns. Why defer: needs analytics data over 6+ months

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Expected Impact |
|---------|------------|---------------------|----------|-----------------|
| Hero image priority hints | HIGH | LOW | P1 | -800ms LCP |
| Font preload validation | HIGH | LOW | P1 | -200ms FCP |
| Critical CSS extraction | HIGH | MEDIUM | P1 | -300ms render delay |
| GSAP yielding strategy | HIGH | MEDIUM | P1 | Eliminate 432ms INP outlier |
| Speed Insights dashboard | MEDIUM | LOW | P1 | Baseline observability |
| Per-route performance budgets | MEDIUM | LOW | P1 | Prevent regressions |
| Interaction-triggered hydration | MEDIUM | MEDIUM | P1 | -150ms TBT |
| Network-aware loading | MEDIUM | HIGH | P2 | -500ms LCP on slow networks |
| Streaming SSR + Suspense | MEDIUM | MEDIUM | P2 | Perceived performance boost |
| Geo CDN optimization | MEDIUM | HIGH | P2 | -300ms TTFB (Egypt) |
| Real-time CWV alerts | LOW | MEDIUM | P3 | Proactive regression detection |
| Full OTel instrumentation | LOW | HIGH | P3 | Deep debugging (overkill) |

**Priority key:**
- P1: Must have for launch (get mobile <2.5s LCP + baseline observability)
- P2: Should have, add when possible (optimize for emerging markets specifically)
- P3: Nice to have, future consideration (when site becomes commercial or scales)

## Mobile Performance Analysis

### Current State (Egypt Mobile — 73% of Traffic)

| Metric | Current | Target | Gap | Technique | Expected Impact |
|--------|---------|--------|-----|-----------|-----------------|
| LCP | 3.7s | <2.5s | -1.2s | fetchpriority + critical CSS + image optimization | -800ms (priority) + -300ms (CSS) + -100ms (AVIF) |
| FCP | 1.66s | <1.8s | ✅ PASS | Font preload validation | -200ms (safety margin) |
| INP | 72ms (432ms outlier) | <200ms | ⚠️ Outlier | GSAP yielding + event delegation | Eliminate 432ms spike |
| TTFB | 1.77s | <1.5s | -270ms | CDN edge caching + preconnect | -300ms (if CDN optimized) |
| CLS | 0 | <0.1 | ✅ PASS | Already optimal | N/A |

### Optimization Techniques by Impact

**High Impact (>500ms improvement):**
1. **fetchpriority="high" on LCP image** — Tells browser to prioritize hero image in first critical render phase (-800ms expected)
2. **Network-aware loading** — Serve 50% smaller assets on slow connections (-500ms on <4G)
3. **Critical CSS extraction** — Inline above-fold styles, eliminate render-blocking CSS (-300ms)

**Medium Impact (200-500ms improvement):**
1. **Font preload validation** — Ensure only critical font weights preloaded, subset for used glyphs (-200ms)
2. **Interaction-triggered hydration** — Defer non-critical JS until user proximity (-150ms TBT)
3. **CDN edge optimization** — Improve Egypt TTFB via regional edge nodes or Cloudflare (-300ms TTFB)

**Low Impact (<200ms improvement):**
1. **GSAP yielding** — Prevents 432ms outlier INP spikes, improves P99 interactivity
2. **Streaming SSR** — Perceived performance (user sees content sooner), minimal measurable LCP impact
3. **Per-route budgets** — Prevents future regressions, no immediate perf gain

### Mobile-Specific Considerations (Egypt / Emerging Markets)

**Connection Reality:**
- 3G/4G dominant, not 5G
- Latency: 100-300ms typical
- Bandwidth: 2-10 Mbps (not 50+)
- Device CPU: Mid-range (not flagship)

**Optimization Strategy:**
1. **Reduce payload** — Every KB costs 100ms+ on 3G. Target <180KB initial bundle (current: 181KB GSAP)
2. **Prioritize critical path** — LCP element must load in first 2 roundtrips (hero image + critical CSS)
3. **Defer non-critical** — Testimonials, CustomCursor, analytics can wait until after LCP
4. **Adapt to network** — Detect slow connections, serve smaller images + skip heavy animations
5. **Test on real devices** — Lighthouse mobile simulation ≠ actual Egypt Redmi/Samsung on 4G

## Observability Feature Analysis

### Vercel Speed Insights (Built-In, Free on Hobby)

**What It Provides:**
- Real User Monitoring (RUM) for Core Web Vitals (LCP, FCP, INP, CLS, TTFB)
- Per-route performance breakdown
- Geographic performance map (see Egypt vs US performance)
- Device type filtering (mobile vs desktop)
- P75/P90/P95/P99 percentile analysis
- Time-based trend graphs

**Limitations on Hobby Plan:**
- No custom events (Pro plan only)
- Limited data retention window (30 days vs 90 on Pro)
- Shared 2,500 events/month across all projects (Web Analytics)
- Speed Insights is free, but Web Analytics has strict limits

**Use Cases for Portfolio:**
- ✅ Track mobile LCP improvements over time
- ✅ Identify which routes/pages need optimization
- ✅ Monitor Egypt vs global performance delta
- ✅ Detect performance regressions post-deployment
- ❌ Track custom user interactions (needs Pro + Web Analytics)
- ❌ Export raw data for external analysis (needs Vercel Drains, Pro plan)

### Vercel Web Analytics (Hobby: 2,500 events/month)

**What It Provides:**
- Page views, referrers, demographics (location, OS, browser)
- UTM tracking (Pro+)
- Custom events (Pro+)
- First-party, privacy-friendly (avoids ad blockers)

**Limitations on Hobby:**
- 2,500 events/month total (across all projects)
- No custom events
- Collection paused after 3-day grace period if exceeded
- Non-commercial use only

**Not Needed for This Milestone:**
- Already have Microsoft Clarity for behavioral analytics (session replay, heatmaps)
- Speed Insights covers performance monitoring
- 2,500 events/month too restrictive for even modest portfolio traffic

### OpenTelemetry (Optional, Advanced)

**What It Provides:**
- Distributed tracing (request → server action → database)
- Custom spans for performance debugging
- Vendor-agnostic (works with Datadog, Grafana, Honeycomb, etc.)
- Deep backend observability

**When to Use:**
- Complex Next.js apps with many Server Actions
- Need to debug slow database queries or API calls
- Want vendor-agnostic observability (not locked to Vercel)

**Why NOT for This Milestone:**
- Adds ~200KB to bundle via @vercel/otel
- 7-page portfolio has no complex backend logic
- Increases TTFB slightly due to instrumentation overhead
- Speed Insights + Lighthouse CI sufficient for current needs

**Future Trigger:**
- If adding CMS integration, payment processing, or database-heavy features
- If TTFB remains high and need to trace slow server operations

## Competitor Feature Analysis

Since this is a portfolio site (not a product), "competitors" = other high-performance portfolio sites and Vercel's own performance benchmarks.

| Feature | Vercel Benchmark (nextjs.org) | This Portfolio (ayasser.com) | Gap |
|---------|-------------------------------|------------------------------|-----|
| Mobile LCP | <2.5s (target) | 3.7s (current) | -1.2s |
| Desktop LCP | <2.5s | ✅ Perfect 100 | ✅ Exceeds |
| INP | <200ms | 72ms (432ms outlier) | ⚠️ Outlier handling |
| TTFB | <800ms | 1.77s | -970ms |
| Bundle size | <150KB | 181KB (GSAP) | -31KB |
| Image optimization | WebP/AVIF + priority | ✅ Already using | ✅ Match |
| Font strategy | Preload subset woff2 | ✅ Already using | ✅ Match |
| Reduced motion | gsap.matchMedia() | ✅ Already using | ✅ Match |
| Observability | Speed Insights + Drains | Speed Insights only | Missing: Drains (Pro only) |

**Key Insight:** Desktop performance already exceeds Vercel benchmarks. Mobile gap driven by TTFB (1.77s) and LCP (3.7s) — both solvable with priority hints + critical CSS + edge caching.

## Sources

### Mobile Performance Optimization
- [I Migrated a React App to Next.js 16 and Got a 218% Performance Boost on Mobile](https://medium.com/@desertwebdesigns/i-migrated-a-react-app-to-next-js-16-and-got-a-218-performance-boost-on-mobile-8ae35ee2a739)
- [Mastering Mobile Performance: A Complete Guide to Improving Next.js Lighthouse Scores](https://www.wisp.blog/blog/mastering-mobile-performance-a-complete-guide-to-improving-nextjs-lighthouse-scores)
- [Optimizing Next.js Performance: LCP, Render Delay & Hydration](https://www.iamtk.co/optimizing-nextjs-performance-lcp-render-delay-hydration)
- [Next.js Performance Optimisation (2025): Get Started Fast](https://pagepro.co/blog/nextjs-performance-optimization-in-9-steps/)
- [How to Optimize Core Web Vitals in NextJS App Router for 2025](https://makersden.io/blog/optimize-web-vitals-in-nextjs-2025)

### INP & Interaction Optimization
- [Improving INP in React and Next.js](https://www.thisdot.co/blog/improving-inp-in-react-and-next-js)
- [INP Optimization: Complete Guide to Interaction to Next Paint | 2026](https://www.linkgraph.com/blog/interaction-to-next-paint-optimization/)
- [Improving INP with React 18 and Suspense - Vercel](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense)
- [How Preply improved INP on a Next.js application](https://medium.com/preply-engineering/how-preply-improved-inp-on-a-next-js-application-without-react-server-components-and-app-router-491713149875)
- [Demystifying INP: New tools and actionable insights - Vercel](https://vercel.com/blog/demystifying-inp-new-tools-and-actionable-insights)

### GSAP Animation Performance
- [Optimizing GSAP & Canvas for Smooth, Responsive Design](https://www.augustinfotech.com/blogs/optimizing-gsap-and-canvas-for-smooth-performance-and-responsive-design/)
- [Optimizing Complex Animations: Tips and Tricks](https://shakuro.com/blog/optimizing-complex-animations-tips-and-tricks)
- [GSAP Mobile Optimization - GSAP Forums](https://gsap.com/community/forums/topic/35654-gsap-mobile-optimization/)

### Vercel Observability & Speed Insights
- [Vercel Speed Insights Overview](https://vercel.com/docs/speed-insights)
- [Vercel Speed Insights Limits and Pricing](https://vercel.com/docs/speed-insights/limits-and-pricing)
- [Vercel Web Analytics Pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Tracking Core Web Vitals with Vercel and Honeycomb](https://www.honeycomb.io/resources/guides/tracking-core-web-vitals-vercel-honeycomb)
- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains)

### OpenTelemetry & Advanced Observability
- [Vercel AI SDK Observability & Monitoring with OpenTelemetry](https://signoz.io/docs/vercel-ai-sdk-observability/)
- [Guides: OpenTelemetry | Next.js](https://nextjs.org/docs/app/guides/open-telemetry)
- [How to Configure OpenTelemetry in Next.js Using @vercel/otel](https://oneuptime.com/blog/post/2026-02-06-opentelemetry-nextjs-vercel-otel/view)

### Network-Aware & Adaptive Loading
- [Google Chrome Labs: Adaptive Loading](https://github.com/GoogleChromeLabs/adaptive-loading)
- [Next.js Adaptive Loading & Network-Aware Components](https://nextjs.org/docs/app/guides/lazy-loading)
- [React, Next.js, Node.js: The Full‑Stack Innovations in 2026](https://kanhasoft.com/blog/react-next-js-node-js-the-full%E2%80%91stack-innovations-changing-software-in-2026/)

### CDN & Edge Optimization
- [Vercel CDN Internals: How Edge Network Boosts NextJS Apps](https://blog.blazingcdn.com/en-us/vercel-cdn-internals-how-edge-network-boosts-nextjs-apps)
- [CDN Caching Strategies for Next.js: Speed Up Your Website Globally](https://javascript.plainenglish.io/cdn-caching-strategies-for-next-js-speed-up-your-website-globally-d3b8ed08bc31)
- [5 Mobile Site Speed Optimization Tips to Boost Performance Fast in 2026](https://wp-rocket.me/blog/mobile-site-speed-optimization/)

### React Server Components & Performance
- [React Server Components (RSC) Explained: The 2026 Guide](https://www.grapestechsolutions.com/blog/react-server-components-explained/)
- [React Server Components: Do They Really Improve Performance?](https://www.developerway.com/posts/react-server-components-performance)
- [Intro to Performance of React Server Components](https://calendar.perfplanet.com/2025/intro-to-performance-of-react-server-components/)

### Priority Hints & Resource Optimization
- [Preload, Preconnect, Prefetch: Improve Your Site's Performance with Resource Hints](https://nitropack.io/blog/post/resource-hints-performance-optimization)
- [What are preload, prefetch, fetchpriority preconnect?](https://www.matthewedgar.net/blog/preload-prefetch-fetchpriority-preconnect/)
- [Browser Resource Hints: preload, prefetch, and preconnect](https://www.debugbear.com/blog/resource-hints-rel-preload-prefetch-preconnect)
- [Next.js 16 Prefetching Enhancements](https://nextjs.org/blog/next-16)

### Emerging Markets Mobile Performance
- [App Load Speed Optimization: Improve UX, SEO & Performance](https://www.xoance.com/app-load-speed-optimization-ux-seo/)
- [Emerging Markets Mobile Boom: How App-Centric Startups Are Growing](https://techmoran.com/2025/12/03/emerging-markets-mobile-boom-how-app-centric-startups-are-growing-in-2025-2026/)
- [Web Performance in 2026: Best Practices for Speed, Security & Core Web Vitals](https://solidappmaker.com/web-performance-in-2026-best-practices-for-speed-security-core-web-vitals/)

---
*Feature research for: Mobile Performance Optimization & Full Observability*
*Researched: 2026-02-16*
