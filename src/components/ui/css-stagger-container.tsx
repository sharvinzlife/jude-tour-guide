'use client'

import { useEffect, useRef, ReactNode, useState, Children, cloneElement, isValidElement, ReactElement, HTMLAttributes } from 'react'

interface CSSStaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
}
export default function CSSStaggerContainer({ 
  children, 
  staggerDelay = 0.1, 
  delayChildren = 0.2,
  className = ''
}: CSSStaggerContainerProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const node = ref.current
    if (node) {
      observer.observe(node)
    }

    return () => {
      if (node) {
        observer.unobserve(node)
      }
    }
  }, [])

  const childrenArray = Children.toArray(children)

  return (
    <div ref={ref} className={className}>
      {childrenArray.map((child, index) => {
        if (isValidElement(child)) {
          const childProps = child.props as HTMLAttributes<HTMLElement> & { style?: React.CSSProperties }
          return cloneElement(child as ReactElement<HTMLAttributes<HTMLElement>>, {
            ...childProps,
            key: child.key || index,
            className: `${childProps?.className || ''} transition-all duration-600 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`,
            style: {
              ...(childProps?.style || {}),
              transitionDelay: `${delayChildren + (index * staggerDelay)}s`
            }
          })
        }
        return child
      })}
    </div>
  )
}

export const cssStaggerChildVariants = {
  // For compatibility with existing code
  initial: 'translate-y-10 opacity-0',
  animate: 'translate-y-0 opacity-100'
}
