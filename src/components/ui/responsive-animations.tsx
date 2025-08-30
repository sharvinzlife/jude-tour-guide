'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
      const isSmallScreen = window.innerWidth < 768
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return isMobile
}

// Hook to detect reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// Responsive animation wrapper
interface ResponsiveMotionProps {
  children: ReactNode
  className?: string
  variant?: 'card' | 'button' | 'text' | 'image'
  disabled?: boolean
}

export const ResponsiveMotion = ({ 
  children, 
  className = '', 
  variant = 'card',
  disabled = false 
}: ResponsiveMotionProps) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  
  // Define animation variants based on device and preference
  const getAnimationProps = () => {
    if (disabled || prefersReducedMotion) {
      return {}
    }

    const baseVariants = {
      card: {
        hover: { scale: isMobile ? 1.02 : 1.05, y: isMobile ? -2 : -5 },
        tap: { scale: 0.98 }
      },
      button: {
        hover: { scale: isMobile ? 1.02 : 1.05 },
        tap: { scale: 0.95 }
      },
      text: {
        hover: { y: isMobile ? -1 : -2 },
        tap: { y: 0 }
      },
      image: {
        hover: { scale: isMobile ? 1.03 : 1.1 },
        tap: { scale: 0.95 }
      }
    }

    return {
      whileHover: baseVariants[variant].hover,
      whileTap: baseVariants[variant].tap,
      transition: {
        type: 'spring' as const,
        stiffness: isMobile ? 300 : 400,
        damping: isMobile ? 25 : 20
      }
    }
  }

  return (
    <motion.div className={className} {...getAnimationProps()}>
      {children}
    </motion.div>
  )
}

// Responsive fade in animation
interface ResponsiveFadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export const ResponsiveFadeIn = ({ 
  children, 
  delay = 0, 
  className = '' 
}: ResponsiveFadeInProps) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: isMobile ? 0.3 : 0.6, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  )
}

// Responsive slide in animation
interface ResponsiveSlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  className?: string
}

export const ResponsiveSlideIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '' 
}: ResponsiveSlideInProps) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const getInitialPosition = () => {
    const mobileDistance = 20
    const desktopDistance = 40

    const distance = isMobile ? mobileDistance : desktopDistance

    switch (direction) {
      case 'left': return { x: -distance, opacity: 0 }
      case 'right': return { x: distance, opacity: 0 }
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      default: return { y: distance, opacity: 0 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ 
        duration: isMobile ? 0.4 : 0.7, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  )
}

// Responsive stagger animation for lists
interface ResponsiveStaggerProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export const ResponsiveStagger = ({ 
  children, 
  className = '', 
  staggerDelay 
}: ResponsiveStaggerProps) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()

  const delay = staggerDelay || (isMobile ? 0.1 : 0.15)

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <ResponsiveFadeIn key={index} delay={index * delay}>
          {child}
        </ResponsiveFadeIn>
      ))}
    </div>
  )
}

// Responsive parallax effect (minimal on mobile)
interface ResponsiveParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export const ResponsiveParallax = ({ 
  children, 
  offset = 50, 
  className = '' 
}: ResponsiveParallaxProps) => {
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion, isMobile])

  const y = prefersReducedMotion || isMobile ? 0 : scrollY * (offset / 100)

  return (
    <motion.div
      className={className}
      style={{ y }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

const ResponsiveAnimations = {
  ResponsiveMotion,
  ResponsiveFadeIn,
  ResponsiveSlideIn,
  ResponsiveStagger,
  ResponsiveParallax,
  useIsMobile,
  useReducedMotion
}

export default ResponsiveAnimations