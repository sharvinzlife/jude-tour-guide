'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ArrowRight, MapPin, Star, Quote, Expand } from 'lucide-react'
import '@/styles/glassmorphism.css'

const portfolioImages = [
  {
    src: '/media/portifolio/Portifolio-1.jpeg',
    title: 'International Client Experience',
    location: 'Backwaters of Alleppey',
    client: 'Sarah & John (USA)',
    testimonial: 'Jude made our Kerala honeymoon absolutely magical. His knowledge of local culture and hidden gems was incredible!',
    rating: 5,
    experience: 'Romantic Houseboat Journey'
  },
  {
    src: '/media/portifolio/Portifolio-2.jpeg',
    title: 'Adventure Tourism Excellence',
    location: 'Munnar Hills',
    client: 'Michael & Family (Germany)',
    testimonial: 'Professional, punctual, and passionate! Jude turned our family trip into an unforgettable adventure.',
    rating: 5,
    experience: 'Tea Plantation Trek'
  },
  {
    src: '/media/portifolio/Portifolio-3.jpeg',
    title: 'Cultural Heritage Tours',
    location: 'Historic Fort Kochi',
    client: 'Emma Thompson (UK)',
    testimonial: 'Jude\'s storytelling brought Kerala\'s rich history to life. A truly authentic cultural experience!',
    rating: 5,
    experience: 'Heritage Walking Tour'
  },
  {
    src: '/media/portifolio/Portifolio-4.jpeg',
    title: 'Wildlife & Nature Expeditions',
    location: 'Wayanad Forests',
    client: 'David & Lisa (Australia)',
    testimonial: 'Amazing wildlife spotting! Jude\'s expertise in nature photography helped us capture perfect moments.',
    rating: 5,
    experience: 'Wildlife Safari Adventure'
  }
]
export function PortfolioPreview() {
  const locale = useLocale()
  const t = useTranslations('portfolio')
  const ref = useRef(null)

  return (
    <section 
      ref={ref}
      className="py-20 px-4 relative overflow-hidden"
      
      
      
    >
      {/* Kerala-themed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50" />
      <div className="absolute inset-0 opacity-5" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3Cpath d='M20 20c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }} />
      
      <div className="container mx-auto relative z-10">
        <div 
          className="text-center mb-16"
          
          
          
        >
          <div 
            className="inline-flex items-center gap-2 glassmorphism-subtle px-4 py-2 rounded-full text-white mb-6 professional-focus"
          >
            <div>
              <Star className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{t('subtitle')}</span>
          </div>
          
          <h2 
            className="text-5xl font-bold mb-6 gradient-text-modern text-glow-subtle"
          >
            {t('title')}
          </h2>
        </div>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          
          
          
        >
          {portfolioImages.map((image, index) => (
            <div key={index} >
              <div
                
                
                
              >
                <Card className="group relative overflow-hidden border-0 shadow-2xl glassmorphism-professional smooth-hover-lift">
                {/* Enhanced Glassmorphic effect with new styles */}
                <div 
                  className="absolute inset-0 glassmorphism-hover"
                  
                />
                
                <CardContent className="p-0 relative z-10">
                  <AspectRatio ratio={4/3} className="relative overflow-hidden rounded-t-xl">
                    <div  >
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover transition-transform duration-700"
                      />
                    </div>
                  
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </AspectRatio>
                    {/* Expand button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.button 
                          className="absolute top-4 right-4 p-3 glassmorphism-button text-white professional-focus"
                          whileHover={{ 
                            scale: 1.1, 
                            rotate: 90
                          }}
                          
                        >
                          <Expand className="w-5 h-5" />
                        </motion.button>
                      </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-0 shadow-none">
                      <div className="relative">
                        <Image
                          src={image.src}
                          alt={image.title}
                          width={1200}
                          height={800}
                          className="w-full h-auto rounded-xl"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-xl">
                          <DialogTitle className="text-2xl font-bold text-white mb-2">
                            {image.title}
                          </DialogTitle>
                          <DialogDescription className="text-gray-200 text-lg mb-4">
                            {image.experience} • {image.location}
                          </DialogDescription>
                          <div className="flex items-center gap-2 text-yellow-400 mb-3">
                            {[...Array(image.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                          </div>
                          <blockquote className="text-white/90 italic">
                            &ldquo;{image.testimonial}&rdquo;
                          </blockquote>
                          <cite className="text-emerald-300 text-sm mt-2 block">
                            - {image.client}
                          </cite>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                    {/* Enhanced Location badge with HoverCard */}
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div 
                          className="absolute top-4 left-4 px-3 py-2 glassmorphism-subtle rounded-full cursor-pointer"
                          
                        >
                          <div className="flex items-center space-x-1 text-white text-sm">
                            <div
                              
                            >
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{image.location}</span>
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="glassmorphism-card border-0 text-white">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">{image.experience}</h4>
                          <p className="text-xs text-white/80">
                            Location: {image.location}
                          </p>
                          <p className="text-xs text-white/80">
                            Client: {image.client}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  
                    {/* Rating stars */}
                    <div 
                      className="absolute bottom-4 right-4 flex items-center gap-1"
                      
                    >
                      {[...Array(image.rating)].map((_, i) => (
                        <div
                          key={i}
                          
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Card content */}
                    <div className="p-6 glassmorphism-card">
                  <h2 className="font-bold text-xl text-white mb-2 group-hover:text-yellow-300 transition-colors text-glow-subtle">
                    {image.title}
                  </h2>
                  <p className="gradient-text-modern font-semibold text-sm mb-3">
                    {image.experience}
                  </p>
                  
                  {/* Client testimonial */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-yellow-300 mb-2" />
                    <blockquote className="text-white/90 italic text-sm mb-3 line-clamp-2">
                      &ldquo;{image.testimonial}&rdquo;
                    </blockquote>
                    <cite className="text-yellow-200 font-medium text-sm">
                      - {image.client}
                    </cite>
                  </div>
                  
                  {/* Enhanced Hover reveal animation */}
                  <div className="mt-4 pt-4 border-t border-white/20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">
                        Verified Experience
                      </span>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </CardContent>
              </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div 
          className="text-center"
          
        >
          <div 
            className="inline-flex flex-col items-center gap-6"
            
            
            
          >
            <div 
              className="text-gray-600 text-lg"
              
            >
              Ready to create your own Kerala story?
            </div>
            <div
              
              
              
            >
              <Button 
                asChild 
                size="lg" 
                className="glassmorphism-professional text-white px-8 py-6 text-lg rounded-full shadow-lg smooth-hover-lift professional-focus"
              >
                <Link href={`/${locale}/portfolio`} className="flex items-center gap-3">
                  <span>{t('viewAll')}</span>
                  <div
                    
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </Button>
            </div>
            <p 
              className="text-sm text-gray-500 max-w-md"
              
              
            >
              Explore our complete gallery of 50+ successful tours and read detailed client reviews
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -180, -360]
        }}
        
      />
    </section>
  )
}
