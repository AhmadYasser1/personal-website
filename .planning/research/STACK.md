# Technology Stack

**Project:** ayasser.com Mobile Performance & Observability
**Researched:** 2026-02-16
**Confidence:** HIGH

## Stack Additions for This Milestone

This document covers ONLY the new dependencies and configuration changes needed for:
1. Mobile LCP optimization (3.7s → <2.5s)
2. FCP reduction (1.66s → <1.0s)
3. INP improvement (fix 432ms outlier)
4. Full Vercel observability setup

Existing validated stack NOT re-researched:
- Next.js 16.1.6 App Router on Vercel ✓
- GSAP 3.14.2 (modular imports, 181KB across 6 chunks) ✓
- TailwindCSS v4 ✓
- Lenis smooth scroll ✓
- motion (framer-motion) with MotionConfig reducedMotion="user" ✓
- Microsoft Clarity for behavioral analytics ✓
- Vercel Speed Insights (already collecting data) ✓
- Lighthouse CI on GitHub Actions ✓
- sharp for image optimization (AVIF/WebP configured) ✓
- Font preload (Space Grotesk + Inter woff2) ✓

---

## NEW Stack Additions

### 1. Mobile-Specific Image Optimization

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| `next/image` with `preload` | built-in (Next.js 16+) | LCP image preloading | **Breaking change in Next.js 16:** `priority` prop is deprecated. Use `preload={true}` + `fetchPriority="high"` for LCP images. Inserts `<link rel="preload">` in `<head>` for above-fold hero images. |
| `next/image` with `loading="eager"` | built-in | Disable lazy loading for ATF images | Default `loading="lazy"` delays LCP images. Use `loading="eager"` + `fetchPriority="high"` for hero images to eliminate input delay phase. |
| Responsive `sizes` prop | built-in | Mobile-optimized image delivery | Without `sizes`, browser assumes `100vw` and downloads desktop-sized images on mobile. Use `sizes="(max-width: 768px) 100vw, 50vw"` pattern to serve mobile-appropriate images. Critical for Egypt's mobile-heavy traffic (73%). |

**Installation:** No new packages. Requires prop changes on existing `<Image>` components.

**Configuration Pattern for Hero Image:**
```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1600}
  height={900}
  preload={true}
  loading="eager"
  fetchPriority="high"
  sizes="(max-width: 768px) 100vw, 1600px"
/>
```

**Why This Matters:**
- Next.js 16 deprecated `priority` → must migrate to `preload={true}`
- Mobile browsers download images 60-80% slower than desktop
- Proper `sizes` reduces mobile image payload by 40-60%
- `fetchPriority="high"` tells browser to prioritize LCP image over other resources

**Sources:**
- [Next.js Image Component API (v16.1.6)](https://nextjs.org/docs/app/api-reference/components/image)
- [DebugBear: Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization)

---

### 2. Font Optimization for Mobile LCP

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| `next/font` with `display: "swap"` | built-in | Prevent FOIT on mobile | Mobile networks are slower (TTFB 1.77s). `display: "swap"` shows fallback font immediately while custom font loads, preventing invisible text. Combined with `size-adjust` (automatic in Next.js 16), prevents CLS when font swaps in. |
| Variable fonts | current (verify) | Reduce font file size | Variable fonts consolidate multiple weights into one file. Inter Variable is ~128KB vs ~300KB for 3 static weights. Critical for mobile bandwidth. |
| `preload={true}` (default) | built-in | Font preloading | Fonts in layout are preloaded on all routes. Fonts on unique pages are preloaded on that route only. Preload is default in Next.js 16 — verify it's not disabled. |

**Current Status:** ✓ Already using `next/font/google` correctly in `src/app/layout.tsx`

**Action Required:**
1. Verify `display: "swap"` is set on both Space_Grotesk and Inter
2. Verify variable font variants are used (check font URLs in Network tab)
3. Consider subsetting to Latin-only glyphs if non-Latin characters unused
4. Measure CLS impact in Vercel Speed Insights after changes

**Configuration Pattern:**
```tsx
import { Space_Grotesk, Inter } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  preload: true, // default in Next.js 16
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})
```

**Why This Matters:**
- Mobile TTFB is 1.77s → fonts won't load until ~2s mark
- Without `display: "swap"`, mobile users see blank text until fonts load
- `size-adjust` (automatic) prevents layout shift when font swaps
- Variable fonts reduce total font payload by 40-60%

**Sources:**
- [Next.js Font Optimization (v16.1.6)](https://nextjs.org/docs/app/getting-started/fonts)
- [Contentful: Next.js Fonts Guide](https://www.contentful.com/blog/next-js-fonts/)
- [OneUpTime: Fix Font Loading Issues](https://oneuptime.com/blog/post/2026-01-24-nextjs-font-loading-issues/view)

---

### 3. Vercel Web Analytics (Full Setup)

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| `@vercel/analytics` | **1.6.1** (latest) | Track page views + custom events | Already installed at v1.6.1. Need to add `<Analytics />` component to track mobile vs desktop LCP, FCP, INP separately. Privacy-friendly (no cookies), hash-based visitor identification. Free for Hobby plan within limits. |
| Custom event tracking | via `track()` | Track mobile-specific interactions | Use `track('mobile_interaction', { type: 'swipe', target: 'testimonials' })` to diagnose mobile INP issues. Pro plan feature, but free tier allows basic page view tracking. |
| Debug mode | via `debug={true}` | Verify tracking in dev | Add `<Analytics debug={true} />` during setup to see console logs confirming events are sent. Remove in production. |

**Installation:** Already installed. No new packages.

**Configuration Pattern:**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Custom Event Example (for INP debugging):**
```tsx
import { track } from '@vercel/analytics';

function TestimonialsSwipe() {
  const handleSwipe = () => {
    track('testimonial_swipe', { device: 'mobile' });
  };
  // ...
}
```

**Dashboard Access:**
- Project → Analytics tab → Enable
- Routes: `/_vercel/insights/*` added after next deployment
- Verify: Check Network tab for `/_vercel/insights/view` XHR request

**Why This Matters:**
- Current Vercel Speed Insights only shows aggregate Core Web Vitals
- Web Analytics adds device/OS/browser breakdown for mobile-specific debugging
- Track which pages have worst mobile LCP (Homepage? Projects?)
- Free tier sufficient for this traffic volume
- Privacy-friendly (no GDPR concerns, no user tracking across days)

**Sources:**
- [Vercel Web Analytics Quickstart](https://vercel.com/docs/analytics/quickstart)
- [Vercel Analytics Package Docs](https://vercel.com/docs/analytics/package)
- [@vercel/analytics npm](https://www.npmjs.com/package/@vercel/analytics)

---

### 4. Mobile-Specific TTFB Optimization

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| Vercel Edge Network (built-in) | N/A | Regional CDN for Egypt traffic | Egypt-based mobile traffic (73%) currently routes through nearest Vercel edge (likely Frankfurt or Dubai). Verify edge caching is enabled for static assets. |
| `Cache-Control` headers | via `next.config.ts` | Maximize edge cache hit rate | Current `minimumCacheTTL: 2678400` (31 days) is correct for images. Verify HTML pages are cacheable at edge with `s-maxage`. |
| `stale-while-revalidate` | via headers | Serve stale content instantly on revalidation | For dynamic pages, use `s-maxage=60, stale-while-revalidate=3600` to serve cached version while revalidating in background. Reduces TTFB from 1.77s → <200ms for returning users. |

**Current Status:** ✓ Image cache configured correctly in `next.config.ts`

**Action Required:**
1. Add `stale-while-revalidate` headers for dynamic routes
2. Verify edge caching via Vercel dashboard (Analytics → Functions → Edge requests)
3. Use Vercel's built-in CDN (no external CDN needed)
4. Monitor TTFB by region in Vercel Speed Insights

**Configuration Pattern:**
```ts
// next.config.ts
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, s-maxage=60, stale-while-revalidate=3600',
        },
      ],
    },
  ];
}
```

**Why This Matters:**
- Current mobile TTFB: 1.77s (red flag — target <200ms)
- Egypt → Frankfurt latency is ~80-100ms baseline
- Poor TTFB guarantees poor LCP (LCP can't be faster than TTFB)
- Edge caching reduces TTFB by 60-80%
- `stale-while-revalidate` gives instant responses for cached content

**Sources:**
- [WP Rocket: Improve LCP Guide](https://wp-rocket.me/google-core-web-vitals-wordpress/improve-largest-contentful-paint/)
- [LinkGraph: INP Optimization Complete Guide](https://www.linkgraph.com/blog/interaction-to-next-paint-optimization/)
- [Cloudflare: TTFB is Not What It Used To Be](https://blog.cloudflare.com/ttfb-is-not-what-it-used-to-be/)

---

### 5. Mobile INP Optimization

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| React 19.2 (via Next.js 16) | built-in | `startTransition` for non-urgent updates | Next.js 16 ships React 19.2. Use `startTransition` to mark state updates as non-urgent, keeping main thread free for user interactions. Critical for mobile (60-80% worse INP than desktop). |
| `content-visibility: auto` | CSS | Reduce rendering cost | Apply to off-screen sections to skip rendering until scrolled into view. Reduces DOM size and main thread work. |
| Event handler debouncing | manual | Reduce event frequency | Scroll/resize events on mobile fire 60-120 times/second. Debounce to max 10/second to prevent main thread blocking. |
| Back/Forward Cache (bfcache) | browser feature | 0ms INP on back navigation | Ensure pages are bfcache-eligible by avoiding `unload` event listeners, `Cache-Control: no-store`, and unfinished network requests. |

**Current Status:** ✓ React Compiler enabled (auto-memoization reduces re-renders by 25-40%)

**Action Required:**
1. Audit all event handlers (onClick, onScroll, onResize)
2. Add `startTransition` for non-critical state updates
3. Debounce scroll events (especially for GSAP scroll animations)
4. Verify bfcache eligibility via Lighthouse "bfcache" audit
5. Monitor INP by page in Vercel Speed Insights

**Configuration Pattern:**
```tsx
import { startTransition } from 'react';

function HeavyUpdate() {
  const handleClick = () => {
    startTransition(() => {
      setData(newData); // non-urgent update
    });
  };
  // ...
}
```

**Debounce Pattern:**
```tsx
import { useCallback } from 'react';
import { debounce } from 'lodash-es';

const handleScroll = useCallback(
  debounce(() => {
    // scroll logic
  }, 100),
  []
);
```

**Why This Matters:**
- Current mobile INP: 72ms (good), but 432ms outlier on homepage (fail)
- Mobile CPUs are 3-5x slower than desktop
- Touch events have additional processing overhead
- Good INP target: <200ms at 75th percentile
- bfcache eligibility gives effectively 0ms INP on back navigation (highest-impact mobile optimization)

**Sources:**
- [LinkGraph: INP Optimization Guide](https://www.linkgraph.com/blog/interaction-to-next-paint-optimization/)
- [Vercel: Demystifying INP](https://vercel.com/blog/demystifying-inp-new-tools-and-actionable-insights)
- [Vercel: Improving INP with React 18 and Suspense](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense)
- [web.dev: Optimize INP](https://web.dev/articles/optimize-inp)

---

### 6. Vercel Speed Insights (Already Active)

| Technology | Version | Purpose | Why Required |
|------------|---------|---------|--------------|
| `@vercel/speed-insights` | **1.3.1** (current) | Track Core Web Vitals (LCP, FCP, INP, CLS, TTFB) | Already installed and collecting data. Provides device/page breakdown of Web Vitals. Combined with Web Analytics, gives complete observability. |

**Current Status:** ✓ Already installed and active

**Action Required:**
1. Verify `<SpeedInsights />` component is in `app/layout.tsx`
2. Check dashboard: Project → Speed Insights tab
3. Filter by device (Mobile vs Desktop) to see current 87 mobile score
4. Monitor LCP improvement after image optimization changes
5. Track INP outlier reduction after event handler optimization

**Dashboard Metrics:**
- **LCP:** Currently 3.7s mobile (target <2.5s)
- **FCP:** Currently 1.66s mobile (target <1.0s)
- **INP:** Currently 72ms median, 432ms outlier (fix outlier)
- **TTFB:** Currently 1.77s mobile (target <200ms)
- **CLS:** Currently good (maintain)

**Why This Matters:**
- Real User Monitoring (RUM) data > lab data for mobile optimization
- Field data shows actual Egypt mobile network performance
- Tracks before/after impact of each optimization
- Free for Hobby plan
- Already collecting data — just need to act on it

**Sources:**
- [Vercel Speed Insights Overview](https://vercel.com/docs/speed-insights)
- [Vercel Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Image optimization API | `preload={true}` + `fetchPriority="high"` | `priority` (deprecated) | Next.js 16 deprecated `priority` prop. Must use `preload` for new code. |
| Font loading strategy | `display: "swap"` | `display: "optional"` | `optional` skips font if not loaded quickly — risks inconsistent styling across users. `swap` guarantees eventual font load. |
| Analytics platform | Vercel Web Analytics + Speed Insights | Google Analytics 4 | Vercel analytics are free, integrated, and privacy-friendly. GA4 adds cookies, GDPR compliance burden, and external requests (slower). |
| CDN | Vercel Edge Network (built-in) | Cloudflare, Fastly | Vercel edge is free and already deployed. External CDN adds cost and complexity without benefit at this scale. |
| TTFB optimization | `stale-while-revalidate` | Full static generation | Portfolio has dynamic elements (contact form, analytics). SWR allows dynamic content with edge cache benefits. |
| INP optimization | `startTransition` + debouncing | Web Workers | Web Workers add complexity. Most INP issues solved by lighter event handlers and React Compiler auto-memoization. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `priority` prop on `<Image>` | Deprecated in Next.js 16 | `preload={true}` + `fetchPriority="high"` |
| `display: "block"` on fonts | Causes FOIT (invisible text) on mobile | `display: "swap"` |
| `loading="lazy"` on hero images | Delays LCP by deferring load until scroll | `loading="eager"` + `fetchPriority="high"` |
| Third-party image CDNs | Adds latency and cost | Vercel built-in image optimization |
| Google Fonts CDN | External request, GDPR risk | `next/font/google` (self-hosted) |
| Aggressive lazy loading | Over-splitting delays initial content | Only lazy load below-fold or conditional content |
| `unload` event listeners | Breaks bfcache (kills 0ms INP on back nav) | `pagehide` or `visibilitychange` |
| `Cache-Control: no-store` | Disables edge caching, kills TTFB | `s-maxage` + `stale-while-revalidate` |

---

## Installation Summary

**No new packages needed.** All optimizations use built-in Next.js 16 APIs or already-installed packages.

**Already installed (verify presence):**
- `@vercel/analytics@1.6.1` ✓
- `@vercel/speed-insights@1.3.1` ✓
- `sharp` (production dependency — verify in `package.json`)
- `next@16.1.6` (includes React 19.2) ✓

**Configuration changes only:**
1. Add `preload={true}` + `fetchPriority="high"` to hero images
2. Add `sizes` prop to all `<Image>` components
3. Verify `display: "swap"` on font definitions
4. Add `<Analytics />` component to `app/layout.tsx`
5. Add `stale-while-revalidate` headers for dynamic routes
6. Audit event handlers for debouncing opportunities
7. Add `startTransition` for non-urgent state updates

---

## Configuration Checklist

**Image Optimization:**
- [ ] Migrate hero images from `priority` → `preload={true}` + `fetchPriority="high"`
- [ ] Add `loading="eager"` to above-fold images
- [ ] Add `sizes` prop to all `<Image>` components
- [ ] Audit remaining `<img>` tags and convert to `<Image>`
- [ ] Verify AVIF/WebP formats in Network tab

**Font Optimization:**
- [ ] Verify `display: "swap"` on Space_Grotesk and Inter
- [ ] Verify variable font variants in Network tab
- [ ] Measure CLS before/after in Speed Insights
- [ ] Consider subsetting to Latin-only glyphs

**Vercel Observability:**
- [ ] Add `<Analytics />` to `app/layout.tsx`
- [ ] Enable Web Analytics in Vercel dashboard
- [ ] Verify `/_vercel/insights/view` requests in Network tab
- [ ] Add custom events for mobile interaction tracking (optional)
- [ ] Filter Speed Insights by device (Mobile vs Desktop)

**TTFB Optimization:**
- [ ] Add `stale-while-revalidate` headers
- [ ] Verify edge caching in Vercel dashboard
- [ ] Monitor TTFB by region in Speed Insights
- [ ] Measure before/after TTFB

**INP Optimization:**
- [ ] Audit event handlers for debouncing
- [ ] Add `startTransition` for non-urgent updates
- [ ] Verify bfcache eligibility via Lighthouse
- [ ] Monitor INP by page in Speed Insights
- [ ] Identify and fix 432ms homepage outlier

---

## Integration Points

### Next.js Config (`next.config.ts`)
- Image optimization already configured ✓
- React Compiler already enabled ✓
- Add `headers()` for `stale-while-revalidate`

### App Layout (`app/layout.tsx`)
- Add `<Analytics />` below `<SpeedInsights />`
- Verify font configuration

### Component Props
- Update `<Image>` components with `preload`, `fetchPriority`, `sizes`
- Add `startTransition` to event handlers

### Vercel Dashboard
- Enable Web Analytics (Project → Analytics → Enable)
- Monitor Speed Insights (Project → Speed Insights)
- Check edge caching (Analytics → Functions)

---

## Monitoring Strategy

### Before Optimization (Baseline)
1. Run Lighthouse on mobile (3 times, take median)
2. Record current metrics from Vercel Speed Insights:
   - Mobile LCP: 3.7s
   - Mobile FCP: 1.66s
   - Mobile INP: 72ms median, 432ms outlier
   - Mobile TTFB: 1.77s
3. Screenshot current Speed Insights dashboard

### After Each Change
1. Deploy to Vercel preview
2. Test on real mobile device (not emulator)
3. Check Speed Insights after 24h (RUM data collection delay)
4. Compare before/after metrics

### Success Criteria
- Mobile LCP: <2.5s (target: 2.0s)
- Mobile FCP: <1.0s (target: 0.8s)
- Mobile INP: <200ms at 75th percentile (fix 432ms outlier)
- Mobile TTFB: <200ms (target: 150ms)
- Desktop score: Maintain 100

---

## Sources

### Next.js 16 Image/Font Optimization
- [Next.js Image Component API (v16.1.6)](https://nextjs.org/docs/app/api-reference/components/image) — **HIGH CONFIDENCE** (official docs, version-specific)
- [Next.js Font Optimization (v16.1.6)](https://nextjs.org/docs/app/getting-started/fonts) — **HIGH CONFIDENCE**
- [DebugBear: Next.js Image Optimization](https://www.debugbear.com/blog/nextjs-image-optimization) — **MEDIUM CONFIDENCE** (third-party, verified with official docs)

### Vercel Observability
- [Vercel Web Analytics Quickstart](https://vercel.com/docs/analytics/quickstart) — **HIGH CONFIDENCE**
- [Vercel Analytics Package Docs](https://vercel.com/docs/analytics/package) — **HIGH CONFIDENCE**
- [@vercel/analytics npm (v1.6.1)](https://www.npmjs.com/package/@vercel/analytics) — **HIGH CONFIDENCE**
- [Vercel Speed Insights Overview](https://vercel.com/docs/speed-insights) — **HIGH CONFIDENCE**

### Mobile Performance Optimization
- [LinkGraph: INP Optimization Complete Guide](https://www.linkgraph.com/blog/interaction-to-next-paint-optimization/) — **MEDIUM CONFIDENCE** (comprehensive, multiple sources agree)
- [web.dev: Optimize LCP](https://web.dev/articles/optimize-lcp) — **HIGH CONFIDENCE** (official Google Web Vitals docs)
- [web.dev: Optimize INP](https://web.dev/articles/optimize-inp) — **HIGH CONFIDENCE**
- [Vercel: Demystifying INP](https://vercel.com/blog/demystifying-inp-new-tools-and-actionable-insights) — **HIGH CONFIDENCE**
- [Vercel: Improving INP with React 18 and Suspense](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense) — **HIGH CONFIDENCE**

### Next.js 16 + React 19 Performance
- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16) — **HIGH CONFIDENCE** (official release notes)
- [React & Next.js Best Practices 2026](https://fabwebstudio.com/blog/react-nextjs-best-practices-2026-performance-scale) — **MEDIUM CONFIDENCE**
- [Next.js 15 Streaming Handbook (patterns apply to 16)](https://www.freecodecamp.org/news/the-nextjs-15-streaming-handbook/) — **MEDIUM CONFIDENCE**

### TTFB & Edge Caching
- [Cloudflare: TTFB is Not What It Used To Be](https://blog.cloudflare.com/ttfb-is-not-what-it-used-to-be/) — **HIGH CONFIDENCE**
- [WP Rocket: Improve LCP Guide](https://wp-rocket.me/google-core-web-vitals-wordpress/improve-largest-contentful-paint/) — **MEDIUM CONFIDENCE** (WordPress-specific but principles apply)

---

**Confidence Assessment:**
- **Image/Font APIs:** HIGH (verified against Next.js 16.1.6 official docs)
- **Vercel Analytics:** HIGH (official Vercel docs + npm package)
- **Mobile Performance Patterns:** MEDIUM-HIGH (multiple authoritative sources agree)
- **React 19/Next.js 16 Features:** HIGH (official release notes)

**Research Gaps:**
- Egypt-specific edge network latency (need to verify via Vercel dashboard after deployment)
- Actual mobile device testing results (lab data vs field data may differ)
- Specific GSAP scroll animation INP impact (needs profiling)
