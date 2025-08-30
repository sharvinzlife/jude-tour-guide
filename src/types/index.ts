// Tour Package Types
export interface TourPackage {
  id: string
  title: string
  description: string
  image: string
  price: number
  originalPrice?: number
  duration: string
  category: string
  maxPeople: number
  rating: number
  reviewCount: number
  highlights: string[]
  itinerary: Itinerary[]
  inclusions: string[]
  exclusions: string[]
  bestTimeToVisit: string[]
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  destinations: string[]
  featured: boolean
  tags: string[]
  images: string[]
  pricingTiers?: PricingTier[]
}

export interface Itinerary {
  day: number
  title: string
  description: string
  activities: string[]
  meals: string[]
  accommodation?: string
  travelTime?: string
  highlights: string[]
}

export interface PricingTier {
  name: string
  price: number
  originalPrice?: number
  features: string[]
  popular?: boolean
}

// Portfolio Types
export interface PortfolioItem {
  id: string
  title: string
  location: string
  image: string
  description: string
  category: string
  date: string
}

// Contact Types
export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  tourPackage?: string
}

// Testimonial Types
export interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  image: string
  date: string
}

// Navigation Types
export interface NavItem {
  name: string
  href: string
  children?: NavItem[]
}

// Service Types
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

// Booking Types
export interface BookingForm {
  packageId: string
  name: string
  email: string
  phone: string
  numberOfPeople: number
  preferredDate: string
  specialRequests?: string
}

// Review Types
export interface Review {
  id: string
  packageId: string
  name: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

// Guide Profile Types
export interface GuideProfile {
  id: string
  name: string
  bio: string
  image: string
  experience: string
  languages: string[]
  specializations: string[]
  certifications: string[]
}

// FAQ Types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// Gallery Types
export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  location: string
  category: string
  description?: string
}