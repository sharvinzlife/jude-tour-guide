import {notFound} from 'next/navigation'
import {getRequestConfig} from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'fr', 'de', 'es', 'zh', 'ja'] as const

export default getRequestConfig(async ({locale}) => {
  // Fallback to default locale if undefined
  const validLocale = locale || 'en'
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(validLocale as (typeof locales)[number])) notFound()

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  }
})