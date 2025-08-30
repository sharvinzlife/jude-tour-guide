'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPackageById, tourPackages } from '@/lib/data/tours'
import { ItineraryDisplay } from '@/components/packages/ItineraryDisplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Mountain,
  Waves,
  TreePine,
  Building,
  Sparkles,
  Shield,
  Headphones
} from 'lucide-react'

export default function PackageDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = use(params)
  const [selectedPricingTier, setSelectedPricingTier] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  const pkg = getPackageById(id)
  
  if (!pkg) {
    notFound()
    return null
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

  const CategoryIcon = getCategoryIcon(pkg.category)
  const relatedPackages = tourPackages
    .filter(p => p.id !== pkg.id && p.category === pkg.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header with breadcrumb */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/packages"
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Packages</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className="border-gray-300"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-gray-300"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image Gallery */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur border-0 shadow-xl rounded-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={pkg.images?.[selectedImageIndex] || pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay badges */}
                <div className="absolute top-6 left-6 flex flex-col space-y-3">
                  {pkg.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-3 py-2">
                      <Award className="w-4 h-4 mr-2" />
                      Featured Package
                    </Badge>
                  )}
                  <Badge className="bg-white/90 backdrop-blur text-gray-900 border-0 px-3 py-2">
                    <CategoryIcon className="w-4 h-4 mr-2" />
                    {pkg.category}
                  </Badge>
                </div>

                {getDiscountPercentage() > 0 && (
                  <Badge className="absolute top-6 right-6 bg-red-500 text-white border-0 px-3 py-2">
                    {getDiscountPercentage()}% OFF
                  </Badge>
                )}

                {/* Image thumbnails */}
                {pkg.images && pkg.images.length > 1 && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex space-x-2 overflow-x-auto">
                      {pkg.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === index ? 'border-white shadow-lg' : 'border-white/50'
                          }`}
                        >
                          <Image src={image} alt={`${pkg.title} ${index + 1}`} fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Package Header */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Badge variant="outline" className={`
                    ${pkg.difficulty === 'Easy' ? 'text-green-600 border-green-200 bg-green-50' :
                      pkg.difficulty === 'Moderate' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                      'text-red-600 border-red-200 bg-red-50'}
                  `}>
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
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {pkg.title}
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{pkg.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Max {pkg.maxPeople}</div>
                  <div className="text-sm text-gray-600">Group Size</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{pkg.destinations.length}</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Popular</div>
                  <div className="text-sm text-gray-600">Rating</div>
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
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="itinerary" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur border border-gray-200">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="info">Travel Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary">
                <ItineraryDisplay itinerary={pkg.itinerary} compact={false} />
              </TabsContent>
              
              <TabsContent value="inclusions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl text-emerald-600 flex items-center">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        What&apos;s Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pkg.inclusions.map((inclusion, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl text-red-600 flex items-center">
                        <X className="w-6 h-6 mr-2" />
                        What&apos;s Not Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {pkg.exclusions.map((exclusion, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{exclusion}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="highlights">
                <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900 flex items-center">
                      <Star className="w-6 h-6 mr-2 text-yellow-500" />
                      Tour Highlights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                          <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-800 font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="info">
                <div className="space-y-6">
                  <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-6 h-6 mr-2 text-emerald-600" />
                        Best Time to Visit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {pkg.bestTimeToVisit.map((info, index) => (
                          <p key={index} className="text-gray-700 text-lg">{info}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Services */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl text-center">
                      <CardContent className="p-6">
                        <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Travel Insurance</h3>
                        <p className="text-gray-600 text-sm">Comprehensive coverage for peace of mind</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl text-center">
                      <CardContent className="p-6">
                        <Headphones className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600 text-sm">Round-the-clock assistance during your trip</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl text-center">
                      <CardContent className="p-6">
                        <Camera className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Photography</h3>
                        <p className="text-gray-600 text-sm">Professional photo opportunities included</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="bg-white/90 backdrop-blur border-0 shadow-xl rounded-2xl sticky top-24">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-2xl">
                <CardTitle className="text-2xl">Book This Package</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Pricing Tiers */}
                {pkg.pricingTiers && pkg.pricingTiers.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {pkg.pricingTiers.map((tier, index) => (
                      <div 
                        key={index}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedPricingTier === index 
                            ? 'border-emerald-500 bg-emerald-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${tier.popular ? 'ring-2 ring-emerald-200' : ''}`}
                        onClick={() => setSelectedPricingTier(index)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-lg">{tier.name}</h4>
                          {tier.popular && (
                            <Badge className="bg-emerald-600 text-white">Most Popular</Badge>
                          )}
                        </div>
                        <div className="flex items-baseline space-x-2 mb-3">
                          {tier.originalPrice && (
                            <span className="text-gray-500 line-through">₹{tier.originalPrice.toLocaleString()}</span>
                          )}
                          <span className="text-2xl font-bold text-emerald-600">₹{tier.price.toLocaleString()}</span>
                          <span className="text-gray-600">per person</span>
                        </div>
                        <div className="space-y-1">
                          {tier.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2 mb-2">
                      {pkg.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</span>
                      )}
                      <span className="text-3xl font-bold text-emerald-600">₹{pkg.price.toLocaleString()}</span>
                    </div>
                    <span className="text-gray-600">per person</span>
                  </div>
                )}

                <div className="space-y-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3">
                    Book Now
                  </Button>
                  <Button variant="outline" className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Request Custom Quote
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">+91 8921384770</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">bookings@keralatours.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <Card className="bg-white/80 backdrop-blur border-0 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Similar Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPackages.map((relatedPkg) => (
                      <Link key={relatedPkg.id} href={`/packages/${relatedPkg.id}`}>
                        <div className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all cursor-pointer">
                          <h4 className="font-semibold text-gray-900 mb-2">{relatedPkg.title}</h4>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {relatedPkg.duration}
                            </span>
                            <span className="font-semibold text-emerald-600">
                              ₹{relatedPkg.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
