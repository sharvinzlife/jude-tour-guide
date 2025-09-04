'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { TwemojiIcon } from '@/components/ui/TwemojiIcon'
import React from 'react'

/**
 * AnimatedBackground
 *
 * A subtle, site-wide animated background rendered behind all content.
 * - Respects prefers-reduced-motion
 * - Fixed positioning with pointer-events-none and negative z-index
 * - Light Kerala-inspired visuals: soft sky gradient, sun + rays, sparse clouds,
 *   and a few floating coconut trees.
 */
export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Soft vertical gradient wash to enrich the base body gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50/55 via-transparent to-emerald-50/40" />

      {/* Sun with very subtle rays (top-left) */}
      <div className="absolute top-6 left-6">
        <motion.div
          className="w-16 h-16 rounded-full blur-[0.5px] opacity-90"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(253, 230, 138, 0.9), rgba(252, 211, 77, 0.5), rgba(252, 211, 77, 0))',
            boxShadow: '0 0 16px rgba(252, 211, 77, 0.25)'
          }}
          animate={prefersReducedMotion ? undefined : { x: [0, 1.2, 0], y: [0, -1.2, 0], scale: [1, 1.006, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.svg
          className="absolute -top-2 -left-2 w-20 h-20 text-yellow-300/25"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: 'blur(0.2px)' }}
          initial={false}
          animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="50" y1="8" x2="50" y2="18" transform={`rotate(${i * 30} 50 50)`} />
            ))}
          </g>
        </motion.svg>
      </div>

      {/* Sparse parallax cloud bands near top */}
      <motion.svg
        className="absolute top-10 left-0 w-[180%] text-white/70"
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        style={{ transform: 'translateZ(0)' }}
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['0%', '-35%'] }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M60,80 C80,60 110,60 130,75 C145,55 175,55 190,75 C210,60 245,60 265,78 C290,60 330,60 355,78 C380,60 420,62 445,80 C470,68 510,70 540,82 L540,120 L0,120 L0,90 C20,84 40,84 60,80 Z" fill="currentColor" />
      </motion.svg>
      <motion.svg
        className="absolute top-14 left-0 w-[200%] text-white/55"
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        style={{ transform: 'translateZ(0)' }}
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['0%', '-45%'] }}
        transition={{ duration: 62, repeat: Infinity, ease: 'linear', delay: 0.8 }}
      >
        <path d="M40,85 C70,70 120,72 150,88 C175,72 215,74 240,90 C270,74 320,76 350,90 C380,76 430,78 460,90 C490,80 530,82 560,92 L560,120 L0,120 L0,95 C15,92 25,90 40,85 Z" fill="currentColor" />
      </motion.svg>

      {/* A few floating coconut trees at wide positions */}
      <AnimatedTree size={88} opacity={0.05} className="top-[18%] left-[8%]" delay={0.4} />
      <AnimatedTree size={96} opacity={0.06} className="bottom-[22%] right-[10%]" delay={1.2} />
      <AnimatedTree size={74} opacity={0.05} className="top-[58%] right-[22%]" delay={2.1} />
      <AnimatedTree size={80} opacity={0.05} className="bottom-[30%] left-[26%]" delay={0.9} />
    </div>
  )
}

function AnimatedTree({ size, opacity, className, delay = 0 }: { size: number; opacity: number; className?: string; delay?: number }) {
  const prefersReducedMotion = useReducedMotion()
  return (
    <motion.div
      className={`absolute pointer-events-none select-none drop-shadow-sm ${className ?? ''}`}
      style={{ opacity }}
      animate={prefersReducedMotion ? undefined : { rotate: [-4, 2, -4] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <TwemojiIcon code="1f334" alt="coconut tree" size={size} />
    </motion.div>
  )
}

