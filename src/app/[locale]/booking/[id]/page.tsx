'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPackageById } from '@/lib/data/tours'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  MapPin,
  Shield,
  CreditCard,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Sparkles,
  Heart,
  Award,
  Plane,
  Car,
  Hotel,
  Utensils,
  Camera,
  Lock,
  AlertCircle,
  Info
} from 'lucide-react'
import { initiateRazorpayPayment } from '@/lib/payments/razorpay'
import { initiateDodoPayment } from '@/lib/payments/dodopayments'

interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  travelDate: string
  groupSize: number
  specialRequests: string
  selectedTier: number
  emergencyContact: string
  emergencyPhone: string
}

export default function BookingPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const [packageData, setPackageData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelDate: '',
    groupSize: 1,
    specialRequests: '',
    selectedTier: 0,
    emergencyContact: '',
    emergencyPhone: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'dodopayments'>('razorpay')
  const [isProcessing, setIsProcessing] = useState(false)

  // All useEffect hooks must be at the top level
  React.useEffect(() => {
    params.then(({ id }) => {
      const pkg = getPackageById(id)
      if (!pkg) {
        notFound()
        return
      }
      setPackageData(pkg)
      setLoading(false)
    })
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return notFound()
  }

  const pkg = packageData
  const selectedPricing = pkg.pricingTiers?.[formData.selectedTier] || { price: pkg.price, name: 'Standard Package' }
  const totalAmount = selectedPricing.price * formData.groupSize
  const advanceAmount = Math.round(totalAmount * 0.3) // 30% advance

  const steps = [
    { id: 1, title: 'Package Details', icon: Info },
    { id: 2, title: 'Travel Information', icon: Calendar },
    { id: 3, title: 'Payment', icon: CreditCard }
  ]

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    const customerDetails = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone
    }

    const onPaymentSuccess = (response: any) => {
      setIsProcessing(false)
      // In a real implementation, you would verify the payment on your backend
      console.log('Payment successful:', response)
      alert('🎉 Booking confirmed! You will receive a confirmation email shortly with your itinerary details.')
      // Redirect to success page or show success modal
    }

    const onPaymentError = (error: any) => {
      setIsProcessing(false)
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again or contact support.')
    }

    try {
      if (paymentMethod === 'razorpay') {
        await initiateRazorpayPayment(
          advanceAmount,
          customerDetails,
          onPaymentSuccess,
          onPaymentError
        )
      } else if (paymentMethod === 'dodopayments') {
        await initiateDodoPayment(
          {
            amount: advanceAmount,
            currency: 'INR',
            customerDetails,
            orderDetails: {
              orderId: `ORDER_${Date.now()}`,
              description: `${pkg.title} - Advance Payment`
            }
          },
          onPaymentSuccess,
          onPaymentError
        )
      }
    } catch (error) {
      onPaymentError(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-kerala-ivory via-white to-kerala-coconut relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-teal-50/30 to-cyan-50/40" />
        <motion.div
          className="absolute w-96 h-96 bg-emerald-200/15 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ top: '5%', left: '5%' }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-teal-200/15 rounded-full blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-lg shadow-emerald-500/5">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href={`/packages/${pkg.id}`}
              className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Package</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.id 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  {/* Package Overview */}
                  <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-emerald-50/20 pointer-events-none" />
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white relative">
                      <CardTitle className="text-2xl font-bold flex items-center">
                        <Sparkles className="w-6 h-6 mr-2" />
                        {pkg.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                          <Image
                            src={pkg.images?.[0] || '/placeholder.jpg'}
                            alt={pkg.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-emerald-600" />
                              <span>{pkg.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-5 h-5 text-emerald-600" />
                              <span>Kerala, India</span>
                            </div>
                          </div>
                          <p className="text-gray-700">{pkg.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.tags?.slice(0, 4).map((tag: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-emerald-100 text-emerald-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pricing Selection */}
                  {pkg.pricingTiers && pkg.pricingTiers.length > 0 && (
                    <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="w-6 h-6 mr-2 text-emerald-600" />
                          Choose Your Package Tier
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {pkg.pricingTiers?.map((tier: any, index: number) => (
                            <div
                              key={index}
                              onClick={() => handleInputChange('selectedTier', index)}
                              className={`p-3 sm:p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                                formData.selectedTier === index
                                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                                  : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                              }`}
                            >
                              <div className="text-center">
                                <h3 className="font-semibold text-base sm:text-lg mb-2">{tier.name}</h3>
                                {tier.popular && (
                                  <Badge className="bg-emerald-600 text-white mb-2 text-xs">Most Popular</Badge>
                                )}
                                <div className="text-xl sm:text-2xl font-bold text-emerald-600 mb-3">
                                  ₹{tier.price.toLocaleString()}
                                </div>
                                <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                                  {tier.features?.slice(0, 3).map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center justify-center">
                                      <CheckCircle className="w-3 h-3 text-emerald-600 mr-1 flex-shrink-0" />
                                      <span className="text-left">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg"
                    >
                      Continue to Travel Details
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  {/* Travel Information Form */}
                  <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="w-6 h-6 mr-2 text-emerald-600" />
                        Travel Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="travelDate">Travel Date *</Label>
                          <Input
                            id="travelDate"
                            type="date"
                            value={formData.travelDate}
                            onChange={(e) => handleInputChange('travelDate', e.target.value)}
                            className="mt-1"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="groupSize">Group Size *</Label>
                          <Select value={formData.groupSize.toString()} onValueChange={(value) => handleInputChange('groupSize', parseInt(value))}>
                            <SelectTrigger className="mt-1 bg-white border-gray-300 focus:border-emerald-500 focus:ring-emerald-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
                              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <SelectItem key={num} value={num.toString()} className="hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer px-3 py-2">
                                  {num} {num === 1 ? 'Person' : 'People'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                          <Input
                            id="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                          <Input
                            id="emergencyPhone"
                            type="tel"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="specialRequests">Special Requests or Dietary Requirements</Label>
                        <Textarea
                          id="specialRequests"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                          className="mt-1"
                          rows={4}
                          placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button 
                      onClick={handlePrevStep}
                      variant="outline"
                      className="px-8 py-3 rounded-xl"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg"
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.travelDate}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="w-6 h-6 mr-2 text-emerald-600" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                        <div
                          onClick={() => setPaymentMethod('razorpay')}
                          className={`p-3 sm:p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                            paymentMethod === 'razorpay'
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm sm:text-base">Razorpay</h3>
                              <p className="text-xs sm:text-sm text-gray-600">Credit/Debit Cards, UPI, Net Banking</p>
                            </div>
                            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                          </div>
                        </div>
                        <div
                          onClick={() => setPaymentMethod('dodopayments')}
                          className={`p-3 sm:p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                            paymentMethod === 'dodopayments'
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm sm:text-base">DodoPayments</h3>
                              <p className="text-xs sm:text-sm text-gray-600">International Cards & Digital Wallets</p>
                            </div>
                            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-amber-800">Payment Terms</h4>
                            <p className="text-sm text-amber-700 mt-1">
                              Pay 30% advance now to confirm your booking. Remaining amount can be paid 7 days before travel.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          onClick={handlePrevStep}
                          variant="outline"
                          className="px-8 py-3 rounded-xl"
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={handlePayment}
                          disabled={isProcessing}
                          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg"
                        >
                          {isProcessing ? 'Processing...' : `Pay ₹${advanceAmount.toLocaleString()} Now`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="space-y-4 lg:space-y-6">
            <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl sticky top-24 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{pkg.title}</h3>
                  <p className="text-gray-600 text-sm">{selectedPricing.name}</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Package Price</span>
                    <span>₹{selectedPricing.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Size</span>
                    <span>{formData.groupSize} {formData.groupSize === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Advance Payment (30%)</span>
                    <span>₹{advanceAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Remaining Amount</span>
                    <span>₹{(totalAmount - advanceAmount).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                {formData.travelDate && (
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span>Travel Date: {new Date(formData.travelDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Free Cancellation up to 48 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Instant Confirmation</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl shadow-emerald-500/10 rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-600" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">+91 8921384770</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm">bookings@keralatours.com</span>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Our travel experts are available 24/7 to assist you with your booking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
