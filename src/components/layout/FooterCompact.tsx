'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Award, Clock, Heart, Sun, Palmtree, Waves } from 'lucide-react'
import { 
  FaFacebook, 
  FaWhatsapp,
  FaInstagram 
} from 'react-icons/fa'
import { motion } from 'framer-motion'

// Import our new aquatic animation
import { UnderwaterOceanAnimation } from '../ui/UnderwaterOceanAnimation'
import { WaterRipplesEffect } from '../ui/WaterRipples'
import { getSparklePosition, getExtraSparklePosition } from '@/lib/sparkle-positions'

export function FooterCompact() {
  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://www.facebook.com/judekpeter', 
      icon: FaFacebook,
      gradient: 'from-blue-600 to-blue-400',
      hoverScale: 1.2,
      followers: '8.2K'
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/919633475056', 
      icon: FaWhatsapp,
      gradient: 'from-green-500 to-green-400',
      hoverScale: 1.2,
      followers: 'Direct'
    },
    { 
      name: 'Instagram', 
      href: 'https://www.instagram.com/judekpeter/', 
      icon: FaInstagram,
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      hoverScale: 1.2,
      followers: 'Follow'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Packages', href: '/packages' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100
      }
    }
  }

  return (
    <footer className="relative z-20 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Vibrant Aquatic Animation Background */}
      <div className="absolute inset-0 opacity-85 pointer-events-none">
        <UnderwaterOceanAnimation />
        <WaterRipplesEffect />
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          
          {/* Brand & Quick Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white">Kerala Guide</h3>
                <p className="text-xs text-gray-400">Expert Tour Services</p>
              </div>
            </div>
            
            {/* Compact Contact Info */}
            <div className="space-y-2">
              <motion.a 
                href="tel:+919633475056" 
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-4 h-4" />
                <span>+91 9633475056</span>
              </motion.a>
              <motion.a 
                href="mailto:contact@tourguidejude.com"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-4 h-4" />
                <span>contact@tourguidejude.com</span>
              </motion.a>
              <motion.div 
                className="flex items-center space-x-2 text-sm text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Clock className="w-4 h-4" />
                <span>6AM - 10PM IST</span>
              </motion.div>
            </div>

            {/* Certification Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-lg px-3 py-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <div>
                <div className="text-xs font-medium text-white">Kerala Tourism</div>
                <div className="text-xs text-gray-400">Certified Guide</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links & Legal */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-emerald-400 transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Legal Links */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms
                </Link>
                <Link href="/sitemap" className="hover:text-emerald-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Social Media Grid */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h4>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: social.hoverScale }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`
                    relative w-full aspect-square rounded-xl
                    bg-gradient-to-br ${social.gradient}
                    flex flex-col items-center justify-center
                    shadow-lg transform transition-all duration-300
                    group-hover:shadow-2xl group-hover:shadow-${social.gradient.split('-')[1]}-500/50
                  `}>
                    <social.icon className="w-6 h-6 text-white mb-1" />
                    <span className="text-xs text-white/90 font-medium">{social.followers}</span>
                    
                    {/* Pulse effect on hover */}
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradient}
                      opacity-0 group-hover:opacity-50 animate-pulse
                    `}></div>
                  </div>
                </motion.a>
              ))}
            </div>
            
            {/* Location Badge */}
            <motion.div 
              className="flex items-center space-x-2 text-sm text-gray-400 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Kochi, Kerala - God&apos;s Own Country</span>
            </motion.div>

            {/* Elegant Kerala Tour Quote */}
            <motion.div
              className="text-center mt-6 p-4 glass-dark rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.blockquote 
                className="text-sm italic text-gray-300 mb-2"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(34, 197, 94, 0.3)",
                    "0 0 15px rgba(34, 197, 94, 0.5)", 
                    "0 0 10px rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                &ldquo;Kerala is not just a destination, it&apos;s a feeling that stays with you forever.&rdquo;
              </motion.blockquote>
              <motion.div 
                className="text-xs text-emerald-400 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Jude K Peter
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Kerala Guide | Reg. No: KTD/2024/001234 | 
            <span className="text-yellow-400 ml-1">★ 4.9/5</span> from 500+ travelers
          </p>
        </motion.div>

        {/* Tropical "Created By" Section */}
        <motion.div 
          className="border-t border-gray-800/50 mt-6 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col items-center space-y-3">
            {/* Tropical Icons Row */}
            <div className="flex items-center space-x-4">
              <motion.div
                className="footer-icon"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Heart className="w-5 h-5 text-red-400 fill-current" />
              </motion.div>
              
              <motion.div
                className="footer-icon"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Sun className="w-6 h-6 text-yellow-400" />
              </motion.div>

              <motion.div
                className="footer-icon"
                animate={{ 
                  y: [0, -2, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Waves className="w-6 h-6 text-blue-400" />
              </motion.div>

              <motion.div
                className="footer-icon"
                animate={{ 
                  x: [0, 2, -2, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Palmtree className="w-6 h-6 text-green-400" />
              </motion.div>
            </div>

            {/* Elegant Sparkly Created By Text */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="https://sharvinzlife.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer group relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Vibrant floating sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${5 + (i * 8)}%`,
                        top: `${10 + Math.sin(i * 0.8) * 40}%`,
                        width: i % 3 === 0 ? '4px' : i % 3 === 1 ? '3px' : '2px',
                        height: i % 3 === 0 ? '4px' : i % 3 === 1 ? '3px' : '2px',
                        background: i % 5 === 0 
                          ? 'rgba(236, 72, 153, 1)' 
                          : i % 5 === 1 
                          ? 'rgba(59, 130, 246, 1)' 
                          : i % 5 === 2
                          ? 'rgba(34, 197, 94, 1)'
                          : i % 5 === 3
                          ? 'rgba(168, 85, 247, 1)'
                          : 'rgba(6, 182, 212, 1)',
                        boxShadow: `0 0 ${i % 3 === 0 ? '15px' : '10px'} currentColor`
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                        x: [0, Math.sin(i) * 8, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Additional moving sparkles */}
                  {[...Array(8)].map((_, i) => {
                    const position = getExtraSparklePosition(i);
                    return (
                      <motion.div
                        key={`extra-${i}`}
                        className="absolute"
                        style={{
                          left: `${position.left}%`,
                          top: `${position.top}%`,
                          width: '3px',
                          height: '3px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)'
                        }}
                        animate={{
                          opacity: [0, 0.8, 0],
                          scale: [0, 0.8, 0],
                          rotate: [0, 180],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeInOut"
                        }}
                      />
                    );
                  })}
                </div>

                <motion.div 
                  className="text-sm text-gray-300 flex flex-wrap items-center justify-center gap-1 relative"
                  whileHover={{
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.8)"
                  }}
                >
                  <motion.span
                    className="font-medium text-gray-200"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    animate={{
                      textShadow: [
                        "0 0 15px rgba(59, 130, 246, 0.6)",
                        "0 0 25px rgba(34, 197, 94, 0.7)",
                        "0 0 20px rgba(168, 85, 247, 0.6)",
                        "0 0 15px rgba(6, 182, 212, 0.6)",
                        "0 0 15px rgba(59, 130, 246, 0.6)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Site crafted with elegant vibes by Former Tour Guide, Tech Evangelist & Web Developer 💻{' '}
                  </motion.span>
                  
                  <motion.span
                    className="font-black text-sm tracking-wider"
                    style={{ 
                      fontFamily: 'Orbitron, monospace',
                      background: 'linear-gradient(45deg, #00ff41, #00d4aa, #0099ff, #6c5ce7, #fd79a8, #fdcb6e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 8px rgba(0, 255, 65, 0.5))',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em'
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      textShadow: [
                        "0 0 20px rgba(0, 255, 65, 0.8)",
                        "0 0 25px rgba(0, 212, 170, 0.8)",
                        "0 0 30px rgba(0, 153, 255, 0.8)",
                        "0 0 25px rgba(108, 92, 231, 0.8)",
                        "0 0 20px rgba(253, 121, 168, 0.8)"
                      ]
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      textShadow: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                    whileHover={{
                      scale: 1.08,
                      textShadow: "0 0 35px rgba(0, 255, 65, 1)",
                      filter: 'drop-shadow(0 0 15px rgba(0, 255, 65, 0.8))'
                    }}
                  >
                    SHARVIN
                  </motion.span>

                  {/* Subtle shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                      background: [
                        'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0.1) 50%, transparent 55%, transparent 100%)',
                        'linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255, 255, 255, 0) 50%, transparent 55%, transparent 100%)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated Wave Border at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 animate-gradient"></div>
    </footer>
  )
}