'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from './skeleton'
import { Card, CardContent, CardHeader } from './card'

interface LoadingSkeletonProps {
  variant?: 'hero' | 'portfolio' | 'services' | 'card'
  count?: number
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderHeroSkeleton = () => (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <Skeleton className="h-12 w-96 mx-auto bg-white/20" />
        <Skeleton className="h-6 w-64 mx-auto bg-white/15" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32 bg-white/25" />
          <Skeleton className="h-12 w-32 bg-white/20" />
        </div>
      </div>
    </div>
  )

  const renderPortfolioSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className="glassmorphism-professional border-0 overflow-hidden">
            <Skeleton className="h-48 w-full bg-white/10" />
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-5 w-3/4 bg-white/15" />
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-2/3 bg-white/10" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderServicesSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className="glassmorphism-professional border-0 h-full">
            <CardHeader className="text-center">
              <Skeleton className="h-20 w-20 mx-auto rounded-2xl bg-white/20" />
              <Skeleton className="h-6 w-3/4 mx-auto bg-white/15" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-20 w-full bg-white/10" />
              <Skeleton className="h-4 w-32 mx-auto bg-white/15" />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  const renderCardSkeleton = () => (
    <Card className="glassmorphism-professional border-0">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 bg-white/15" />
        <Skeleton className="h-4 w-1/2 bg-white/10" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full bg-white/10" />
      </CardContent>
    </Card>
  )

  switch (variant) {
    case 'hero':
      return renderHeroSkeleton()
    case 'portfolio':
      return renderPortfolioSkeleton()
    case 'services':
      return renderServicesSkeleton()
    case 'card':
    default:
      return renderCardSkeleton()
  }
}

export default LoadingSkeleton