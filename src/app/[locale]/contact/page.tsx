'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, Star, Shield, Award, Users, AlertCircle, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string
  email: string
  phone: string
  tourType: string
  travelDate: string
  groupSize: string
  budget: string
  message: string
}

const tourTypes = [
  'Backwater Tours',
  'Hill Station Tours',
  'Cultural Heritage Tours',
  'Wildlife Safari Tours',
  'Beach Tours',
  'Adventure Tours',
  'Photography Tours',
  'Honeymoon Packages',
  'Family Packages',
  'Custom Itinerary'
]

const budgetRanges = [
  'Under ₹5,000',
  '₹5,000 - ₹10,000',
  '₹10,000 - ₹20,000',
  '₹20,000 - ₹35,000',
  'Above ₹35,000'
]

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 9633475056'],
    action: 'tel:+919633475056',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    details: ['Quick Response'],
    action: 'https://wa.me/919633475056',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@tourguidejude.com'],
    action: 'mailto:contact@tourguidejude.com',
    color: 'from-purple-500 to-pink-500'
  }
]

const trustBadges = [
  { icon: Star, value: '4.9/5', label: 'Rating' },
  { icon: Users, value: '2000+', label: 'Travelers' },
  { icon: Award, value: 'Licensed', label: 'Guide' },
  { icon: Shield, value: '100%', label: 'Safe' }
]

export default function ContactPage() {
  const t = useTranslations('contactPage')
  const locale = useLocale()
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    tourType: '',
    travelDate: '',
    groupSize: '',
    budget: '',
    message: ''
  })

  // Auto-select tour type from sessionStorage when coming from package quote request
  useEffect(() => {
    const selectedTourType = sessionStorage.getItem('selectedTourType')
    if (selectedTourType) {
      // Convert kebab-case back to proper format
      const tourTypeMap: { [key: string]: string } = {
        'backwater-tours': 'Backwater Tours',
        'hill-station-tours': 'Hill Station Tours', 
        'cultural-heritage-tours': 'Cultural Heritage Tours',
        'wildlife-safari-tours': 'Wildlife Safari Tours',
        'beach-tours': 'Beach Tours',
        'adventure-tours': 'Adventure Tours',
        'photography-tours': 'Photography Tours',
        'honeymoon-packages': 'Honeymoon Packages',
        'family-packages': 'Family Packages'
      }
      
      const mappedTourType = tourTypeMap[selectedTourType] || 'Custom Itinerary'
      setFormData(prev => ({ ...prev, tourType: mappedTourType }))
      
      // Clear the sessionStorage after using it
      sessionStorage.removeItem('selectedTourType')
      
      // Scroll to the form section
      setTimeout(() => {
        const formSection = document.getElementById('plan-your-journey')
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})


  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = 'Name required'
    if (!formData.email.trim()) newErrors.email = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone required'
    if (!formData.message.trim()) newErrors.message = 'Message required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '', email: '', phone: '', tourType: '',
        travelDate: '', groupSize: '', budget: '', message: ''
      })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919633475056"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:bg-green-600 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
          <motion.div
            className="absolute w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ bottom: '10%', right: '10%' }}
          />
          <motion.div
            className="absolute w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Hero Section - Compact */}
        <section className="relative z-10 py-16 px-4">
          <motion.div 
            className="container mx-auto text-center max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-medium text-sm">{t('hero.badge')}</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.action}
                  target={item.action.startsWith('http') ? '_blank' : undefined}
                  rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group relative bg-white/80 backdrop-blur border border-white/50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.details[0]}</p>
                </motion.a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <badge.icon className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-800">{badge.value}</span>
                  <span className="text-gray-600 text-sm">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Main Contact Form - Compact and Enhanced */}
        <section className="relative z-10 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6 lg:p-8 relative overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-50" />
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Message Sent!</h3>
                        <p className="text-gray-600 mb-6">I&apos;ll get back to you within 2 hours.</p>
                        <Button
                          onClick={() => setIsSubmitted(false)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="mb-6" id="plan-your-journey">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('form.title')}</h2>
                          <p className="text-gray-600">{t('form.subtitle')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Name */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className={`mt-1 bg-white/50 backdrop-blur border-2 ${errors.name ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'} rounded-xl transition-all duration-300 hover:shadow-md`}
                              placeholder="Your name"
                              required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                          </motion.div>

                          {/* Email */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`mt-1 bg-white/50 backdrop-blur border-2 ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'} rounded-xl transition-all duration-300 hover:shadow-md`}
                              placeholder="your@email.com"
                              required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                          </motion.div>

                          {/* Phone */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              className={`mt-1 bg-white/50 backdrop-blur border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'} rounded-xl transition-all duration-300 hover:shadow-md`}
                              placeholder="+91 1234567890"
                              required
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                          </motion.div>

                          {/* Tour Type - Fixed Dropdown */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="tourType" className="text-sm font-medium text-gray-700">Tour Type</Label>
                            <Select onValueChange={(value) => handleSelectChange('tourType', value)}>
                              <SelectTrigger className="mt-1 bg-white/50 backdrop-blur border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 hover:shadow-md hover:border-emerald-400 relative z-20">
                                <SelectValue placeholder="Select tour type" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-emerald-100 shadow-2xl rounded-xl max-h-[300px] overflow-y-auto z-50">
                                {tourTypes.map((type) => (
                                  <SelectItem 
                                    key={type} 
                                    value={type.toLowerCase().replace(/\s+/g, '-')}
                                    className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                                  >
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </motion.div>

                          {/* Travel Date */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="travelDate" className="text-sm font-medium text-gray-700">Travel Date</Label>
                            <Input
                              id="travelDate"
                              name="travelDate"
                              type="date"
                              value={formData.travelDate}
                              onChange={handleChange}
                              className="mt-1 bg-white/50 backdrop-blur border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 hover:shadow-md"
                            />
                          </motion.div>

                          {/* Group Size - Fixed Dropdown */}
                          <motion.div whileHover={{ scale: 1.01 }}>
                            <Label htmlFor="groupSize" className="text-sm font-medium text-gray-700">Group Size</Label>
                            <Select onValueChange={(value) => handleSelectChange('groupSize', value)}>
                              <SelectTrigger className="mt-1 bg-white/50 backdrop-blur border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 hover:shadow-md hover:border-emerald-400 relative z-20">
                                <SelectValue placeholder="Select group size" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-emerald-100 shadow-2xl rounded-xl z-50">
                                <SelectItem value="solo" className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200">Solo</SelectItem>
                                <SelectItem value="couple" className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200">Couple</SelectItem>
                                <SelectItem value="small" className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200">Small (3-6)</SelectItem>
                                <SelectItem value="large" className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200">Large (7+)</SelectItem>
                              </SelectContent>
                            </Select>
                          </motion.div>

                          {/* Budget - Fixed Dropdown */}
                          <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2">
                            <Label htmlFor="budget" className="text-sm font-medium text-gray-700">Budget (per person)</Label>
                            <Select onValueChange={(value) => handleSelectChange('budget', value)}>
                              <SelectTrigger className="mt-1 bg-white/50 backdrop-blur border-2 border-gray-200 focus:border-emerald-500 rounded-xl transition-all duration-300 hover:shadow-md hover:border-emerald-400 relative z-20">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-emerald-100 shadow-2xl rounded-xl z-50">
                                {budgetRanges.map((range) => (
                                  <SelectItem 
                                    key={range} 
                                    value={range}
                                    className="hover:bg-emerald-50 cursor-pointer transition-colors duration-200"
                                  >
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </motion.div>

                          {/* Message */}
                          <motion.div whileHover={{ scale: 1.01 }} className="md:col-span-2">
                            <Label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message *</Label>
                            <Textarea
                              id="message"
                              name="message"
                              rows={4}
                              value={formData.message}
                              onChange={handleChange}
                              className={`mt-1 bg-white/50 backdrop-blur border-2 ${errors.message ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'} rounded-xl transition-all duration-300 hover:shadow-md`}
                              placeholder="Tell me about your interests and preferences..."
                              required
                            />
                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                          </motion.div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                                Sending...
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <Send className="mr-2 w-5 h-5" />
                                Send Message
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Quick Actions Sidebar */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Emergency Contact */}
                <motion.div 
                  className="bg-red-50/80 backdrop-blur border-2 border-red-200 rounded-2xl p-4"
                  whileHover={{ scale: 1.02, borderColor: '#ef4444' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-red-700 flex items-center">
                      <AlertCircle className="mr-2 w-4 h-4" />
                      24/7 Support
                    </h3>
                    <Badge className="bg-red-100 text-red-700 text-xs">Emergency</Badge>
                  </div>
                  <a
                    href="tel:+919633475056"
                    className="block w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl text-center transition-colors duration-300"
                  >
                    <Phone className="inline mr-2 w-4 h-4" />
                    Call Now
                  </a>
                </motion.div>

                {/* Quick WhatsApp Messages */}
                <motion.div 
                  className="bg-emerald-50/80 backdrop-blur border-2 border-emerald-200 rounded-2xl p-4"
                  whileHover={{ scale: 1.02, borderColor: '#10b981' }}
                >
                  <h3 className="font-bold text-emerald-800 mb-3">Quick Inquiries</h3>
                  <div className="space-y-2">
                    {[
                      { text: 'Backwater Tours', emoji: '🚣' },
                      { text: 'Hill Stations', emoji: '🏔️' },
                      { text: 'Custom Package', emoji: '✨' }
                    ].map((item, index) => (
                      <motion.a
                        key={index}
                        href={`https://wa.me/919633475056?text=Hi! I'm interested in ${item.text}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-white hover:bg-emerald-100 border border-emerald-200 py-2 px-3 rounded-xl text-sm font-medium text-gray-700 transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <span className="mr-2">{item.emoji}</span>
                        {item.text}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Office Location */}
                <motion.div 
                  className="bg-white/80 backdrop-blur border-2 border-gray-200 rounded-2xl p-4"
                  whileHover={{ scale: 1.02, borderColor: '#9ca3af' }}
                >
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <MapPin className="mr-2 w-4 h-4 text-emerald-600" />
                    Visit Us
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">Fort Kochi, Kerala, India</p>
                  <a
                    href="https://maps.google.com/?q=Fort+Kochi+Kerala+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-xl text-center text-sm transition-colors duration-300"
                  >
                    Get Directions
                  </a>
                </motion.div>

                {/* Business Hours */}
                <motion.div 
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="font-bold text-emerald-800 mb-3 flex items-center">
                    <Clock className="mr-2 w-4 h-4" />
                    Available Hours
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mon - Sun</span>
                      <span className="font-medium text-gray-800">8AM - 10PM</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-emerald-200">
                      <p className="text-xs text-emerald-700 font-medium">
                        Average response: 30 minutes
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}