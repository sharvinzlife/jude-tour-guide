'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Floating coconut animation
export const FloatingCoconut = ({ className = '' }: { className?: string }) => {
  return (
    <motion.div
      className={`w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full relative ${className}`}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Coconut fibers */}
      <div className="absolute inset-0 rounded-full bg-amber-700/30" />
      <div className="absolute top-1 left-1 w-2 h-2 bg-amber-500 rounded-full" />
      <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-900 rounded-full" />
    </motion.div>
  )
}

// Swaying palm tree animation
export const SwayingPalm = ({ height = 'h-32', className = '' }: { height?: string; className?: string }) => {
  return (
    <div className={`relative ${height} ${className}`}>
      {/* Palm trunk */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-2 bg-gradient-to-t from-amber-800 to-amber-600 origin-bottom"
        style={{ height: '80%', marginLeft: '-4px' }}
        animate={{
          rotate: [-2, 2, -2],
          scaleY: [1, 1.02, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      {/* Palm leaves */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        animate={{
          rotate: [-5, 5, -5],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full origin-left"
            style={{
              transform: `rotate(${i * 60}deg)`,
              transformOrigin: '0 50%'
            }}
            animate={{
              rotate: [i * 60 - 10, i * 60 + 10, i * 60 - 10],
              scaleX: [1, 1.1, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

// Floating spice particles
export const SpiceParticleField = ({ count = 20, className = '' }: { count?: number; className?: string }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: [
              'linear-gradient(45deg, #F59E0B, #D97706)',
              'linear-gradient(45deg, #DC2626, #B91C1C)',
              'linear-gradient(45deg, #059669, #047857)',
              'linear-gradient(45deg, #7C3AED, #5B21B6)'
            ][i % 4],
            top: `${(i * 5) % 100}%`,
            left: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, (i % 5) * 10 - 25, (i % 10) * 10 - 50],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: (i % 3) + 3,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  )
}

// Rippling backwater effect
interface BackwaterRipplesProps {
  children?: ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}

export const BackwaterRipples = ({ 
  children, 
  className = '',
  intensity = 'medium' 
}: BackwaterRipplesProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    const intensityConfig = {
      low: { interval: 8000, maxRipples: 2 },
      medium: { interval: 5000, maxRipples: 4 },
      high: { interval: 3000, maxRipples: 6 }
    }
    
    const config = intensityConfig[intensity]
    const interval = setInterval(() => {
      const newRipple = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      }
      
      setRipples(prev => [...prev.slice(-config.maxRipples + 1), newRipple])
    }, config.interval)

    return () => clearInterval(interval)
  }, [intensity])

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: 'linear-gradient(135deg, #0ea5e9, #0369a1)' }}>
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-white/30" />
        </motion.div>
      ))}
      
      {children}
    </div>
  )
}

// Simple loading spinner
export const KeralaSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-emerald-200 border-t-emerald-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Fade in animation wrapper
interface FadeInWrapperProps {
  children: ReactNode
  delay?: number
  className?: string
}

export const FadeInWrapper = ({ children, delay = 0, className = '' }: FadeInWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const KeralaAnimations = {
  FloatingCoconut,
  SwayingPalm,
  SpiceParticleField,
  BackwaterRipples,
  KeralaSpinner,
  FadeInWrapper
}

export default KeralaAnimations