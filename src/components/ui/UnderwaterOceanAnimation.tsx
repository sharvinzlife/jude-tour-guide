'use client'

import { useEffect, useRef } from 'react'
import { ClientWrapper } from './ClientWrapper'

// Underwater Ocean Animation with marine life
function UnderwaterOceanParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    // Marine life particles with underwater theme
    const marineLife = [
      // Jellyfish - floating gracefully
      { type: 'jellyfish', count: 8, size: '20px', color: 'rgba(147, 197, 253, 0.8)', speed: 15 },
      // Sea turtles - swimming slowly
      { type: 'turtle', count: 4, size: '25px', color: 'rgba(34, 197, 94, 0.9)', speed: 20 },
      // Small fish schools
      { type: 'fish', count: 15, size: '12px', color: 'rgba(59, 130, 246, 0.8)', speed: 12 },
      // Bubbles floating up
      { type: 'bubble', count: 30, size: '8px', color: 'rgba(219, 234, 254, 0.6)', speed: 8 },
      // Coral particles
      { type: 'coral', count: 10, size: '15px', color: 'rgba(236, 72, 153, 0.7)', speed: 25 },
      // Seaweed swaying
      { type: 'seaweed', count: 12, size: '8px', color: 'rgba(34, 197, 94, 0.6)', speed: 30 },
      // Starfish
      { type: 'starfish', count: 6, size: '18px', color: 'rgba(251, 191, 36, 0.8)', speed: 22 },
      // Plankton glow
      { type: 'plankton', count: 20, size: '4px', color: 'rgba(34, 211, 238, 0.9)', speed: 6 }
    ]

    marineLife.forEach(({ type, count, size, color, speed }) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div')
        particle.className = `marine-particle marine-${type}`
        particle.style.cssText = `
          position: absolute;
          width: ${size};
          height: ${size};
          background: ${color};
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: ocean-${type} ${speed + Math.random() * 10}s infinite linear;
          animation-delay: ${Math.random() * 8}s;
          z-index: ${Math.floor(Math.random() * 5) + 1};
        `
        
        // Specific styling for different marine life
        if (type === 'jellyfish') {
          particle.style.background = `radial-gradient(ellipse at center, ${color}, transparent 70%)`
          particle.style.borderRadius = '50% 50% 0% 0%'
          particle.style.boxShadow = `0 0 30px ${color}, inset 0 0 20px rgba(255,255,255,0.3)`
          particle.style.filter = 'blur(0.5px)'
          // Add tentacles
          const tentacles = document.createElement('div')
          tentacles.style.cssText = `
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 15px;
            background: linear-gradient(to bottom, ${color}, transparent);
            border-radius: 0 0 50% 50%;
          `
          particle.appendChild(tentacles)
        } else if (type === 'turtle') {
          particle.style.borderRadius = '60% 60% 40% 40%'
          particle.style.background = `radial-gradient(ellipse at 30% 30%, ${color}, rgba(22, 101, 52, 0.8))`
          particle.style.boxShadow = `0 0 15px rgba(34, 197, 94, 0.5)`
          // Add shell pattern
          const shell = document.createElement('div')
          shell.style.cssText = `
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            background: linear-gradient(45deg, transparent 30%, rgba(22, 101, 52, 0.3) 31%, rgba(22, 101, 52, 0.3) 69%, transparent 70%);
            border-radius: 50% 50% 40% 40%;
          `
          particle.appendChild(shell)
        } else if (type === 'fish') {
          particle.style.borderRadius = '50% 0 50% 0'
          particle.style.transform = 'rotate(45deg)'
          particle.style.background = `linear-gradient(45deg, ${color}, rgba(37, 99, 235, 0.9))`
          particle.style.boxShadow = `0 0 12px ${color}`
        } else if (type === 'bubble') {
          particle.style.borderRadius = '50%'
          particle.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), ${color})`
          particle.style.border = '1px solid rgba(255, 255, 255, 0.3)'
          particle.style.boxShadow = `0 0 20px ${color}`
        } else if (type === 'coral') {
          particle.style.clipPath = 'polygon(50% 0%, 20% 100%, 80% 100%)'
          particle.style.background = `linear-gradient(to bottom, ${color}, rgba(190, 24, 93, 0.6))`
          particle.style.boxShadow = `0 0 20px rgba(236, 72, 153, 0.4)`
        } else if (type === 'seaweed') {
          particle.style.borderRadius = '0'
          particle.style.width = '4px'
          particle.style.height = '20px'
          particle.style.background = `linear-gradient(to bottom, ${color}, rgba(21, 128, 61, 0.8))`
          particle.style.boxShadow = `0 0 10px ${color}`
        } else if (type === 'starfish') {
          particle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          particle.style.background = `radial-gradient(circle at center, ${color}, rgba(217, 119, 6, 0.8))`
          particle.style.boxShadow = `0 0 15px rgba(251, 191, 36, 0.6)`
        } else if (type === 'plankton') {
          particle.style.borderRadius = '50%'
          particle.style.background = `radial-gradient(circle at center, ${color}, transparent)`
          particle.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`
          particle.style.filter = 'blur(1px)'
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
        background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.1) 0%, rgba(30, 64, 175, 0.2) 50%, rgba(30, 58, 138, 0.3) 100%)'
      }}
    />
  )
}

export function UnderwaterOceanAnimation() {
  return (
    <ClientWrapper fallback={
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/30 to-blue-900/40 animate-pulse" />
    }>
      <div className="absolute inset-0 opacity-90">
        <UnderwaterOceanParticles />
        {/* Ocean depth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-900/20 pointer-events-none" />
      </div>
    </ClientWrapper>
  )
}