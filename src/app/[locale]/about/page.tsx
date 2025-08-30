import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Award, Users, MapPin, Star, Heart, Globe, Shield, CheckCircle, Phone, Palmtree, Camera } from 'lucide-react'
import ScrollAnimation from '@/components/ui/scroll-animation'
import StaggerContainer from '@/components/ui/stagger-container'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about.meta' })
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/media/hero/Hero.jpeg'],
      url: '/about'
    },
    alternates: {
      canonical: '/about'
    }
  }
}



export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const tStats = await getTranslations({ locale, namespace: 'about.stats' })
  const tIntro = await getTranslations({ locale, namespace: 'about.introduction' })
  const tExpertise = await getTranslations({ locale, namespace: 'about.expertise' })
  const tStory = await getTranslations({ locale, namespace: 'about.story' })
  const tTestimonials = await getTranslations({ locale, namespace: 'about.testimonials' })
  const tCta = await getTranslations({ locale, namespace: 'about.cta' })

  const stats = [
    { icon: Users, label: tStats('travelers.label'), value: tStats('travelers.value'), description: tStats('travelers.description') },
    { icon: MapPin, label: tStats('destinations.label'), value: tStats('destinations.value'), description: tStats('destinations.description') },
    { icon: Award, label: tStats('experience.label'), value: tStats('experience.value'), description: tStats('experience.description') },
    { icon: Star, label: tStats('rating.label'), value: tStats('rating.value'), description: tStats('rating.description') }
  ]

  const certifications = [
    { name: tIntro('certifications.items.tourism'), icon: Award, verified: true },
    { name: tIntro('certifications.items.firstAid'), icon: Shield, verified: true },
    { name: tIntro('certifications.items.wilderness'), icon: CheckCircle, verified: true },
    { name: tIntro('certifications.items.cultural'), icon: Globe, verified: true },
    { name: tIntro('certifications.items.photography'), icon: Camera, verified: true },
    { name: tIntro('certifications.items.hospitality'), icon: Heart, verified: true }
  ]

  const expertise = [
    {
      title: tExpertise('areas.localKnowledge.title'),
      description: tExpertise('areas.localKnowledge.description'),
      icon: MapPin,
      highlights: [
        tExpertise('areas.localKnowledge.highlights.0'),
        tExpertise('areas.localKnowledge.highlights.1'),
        tExpertise('areas.localKnowledge.highlights.2'),
        tExpertise('areas.localKnowledge.highlights.3')
      ]
    },
    {
      title: tExpertise('areas.personalized.title'),
      description: tExpertise('areas.personalized.description'),
      icon: Heart,
      highlights: [
        tExpertise('areas.personalized.highlights.0'),
        tExpertise('areas.personalized.highlights.1'),
        tExpertise('areas.personalized.highlights.2'),
        tExpertise('areas.personalized.highlights.3')
      ]
    },
    {
      title: tExpertise('areas.safety.title'),
      description: tExpertise('areas.safety.description'),
      icon: Shield,
      highlights: [
        tExpertise('areas.safety.highlights.0'),
        tExpertise('areas.safety.highlights.1'),
        tExpertise('areas.safety.highlights.2'),
        tExpertise('areas.safety.highlights.3')
      ]
    }
  ]

  const personalStory = {
    childhood: tStory('chapters.childhood.content'),
    inspiration: tStory('chapters.inspiration.content'),
    philosophy: tStory('chapters.philosophy.content'),
    commitment: tStory('chapters.commitment.content')
  }
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollAnimation variant="fadeUp" duration={1}>
        <section className="py-12 px-4 relative overflow-hidden">
          {/* Background with Kerala-themed gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                {t('hero.title')}
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </section>
        </ScrollAnimation>

        {/* Professional Introduction */}
        <ScrollAnimation variant="fadeUp" delay={0.2}>
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-6">
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-2 mb-4">
                  {tIntro('badge')}
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  {tIntro('title')}
                </h2>
                <div className="space-y-4 text-lg text-gray-700">
                  <p className="leading-relaxed">
                    {tIntro('paragraphs.greeting')}
                  </p>
                  <p className="leading-relaxed">
                    {tIntro('paragraphs.journey')}
                  </p>
                  <p className="leading-relaxed">
                    {tIntro('paragraphs.commitment')}
                  </p>
                  <p className="leading-relaxed font-semibold text-amber-700 text-xl">
                    &ldquo;{tIntro('paragraphs.quote')}&rdquo;
                  </p>
                </div>
                
                {/* Certifications */}
                <div className="bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-2xl p-6 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="mr-3 w-6 h-6 text-emerald-600" />
                    Certifications & Training
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <cert.icon size={16} className="text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{cert.name}</span>
                        {cert.verified && <CheckCircle size={14} className="text-emerald-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-2xl rounded-3xl p-6 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                      src="/media/hero/Hero.jpeg"
                      alt="Jude - Professional Kerala Tour Guide"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Jude Thomas</h3>
                    <p className="text-gray-600 mb-4">Certified Kerala Tour Guide</p>
                    <div className="flex justify-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">500+</div>
                        <div className="text-sm text-gray-600">Tours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">8+</div>
                        <div className="text-sm text-gray-600">Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl text-center p-8 rounded-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <stat.icon size={28} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </StaggerContainer>

            {/* Expertise Areas */}
            <div className="mb-20">
              <ScrollAnimation variant="textReveal" delay={0.1}>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Professional Expertise
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Jude?</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Experience Kerala through the eyes of a local expert who combines professional expertise with genuine passion for sharing our culture.
                </p>
              </div>
              </ScrollAnimation>
              <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {expertise.map((area, index) => (
                  <div key={index} className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-8 rounded-2xl hover:shadow-3xl hover:scale-105 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                      <area.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{area.title}</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed">{area.description}</p>
                    <ul className="space-y-2">
                      {area.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle size={14} className="text-emerald-500 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </StaggerContainer>
            </div>

            {/* Personal Story Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Personal Journey
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">My Story</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From village roots to professional guiding - discover the journey that shaped my passion for sharing Kerala&apos;s beauty.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-8 rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <Palmtree size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Village Roots</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed relative z-10">{personalStory.childhood}</p>
                </div>
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-8 rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <Star size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">The Spark</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed relative z-10">{personalStory.inspiration}</p>
                </div>
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-8 rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <Heart size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">My Philosophy</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed relative z-10">{personalStory.philosophy}</p>
                </div>
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-8 rounded-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                      <Shield size={20} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">My Commitment</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed relative z-10">{personalStory.commitment}</p>
                </div>
              </div>
            </div>



            {/* Call to Action */}
            {/* Why Travelers Choose Jude - Testimonial Preview */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
                  Client Testimonials
                </Badge>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">What Travelers Say</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Hear from some of the amazing people who&apos;ve experienced Kerala with me.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-6 rounded-xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">SM</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Sarah Miller</h4>
                      <p className="text-sm text-gray-600">UK</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    &ldquo;Jude showed us a Kerala that guidebooks can&apos;t capture. His knowledge, warmth, and genuine care made our trip extraordinary.&rdquo;
                  </p>
                </div>
                <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-6 rounded-xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">RK</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Raj Kumar</h4>
                      <p className="text-sm text-gray-600">USA</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    &ldquo;Professional, knowledgeable, and incredibly passionate. Jude&apos;s tours are experiences, not just sightseeing trips.&rdquo;
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur border-0 shadow-lg p-6 rounded-xl md:col-span-2 lg:col-span-1">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">ML</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">Maria Lopez</h4>
                      <p className="text-sm text-gray-600">Spain</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    &ldquo;We felt like we were exploring with a dear friend who happened to know everything about Kerala. Absolutely magical!&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-white/95 backdrop-blur-xl border-2 border-white/50 shadow-2xl p-12 rounded-3xl max-w-4xl mx-auto hover:shadow-3xl hover:scale-[1.01] transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Ready for Your Kerala Adventure?
                </h2>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Let&apos;s create unforgettable memories together. Contact me today to start planning your personalized Kerala experience.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                    <Phone size={24} className="mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium text-gray-700">24/7 Support</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                    <Shield size={24} className="mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium text-gray-700">Fully Licensed</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                    <Heart size={24} className="mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium text-gray-700">Personalized</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
                    <Star size={24} className="mx-auto mb-2 text-emerald-600" />
                    <p className="text-sm font-medium text-gray-700">4.9★ Rated</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 w-full sm:w-auto">
                      <Phone className="mr-2 w-5 h-5" />
                      Contact Jude
                    </Button>
                  </Link>
                  <Link href="/packages">
                    <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 w-full sm:w-auto">
                      View Tour Packages
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollAnimation>
      </div>
    </>
  )
}
