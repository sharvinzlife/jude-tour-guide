'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TwemojiIcon } from '@/components/ui/TwemojiIcon'
import { TropicalCardBackground } from '@/components/effects/TropicalCardBackground'
import { tourPackages } from '@/lib/data/tours'
import { MapPin, Search, Clock, Users } from 'lucide-react'

export function DestinationSearch() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<{
    type: 'destination' | 'package' | 'tag'
    value: string
    meta?: string
  }>>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const router = useRouter()

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const searchTerm = query.toLowerCase()
    const newSuggestions: typeof suggestions = []

    // Get unique destinations
    const destinations = new Set<string>()
    tourPackages.forEach(pkg => {
      pkg.destinations.forEach(dest => {
        if (dest.toLowerCase().includes(searchTerm)) {
          destinations.add(dest)
        }
      })
    })

    // Add destination suggestions
    destinations.forEach(dest => {
      newSuggestions.push({
        type: 'destination',
        value: dest,
        meta: 'Destination'
      })
    })

    // Add package title suggestions
    tourPackages.forEach(pkg => {
      if (pkg.title.toLowerCase().includes(searchTerm)) {
        newSuggestions.push({
          type: 'package',
          value: pkg.title,
          meta: pkg.duration
        })
      }
    })

    // Add tag suggestions
    const tags = new Set<string>()
    tourPackages.forEach(pkg => {
      pkg.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchTerm)) {
          tags.add(tag)
        }
      })
    })

    tags.forEach(tag => {
      newSuggestions.push({
        type: 'tag',
        value: tag,
        meta: 'Category'
      })
    })

    // Limit to top 8 suggestions
    setSuggestions(newSuggestions.slice(0, 8))
    setShowSuggestions(newSuggestions.length > 0)
    setSelectedIndex(-1)
  }, [query])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : 0
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev > 0 ? prev - 1 : suggestions.length - 1
      )
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedIndex].value)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSuggestionClick = (value: string) => {
    setQuery(value)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    router.push(`/${locale}/packages?q=${encodeURIComponent(value)}`)
  }

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const q = query.trim()
    setShowSuggestions(false)
    router.push(`/${locale}/packages${q ? `?q=${encodeURIComponent(q)}` : ''}`)
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getIconForType = (type: string) => {
    switch (type) {
      case 'destination':
        return <MapPin className="w-4 h-4" />
      case 'package':
        return <Clock className="w-4 h-4" />
      case 'tag':
        return <Users className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  return (
    <section className="py-12 relative" style={{ zIndex: 100 }}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="relative bg-white/90 backdrop-blur-xl border border-emerald-200/40 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ overflow: 'visible', position: 'relative', zIndex: 100 }}
        >
          {/* Local tropical animated background for the card */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <TropicalCardBackground />
          </div>

          <form onSubmit={onSearch} className="relative p-8 md:p-10" style={{ zIndex: 50 }}>
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">
                Find your perfect Kerala experience
              </h2>
              <p className="text-gray-600 mt-1">Search destinations, tours, or keywords</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative" style={{ zIndex: 9999 }}>
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (suggestions.length > 0) {
                      setShowSuggestions(true)
                    }
                  }}
                  placeholder="Search destinations… (e.g., Kochi, Munnar, Alleppey)"
                  className="h-14 text-lg pl-4 pr-4 rounded-2xl border-emerald-200 focus-visible:ring-emerald-500/30"
                  autoComplete="off"
                />
                
                {/* Autocomplete Suggestions */}
                <AnimatePresence>
                  {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                      ref={suggestionsRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ 
                        duration: 0.25, 
                        type: "spring", 
                        bounce: 0.4,
                        stiffness: 300,
                        damping: 20
                      }}
                      className="absolute top-full mt-2 w-full"
                      style={{
                        zIndex: 999999,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.88) 100%)',
                        backdropFilter: 'blur(30px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(30px) saturate(200%)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '20px',
                        boxShadow: `
                          0 30px 60px -12px rgba(0, 0, 0, 0.25),
                          0 18px 36px -18px rgba(0, 0, 0, 0.3),
                          0 0 0 1px rgba(255, 255, 255, 0.9) inset,
                          0 0 120px rgba(16, 185, 129, 0.1)
                        `,
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `
                          0 35px 70px -15px rgba(0, 0, 0, 0.3),
                          0 20px 40px -20px rgba(0, 0, 0, 0.35),
                          0 0 0 1px rgba(255, 255, 255, 1) inset,
                          0 0 150px rgba(16, 185, 129, 0.15)
                        `;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `
                          0 30px 60px -12px rgba(0, 0, 0, 0.25),
                          0 18px 36px -18px rgba(0, 0, 0, 0.3),
                          0 0 0 1px rgba(255, 255, 255, 0.9) inset,
                          0 0 120px rgba(16, 185, 129, 0.1)
                        `;
                      }}
                    >
                      <div className="py-2">
                        {suggestions.map((suggestion, index) => (
                          <motion.button
                            key={`${suggestion.type}-${suggestion.value}`}
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ 
                              delay: index * 0.04, 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 25
                            }}
                            whileHover={{ 
                              x: 5,
                              transition: { duration: 0.2 }
                            }}
                            className={`relative w-full px-4 py-3.5 flex items-center justify-between transition-all text-left group ${
                              index === selectedIndex 
                                ? 'bg-gradient-to-r from-emerald-50/90 to-emerald-100/70' 
                                : 'hover:bg-gradient-to-r hover:from-white/60 hover:to-white/40'
                            }`}
                            style={{
                              backdropFilter: index === selectedIndex ? 'blur(10px)' : 'none'
                            }}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => handleSuggestionClick(suggestion.value)}
                            type="button"
                          >
                            <div className="flex items-center gap-3">
                              <motion.span 
                                className="text-emerald-600"
                                animate={index === selectedIndex ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, 0]
                                } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                {getIconForType(suggestion.type)}
                              </motion.span>
                              <div>
                                <p className="text-gray-900 font-medium group-hover:text-emerald-700 transition-colors">
                                  {suggestion.value}
                                </p>
                                {suggestion.meta && (
                                  <p className="text-xs text-gray-500 mt-0.5 group-hover:text-gray-600 transition-colors">
                                    {suggestion.meta}
                                  </p>
                                )}
                              </div>
                            </div>
                            {index === selectedIndex && (
                              <>
                                <motion.div
                                  className="absolute inset-0 pointer-events-none"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.1 }}
                                  style={{
                                    background: 'radial-gradient(circle at left, rgba(16, 185, 129, 0.1) 0%, transparent 70%)'
                                  }}
                                />
                                <motion.div
                                  layoutId="selected-indicator"
                                  className="w-1.5 h-10 rounded-full"
                                  style={{
                                    background: 'linear-gradient(180deg, #10b981 0%, #059669 50%, #10b981 100%)',
                                    boxShadow: '0 0 8px rgba(16, 185, 129, 0.5), 0 2px 4px rgba(16, 185, 129, 0.3)'
                                  }}
                                  initial={false}
                                  animate={{ 
                                    height: ["2rem", "2.5rem", "2rem"],
                                  }}
                                  transition={{ 
                                    type: "spring", 
                                    bounce: 0.4, 
                                    duration: 0.4,
                                    height: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                  }}
                                />
                              </>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t" style={{ 
                        borderTopColor: 'rgba(229, 231, 235, 0.3)',
                        background: 'rgba(249, 250, 251, 0.5)'
                      }}>
                        <p className="text-xs text-gray-600">
                          Press <kbd className="px-1.5 py-0.5 bg-white/80 backdrop-blur rounded border border-gray-200/50 text-gray-700 font-mono text-xs shadow-sm">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white/80 backdrop-blur rounded border border-gray-200/50 text-gray-700 font-mono text-xs shadow-sm">↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-white/80 backdrop-blur rounded border border-gray-200/50 text-gray-700 font-mono text-xs shadow-sm">Enter</kbd> to select
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
