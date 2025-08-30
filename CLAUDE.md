# CLAUDE.md - Jude Tour Guide Project Documentation

## Project Overview
Jude Tour Guide is a multilingual Next.js 15 website showcasing professional tour guide services in Kerala, India. The site features modern animations, internationalization support, and a responsive glassmorphism design.

## Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4.1.12
- **Animations**: Framer Motion 12.23.12
- **UI Components**: Radix UI primitives + shadcn/ui
- **Internationalization**: next-intl 4.3.5
- **Package Manager**: pnpm (preferred)
- **Deployment**: Vercel-ready

## Supported Languages
- English (en) - Default
- French (fr)
- German (de) 
- Spanish (es)
- Chinese (zh)
- Japanese (ja)

## Project Structure
```
src/
├── app/                          # App Router directory
│   ├── [locale]/                # Internationalized routes
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Home page
│   │   ├── about/page.tsx       # About page
│   │   ├── contact/page.tsx     # Contact page
│   │   ├── packages/            # Tour packages
│   │   └── portfolio/page.tsx   # Portfolio page
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/
│   ├── layout/                  # Layout components
│   ├── sections/                # Page sections
│   ├── packages/                # Package-related components
│   └── ui/                      # Reusable UI components
├── lib/
│   ├── animations.ts            # Animation utilities
│   ├── constants.ts             # App constants
│   ├── data/                    # Static data
│   └── utils.ts                 # Utility functions
├── messages/                    # i18n translation files
├── styles/
│   └── glassmorphism.css        # Custom glassmorphism styles
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Development Commands

### Package Management
```bash
# Install dependencies (preferred)
pnpm install

# Add new dependency
pnpm add <package>

# Add dev dependency
pnpm add -D <package>

# Remove dependency
pnpm remove <package>
```

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## Key Features
1. **Multilingual Support**: Full i18n with next-intl
2. **SEO Optimized**: Meta tags, structured data, sitemap
3. **Responsive Design**: Mobile-first approach
4. **Modern Animations**: Framer Motion with Kerala-themed animations
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Performance**: Optimized images, code splitting
7. **Glassmorphism UI**: Modern glass-effect design system

## Configuration Files

### Next.js Config (`next.config.ts`)
- Configures next-intl plugin
- Sets up image optimization
- Defines output file tracing root
- Enables package import optimization for lucide-react

### Tailwind Config (`tailwind.config.ts`)
- Extended color palette with Kerala-themed colors
- Custom animations and keyframes
- Responsive breakpoints
- Typography settings

### TypeScript Config (`tsconfig.json`)
- Path aliases configured (@/* points to src/*)
- Strict mode enabled
- Next.js specific compiler options

## Internationalization Setup
- Locale detection via middleware
- Messages stored in `src/messages/`
- Static generation for all locale combinations
- SEO metadata per language
- Language-specific URLs

## Component Architecture

### Layout Components
- `Header`: Navigation with language switcher
- `Footer`: Contact info and social links
- `LanguageSwitcher`: Locale selection dropdown

### Page Sections
- `HeroSection`: Landing section with CTA
- `ServicesSection`: Tour services showcase
- `PortfolioPreview`: Recent work preview
- `TestimonialsSection`: Customer reviews

### UI Components (shadcn/ui based)
- Form components with react-hook-form
- Navigation components
- Loading animations
- Kerala-themed components

## Animation System
- **Kerala Animations**: Custom Kerala-themed animations
- **Page Transitions**: Smooth route transitions
- **Loading States**: Skeleton loaders and spinners
- **Mobile Optimized**: Reduced motion for mobile devices

## SEO & Metadata
- Dynamic metadata generation per locale
- Open Graph tags for social sharing
- Twitter Card support
- Structured data for tour services
- Canonical URLs for each language
- Sitemap generation

## Performance Optimizations
- Image optimization with next/image
- Code splitting by route
- Package import optimization (lucide-react)
- Static generation where possible
- Lazy loading for non-critical components

## Common Tasks

### Adding a New Page
1. Create page.tsx in appropriate locale directory
2. Add metadata export for SEO
3. Add translations to message files
4. Update navigation if needed

### Adding New Language
1. Add locale to `src/i18n.ts`
2. Create message file in `src/messages/`
3. Update metadata generation logic
4. Test all routes with new locale

### Updating Dependencies
```bash
# Check outdated packages
pnpm outdated

# Update specific package
pnpm update <package>

# Update all packages
pnpm update
```

### Building & Deployment
```bash
# Build for production
pnpm build

# Test production build locally
pnpm start

# Analyze bundle size
npx @next/bundle-analyzer
```

## Troubleshooting

### Common Issues
1. **Build Warnings**: Ensure viewport metadata uses generateViewport()
2. **i18n Issues**: Check message file structure and keys
3. **Animation Performance**: Reduce motion on mobile devices
4. **Image Optimization**: Ensure proper next/image usage

### Development Tips
- Use TypeScript strict mode
- Follow component naming conventions
- Keep animations performant
- Test across different locales
- Optimize for Core Web Vitals

## Environment Variables
Create `.env.local` for local development:
```env
# Add any API keys or configuration here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment Notes
- Vercel deployment ready
- Static generation for better performance
- Image optimization configured
- All locales pre-generated at build time

## Maintenance
- Regular dependency updates
- Performance monitoring
- SEO audits
- Translation updates
- Image optimization reviews

---

Last Updated: January 2025
Project Version: 1.0.0
Next.js Version: 15.5.2