"use client"

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          {/* Gallery skeleton */}
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-[16/10] w-full rounded-2xl bg-white/70 backdrop-blur border border-gray-200" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-gray-200/70" />
              ))}
            </div>
            <div className="h-8 bg-gray-200/70 rounded w-2/3" />
            <div className="h-5 bg-gray-200/70 rounded w-full" />
            <div className="h-5 bg-gray-200/70 rounded w-5/6" />
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <div className="h-8 bg-gray-200/70 rounded w-1/2" />
              <div className="mt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200/70 rounded-xl" />
                ))}
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-12 bg-gray-200/70 rounded-xl" />
                <div className="h-12 bg-gray-200/70 rounded-xl" />
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-6">
              <div className="h-6 bg-gray-200/70 rounded w-1/3" />
              <div className="mt-4 space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-200/70 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

