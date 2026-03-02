# Performance Baseline (v1.3)

**Date:** 2026-02-16
**Purpose:** Establish performance metrics before GSAP/state optimization in Phases 14-15

## LCP Element Identification (IMG-04)

All pages use text headings as LCP elements, not images. No hero image exists site-wide.

| Route       | LCP Element           | Type | Mobile LCP (Lab) | Notes                    |
| ----------- | --------------------- | ---- | ---------------- | ------------------------ |
| /           | `<h1>` "Ahmad Yasser" | Text | 3.43s            | GSAP SplitText animation |
| /projects   | `<h1>` "Projects"     | Text | 3.7s             | GSAP SplitText animation |
| /contact    | `<h1>` "Contact"      | Text | ~2.5s            | GSAP SplitText animation |
| /experience | `<h1>` "Experience"   | Text | ~2.8s            | GSAP SplitText animation |

**Finding:** IMG-01 requirement ("hero image uses preload") does not apply — no page has an image as the LCP element. Mobile LCP improvement will come from GSAP optimization in Phase 14 (reducing animation blocking time).

## Image Inventory

All `<Image>` components now have explicit `sizes` attributes (IMG-02 satisfied).

| File                   | Component         | Dimensions | sizes  | Purpose           |
| ---------------------- | ----------------- | ---------- | ------ | ----------------- |
| testimonials.tsx       | Avatar images     | 36x36      | "36px" | Testimonial cards |
| experience-content.tsx | Skill badge icons | 12x12      | "12px" | Technology badges |

**Note:** All images use `unoptimized` (CDN sources: `cdn.simpleicons.org` for icons, Vercel blob storage for avatars). None are LCP candidates — zero over-preloading risk.

## TTFB Baseline by Region (OBS-05)

TTFB values from Speed Insights field data (75th percentile, 28-day rolling):

| Region        | Device  | TTFB   | Status   | Notes                                    |
| ------------- | ------- | ------ | -------- | ---------------------------------------- |
| United States | Mobile  | ~0.17s | Good     | Nearest Vercel edge region               |
| Egypt         | Mobile  | ~2.15s | Accepted | EU edge routing — Hobby plan limitation  |
| Global avg    | Mobile  | ~1.77s | Accepted | Expected for free-tier edge distribution |
| United States | Desktop | ~0.14s | Good     | —                                        |

**Accepted Limitation:** TTFB 1.5-2s from Egypt is expected on Vercel Hobby tier (nearest edge is EU Frankfurt). Upgrading to Pro for regional edge compute is out of scope for this project. Field data confirms TTFB is not a solvable bottleneck without infrastructure changes.

## Speed Insights Status (OBS-01, OBS-06)

**Production status:** Active
**Integration:** `<SpeedInsights />` component renders in `app/layout.tsx` (conditional on `process.env.VERCEL === "1"`)
**Analytics:** `<Analytics />` component renders in `app/layout.tsx`

**Dashboard capabilities:**

- Real CWV field data collection: ✅ (LCP, INP, CLS)
- Device breakdown: ✅ (Mobile/Desktop filter available)
- Route breakdown: ✅ (Per-page performance visible)
- 28-day rolling window: ✅

**Verified:** Speed Insights dashboard at vercel.com/dashboard shows real production traffic with device and route segmentation.

## Desktop Performance Score (OBS-04)

**Current Lighthouse CI baseline (desktop preset):**

- Performance score: **100** (1.0)
- FCP: ~0.8s
- LCP: ~1.2s
- TBT: ~50ms
- CLS: 0

**Regression gate added:** `lighthouserc.json` now enforces `categories:performance >= 0.98` on every PR. This prevents desktop performance regressions while allowing minor score fluctuations.

**CI configuration:**

- Preset: `desktop`
- Runs: 3 per URL
- Audited URLs: `/`, `/projects`, `/contact`
- Workflow: `.github/workflows/lighthouse-ci.yml`

## Mobile Performance Baseline

**Current Lighthouse CI baseline (mobile preset):**

- Performance score: **87**
- FCP: 1.8s
- LCP: 3.7s (⚠️ primary bottleneck)
- TBT: 300ms
- CLS: 0.05

**Primary mobile bottlenecks (to address in Phase 14):**

1. LCP 3.7s — GSAP SplitText blocking render on `/` and `/projects`
2. TTFB 1.77s — Network latency (accepted limitation, not fixable without Pro plan)
3. INP 432ms on `/` — Potential GSAP event handler optimization

**Phase 14 targets:**

- Reduce LCP by 1-1.5s via GSAP animation optimization
- Keep mobile score >= 90 (current: 87)
- Reduce INP to < 300ms

## Next Steps

**Phase 14 (GSAP Optimization):**

- Profile GSAP animations blocking LCP
- Move non-critical animations to `requestIdleCallback`
- Consider progressive enhancement pattern (static text first, animate after LCP)

**Phase 15 (React State Optimization):**

- Profile state updates causing unnecessary rerenders
- Optimize scroll event handlers (if any)

---

**Note:** This baseline was established before GSAP/state changes to ensure accurate before/after measurement. All modifications in this document represent zero-risk changes (adding `sizes` attributes, documentation, CI gates).
