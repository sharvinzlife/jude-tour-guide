'use client';

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Safely defer ONLY stylesheets explicitly marked by us.
    // This prevents deferring Next.js hashed CSS files which caused severe CLS.
    const deferCSS = () => {
      const stylesheets = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][data-defer="true"]')
      );

      if (stylesheets.length === 0) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.debug('[CriticalCSS] No data-defer stylesheets found. Skipping.');
        }
        return;
      }

      stylesheets.forEach((link) => {
        const href = link.href;

        // Extra guard: never touch Next.js compiled CSS
        if (href.includes('/_next/static/css/')) {
          return;
        }

        // Defer loading of explicitly marked non-critical stylesheets
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = href;
        newLink.media = 'print';
        newLink.onload = () => {
          newLink.media = 'all';
        };

        document.head.appendChild(newLink);
        link.parentElement?.removeChild(link);
      });
    };

    // Run after initial render
    setTimeout(deferCSS, 100);
  }, []);

  return null;
}

