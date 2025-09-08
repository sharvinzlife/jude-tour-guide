import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import '@/styles/glassmorphism.css'
import { FooterCompact } from '@/components/layout/FooterCompact';
import MobileOptimizer from '@/components/effects/MobileOptimizer';
import CriticalCSS from '@/components/optimization/CriticalCSS';
import ImageOptimizer from '@/components/optimization/ImageOptimizer';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { Header } from '@/components/layout/Header';
import LazyMount from '@/components/optimization/LazyMount';

const locales = ['en', 'fr', 'de', 'es', 'zh', 'ja'] as const;

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateViewport(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale })
  const meta = messages.meta as Record<string, string>

  const languageAlternates = locales.reduce((acc, loc) => {
    acc[loc] = `https://keralaguide.com/${loc}`
    return acc
  }, {} as Record<string, string>)

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Jude - Kerala Tour Guide' }],
    creator: 'Kerala Guide',
    publisher: 'Kerala Guide',
    robots: 'index, follow',
    icons: {
      icon: '/media/favicon/favicon.svg'
    },
    alternates: {
      canonical: `https://www.tourguidejude.com/${locale}`,
      languages: languageAlternates
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'de' ? 'de_DE' : locale === 'es' ? 'es_ES' : locale === 'zh' ? 'zh_CN' : locale === 'ja' ? 'ja_JP' : 'en_US',
      url: `https://www.tourguidejude.com/${locale}`,
      siteName: 'Jude Tour Guide - Kerala',
      title: meta.title,
      description: meta.description,
      images: [{
        url: 'https://www.tourguidejude.com/media/hero/Hero.jpeg',
        width: 1200,
        height: 630,
        alt: 'Jude - Professional Kerala Tour Guide',
        type: 'image/jpeg'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['https://www.tourguidejude.com/media/hero/Hero.jpeg'],
      creator: '@JudeTourGuide'
    },
    metadataBase: new URL('https://www.tourguidejude.com')
  }
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale })

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/media/favicon/favicon.svg" />
        <link rel="canonical" href={`https://keralaguide.com/${locale}`} />
        <meta name="theme-color" content="#FFD700" />
        <meta name="msapplication-TileColor" content="#FFD700" />
        {/* Preconnect for Twemoji CDN used by AnimatedBackground icons */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        {/* Font fallback optimization (we rely on next/font for Inter) */}
        <style>
          {`
            @font-face {
              font-family: 'Inter Fallback';
              src: local('Arial'), local('Helvetica'), local('sans-serif');
              font-display: swap;
              ascent-override: 90.44%;
              descent-override: 22.52%;
              line-gap-override: 0.00%;
              size-adjust: 107.12%;
            }
            
            body {
              font-family: Inter, 'Inter Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }
          `}
        </style>
        
        {/* Critical CSS to prevent FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html { font-family: system-ui, -apple-system, sans-serif; }
            body { font-family: Inter, system-ui, -apple-system, sans-serif; }
          `
        }} />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgent",
              "name": "Kerala Guide - Jude Tour Guide",
              "description": "Professional certified tour guide services in Kerala, India. Authentic backwater, hill station, wildlife and cultural heritage tours.",
              "url": `https://www.tourguidejude.com/${locale}`,
              "telephone": "+91-98765-43210",
              "email": "contact@keralaguide.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kochi",
                "addressRegion": "Kerala",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "9.9312",
                "longitude": "76.2673"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "500",
                "bestRating": "5",
                "worstRating": "1"
              },
              "priceRange": "$$",
              "image": "https://www.tourguidejude.com/media/hero/Hero.jpeg",
              "serviceArea": {
                "@type": "State",
                "name": "Kerala, India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Kerala Tour Packages",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Kerala Backwater Tours",
                      "description": "Experience Kerala's famous backwaters on traditional houseboats"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Hill Station Tours",
                      "description": "Explore misty mountains and tea plantations in Munnar"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "TouristTrip",
                      "name": "Wildlife Safari Tours",
                      "description": "Discover Kerala's rich wildlife in national parks"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased bg-gradient-to-br from-kerala-ivory via-white to-kerala-coconut`}
      >
        {/* Site-wide animated background behind all content (mount on idle) */}
        <LazyMount strategy="idle" delay={200}>
          <AnimatedBackground />
        </LazyMount>
        <MobileOptimizer />
        <CriticalCSS />
        <ImageOptimizer />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen relative z-10" style={{ paddingTop: '4rem' }}>
            {children}
          </main>
          <FooterCompact />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
