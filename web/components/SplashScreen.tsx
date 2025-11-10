'use client'

import { useEffect, useState, useCallback } from 'react'
import MatrixRain from './MatrixRain'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  const handleAnimationComplete = useCallback(() => {
    // Start fading out when animation completes
    setIsFading(true)
    
    // Hide completely after fade transition
    setTimeout(() => {
      setIsVisible(false)
    }, 500) // Match the fade transition duration
  }, [])

  // Fallback: If animation doesn't complete, fade after max time
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isVisible && !isFading) {
        handleAnimationComplete()
      }
    }, 3000) // Max 3 seconds fallback

    return () => {
      clearTimeout(fallbackTimer)
    }
  }, [isVisible, isFading, handleAnimationComplete])

  if (!isVisible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-out',
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? 'none' : 'auto',
        padding: '1rem',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#000',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          maxWidth: '100%',
          width: '100%',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
            fontWeight: 400,
            margin: 0,
            marginBottom: '0.75rem',
            color: '#000',
            letterSpacing: '0.02em',
            wordBreak: 'break-word',
          }}
        >
          Gurkan Fikret Gunak
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 4vw, 1.2rem)',
            fontWeight: 300,
            margin: 0,
            marginBottom: '1.5rem',
            color: '#000',
            opacity: 0.9,
            letterSpacing: '0.01em',
          }}
        >
          Cursor Ambassador
        </p>
        <MatrixRain 
          text="LOADING" 
          columns={10} 
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
    </div>
  )
}
