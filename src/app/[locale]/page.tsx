import { HeroSectionSimple } from '@/components/sections/HeroSectionSimple'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ReadyToExploreSection } from '@/components/sections/ReadyToExploreSection'

export default function Home() {
  return (
    <>
      <HeroSectionSimple />
      <div className="cv-auto cis-800">
        <TestimonialsSection />
      </div>
      <div className="cv-auto cis-800">
        <ReadyToExploreSection />
      </div>
    </>
  )
}
