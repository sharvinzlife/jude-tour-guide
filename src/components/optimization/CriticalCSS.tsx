'use client';

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Defer non-critical CSS loading
    const deferCSS = () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((link) => {
        const href = (link as HTMLLinkElement).href;
        
        // Skip critical CSS (fonts, main styles)
        if (href.includes('fonts.googleapis.com') || href.includes('globals.css')) {
          return;
        }
        
        // Defer loading of non-critical stylesheets
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = href;
        newLink.media = 'print';
        newLink.onload = () => {
          newLink.media = 'all';
        };
        
        document.head.appendChild(newLink);
        (link as HTMLLinkElement).remove();
      });
    };
    
    // Run after initial render
    setTimeout(deferCSS, 100);
  }, []);

  return null;
}
