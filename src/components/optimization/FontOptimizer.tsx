'use client'

import { useEffect } from 'react'

export default function FontOptimizer() {
  useEffect(() => {
    // Updated font URLs to fix glyph bbox errors
    const preloadFonts = () => {
      const fontUrls = [
        'https://fonts.gstatic.com/s/inter/v18/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2',
        'https://fonts.gstatic.com/s/rajdhani/v16/LDI2apCSOBg7S-QT7pb0EPOreefkkbIx.woff2'
      ]

      fontUrls.forEach(url => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = url
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    // Apply font loading optimization with better error handling
    const optimizeFontLoading = () => {
      const style = document.createElement('style')
      style.textContent = `
        /* Enhanced font fallback system */
        @font-face {
          font-family: 'Inter Fallback';
          src: local('Arial'), local('Helvetica'), local('system-ui'), local('sans-serif');
          font-display: swap;
          font-weight: 100 900;
          font-style: normal;
          ascent-override: 90.44%;
          descent-override: 22.52%;
          line-gap-override: 0%;
          size-adjust: 107.12%;
        }
        
        @font-face {
          font-family: 'Rajdhani Fallback';
          src: local('Arial Black'), local('Helvetica Bold'), local('system-ui');
          font-display: swap;
          font-weight: 400 700;
          font-style: normal;
        }
        
        /* Prevent layout shifts and FOUC */
        html {
          font-family: 'Inter Fallback', system-ui, -apple-system, sans-serif;
        }
        
        body {
          font-family: Inter, 'Inter Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Optimize text rendering */
        * {
          font-kerning: auto;
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent horizontal scrolling issues */
        html, body {
          overflow-x: hidden;
        }
      `
      document.head.appendChild(style)
    }

    preloadFonts()
    optimizeFontLoading()

    // Monitor font loading and prevent layout shifts
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        // Font loading complete, remove any loading indicators
        document.body.classList.add('fonts-loaded')
      })
    }
  }, [])

  return null
}
