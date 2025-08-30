/**
 * Professional Micro-Interaction Components for Kerala Tour Guide Website
 * 
 * This file contains reusable components that provide professional hover effects,
 * animations, and micro-interactions that enhance user experience.
 * 
 * Components include:
 * - Enhanced Cards with Kerala-themed animations
 * - Interactive Buttons with feedback
 * - Animated Statistics and Counters
 * - Social Media Links with hover effects
 * - Image Overlays and Galleries
 * - Form Elements with focus animations
 */

'use client'

import React, { ReactNode, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Enhanced Hover Card Component
interface EnhancedCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'service' | 'testimonial' | 'portfolio'
}

export const EnhancedCard = ({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  variant = 'default' 
}: EnhancedCardProps) => {
  const variants = {
    default: {
      hover: { y: -8, scale: 1.02 },
      tap: { scale: 0.98 }
    },
    service: {
      hover: { y: -12, scale: 1.03 },
      tap: { scale: 0.97 }
    },
    testimonial: {
      hover: { y: -6, scale: 1.01 },
      tap: { scale: 0.99 }
    },
    portfolio: {
      hover: { y: -10, scale: 1.05 },
      tap: { scale: 0.95 }
    }
  }

  return (
    <motion.div
      className={`cursor-pointer transition-shadow duration-300 ${className}`}
      whileHover={disabled ? {} : variants[variant].hover}
      whileTap={disabled ? {} : variants[variant].tap}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={disabled ? undefined : onClick}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      {children}
    </motion.div>
  )
}

// Animated Counter Component
interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2, 
  className = '',
  suffix = '',
  prefix = ''
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const increment = (to - from) / (duration * 60) // 60 FPS
          let current = from
          const timer = setInterval(() => {
            current += increment
            if (current >= to) {
              setCount(to)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, 1000 / 60)
          observer.unobserve(entries[0].target)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Interactive Image Gallery Item
interface GalleryImageProps {
  src: string
  alt: string
  className?: string
  overlay?: ReactNode
  onHover?: () => void
}

export const GalleryImage = ({ 
  src, 
  alt, 
  className = '', 
  overlay, 
  onHover 
}: GalleryImageProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onHoverStart={() => {
        setIsHovered(true)
        onHover?.()
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
      
      {overlay && (
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {overlay}
        </motion.div>
      )}
    </motion.div>
  )
}

// Magnetic Button Effect
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  strength = 0.3 
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// Ripple Effect Button
interface RippleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  rippleColor?: string
}

export const RippleButton = ({ 
  children, 
  className = '', 
  onClick,
  rippleColor = 'rgba(255, 255, 255, 0.6)' 
}: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newRipple = { x, y, id: Date.now() }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={addRipple}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            background: rippleColor
          }}
          initial={{ width: 0, height: 0, transform: 'translate(-50%, -50%)' }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </button>
  )
}

// Floating Action Button
interface FloatingActionButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const FloatingActionButton = ({ 
  children, 
  className = '', 
  onClick,
  position = 'bottom-right' 
}: FloatingActionButtonProps) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  }

  return (
    <motion.button
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.button>
  )
}

// Pulse Animation Wrapper
interface PulseWrapperProps {
  children: ReactNode
  className?: string
  duration?: number
  scale?: number
}

export const PulseWrapper = ({ 
  children, 
  className = '', 
  duration = 2,
  scale = 1.05 
}: PulseWrapperProps) => {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, scale, 1] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

// Tilt Effect Component
interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export const TiltCard = ({ 
  children, 
  className = '', 
  maxTilt = 15 
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width * maxTilt
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height * -maxTilt
    
    setTilt({ x: y, y: x })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

const MicroInteractionComponents = {
  EnhancedCard,
  AnimatedCounter,
  GalleryImage,
  MagneticButton,
  RippleButton,
  FloatingActionButton,
  PulseWrapper,
  TiltCard
}

export default MicroInteractionComponents