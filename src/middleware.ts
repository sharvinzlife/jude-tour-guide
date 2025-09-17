import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'
import { NextRequest, NextResponse } from 'next/server'

// Create the next-intl middleware instance
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show the locale prefix in the pathname
  localePrefix: 'always'
})

// Custom middleware wrapper to intercept and hide packages routes
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Build a regex that matches either:
  // 1) /packages or /packages/... (no locale, just in case)
  // 2) /{locale}/packages or /{locale}/packages/...
  const localePattern = locales.join('|')
  const packagesRegex = new RegExp(
    `^(?:/packages(?:/.*)?|/(?:${localePattern})/packages(?:/.*)?)$`
  )

  if (packagesRegex.test(pathname)) {
    // Return a 404 for all packages routes to hide them from users and bots
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow'
      }
    })
  }

  // Delegate to next-intl middleware for locale handling
  return intlMiddleware(req)
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(en|fr|de|es|zh|ja)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|media|.*\\..*).*)' 
  ]
}