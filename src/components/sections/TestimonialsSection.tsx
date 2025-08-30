'use client'

import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import ScrollAnimation from '@/components/ui/scroll-animation'
import StaggerContainer from '@/components/ui/stagger-container'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      country: "🇺🇸 USA",
      rating: 5,
      text: t('reviews.0.text'),
      avatar: "SJ"
    },
    {
      name: "Marco Rossi",
      country: "🇮🇹 Italy", 
      rating: 5,
      text: t('reviews.1.text'),
      avatar: "MR"
    },
    {
      name: "Yuki Tanaka",
      country: "🇯🇵 Japan",
      rating: 5,
      text: t('reviews.2.text'),
      avatar: "YT"
    },
    {
      name: "Emma Wilson",
      country: "🇬🇧 UK",
      rating: 5,
      text: t('reviews.3.text'),
      avatar: "EW"
    },
    {
      name: "David Chen",
      country: "🇨🇦 Canada",
      rating: 5,
      text: t('reviews.4.text'),
      avatar: "DC"
    },
    {
      name: "Sophie Martin",
      country: "🇫🇷 France",
      rating: 5,
      text: t('reviews.5.text'),
      avatar: "SM"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation variant="textReveal">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center">
            <span className="badge badge-secondary badge-lg">⭐ {t('badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            {t('title')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        </ScrollAnimation>

        {/* Enhanced Testimonials Grid with 3D Effects */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card group relative bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl overflow-hidden"
              whileHover={{ 
                y: -8, 
                rotateX: 5,
                rotateY: index % 2 === 0 ? 3 : -3,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{ perspective: 1000 }}
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Quote className="w-6 h-6 text-emerald-600 drop-shadow-sm" />
                </motion.div>
              </div>
              
              {/* Rating */}
              <div className="flex justify-center mb-4 space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm animate-pulse" style={{animationDelay: `${i * 200}ms`}} />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-neutral-700 italic leading-relaxed mb-6 text-center font-medium">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center space-x-4">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {testimonial.avatar}
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-neutral-900 drop-shadow-sm">{testimonial.name}</div>
                  <div className="text-sm text-neutral-600 font-medium">{testimonial.country}</div>
                </div>
              </div>
              
              {/* Glassmorphism effects */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Enhanced Overall Rating Summary */}
        <ScrollAnimation variant="scale" delay={0.3}>
        <div className="mt-16">
          <motion.div 
            className="bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-8 text-center max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <motion.div 
                className="space-y-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-amber-500 drop-shadow-lg">{t('stats.rating')}</div>
                <div className="text-neutral-600 font-semibold">{t('stats.ratingLabel')}</div>
                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="space-y-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-teal-600 drop-shadow-lg">{t('stats.travelers')}</div>
                <div className="text-neutral-600 font-semibold">{t('stats.travelersLabel')}</div>
                <motion.div 
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  😊
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="space-y-3 group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-emerald-600 drop-shadow-lg">{t('stats.experience')}</div>
                <div className="text-neutral-600 font-semibold">{t('stats.experienceLabel')}</div>
                <motion.div 
                  className="text-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1 
                  }}
                >
                  🏆
                </motion.div>
              </motion.div>
            </div>
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
            {/* Ambient glow effects */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-20"></div>
          </motion.div>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
