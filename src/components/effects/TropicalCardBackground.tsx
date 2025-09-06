'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TwemojiIcon } from '@/components/ui/TwemojiIcon'

/**
 * TropicalCardBackground
 *
 * Lightweight, component-scoped animated background for cards.
 * Designed to sit inside a relatively positioned parent with overflow-hidden.
 * Elements: sun, birds, ocean waves, a small sail boat, and a palm tree with sand.
 */
export function TropicalCardBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="absolute inset-0 pointer-events-none select-none -z-0">
      {/* Sky gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-transparent to-emerald-50/50" />

      {/* Sand/beach extending from palm tree to right edge */}
      {/* Feathered beach using SVG gradient + gaussian blur for soft edges */}
      <motion.svg
        className="absolute top-8 right-0 w-full h-28"
        viewBox="0 0 500 120"
        preserveAspectRatio="none"
        initial={false}
        animate={{ opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(253, 230, 138, 0)" />
            <stop offset="20%" stopColor="rgba(253, 230, 138, 0.3)" />
            <stop offset="50%" stopColor="rgba(253, 230, 138, 0.7)" />
            <stop offset="80%" stopColor="rgba(253, 213, 90, 0.6)" />
            <stop offset="100%" stopColor="rgba(253, 224, 71, 0.4)" />
          </linearGradient>
          <filter id="feather" x="-15%" y="-35%" width="130%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
        {/* Beach strip extending from near palm to right edge */}
        <path d="M 150 70 Q 200 55, 280 60 T 400 65 L 500 65 L 500 120 L 150 120 Z" 
              fill="url(#sandGrad)" filter="url(#feather)" />
      </motion.svg>
      {/* Inner sand core with extended coverage */}
      <motion.div
        className="absolute top-14 right-0 w-72 h-20"
        style={{
          zIndex: 0,
          borderRadius: '40% 0 0 40%',
          background:
            'linear-gradient(90deg, rgba(253, 230, 138, 0) 0%, rgba(253, 230, 138, 0.4) 30%, rgba(253, 213, 90, 0.3) 70%, rgba(253, 224, 71, 0.2) 100%)',
          filter: 'blur(2px)'
        }}
        animate={{ y: [0, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Sun (top-left) */}
      <div className="absolute top-3 left-4 z-10">
        {/* Animated sun rays - outer glow */}
        <motion.div
          className="absolute -top-4 -left-4 w-20 h-20 md:w-24 md:h-24 rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(253, 230, 138, 0.3), rgba(252, 211, 77, 0.15), transparent)',
            filter: 'blur(3px)'
          }}
          animate={prefersReducedMotion ? undefined : { 
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Sun core */}
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full relative z-10"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, #FDE68A, #FCD34D, #F59E0B)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(251, 191, 36, 0.3)'
          }}
          animate={prefersReducedMotion ? undefined : { 
            scale: [1, 1.05, 1],
            filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)']
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Animated rotating sun rays */}
        <motion.svg
          className="absolute -top-5 -left-5 w-20 h-20 text-yellow-400/60"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          initial={false}
          animate={prefersReducedMotion ? undefined : { rotate: [0, 360] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <g stroke="currentColor" strokeLinecap="round">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.line 
                key={i} 
                x1="50" 
                y1="5" 
                x2="50" 
                y2="22" 
                transform={`rotate(${i * 30} 50 50)`}
                strokeWidth={i % 2 === 0 ? "3" : "2"}
                animate={prefersReducedMotion ? undefined : {
                  opacity: [0.4, 0.8, 0.4],
                  strokeWidth: i % 2 === 0 ? ["3", "4", "3"] : ["2", "2.5", "2"]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: i * 0.1
                }}
              />
            ))}
          </g>
        </motion.svg>
        
        {/* Secondary rotating rays for depth */}
        <motion.svg
          className="absolute -top-4 -left-4 w-18 h-18 text-orange-300/40"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          initial={false}
          animate={prefersReducedMotion ? undefined : { rotate: [360, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="50" y1="12" x2="50" y2="25" transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </g>
        </motion.svg>
      </div>

      {/* Realistic animated birds near the sun - in front */}
      <div className="absolute top-2 left-4 pointer-events-none z-20 w-full h-32 overflow-visible">
        {/* Bird 1 - Wide sweeping flight */}
        <motion.svg
          className="absolute w-10 h-8 text-gray-800/70"
          viewBox="0 0 30 20"
          initial={false}
          animate={prefersReducedMotion ? undefined : { 
            x: [0, 50, 25, 55, 0], 
            y: [0, -8, 3, -5, 0],
            rotate: [0, -5, 5, -3, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
        >
          <motion.g
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 0.95, 1]
            }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Bird body */}
            <ellipse cx="15" cy="12" rx="3.5" ry="2.5" fill="currentColor" opacity="0.9"/>
            {/* Beak */}
            <path d="M18 12 L19.5 12.2 L18 12.4 Z" fill="#F59E0B" opacity="0.8"/>
            {/* Wings with better definition */}
            <motion.path
              d="M12 12 Q 8 10 5 11 Q 8 12 12 12 M18 12 Q 22 10 25 11 Q 22 12 18 12"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.85"
              animate={prefersReducedMotion ? undefined : {
                d: [
                  "M12 12 Q 8 10 5 11 Q 8 12 12 12 M18 12 Q 22 10 25 11 Q 22 12 18 12",
                  "M12 12 Q 7 8 4 9 Q 8 11 12 12 M18 12 Q 23 8 26 9 Q 22 11 18 12",
                  "M12 12 Q 8 10 5 11 Q 8 12 12 12 M18 12 Q 22 10 25 11 Q 22 12 18 12"
                ]
              }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Tail */}
            <path d="M13 13 L11 14 L13 14 Z" fill="currentColor" opacity="0.6"/>
          </motion.g>
        </motion.svg>
        
        {/* Bird 2 - Figure-8 pattern */}
        <motion.svg
          className="absolute w-9 h-7 text-gray-700/60 left-12 top-0"
          viewBox="0 0 30 20"
          initial={false}
          animate={prefersReducedMotion ? undefined : { 
            x: [-5, 45, 20, -10, 35, -5], 
            y: [0, -4, 6, -3, 4, 0],
            rotate: [0, 3, -3, 2, -2, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' }}
        >
          <motion.g
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 0.92, 1],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'center' }}
          >
            <ellipse cx="15" cy="11" rx="3" ry="2" fill="currentColor" opacity="0.85"/>
            <path d="M17.5 11 L18.8 11.1 L17.5 11.3 Z" fill="#F59E0B" opacity="0.7"/>
            <motion.path
              d="M13 11 Q 9 9 6 10 Q 9 11 13 11 M17 11 Q 21 9 24 10 Q 21 11 17 11"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.4"
              opacity="0.8"
              animate={prefersReducedMotion ? undefined : {
                d: [
                  "M13 11 Q 9 9 6 10 Q 9 11 13 11 M17 11 Q 21 9 24 10 Q 21 11 17 11",
                  "M13 11 Q 8 7 5 8 Q 9 10 13 11 M17 11 Q 22 7 25 8 Q 21 10 17 11",
                  "M13 11 Q 9 9 6 10 Q 9 11 13 11 M17 11 Q 21 9 24 10 Q 21 11 17 11"
                ]
              }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
          </motion.g>
        </motion.svg>
        
        {/* Bird 3 - Lazy circular glide */}
        <motion.svg
          className="absolute w-8 h-6 text-gray-600/55 left-6 top-9"
          viewBox="0 0 25 15"
          initial={false}
          animate={prefersReducedMotion ? undefined : { 
            x: [0, 40, 60, 45, 15, 0], 
            y: [0, 4, -3, 5, -2, 0],
            rotate: [0, -2, 4, -3, 1, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ filter: 'drop-shadow(0 0.5px 1px rgba(0,0,0,0.12))' }}
        >
          <motion.g
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="12" cy="8" rx="2.5" ry="1.8" fill="currentColor" opacity="0.8"/>
            <path d="M14 8 L15 8.1 L14 8.2 Z" fill="#F59E0B" opacity="0.6"/>
            <motion.path
              d="M10 8 Q 7 6 4 7 Q 7 8 10 8 M14 8 Q 17 6 20 7 Q 17 8 14 8"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.3"
              opacity="0.75"
              animate={prefersReducedMotion ? undefined : {
                d: [
                  "M10 8 Q 7 6 4 7 Q 7 8 10 8 M14 8 Q 17 6 20 7 Q 17 8 14 8",
                  "M10 8 Q 6 5 3 6 Q 7 7 10 8 M14 8 Q 18 5 21 6 Q 17 7 14 8",
                  "M10 8 Q 7 6 4 7 Q 7 8 10 8 M14 8 Q 17 6 20 7 Q 17 8 14 8"
                ]
              }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            />
          </motion.g>
        </motion.svg>
      </div>

      {/* Birds (flocking across the top) */}
      <div className="absolute top-6 left-0 right-0 h-12">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 40 20"
            className="absolute h-4 w-8 text-gray-500/60"
            style={{ top: `${(i % 3) * 8}px`, left: `${-10 - i * 12}%` }}
            initial={false}
            animate={
              prefersReducedMotion
                ? undefined
                : { x: ['0%', '140%'] }
            }
            transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
          >
            <motion.g
              transform="translate(20 10)"
              animate={prefersReducedMotion ? undefined : { rotate: [-8, 8, -8] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            >
              {/* stylized gull shape */}
              <path d="M-12 0 L0 -4 L12 0" />
              <path d="M-12 0 L0 4 L12 0" opacity="0.6" />
            </motion.g>
          </motion.svg>
        ))}
      </div>

      {/* Base water wash with lighter ocean colors */}
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-cyan-100/70 via-cyan-200/80 to-cyan-300/90 z-0" />
      {/* Ocean waves with enhanced wavy animation */}
      <motion.svg
        className="absolute bottom-0 left-0 w-[220%] h-[60%] text-cyan-400/50 z-10"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['0%', '-25%'], y: [0, -4, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <motion.path 
          d="M0,200 C150,180 300,220 450,200 C600,180 750,220 900,200 C1050,180 1200,220 1350,200 L1350,300 L0,300 Z" 
          fill="currentColor"
          animate={prefersReducedMotion ? undefined : { 
            d: [
              "M0,200 C150,180 300,220 450,200 C600,180 750,220 900,200 C1050,180 1200,220 1350,200 L1350,300 L0,300 Z",
              "M0,185 C150,215 300,185 450,215 C600,185 750,215 900,185 C1050,215 1200,185 1350,215 L1350,300 L0,300 Z",
              "M0,210 C150,175 300,210 450,175 C600,210 750,175 900,210 C1050,175 1200,210 1350,175 L1350,300 L0,300 Z",
              "M0,200 C150,180 300,220 450,200 C600,180 750,220 900,200 C1050,180 1200,220 1350,200 L1350,300 L0,300 Z"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.svg
        className="absolute bottom-0 left-0 w-[240%] h-[58%] text-teal-400/40 z-10"
        viewBox="0 0 1200 280"
        preserveAspectRatio="none"
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['-10%', '-35%'], y: [0, -5, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
      >
        <motion.path 
          d="M0,190 C180,170 360,210 540,190 C720,170 900,210 1080,190 C1260,170 1440,210 1620,190 L1620,280 L0,280 Z" 
          fill="currentColor"
          animate={prefersReducedMotion ? undefined : { 
            d: [
              "M0,190 C180,170 360,210 540,190 C720,170 900,210 1080,190 C1260,170 1440,210 1620,190 L1620,280 L0,280 Z",
              "M0,175 C180,205 360,175 540,205 C720,175 900,205 1080,175 C1260,205 1440,175 1620,205 L1620,280 L0,280 Z",
              "M0,195 C180,165 360,195 540,165 C720,195 900,165 1080,195 C1260,165 1440,195 1620,165 L1620,280 L0,280 Z",
              "M0,190 C180,170 360,210 540,190 C720,170 900,210 1080,190 C1260,170 1440,210 1620,190 L1620,280 L0,280 Z"
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      <motion.svg
        className="absolute bottom-2 left-0 w-[260%] h-[52%] text-cyan-300/30 z-10"
        viewBox="0 0 1200 260"
        preserveAspectRatio="none"
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['-20%', '-50%'], y: [0, -3, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
      >
        <motion.path 
          d="M0,170 C200,160 400,190 600,170 C800,160 1000,190 1200,170 L1200,260 L0,260 Z" 
          fill="currentColor"
          animate={prefersReducedMotion ? undefined : { 
            d: [
              "M0,170 C200,160 400,190 600,170 C800,160 1000,190 1200,170 L1200,260 L0,260 Z",
              "M0,160 C200,190 400,160 600,190 C800,160 1000,190 1200,160 L1200,260 L0,260 Z",
              "M0,175 C200,155 400,175 600,155 C800,175 1000,155 1200,175 L1200,260 L0,260 Z",
              "M0,170 C200,160 400,190 600,170 C800,160 1000,190 1200,170 L1200,260 L0,260 Z"
            ]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      {/* Extra far wave layer for depth */}
      <motion.svg
        className="absolute bottom-4 left-0 w-[280%] h-[46%] text-cyan-200/25 z-10"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        initial={false}
        animate={prefersReducedMotion ? undefined : { x: ['-30%', '-60%'], y: [0, -1, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: 'linear' }}
      >
        <motion.path 
          d="M0,150 C220,140 440,170 660,150 C880,140 1100,170 1320,150 L1320,240 L0,240 Z" 
          fill="currentColor"
          animate={prefersReducedMotion ? undefined : { 
            d: [
              "M0,150 C220,140 440,170 660,150 C880,140 1100,170 1320,150 L1320,240 L0,240 Z",
              "M0,145 C220,165 440,145 660,165 C880,145 1100,165 1320,145 L1320,240 L0,240 Z",
              "M0,150 C220,140 440,170 660,150 C880,140 1100,170 1320,150 L1320,240 L0,240 Z"
            ]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      {/* Foam crest highlight */}
      <motion.div className="absolute left-0 right-0 bottom-[52%] h-1 bg-white/40 blur-[1px] z-20" animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Bottom fade cover with lighter ocean colors */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-[25] pointer-events-none bg-gradient-to-t from-cyan-400/80 via-cyan-300/60 to-transparent" />

      {/* Palm tree (top-right, above sand) */}
      <motion.div
        className="absolute top-6 right-20 opacity-90 drop-shadow-sm"
        style={{ originY: '100%', originX: '50%', zIndex: 40 }}
        animate={prefersReducedMotion ? undefined : { rotate: [-3, 2, -3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <TwemojiIcon code="1f334" alt="palm tree" size={56} />
      </motion.div>

      {/* Animated sailing boat on the ocean with smooth fade */}
      <motion.div
        className="absolute left-[-15%] bottom-[32%] z-[30]"
        animate={prefersReducedMotion ? undefined : { 
          x: ['0%', '130%'],
          opacity: [0, 1, 1, 1, 1, 1, 0.8, 0]
        }}
        transition={{ 
          x: { duration: 35, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 35, repeat: Infinity, ease: 'easeInOut', times: [0, 0.05, 0.15, 0.85, 0.9, 0.93, 0.97, 1] }
        }}
      >
        <motion.div
          className="relative drop-shadow-lg"
          animate={prefersReducedMotion ? undefined : { 
            y: [0, -6, 0, -4, 0], 
            rotate: [-2, 3, -1, 2, -2] 
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Hull with gradient */}
          <div
            className="w-24 h-6"
            style={{ 
              clipPath: 'polygon(5% 0, 95% 0, 88% 100%, 12% 100%)', 
              background: 'linear-gradient(180deg, #92400e 0%, #78350f 100%)',
              boxShadow: '0 3px 8px rgba(0,0,0,0.2)' 
            }}
          />
          {/* Deck details */}
          <div className="absolute top-0 left-[20%] right-[20%] h-1 bg-amber-700/60" />
          
          {/* Mast */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-[2px] h-14 bg-stone-800" />
          
          {/* Main sail with animation */}
          <motion.div
            className="absolute -top-14 left-1/2"
            animate={prefersReducedMotion ? undefined : { 
              skewX: [-1, 1, -1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              transform: 'translateX(-2px)',
              width: '0',
              height: '0',
              borderLeft: '32px solid transparent',
              borderRight: '0 solid transparent',
              borderBottom: '48px solid rgba(255,255,255,0.98)',
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))'
            }}
          />
          
          {/* Small flag at top */}
          <motion.div
            className="absolute -top-14 left-1/2 -translate-x-1/2"
            animate={prefersReducedMotion ? undefined : { 
              rotate: [0, 8, 0, -5, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div 
              className="w-3 h-2 bg-red-500"
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)',
                marginLeft: '2px'
              }}
            />
          </motion.div>
          
          {/* Wake effect */}
          <motion.div
            className="absolute -bottom-1 left-0 w-full"
            animate={prefersReducedMotion ? undefined : { 
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 100 10" className="w-full h-2">
              <path 
                d="M0,5 Q25,2 50,5 T100,5" 
                stroke="rgba(255,255,255,0.6)" 
                strokeWidth="2" 
                fill="none"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Second boat for variety (smaller, different timing) */}
      <motion.div
        className="absolute right-[-10%] bottom-[38%] z-[28]"
        animate={prefersReducedMotion ? undefined : { 
          x: ['0%', '-140%'],
          opacity: [0, 1, 1, 1, 1, 1, 0.7, 0]
        }}
        transition={{ 
          x: { duration: 42, repeat: Infinity, ease: 'linear', delay: 15 },
          opacity: { duration: 42, repeat: Infinity, ease: 'easeInOut', delay: 15, times: [0, 0.04, 0.12, 0.88, 0.92, 0.95, 0.98, 1] }
        }}
      >
        <motion.div
          className="relative drop-shadow-md scale-75"
          animate={prefersReducedMotion ? undefined : { 
            y: [0, -4, 0, -2, 0], 
            rotate: [1, -2, 1, -1, 1] 
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Smaller sailboat */}
          <div
            className="w-20 h-5 bg-amber-700"
            style={{ 
              clipPath: 'polygon(8% 0, 92% 0, 85% 100%, 15% 100%)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)' 
            }}
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[2px] h-10 bg-stone-700/80" />
          <motion.div
            className="absolute -top-10 left-1/2"
            animate={prefersReducedMotion ? undefined : { 
              skewX: [-0.5, 0.5, -0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              transform: 'translateX(-2px)',
              width: '0',
              height: '0',
              borderLeft: '22px solid transparent',
              borderRight: '0 solid transparent',
              borderBottom: '36px solid rgba(255,255,255,0.95)'
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
