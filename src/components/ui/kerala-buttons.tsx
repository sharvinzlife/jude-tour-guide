'use client'

import { Button } from './button'
import { 
  ArrowRight, 
  Users, 
  MapPin, 
  Star, 
  Camera, 
  Phone,
  Mail,
  Download,
  PlayCircle,
  Calendar,
  ChevronRight
} from 'lucide-react'

/**
 * Kerala Button Showcase Component
 * 
 * Demonstrates professional button designs for the Kerala tour guide website:
 * - Hero CTA buttons with hover animations
 * - Service action buttons
 * - Contact and booking buttons
 * - Loading states and interactive feedback
 * 
 * Features:
 * - Emerald/teal Kerala color scheme
 * - Professional hover effects with scale transforms
 * - Shadow animations for depth
 * - Loading spinner states
 * - Accessibility-friendly focus rings
 * - Mobile-responsive sizing
 */

// Hero Section CTA Buttons
export function HeroPrimaryButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="lg"
      variant="gradient"
      className="group"
      {...props}
    >
      {children}
      <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
    </Button>
  )
}

export function HeroSecondaryButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      size="lg"
      variant="outline"
      className="group border-emerald-600 text-emerald-600 hover:bg-emerald-50"
      {...props}
    >
      {children}
    </Button>
  )
}

// Service Action Buttons
export function ServiceLearnMoreButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="group text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 h-auto"
      {...props}
    >
      {children}
      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
    </Button>
  )
}

export function ServiceBookNowButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="default"
      size="sm"
      className="group bg-emerald-600 hover:bg-emerald-700"
      {...props}
    >
      <Calendar className="w-4 h-4 mr-2" />
      {children}
    </Button>
  )
}

// Contact & Communication Buttons
export function CallButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="sunset"
      size="lg"
      className="group"
      {...props}
    >
      <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
      {children}
    </Button>
  )
}

export function EmailButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outline"
      size="lg"
      className="group"
      {...props}
    >
      <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
      {children}
    </Button>
  )
}

// Portfolio & Media Buttons
export function ViewPortfolioButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="glass"
      size="lg"
      className="group backdrop-blur-md"
      {...props}
    >
      <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
      {children}
    </Button>
  )
}

export function WatchVideoButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="lg"
      className="group text-white hover:bg-white/10 backdrop-blur-sm"
      {...props}
    >
      <PlayCircle className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-300" />
      {children}
    </Button>
  )
}

// Package & Booking Buttons
export function ViewPackagesButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="default"
      size="xl"
      className="group font-semibold"
      {...props}
    >
      <Users className="w-6 h-6 mr-2" />
      {children}
      <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
    </Button>
  )
}

export function BookNowButton({ 
  loading = false, 
  children, 
  ...props 
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button
      variant="gradient"
      size="lg"
      loading={loading}
      loadingText="Booking..."
      className="group font-semibold"
      {...props}
    >
      {!loading && <MapPin className="w-5 h-5 mr-2" />}
      {children}
    </Button>
  )
}

// Download & Resources
export function DownloadBrochureButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="secondary"
      size="default"
      className="group"
      {...props}
    >
      <Download className="w-4 h-4 mr-2 group-hover:translate-y-1 transition-transform duration-300" />
      {children}
    </Button>
  )
}

// Rating & Review Button
export function ReviewButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="group text-amber-600 hover:text-amber-700 hover:bg-amber-50"
      {...props}
    >
      <Star className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
      {children}
    </Button>
  )
}

// Floating Action Button
export function FloatingActionButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="gradient"
      size="icon-lg"
      className="fixed bottom-6 right-6 z-50 shadow-2xl hover:shadow-3xl shadow-emerald-500/25 hover:shadow-emerald-500/40 rounded-full"
      {...props}
    >
      {children}
    </Button>
  )
}

// Success/Confirmation Button
export function SuccessButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="default"
      className="bg-green-600 hover:bg-green-700 hover:shadow-xl hover:shadow-green-500/25"
      {...props}
    >
      {children}
    </Button>
  )
}

// Button Group for related actions
interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
}
export function ButtonGroup({ children, className = '' }: ButtonGroupProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className}`}>
      {children}
    </div>
  )
}

// Responsive button wrapper that adjusts size based on screen
export function ResponsiveButton({ 
  children, 
  mobileSize = "default",
  desktopSize = "lg",
  ...props 
}: React.ComponentProps<typeof Button> & {
  mobileSize?: "sm" | "default" | "lg" | "xl"
  desktopSize?: "sm" | "default" | "lg" | "xl"
}) {
  return (
    <Button
      size={mobileSize}
      className={`sm:h-auto ${desktopSize === 'lg' ? 'sm:h-12 sm:px-8 sm:text-base sm:font-semibold' : ''} ${desktopSize === 'xl' ? 'sm:h-14 sm:px-10 sm:text-lg sm:font-semibold sm:rounded-xl' : ''}`}
      {...props}
    >
      {children}
    </Button>
  )
}

// Kerala-themed icon buttons for social media
export function SocialButton({ children, platform, ...props }: React.ComponentProps<typeof Button> & { platform?: string }) {
  const platformColors = {
    whatsapp: "hover:bg-green-50 hover:text-green-600",
    instagram: "hover:bg-pink-50 hover:text-pink-600", 
    facebook: "hover:bg-blue-50 hover:text-blue-600",
    youtube: "hover:bg-red-50 hover:text-red-600"
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`group transition-all duration-300 ${platform ? platformColors[platform as keyof typeof platformColors] : ''}`}
      {...props}
    >
      {children}
    </Button>
  )
}
