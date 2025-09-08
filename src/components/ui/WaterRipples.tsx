'use client'

import { useRef, useEffect } from 'react'
import { ClientWrapper } from './ClientWrapper'

interface RippleProps {
  className?: string
}

function WaterRipples() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    
    let time = 0
    const ripples: { x: number; y: number; radius: number; opacity: number; maxRadius: number }[] = []

    // Create initial ripples
    for (let i = 0; i < 3; i++) {
      ripples.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0,
        opacity: 0.3,
        maxRadius: 100 + Math.random() * 50
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      time += 0.02

      // Update and draw ripples
      ripples.forEach((ripple) => {
        ripple.radius += 1.5
        ripple.opacity = Math.max(0, 0.3 - (ripple.radius / ripple.maxRadius) * 0.3)

        if (ripple.radius > ripple.maxRadius) {
          // Reset ripple
          ripple.x = Math.random() * canvas.width
          ripple.y = Math.random() * canvas.height
          ripple.radius = 0
          ripple.opacity = 0.3
          ripple.maxRadius = 80 + Math.random() * 40
        }

        // Draw ripple
        ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity * 1.5})`
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()

        // Draw inner ripple for depth
        if (ripple.radius > 10) {
          ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity * 0.8})`
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2)
          ctx.stroke()
        }
        
        // Add outer glow effect
        if (ripple.radius > 5) {
          ctx.strokeStyle = `rgba(34, 197, 94, ${ripple.opacity * 0.3})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius + 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Add more visible wave effect across the bottom
      ctx.strokeStyle = `rgba(59, 130, 246, 0.4)`
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height - 20 + Math.sin((x + time * 50) * 0.01) * 5
        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{ background: 'transparent' }}
    />
  )
}

export function WaterRipplesEffect({ className = '' }: RippleProps) {
  return (
    <ClientWrapper fallback={<div className={`absolute inset-0 ${className}`}></div>}>
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <WaterRipples />
      </div>
    </ClientWrapper>
  )
}