'use client'

import { ReactNode, HTMLProps, useEffect, useRef, useState } from 'react'

interface CSSMotionProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode
  initial?: string
  animate?: string
  transition?: {
    duration?: number
    delay?: number
    ease?: string
  }
  variants?: {
    [key: string]: string
  }
  className?: string
}

export function CSSMotion({
  children,
  initial = '',
  animate = '',
  transition = {},
  variants = {},
  className = '',
  ...props
}: CSSMotionProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [currentVariant, setCurrentVariant] = useState(initial)

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentVariant(animate)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (el) {
      observer.observe(el)
    }

    return () => {
      if (el) {
        observer.unobserve(el)
      }
      observer.disconnect()
    }
  }, [animate])

  const appliedClasses = variants[currentVariant] || currentVariant || ''

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${appliedClasses} ${className}`}
      style={{
        transitionDuration: `${transition.duration ?? 1}s`,
        transitionDelay: `${transition.delay ?? 0}s`,
        transitionTimingFunction: transition.ease ?? 'ease-out',
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default CSSMotion
