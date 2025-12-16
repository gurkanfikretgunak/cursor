'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type InitialSplashProps = {
  /**
   * Minimum time (ms) the splash stays visible after hydration.
   * Helps avoid a flash on fast loads.
   */
  minimumMs?: number
  /**
   * Fade-out duration (ms).
   */
  fadeMs?: number
  /**
   * Screen-reader label for the loading status.
   */
  label?: string
}

export default function InitialSplash({
  minimumMs = 650,
  fadeMs = 250,
  label = 'Loading',
}: InitialSplashProps) {
  const [phase, setPhase] = useState<'enter' | 'leave' | 'done'>('enter')

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const min = prefersReducedMotion ? 0 : minimumMs
    const fade = prefersReducedMotion ? 0 : fadeMs

    const leaveTimer = window.setTimeout(() => setPhase('leave'), min)
    const doneTimer = window.setTimeout(() => setPhase('done'), min + fade)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [minimumMs, fadeMs])

  if (phase === 'done') return null

  const isLeaving = phase === 'leave'
  const transitionDuration = `${Math.max(0, fadeMs)}ms`

  return (
    <div
      aria-label={label}
      role="status"
      aria-live="polite"
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-background text-foreground',
        'transition-opacity ease-out',
        isLeaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      )}
      style={{ transitionDuration }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm tracking-wide text-foreground/80">
          <span>Opening</span>
          <span className="inline-flex items-center" aria-hidden>
            <span className="splash-dot" style={{ animationDelay: '0ms' }}>
              .
            </span>
            <span className="splash-dot" style={{ animationDelay: '150ms' }}>
              .
            </span>
            <span className="splash-dot" style={{ animationDelay: '300ms' }}>
              .
            </span>
          </span>
          <span className="splash-cursor" aria-hidden />
        </div>
      </div>
    </div>
  )
}

