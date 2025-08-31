'use client'

import { useState, useMemo } from 'react'
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
import { motion, AnimatePresence } from 'framer-motion'

export default function PackagesPage() {
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
  const [searchQuery, setSearchQuery] = useState('')
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
      .replace(/\p{Diacritic}/gu, '')
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
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
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
          className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 -mt-8 rounded-3xl shadow-lg"
        >
          <div className="py-6 px-4 sm:px-6">
            {/* Top Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-4">
              {/* Search & Category */}
              <div className="flex flex-wrap items-center gap-3 min-w-0 md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={t('filters.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-44 sm:w-64 text-sm h-10 border-gray-200 rounded-xl focus:border-emerald-500 bg-white/70 backdrop-blur"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-36 sm:w-48 h-10 text-sm border-gray-200 rounded-xl focus:border-emerald-500 bg-white/70 backdrop-blur">
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
              </div>

              {/* Sort & Layout Controls */}
              <div className="flex items-center gap-3 min-w-0 md:justify-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 sm:w-40 h-10 text-sm border-gray-200 rounded-xl focus:border-emerald-500 bg-white/70 backdrop-blur">
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