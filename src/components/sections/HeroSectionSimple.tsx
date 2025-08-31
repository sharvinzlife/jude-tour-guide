'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FloatingCoconutTrees, BackgroundCoconutTree } from '@/components/ui/StaticCoconutTree'
import { CSSMotion } from '@/components/ui/css-motion'
import StaggerContainer from '@/components/ui/stagger-container'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function HeroSectionSimple() {
  const locale = useLocale()
  const t = useTranslations('hero')
  const [typewriterText, setTypewriterText] = useState('')
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const phrases = [
    t('taglines.professional'),
    t('taglines.curator'),
    t('taglines.storyteller'),
    t('taglines.companion'),
    t('taglines.expert')
  ]
  
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    const typingSpeed = isDeleting ? 30 : 80
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentPhrase.length) {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2500)
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
  }, [typewriterText, currentPhraseIndex, isDeleting, phrases])

  return (
    <section className="min-h-screen lg:flex lg:items-center lg:justify-center relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-8 sm:pt-10 lg:pt-0">
      {/* Coconut Tree Background Effects */}
      <FloatingCoconutTrees className="z-0" />
      
      {/* Additional strategic coconut trees */}
      <BackgroundCoconutTree
        size={200}
        opacity={0.04}
        className="top-10 right-10 animate-float-slow delay-500"
        position="absolute"
      />
      <BackgroundCoconutTree
        size={150}
        opacity={0.06}
        className="bottom-20 left-20 animate-float-slow delay-1500"
        position="absolute"
      />
      <div className="hero-content relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <CSSMotion 
            className="space-y-4 lg:space-y-8"
            initial="opacity-0 -translate-x-12"
            animate="opacity-100 translate-x-0"
            transition={{ duration: 0.8 }}
          >
            {/* Professional Badge */}
            <motion.div
              className="inline-flex items-center mt-2 sm:mt-3 md:mt-4 lg:mt-6"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 260, damping: 20, delay: 0.05 }}
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2, rotate: 0.2 }}
                whileTap={{ scale: 0.98 }}
                animate={{ y: [0, -1.5, 0], scale: [1, 1.005, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Badge className="relative overflow-hidden bg-emerald-100 text-emerald-700 border-emerald-200 px-3 md:px-4 py-2 text-xs md:text-sm font-semibold shadow-sm ring-1 ring-emerald-300/40 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
                  ✨ {t('badge')}
                  {/* Shimmer sweep */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-120%', '130%'] }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2 }}
                  />
                </Badge>
              </motion.div>
            </motion.div>

            {/* Mobile Jude Photo Section */}
            <div className="block lg:hidden mt-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative max-w-sm mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
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
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xl p-3 rounded-xl shadow-2xl border-2 border-white/50">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 text-white font-bold text-sm">
                        J
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{t('profileCard.name')}</h3>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <span className="flex items-center text-emerald-600 font-medium">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1 flex-shrink-0"></span>
                            <span className="truncate">10+ {t('profileCard.yearsLabel')}</span>
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
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900 mb-2">{t('greeting')}</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text mb-3 tracking-wide min-h-[2.5rem] md:min-h-[3rem] lg:min-h-[4rem]">
                  <span className="inline-block drop-shadow-lg transition-all duration-100 ease-out">
                    {typewriterText}
                  </span>
                  <motion.span
                    className="inline-block w-1 h-8 md:h-10 lg:h-12 bg-gradient-to-b from-emerald-500 to-teal-600 ml-2 rounded-full shadow-lg"
                    animate={{ 
                      opacity: [1, 0, 1],
                      scaleY: [1, 0.9, 1]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-900">
                  {t('location')}
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
                <span className="font-bold text-emerald-700">{t('welcomeText')}</span> {t('description')}
              </p>
            </div>

            {/* Enhanced Stats Cards with 3D Effects */}
            <StaggerContainer className="grid grid-cols-3 gap-3 lg:gap-4">
              <motion.div 
                className="stat-card relative bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl group overflow-hidden"
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
                <div className="stat-number text-emerald-600 drop-shadow-lg">{t('stats.experience')}</div>
                <div className="stat-label font-semibold text-gray-700">{t('stats.experienceLabel')}</div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>
              
              <motion.div 
                className="stat-card relative bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl group overflow-hidden"
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
                <div className="stat-number text-teal-600 drop-shadow-lg">{t('stats.travelers')}</div>
                <div className="stat-label font-semibold text-gray-700">{t('stats.travelersLabel')}</div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>
              
              <motion.div 
                className="stat-card relative bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl group overflow-hidden"
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
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span className="stat-number text-amber-500 drop-shadow-lg">{t('stats.rating')}</span>
                  <Star className="w-6 h-6 lg:w-8 lg:h-8 text-amber-400 fill-current animate-pulse drop-shadow-lg" />
                </div>
                <div className="stat-label font-semibold text-gray-700">{t('stats.ratingLabel')}</div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>
            </StaggerContainer>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/packages`}>
                <Button size="lg" className="w-full sm:w-auto glassmorphism-button">
                  {t('cta.primary')} →
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto glassmorphism-button-secondary">
                  {t('cta.secondary')} ✨
                </Button>
              </Link>
            </div>
            
            {/* Additional Links */}
            <div className="flex items-center gap-4 mt-4">
              <Link href={`/${locale}/contact`}>
                <motion.button 
                  className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold text-lg group glassmorphism-link px-6 py-2 rounded-full backdrop-blur-sm border border-emerald-200/30 hover:border-emerald-300/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{t('cta.contact')}</span>
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
              <span className="text-gray-400">or</span>
              <Link href={`/${locale}/contact`}>
                <motion.button 
                  className="inline-flex items-center text-teal-700 hover:text-teal-800 font-semibold text-lg group glassmorphism-link px-6 py-2 rounded-full backdrop-blur-sm border border-teal-200/30 hover:border-teal-300/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta.learn')}
                </motion.button>
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-xl border-2 border-emerald-200/50 text-emerald-700 px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300 font-semibold">
                  <motion.span 
                    className="w-2 h-2 bg-emerald-500 rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  ></motion.span>
                  {t('badges.certified')}
                </Badge>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="secondary" className="bg-white/90 backdrop-blur-xl border-2 border-amber-200/50 text-amber-700 px-4 py-2 shadow-lg hover:shadow-xl hover:bg-white/95 transition-all duration-300 font-semibold">
                  <motion.span 
                    className="w-2 h-2 bg-amber-500 rounded-full mr-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  ></motion.span>
                  {t('badges.licensed')}
                </Badge>
              </motion.div>
            </div>
          </CSSMotion>

          {/* Hero Image - Hidden on Mobile */}
          <CSSMotion 
            className="relative hidden lg:block"
            initial="opacity-0 translate-x-12 scale-95"
            animate="opacity-100 translate-x-0 scale-100"
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative z-10">
              <Image
                src="/media/hero/Hero.jpeg"
                alt="Jude - Professional Kerala Tour Guide"
                width={600}
                height={700}
                className="rounded-2xl shadow-2xl"
                priority
              />
              
              {/* Enhanced Floating Info Card */}
              <div className="absolute -bottom-6 -left-6 right-6">
                <motion.div 
                  className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border-2 border-white/50 hover:shadow-3xl transition-all duration-500"
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(16, 185, 129, 0.2)"
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-emerald-700 mb-1 truncate drop-shadow-sm">{t('profileCard.name')}</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <span className="flex items-center font-medium">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="truncate">10+ {t('profileCard.yearsLabel')}</span>
                        </span>
                        <span className="flex items-center font-medium">
                          <Star className="w-3 h-3 mr-1 text-amber-500 fill-current flex-shrink-0" />
                          <span className="truncate">500+ {t('profileCard.toursLabel')}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl flex-shrink-0 animate-pulse">✨</div>
                  </div>
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                </motion.div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-secondary-200 to-accent-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
          </CSSMotion>
        </div>
      </div>
    </section>
  )
}