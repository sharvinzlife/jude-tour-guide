'use client'

import React from 'react'

interface StaticCoconutTreeProps {
  size?: number
  className?: string
  variant?: 'small' | 'medium' | 'large'
}

export function StaticCoconutTree({ size = 48, className = '', variant = 'small' }: StaticCoconutTreeProps) {
  const getImageSrc = () => {
    if (size <= 40 || variant === 'small') {
      return '/media/design backgrounds/unnamed.png'
    } else if (size <= 120 || variant === 'medium') {
      return '/media/design backgrounds/unnamed.png'
    } else {
      return '/media/design backgrounds/unnamed.png'
    }
  }

  return (
    <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
      <img
        src={getImageSrc()}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        aria-hidden="true"
        role="presentation"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

export function BackgroundCoconutTree({ 
  size = 200, 
  className = '', 
  opacity = 0.1,
  position = 'absolute'
}: {
  size?: number
  className?: string
  opacity?: number
  position?: string
}) {
  return (
    <div 
      className={`pointer-events-none ${position} ${className}`}
      style={{ opacity }}
    >
      <StaticCoconutTree size={size} variant={size <= 100 ? 'medium' : 'large'} />
    </div>
  )
}

export function CoconutTreeBackground({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <BackgroundCoconutTree
        size={120}
        opacity={0.03}
        className="top-1/4 right-1/5 animate-float"
        position="absolute"
      />
      <BackgroundCoconutTree
        size={80}
        opacity={0.05}
        className="bottom-1/3 left-1/4 animate-float-slow"
        position="absolute"
      />
    </div>
  )
}

// Lightweight decorative cluster used by pages
export function FloatingCoconutTrees({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <BackgroundCoconutTree
        size={200}
        opacity={0.03}
        className="top-24 left-10 animate-float-slow"
        position="absolute"
      />
      <BackgroundCoconutTree
        size={150}
        opacity={0.04}
        className="top-1/3 right-12 animate-float-slow delay-500"
        position="absolute"
      />
      <BackgroundCoconutTree
        size={180}
        opacity={0.05}
        className="bottom-24 left-1/5 animate-float-slow delay-1000"
        position="absolute"
      />
      <BackgroundCoconutTree
        size={120}
        opacity={0.06}
        className="bottom-12 right-1/4 animate-float-slow delay-1500"
        position="absolute"
      />
    </div>
  )
}
