# Architecture Research: Mobile Performance Optimization

**Domain:** Next.js 16 App Router Portfolio with Mobile Performance & Observability
**Researched:** 2026-02-16
**Confidence:** HIGH

## Current Architecture Overview

```
┌────────────────────────────────────────────────────────────────┐
│                     App Router Layer (SSR)                      │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  layout.tsx  │  │  page.tsx    │  │  *-content   │         │
│  │  (fonts,     │  │  (metadata)  │  │  .tsx        │         │
│  │   providers) │  │              │  │  (client)    │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
│         │                  │                  │                 │
├─────────┴──────────────────┴──────────────────┴─────────────────┤
│                    Client Providers Layer                        │
├────────────────────────────────────────────────────────────────┤
│  ┌────────────────┐  ┌──────────────────┐  ┌────────────────┐ │
│  │ ThemeProvider  │  │ MotionProvider   │  │ SmoothScroll   │ │
│  │                │  │ (reduced-motion) │  │ Provider       │ │
│  └────────────────┘  └──────────────────┘  └────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │          PageTransition (route transitions)                 │ │
│  └────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│                   Client Components Layer                        │
├────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────────┐  │
│  │   Hero     │  │ Testimonials│  │  ProjectsContent        │  │
│  │ (GSAP      │  │ (dynamic    │  │  (motion, filtering)    │  │
│  │  SplitText)│  │  ssr:true)  │  │                         │  │
│  └────────────┘  └────────────┘  └─────────────────────────┘  │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │   CustomCursor (dynamic, ssr:false)                      │   │
│  │   Navbar, Footer (client components)                     │   │
│  └─────────────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────────────┤
│                    GSAP Animation Layer                          │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │
│  │  ScrollTrigger│  │  SplitText   │  │  Core (gsap.*)       │ │
│  │  (11 sites)   │  │  (Hero,      │  │  (shared, 181KB      │ │
│  │               │  │   4 sites)   │  │   across 6 chunks)   │ │
│  └──────────────┘  └──────────────┘  └──────────────────────┘ │
├────────────────────────────────────────────────────────────────┤
│                   Observability Layer                            │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │ Speed Insights   │  │ Analytics        │  │ Clarity      │ │
│  │ (Web Vitals:     │  │ (page views)     │  │ (heatmaps)   │ │
│  │  LCP/FCP/INP)    │  │                  │  │              │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

## Integration Points for Mobile Performance

### 1. **LCP Optimization — Image Priority & Font Loading**

#### Components to Modify:
- **`src/app/layout.tsx`**: Font loading already optimized (Space Grotesk + Inter with `display: "swap"`)
- **`src/components/home/hero.tsx`**: Add `priority={true}` to hero background/avatar images
- **`src/app/(marketing)/projects/projects-content.tsx`**: Add `priority={true}` to first visible project card image (index === 0 in grid)

#### New Components:
None — modifications only.

#### Data Flow:
```
Server (layout.tsx)
    ↓ (font preload via next/font)
[Font CSS variables injected in <head>]
    ↓
Client (hero.tsx renders)
    ↓
[Hero image with priority={true} gets <link rel="preload"> in <head>]
    ↓
Browser (parallel fetch: fonts + LCP image)
    ↓
LCP occurs (text or image, whichever finishes first)
```

**Build Order:**
1. Layout.tsx font optimization (already done ✅)
2. Identify LCP candidate images via Lighthouse (mobile viewport)
3. Add `priority={true}` to **one** confirmed LCP image per page
4. Verify LCP improvement in Vercel Speed Insights

**Bottleneck Mapping:**
- **Current LCP 3.7s** is likely caused by hero section waiting for:
  - GSAP SplitText JS execution (181KB GSAP + 11 ScrollTrigger sites)
  - Font swap completing (Space Grotesk heading font)
  - Hero background rendering (radial gradients + grid pattern)
- **Fix:** Preload hero image, reduce GSAP SplitText overhead via lazy init

---

### 2. **FCP Optimization — Critical CSS & Render Blocking**

#### Components to Modify:
- **`next.config.ts`**: Already has `experimental.inlineCss: true` ✅
- **`src/app/layout.tsx`**: No changes needed (font preload automatic via next/font)

#### New Components:
None — configuration-level optimization.

#### Data Flow:
```
Server (Next.js build)
    ↓
[Critical CSS inlined in <head> via inlineCss: true]
    ↓
Browser (HTML parse + inline CSS apply)
    ↓
FCP occurs (first text/UI painted)
    ↓
Font swap (from preloaded woff2)
```

**Build Order:**
1. Verify `experimental.inlineCss: true` is active (already done ✅)
2. Audit CSS payload size in `.next/static/css/`
3. If CSS > 50KB, consider dynamic import for below-fold components (Testimonials already uses `dynamic()` ✅)

**Bottleneck Mapping:**
- **Current FCP 1.66s** is acceptable (< 2.5s threshold)
- No immediate action needed unless CSS payload grows

---

### 3. **INP Optimization — GSAP Task Splitting & React Compiler**

#### Components to Modify:
- **`src/components/home/hero.tsx`**: Defer GSAP SplitText initialization until idle or `requestIdleCallback`
- **`src/components/ui/split-text-reveal.tsx`**: Add SplitText lazy init guard
- **`src/app/(marketing)/projects/projects-content.tsx`**: Use React 19 `startTransition` for filter state updates

#### New Components:
**`src/hooks/use-idle-callback.ts`** (custom hook):
```typescript
import { useEffect } from "react";

export function useIdleCallback(callback: () => void, deps: unknown[] = []) {
  useEffect(() => {
    const id = requestIdleCallback(callback);
    return () => cancelIdleCallback(id);
  }, deps);
}
```

**`src/hooks/use-media-query.ts`** (for adaptive animations):
```typescript
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

#### Data Flow:
```
User Interaction (click filter button)
    ↓
[startTransition(() => setActiveCategory(...))]
    ↓
React (marks update as non-urgent, main thread stays responsive)
    ↓
Browser (processes other high-priority events: scroll, click)
    ↓
React (flushes transition update when idle)
    ↓
DOM update (filtered projects re-render)
    ↓
INP measured (from click to visual update)
```

**Build Order:**
1. Enable React Compiler in `next.config.ts`: `reactCompiler: true` (currently disabled)
2. Wrap filter state updates in `startTransition` (projects-content.tsx)
3. Defer GSAP SplitText to `requestIdleCallback` (hero.tsx)
4. Test INP improvement in Vercel Speed Insights (target < 200ms)

**Bottleneck Mapping:**
- **Current INP 72ms** (good, < 200ms threshold)
- **Outlier 432ms on `/`** likely caused by:
  - Hero GSAP SplitText execution blocking main thread
  - Lenis smooth scroll initialization
  - Multiple ScrollTrigger.create() calls (11 sites)
- **Fix:** Defer non-critical animations, split JS tasks < 50ms

---

### 4. **GSAP Mobile Optimization — Conditional Animations**

#### Components to Modify:
- **`src/components/home/hero.tsx`**: Wrap SplitText in `gsap.matchMedia("(min-width: 768px)")` — skip on mobile
- **`src/components/smooth-scroll-provider.tsx`**: Already disables smooth scroll on `prefers-reduced-motion` ✅
- **All GSAP consumers**: Add `(prefers-reduced-motion: no-preference)` guard (currently done in hero.tsx ✅)

#### New Components:
None — pattern already exists.

#### Data Flow:
```
Mobile User (viewport < 768px)
    ↓
[gsap.matchMedia() evaluates false]
    ↓
SplitText NOT executed (saves ~50ms input delay)
    ↓
Plain text rendered (no character splitting overhead)
```

**Build Order:**
1. Audit all GSAP consumers (11 ScrollTrigger sites)
2. Wrap desktop-only effects in `matchMedia("(min-width: 768px)")`
3. Keep essential animations (hero badge fade-in, stat counters)
4. Verify mobile INP stays < 200ms

**Bottleneck Mapping:**
- **GSAP SplitText on mobile** creates 50–100 DOM nodes per heading
- **Mobile CPUs** struggle with 181KB GSAP payload + execution overhead
- **Fix:** Skip SplitText on mobile, use CSS-only fade-in

---

### 5. **Vercel Observability Integration**

#### Components to Modify:
- **`src/app/layout.tsx`**: Already has `SpeedInsights` and `Analytics` ✅

#### New Components:
**`src/lib/web-vitals.ts`** (optional custom reporting):
```typescript
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

export function reportWebVitals() {
  onCLS(console.log);
  onFCP(console.log);
  onINP(console.log);
  onLCP(console.log);
  onTTFB(console.log);
}
```

#### Data Flow:
```
Browser (user navigates to page)
    ↓
[Speed Insights SDK captures Web Vitals]
    ↓
Vercel Edge (aggregates metrics)
    ↓
Vercel Dashboard (displays LCP/FCP/INP trends)
    ↓
Drains (optional: export to Datadog/Grafana)
```

**Build Order:**
1. Verify `@vercel/speed-insights` is installed ✅
2. Confirm `SpeedInsights` component renders in production ✅
3. Access dashboard: https://vercel.com/[team]/[project]/analytics/speed-insights
4. Set up alerts for LCP > 2.5s, INP > 200ms
5. (Optional) Configure Vercel Drains for Datadog export

**Integration Notes:**
- Speed Insights tracks 6 data points per visit:
  - **On page load:** TTFB, FCP
  - **On interaction:** FID, LCP
  - **On leave:** INP, CLS
- Data available per deployment, route, device, connection type
- Uses Lighthouse 10 scoring criteria
- No code changes needed — `<SpeedInsights />` handles everything

---

## Component Modification Summary

| File | Modification | Reason |
|------|--------------|--------|
| `src/components/home/hero.tsx` | Add `priority={true}` to hero image | Preload LCP candidate |
| `src/components/home/hero.tsx` | Wrap SplitText in `matchMedia("(min-width: 768px)")` | Skip on mobile to reduce INP |
| `src/app/(marketing)/projects/projects-content.tsx` | Add `priority={true}` to first card image | LCP optimization for /projects |
| `src/app/(marketing)/projects/projects-content.tsx` | Wrap `setActiveCategory` in `startTransition` | Non-blocking filter updates |
| `next.config.ts` | Enable `reactCompiler: true` | Automatic memoization for complex components |
| `src/hooks/use-idle-callback.ts` | **NEW** | Defer non-critical work |
| `src/hooks/use-media-query.ts` | **NEW** | Responsive animation loading |
| `src/lib/web-vitals.ts` | **NEW** (optional) | Custom Web Vitals logging |

---

## Build Order with Dependencies

```
Phase 1: Quick Wins (no dependencies)
├─ 1.1: Add priority={true} to hero image (hero.tsx)
├─ 1.2: Add priority={true} to first project card (projects-content.tsx)
└─ 1.3: Enable reactCompiler in next.config.ts

Phase 2: GSAP Optimization (depends on Phase 1 measurement)
├─ 2.1: Wrap hero SplitText in desktop-only matchMedia
├─ 2.2: Audit other GSAP consumers for mobile optimization
└─ 2.3: Create use-idle-callback hook for deferred animations

Phase 3: INP Refinement (depends on Phase 2 baseline)
├─ 3.1: Wrap filter state in startTransition (projects-content.tsx)
├─ 3.2: Defer Lenis initialization (smooth-scroll-provider.tsx)
└─ 3.3: Split long GSAP tasks into <50ms chunks

Phase 4: Observability (parallel to all phases)
├─ 4.1: Verify Speed Insights dashboard access
├─ 4.2: Set up LCP/INP alerts
└─ 4.3: (Optional) Configure Vercel Drains
```

---

## Render Pipeline Bottlenecks

### Next.js 16 App Router Rendering Flow:
```
Server (RSC render)
    ↓
[HTML with inline critical CSS, font preload links]
    ↓
Browser (parse HTML, fetch fonts + priority images)
    ↓
FCP (first text/UI painted with fallback font)
    ↓
[Font swap occurs via font-display: swap]
    ↓
[Client JS hydrates, GSAP initializes]
    ↓
LCP (largest content element painted — hero image or heading)
    ↓
[User interacts — INP measured from click to visual update]
```

### Mobile-Specific Bottlenecks:
1. **LCP Delay (3.7s):**
   - Hero image not preloaded → network waterfall (HTML → CSS → JS → image)
   - GSAP SplitText blocks main thread → text rendering delayed
   - **Fix:** Priority preload + defer SplitText to idle

2. **FCP Acceptable (1.66s):**
   - Inline CSS working well
   - Font preload via next/font effective
   - No immediate optimization needed

3. **INP Outlier (432ms on /):**
   - GSAP SplitText character splitting (50–100 DOM nodes)
   - ScrollTrigger initialization (11 sites)
   - Lenis smooth scroll setup
   - **Fix:** Defer animations, split tasks, use React Compiler

4. **JS Payload (181KB GSAP):**
   - Spread across 6 chunks (good)
   - Modular imports reduce waste (good)
   - **Opportunity:** Dynamic import GSAP on desktop-only pages

---

## Architectural Patterns for Mobile Performance

### Pattern 1: Adaptive Animation Loading

**What:** Load animations conditionally based on device capabilities
**When to use:** GSAP/motion animations that degrade mobile experience
**Trade-offs:** More complex code vs better mobile UX

**Example:**
```typescript
"use client";

import { useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function AdaptiveHero() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (!isDesktop || prefersReduced) return;

    // Defer GSAP import until needed
    import("gsap/SplitText").then(({ SplitText }) => {
      // Initialize animation
    });
  }, [isDesktop, prefersReduced]);

  return <div>{/* Hero content */}</div>;
}
```

### Pattern 2: Idle-First Initialization

**What:** Defer non-critical work until browser idle
**When to use:** GSAP setup, analytics, third-party scripts
**Trade-offs:** Delayed effects vs improved INP

**Example:**
```typescript
export function useIdleEffect(callback: () => void, deps: unknown[]) {
  useEffect(() => {
    const id = requestIdleCallback(callback, { timeout: 2000 });
    return () => cancelIdleCallback(id);
  }, deps);
}
```

### Pattern 3: Priority-Driven Image Loading

**What:** Explicit control over which images preload
**When to use:** Hero images, above-fold content
**Trade-offs:** Manual prioritization vs automatic lazy loading

**Example:**
```typescript
import Image from "next/image";

export function HeroImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      priority={true}  // <link rel="preload"> injected
      quality={85}     // Hero-specific quality
      sizes="100vw"    // Responsive sizing
    />
  );
}
```

### Pattern 4: React 19 Transition-Based Filtering

**What:** Non-blocking UI updates via `startTransition`
**When to use:** Filter/sort controls, search input
**Trade-offs:** Slight delay in update vs main thread stays responsive

**Example:**
```typescript
import { startTransition, useState } from "react";

export function FilterableGrid() {
  const [filter, setFilter] = useState("all");

  const handleFilter = (newFilter: string) => {
    startTransition(() => {
      setFilter(newFilter);  // Low-priority update
    });
  };

  return <button onClick={() => handleFilter("new")}>Filter</button>;
}
```

---

## Anti-Patterns

### Anti-Pattern 1: Preloading All Images

**What people do:** Add `priority={true}` to multiple images
**Why it's wrong:** Defeats lazy loading, increases bandwidth competition
**Do this instead:** Preload exactly **one** LCP image per page (confirmed via Lighthouse)

### Anti-Pattern 2: GSAP SplitText on Mobile

**What people do:** Run character splitting animations on all devices
**Why it's wrong:** Creates 50–100 DOM nodes, blocks main thread 50–100ms
**Do this instead:** Use `matchMedia("(min-width: 768px)")` to skip on mobile

### Anti-Pattern 3: Synchronous GSAP Initialization

**What people do:** Run `SplitText.create()` directly in `useGSAP()` callback
**Why it's wrong:** Blocks first paint, delays LCP
**Do this instead:** Defer to `requestIdleCallback` or after LCP

### Anti-Pattern 4: Disabling React Compiler for All Code

**What people do:** Keep `reactCompiler: false` for fear of build time increase
**Why it's wrong:** Misses free memoization wins on complex components
**Do this instead:** Enable for production builds, measure before/after performance

---

## Sources

### LCP Optimization
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js Priority Images Best Practices](https://www.debugbear.com/blog/nextjs-image-optimization)
- [Stop the Wait: A Developer's Guide to Smashing LCP in Next.js](https://medium.com/@iamsandeshjain/stop-the-wait-a-developers-guide-to-smashing-lcp-in-next-js-634e2963f4c7)
- [Next.js Font Optimization](https://vercel.com/blog/nextjs-next-font)

### FCP Optimization
- [Next.js Performance Optimization 2025](https://pagepro.co/blog/nextjs-performance-optimization-in-9-steps/)
- [Mastering Mobile Performance: Next.js Lighthouse Scores](https://www.wisp.blog/blog/mastering-mobile-performance-a-complete-guide-to-improving-nextjs-lighthouse-scores)

### INP Optimization
- [INP Optimization Complete Guide 2026](https://www.linkgraph.com/blog/interaction-to-next-paint-optimization/)
- [Improving INP with React 18 and Suspense](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense)
- [How Preply Improved INP on Next.js](https://medium.com/preply-engineering/how-preply-improved-inp-on-a-next-js-application-without-react-server-components-and-app-router-491713149875)

### GSAP Mobile Performance
- [GSAP Mobile Optimization](https://gsap.com/community/forums/topic/35654-gsap-mobile-optimization/)
- [SplitText Documentation](https://gsap.com/docs/v3/Plugins/SplitText/)
- [Improving Reliability of SplitText Elements](https://gsap.com/community/forums/topic/44907-improving-reliability-and-performance-of-splittext-elements-and-scrubbed-timeline-animation/)

### Vercel Observability
- [Vercel Speed Insights Overview](https://vercel.com/docs/speed-insights)
- [Vercel Drains for Complete Observability](https://vercel.com/blog/introducing-vercel-drains)
- [Speed Insights Metrics](https://vercel.com/docs/speed-insights/metrics)

### React Compiler & Next.js 16
- [Next.js 16 Release](https://nextjs.org/blog/next-16)
- [React Compiler in Next.js 16: What It Fixes, What It Breaks](https://medium.com/better-dev-nextjs-react/react-compiler-in-next-js-16-what-it-fixes-what-it-breaks-and-how-to-ship-it-safely-62881c4c0b74)
- [Next.js 16 Deep Dive: Performance, Caching & React Apps](https://medium.com/@rtsekov/next-js-16-deep-dive-performance-caching-the-future-of-react-apps-76c1e55c583a)

---

*Architecture research for: Mobile Performance Optimization (Next.js 16 Portfolio)*
*Researched: 2026-02-16*
