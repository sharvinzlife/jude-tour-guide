'use client'

import { useState, useMemo, Suspense } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { PackageCard } from '@/components/packages/PackageCard'
import type { TourPackage } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { 
  tourPackages, 
  getAllCategories, 
  getPackagesByCategory, 
  getFeaturedPackages,
  sortPackages,
  filterPackagesByPrice,
  searchPackages,
} from '@/lib/data/tours'
// TODO: Gradually migrate to translation system
import { 
  MapPin, 
  Star, 
  Award,
  Search,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  X,
  ArrowRight,
  Percent,
  Shield,
  CheckCircle2
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { TwemojiIcon } from '@/components/ui/TwemojiIcon'

function PackagesPageContent() {
  const t = useTranslations('packages')
  const locale = useLocale()
  
  // Get translated packages alongside existing hardcoded ones
  const translatedPackagesRaw = t.raw('packageItems') as Array<{
    id: string
    title: string
    description: string
    duration: string
    category: string
    destinations: string[]
    highlights: string[]
  }>
  
  // Convert translated packages to match existing format for now
  const translatedPackages: TourPackage[] = translatedPackagesRaw.map(pkg => ({
    ...pkg,
    price: pkg.id === '1' ? 35000 : 25000,
    originalPrice: pkg.id === '1' ? 42000 : 30000,
    maxPeople: 8,
    rating: 4.9,
    reviewCount: 150,
    featured: true,
    difficulty: 'Easy' as const,
    tags: ['Best Seller', 'Popular'],
    image: `/media/portifolio/Portifolio-${pkg.id}.jpeg`,
    images: [
      `/media/portifolio/Portifolio-${pkg.id}.jpeg`,
      '/media/portifolio/Portifolio-2.jpeg'
    ],
    // Add required TourPackage fields
    itinerary: [
      {
        day: 1,
        title: 'Arrival Day',
        description: 'Welcome and introduction',
        activities: ['Check-in', 'Welcome briefing'],
        meals: ['Dinner'],
        highlights: ['Welcome ceremony']
      }
    ],
    inclusions: ['Accommodation', 'Meals', 'Transportation', 'Guide services'],
    exclusions: ['Personal expenses', 'Travel insurance'],
    bestTimeToVisit: ['October to March']
  }))
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All')
  const searchParams = useSearchParams()
  const initialQuery = searchParams?.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000])
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const packagesPerPage = 12

  const categories = getAllCategories()
  const featuredPackages = getFeaturedPackages()
  
  // Combine translated packages with existing hardcoded ones (dedup by id; prefer translated content)
  const allPackages: TourPackage[] = useMemo(() => {
    const map = new Map<string, TourPackage>()
    // Seed with hardcoded packages
    tourPackages.forEach((p) => map.set(p.id, p))
    // Override/add with translated versions
    translatedPackages.forEach((p) => map.set(p.id, p))
    return Array.from(map.values())
  }, [translatedPackages])

  // String normalizer for robust destination matching (handles case, spaces, diacritics)
  const normalize = (s: string) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')

  // Apply all filters
  const filteredPackages = useMemo(() => {
    let packages: TourPackage[] = allPackages
    
    if (selectedCategory !== 'All') {
      // Filter by category for all packages
      packages = packages.filter(pkg => 
        pkg.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        selectedCategory === 'All'
      )
    }
    
    if (searchQuery) {
      // Simple search for both translated and hardcoded packages
      packages = packages.filter(pkg =>
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.destinations?.some(dest => 
          dest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
    
    packages = filterPackagesByPrice(packages, priceRange[0], priceRange[1])
    
    if (selectedDestinations.length > 0) {
      const selectedNorm = selectedDestinations.map(normalize)
      packages = packages.filter(pkg =>
        (pkg.destinations || []).some(dest => {
          const d = normalize(dest)
          return selectedNorm.some(sn => d.includes(sn))
        })
      )
    }
    
    if (selectedDifficulty.length > 0) {
      packages = packages.filter(pkg => 
        pkg.difficulty && selectedDifficulty.includes(pkg.difficulty)
      )
    }
    
    return sortPackages(packages, sortBy)
  }, [allPackages, selectedCategory, searchQuery, priceRange, selectedDestinations, selectedDifficulty, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage)
  const currentPackages = filteredPackages.slice(
    (currentPage - 1) * packagesPerPage,
    currentPage * packagesPerPage
  )

  const stats = {
    totalPackages: allPackages.length,
    categories: categories.length - 1,
    destinations: new Set(allPackages.flatMap(pkg => pkg.destinations || [])).size,
    avgRating: (allPackages.reduce((sum, pkg) => sum + (pkg.rating || 4.9), 0) / allPackages.length).toFixed(1)
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setPriceRange([0, 60000])
    setSelectedDestinations([])
    setSelectedDifficulty([])
    setSortBy('featured')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Compact Hero Section */}
      <section className="relative py-10 px-4 overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto text-center relative z-10"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-6 py-2 rounded-full mb-6"
            >
              <Award className="w-4 h-4 text-white" />
              <span className="text-white font-medium">{t('hero.badge')}</span>
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
              {t('hero.title')}
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('hero.description', { count: stats.totalPackages, destinations: stats.destinations })}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{t('hero.trustIndicators.safe')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">{t('hero.trustIndicators.bestPrices')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{t('hero.trustIndicators.rating', { rating: stats.avgRating })}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4">
        {/* Filters Bar - Compact */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-40 bg-white/95 backdrop-blur-xl border border-gray-200/60 -mt-8 rounded-2xl shadow-md overflow-hidden"
          style={{ perspective: 800 }}
        >
          <div className="py-6 px-3 sm:px-4 relative z-10">
            {/* Top Filter Row */}
            <div className="space-y-4 mb-4">
              {/* Search Centered */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex items-center"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-5 h-5" />
                  <Input
                    placeholder={t('filters.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-[92vw] max-w-2xl md:max-w-3xl h-12 text-base rounded-2xl border-emerald-100 focus:border-emerald-500 bg-white/85 backdrop-blur"
                  />
                  <Button
                    onClick={() => setCurrentPage(1)}
                    className="ml-3 h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base"
                  >
                    <Search className="w-5 h-5 mr-2" /> Search
                  </Button>
                </motion.div>
              </div>

              {/* Secondary controls */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Category */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 sm:w-48 h-10 text-sm border-gray-200 rounded-xl focus:border-emerald-500 bg-white/70 backdrop-blur">
                    <SelectValue placeholder={t('filters.allCategories')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl z-50">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="hover:bg-emerald-50 cursor-pointer">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 sm:w-40 h-10 text-sm border-gray-200 rounded-xl focus:border-emerald-500 bg-white/70 backdrop-blur">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl z-50">
                    <SelectItem value="featured">{t('filters.sortBy.featured')}</SelectItem>
                    <SelectItem value="price-low">{t('filters.sortBy.priceLow')}</SelectItem>
                    <SelectItem value="price-high">{t('filters.sortBy.priceHigh')}</SelectItem>
                    <SelectItem value="rating">{t('filters.sortBy.rating')}</SelectItem>
                    <SelectItem value="duration">{t('filters.sortBy.duration')}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Layout */}
                <div className="flex items-center gap-1 bg-white/70 backdrop-blur rounded-xl border border-gray-200 p-1 h-10">
                  <Button
                    size="sm"
                    variant={layout === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setLayout('grid')}
                    className={`p-2 ${layout === 'grid' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={layout === 'list' ? 'default' : 'ghost'}
                    onClick={() => setLayout('list')}
                    className={`p-2 ${layout === 'list' ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters Toggle */}
            <div className="flex md:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-200 hover:bg-gray-50 rounded-xl h-10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between min-w-0">
              <p className="text-sm text-gray-600 truncate">
                {filteredPackages.length} packages found
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
              {(selectedCategory !== 'All' || searchQuery || selectedDestinations.length > 0 || selectedDifficulty.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200 pt-4 mt-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </label>
                      <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                        min={0}
                        max={60000}
                        step={5000}
                        className="w-full"
                      />
                    </div>

                    {/* Destinations */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Destinations
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Kochi', 'Munnar', 'Alleppey', 'Thekkady', 'Kumarakom'].map((dest) => (
                          <Badge
                            key={dest}
                            variant={selectedDestinations.includes(dest) ? 'default' : 'outline'}
                            className={`cursor-pointer transition-colors ${
                              selectedDestinations.includes(dest) 
                                ? 'bg-emerald-600 text-white' 
                                : 'hover:bg-emerald-50'
                            }`}
                            onClick={() => {
                              setSelectedDestinations(prev => 
                                prev.includes(dest) 
                                  ? prev.filter(d => d !== dest)
                                  : [...prev, dest]
                              )
                            }}
                          >
                            {dest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-3 block">
                        Difficulty
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Easy', 'Moderate', 'Challenging'].map((diff) => (
                          <Badge
                            key={diff}
                            variant={selectedDifficulty.includes(diff) ? 'default' : 'outline'}
                            className={`cursor-pointer transition-colors ${
                              selectedDifficulty.includes(diff) 
                                ? 'bg-emerald-600 text-white' 
                                : 'hover:bg-emerald-50'
                            }`}
                            onClick={() => {
                              setSelectedDifficulty(prev => 
                                prev.includes(diff) 
                                  ? prev.filter(d => d !== diff)
                                  : [...prev, diff]
                              )
                            }}
                          >
                            {diff}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sky and Land background layers */}
          <div className="pointer-events-none absolute inset-0 z-0" style={{ transformStyle: 'preserve-3d' }}>
            {/* Sky gradient */}
            <div
              className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-sky-100/90 via-sky-50/70 to-transparent"
              style={{ transform: 'translateZ(-60px) scale(1.06)' }}
            />

            {/* Sun */}
            <motion.div
              className="absolute top-3 left-6 w-20 h-20 rounded-full blur-[0.5px]"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(253, 230, 138, 0.95), rgba(252, 211, 77, 0.6), rgba(252, 211, 77, 0))',
                boxShadow: '0 0 20px rgba(252, 211, 77, 0.25)'
              }}
              animate={{ x: [0, 2, 0], y: [0, -2, 0], scale: [1, 1.01, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(253, 230, 138, 0.95), rgba(252, 211, 77, 0.6), rgba(252, 211, 77, 0))',
                boxShadow: '0 0 20px rgba(252, 211, 77, 0.25)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
              }}
            />

            {/* Sun rays (subtle rotating ring) */}
            <motion.svg
              className="absolute top-1 left-3 w-24 h-24 text-yellow-300/30"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: 'translateZ(-55px) scale(1.02)' }}
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

            {/* Clouds */}
            <motion.svg
              className="absolute top-6 left-0 w-[180%] text-white/80"
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
              style={{ transform: 'translateZ(-40px) scale(1.04)' }}
              initial={false}
              animate={{ x: ['0%', '-40%'] }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M60,80 C80,60 110,60 130,75 C145,55 175,55 190,75 C210,60 245,60 265,78 C290,60 330,60 355,78 C380,60 420,62 445,80 C470,68 510,70 540,82 L540,120 L0,120 L0,90 C20,84 40,84 60,80 Z" fill="currentColor" />
            </motion.svg>
            <motion.svg
              className="absolute top-10 left-0 w-[200%] text-white/60"
              viewBox="0 0 600 120"
              preserveAspectRatio="none"
              style={{ transform: 'translateZ(-50px) scale(1.05)' }}
              initial={false}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            >
              <path d="M40,85 C70,70 120,72 150,88 C175,72 215,74 240,90 C270,74 320,76 350,90 C380,76 430,78 460,90 C490,80 530,82 560,92 L560,120 L0,120 L0,95 C15,92 25,90 40,85 Z" fill="currentColor" />
            </motion.svg>

            {/* Birds near sun - silhouette flock with soft shadow */}
            <motion.svg
              className="absolute top-2 left-12 w-[200px] h-[80px] text-gray-700/85"
              viewBox="0 0 220 90"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: 'translateZ(-45px) scale(1.04)' }}
              initial={false}
              animate={{ x: [0, 12, 0], y: [0, -4, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
              <defs>
                <filter id="birdShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>
              {/* shadow layer */}
              <g filter="url(#birdShadow)" opacity="0.28" transform="translate(0,6)">
                <path d="M15 40 q12 -12 24 0" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M45 38 q10 -10 20 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M70 35 q9 -9 18 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M95 30 q11 -11 22 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M125 36 q10 -10 20 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M150 34 q9 -9 18 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M175 38 q8 -8 16 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>
              {/* main flock */}
              <g>
                <path d="M15 40 q12 -12 24 0" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
                <path d="M45 38 q10 -10 20 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M70 35 q9 -9 18 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M95 30 q11 -11 22 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M125 36 q10 -10 20 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M150 34 q9 -9 18 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M175 38 q8 -8 16 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </g>
            </motion.svg>

            {/* Migrating birds crossing the sky */}
            <motion.svg
              className="absolute top-6 right-[-20%] w-[220px] h-[90px] text-gray-700/90"
              viewBox="0 0 220 90"
              preserveAspectRatio="xMidYMid meet"
              style={{ transform: 'translateZ(-35px) scale(1.02)' }}
              initial={{ x: '120%' }}
              animate={{ x: ['120%', '-40%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 2 }}
            >
              <g>
                <path d="M15 40 q12 -12 24 0" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M45 38 q10 -10 20 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M70 35 q9 -9 18 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M95 30 q11 -11 22 0" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M125 36 q10 -10 20 0" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M150 34 q9 -9 18 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <path d="M175 38 q8 -8 16 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </g>
            </motion.svg>

            {/* Distant hills / land */}
            <motion.svg
              className="absolute inset-x-0 bottom-12 w-[200%] text-emerald-700/10"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ transform: 'translateZ(-20px) scale(1.02)' }}
              initial={false}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M0,90 C120,70 200,80 280,88 C360,96 420,60 520,78 C620,96 680,66 780,82 C880,98 980,76 1080,86 C1140,92 1180,96 1200,98 L1200,120 L0,120 Z" fill="currentColor" />
            </motion.svg>

            {/* Near land strip */}
            <motion.svg
              className="absolute inset-x-0 bottom-10 w-[200%] text-emerald-600/20"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ transform: 'translateZ(-10px) scale(1.01)' }}
              initial={false}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear', delay: 0.2 }}
            >
              <path d="M0,95 C140,100 220,88 320,96 C420,104 520,86 640,96 C760,106 880,90 1000,100 C1080,106 1140,106 1200,108 L1200,120 L0,120 Z" fill="currentColor" />
            </motion.svg>

            {/* Coconut tree (animated sway) */}
            <motion.div
              className="absolute bottom-32 right-10 pointer-events-none select-none drop-shadow-md"
              style={{ transform: 'translateZ(-12px)', transformOrigin: 'bottom center' }}
              animate={{ rotate: [-3, 2, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TwemojiIcon code="1f334" alt="coconut tree" size={86} />
            </motion.div>
          </div>

          {/* Ocean waves background */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32">
            {/* Sand beach patch on the right under the coconut tree */}
            <svg
              className="absolute bottom-16 right-0 w-1/2 md:w-[52%] h-24"
              viewBox="0 0 220 100"
              preserveAspectRatio="none"
              style={{
                WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
              }}
            >
              <defs>
                <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#f5deb3" />
                </linearGradient>
              </defs>
              {/* Smooth dune shape that meets shoreline */}
              <path d="M220 32 C188 14 150 10 104 16 C74 22 38 30 0 38 L0 84 L220 84 Z" fill="url(#sandGrad)" />
            </svg>

            {/* Feathered shoreline blend and foam (aligned with sand) */}
            <motion.svg
              className="absolute bottom-[84px] right-0 w-1/2 md:w-[52%] h-12"
              viewBox="0 0 220 40"
              preserveAspectRatio="none"
              initial={false}
              animate={{ x: [0, 6, 0], opacity: [0.95, 1, 0.95] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <defs>
                <filter id="foamBlur" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="1.15" />
                </filter>
                <linearGradient id="waterFeather" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(125,211,252,0.28)" />
                  <stop offset="100%" stopColor="rgba(125,211,252,0)" />
                </linearGradient>
              </defs>
              {/* soft water tint that fades into the sea */}
              <path d="M220 6 C188 -4 150 -6 104 -2 C74 4 38 12 0 20 L0 40 L220 40 Z" fill="url(#waterFeather)" />
              {/* foam stroke along shoreline */}
              <g filter="url(#foamBlur)">
                <path d="M220 6 C188 -4 150 -6 104 -2 C74 4 38 12 0 20" stroke="white" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.9" />
              </g>
            </motion.svg>

            <motion.svg
              className="absolute bottom-0 w-[200%] text-emerald-300/30"
              viewBox="0 0 1200 80"
              preserveAspectRatio="none"
              initial={false}
              animate={{ x: ['0%', '-50%'], y: [0, 1.5, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            >
              <path d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,80 L0,80 Z" fill="currentColor" />
            </motion.svg>
            <motion.svg
              className="absolute bottom-0 w-[200%] text-cyan-400/25"
              viewBox="0 0 1200 80"
              preserveAspectRatio="none"
              initial={false}
              animate={{ x: ['0%', '-50%'], y: [0, 2.2, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear', delay: 0.3 }}
            >
              <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
            </motion.svg>
            {/* Boat (centered, gentle bob) */}
            <motion.svg
              className="absolute bottom-10 left-1/2 -translate-x-1/2 transform h-10 w-20 text-amber-700"
              viewBox="0 0 120 60"
              preserveAspectRatio="xMidYMid meet"
              initial={{ x: 0, y: 0 }}
              animate={{ x: [-10, 10, -10], y: [0, -2, 0] }}
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
        </motion.section>

        {/* Featured Packages Banner */}
        {selectedCategory === 'All' && !searchQuery && featuredPackages.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-8"
          >
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{t('featured.title')}</h3>
                    <p className="text-gray-600 text-sm">{t('featured.subtitle')}</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Percent className="w-3 h-3 mr-1" />
                  {t('featured.badge')}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredPackages.slice(0, 3).map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} layout="grid" />
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Packages Grid/List */}
        <section className="py-8">
          {currentPackages.length > 0 ? (
            <>
              <motion.div
                layout
                className={
                  layout === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                <AnimatePresence mode="popLayout">
                  {currentPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PackageCard 
                        package={pkg} 
                        layout={layout}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="rounded-xl"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-xl ${
                          currentPage === page 
                            ? 'bg-emerald-600 text-white' 
                            : 'hover:bg-emerald-50'
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="rounded-xl"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                <CardContent className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    No packages found
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Try adjusting your filters or search terms to find the perfect Kerala experience.
                  </p>
                  <Button onClick={clearFilters} className="bg-emerald-600 hover:bg-emerald-700">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    View All Packages
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  )
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading packages…</div>}>
      <PackagesPageContent />
    </Suspense>
  )
}
