'use client';

import { useEffect } from 'react';

export default function MobileOptimizer() {
  useEffect(() => {
    // Detect Chrome mobile browsers
    const isChromeMobile = /Chrome/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
    const isMobile = window.innerWidth <= 768;
    
    if (isChromeMobile || isMobile) {
      // Add mobile optimization class to body
      document.body.classList.add('mobile-optimized');
      
      // Prevent forced reflows by batching DOM reads/writes
      let scrollTicking = false;
      let resizeTicking = false;
      
      const handleScroll = () => {
        if (!scrollTicking) {
          requestAnimationFrame(() => {
            // Batch scroll-related DOM operations
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      };
      
      const handleResize = () => {
        if (!resizeTicking) {
          requestAnimationFrame(() => {
            // Batch resize-related DOM operations
            resizeTicking = false;
          });
          resizeTicking = true;
        }
      };
      
      // Optimize touch scrolling with better momentum
      const touchOptions = { passive: true } as const;
      document.addEventListener('touchstart', (e) => {
        // Enable momentum scrolling
        if (e.target instanceof HTMLElement) {
          const scrollableParent = (e.target.closest('[data-scroll]') as HTMLElement) || document.body;
          (scrollableParent.style as any).webkitOverflowScrolling = 'touch';
        }
      }, touchOptions);
      
      // Add optimized event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleResize, { passive: true });
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        document.body.classList.remove('mobile-optimized');
      };
    }
  }, []);

  return null;
}
