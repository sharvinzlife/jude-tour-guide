# WINDSURF.md

This file provides guidance to Windsurf IDE when working with code in this repository.

Repository summary
- Project: Jude Tour Guide v2.1.0 - Professional Kerala Tourism Platform
- Stack: Next.js 15.5.2 (App Router), TypeScript 5.9.2, Tailwind CSS 4.1.12, Framer Motion 12.23.12, next-intl 4.3.5 for i18n
- UI: Radix UI primitives + shadcn/ui components with Kerala-themed glassmorphism design
- Node: 18.17+ recommended
- Package manager: pnpm (preferred)
- Status: Production Ready (856+ clients from 34 countries)

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
- Clear Next.js cache after major updates: rm -rf .next
- Image assets stored in /public/media/ with organized subdirectories

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
- README.md provides comprehensive project overview with visual guides and feature showcase
- CLAUDE.md adds technical details about i18n, SEO metadata, performance optimizations, and dev tasks
- CHANGELOG.md documents all version changes including v2.0.0 major UI/UX overhaul
- RELEASE_NOTES_v2.0.0.md details the complete transformation with image carousel system
- PORTFOLIO_FEATURES.md outlines the enhanced portfolio system capabilities

Gotchas and operational tips
- The root layout must not include html/body; those are defined in the locale layout to avoid nested html/body tags
- When adding a new locale, update the locales list in @/i18n and provide corresponding messages; pages will then be pre-generated via generateStaticParams
- Metadata strings are sourced from next-intl messages; add the meta namespace keys per-locale to keep SEO consistent
- JSON syntax errors in message files will break the build - ensure proper comma placement
- Image paths in tour data must match actual files in /public/media/Tour packages/
- Carousel auto-play can conflict with manual navigation - test thoroughly
- Animation performance should be optimized for mobile devices with reduced motion support

Recent Updates (v2.1.0)
- Enhanced page loading animations with smooth entry effects and staggered component appearance
- Vibrant color palette with emerald-to-teal gradients and catchy color schemes throughout
- Scroll-triggered animations for content sections with proper timing and delays
- Interactive hover effects with scaling, rotation, glow, and pulse animations
- Premium visual experience with upgraded glassmorphism design and multi-layered gradient overlays
- Enhanced slideshow with gradient borders and smooth transitions
- Comprehensive Framer Motion integration with performance-optimized animations

Previous Updates (v2.0.1)
- Mobile layout improvements with better spacing and reduced clutter
- Fixed "Kerala Tourism" badge spacing from navigation header on mobile
- Optimized individual package page mobile layouts by removing overlapping elements
- Simplified mobile carousel controls and hidden desktop-only elements
- Enhanced responsive design utilities with better mobile breakpoint handling

Previous Updates (v2.0.0)
- Enhanced image management system with 42+ high-quality tour package images
- Advanced carousel system with auto-play, manual controls, and thumbnail navigation
- Hero section redesign with "Discover God's Own Country" theme and animated statistics
- Performance optimizations achieving 30% faster image loading
- Kerala-themed animations including wave effects, palm tree sway, and cultural transitions
- Comprehensive SEO with structured data using Schema.org TravelAgent markup
- Glassmorphism design system with backdrop blur and transparency effects

Tour Package System
- 8 comprehensive tour packages with detailed itineraries and pricing tiers
- Image galleries stored in /public/media/Tour packages/ with organized subdirectories
- Each package includes: title, description, pricing, duration, category, destinations, tags, images array, highlights, inclusions/exclusions, detailed day-by-day itinerary
- Package categories: Complete Tour, Backwaters, Hill Stations, Wildlife, Heritage, Nature & Wildlife, Beaches
- Advanced carousel functionality with auto-play, manual controls, thumbnails, and progress indicators

Development Workflow
- Use pnpm for package management (faster than npm/yarn)
- Clear .next cache after major updates or when experiencing build issues
- Test across all 6 supported locales during development
- Ensure image paths match actual files in public directory
- Validate JSON syntax in message files before committing
- Test carousel functionality across different devices and browsers
- Optimize animations for mobile performance

Windsurf IDE Integration
- TypeScript support with strict mode enabled
- Path aliases configured (@/* -> src/*)
- ESLint and Prettier configurations available
- Recommended extensions: ESLint, Prettier, Tailwind CSS IntelliSense, TypeScript Error Lens
- Hot reload works seamlessly with Next.js dev server
- Built-in terminal supports all pnpm commands
