'use client'

import { useEffect, useRef } from 'react'
import { ClientWrapper } from './ClientWrapper'

// Simple CSS-based aquatic particles
function SimpleAquaticParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Create different types of particles with more vibrant colors
    const particleTypes = [
      { type: 'bubble', count: 40, size: '5px', color: 'rgba(59, 130, 246, 0.9)', speed: 8 },
      { type: 'fish', count: 12, size: '8px', color: 'rgba(34, 197, 94, 1)', speed: 12 },
      { type: 'seaweed', count: 20, size: '6px', color: 'rgba(168, 85, 247, 0.9)', speed: 3 },
      { type: 'pearl', count: 10, size: '10px', color: 'rgba(6, 182, 212, 1)', speed: 6 },
      { type: 'coral', count: 15, size: '6px', color: 'rgba(99, 102, 241, 0.9)', speed: 4 }
    ]

    particleTypes.forEach(({ type, count, size, color, speed }) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div')
        particle.className = `particle particle-${type}`
        particle.style.cssText = `
          position: absolute;
          width: ${size};
          height: ${size};
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float-${type} ${speed + Math.random() * 4}s infinite linear;
          animation-delay: ${Math.random() * 5}s;
          box-shadow: 0 0 25px ${color}, 0 0 50px ${color};
        `
        
        // Special styling for different types with enhanced glow
        if (type === 'fish') {
          particle.style.borderRadius = '50% 0 50% 0'
          particle.style.transform = 'rotate(45deg)'
          particle.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`
        } else if (type === 'seaweed') {
          particle.style.borderRadius = '0'
          particle.style.width = '3px'
          particle.style.height = '15px'
          particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`
        } else if (type === 'coral') {
          particle.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'
          particle.style.boxShadow = `0 0 18px ${color}, 0 0 36px ${color}`
        } else if (type === 'pearl') {
          particle.style.background = `radial-gradient(circle at 30% 30%, ${color}, rgba(251, 191, 36, 0.6))`
          particle.style.boxShadow = `0 0 25px ${color}, 0 0 50px ${color}`
        } else if (type === 'bubble') {
          particle.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), ${color})`
          particle.style.border = '1px solid rgba(255, 255, 255, 0.5)'
          particle.style.boxShadow = `0 0 30px ${color}, 0 0 60px ${color}`
        }

        container.appendChild(particle)
        particles.push(particle)
      }
    })

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: 'transparent'
      }}
    />
  )
}

export function SimpleAquaticAnimation() {
  return (
    <ClientWrapper fallback={
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-emerald-500/10 animate-pulse" />
    }>
      <div className="absolute inset-0 opacity-90">
        <SimpleAquaticParticles />
      </div>
    </ClientWrapper>
  )
}