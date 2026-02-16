# Pitfalls Research

**Domain:** Mobile Performance Optimization & Observability for GSAP-Heavy Next.js 16 Portfolio
**Researched:** 2026-02-16
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Desktop Performance Regression from Mobile-Targeted Optimizations

**What goes wrong:**
Aggressive mobile optimizations (e.g., over-preloading fonts only needed on mobile, adding global `content-visibility` CSS, or using SSR instead of SSG for dynamic data checks) can slow down desktop rendering, increase bundle size, or break the existing 100 Lighthouse score on desktop.

**Why it happens:**
Developers optimize for the lowest common denominator (mobile) without testing desktop impact. Next.js 16 doesn't automatically scope optimizations by viewport — responsive logic must be explicitly built. Mobile-first CSS or client-side device detection runs on all devices, adding overhead even when not needed.

**How to avoid:**
- Test desktop Lighthouse score after every mobile optimization change
- Use `sizes` attribute on `next/image` to serve different image sizes per breakpoint — not different optimization strategies
- Scope CSS optimizations like `content-visibility: auto` to specific breakpoints using media queries
- Never globally preload fonts only used on mobile routes — use page-level font preloading instead
- Run Lighthouse audits for both Mobile and Desktop in CI/CD before merging

**Warning signs:**
- Desktop Lighthouse score drops from 100 to 90s range
- Desktop FCP/LCP increases by >100ms
- Desktop bundle size grows by >20KB without new features
- Desktop animations stutter or drop frames after mobile optimizations land

**Phase to address:**
Phase 1 (Foundation) — establish dual-device testing baseline before any mobile optimizations. Add CI step that fails if desktop score regresses below 98.

---

### Pitfall 2: GSAP Animation Breaks from Aggressive Mobile Performance Hacks

**What goes wrong:**
Techniques like CSS `will-change`, `content-visibility`, `transform: translateZ(0)` for GPU acceleration, or FPS capping via `gsap.ticker.fps(30)` can interfere with GSAP's animation engine, causing janky animations, incorrect timing, or broken ScrollTrigger pinning on mobile.

**Why it happens:**
GSAP expects full control over the rendering pipeline. CSS containment (`content-visibility`) prevents GSAP from accurately measuring element dimensions for ScrollTrigger `start`/`end` calculations. FPS capping breaks GSAP's internal ticker synchronization. `will-change` applied to animated elements can cause paint flashing or stacking context issues.

**How to avoid:**
- Never apply `content-visibility: auto` to elements with GSAP ScrollTrigger animations
- Don't use `gsap.ticker.fps()` unless specifically debugging low-end devices — GSAP's default RAF is already optimized
- Use `gsap.context()` for cleanup on viewport resize — prevents stale animation state
- Use `ScrollTrigger.normalizeScroll()` and `ScrollTrigger.config({ ignoreMobileResize: true })` to prevent mobile address bar resize jumps
- Test GSAP animations on real Android/iOS devices, not just Chrome DevTools throttling

**Warning signs:**
- ScrollTrigger animations jump or reverse unexpectedly on scroll
- Pinned elements unpin at wrong scroll positions
- `gsap.to()` animations play at inconsistent speeds
- Elements animated via GSAP have invisible text or broken gradients (CSS containment conflict)
- Mobile keyboard opening causes animations to reverse

**Phase to address:**
Phase 2 (Mobile Animation Hardening) — audit all GSAP animations for mobile-specific issues before adding any new performance optimizations. Add mobile-device E2E tests that verify ScrollTrigger pinning accuracy.

---

### Pitfall 3: GSAP SplitText + `bg-clip-text` Makes Text Invisible

**What goes wrong:**
Combining GSAP SplitText (which wraps each character in a `<span>`) with Tailwind's `text-transparent bg-clip-text bg-gradient-to-r` makes text completely invisible. The gradient background stays on the parent, while `text-transparent` is inherited by child spans, hiding all characters.

**Why it happens:**
`bg-clip-text` requires the gradient background and text to be on the **same element**. SplitText creates nested child elements, breaking this requirement. The gradient doesn't propagate to children, but transparency does.

**How to avoid:**
- Never use `bg-clip-text` with GSAP SplitText
- Use solid `color` or Tailwind `text-*` classes for SplitText-animated elements — `color` is inherited and works with nested elements
- If gradient text is required, apply it **after** SplitText animation completes and text is revealed
- Alternative: use inline SVG text with gradient fill instead of CSS gradients

**Warning signs:**
- Hero heading text is completely invisible after GSAP animation loads
- Text flashes visible on page load, then disappears when GSAP initializes
- Inspector shows correct DOM structure but text renders as blank
- Gradient background renders correctly but no text appears over it

**Phase to address:**
Phase 1 (Foundation) — audit all existing GSAP text animations for `bg-clip-text` usage before adding any mobile optimizations. Already fixed in codebase but document as a known pattern to avoid.

---

### Pitfall 4: Next.js 16 Turbopack + Custom Webpack Loaders Break Production Builds

**What goes wrong:**
Next.js 16 makes Turbopack the default bundler. Projects with custom webpack configs or webpack plugins (e.g., `@svgr/webpack`, Payload CMS's `withPayload()`, `emitDecoratorMetadata` for ORMs) fail to build with cryptic errors like `This build is using Turbopack, with a webpack config and no turbopack config`.

**Why it happens:**
Turbopack **does not support webpack plugins** and only partially implements the webpack loader API. Third-party libraries that unconditionally inject webpack hooks break the build. Loaders that transform non-JS files (stylesheets, images) are not supported.

**How to avoid:**
- Audit all dependencies for webpack plugin/loader usage **before** upgrading to Next.js 16
- Use `--webpack` flag to opt out of Turbopack if dependencies aren't compatible
- Replace webpack-specific loaders with Turbopack-compatible alternatives (e.g., Next.js built-in image optimization instead of `@svgr/webpack`)
- Check that all environment variables used in client components have `NEXT_PUBLIC_` prefix — Turbopack is stricter
- Run `npx @next/codemod@latest next-experimental-turbo-to-turbopack .` to migrate config if upgrading from Next.js 15

**Warning signs:**
- Build fails with "This build is using Turbopack, with a webpack config"
- Static asset imports fail that worked in Next.js 15
- Environment variables throw errors in client components that previously worked
- Decorator metadata errors in production when using ORMs (MikroORM, TypeORM)

**Phase to address:**
Phase 1 (Foundation) — before adding any new dependencies, verify Turbopack compatibility. Add a test build step to CI that uses Turbopack (not webpack fallback).

---

### Pitfall 5: `next/image` Priority/Preload Misconfiguration Regresses Mobile LCP

**What goes wrong:**
In Next.js 16, the `priority` prop is deprecated in favor of `preload`. Using the wrong prop, lazy-loading the LCP image, or missing the `sizes` attribute causes mobile LCP to increase from 1.8s to 3.7s+. Multiple font instances or global font preloading adds unnecessary network overhead on mobile.

**Why it happens:**
Legacy patterns from Next.js 12-13 are actively harmful in Next.js 16. Teams forget to migrate `priority` → `preload`, or they apply `loading="lazy"` globally without excluding above-the-fold images. The `sizes` attribute is easy to overlook but critical for responsive image selection — without it, the browser downloads the largest image variant even on mobile.

**How to avoid:**
- Use `loading="eager"` and `fetchPriority="high"` for LCP images (above the fold)
- Always specify `sizes` attribute for responsive images (e.g., `sizes="(max-width: 768px) 100vw, 50vw"`)
- Define fonts at module level, not inside `useEffect` or dynamic imports
- Scope font preloading to routes where fonts are actually used — don't preload globally
- Include only the font subsets you need (e.g., `subsets: ['latin']`)
- Run Lighthouse audit and verify LCP element is preloaded correctly

**Warning signs:**
- Mobile LCP > 2.5s (failing Core Web Vitals threshold)
- Network tab shows largest image variant downloaded on mobile (e.g., 1920w instead of 750w)
- Lighthouse warning: "Largest Contentful Paint element was not preloaded"
- Lighthouse warning: "Preload key request for font but no subset specified"
- Multiple instances of the same font file loaded (check Network tab for duplicate font URLs)

**Phase to address:**
Phase 2 (Mobile LCP Optimization) — audit all `next/image` usage, verify `sizes` attributes, and migrate `priority` → `preload`. Phase 3 (Font Optimization) — scope font preloading to specific routes, eliminate duplicate font instances.

---

### Pitfall 6: GSAP Animating `left`/`top` Instead of `x`/`y` Kills Mobile Performance

**What goes wrong:**
Animating CSS `left`/`top` properties via GSAP triggers layout recalculation on every frame, causing janky animations and high INP on mobile. Mobile devices (slower CPUs) can't keep up, resulting in 15-20 FPS instead of 60 FPS.

**Why it happens:**
`left`/`top` are layout properties that run on the main thread and force style/layout/paint recalculation. GSAP's `x`/`y` use CSS transforms which are GPU-accelerated and don't trigger layout. Developers coming from jQuery or vanilla CSS animations don't know this GSAP-specific optimization.

**How to avoid:**
- Use `gsap.to(el, { x: 100, y: 100 })` instead of `{ left: "100px", top: "100px" }`
- Use `rotation`, `scale`, `opacity`, `x`, `y` — all GPU-accelerated
- Avoid animating `width`, `height`, `margin`, `padding` — all trigger layout
- Use Chrome DevTools Performance panel with 4x CPU slowdown to identify layout thrashing
- Check for purple "Layout Shift" bars in the performance flamegraph

**Warning signs:**
- Mobile animations stutter or drop frames
- Performance panel shows excessive "Recalculate Style" and "Layout" events
- INP > 200ms on pages with GSAP animations
- Desktop animations smooth, mobile animations janky (CPU-bound issue)

**Phase to address:**
Phase 2 (Mobile Animation Hardening) — audit all GSAP animations and replace layout-triggering properties with transforms. Add ESLint rule or PR checklist item to catch `left`/`top` in GSAP calls.

---

### Pitfall 7: Mobile Viewport Height Resize Breaks ScrollTrigger Pinning

**What goes wrong:**
On mobile, the address bar showing/hiding resizes the viewport, causing ScrollTrigger animations to jump, reverse, or unpin at wrong scroll positions. Clicking a form input opens the keyboard, shrinking the viewport and triggering ScrollTrigger refresh, reversing all animations up to that point.

**Why it happens:**
Mobile browsers resize the viewport on scroll to show/hide UI chrome. ScrollTrigger must recalculate `start`/`end` positions when viewport height changes, but it's logically impossible to keep trigger positions accurate **and** avoid jumps. Modern browsers handle scrolling on a separate thread, so the screen may repaint before JavaScript applies pinning, causing visible jumps.

**How to avoid:**
- Use `ScrollTrigger.normalizeScroll()` to prevent address bar show/hide on most devices
- Set `ScrollTrigger.config({ ignoreMobileResize: true })` to skip refreshes on mobile viewport resizes
- Use `gsap.context()` to clean up and re-apply ScrollTrigger on manual resize events
- Test on real iOS/Android devices — Chrome DevTools mobile emulation doesn't reproduce this issue
- Avoid ScrollTrigger on pages with form inputs that trigger mobile keyboard

**Warning signs:**
- Pinned elements jump when scrolling on mobile
- Animations reverse when mobile keyboard opens
- ScrollTrigger `start`/`end` markers shift position mid-scroll
- Triggers work perfectly on desktop but fail on mobile

**Phase to address:**
Phase 2 (Mobile Animation Hardening) — configure ScrollTrigger mobile workarounds before deploying to production. Add E2E test on BrowserStack/real device that scrolls and interacts with forms.

---

### Pitfall 8: Missing `contain-intrinsic-size` with `content-visibility` Causes Layout Shift

**What goes wrong:**
Using `content-visibility: auto` without `contain-intrinsic-size` causes elements to render with 0 height initially, then jump to full height when scrolled into view. This creates massive CLS (Cumulative Layout Shift) spikes, failing Core Web Vitals.

**Why it happens:**
`content-visibility: auto` enables size containment — the browser skips rendering off-screen content but needs to reserve space for it. Without `contain-intrinsic-size`, the browser defaults to 0 height, causing scrollbar jumps and layout shifts when content renders.

**How to avoid:**
- Always pair `content-visibility: auto` with `contain-intrinsic-size: auto 500px` (use a realistic height estimate)
- The `auto` keyword makes the browser remember the last-rendered size, improving accuracy over time
- Use `contain-intrinsic-size: auto none` for grid/multi-column layouts (avoids 0px fallback issues)
- Test CLS in Lighthouse and Chrome DevTools Performance Insights
- Apply to below-the-fold content only (e.g., `.blog-post:nth-child(n+10)`)

**Warning signs:**
- Lighthouse CLS > 0.1 (failing threshold)
- Scrollbar size jumps when scrolling down the page
- Elements "pop in" with height instead of smoothly revealing
- Layout shifts visible in Performance panel timeline

**Phase to address:**
Phase 3 (Advanced CSS Optimizations) — add `content-visibility` only after LCP and FCP are already optimized. Verify CLS doesn't regress.

---

### Pitfall 9: Vercel Hobby Plan Observability Gaps Blind Mobile Performance Issues

**What goes wrong:**
Vercel Hobby plan lacks Monitoring, has short data retention (~30 days), and pauses Web Analytics collection after exceeding limits. Mobile performance regressions go undetected because real-user metrics aren't captured long enough to identify trends.

**Why it happens:**
Observability Plus (with Monitoring, extended retention, and unlimited events) requires Pro/Enterprise plan. Hobby plan is "fair use" for non-commercial projects — hitting usage caps is expected, not exceptional. Speed Insights works, but without historical data or alerting, regressions are only noticed when users complain.

**How to avoid:**
- Run Lighthouse CI on every PR to catch regressions before deployment
- Use `@vercel/speed-insights` package to log Core Web Vitals client-side and pipe to alternative analytics (e.g., Plausible, Simple Analytics)
- Set up a cron job to run daily Lighthouse audits via Puppeteer and store results in git or Notion
- Monitor GitHub Issues/Discord for user-reported performance complaints
- Upgrade to Vercel Pro if mobile traffic exceeds 10k visits/month and performance is critical

**Warning signs:**
- Vercel dashboard shows "Analytics paused — usage limit exceeded"
- Speed Insights data stops updating mid-month
- No historical trends beyond 30 days to compare performance changes
- Mobile LCP/INP regressions discovered weeks after deploy (no alerting)

**Phase to address:**
Phase 4 (Observability Integration) — set up Lighthouse CI and client-side Web Vitals logging before adding Vercel Speed Insights. Document Hobby plan limitations and fallback monitoring strategy.

---

### Pitfall 10: High TTFB from Egypt/High-Latency Regions Misattributed to Code

**What goes wrong:**
Mobile TTFB of 1.77s from Egypt is blamed on slow Next.js SSR, cold starts, or database queries. Team spends weeks optimizing server-side code with negligible impact because the real issue is **network latency** (150-200ms base latency + CDN miss).

**Why it happens:**
TTFB is the sum of network latency + server processing time. Users in Egypt connecting to a `us-east-1` Vercel deployment face unavoidable 150-200ms round-trip latency before any code runs. If the CDN edge cache misses, it must fetch from origin, doubling latency. Developers measure TTFB locally (10-50ms) and assume the server is the problem.

**How to avoid:**
- Accept that TTFB < 100ms is impossible for geographically distant users on Vercel Hobby (no multi-region deployments)
- Use SSG/ISR instead of SSR for static content to maximize CDN cache hit rate
- Prioritize reducing LCP/FCP (which users actually feel) over chasing unrealistic TTFB targets
- Use Cloudflare or AWS CloudFront in front of Vercel for better global edge coverage (if budget allows)
- Track TTFB **by region** in analytics — don't optimize for the median if 73% of traffic is from high-latency regions
- Focus optimization efforts on what's controllable: bundle size, image size, render blocking resources

**Warning signs:**
- TTFB is fast locally (< 100ms) but slow in production (> 1.5s)
- Server-side code optimizations (caching, database co-location) don't improve TTFB
- TTFB is slow even for static pages with no SSR
- Geographic distribution of users shows 70%+ from regions far from deployment zone

**Phase to address:**
Phase 1 (Foundation) — establish realistic TTFB baseline by region. Accept 1.5-2s TTFB from Egypt as unavoidable on Hobby plan. Focus optimization on LCP/FCP/INP instead.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using `priority` instead of `preload` on images | Works in Next.js 15 | Breaks in Next.js 16, deprecated API warning | Never — deprecated in Next.js 16 |
| Lazy-loading all images (including LCP) | Reduces initial bundle | Regresses LCP by 500-1000ms, fails Core Web Vitals | Never for above-the-fold images |
| Global font preloading on all routes | Simple to implement | Mobile users download fonts they never use | Only if 90%+ of routes use the font |
| Skipping `sizes` attribute on responsive images | Less code to write | Browser downloads largest image on mobile, wastes bandwidth | Never — always specify `sizes` |
| Using `gsap.ticker.fps(30)` to "fix" mobile performance | Hides animation jank temporarily | Breaks GSAP synchronization, animations feel sluggish | Only for debugging low-end devices, never in production |
| Applying `content-visibility` without `contain-intrinsic-size` | Easy performance win | Massive CLS regression, fails Core Web Vitals | Never — always pair with size estimate |
| Using `--webpack` flag to avoid Turbopack issues | Unblocks Next.js 16 upgrade | Misses Turbopack perf benefits, must migrate eventually | Short-term during migration, not long-term |
| Animating `left`/`top` instead of `x`/`y` in GSAP | Familiar API from jQuery/CSS | Layout thrashing on every frame, janky mobile animations | Never — use transforms |
| Ignoring mobile viewport resize issues | Works fine on desktop | ScrollTrigger animations break on mobile | Never — configure `ignoreMobileResize` |
| Relying on Vercel Hobby observability alone | Free, zero setup | Data retention too short, no alerting, analytics paused at limits | Only for side projects with no performance SLA |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel Speed Insights | Expecting real-time alerting on Hobby plan | Speed Insights only shows data — no alerts. Set up Lighthouse CI for automated checks on PRs. |
| GSAP ScrollTrigger + React | Not cleaning up ScrollTrigger instances on unmount | Use `gsap.context()` in `useGSAP` hook and return cleanup function to prevent memory leaks and trigger multiplication. |
| Next.js Image + Responsive Layouts | Not specifying `sizes` attribute | Always provide `sizes="(max-width: 768px) 100vw, 50vw"` so browser downloads correct image variant. |
| Turbopack + Third-Party Loaders | Assuming webpack loaders work in Turbopack | Check Turbopack loader compatibility — only core subset of webpack loader API is supported. Use `--webpack` flag as fallback. |
| CDN + High-Latency Regions | Expecting low TTFB from distant regions | Accept baseline latency (150-200ms from Egypt to us-east-1). Use SSG/ISR to maximize CDN cache hit rate. Multi-region deployment requires Pro plan. |
| Vercel Web Analytics | Not monitoring usage limits on Hobby | Analytics collection pauses after exceeding limits. Set up alternative logging (Plausible, Simple Analytics) or upgrade to Pro. |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| GSAP animations on every element | Desktop smooth, mobile janky | Apply animations only to hero/above-fold sections. Use `prefers-reduced-motion` check. | 10+ animated elements on mobile devices |
| Server-side rendering for dynamic content | TTFB < 100ms locally | Use ISR with 60s revalidation instead of SSR. SSR adds 200-500ms TTFB on every request. | First user in each region after deploy |
| Loading all fonts on all routes | LCP < 1s on desktop | Scope font preloading to routes where fonts are used. Use `next/font` with page-level imports. | Mobile users on 3G networks |
| Client-side device detection for responsive features | Works in development | Causes hydration mismatches in production. Use CSS media queries or server-side User-Agent detection. | SSR + client mismatch |
| Relying on Chrome DevTools mobile emulation | Animations look smooth | Real mobile devices have slower CPUs, different viewport resize behavior, and address bar issues. | Production deployment |
| Global CSS `will-change` on animated elements | Initial render smooth | Creates stacking context issues, paint flashing, memory overhead. Apply `will-change` only during animation via GSAP. | 5+ elements with `will-change` |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing analytics event data in client bundle | User behavior tracking data leaked | Pipe Web Vitals to server-side endpoint, not client-side analytics. Use Vercel Analytics SDK which encrypts data. |
| Storing Vercel API tokens in `.env.local` | Tokens committed to git, leaked in client bundle | Use Vercel environment variables (encrypted at rest) or `VERCEL_TOKEN` in CI only. Never commit tokens. |
| Allowing unlimited Speed Insights data collection | Hobby plan caps exceeded, analytics paused | Implement sampling (e.g., 10% of traffic) or upgrade to Pro plan for unlimited events. |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animations that ignore `prefers-reduced-motion` | Users with motion sensitivity get nausea | Wrap all GSAP animations in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` check. |
| Layout shifts from lazy-loaded images | Content jumps while user is reading | Use `next/image` with explicit `width`/`height` or `fill` with sized container. Reserve space before images load. |
| Mobile animations reversing when keyboard opens | Broken UX, confusing behavior | Use `ScrollTrigger.config({ ignoreMobileResize: true })` or avoid ScrollTrigger on forms. |
| Invisible text from `bg-clip-text` + SplitText | Critical content (hero heading) completely hidden | Never combine gradient text with GSAP SplitText. Use solid `color` for animated text. |
| Janky animations on low-end Android devices | 15 FPS animations, unusable experience | Test on real devices, reduce animation complexity, use `x`/`y` transforms instead of `left`/`top`. |
| High LCP on mobile from missing `preload` | 3.7s blank screen before hero image loads | Mark LCP image with `loading="eager"` and `fetchPriority="high"`. Verify in Lighthouse. |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Mobile LCP Optimization:** Often missing `sizes` attribute on responsive images — verify network tab shows correct image variant downloaded (750w on mobile, not 1920w)
- [ ] **GSAP Mobile Animations:** Often missing `prefers-reduced-motion` check — verify `gsap.matchMedia("(prefers-reduced-motion: no-preference)")` wrapper exists
- [ ] **Font Optimization:** Often missing subset specification when `preload: true` — verify Lighthouse warning doesn't appear
- [ ] **ScrollTrigger Mobile:** Often missing `ignoreMobileResize` config — verify animations don't jump when scrolling on real iOS/Android device
- [ ] **Next.js 16 Migration:** Often using deprecated `priority` prop instead of `preload` — verify no deprecation warnings in build output
- [ ] **Vercel Observability:** Often assuming Hobby plan has alerting — verify Lighthouse CI is set up for automated checks
- [ ] **Desktop Regression Testing:** Often optimizing for mobile without testing desktop — verify desktop Lighthouse score hasn't dropped
- [ ] **Content Visibility:** Often missing `contain-intrinsic-size` when using `content-visibility: auto` — verify CLS score in Lighthouse
- [ ] **GSAP Transform Usage:** Often animating `left`/`top` instead of `x`/`y` — verify no layout thrashing in Performance panel
- [ ] **Real Device Testing:** Often only testing in Chrome DevTools — verify on real Android/iOS devices with address bar resize behavior

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Desktop regression from mobile optimizations | LOW | Revert mobile-specific changes, add desktop Lighthouse CI check, re-apply optimizations scoped to mobile breakpoints only |
| GSAP animations broken by CSS optimizations | MEDIUM | Remove `content-visibility` from animated elements, replace `will-change` with GSAP's built-in optimization, add `gsap.context()` cleanup |
| Invisible text from `bg-clip-text` + SplitText | LOW | Replace gradient text with solid color, or apply gradient after SplitText animation completes |
| Next.js 16 build failure from webpack deps | MEDIUM | Use `--webpack` flag temporarily, audit dependencies for Turbopack compatibility, migrate to native Next.js alternatives |
| Mobile LCP regression from lazy-loading | LOW | Add `loading="eager"` to LCP image, verify `sizes` attribute is present, re-run Lighthouse audit |
| ScrollTrigger jumping on mobile | LOW | Add `ScrollTrigger.normalizeScroll()` and `ignoreMobileResize: true` config, test on real device |
| CLS from missing `contain-intrinsic-size` | LOW | Add `contain-intrinsic-size: auto 500px` to elements with `content-visibility: auto`, re-test CLS in Lighthouse |
| TTFB misattribution (network vs code) | HIGH | Analyze TTFB by region, accept baseline latency for distant users, prioritize LCP/FCP optimizations instead |
| Vercel observability data loss | MEDIUM | Set up Lighthouse CI retroactively, implement client-side Web Vitals logging to alternative analytics, upgrade to Pro if budget allows |
| GSAP performance issues on mobile | MEDIUM | Replace `left`/`top` with `x`/`y`, remove `gsap.ticker.fps()` capping, test on real devices, reduce animation complexity |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Desktop regression from mobile optimizations | Phase 1 (Foundation) | CI checks desktop Lighthouse >= 98 on every PR |
| GSAP animation breaks from mobile perf hacks | Phase 2 (Mobile Animation Hardening) | E2E test on real device verifies ScrollTrigger pinning accuracy |
| `bg-clip-text` + SplitText invisible text | Phase 1 (Foundation) | Visual regression test captures hero heading on mobile |
| Turbopack + webpack loader conflicts | Phase 1 (Foundation) | Test build succeeds with Turbopack (not `--webpack` fallback) |
| `next/image` priority/preload misconfiguration | Phase 2 (Mobile LCP Optimization) | Lighthouse audit shows LCP image preloaded correctly |
| GSAP animating `left`/`top` instead of `x`/`y` | Phase 2 (Mobile Animation Hardening) | Performance panel shows no Layout events during animations |
| Mobile viewport resize breaks ScrollTrigger | Phase 2 (Mobile Animation Hardening) | E2E test scrolls + opens mobile keyboard, animations don't reverse |
| Missing `contain-intrinsic-size` with `content-visibility` | Phase 3 (Advanced CSS Optimizations) | Lighthouse CLS < 0.1 after adding `content-visibility` |
| Vercel Hobby observability gaps | Phase 4 (Observability Integration) | Lighthouse CI runs on every PR, Web Vitals logged to alternative analytics |
| High TTFB misattributed to code | Phase 1 (Foundation) | Document baseline TTFB by region, focus optimization on LCP/FCP |

---

## Sources

- [Next.js 16 Migration Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — Turbopack gotchas, deprecated props
- [I Migrated a React App to Next.js 16 and Got a 218% Performance Boost on Mobile](https://medium.com/@desertwebdesigns/i-migrated-a-react-app-to-next-js-16-and-got-a-218-performance-boost-on-mobile-8ae35ee2a739) — Performance improvements, no desktop regression evidence
- [GSAP In Practice: Avoid The Pitfalls](https://marmelab.com/blog/2024/05/30/gsap-in-practice-avoid-the-pitfalls.html) — `left`/`top` vs `x`/`y`, `fromTo()` overuse
- [GSAP Mobile Optimization Forums](https://gsap.com/community/forums/topic/35654-gsap-mobile-optimization/) — Mobile performance patterns
- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — Cleanup, memory leaks, ScrollTrigger
- [Next.js Image Optimization Guide](https://www.debugbear.com/blog/nextjs-image-optimization) — `priority` deprecation, `sizes` attribute, LCP regression
- [Components: Image Component | Next.js](https://nextjs.org/docs/app/api-reference/components/image) — Official `preload` migration docs
- [Interaction to Next Paint (INP)](https://web.dev/articles/inp) — INP measurement, GSAP animation impact
- [Understanding and Improving INP](https://www.speedcurve.com/web-performance-guide/understanding-and-improving-interaction-to-next-paint/) — Debugging INP issues
- [The Ultimate Guide to Improving Next.js TTFB](https://www.catchmetrics.io/blog/the-ultimate-guide-to-improving-nextjs-ttfb-slowness-from-800ms-to-less100ms) — TTFB optimization, geo-routing
- [Time to First Byte (TTFB)](https://web.dev/articles/ttfb) — TTFB thresholds, network latency
- [Next.js Font Optimization](https://www.contentful.com/blog/next-js-fonts/) — Font preloading, subset issues
- [How to Fix Font Loading Issues in Next.js](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view) — Dynamic import pitfalls
- [`content-visibility` Performance](https://web.dev/articles/content-visibility) — CSS containment, `contain-intrinsic-size`
- [`contain-intrinsic-size` MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/contain-intrinsic-size) — Auto sizing, grid/multi-column gotchas
- [GSAP ScrollTrigger Mobile Resize Issues](https://gsap.com/community/forums/topic/34243-scrolltrigger-problem-on-resizemobile/) — Mobile viewport height resize bugs
- [ScrollTrigger `normalizeScroll()`](https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.normalizeScroll()/) — Mobile address bar workaround
- [Vercel Speed Insights Limits](https://vercel.com/docs/speed-insights/limits-and-pricing) — Hobby plan limitations
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Fair use policy, 30-day usage reset
- [Next.js Responsive Images: Media Query Guide](https://nextjsstarter.com/blog/nextjs-image-responsive-sizing-media-query-guide/) — `sizes` attribute best practices
- [Migrating to Next.js 16: What Broke in Production](https://www.amillionmonkeys.co.uk/blog/migrating-to-nextjs-16-production-guide) — Real-world Turbopack migration issues
- [Next.js 16 Turbopack Feedback](https://github.com/vercel/next.js/discussions/77721) — Community-reported gotchas

---

*Pitfalls research for: Mobile Performance Optimization & Observability for GSAP-Heavy Next.js 16 Portfolio*
*Researched: 2026-02-16*
