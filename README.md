# Personal Website: https://ahmad-yasser-hassanein.vercel.app/

A portfolio site built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create local env file:
   ```bash
   cp .env.example .env.local
   ```
3. Add `RESEND_API_KEY` in `.env.local` if you want contact-form email delivery.
4. (Optional) Add `NEXT_PUBLIC_SITE_URL` to set canonical metadata/sitemap URL.
5. Start development server:
   ```bash
   npm run dev
   ```

## Available scripts

- `npm run dev` - start local development server (Webpack mode).
- `npm run build` - create production build.
- `npm run start` - start production server from build output.
- `npm run lint` - run ESLint checks.
- `npm run typecheck` - run TypeScript without emitting files.

## Contact form

- Email delivery is powered by Resend via `RESEND_API_KEY`.
- If email delivery is unavailable, the UI shows a clear fallback message and asks visitors to email directly.

## Deployment notes

- Production build is static-first and generated with Next.js App Router.
- External technology icons are loaded from `https://cdn.simpleicons.org` through Next Image remote patterns.
