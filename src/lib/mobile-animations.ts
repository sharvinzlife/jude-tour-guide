import { type Variants } from 'framer-motion'

// Mobile-optimized animation variants with reduced motion for performance
export const mobileOptimized = {
  // Detect if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  // Check if device is mobile
  isMobile: () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}

// Reduced motion variants for accessibility
export const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

// Mobile-optimized fade variants (no transforms)
export const mobileFade: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

// Light scale animation for mobile
export const mobileScale: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
}

// Mobile-optimized stagger with shorter delays
export const mobileStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05, // Reduced from 0.1
      delayChildren: 0.1     // Reduced from 0.2
    }
  }
}

// Utility function to get appropriate animation variant based on device/preference
export const getResponsiveVariants = (
  fullAnimation: Variants,
  reducedAnimation: Variants = reducedMotionVariants
): Variants => {
  // Server-side fallback
  if (typeof window === 'undefined') return reducedAnimation
  
  // Check user preference and device capability
  if (mobileOptimized.prefersReducedMotion() || mobileOptimized.isMobile()) {
    return reducedAnimation
  }
  
  return fullAnimation
}

// Mobile touch-friendly hover variants
export const mobileTouchHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02, // Reduced scale for mobile
    transition: { duration: 0.15 } // Faster transition
  },
  tap: { scale: 0.98 }
}

// Performance-optimized Kerala animations for mobile
export const mobileKeralaEffects = {
  // Reduced spice particles for mobile
  spiceCount: mobileOptimized.isMobile() ? 10 : 20,
  
  // Lighter floating animation
  lightFloat: {
    animate: {
      y: [0, -5, 0], // Reduced movement
      transition: {
        duration: 3,   // Longer duration for smoother animation
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  
  // Simplified ripple effect
  simpleRipple: {
    animate: {
      scale: [1, 1.1],
      opacity: [0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut'
      }
    }
  }
}

// Adaptive animation hook configuration
export const adaptiveAnimationConfig = {
  // Full desktop animations
  desktop: {
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99],
    staggerChildren: 0.1,
    enableComplexAnimations: true
  },
  
  // Optimized mobile animations
  mobile: {
    duration: 0.3,
    ease: 'easeOut',
    staggerChildren: 0.05,
    enableComplexAnimations: false
  },
  
  // Reduced motion settings
  reducedMotion: {
    duration: 0.2,
    ease: 'linear',
    staggerChildren: 0,
    enableComplexAnimations: false
  }
}

// Get appropriate config based on device and preferences
export const getAnimationConfig = () => {
  if (typeof window === 'undefined') return adaptiveAnimationConfig.reducedMotion
  
  if (mobileOptimized.prefersReducedMotion()) {
    return adaptiveAnimationConfig.reducedMotion
  }
  
  if (mobileOptimized.isMobile()) {
    return adaptiveAnimationConfig.mobile
  }
  
  return adaptiveAnimationConfig.desktop
}

// Performance monitoring for animations
export const animationPerformance = {
  // Check if device supports smooth animations
  canHandleSmoothAnimations: () => {
    if (typeof window === 'undefined') return false
    
    // Basic performance heuristics
    const connection = (navigator as { connection?: { effectiveType?: string } })?.connection
    const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
    
    return !isSlowConnection && !isLowEndDevice && !mobileOptimized.isMobile()
  },
  
  // Throttle animations for better performance
  getThrottledAnimationProps: (baseProps: Record<string, unknown>) => {
    if (!animationPerformance.canHandleSmoothAnimations()) {
      return {
        ...baseProps,
        transition: {
          ...(baseProps.transition || {}),
          duration: ((baseProps.transition as { duration?: number })?.duration || 0.6) * 0.5,
          ease: 'easeOut'
        }
      }
    }
    return baseProps
  }
}

const mobileAnimationsDefault = {
  mobileOptimized,
  reducedMotionVariants,
  mobileFade,
  mobileScale,
  mobileStagger,
  getResponsiveVariants,
  mobileTouchHover,
  mobileKeralaEffects,
  adaptiveAnimationConfig,
  getAnimationConfig,
  animationPerformance
}

export default mobileAnimationsDefault