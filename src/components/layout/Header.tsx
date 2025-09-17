'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, Phone, X, Home, User, Camera, Mail, Compass } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { StaticCoconutTree } from '../ui/StaticCoconutTree'
import { useState, useEffect } from 'react'
import { usePathname, useParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const t = useTranslations('nav')
  const brandingT = useTranslations('branding')
  const rawPhone = t('phone')
  const telHref = `tel:${rawPhone.replace(/[^+\d]/g, '')}`

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll for enhanced glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Use params.locale to get the current locale from URL to prevent hydration mismatch
  const currentLocale = (params.locale as string) || locale || 'en'
  
  const navigation: NavigationItem[] = [
    { name: t('home'), href: `/${currentLocale}`, icon: Home },
    { name: t('about'), href: `/${currentLocale}/about`, icon: User },
    { name: t('portfolio'), href: `/${currentLocale}/portfolio`, icon: Camera },
    { name: t('contact'), href: `/${currentLocale}/contact`, icon: Mail },
  ]

  // Check if current path matches navigation item
  const isActivePath = (href: string) => {
    if (href === `/${currentLocale}`) {
      return pathname === `/${currentLocale}` || pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 ease-out ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-3xl shadow-2xl border-b border-emerald-200/40' 
        : 'bg-white/12 backdrop-blur-2xl shadow-xl border-b border-white/25'
    }`} style={{ position: 'fixed', top: 0, zIndex: 50 }}>
      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Compact Logo Section */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-3 group relative">
            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500/15 via-teal-400/12 to-cyan-300/8 backdrop-blur-2xl rounded-2xl flex items-center justify-center shadow-lg border border-white/40 hover:scale-110 hover:rotate-6 transition-all duration-700 ease-out group-hover:shadow-emerald-500/30 group-hover:border-emerald-300/60 glassmorphism-coconut">
              <StaticCoconutTree size={32} className="text-emerald-600 filter drop-shadow-lg group" variant="small" />
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-teal-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Pulse ring on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-emerald-400/20 animate-ping"></div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-black bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent tracking-tight leading-none font-display">
                {brandingT('title')}
              </div>
              <div className="text-sm text-gray-700/90 font-semibold tracking-wide font-sans">
                {brandingT('subtitle')}
              </div>
            </div>
            {/* Mobile Brand Text */}
            <div className="block sm:hidden">
              <motion.div 
                className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-tight leading-none font-display"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                Tour Guide Jude
              </motion.div>
            </div>
          </Link>

          {/* Compact Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = isActivePath(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-base font-semibold transition-all duration-500 ease-out hover:scale-105 font-sans ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/25 via-teal-400/20 to-cyan-300/15 text-emerald-800 shadow-lg border border-emerald-200/60 backdrop-blur-2xl glassmorphism-spice'
                      : 'text-gray-800 hover:text-emerald-700 hover:bg-white/40 hover:shadow-lg hover:backdrop-blur-2xl'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-all duration-500 ${
                    isActive 
                      ? 'text-emerald-700 scale-110 drop-shadow-sm' 
                      : 'text-gray-700 group-hover:text-emerald-700 group-hover:scale-110 group-hover:drop-shadow-sm'
                  }`} />
                  <span className="relative font-sans tracking-tight">
                    {item.name}
                    {/* Enhanced active indicator */}
                    {isActive && (
                      <>
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
                        <div className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </span>
                  
                  {/* Enhanced hover glow effect */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-500 -z-10 ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-400/10 via-teal-400/8 to-cyan-400/6' 
                      : 'bg-gradient-to-r from-emerald-400/0 via-teal-400/0 to-cyan-400/0 group-hover:from-emerald-400/8 group-hover:via-teal-400/6 group-hover:to-cyan-400/4'
                  }`}></div>
                  
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Compact Right Side */}
          <div className="flex items-center space-x-3">
            {/* Compact Phone Button */}
            <a href={telHref} className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-cyan-50/50 to-teal-50/40 backdrop-blur-2xl px-3 py-2 rounded-xl border border-cyan-200/50 hover:scale-105 hover:shadow-lg hover:border-cyan-300/70 transition-all duration-500 hover:bg-gradient-to-r hover:from-cyan-100/60 hover:to-teal-100/50 group cursor-pointer glassmorphism-waves">
              <Phone className="w-4 h-4 text-teal-700 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              <span className="text-sm font-semibold text-teal-800 group-hover:text-teal-900 transition-colors duration-500 font-sans">
                {t('phone')}
              </span>
            </a>
            
            {/* Enhanced Language Switcher */}
            <div className="hover:scale-105 transition-transform duration-500">
              <LanguageSwitcher />
            </div>

            {/* Compact Mobile menu button */}
            <button
              type="button"
              className={`lg:hidden relative inline-flex items-center justify-center p-3 rounded-xl transition-all duration-500 hover:scale-110 backdrop-blur-2xl ${
                isMobileMenuOpen
                  ? 'bg-gradient-to-r from-red-500/25 to-orange-500/25 text-red-700 shadow-lg border border-red-200/60 glassmorphism-button'
                  : 'bg-white/40 text-gray-800 hover:text-emerald-700 hover:bg-emerald-50/60 hover:shadow-lg border border-white/30 hover:border-emerald-200/50'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                  isMobileMenuOpen ? 'opacity-0 rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${
                  isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-75'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Compact Mobile Navigation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-out ${
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/98 backdrop-blur-3xl border-t border-emerald-200/40 shadow-lg glassmorphism-professional">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = isActivePath(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-500 font-sans ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/25 via-teal-400/20 to-cyan-300/15 text-emerald-800 shadow-lg border border-emerald-200/60 glassmorphism-spice'
                      : 'text-gray-800 hover:text-emerald-700 hover:bg-white/60 hover:shadow-md'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className={`w-5 h-5 transition-all duration-500 ${
                    isActive 
                      ? 'text-emerald-700 scale-110 drop-shadow-sm' 
                      : 'text-gray-700 group-hover:text-emerald-700 group-hover:scale-110 group-hover:drop-shadow-sm'
                  }`} />
                  <span className="relative font-sans tracking-tight">
                    {item.name}
                    {/* Enhanced mobile active indicator */}
                    {isActive && (
                      <>
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full"></div>
                        <div className="absolute -bottom-1 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
                      </>
                    )}
                  </span>
                </Link>
              )
            })}
            
            {/* Compact Mobile Phone Section */}
            <div className="pt-3 mt-3 border-t border-gray-200/50">
              <a href={telHref} className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-50/50 to-teal-50/40 rounded-xl border border-cyan-200/50 glassmorphism-waves">
                <Phone className="w-5 h-5 text-teal-700" />
                <span className="text-base font-semibold text-teal-800 font-sans">
                  {t('phone')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
