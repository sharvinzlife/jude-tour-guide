'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
          {/* Kerala emoji ambience */}
          <motion.div
            className="absolute -top-4 -left-4 text-5xl select-none"
            animate={{ y: [0, -6, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌴
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-2 text-5xl select-none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌊
          </motion.div>
          <motion.div
            className="absolute top-1/2 -right-3 text-4xl select-none"
            animate={{ x: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            🛶
          </motion.div>

          <form onSubmit={onSearch} className="p-8 md:p-10">
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
