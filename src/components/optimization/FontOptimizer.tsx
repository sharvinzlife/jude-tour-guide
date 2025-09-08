'use client'

import { useEffect } from 'react'

export default function FontOptimizer() {
  useEffect(() => {
    // Preload critical font subsets to prevent layout shifts
    const preloadFonts = () => {
      const fontUrls = [
        'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2',
        'https://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7q4AOeekWPrP.woff2'
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

    // Apply font loading optimization
    const optimizeFontLoading = () => {
      // Add font-display: swap to all font-face declarations
      const style = document.createElement('style')
      style.textContent = `
        @font-face {
          font-family: 'Inter Optimized';
          src: local('Inter'), local('Arial'), local('Helvetica'), local('sans-serif');
          font-display: swap;
          font-weight: 100 900;
          font-style: normal;
          ascent-override: 90.44%;
          descent-override: 22.52%;
          line-gap-override: 0%;
          size-adjust: 107.12%;
        }
        
        /* Prevent layout shifts during font loading */
        html, body {
          font-family: 'Inter Optimized', Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
        
        /* Ensure consistent line heights */
        * {
          font-kerning: auto;
          font-optical-sizing: auto;
          text-rendering: optimizeSpeed;
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
