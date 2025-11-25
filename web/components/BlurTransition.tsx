'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

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
      className={cn(
        'transition-all ease-out',
        isBlurred 
          ? 'opacity-0 scale-105' 
          : 'opacity-100 scale-100'
      )}
      style={{
        filter: isBlurred ? `blur(${blurAmount}px)` : 'blur(0px)',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 1)',
      }}
    >
      {children}
    </div>
  )
}
