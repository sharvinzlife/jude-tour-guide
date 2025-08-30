'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar,
  MapPin,
  Utensils,
  Bed,
  Star,
  Car,
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Sunrise,
  Sun,
  Moon,
  Mountain,
  Waves,
  Trees
} from 'lucide-react'
import { Itinerary } from '@/types'

interface ItineraryDisplayProps {
  itinerary: Itinerary[]
  compact?: boolean
}
export function ItineraryDisplay({ itinerary, compact = false }: ItineraryDisplayProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>(compact ? [] : [1])
  
  const toggleDay = (day: number) => {
    setExpandedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  const getTimeIcon = (index: number) => {
    if (index === 0) return Sunrise
    if (index === itinerary.length - 1) return Moon
    return Sun
  }

  const getActivityIcon = (activity: string) => {
    if (activity.toLowerCase().includes('mountain') || activity.toLowerCase().includes('trek')) return Mountain
    if (activity.toLowerCase().includes('beach') || activity.toLowerCase().includes('backwater')) return Waves
    if (activity.toLowerCase().includes('forest') || activity.toLowerCase().includes('plantation')) return Trees
    if (activity.toLowerCase().includes('photo')) return Camera
    return MapPin
  }

  if (compact) {
    return (
      <Card className="bg-white/90 backdrop-blur border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Tour Itinerary ({itinerary.length} Days)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {itinerary.map((day, index) => {
              const TimeIcon = getTimeIcon(index)
              const isExpanded = expandedDays.includes(day.day)
              
              return (
                <div key={day.day} className="border-b border-gray-100 last:border-b-0">
                  <Button
                    variant="ghost"
                    className="w-full p-4 h-auto justify-between hover:bg-emerald-50 transition-colors"
                    onClick={() => toggleDay(day.day)}
                  >
                    <div className="flex items-center space-x-4 text-left">
                      <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full">
                        <TimeIcon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Day {day.day}</h4>
                        <p className="text-sm text-gray-600 line-clamp-1">{day.title}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 animate-in slide-in-from-top duration-200">
                      <div className="ml-14 space-y-3 border-l-2 border-emerald-200 pl-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {day.description}
                        </p>
                        
                        <div className="space-y-2">
                          <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
                            Activities
                          </h5>
                          {day.activities.slice(0, 3).map((activity, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                              <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              <span>{activity}</span>
                            </div>
                          ))}
                          {day.activities.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{day.activities.length - 3} more activities
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {day.meals.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Utensils className="w-3 h-3" />
                              <span>{day.meals.length} meals</span>
                            </div>
                          )}
                          {day.accommodation && (
                            <div className="flex items-center space-x-1">
                              <Bed className="w-3 h-3" />
                              <span>Stay included</span>
                            </div>
                          )}
                          {day.travelTime && (
                            <div className="flex items-center space-x-1">
                              <Car className="w-3 h-3" />
                              <span>{day.travelTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Full detailed view
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          Detailed Itinerary
        </h3>
        <p className="text-lg text-gray-600">
          Experience Kerala like never before with our carefully crafted {itinerary.length}-day journey
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-600 via-teal-500 to-emerald-600"></div>
        
        <div className="space-y-12">
          {itinerary.map((day, index) => {
            const TimeIcon = getTimeIcon(index)
            
            return (
              <div key={day.day} className="relative">
                {/* Timeline Node */}
                <div className="absolute left-6 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Card */}
                <div className="ml-20">
                  <Card className="group overflow-hidden bg-white/90 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl">
                    {/* Header */}
                    <CardHeader className={`
                      bg-gradient-to-r text-white relative overflow-hidden
                      ${index % 3 === 0 ? 'from-emerald-600 to-teal-600' :
                        index % 3 === 1 ? 'from-teal-600 to-cyan-600' :
                        'from-cyan-600 to-emerald-600'}
                    `}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur rounded-full">
                              <TimeIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <Badge className="bg-white/20 backdrop-blur text-white border-white/30 mb-2">
                                Day {day.day}
                              </Badge>
                              <CardTitle className="text-2xl font-bold">
                                {day.title}
                              </CardTitle>
                            </div>
                          </div>
                          <div className="text-right text-white/80">
                            {day.travelTime && (
                              <div className="flex items-center space-x-1 mb-1">
                                <Car className="w-4 h-4" />
                                <span className="text-sm">{day.travelTime}</span>
                              </div>
                            )}
                            {day.accommodation && (
                              <div className="flex items-center space-x-1">
                                <Bed className="w-4 h-4" />
                                <span className="text-sm">Overnight</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-white/90 text-lg leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Activities */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                            <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                            Activities & Attractions
                          </h4>
                          <div className="space-y-3">
                            {day.activities.map((activity, idx) => {
                              const ActivityIcon = getActivityIcon(activity)
                              return (
                                <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors group">
                                  <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                                    <ActivityIcon className="w-4 h-4 text-emerald-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{activity}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Meals & Highlights */}
                        <div className="space-y-6">
                          {/* Meals */}
                          {day.meals.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Utensils className="w-5 h-5 mr-2 text-emerald-600" />
                                Meals Included
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {day.meals.map((meal, idx) => (
                                  <Badge key={idx} variant="outline" className="text-gray-600 border-gray-300">
                                    {meal}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Accommodation */}
                          {day.accommodation && (
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Bed className="w-5 h-5 mr-2 text-emerald-600" />
                                Accommodation
                              </h4>
                              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                <p className="text-gray-700 font-medium">{day.accommodation}</p>
                              </div>
                            </div>
                          )}

                          {/* Day Highlights */}
                          {day.highlights.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Star className="w-5 h-5 mr-2 text-emerald-600" />
                                Day Highlights
                              </h4>
                              <div className="space-y-2">
                                {day.highlights.map((highlight, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                                    <span className="text-gray-700">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-4">
              Your {itinerary.length}-Day Kerala Adventure Awaits!
            </h4>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              From the misty hills of Munnar to the tranquil backwaters of Alleppey, 
              experience the complete essence of God&apos;s Own Country with our expertly crafted itinerary.
            </p>
            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">{itinerary.length}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {itinerary.reduce((sum, day) => sum + day.activities.length, 0)}
                </div>
                <div className="text-sm">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {itinerary.reduce((sum, day) => sum + day.meals.length, 0)}
                </div>
                <div className="text-sm">Meals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {itinerary.filter(day => day.accommodation).length}
                </div>
                <div className="text-sm">Nights</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
