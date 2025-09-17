import type { MetadataRoute } from 'next'
import { locales } from '@/i18n'
import { SITE_CONFIG } from '@/lib/constants'

const baseUrl = SITE_CONFIG.url.replace(/\/$/, '')

const staticPaths = ['', 'about', 'contact', 'portfolio']

function localizedUrl(locale: string, path: string) {
  const suffix = path ? `/${path}` : ''
  return `${baseUrl}/${locale}${suffix}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const entries: MetadataRoute.Sitemap = []

  for (const path of staticPaths) {
    for (const locale of locales) {
      const url = localizedUrl(locale, path)
      const languages: Record<string, string> = {}
      for (const altLocale of locales) {
        languages[altLocale] = localizedUrl(altLocale, path)
      }
      // x-default points to English variant
      languages['x-default'] = localizedUrl('en', path)

      entries.push({
        url,
        lastModified,
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.7,
        alternates: {
          languages
        }
      })
    }
  }

  return entries
}
