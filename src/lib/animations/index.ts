// Export all animation utilities and components
export * from '../animations'
export * from '../mobile-animations'

// Re-export commonly used components
export { AnimatedButton, KeralaButton, SpiceButton, FloatingButton, AsyncButton } from '@/components/ui/animated-button'
export { default as PageTransition } from '@/components/ui/page-transition'
// Animation exports - temporarily commented out for build
// export { 
//   LoadingSpinner, 
//   CoconutLoader, 
//   SpiceParticles, 
//   BackwaterRipples, 
//   HouseboatLoader, 
//   TeaLeafLoader,
//   LoadingOverlay,
//   SkeletonBox,
//   SkeletonText,
//   CardSkeleton,
//   ProgressIndicator
// } from '@/components/ui/loading-animations'
// export {
//   FloatingCoconut,
//   SwayingPalm,
//   SpiceParticleField,
//   BackwaterRipples as BackwaterRipplesComponent,
//   MonsoonRain,
//   TeaHills,
//   ElephantWalk,
//   KathakaliDancer,
//   SailingHouseboat,
//   KeralaAmbient
// } from '@/components/ui/kerala-animations'