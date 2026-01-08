# Project Architecture

## Framework
- Next.js 15 (App Router)
- React 19

## Language
- TypeScript (Strict Mode)
- No `any` types allowed

## Styling
- Tailwind CSS v4
- shadcn/ui components in `src/components/ui/`
- Custom components in `src/components/`

## Animation
- Motion for React (`motion` package)
- Use declarative `whileHover`, `whileInView` props
- Respect `prefers-reduced-motion`

## Data
- Static data files in `src/lib/data/`
- Server Components for data fetching
- Client Components only when interactivity required

## Core Principles

### Server First
- Default to Server Components
- Use `'use client'` only for:
  - Event handlers
  - Browser APIs
  - React hooks (useState, useEffect)

### Type Safety
- All components must be typed
- Use Zod for runtime validation
- No type assertions unless necessary

### Mobile First
- All UI must be responsive
- Use Tailwind responsive prefixes (sm:, md:, lg:)
- Test on mobile viewport sizes

### Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

## File Naming
- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Data files: kebab-case (e.g., `projects.ts`)

## Component Structure
```
src/
├── app/           # Next.js App Router pages
├── components/
│   ├── ui/        # shadcn/ui components
│   ├── layout/    # Navbar, Footer, ThemeToggle
│   ├── home/      # Home page components
│   ├── projects/  # Projects page components
│   └── experience/# Experience page components
└── lib/
    ├── data/      # Static data (projects, experience, research)
    └── utils.ts   # Utility functions
```



