'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

// Basic loading spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'emerald' | 'amber' | 'orange'
}

export const LoadingSpinner = ({ size = 'md', color = 'emerald' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    emerald: 'text-emerald-600',
    amber: 'text-amber-500',
    orange: 'text-orange-500'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-full h-full" />
    </motion.div>
  )
}

// Pulsing dot loader
export const PulsingDots = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-emerald-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}

// Bouncing balls
export const BouncingBalls = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} bg-emerald-500 rounded-full`}
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}

// Spinning ring
export const SpinningRing = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-4'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-emerald-200 border-t-emerald-600 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Fade in loader
interface FadeLoaderProps {
  text?: string
  showSpinner?: boolean
}

export const FadeLoader = ({ text = 'Loading...', showSpinner = true }: FadeLoaderProps) => {
  return (
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showSpinner && <SpinningRing />}
      <motion.p
        className="text-gray-600"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}

// Progress bar loader
interface ProgressLoaderProps {
  progress?: number
  className?: string
}

export const ProgressLoader = ({ progress = 0, className = '' }: ProgressLoaderProps) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <motion.div
        className="bg-emerald-600 h-2 rounded-full"
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}

const LoadingAnimations = {
  LoadingSpinner,
  PulsingDots,
  BouncingBalls,
  SpinningRing,
  FadeLoader,
  ProgressLoader
}

export default LoadingAnimations