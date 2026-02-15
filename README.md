# Personal Website: https://ayasser.com

A portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS, and GSAP animations.

## Features

- **Emerald brand system** — consistent emerald accent across all pages with WCAG AA light mode palette
- **Interactive experience clouds** — glassmorphism cards with floating animation, magnetic hover, and parallax on the homepage
- **GSAP animations** — SplitText reveals, scroll-driven timelines, tilt cards, and smooth scrolling via Lenis
- **Contact form** — Cloudflare Turnstile CAPTCHA, honeypot, rate limiting (Upstash Redis), email delivery (Resend)
- **Behavioral analytics** — Microsoft Clarity for session replay, heatmaps, and custom event tracking
- **Experience timeline** — work and research positions with scroll-driven GSAP animations and tech icon badges

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create local env file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the required environment variables (see `.env.example` for details):
   - `RESEND_API_KEY` — contact form email delivery
   - `TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile CAPTCHA
   - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — contact form rate limiting
4. Start development server:
   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` — start local development server (Turbopack)
- `npm run build` — create production build
- `npm run start` — start production server from build output
- `npm run lint` — run ESLint checks
- `npm run typecheck` — run TypeScript without emitting files

## Deployment

- Deployed on Vercel with Next.js App Router
- Set all environment variables from `.env.example` in Vercel dashboard
- Set `CLARITY_PROJECT_ID` in Vercel to enable Microsoft Clarity
- External technology icons loaded from `https://cdn.simpleicons.org` via Next Image remote patterns
