"use client"

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          {/* Hero skeleton */}
          <div className="h-64 sm:h-80 md:h-96 w-full rounded-3xl bg-white/70 backdrop-blur border border-gray-200" />

          {/* Filters skeleton */}
          <div className="mt-8 rounded-3xl bg-white/70 backdrop-blur border border-gray-200 p-6">
            <div className="h-10 bg-gray-200/70 rounded-xl w-3/4 mx-auto" />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-9 bg-gray-200/70 rounded-xl" />
              ))}
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4">
                <div className="h-40 bg-gray-200/70 rounded-xl" />
                <div className="mt-4 h-5 bg-gray-200/70 rounded w-2/3" />
                <div className="mt-2 h-4 bg-gray-200/70 rounded w-1/2" />
                <div className="mt-4 h-10 bg-gray-200/70 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

