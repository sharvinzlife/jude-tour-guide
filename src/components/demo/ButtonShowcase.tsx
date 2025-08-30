'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  HeroPrimaryButton,
  HeroSecondaryButton,
  ServiceLearnMoreButton,
  ServiceBookNowButton,
  CallButton,
  EmailButton,
  ViewPortfolioButton,
  WatchVideoButton,
  ViewPackagesButton,
  BookNowButton,
  DownloadBrochureButton,
  ReviewButton,
  FloatingActionButton,
  SuccessButton,
  ButtonGroup,
  ResponsiveButton,
  SocialButton
} from '@/components/ui/kerala-buttons'

import {
  Users,
  Phone,
  Camera,
  PlayCircle,
  Star,
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  Award
} from 'lucide-react'

/**
 * Kerala Button Showcase Demo
 * 
 * A comprehensive demonstration of all the Kerala-themed button components
 * designed for the tour guide website. Shows all variants, sizes, and
 * interactive states with real-world usage examples.
 */
export function ButtonShowcase() {
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  const handleBookingDemo = () => {
    setBookingLoading(true)
    setTimeout(() => setBookingLoading(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Kerala Button Design System</h1>
        <p className="text-xl text-gray-600">Professional button components for the Kerala tour guide website</p>
      </div>

      {/* Core Button Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Core Button Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <h3 className="font-semibold text-gray-700">Default (Emerald)</h3>
            <Button>Default Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <h3 className="font-semibold text-gray-700">Gradient</h3>
            <Button variant="gradient">Gradient Button</Button>
            <Button variant="gradient" size="lg">Large Gradient</Button>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <h3 className="font-semibold text-gray-700">Sunset Theme</h3>
            <Button variant="sunset">Sunset Button</Button>
            <Button variant="sunset" size="lg">Large Sunset</Button>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <h3 className="font-semibold text-gray-700">Outline</h3>
            <Button variant="outline">Outline Button</Button>
            <Button variant="outline" size="lg">Large Outline</Button>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl space-y-4">
            <h3 className="font-semibold text-white">Glass Effect</h3>
            <Button variant="glass">Glass Button</Button>
            <Button variant="glass" size="lg">Large Glass</Button>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-xl space-y-4">
            <h3 className="font-semibold text-gray-700">Ghost & Link</h3>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Loading States</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-wrap gap-4">
            <Button loading={loading} onClick={handleLoadingDemo}>
              {loading ? 'Processing...' : 'Click for Loading Demo'}
            </Button>
            <Button variant="gradient" loading={loading} loadingText="Connecting...">
              Gradient Loading
            </Button>
            <Button variant="outline" loading={loading}>
              Outline Loading
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Hero Section CTAs</h2>
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-xl">
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Discover Kerala</h3>
            <p className="text-gray-600">Experience the magic with a professional guide</p>
            <ButtonGroup className="justify-center">
              <HeroPrimaryButton>
                <Users className="w-5 h-5 mr-2" />
                View Tour Packages
              </HeroPrimaryButton>
              <HeroSecondaryButton>
                Start Your Journey
              </HeroSecondaryButton>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Service Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Service Action Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold">Backwater Tours</h3>
            <p className="text-sm text-gray-600">Experience Kerala&apos;s famous backwaters</p>
            <ServiceLearnMoreButton>Learn More</ServiceLearnMoreButton>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center space-y-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold">Hill Stations</h3>
            <p className="text-sm text-gray-600">Explore misty mountains and tea gardens</p>
            <ServiceBookNowButton>Book Now</ServiceBookNowButton>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border text-center space-y-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold">Cultural Tours</h3>
            <p className="text-sm text-gray-600">Immerse in Kerala&apos;s rich heritage</p>
            <ServiceLearnMoreButton>Learn More</ServiceLearnMoreButton>
          </div>
        </div>
      </section>

      {/* Contact & Communication */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Contact & Communication</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <ButtonGroup className="justify-center">
            <CallButton>
              Call Now
            </CallButton>
            <EmailButton>
              Send Email
            </EmailButton>
            <BookNowButton loading={bookingLoading} onClick={handleBookingDemo}>
              Book Your Tour
            </BookNowButton>
          </ButtonGroup>
        </div>
      </section>

      {/* Media & Portfolio */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Media & Portfolio</h2>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-white">Kerala Photo Gallery</h3>
            <ButtonGroup className="justify-center">
              <ViewPortfolioButton>
                View Portfolio
              </ViewPortfolioButton>
              <WatchVideoButton>
                Watch Video Tour
              </WatchVideoButton>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Package & Booking */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Package & Booking</h2>
        <div className="bg-emerald-50 p-6 rounded-xl text-center space-y-4">
          <h3 className="text-xl font-semibold">Ready to Explore Kerala?</h3>
          <p className="text-gray-600">Choose from our curated tour packages</p>
          <ViewPackagesButton>
            Explore Tour Packages
          </ViewPackagesButton>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Button Sizes</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Icon Buttons</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="icon-sm" variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="default">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button size="icon-lg" variant="gradient">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Social Media Buttons</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-wrap gap-4">
            <SocialButton platform="whatsapp">
              <MessageCircle className="w-5 h-5" />
            </SocialButton>
            <SocialButton platform="instagram">
              <Camera className="w-5 h-5" />
            </SocialButton>
            <SocialButton platform="facebook">
              <Share2 className="w-5 h-5" />
            </SocialButton>
            <SocialButton platform="youtube">
              <PlayCircle className="w-5 h-5" />
            </SocialButton>
          </div>
        </div>
      </section>

      {/* Utility Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Utility Buttons</h2>
        <div className="bg-gray-50 p-6 rounded-xl">
          <div className="flex flex-wrap gap-4">
            <DownloadBrochureButton>
              Download Brochure
            </DownloadBrochureButton>
            <ReviewButton>
              Write Review
            </ReviewButton>
            <SuccessButton>
              <Star className="w-4 h-4 mr-2" />
              Booking Confirmed
            </SuccessButton>
          </div>
        </div>
      </section>

      {/* Responsive Demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Responsive Buttons</h2>
        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <p className="text-sm text-gray-600">These buttons adapt their size based on screen size:</p>
          <div className="flex flex-col space-y-4">
            <ResponsiveButton mobileSize="sm" desktopSize="lg" variant="gradient">
              Responsive Button
            </ResponsiveButton>
            <ResponsiveButton mobileSize="default" desktopSize="xl" variant="outline">
              Large Responsive Button
            </ResponsiveButton>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <FloatingActionButton>
        <Phone className="w-6 h-6" />
      </FloatingActionButton>
    </div>
  )
}
