import { HeroSectionSimple } from '@/components/sections/HeroSectionSimple'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ReadyToExploreSection } from '@/components/sections/ReadyToExploreSection'
import { DestinationSearch } from '@/components/sections/DestinationSearch'

export default function Home() {
  return (
    <>
      <HeroSectionSimple />
      <DestinationSearch />
      <TestimonialsSection />
      <ReadyToExploreSection />
    </>
  )
}
