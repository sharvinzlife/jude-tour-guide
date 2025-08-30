import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show the locale prefix in the pathname
  localePrefix: 'always'
})

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(en|fr|de|es|zh|ja)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|media|.*\\..*).*)' 
  ]
}