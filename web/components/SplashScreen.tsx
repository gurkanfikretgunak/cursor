'use client'

import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [loadingDots, setLoadingDots] = useState('')

  useEffect(() => {
    // Matrix-style loading dots animation
    const dotInterval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length >= 3) return ''
        return prev + '.'
      })
    }, 300)

    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 2000) // Start fading after 2 seconds

    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500) // Hide completely after 2.5 seconds

    return () => {
      clearInterval(dotInterval)
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

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
        <div
          style={{
            fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            color: '#00d4ff',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            letterSpacing: '0.1em',
            minHeight: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: '#00d4ff' }}>LOADING{loadingDots}</span>
          <span className="matrix-cursor" />
        </div>
      </div>
    </div>
  )
}

