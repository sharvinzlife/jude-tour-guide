import type { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { SITE_CONFIG } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url.replace(/\/$/, '')

  const disallow = new Set<string>(['/packages', '/packages/'])
  for (const locale of locales) {
    disallow.add(`/${locale}/packages`)
    disallow.add(`/${locale}/packages/`)
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: Array.from(disallow)
      },
      { userAgent: 'facebookexternalhit/1.1', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: 'LinkedInBot', allow: '/' },
      { userAgent: 'TelegramBot', allow: '/' }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, '')
  }
}
