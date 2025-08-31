'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'

interface CSSScrollAnimationProps {
  children: ReactNode
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'textReveal'
  delay?: number
  duration?: number
  className?: string
  mountVisible?: boolean
}
export default function CSSScrollAnimation({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  duration = 0.8,
  className = '',
  mountVisible = false,
}: CSSScrollAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(mountVisible)

  useEffect(() => {
    // If already visible on mount, skip observer setup
    if (mountVisible) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const node = ref.current
    if (node) {
      observer.observe(node)
    }

    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [mountVisible])

  const animationClasses: Record<string, string> = {
    fadeUp: 'translate-y-16 opacity-0',
    fadeDown: 'translate-y-[-4rem] opacity-0',
    fadeLeft: 'translate-x-[-4rem] opacity-0',
    fadeRight: 'translate-x-16 opacity-0',
    scale: 'scale-95 opacity-0',
    textReveal: 'translate-y-24 opacity-0'
  }

  const activeClasses: Record<string, string> = {
    fadeUp: 'translate-y-0 opacity-100',
    fadeDown: 'translate-y-0 opacity-100',
    fadeLeft: 'translate-x-0 opacity-100',
    fadeRight: 'translate-x-0 opacity-100',
    scale: 'scale-100 opacity-100',
    textReveal: 'translate-y-0 opacity-100'
  }

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible 
          ? activeClasses[variant]
          : animationClasses[variant]
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  )
}
