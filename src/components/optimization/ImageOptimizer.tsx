'use client';

import { useEffect } from 'react';

export default function ImageOptimizer() {
  useEffect(() => {
    // Optimize images for better performance
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img) => {
        // Add loading="lazy" to images not already optimized
        if (!img.hasAttribute('loading') && !img.hasAttribute('priority')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        
        // Optimize image dimensions
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLImageElement;
              
              // Set appropriate sizes based on viewport
              if (!target.hasAttribute('sizes')) {
                const width = target.getBoundingClientRect().width;
                if (width <= 640) {
                  target.setAttribute('sizes', '100vw');
                } else if (width <= 1024) {
                  target.setAttribute('sizes', '50vw');
                } else {
                  target.setAttribute('sizes', '33vw');
                }
              }
              
              observer.unobserve(target);
            }
          });
        });
        
        observer.observe(img);
      });
    };
    
    // Run optimization after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
      optimizeImages();
    }
    
    // Re-optimize when new images are added
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const newImages = element.querySelectorAll('img');
            if (newImages.length > 0) {
              setTimeout(optimizeImages, 100);
            }
          }
        });
      });
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
