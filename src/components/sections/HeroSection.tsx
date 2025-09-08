'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { HeroPrimaryButton, HeroSecondaryButton, ButtonGroup } from '@/components/ui/kerala-buttons'
import { Star, MapPin, Award, Users, ShieldCheck } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { 
  AnimatedCounter
} from '@/components/ui/micro-interaction-components'

const phrases = [
  'Your trusted Kerala Guide',
  'Your local expert',
  'Your cultural storyteller',
  'Your adventure companion',
  'Your Kerala specialist'
]

export function HeroSection() {
  const locale = useLocale()
  const ref = useRef(null)
  const [typewriterText, setTypewriterText] = useState('')
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    const typingSpeed = isDeleting ? 50 : 100
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentPhrase.length) {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        }
      }
    }, typingSpeed)
    
    return () => clearTimeout(timeout)
  }, [typewriterText, currentPhraseIndex, isDeleting])

  return (
    <section ref={ref} className="pt-24 md:pt-32 lg:pt-36 pb-20 relative overflow-hidden">
      {/* Enhanced Background with Glassmorphism */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30" />
        {/* Floating ambient elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-r from-amber-400/15 to-orange-400/15 rounded-full blur-2xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -10, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-lg"
          animate={{
            rotate: [0, 360],
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            className="space-y-4 md:space-y-8"
            
            
            
          >
            {/* Professional Badge with Glassmorphism */}
            <div 
              className="inline-block mt-3 mb-3"
              
            >
              <div>
                <div className="glassmorphism-professional inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-50/90 via-white/80 to-emerald-50/90 border border-emerald-200/50 text-emerald-800 rounded-full text-sm md:text-base font-semibold shadow-xl backdrop-blur-sm hover:shadow-2xl hover:border-emerald-300/60 transition-all duration-300">
                  <Award className="w-5 h-5 md:w-6 md:h-6 mr-3 text-emerald-600" />
                  <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent font-bold">Certified Professional Tour Guide</span>
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 ml-3 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Mobile Jude Photo Section */}
            <div className="block lg:hidden mt-0 mb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-sm mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-500/10 z-10" />
                  <Image
                    src="/media/hero/Hero.jpeg"
                    alt="Jude - Professional Kerala Tour Guide"
                    width={300}
                    height={350}
                    className="object-cover w-full h-[300px] transition-transform duration-700"
                    priority
                  />
                  
                  {/* Mobile floating card with better spacing */}
                  <div className="absolute bottom-3 left-3 right-3 glassmorphism-professional p-3 rounded-xl shadow-2xl backdrop-blur-xl border border-white/30 bg-white/95">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">Jude - Kerala Guide</h3>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <span className="flex items-center text-emerald-600 font-medium">
                            <Award className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">12+ Years</span>
                          </span>
                          <span className="flex items-center text-amber-600 font-medium">
                            <Star className="w-3 h-3 mr-1 fill-current flex-shrink-0" />
                            <span className="truncate">4.9★</span>
                          </span>
                        </div>
                      </div>
                      {/* Online Status */}
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Heading */}
            <div 
              className="space-y-4"
              
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span
                  className="block text-gray-900 mb-2"
                >
                  Hi, I&apos;m Jude
                </span>
                <span 
                  className="block relative mb-3"
                >
                  <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-700" style={{ minHeight: '1.2em', display: 'inline-block' }}>
                    <span style={{ visibility: typewriterText ? 'visible' : 'hidden' }}>
                      {typewriterText || '\u00A0'}
                    </span>
                    <motion.span
                      className="inline-block w-1 h-8 md:h-10 lg:h-12 bg-emerald-600 ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      style={{ verticalAlign: 'baseline' }}
                    />
                  </span>
                </span>
                <span className="block text-gray-900 text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  in <span className="gradient-text-modern bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent font-bold">Kerala</span>
                </span>
              </h1>
              
              <p 
                className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-2xl"
              >
                Welcome to <span className="font-bold text-emerald-700">God&apos;s Own Country</span>! With over a decade of expertise, I transform your Kerala journey into an unforgettable tapestry of authentic experiences. From the tranquil <span className="italic text-teal-700 font-semibold">backwaters of Alleppey</span> to the <span className="italic text-teal-700 font-semibold">misty peaks of Munnar</span>, from ancient <span className="italic text-amber-700 font-semibold">temple rituals</span> to aromatic <span className="italic text-green-700 font-semibold">spice plantations</span> – I curate personalized adventures that reveal Kerala&apos;s hidden treasures and timeless traditions.
              </p>
            </div>

            {/* Enhanced Stats with Glassmorphism Cards */}
            <div
              
            >
              <div className="grid grid-cols-3 gap-3 lg:gap-6">
                <motion.div 
                  className="glassmorphism-card p-3 lg:p-6 text-center group hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-xl hover:bg-white/95"
                  whileHover={{ 
                    y: -8, 
                    rotateX: 5,
                    rotateY: 5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: 1000 }}
                >
                  <div className="text-xl lg:text-3xl font-bold text-emerald-600 mb-1 drop-shadow-sm">
                    <AnimatedCounter to={12} suffix="+" />
                  </div>
                  <div className="text-xs lg:text-sm text-gray-700 font-semibold">Years Experience</div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
                <motion.div 
                  className="glassmorphism-card p-3 lg:p-6 text-center group hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-xl hover:bg-white/95"
                  whileHover={{ 
                    y: -8, 
                    rotateX: 5,
                    rotateY: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(20, 184, 166, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: 1000 }}
                >
                  <div className="text-xl lg:text-3xl font-bold text-teal-600 mb-1 drop-shadow-sm">
                    <AnimatedCounter to={500} suffix="+" />
                  </div>
                  <div className="text-xs lg:text-sm text-gray-700 font-semibold">Happy Travelers</div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
                <motion.div 
                  className="glassmorphism-card p-3 lg:p-6 text-center group hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 bg-white/90 backdrop-blur-xl border-2 border-white/50 rounded-2xl shadow-xl hover:bg-white/95"
                  whileHover={{ 
                    y: -8, 
                    rotateX: -5,
                    rotateY: 5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: 1000 }}
                >
                  <div className="flex justify-center items-center space-x-1 mb-1">
                    <span className="text-xl lg:text-3xl font-bold text-amber-500 drop-shadow-sm">
                      <AnimatedCounter to={4.9} suffix="" />
                    </span>
                    <Star className="w-4 h-4 lg:w-6 lg:h-6 text-amber-400 fill-current animate-pulse drop-shadow-sm" />
                  </div>
                  <div className="text-xs lg:text-sm text-gray-700 font-semibold">Average Rating</div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced CTA Buttons with Professional Styling */}
            <div
              
            >
              <ButtonGroup className="items-center mb-6">
                <Link href={`/${locale}/contact`}>
                  <div
                  >
                    <HeroPrimaryButton className="group shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 glassmorphism-button">
                      <Users className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      View All Packages
                    </HeroPrimaryButton>
                  </div>
                </Link>
                <Link href={`/${locale}/contact`}>
                  <div
                  >
                    <HeroSecondaryButton className="group shadow-md hover:shadow-lg transition-all duration-300 glassmorphism-button-secondary">
                      Plan Your Journey
                      <div
                        className="ml-2"
                        
                      >
                        →
                      </div>
                    </HeroSecondaryButton>
                  </div>
                </Link>
              </ButtonGroup>
              <div className="text-center mt-4">
                <Link href={`/${locale}/contact`}>
                  <motion.button 
                    className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold text-lg group glassmorphism-link px-6 py-2 rounded-full backdrop-blur-sm border border-emerald-200/30 hover:border-emerald-300/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">Contact Jude</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </Link>
                <span className="mx-4 text-gray-400">or</span>
                <Link href={`/${locale}/contact#plan-your-journey`}>
                  <motion.button 
                    className="inline-flex items-center text-teal-700 hover:text-teal-800 font-semibold text-lg group glassmorphism-link px-6 py-2 rounded-full backdrop-blur-sm border border-teal-200/30 hover:border-teal-300/50 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More About Me
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Enhanced Trust Indicators with Glassmorphism */}
            <motion.div 
              className="glassmorphism-subtle p-4 lg:p-6 rounded-2xl bg-white/80 backdrop-blur-xl border-2 border-white/40 shadow-2xl hover:shadow-3xl hover:bg-white/90 transition-all duration-500"
              whileHover={{ 
                y: -4, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
              }}
              
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  
                >
                  <div 
                    className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                  >
                    <MapPin className="w-5 h-5 text-emerald-600 drop-shadow-sm" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-800 text-sm group-hover:text-emerald-900 transition-colors drop-shadow-sm">Kerala Tourism Certified</div>
                    <div className="text-xs text-gray-600 font-medium">Government Licensed</div>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  
                >
                  <div 
                    className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl group-hover:from-amber-200 group-hover:to-amber-300 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                  >
                    <Award className="w-5 h-5 text-amber-600 drop-shadow-sm" />
                  </div>
                  <div>
                    <div className="font-bold text-amber-800 text-sm group-hover:text-amber-900 transition-colors drop-shadow-sm">Licensed Professional</div>
                    <div className="text-xs text-gray-600 font-medium">Reg: KTD/2024/001234</div>
                  </div>
                </motion.div>
              </div>
              {/* Glass reflection effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
          </div>

          {/* Enhanced Hero Image with Professional Glassmorphism Effects */}
          <div 
            className="relative lg:order-first xl:order-last"
            
          >
            {/* Decorative background elements */}
            <div className="absolute -inset-8 opacity-40">
              <div 
                className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-2xl"
                
              />
              <div 
                className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full blur-2xl"
                
              />
              <div 
                className="absolute top-1/3 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl"
                
              />
            </div>
            
            <div className="relative">
              {/* Main image container with enhanced glassmorphism */}
              <div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-amber-500/5 z-10" />
                  <div
                    
                  >
                    <Image
                      src="/media/hero/Hero.jpeg"
                      alt="Jude - Professional Kerala Tour Guide"
                      width={600}
                      height={700}
                      className="object-cover w-full h-[500px] lg:h-[600px] xl:h-[650px] transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </div>
                  
                  {/* Enhanced overlay gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-emerald-500/5" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-amber-500/10" />
                  
                  {/* Professional floating card with enhanced glassmorphism */}
                  <div 
                    className="absolute bottom-6 left-6 right-6 glassmorphism-professional p-5 rounded-2xl shadow-xl backdrop-blur-md border border-white/20"
                    
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                        
                      >
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">Jude - Your Kerala Guide</h3>
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="flex items-center text-emerald-600 font-semibold">
                            <Award className="w-4 h-4 mr-1" />
                            <AnimatedCounter to={10} suffix="+ Years" />
                          </span>
                          <span className="flex items-center text-teal-600 font-semibold">
                            <Users className="w-4 h-4 mr-1" />
                            <AnimatedCounter to={500} suffix="+ Tours" />
                          </span>
                          <span className="flex items-center text-amber-600 font-semibold">
                            <Star className="w-4 h-4 mr-1 fill-current" />
                            Expert
                          </span>
                        </div>
                      </div>
                      {/* Online Status Indicator */}
                      <motion.div
                        className="w-3 h-3 bg-green-500 rounded-full shadow-lg"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating achievement badges with enhanced glassmorphism */}
              <motion.div 
                className="absolute -top-6 -right-6 glassmorphism-card p-3 rounded-xl shadow-2xl bg-white/95 backdrop-blur-xl border-2 border-white/50 hover:shadow-3xl"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 15px 30px rgba(16, 185, 129, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                
              >
                <div className="flex items-center space-x-2 text-emerald-600">
                  <ShieldCheck className="w-5 h-5 drop-shadow-sm" />
                  <span className="text-sm font-bold drop-shadow-sm">Verified</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/5 to-teal-400/5"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-6 glassmorphism-card p-3 rounded-xl shadow-2xl bg-white/95 backdrop-blur-xl border-2 border-white/50 hover:shadow-3xl"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -5,
                  boxShadow: "0 15px 30px rgba(245, 158, 11, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                
              >
                <div className="flex items-center space-x-2 text-amber-600">
                  <Star className="w-5 h-5 fill-current drop-shadow-sm animate-pulse" />
                  <span className="text-sm font-bold drop-shadow-sm">4.9 Rating</span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/5 to-orange-400/5"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
