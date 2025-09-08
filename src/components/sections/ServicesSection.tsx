'use client'

import { Waves, Mountain, TreePine, Camera, MapPin, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import ScrollAnimation from '@/components/ui/scroll-animation'
import StaggerContainer from '@/components/ui/stagger-container'

export function ServicesSection() {
  const locale = useLocale()
  const services = [
    {
      icon: Waves,
      title: "Backwater Tours",
      description: "Experience Kerala's famous backwaters on traditional houseboats through serene canals and lagoons.",
      color: "text-blue-600",
      bgColor: "from-blue-100 to-cyan-100",
    },
    {
      icon: Mountain,
      title: "Hill Station Adventures", 
      description: "Explore the misty mountains of Munnar with tea plantations, waterfalls, and breathtaking views.",
      color: "text-green-600",
      bgColor: "from-green-100 to-emerald-100",
    },
    {
      icon: TreePine,
      title: "Wildlife Safaris",
      description: "Discover Kerala's rich wildlife in national parks and spot elephants, tigers, and exotic birds.",
      color: "text-emerald-600",
      bgColor: "from-emerald-100 to-green-100",
    },
    {
      icon: Camera,
      title: "Cultural Heritage Tours",
      description: "Visit ancient temples, traditional villages, and experience authentic Kerala culture and cuisine.",
      color: "text-orange-600",
      bgColor: "from-orange-100 to-amber-100",
    },
    {
      icon: MapPin,
      title: "Beach Escapes",
      description: "Relax on pristine beaches of Kovalam and Varkala with golden sands and clear waters.",
      color: "text-cyan-600", 
      bgColor: "from-cyan-100 to-blue-100",
    },
    {
      icon: Users,
      title: "Group Packages",
      description: "Customized tour packages for families and groups with personalized itineraries.",
      color: "text-purple-600",
      bgColor: "from-purple-100 to-pink-100",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollAnimation variant="textReveal">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center">
            <span className="badge badge-accent badge-lg">✨ Authentic Kerala Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Discover <span className="text-primary-gradient">God&apos;s Own Country</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From tranquil backwaters to misty mountains, experience the diverse beauty of God&apos;s Own Country 
            with personalized tours designed just for you.
          </p>
        </div>
        </ScrollAnimation>

        {/* Enhanced Services Grid with 3D Effects */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div 
                key={index} 
                className="service-card group relative bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl hover:shadow-3xl overflow-hidden"
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  rotateY: index % 2 === 0 ? 5 : -5,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
              >
                <motion.div 
                  className={`service-icon bg-gradient-to-br ${service.bgColor} shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className={`w-6 h-6 ${service.color} drop-shadow-sm`} />
                </motion.div>
                <h2 className="text-xl font-bold text-neutral-900 mb-3 drop-shadow-sm">{service.title}</h2>
                <p className="text-neutral-600 leading-relaxed mb-4 font-medium">{service.description}</p>
                <div className="flex justify-end">
                  <Link href={`/${locale}/contact#plan-your-journey`}>
                    <motion.button 
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold text-sm group-hover:text-emerald-700 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-emerald-50"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </motion.button>
                  </Link>
                </div>
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Glass reflection effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
              </motion.div>
            )
          })}
        </StaggerContainer>

        {/* Enhanced Call to Action with Glassmorphism */}
        <ScrollAnimation variant="scale" delay={0.3}>
        <div className="text-center mt-16">
          <motion.div 
            className="bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
            whileHover={{ 
              y: -5, 
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.15)"
            }}
          >
            <h2 className="text-2xl font-bold text-neutral-900 mb-4 drop-shadow-sm">Ready to Explore Kerala?</h2>
            <p className="text-lg text-neutral-600 mb-6 font-medium">
              Let me create a personalized itinerary that matches your interests and budget. 
              Contact me today to start planning your unforgettable Kerala adventure!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact#plan-your-journey`}>
                <motion.button 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-emerald-500/20"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Packages
                </motion.button>
              </Link>
              <Link href={`/${locale}/contact#plan-your-journey`}>
                <motion.button 
                  className="bg-white/90 hover:bg-white text-emerald-600 hover:text-emerald-700 font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border-2 border-emerald-200 hover:border-emerald-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Jude
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
