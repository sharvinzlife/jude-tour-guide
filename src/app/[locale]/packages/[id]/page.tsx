'use client'

import React, { useState, useRef, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPackageById, tourPackages } from '@/lib/data/tours'
import { ItineraryDisplay } from '@/components/packages/ItineraryDisplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  Star,
  Clock,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  X,
  Heart,
  Share2,
  Download,
  Phone,
  Mail,
  Award,
  TrendingUp,
  Camera,
  Sparkles,
  MessageCircle,
  Mountain,
  Waves,
  TreePine,
  Building,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2
} from 'lucide-react'

export default function PackageDetailPage({ params }: { params: { id: string; locale: string } }) {
  const { id } = params
  const [selectedPricingTier, setSelectedPricingTier] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  const pkg = getPackageById(id)
  
  if (!pkg) {
    notFound()
    return null
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !pkg.images || pkg.images.length <= 1) return
    
    const interval = setInterval(() => {
      setSelectedImageIndex((prev) => (prev + 1) % pkg.images!.length)
    }, 5000) // Change image every 5 seconds
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, pkg.images])

  const handlePrevImage = () => {
    if (!pkg.images) return
    setIsAutoPlaying(false)
    setSelectedImageIndex((prev) => (prev - 1 + pkg.images!.length) % pkg.images!.length)
  }

  const handleNextImage = () => {
    if (!pkg.images) return
    setIsAutoPlaying(false)
    setSelectedImageIndex((prev) => (prev + 1) % pkg.images!.length)
  }

  const getDiscountPercentage = () => {
    if (pkg.originalPrice) {
      return Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    }
    return 0
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'backwaters': return Waves
      case 'hill stations': return Mountain
      case 'heritage': return Building
      case 'wildlife': return TreePine
      case 'beaches': return Waves
      case 'wellness': return Sparkles
      default: return MapPin
    }
  }

  const relatedPackages = tourPackages
    .filter(p => p.id !== pkg.id && p.category === pkg.category)
    .slice(0, 3)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden"
    >
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" 
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400/25 to-blue-400/25 rounded-full blur-3xl animate-pulse delay-1000" 
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.1 }}
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000" 
        />
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.4 }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse delay-3000" 
        />
      </div>
      
      {/* Header with breadcrumb */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-lg shadow-emerald-500/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/packages"
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Packages</span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="border-2 border-emerald-300 hover:border-emerald-500 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-2 sm:p-3"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-emerald-600'}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-2 border-blue-300 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-2 sm:p-3"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-purple-300 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-2 sm:p-3"
              >
                <Download className="w-4 h-4 text-purple-600" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="space-y-6 lg:space-y-8">
          {/* Slideshow and Booking Component Side by Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Enhanced Hero Image Gallery - Compact */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-white/95 via-emerald-50/20 to-teal-50/30 backdrop-blur-xl border-2 border-gradient-to-r from-emerald-200/50 to-teal-200/50 shadow-2xl shadow-emerald-500/20 hover:shadow-3xl hover:shadow-emerald-500/30 rounded-3xl relative group transition-all duration-500">
                {/* Enhanced Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-teal-100/20 pointer-events-none rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-100/10 via-transparent to-blue-100/10 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] group" ref={carouselRef}>
                {/* Main Image with Animation */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={pkg.images?.[selectedImageIndex] || pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlays for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
                
                {/* Navigation Arrows */}
                {pkg.images && pkg.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all opacity-0 group-hover:opacity-100 transform hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                
                {/* Overlay badges - Hidden on mobile to reduce clutter */}
                <div className="absolute top-6 left-6 flex-col space-y-3 z-10 hidden sm:flex">
                  {pkg.featured && (
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-2 shadow-lg">
                        <Award className="w-4 h-4 mr-2" />
                        Featured Package
                      </Badge>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Badge className="bg-white/90 backdrop-blur text-gray-900 border-0 px-3 py-2 shadow-lg">
                      {React.createElement(getCategoryIcon(pkg.category), { className: "w-4 h-4 mr-2" })}
                      {pkg.category}
                    </Badge>
                  </motion.div>
                </div>

                {getDiscountPercentage() > 0 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-6 right-6 hidden sm:block"
                  >
                    <Badge className="bg-red-500 text-white border-0 px-3 py-2 shadow-lg">
                      {getDiscountPercentage()}% OFF
                    </Badge>
                  </motion.div>
                )}

                {/* Image Counter and Controls - Simplified for mobile */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute top-2 right-2 sm:top-6 sm:right-6 flex items-center gap-1 sm:gap-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-black/60 backdrop-blur-md rounded-full px-1.5 sm:px-3 py-0.5 sm:py-1 flex items-center gap-1 sm:gap-2"
                    >
                      <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {selectedImageIndex + 1} / {pkg.images.length}
                      </span>
                    </motion.div>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="w-5 h-5 sm:w-8 sm:h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                      aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    >
                      {isAutoPlaying ? (
                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                )}

                {/* Enhanced Image Thumbnails - Hidden on mobile for cleaner look */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-4 hidden sm:block">
                    <div className="flex gap-1 sm:gap-1.5 overflow-x-auto pb-1 sm:pb-2 scrollbar-hide justify-center">
                      {pkg.images.map((image, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index }}
                          onClick={() => {
                            setSelectedImageIndex(index)
                            setIsAutoPlaying(false)
                          }}
                          className={
                            `relative flex-shrink-0 rounded-md sm:rounded-lg overflow-hidden transition-all transform hover:scale-110 ` +
                            (selectedImageIndex === index 
                              ? 'ring-2 ring-white ring-offset-1 ring-offset-black/30 scale-110' 
                              : 'ring-1 ring-white/40 hover:ring-white/60')
                          }
                          style={{
                            width: selectedImageIndex === index ? '32px' : '28px',
                            height: selectedImageIndex === index ? '32px' : '28px',
                          }}
                        >
                          <Image 
                            src={image} 
                            alt={`${pkg.title} ${index + 1}`} 
                            fill 
                            sizes="32px"
                            className="object-cover"
                          />
                          {selectedImageIndex === index && (
                            <div className="absolute inset-0 bg-white/25 flex items-center justify-center">
                              <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                            </div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            </motion.div>

            {/* Booking Component - Moved to Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl sticky top-24 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-t-3xl relative p-6">
                  <CardTitle className="text-xl font-bold flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Book This Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Pricing Section */}
                  {pkg.pricingTiers && pkg.pricingTiers.length > 0 ? (
                    <div className="space-y-3 mb-6">
                      <h4 className="font-bold text-gray-900 text-center mb-4">Select Package</h4>
                      <div className="space-y-3">
                        {pkg.pricingTiers.map((tier, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                              selectedPricingTier === index
                                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 shadow-lg shadow-emerald-500/20'
                                : 'border-emerald-200/50 hover:border-emerald-300/70 bg-white/80 hover:bg-emerald-50/30'
                            } ${
                              tier.popular ? ' ring-2 ring-emerald-300/50' : ''
                            }`}
                            onClick={() => setSelectedPricingTier(index)}
                          >
                            <div className="flex flex-col justify-between mb-2">
                              <h5 className="font-bold text-sm text-gray-900">{tier.name}</h5>
                              {tier.popular && (
                                <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs px-2 py-1 self-start mt-1">
                                  Most Popular
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-col space-y-1">
                              {tier.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">₹{tier.originalPrice.toLocaleString()}</span>
                              )}
                              <span className="text-lg font-bold text-emerald-600">₹{tier.price.toLocaleString()}</span>
                              <span className="text-xs text-gray-600">per person</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-br from-emerald-50/80 to-teal-50/60 rounded-2xl border border-emerald-200/50 text-center mb-6">
                      <div className="flex flex-col space-y-2">
                        {pkg.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                        )}
                        <span className="text-2xl font-bold text-emerald-600">₹{pkg.price.toLocaleString()}</span>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">per person</span>
                      {getDiscountPercentage() > 0 && (
                        <div className="mt-3">
                          <Badge className="bg-red-500 text-white px-3 py-1">
                            Save {getDiscountPercentage()}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-6 mb-8">
                    <Link href={`/booking/${pkg.id}`}>
                      <Button className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-3xl hover:shadow-emerald-500/50 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Sparkles className="w-6 h-6 mr-3 animate-pulse" />
                        <span className="relative z-10">Book Now</span>
                      </Button>
                    </Link>
                    <Link href="/contact#plan-your-journey" onClick={() => {
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem('selectedTourType', pkg.category.toLowerCase().replace(/\s+/g, '-'))
                      }
                    }}>
                      <Button variant="outline" className="w-full border-3 border-gradient-to-r from-emerald-500 to-teal-500 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 hover:from-emerald-100 hover:via-teal-100 hover:to-cyan-100 text-emerald-700 hover:text-emerald-800 font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/40 transform hover:scale-110 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group border-2 border-emerald-500 hover:border-emerald-600">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <MessageCircle className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                        <span className="relative z-10">Request Custom Quote</span>
                      </Button>
                    </Link>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-6 border-t border-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 space-y-4">
                    <h4 className="font-bold text-gray-900 text-center mb-4 text-lg">Contact Us</h4>
                    <a href="tel:+918921384770" className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-200 hover:border-emerald-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center group-hover:from-emerald-600 group-hover:to-teal-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12">
                        <Phone className="w-6 h-6 text-white group-hover:animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm text-emerald-600 font-medium">Call us</div>
                        <div className="font-bold text-gray-900 text-base">+91 8921384770</div>
                      </div>
                    </a>
                    <a href="mailto:bookings@tourguidejude.com" className="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:from-blue-600 group-hover:to-cyan-600 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12">
                        <Mail className="w-6 h-6 text-white group-hover:animate-pulse" />
                      </div>
                      <div>
                        <div className="text-sm text-blue-600 font-medium">Email us</div>
                        <div className="font-bold text-gray-900 text-base">bookings@tourguidejude.com</div>
                      </div>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

            {/* Package Header */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                {/* Mobile-specific badges section */}
                <div className="sm:hidden mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {pkg.featured && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-2 py-1 text-xs">
                        <Award className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <Badge className="bg-white/90 backdrop-blur text-gray-900 border-0 px-2 py-1 text-xs">
                      {React.createElement(getCategoryIcon(pkg.category), { className: "w-3 h-3 mr-1" })}
                      {pkg.category}
                    </Badge>
                    {getDiscountPercentage() > 0 && (
                      <Badge className="bg-red-500 text-white border-0 px-2 py-1 text-xs">
                        {getDiscountPercentage()}% OFF
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <Badge variant="outline" className={
                    pkg.difficulty === 'Easy' ? 'text-green-600 border-green-200 bg-green-50' :
                    pkg.difficulty === 'Moderate' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                    'text-red-600 border-red-200 bg-red-50'
                  }>
                    {pkg.difficulty} Level
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">{pkg.rating}</span>
                    </div>
                    <span className="text-gray-500">({pkg.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {pkg.title}
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {pkg.description}
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} className="rounded-xl p-3 sm:p-4 text-center bg-white/70 backdrop-blur border border-emerald-100 shadow-sm hover:shadow-md transition-all">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{pkg.duration}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Duration</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} className="rounded-xl p-3 sm:p-4 text-center bg-white/70 backdrop-blur border border-blue-100 shadow-sm hover:shadow-md transition-all">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">2-8</div>
                    <div className="text-xs sm:text-sm text-gray-600">Group Size</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} className="rounded-xl p-3 sm:p-4 text-center bg-white/70 backdrop-blur border border-purple-100 shadow-sm hover:shadow-md transition-all">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{pkg.destinations?.length || 5}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Destinations</div>
                  </motion.div>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} className="rounded-xl p-3 sm:p-4 text-center bg-white/70 backdrop-blur border border-amber-100 shadow-sm hover:shadow-md transition-all">
                    <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{pkg.rating}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                  </motion.div>
                </div>
              </div>

              {/* Destinations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Destinations Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations.map((destination, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50 px-3 py-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tour Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Tabs defaultValue="itinerary" className="space-y-6 lg:space-y-8">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg rounded-xl p-1 gap-0 h-auto min-h-[48px]">
                <TabsTrigger 
                  value="itinerary" 
                  className="text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 transition-all duration-300 rounded-lg py-2 px-2 sm:px-3 m-0.5 flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Itinerary
                </TabsTrigger>
                <TabsTrigger 
                  value="inclusions" 
                  className="text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 transition-all duration-300 rounded-lg py-2 px-2 sm:px-3 m-0.5 flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Inclusions
                </TabsTrigger>
                <TabsTrigger 
                  value="highlights" 
                  className="text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 transition-all duration-300 rounded-lg py-2 px-2 sm:px-3 m-0.5 flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Highlights
                </TabsTrigger>
                <TabsTrigger 
                  value="info" 
                  className="text-xs sm:text-sm font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-gray-50 transition-all duration-300 rounded-lg py-2 px-2 sm:px-3 m-0.5 flex-1 min-w-0 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Travel Info
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary" className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white/95 via-emerald-50/30 to-white/95 backdrop-blur-xl border-2 border-emerald-200/50 shadow-2xl shadow-emerald-500/10 rounded-3xl p-6 sm:p-8"
                >
                  <div className="max-h-[600px] sm:max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-emerald-100 rounded-2xl">
                    <ItineraryDisplay itinerary={pkg.itinerary} compact={false} />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="inclusions">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                >
                  <Card className="bg-gradient-to-br from-emerald-50/80 via-white/90 to-emerald-50/60 backdrop-blur-xl border-2 border-emerald-200/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-emerald-500/15 transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
                      <CardTitle className="text-xl font-bold flex items-center">
                        <CheckCircle className="w-6 h-6 mr-3" />
                        What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {pkg.inclusions.map((inclusion, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-100/50 transition-colors duration-300"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800 font-medium">{inclusion}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-red-50/80 via-white/90 to-red-50/60 backdrop-blur-xl border-2 border-red-200/50 shadow-2xl shadow-red-500/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-red-500/15 transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6">
                      <CardTitle className="text-xl font-bold flex items-center">
                        <X className="w-6 h-6 mr-3" />
                        What's Not Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {pkg.exclusions.map((exclusion, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 bg-red-50/50 rounded-xl hover:bg-red-100/50 transition-colors duration-300"
                          >
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800 font-medium">{exclusion}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="highlights">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-amber-50/80 via-white/90 to-yellow-50/60 backdrop-blur-xl border-2 border-amber-200/50 shadow-2xl shadow-amber-500/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-amber-500/15 transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-6">
                      <CardTitle className="text-2xl font-bold flex items-center">
                        <Star className="w-7 h-7 mr-3" />
                        Tour Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {pkg.highlights.map((highlight, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="flex items-start space-x-4 p-5 bg-gradient-to-r from-amber-50/70 to-yellow-50/70 rounded-2xl border border-amber-200/30 hover:border-amber-300/50 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
                          >
                            <Star className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-800 font-semibold text-base leading-relaxed">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="info">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <Card className="bg-gradient-to-br from-blue-50/80 via-white/90 to-cyan-50/60 backdrop-blur-xl border-2 border-blue-200/50 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-blue-500/15 transition-all duration-500">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
                      <CardTitle className="text-xl font-bold flex items-center">
                        <Calendar className="w-6 h-6 mr-3" />
                        Best Time to Visit
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {pkg.bestTimeToVisit.map((info, index) => (
                          <motion.p 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="text-gray-800 text-lg font-medium p-4 bg-blue-50/50 rounded-xl border border-blue-200/30"
                          >
                            {info}
                          </motion.p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Services */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-emerald-50/80 via-white/90 to-teal-50/60 backdrop-blur-xl border-2 border-emerald-200/50 shadow-2xl shadow-emerald-500/10 rounded-3xl text-center hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500 h-full">
                        <CardContent className="p-8">
                          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900">Travel Insurance</h3>
                          <p className="text-gray-600 text-base leading-relaxed">Comprehensive coverage for peace of mind during your journey</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-purple-50/80 via-white/90 to-indigo-50/60 backdrop-blur-xl border-2 border-purple-200/50 shadow-2xl shadow-purple-500/10 rounded-3xl text-center hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 h-full">
                        <CardContent className="p-8">
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Headphones className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900">24/7 Support</h3>
                          <p className="text-gray-600 text-base leading-relaxed">Round-the-clock assistance during your entire trip</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-orange-50/80 via-white/90 to-amber-50/60 backdrop-blur-xl border-2 border-orange-200/50 shadow-2xl shadow-orange-500/10 rounded-3xl text-center hover:shadow-3xl hover:shadow-orange-500/20 transition-all duration-500 h-full">
                        <CardContent className="p-8">
                          <div className="bg-gradient-to-r from-orange-600 to-amber-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Camera className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-xl font-bold mb-4 text-gray-900">Photography</h3>
                          <p className="text-gray-600 text-base leading-relaxed">Professional photo opportunities and memories included</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </TabsContent>
              </Tabs>
            </motion.div>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden hover:shadow-3xl hover:shadow-emerald-500/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-50/20 pointer-events-none" />
                  <CardHeader className="relative bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100">
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-emerald-600 animate-pulse" />
                      Similar Packages
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPackages.map((relatedPkg, index) => (
                        <motion.div
                          key={relatedPkg.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        >
                          <Link href={`/packages/${relatedPkg.id}`}>
                            <div className="p-6 border-2 border-emerald-200/50 bg-gradient-to-br from-white/80 to-emerald-50/30 backdrop-blur-sm rounded-3xl hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
                              <h4 className="font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300">{relatedPkg.title}</h4>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center text-gray-600 group-hover:text-emerald-600 transition-colors duration-300">
                                  <Clock className="w-4 h-4 mr-2 group-hover:animate-spin" />
                                  {relatedPkg.duration}
                                </span>
                                <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                  ₹{relatedPkg.price.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  )
}
