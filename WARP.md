# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository summary
- Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, next-intl for i18n
- Node: 18.17+ recommended
- Package manager: pnpm (preferred)

Common commands
- Install dependencies (preferred): pnpm install
- Start development server: pnpm dev
- Build for production: pnpm build
- Start production server: pnpm start
- Lint: pnpm lint
- Tests: no test runner is configured in package.json at this time

Environment
- Create .env.local (not committed). Example: NEXT_PUBLIC_SITE_URL=http://localhost:3000
- Access locales in dev at http://localhost:3000/en, /fr, /de, /es, /zh, /ja

Architecture overview
- App entry and routing
  - Uses Next.js App Router with locale-prefixed routes in src/app/[locale]/
  - Root layout (src/app/layout.tsx) is intentionally minimal and returns children; actual html/body and providers live in src/app/[locale]/layout.tsx
  - Static params for i18n: generateStaticParams enumerates supported locales; all locale routes are pre-generated
  - Viewport: generateViewport sets responsive defaults
  - SEO: generateMetadata reads translated strings from next-intl messages (messages.meta) and sets title, description, keywords, Open Graph, Twitter, canonical, and language alternates per-locale

- Internationalization (next-intl)
  - Locale list is imported from @/i18n
  - NextIntlClientProvider wraps the app in src/app/[locale]/layout.tsx, providing messages fetched via getMessages({ locale })
  - Per-page translations use getTranslations with namespaced keys
  - URLs are locale-scoped (e.g., /en/about, /fr/contact)

- Page structure (selected)
  - Home: src/app/[locale]/page.tsx (composes HeroSectionSimple, TestimonialsSection, ReadyToExploreSection)
  - About: src/app/[locale]/about/page.tsx (rich content with translated metadata and sections)
  - Contact: src/app/[locale]/contact/page.tsx (client component with form validation and animated UI)
  - Packages: src/app/[locale]/packages/page.tsx and dynamic package details src/app/[locale]/packages/[id]/page.tsx

- UI and components
  - Header/Footer and other layout pieces under src/components/layout
  - Section components (e.g., HeroSectionSimple, TestimonialsSection) under src/components/sections
  - Package-focused components in src/components/packages (PackageCard, PackageFilter, ItineraryDisplay)
  - UI primitives integrate Radix UI and shadcn/ui under src/components/ui

- Data and utilities
  - Tour package data utilities are accessed from @/lib/data/tours in the Packages flow
  - Shared utilities/constants and animation helpers live under src/lib (e.g., animations.ts, constants.ts, utils.ts)

- Styling and assets
  - Global styles: src/app/globals.css
  - Tailwind configured (tailwind.config.ts); classes are used across components

- TypeScript and paths
  - tsconfig.json sets baseUrl to project root and defines path alias @/* -> src/*

Notes from repo docs (condensed)
- README.md provides quick start and commands (pnpm dev/build/start/lint), and documents the tech stack and structure
- CLAUDE.md adds details about i18n, SEO metadata, performance optimizations, and typical dev tasks (adding pages/languages)

Gotchas and operational tips
- The root layout must not include html/body; those are defined in the locale layout to avoid nested html/body tags
- When adding a new locale, update the locales list in @/i18n and provide corresponding messages; pages will then be pre-generated via generateStaticParams
- Metadata strings are sourced from next-intl messages; add the meta namespace keys per-locale to keep SEO consistent

