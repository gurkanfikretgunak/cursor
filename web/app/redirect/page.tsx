'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BlurTransition from '@/components/BlurTransition'

function RedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const destination = searchParams.get('url') || '/'

  useEffect(() => {
    if (!destination || destination === '/') {
      router.push('/')
      return
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          window.location.href = destination
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [destination, router])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 10000,
        padding: '1rem',
      }}
    >
      <BlurTransition duration={800} delay={0} blurAmount={20}>
        <div
          style={{
            textAlign: 'center',
            padding: 'clamp(1rem, 4vw, 2rem)',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
              fontWeight: 400,
              marginBottom: '1.5rem',
              color: '#333',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
            }}
          >
            Redirecting to:
          </div>
          <div
            style={{
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 300,
              marginBottom: '2rem',
              color: '#0066cc',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              wordBreak: 'break-all',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              border: '1px solid #ddd',
              overflowWrap: 'break-word',
            }}
          >
            {destination}
          </div>
          <div
            style={{
              fontSize: 'clamp(1.5rem, 6vw, 2rem)',
              fontWeight: 600,
              color: '#00d4ff',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              minHeight: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {countdown > 0 ? countdown : 'Redirecting...'}
          </div>
          <div
            style={{
              marginTop: '2rem',
              fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
              color: '#666',
              fontFamily: 'var(--font-jetbrains-mono), monospace',
            }}
          >
            Click{' '}
            <a
              href={destination}
              style={{
                color: '#0066cc',
                textDecoration: 'underline',
                cursor: 'pointer',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25em 0',
              }}
            >
              here
            </a>{' '}
            if you are not redirected automatically
          </div>
        </div>
      </BlurTransition>
    </div>
  )
}

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: '1rem',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              color: '#333',
              fontSize: 'clamp(0.9rem, 3vw, 1rem)',
            }}
          >
            Loading...
          </div>
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  )
}

