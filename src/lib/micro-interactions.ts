/**
 * Professional Micro-Interaction Utilities for Kerala Tour Guide Website
 * 
 * This file contains professionally crafted micro-interactions that enhance UX
 * while respecting accessibility preferences and performance best practices.
 * 
 * Features:
 * - Kerala-themed natural animations
 * - Performance-optimized transforms
 * - Accessibility compliance (prefers-reduced-motion)
 * - Mobile-optimized interactions
 * - Professional hover effects
 * - Loading states and transitions
 */

import { type Variants, type Transition } from 'framer-motion'

// Professional Easing Curves
export const easingCurves = {
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  kerala: [0.23, 1, 0.32, 1], // Custom Kerala-inspired easing
  natural: [0.4, 0, 0.2, 1], // Natural motion
  crisp: [0.4, 0, 0.6, 1], // Sharp, professional
} as const

// Professional Timing
export const timing = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  deliberate: 0.8,
} as const

// Enhanced Hover Effects for Cards
export const cardHoverVariants: Variants = {
  initial: { 
    scale: 1, 
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderColor: 'rgba(229, 231, 235, 1)',
  },
  hover: { 
    scale: 1.02,
    y: -8,
    boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.05)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    transition: { 
      duration: timing.normal,
      ease: easingCurves.kerala,
      boxShadow: { duration: timing.slow }
    }
  },
  tap: { 
    scale: 0.98,
    y: -4,
    transition: { duration: timing.fast }
  }
}

// Enhanced Service Card Animations
export const serviceCardVariants: Variants = {
  initial: { 
    scale: 1, 
    y: 0,
    rotateY: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  hover: { 
    scale: 1.03,
    y: -12,
    rotateY: 2,
    boxShadow: '0 20px 40px -12px rgba(16, 185, 129, 0.25), 0 0 20px rgba(16, 185, 129, 0.1)',
    transition: { 
      duration: timing.normal,
      ease: easingCurves.kerala,
    }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: timing.fast }
  }
}

// Icon Animations for Service Cards
export const serviceIconVariants: Variants = {
  initial: { 
    scale: 1,
    rotate: 0,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  hover: { 
    scale: 1.15,
    rotate: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    transition: { 
      duration: timing.normal,
      ease: easingCurves.bounce,
    }
  },
  tap: { 
    scale: 0.95,
    rotate: -2,
    transition: { duration: timing.fast }
  }
}

// Button Press Feedback
export const buttonPressVariants: Variants = {
  initial: { 
    scale: 1,
    y: 0,
  },
  hover: { 
    scale: 1.05,
    y: -1,
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  },
  tap: { 
    scale: 0.95,
    y: 0,
    transition: { duration: timing.instant }
  }
}

// Professional Social Link Animations
export const socialLinkVariants: Variants = {
  initial: { 
    scale: 1,
    rotate: 0,
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  hover: { 
    scale: 1.1,
    rotate: 5,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    transition: { 
      duration: timing.normal,
      ease: easingCurves.bounce,
    }
  },
  tap: { 
    scale: 0.9,
    transition: { duration: timing.fast }
  }
}

// Ripple Effect for Buttons
export const rippleVariants: Variants = {
  initial: { 
    scale: 0,
    opacity: 0.5,
  },
  animate: { 
    scale: 4,
    opacity: 0,
    transition: { 
      duration: timing.slow,
      ease: easingCurves.natural,
    }
  }
}

// Image Overlay Animations
export const imageOverlayVariants: Variants = {
  initial: { 
    opacity: 0,
    scale: 1.1,
  },
  hover: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: timing.normal,
      ease: easingCurves.natural,
    }
  }
}

// Enhanced Stats Counter Animation
export const statsCounterVariants: Variants = {
  initial: { 
    scale: 1,
    y: 0,
  },
  inView: { 
    scale: [1, 1.1, 1],
    y: [0, -5, 0],
    transition: { 
      duration: timing.slow,
      ease: easingCurves.bounce,
      delay: 0.2,
    }
  },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  }
}

// Form Field Focus Animations
export const formFieldVariants: Variants = {
  initial: { 
    borderColor: 'rgba(209, 213, 219, 1)',
    boxShadow: '0 0 0 0 rgba(16, 185, 129, 0)',
  },
  focus: { 
    borderColor: 'rgba(16, 185, 129, 1)',
    boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)',
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  },
  error: { 
    borderColor: 'rgba(239, 68, 68, 1)',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  }
}

// Profile Image Enhanced Animation
export const profileImageVariants: Variants = {
  initial: { 
    scale: 1,
    rotate: 0,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  },
  hover: { 
    scale: 1.05,
    rotate: 1,
    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.1)',
    transition: { 
      duration: timing.normal,
      ease: easingCurves.kerala,
    }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: timing.fast }
  }
}

// Kerala-themed Floating Animation
export const keralaFloatVariants: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-5, 5, -5],
    rotate: [-1, 1, -1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easingCurves.natural,
    }
  }
}

// Loading State Animations
export const loadingPulseVariants: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easingCurves.natural,
    }
  }
}

// Stagger Container for Lists
export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

// Individual List Item Animation
export const staggerItemVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.9,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: timing.normal,
      ease: easingCurves.kerala,
    }
  }
}

// Page Transition Animations
export const pageTransitionVariants: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: timing.slow,
      ease: easingCurves.kerala,
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 1.02,
    transition: { 
      duration: timing.normal,
      ease: easingCurves.natural,
    }
  }
}

// Toast/Notification Animations
export const toastVariants: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
    x: 100,
  },
  animate: { 
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { 
      duration: timing.normal,
      ease: easingCurves.bounce,
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    x: 100,
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  }
}

// Modal/Dialog Animations
export const modalVariants: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: timing.normal,
      ease: easingCurves.kerala,
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { 
      duration: timing.fast,
      ease: easingCurves.natural,
    }
  }
}

// Backdrop Animation
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: timing.normal }
  },
  exit: { 
    opacity: 0,
    transition: { duration: timing.fast }
  }
}

// Kerala-specific Natural Elements
export const leafSwayVariants: Variants = {
  initial: { rotate: 0, scale: 1 },
  animate: {
    rotate: [-2, 2, -2],
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: easingCurves.natural,
    }
  }
}

export const waterRippleVariants: Variants = {
  initial: { scale: 0, opacity: 0.8 },
  animate: {
    scale: [0, 2, 4],
    opacity: [0.8, 0.4, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easingCurves.natural,
    }
  }
}

// Utility Functions

/**
 * Get animation variants based on user preferences
 */
export const getResponsiveVariants = (
  fullVariants: Variants,
  reducedVariants: Variants,
  prefersReducedMotion: boolean = false
): Variants => {
  return prefersReducedMotion ? reducedVariants : fullVariants
}

/**
 * Create custom hover animation with Kerala theme
 */
export const createKeralaHover = (
  scale: number = 1.02,
  y: number = -8,
  shadowColor: string = 'rgba(16, 185, 129, 0.15)'
): Variants => ({
  initial: { scale: 1, y: 0 },
  hover: {
    scale,
    y,
    boxShadow: `0 25px 50px -12px ${shadowColor}`,
    transition: {
      duration: timing.normal,
      ease: easingCurves.kerala,
    }
  },
  tap: {
    scale: scale * 0.96,
    y: y * 0.5,
    transition: { duration: timing.fast }
  }
})

/**
 * Create staggered animation for lists
 */
export const createStaggerAnimation = (
  staggerDelay: number = 0.1,
  initialDelay: number = 0.2
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    }
  }
})

/**
 * Create custom transition with Kerala easing
 */
export const createKeralaTransition = (
  duration: number = timing.normal,
  delay: number = 0
): Transition => ({
  duration,
  delay,
  ease: easingCurves.kerala,
})

// Reduced Motion Alternatives
export const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: timing.fast }
  },
  hover: {
    opacity: 0.8,
    transition: { duration: timing.instant }
  }
}

export const reducedMotionStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
}

// Export all variants for easy access
export const microInteractionVariants = {
  cardHover: cardHoverVariants,
  serviceCard: serviceCardVariants,
  serviceIcon: serviceIconVariants,
  buttonPress: buttonPressVariants,
  socialLink: socialLinkVariants,
  ripple: rippleVariants,
  imageOverlay: imageOverlayVariants,
  statsCounter: statsCounterVariants,
  formField: formFieldVariants,
  profileImage: profileImageVariants,
  keralaFloat: keralaFloatVariants,
  loadingPulse: loadingPulseVariants,
  staggerContainer: staggerContainerVariants,
  staggerItem: staggerItemVariants,
  pageTransition: pageTransitionVariants,
  toast: toastVariants,
  modal: modalVariants,
  backdrop: backdropVariants,
  leafSway: leafSwayVariants,
  waterRipple: waterRippleVariants,
  reducedMotion: reducedMotionVariants,
}

export default microInteractionVariants