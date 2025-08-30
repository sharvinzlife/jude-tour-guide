'use client'

import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import ScrollAnimation from '@/components/ui/scroll-animation'

export function ReadyToExploreSection() {
  const locale = useLocale()
  const t = useTranslations('readyToExplore')

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Call to Action with Glassmorphism */}
        <ScrollAnimation variant="scale" delay={0.3}>
        <div className="text-center">
          <motion.div 
            className="bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
            }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-4 drop-shadow-sm">{t('title')}</h3>
            <p className="text-lg text-neutral-600 mb-6 font-medium">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact#plan-your-journey`}>
                <motion.button 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-emerald-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('buttons.packages')}
                </motion.button>
              </Link>
              <Link href={`/${locale}/contact#plan-your-journey`}>
                <motion.button 
                  className="bg-white/90 hover:bg-white text-emerald-600 hover:text-emerald-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('buttons.contact')}
                </motion.button>
              </Link>
            </div>
            {/* Glass reflection effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
            {/* Ambient glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-30"></div>
          </motion.div>
        </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}