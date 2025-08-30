'use client'

import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Award, 
  Star, 
  Clock, 
  ExternalLink,
  Heart,
  Shield,
  Zap
} from 'lucide-react'
import { UnderwaterOceanAnimation } from '../ui/UnderwaterOceanAnimation'
import { WaterRipplesEffect } from '../ui/WaterRipples'

export function Footer() {
  const quickLinks = [
    { name: 'About Us', href: '/about', icon: Heart },
    { name: 'Tour Packages', href: '/packages', icon: MapPin },
    { name: 'Portfolio', href: '/portfolio', icon: Star },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/tourguidejude', 
      icon: Facebook, 
      color: 'hover:text-blue-400',
      followers: '8.2K'
    },
  ]

  const contactItems = [
    {
      icon: MapPin,
      title: 'Location',
      primary: 'Kochi, Kerala',
      secondary: "God's Own Country, India",
      color: 'text-emerald-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      primary: '+91 8921384770',
      secondary: 'Available 24/7',
      color: 'text-blue-400'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'contact@tourguidejude.com',
      secondary: 'Quick Response',
      color: 'text-purple-400'
    },
    {
      icon: Clock,
      title: 'Hours',
      primary: 'Operating Hours',
      secondary: '6:00 AM - 10:00 PM IST',
      color: 'text-amber-400'
    }
  ]

  return (
    <footer className="footer relative">
      {/* Aquatic Background Animation */}
      <UnderwaterOceanAnimation />
      
      {/* Water Ripples Effect */}
      <WaterRipplesEffect />
      
      {/* Subtle gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-800/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Kerala Guide</h3>
                <p className="text-gray-400 text-sm">Your Trusted Kerala Explorer</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed max-w-md">
              Experience the authentic beauty of Kerala through the eyes of a certified professional guide. 
              From the tranquil backwaters of Alleppey to the misty hills of Munnar, discover Kerala&apos;s 
              hidden gems with personalized tours crafted just for you.
            </p>

            {/* Certifications */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center">
                <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                Certifications
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="glass-dark rounded-xl p-4 flex items-center space-x-3">
                  <Award className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Kerala Tourism Certified</div>
                    <div className="text-xs text-gray-400">Licensed Professional</div>
                  </div>
                </div>

                <div className="glass-dark rounded-xl p-4 flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div>
                    <div className="text-sm font-medium text-white flex items-center">
                      4.9/5 Rating
                    </div>
                    <div className="text-xs text-gray-400">500+ Happy Travelers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-emerald-400" />
              Contact Info
            </h3>
            
            <div className="space-y-4">
              {contactItems.map((item, index) => (
                <div key={index} className="footer-contact-item flex items-start space-x-3 p-3 rounded-lg group">
                  <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-1`} />
                  <div>
                    <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">
                      {item.primary}
                    </div>
                    <div className="text-gray-400 text-sm">{item.secondary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <ExternalLink className="w-5 h-5 mr-2 text-emerald-400" />
              Quick Links
            </h3>
            
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="footer-link flex items-center space-x-2 text-gray-300 hover:text-emerald-400 group p-2 rounded-md hover:bg-gray-800/30"
                >
                  <link.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                  <span>{link.name}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              ))}
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white flex items-center">
                <Heart className="w-4 h-4 mr-2 text-pink-400" />
                Connect With Us
              </h4>
              
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social flex items-center justify-between glass-dark rounded-lg p-3 hover:bg-gray-700/50 group"
                  >
                    <div className="flex items-center space-x-3">
                      <social.icon className={`w-5 h-5 text-gray-400 group-hover:text-white transition-colors ${social.color}`} />
                      <div>
                        <div className="text-white font-medium">{social.name}</div>
                        <div className="text-xs text-gray-400">{social.followers} followers</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">© 2024 Kerala Guide. All rights reserved.</p>
              <p className="text-sm text-gray-500 mt-1">
                Licensed by Kerala Tourism Department | Reg. No: KTD/2024/001234
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((text) => (
                <Link 
                  key={text}
                  href={`/${text.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="footer-link hover:text-emerald-400 relative group"
                >
                  {text}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Made with love indicator */}
          <div className="text-center mt-8 pt-4 border-t border-gray-800/50">
            <div className="text-gray-500 text-sm flex items-center justify-center space-x-2">
              <span>Crafted with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse fill-current" />
              <span>for Kerala&apos;s authentic experiences</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
