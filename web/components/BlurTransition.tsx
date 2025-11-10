'use client'

import { useEffect, useState } from 'react'

interface BlurTransitionProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  blurAmount?: number
}

export default function BlurTransition({
  children,
  duration = 1500,
  delay = 0,
  blurAmount = 40,
}: BlurTransitionProps) {
  const [isBlurred, setIsBlurred] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    // Use requestAnimationFrame for smoother start
    const rafId = requestAnimationFrame(() => {
      timer = setTimeout(() => {
        setIsBlurred(false)
      }, delay)
    })

    return () => {
      cancelAnimationFrame(rafId)
      if (timer) clearTimeout(timer)
    }
  }, [delay])

  return (
    <div
      data-blur-transition
      style={{
        filter: isBlurred ? `blur(${blurAmount}px)` : 'blur(0px)',
        opacity: isBlurred ? 0 : 1,
        transform: isBlurred ? 'scale(1.05)' : 'scale(1)',
        transition: `filter ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 1), opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 1), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 1)`,
        willChange: isBlurred ? 'filter, opacity, transform' : 'auto',
      }}
    >
      {children}
    </div>
  )
}

