'use client'

import { Sun, Waves, Mountain, Flower, Trees } from 'lucide-react'

interface StaticIconProps {
  size?: number
  className?: string
}
export function StaticSun({ size = 40, className = '' }: StaticIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-12 ${className}`}
      style={{ width: size, height: size }}
    >
      <Sun 
        size={size * 0.8} 
        className="text-yellow-500 drop-shadow-lg animate-gentle-pulse hover:text-yellow-400 transition-colors duration-500" 
      />
      
      {/* Subtle glow effect */}
      <div 
        className="absolute bg-yellow-400/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gentle-pulse"
        style={{ 
          width: size * 1.3, 
          height: size * 1.3,
        }}
      />
    </div>
  )
}

export function StaticWaves({ size = 40, className = '' }: StaticIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center transition-all duration-500 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
    >
      <Waves 
        size={size * 0.8} 
        className="text-blue-500 drop-shadow-lg animate-gentle-wave hover:text-blue-400 transition-colors duration-500" 
      />
      
      {/* Subtle wave effect */}
      <div 
        className="absolute bg-blue-400/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gentle-wave"
        style={{ 
          width: size * 1.3, 
          height: size * 1.3,
        }}
      />
    </div>
  )
}

export function StaticMountain({ size = 40, className = '' }: StaticIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center transition-all duration-500 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
    >
      <Mountain 
        size={size * 0.8} 
        className="text-green-600 drop-shadow-lg animate-gentle-sway hover:text-green-500 transition-colors duration-500" 
      />
      
      {/* Subtle mountain mist effect */}
      <div 
        className="absolute bg-green-400/15 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gentle-pulse"
        style={{ 
          width: size * 1.4, 
          height: size * 1.4,
        }}
      />
    </div>
  )
}

export function StaticFlower({ size = 40, className = '' }: StaticIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 ${className}`}
      style={{ width: size, height: size }}
    >
      <Flower 
        size={size * 0.8} 
        className="text-pink-500 drop-shadow-lg animate-gentle-bloom hover:text-pink-400 transition-colors duration-500" 
      />
      
      {/* Subtle flower bloom effect */}
      <div 
        className="absolute bg-pink-400/20 rounded-full blur-md opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gentle-bloom"
        style={{ 
          width: size * 1.2, 
          height: size * 1.2,
        }}
      />
    </div>
  )
}

export function StaticForest({ size = 40, className = '' }: StaticIconProps) {
  return (
    <div 
      className={`inline-flex items-center justify-center transition-all duration-500 hover:scale-110 ${className}`}
      style={{ width: size, height: size }}
    >
      <Trees 
        size={size * 0.8} 
        className="text-emerald-600 drop-shadow-lg animate-gentle-sway hover:text-emerald-500 transition-colors duration-500" 
      />
      
      {/* Subtle forest breeze effect */}
      <div 
        className="absolute bg-emerald-400/15 rounded-full blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500 animate-gentle-sway"
        style={{ 
          width: size * 1.4, 
          height: size * 1.4,
        }}
      />
    </div>
  )
}
