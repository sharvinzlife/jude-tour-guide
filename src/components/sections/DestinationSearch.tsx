'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TwemojiIcon } from '@/components/ui/TwemojiIcon'

export function DestinationSearch() {
  const [query, setQuery] = useState('')
  const locale = useLocale()
  const router = useRouter()

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    router.push(`/${locale}/packages${q ? `?q=${encodeURIComponent(q)}` : ''}`)
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl border border-emerald-200/40 rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Scenic sky + ocean background (matches Packages header styling) */}
          <div className="pointer-events-none absolute inset-0 z-0" style={{ transformStyle: 'preserve-3d' }}>
            {/* Sky gradient */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-sky-100/90 via-sky-50/70 to-transparent"
              style={{ transform: 'translateZ(-40px) scale(1.04)' }}
            />

            {/* Sun */}
            <motion.div
              className="absolute top-3 left-4 w-16 h-16 rounded-full blur-[0.5px]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(253, 230, 138, 0.95), rgba(252, 211, 77, 0.6), rgba(252, 211, 77, 0))',
                boxShadow: '0 0 16px rgba(252, 211, 77, 0.25)'
              }}
              animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0], scale: [1, 1.01, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Rotating sun rays */}
            <motion.svg
              className="absolute top-1 left-1 w-20 h-20 text-yellow-300/30"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: 'translateZ(-35px) scale(1.02)' }}
              initial={false}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1="50" y1="8" x2="50" y2="18" transform={`rotate(${i * 30} 50 50)`} />
                ))}
              </g>
            </motion.svg>

            {/* Birds near the sun */}
            <motion.svg
              className="absolute top-4 left-16 w-[160px] h-[60px] text-gray-700/85"
              viewBox="0 0 220 90"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: 'translateZ(-35px) scale(1.02)' }}
              initial={false}
              animate={{ x: [0, 8, 0], y: [0, -3, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g>
                <path d="M15 40 q12 -12 24 0" stroke="currentColor" strokeWidth="2.1" fill="none" strokeLinecap="round" />
                <path d="M45 38 q10 -10 20 0" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" />
                <path d="M70 35 q9 -9 18 0" stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                <path d="M95 30 q11 -11 22 0" stroke="currentColor" strokeWidth="1.9" fill="none" strokeLinecap="round" />
              </g>
            </motion.svg>

            {/* Coconut tree (subtle sway) */}
            <motion.div
              className="absolute top-0 right-3 pointer-events-none select-none drop-shadow-sm"
              style={{ transform: 'translateZ(-20px)', transformOrigin: 'bottom center' }}
              animate={{ rotate: [-2, 1.5, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TwemojiIcon code="1f334" alt="coconut tree" size={54} />
            </motion.div>

            {/* Ocean waves at bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28">
              {/* Sand beach on right half */}
              <svg
                className="absolute bottom-12 right-0 w-1/2 md:w-[50%] h-20"
                viewBox="0 0 220 100"
                preserveAspectRatio="none"
                style={{
                  WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                  maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
                }}
              >
                <defs>
                  <linearGradient id="homeSandGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fde68a" />
                    <stop offset="100%" stopColor="#f5deb3" />
                  </linearGradient>
                </defs>
                <path d="M220 32 C188 14 150 10 104 16 C74 22 38 30 0 38 L0 84 L220 84 Z" fill="url(#homeSandGrad)" />
              </svg>

              {/* Feathered shoreline + foam */}
              <motion.svg
                className="absolute bottom-[62px] right-0 w-1/2 md:w-[50%] h-10"
                viewBox="0 0 220 40"
                preserveAspectRatio="none"
                initial={false}
                animate={{ x: [0, 5, 0], opacity: [0.95, 1, 0.95] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <defs>
                  <filter id="homeFoamBlur" x="-20%" y="-50%" width="140%" height="200%">
                    <feGaussianBlur stdDeviation="1.1" />
                  </filter>
                  <linearGradient id="homeWaterFeather" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(125,211,252,0.28)" />
                    <stop offset="100%" stopColor="rgba(125,211,252,0)" />
                  </linearGradient>
                </defs>
                <path d="M220 6 C188 -4 150 -6 104 -2 C74 4 38 12 0 20 L0 40 L220 40 Z" fill="url(#homeWaterFeather)" />
                <g filter="url(#homeFoamBlur)">
                  <path d="M220 6 C188 -4 150 -6 104 -2 C74 4 38 12 0 20" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.9" />
                </g>
              </motion.svg>

              {/* Waves */}
              <motion.svg
                className="absolute bottom-0 w-[200%] text-emerald-300/30"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                initial={false}
                animate={{ x: ['0%', '-50%'], y: [0, 1.2, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <path d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,80 L0,80 Z" fill="currentColor" />
              </motion.svg>
              <motion.svg
                className="absolute bottom-0 w-[200%] text-cyan-400/25"
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                initial={false}
                animate={{ x: ['0%', '-50%'], y: [0, 1.9, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 0.3 }}
              >
                <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
              </motion.svg>

              {/* Boat */}
              <motion.svg
                className="absolute bottom-8 left-1/2 -translate-x-1/2 transform h-8 w-16 text-amber-700"
                viewBox="0 0 120 60"
                preserveAspectRatio="xMidYMid meet"
                initial={{ x: 0, y: 0 }}
                animate={{ x: [-8, 8, -8], y: [0, -1.6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <g>
                  <path d="M10 40 C25 50 95 50 110 40 L100 48 C70 55 40 55 20 48 Z" fill="#8b5a3c" />
                  <rect x="55" y="15" width="3" height="25" fill="#6b7280" />
                  <path d="M58 16 L90 32 L58 32 Z" fill="#f3f4f6" />
                  <path d="M58 16 L30 30 L58 30 Z" fill="#e5e7eb" />
                </g>
              </motion.svg>
            </div>
          </div>

          <form onSubmit={onSearch} className="relative z-10 p-8 md:p-10">
            <div className="text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-emerald-700">
                Find your perfect Kerala experience
              </h3>
              <p className="text-gray-600 mt-1">Search destinations, tours, or keywords</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search destinations… (e.g., Kochi, Munnar, Alleppey)"
                  className="h-14 text-lg pl-4 pr-4 rounded-2xl border-emerald-200 focus-visible:ring-emerald-500/30"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button
                  size="xl" asChild={false}
                  onClick={() => onSearch()}
                  className="h-14 px-10 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl"
                >
                  🔎 Search Packages
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
