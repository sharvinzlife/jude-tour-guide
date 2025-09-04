'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
// Removed framer-motion for Next.js 15 compatibility
import { 
  Award, 
  MapPin, 
  Star, 
  Camera, 
  Heart, 
  Calendar,
  Users,
  Compass,
  Sparkles,
  TrendingUp,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FloatingCoconutTrees, BackgroundCoconutTree } from '@/components/ui/StaticCoconutTree'

export default function PortfolioPage() {
  const t = useTranslations('portfolioPage')
  const locale = useLocale()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Get translated portfolio items
  const portfolioItemsRaw = t.raw('items') as Array<{
    id: number
    title: string
    description: string
    location: string
    category: string
    duration: string
    highlights: string[]
    testimonial: string
  }>
  const portfolioItems = portfolioItemsRaw.map(item => ({
    ...item,
    image: `/media/portifolio/Portifolio-${((item.id - 1) % 4) + 1}.jpeg`,
    rating: [4.9, 4.8, 5.0, 4.7, 4.6, 4.9][item.id - 1],
    categoryDisplay: t(`categories.${item.category}`)
  }))

  const categories = [
    { key: 'All', label: t('categories.all') },
    { key: 'backwaters', label: t('categories.backwaters') },
    { key: 'hillStations', label: t('categories.hillStations') },
    { key: 'cultural', label: t('categories.cultural') },
    { key: 'nature', label: t('categories.nature') },
    { key: 'beaches', label: t('categories.beaches') },
    { key: 'wellness', label: t('categories.wellness') }
  ]

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  const stats = [
    { number: '500+', label: t('hero.stats.tours'), icon: Calendar },
    { number: '34', label: t('hero.stats.countries'), icon: MapPin },
    { number: '4.9', label: t('hero.stats.rating'), icon: Star },
    { number: '10+', label: t('hero.stats.experience'), icon: Award }
  ]

  const testimonials = [
    {
      text: "Jude provided us with an absolutely incredible Kerala experience. His knowledge, passion, and attention to detail made our trip unforgettable!",
      author: "Sarah & Michael Johnson",
      location: "Australia",
      tour: "Backwater & Hill Station Tour",
      rating: 5
    },
    {
      text: "The cultural immersion was beyond our expectations. Jude showed us the real Kerala, not just the tourist spots.",
      author: "Emma & James Wilson",
      location: "United Kingdom", 
      tour: "Cultural Heritage Tour",
      rating: 5
    },
    {
      text: "Perfect balance of adventure and relaxation. The spice plantation visit was educational and fun!",
      author: "Hans & Maria Schmidt",
      location: "Germany",
      tour: "Nature & Wildlife Tour",
      rating: 5
    }
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-scroll testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Change testimonial every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen relative">
      {/* Page-scoped background removed: using universal AnimatedBackground */}
      
      {/* Hero Section - Compact professional style */}
      <section className="relative py-12 px-4 overflow-hidden z-10">
        {/* Hero coconut trees removed: universal background provides floating trees */}
        {/* Background with Kerala-themed gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          
          
          
        />
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          
          
          
        />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-400/20 rounded-full blur-lg"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div 
            className="max-w-4xl mx-auto"
            
            
            
          >
            <Badge className="mb-4 bg-white/20 backdrop-blur text-white border-white/30 text-sm px-4 py-1.5">
              <Camera className="w-3.5 h-3.5 mr-1.5" />
              {t('hero.badge')}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
              {t('hero.title')}
              <span className="inline-block ml-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            
            {/* Quick Stats */}
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6"
              
              
              
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div 
                    key={index}
                    className="text-center glassmorphism-professional p-3 rounded-lg"
                    
                  >
                    <Icon className="w-5 h-5 text-white mx-auto mb-1" />
                    <div className="text-xl md:text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-white/80 text-xs">{stat.label}</div>
                  </div>
                )
              })}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                size="default" 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-2.5 text-sm font-semibold"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                View Portfolio
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white px-6 py-2.5 text-sm font-semibold"
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="w-4 h-4 mr-1.5" />
                Client Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-10 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div 
            className="text-center mb-12"
            
            
            
          >
            <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-200 text-xs px-3 py-1">
              <Compass className="w-3 h-3 mr-1.5" />
              {t('categories.badge')}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('categories.title')}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {t('categories.description')}
            </p>
          </div>

          <div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            
            
            
          >
            {categories.map((category) => (
              <button
                key={category.key}
                
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.key
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Portfolio Gallery */}
      <section id="portfolio" className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div 
            className="text-center mb-12"
            
            
            
          >
            <Badge className="mb-3 bg-amber-100 text-amber-700 border-amber-200 text-xs px-3 py-1">
              <Award className="w-3 h-3 mr-1.5" />
              {t('gallery.badge')}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('gallery.title')}
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            
            
            
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                
                
              >
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 glassmorphism-card">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                      onClick={() => setLightboxImage(item.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-600 text-white border-0 shadow-lg">
                        {item.categoryDisplay}
                      </Badge>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-800 border-0 backdrop-blur">
                        <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                        {item.rating}
                      </Badge>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        size="icon" 
                        className="w-16 h-16 rounded-full bg-white/90 backdrop-blur text-emerald-600 hover:bg-white hover:scale-110 transition-all duration-300"
                        onClick={() => setLightboxImage(item.image)}
                      >
                        <ExternalLink className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.duration}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{item.location}</span>
                    </div>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.highlights.slice(0, 2).map((highlight, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {item.highlights.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.highlights.length - 2} more
                        </Badge>
                      )}
                    </div>
                    
                    {/* Client Testimonial Preview */}
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 italic mb-2">
                        &quot;{item.testimonial}&quot;
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{t('gallery.happyClients')}</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-emerald-600 hover:text-emerald-700 h-auto p-1"
                        >
                          {t('gallery.viewDetails')}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredItems.length > 6 && (
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {t('gallery.loadMore')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div 
            className="text-center mb-16"
            
            
            
          >
            <Badge className="mb-3 bg-purple-100 text-purple-700 border-purple-200 text-xs px-3 py-1">
              <Heart className="w-3 h-3 mr-1.5" />
              {t('testimonials.badge')}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {t('testimonials.title')}
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>

          <div 
            className="max-w-4xl mx-auto"
            
            
            
          >
            <div className="relative glassmorphism-professional p-6 md:p-8 rounded-2xl">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-gray-700 italic mb-6 text-center leading-relaxed">
                &quot;{testimonials[currentTestimonial].text}&quot;
              </blockquote>
              
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900 mb-1">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-gray-600 mb-2">
                  {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].tour}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto text-center">
          <div 
            className="max-w-3xl mx-auto"
            
            
            
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-6">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                size="default" 
                className="bg-white text-emerald-600 hover:bg-gray-100 px-6 py-2.5 text-sm font-semibold w-full sm:w-auto"
              >
                <Users className="w-4 h-4 mr-1.5" />
                {t('cta.buttons.planTrip')}
              </Button>
              <Link href={`/${locale}/contact#plan-your-journey`}>
                <Button 
                  size="default" 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white px-6 py-2.5 text-sm font-semibold w-full sm:w-auto"
                >
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {t('cta.buttons.checkAvailability')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Images */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage}
              alt="Portfolio Image"
              width={1200}
              height={800}
              className="w-full h-full object-contain rounded-lg"
            />
            <Button
              size="icon"
              variant="outline"
              className="absolute top-4 right-4 bg-white/90 backdrop-blur"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
