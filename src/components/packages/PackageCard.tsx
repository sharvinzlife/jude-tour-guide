'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar, 
  Heart,
  Share2,
  Eye,
  CheckCircle,
  TrendingUp,
  Award,
  Camera,
  Info,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { TourPackage } from '@/types'

interface PackageCardProps {
  package: TourPackage
  layout?: 'grid' | 'list'
}
export function PackageCard({ 
  package: pkg, 
  layout = 'grid' 
}: PackageCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showItinerary, setShowItinerary] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pkg.title,
        text: pkg.description,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const getDiscountPercentage = () => {
    if (pkg.originalPrice) {
      return Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    }
    return 0
  }

  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="group overflow-hidden bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-0"></div>
        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Image Section */}
          <div className="relative lg:w-80 h-64 lg:h-auto overflow-hidden z-10">
            <div className="relative w-full h-full">
              <Image
                src={pkg.image}
                alt={pkg.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Overlay Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {pkg.featured && (
              <motion.div
                className="absolute top-4 left-4"
                initial={{ opacity: 0, scale: 0, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-1">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-3 h-3 mr-1" />
                  </motion.div>
                  Featured
                </Badge>
              </motion.div>
            )}
            
            {getDiscountPercentage() > 0 && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge className="bg-red-500 text-white border-0 px-2 py-1">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {getDiscountPercentage()}% OFF
                  </motion.div>
                </Badge>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              className="absolute bottom-4 right-4 flex space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/90 backdrop-blur border-0 p-2"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <div
                    className={`transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </div>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/90 backdrop-blur border-0 p-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Destinations */}
            <motion.div 
              className="absolute bottom-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex flex-wrap gap-1">
                {pkg.destinations.slice(0, 3).map((dest, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge className="bg-white/20 backdrop-blur text-white text-xs border-white/30">
                      {dest}
                    </Badge>
                  </motion.div>
                ))}
                {pkg.destinations.length > 3 && (
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Badge className="bg-white/20 backdrop-blur text-white text-xs border-white/30">
                      +{pkg.destinations.length - 3}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 lg:p-8 relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                    {pkg.category}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${pkg.difficulty === 'Easy' ? 'text-green-600 border-green-200 bg-green-50' :
                      pkg.difficulty === 'Moderate' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                      'text-red-600 border-red-200 bg-red-50'}
                  `}>
                    {pkg.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {pkg.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {pkg.description}
                </CardDescription>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">{pkg.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Max {pkg.maxPeople}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-gray-500">({pkg.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-emerald-600">Popular</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Tour Highlights</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {pkg.highlights.slice(0, 6).map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
              {pkg.highlights.length > 6 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-emerald-600 hover:text-emerald-700 p-0"
                  onClick={() => setShowItinerary(!showItinerary)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {showItinerary ? 'Show Less' : `+${pkg.highlights.length - 6} More`}
                </Button>
              )}
            </div>

            {/* Best Time to Visit */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Best Time to Visit</h4>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-gray-600">{pkg.bestTimeToVisit.join(' • ')}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {pkg.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price and CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pt-6 border-t border-gray-200 space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  {pkg.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₹{pkg.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-emerald-600">
                    ₹{pkg.price.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-gray-600">per person</span>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:ml-4">
                <Link href={`/packages/${pkg.id}`} className="flex-1 sm:flex-none">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto border-2 border-emerald-600 text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                <Link href={`/booking/${pkg.id}`} className="flex-1 sm:flex-none">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </Card>
      </motion.div>
    )
  }

  // Grid Layout (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group overflow-hidden bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-0"></div>
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden z-10">
          <div className="relative w-full h-full">
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
          {/* Top Badges */}
          <motion.div 
            className="absolute top-4 left-4 flex flex-col space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Badge variant="outline" className="bg-white/90 backdrop-blur text-gray-900 border-white/50">
                {pkg.category}
              </Badge>
            </motion.div>
            {pkg.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Award className="w-3 h-3 mr-1" />
                  </motion.div>
                  Featured
                </Badge>
              </motion.div>
            )}
          </motion.div>

        {/* Discount Badge */}
        {getDiscountPercentage() > 0 && (
          <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0">
            {getDiscountPercentage()}% OFF
          </Badge>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-2"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
          >
            <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm hover:bg-white p-2"
            onClick={(e) => {
              e.preventDefault()
              handleShare()
            }}
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>

        {/* Animated Book Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-4 left-4 right-4"
        >
          <Link href={`/booking/${pkg.id}`}>
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Book Now
            </Button>
          </Link>
        </motion.div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex flex-wrap gap-1">
              {pkg.destinations.slice(0, 2).map((dest, index) => (
                <Badge key={index} className="bg-white/20 backdrop-blur text-white text-xs border-white/30">
                  <MapPin className="w-3 h-3 mr-1" />
                  {dest}
                </Badge>
              ))}
              {pkg.destinations.length > 2 && (
                <Badge className="bg-white/20 backdrop-blur text-white text-xs border-white/30">
                  +{pkg.destinations.length - 2}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur rounded-full px-2 py-1">
              <Camera className="w-3 h-3" />
              <span className="text-xs font-medium">{pkg.images?.length || 1}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative z-10">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-xs
                ${pkg.difficulty === 'Easy' ? 'text-green-600 border-green-200 bg-green-50' :
                  pkg.difficulty === 'Moderate' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                  'text-red-600 border-red-200 bg-red-50'}
              `}>
                {pkg.difficulty}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{pkg.rating}</span>
                <span className="text-gray-500">({pkg.reviewCount})</span>
              </div>
            </div>
          </div>
          
          <CardTitle className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {pkg.title}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
            {pkg.description}
          </CardDescription>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">Max {pkg.maxPeople}</span>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-6">
          <div className="space-y-2">
            {pkg.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
          {pkg.highlights.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">
              +{pkg.highlights.length - 3} more highlights
            </p>
          )}
        </div>

        {/* Best Time to Visit */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{pkg.bestTimeToVisit[0]}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {pkg.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {pkg.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{pkg.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
          <div>
            <div className="flex items-baseline space-x-2 mb-2">
              {pkg.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
              )}
              <span className="text-2xl font-bold text-emerald-600">₹{pkg.price.toLocaleString()}</span>
            </div>
            <span className="text-sm text-gray-600">per person</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Link href={`/packages/${pkg.id}`} className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:border-emerald-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold py-3"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Link href={`/booking/${pkg.id}`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 transition-all duration-300 py-3">
                <Sparkles className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
    </motion.div>
  )
}
