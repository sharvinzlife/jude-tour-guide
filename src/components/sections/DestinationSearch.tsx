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
          {/* Scenic background removed: using universal AnimatedBackground */}

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
