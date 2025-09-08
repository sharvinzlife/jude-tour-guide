'use client'

import React, { useEffect, useRef, useState } from 'react'

type LazyMountProps = {
  children: React.ReactNode
  /** Use IntersectionObserver to mount when in view */
  strategy?: 'in-view' | 'idle'
  /** Margin for viewport detection */
  rootMargin?: string
  /** Threshold for intersection */
  threshold?: number
  /** Optional delay (ms) before mounting after condition is met */
  delay?: number
  /** If true, unmount when out of view (default: false) */
  unmountOnExit?: boolean
  className?: string
}

export default function LazyMount({
  children,
  strategy = 'in-view',
  rootMargin = '200px',
  threshold = 0,
  delay = 0,
  unmountOnExit = false,
  className,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (strategy === 'idle') {
      const onIdle = () => {
        if (delay > 0) {
          timeoutId = setTimeout(() => setMounted(true), delay)
        } else {
          setMounted(true)
        }
      }

      if ('requestIdleCallback' in window) {
        ;(window as any).requestIdleCallback(onIdle)
      } else {
        // Fallback to timeout after first paint
        timeoutId = setTimeout(onIdle, Math.max(0, delay))
      }

      return () => {
        if (timeoutId) clearTimeout(timeoutId)
      }
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = setTimeout(() => setMounted(true), delay)
          } else {
            setMounted(true)
          }
          if (!unmountOnExit) io.disconnect()
        } else if (unmountOnExit) {
          setMounted(false)
        }
      },
      { root: null, rootMargin, threshold }
    )

    io.observe(el)

    return () => {
      io.disconnect()
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [strategy, rootMargin, threshold, delay, unmountOnExit])

  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  )
}
