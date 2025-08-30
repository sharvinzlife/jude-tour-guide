'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'kerala' | 'spice'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  animate?: boolean
  pulse?: boolean
}

const buttonVariants = {
  primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg',
  secondary: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg',
  outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent',
  ghost: 'text-emerald-600 hover:bg-emerald-50 bg-transparent',
  kerala: 'glassmorphism-button border-0 text-white font-semibold kerala-pulse backdrop-blur-md',
  spice: 'glassmorphism-spice border-2 border-yellow-400/50 text-white font-semibold backdrop-blur-md'
}

const sizeVariants = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl'
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  isLoading = false,
  icon,
  iconPosition = 'left',
  animate = true,
  pulse = false,
  ...props
}) => {
  const buttonClass = cn(
    'relative overflow-hidden rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed',
    buttonVariants[variant],
    sizeVariants[size],
    animate ? 'transform hover:scale-105 active:scale-95' : '',
    pulse ? 'animate-pulse' : '',
    className
  )

  return (
    <button
      className={buttonClass}
      disabled={isLoading}
      {...props}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {/* Loading spinner */}
        {isLoading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        {/* Left icon */}
        {icon && iconPosition === 'left' && !isLoading && (
          <div className="flex items-center transform transition-transform hover:scale-110 hover:-translate-x-1">
            {icon}
          </div>
        )}

        {/* Button text */}
        <span className="whitespace-nowrap transform transition-transform hover:scale-105">
          {children}
        </span>

        {/* Right icon */}
        {icon && iconPosition === 'right' && !isLoading && (
          <div className="flex items-center transform transition-transform hover:scale-110 hover:translate-x-1">
            {icon}
          </div>
        )}
      </div>

      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 scale-0 active:opacity-30 active:scale-120 transition-all duration-400" />
    </button>
  )
}

// Specialized Kerala-themed button variants
export const KeralaButton: React.FC<Omit<AnimatedButtonProps, 'variant'>> = (props) => (
  <AnimatedButton variant="kerala" {...props} />
)

export const SpiceButton: React.FC<Omit<AnimatedButtonProps, 'variant'>> = (props) => (
  <AnimatedButton variant="spice" {...props} />
)

// Floating Action Button variant
interface FloatingButtonProps extends AnimatedButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  position = 'bottom-right',
  className,
  children,
  ...props
}) => {
  const positionClasses = {
    'bottom-right': 'fixed bottom-8 right-8',
    'bottom-left': 'fixed bottom-8 left-8',
    'top-right': 'fixed top-8 right-8',
'top-left': 'fixed top-8 left-8'
}

  return (
    <div className={cn(positionClasses[position], 'z-50 animate-fade-in transform hover:scale-110 active:scale-90')}>
      <AnimatedButton
        className={cn('rounded-full w-14 h-14 p-0 shadow-2xl', className)}
        size="md"
        pulse
        {...props}
      >
        {children}
      </AnimatedButton>
    </div>
  )
}

// Button with integrated loading states and success animations
interface AsyncButtonProps extends AnimatedButtonProps {
  onAsyncClick?: () => Promise<void>
  successMessage?: string
  errorMessage?: string
}

export const AsyncButton: React.FC<AsyncButtonProps> = ({
  onAsyncClick,
  successMessage = 'Success!',
  errorMessage = 'Error occurred',
  children,
  ...props
}) => {
  const [state, setState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleClick = async () => {
    if (!onAsyncClick) return

    setState('loading')
    try {
      await onAsyncClick()
      setState('success')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('error')
      setTimeout(() => setState('idle'), 3000)
    }
  }

  const getButtonContent = () => {
    switch (state) {
      case 'loading':
        return 'Loading...'
      case 'success':
        return (
          <span className="flex items-center space-x-2 animate-fade-in">
            <span className="animate-spin-once">✓</span>
            <span>{successMessage}</span>
          </span>
        )
      case 'error':
        return (
          <span className="flex items-center space-x-2 text-red-600 animate-fade-in">
            <span>✗</span>
            <span>{errorMessage}</span>
          </span>
        )
      default:
        return children
    }
  }

  return (
    <AnimatedButton
      {...props}
      isLoading={state === 'loading'}
      onClick={handleClick}
      disabled={state === 'loading'}
      variant={state === 'error' ? 'outline' : props.variant}
    >
      {getButtonContent()}
    </AnimatedButton>
  )
}

export default AnimatedButton
