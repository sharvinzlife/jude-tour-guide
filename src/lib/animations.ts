import { type Variants } from 'framer-motion'

// General Animation Variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -60 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.4 } }
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 60 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { opacity: 0, x: 20, transition: { duration: 0.4 } }
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
}

// Text Reveal Animations
export const textReveal: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

export const textRevealFast: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

// Stagger Animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

// Hero Section Animations
export const heroImageAnimation: Variants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

export const heroContentAnimation: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.3
    }
  }
}

// Kerala-themed Natural Animations
export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const swayingAnimation: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-2, 2, -2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const pulseAnimation: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const leafFloat: Variants = {
  initial: { y: 0, x: 0, rotate: 0 },
  animate: {
    y: [0, -20, 0],
    x: [0, 10, -5, 0],
    rotate: [0, 5, -3, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Card and Gallery Animations
export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { scale: 0.98 }
}

export const imageZoom: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const galleryStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

export const galleryItem: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

// Button Animations
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { scale: 0.95 }
}

export const buttonSlideIn: Variants = {
  initial: { width: 0 },
  hover: {
    width: "100%",
    transition: { duration: 0.3, ease: "easeOut" }
  }
}

// Page Transition Animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

// Header/Footer Scroll Animations
export const headerScrollAnimation: Variants = {
  initial: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
  }
}

// Testimonial Carousel Animations
export const testimonialSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }
  })
}

// Loading Animations
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

export const loadingDots: Variants = {
  animate: {
    opacity: [1, 0.5, 1],
    scale: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Mobile Optimized Animations (reduced motion)
export const mobileReducedMotion: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

// Scroll-triggered animations
export const scrollTriggerVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 50
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}

// Kerala-specific themed animations
export const coconutSway: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: [-1, 1, -1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const backwaterRipple: Variants = {
  initial: { scale: 1, opacity: 0.3 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.1, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const spiceParticle: Variants = {
  initial: { opacity: 0, scale: 0.5, y: 0 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.5],
    y: [0, -50, -100],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeOut"
    }
  }
}

// Utility function to get reduced motion variants for accessibility
export const getAnimationVariants = (preferReducedMotion: boolean) => {
  if (preferReducedMotion) {
    return mobileReducedMotion
  }
  return fadeInUp
}

// Spring configurations for smooth animations
export const springConfigs = {
  gentle: {
    type: "spring",
    damping: 20,
    stiffness: 100
  },
  bouncy: {
    type: "spring",
    damping: 15,
    stiffness: 200
  },
  slow: {
    type: "spring",
    damping: 25,
    stiffness: 80
  },
  fast: {
    type: "spring",
    damping: 30,
    stiffness: 300
  }
} as const

// Animation delays for staggered effects
export const delays = {
  short: 0.1,
  medium: 0.2,
  long: 0.3,
  extraLong: 0.5
} as const