'use client'

import { useState, useEffect } from 'react'

type HealthStatus = 'idle' | 'checking' | 'healthy' | 'problem'

export default function ServiceHealth() {
  const [status, setStatus] = useState<HealthStatus>('idle')
  const [showTooltip, setShowTooltip] = useState(false)
  const [showCheckingText, setShowCheckingText] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  // Auto-check on component mount (only once)
  useEffect(() => {
    if (!hasChecked) {
      checkVercelStatus()
      setHasChecked(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - run only once on mount

  const checkVercelStatus = async () => {
    // First: Show pulsing dot (blue pulse animation)
    setStatus('checking')
    setShowCheckingText(false)
    
    // After pulse animation, show "checking" text
    setTimeout(() => {
      setShowCheckingText(true)
    }, 800) // Show pulse for 800ms
    
    // Start checking after pulse
    setTimeout(async () => {
      try {
        // Check Vercel status page API
        // Using status.vercel.com status page API
        const statusResponse = await fetch('https://www.vercel-status.com/api/v2/status.json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        })

        // Also check if our own site is responding
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
        
        const siteResponse = await fetch(window.location.origin, {
          method: 'HEAD',
          cache: 'no-store',
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)

        let isHealthy = false

        if (statusResponse.ok) {
          const statusData = await statusResponse.json()
          // Check if Vercel status is operational
          // status page returns: "none", "minor", "major", "critical"
          const indicator = statusData?.status?.indicator
          isHealthy = indicator === 'none' || indicator === 'minor'
        }

        // Wait for "checking" text fade out animation (1.5s) before showing result
        if (siteResponse.ok && isHealthy) {
          setTimeout(() => {
            setIsTransitioning(true)
            setShowCheckingText(false)
            // Smooth transition to healthy state
            setTimeout(() => {
              setStatus('healthy')
              setIsTransitioning(false)
            }, 300) // Short delay for smooth transition
          }, 2000) // Wait for fade animation to complete
        } else {
          setTimeout(() => {
            setIsTransitioning(true)
            setShowCheckingText(false)
            // Smooth transition to problem state
            setTimeout(() => {
              setStatus('problem')
              setIsTransitioning(false)
            }, 300)
          }, 2000)
        }
      } catch (error) {
        // On error, show problem status
        setTimeout(() => {
          setIsTransitioning(true)
          setShowCheckingText(false)
          setTimeout(() => {
            setStatus('problem')
            setIsTransitioning(false)
          }, 300)
        }, 2000)
      }
    }, 800) // Start check after pulse
  }

  const handleClick = () => {
    if (status === 'idle' || status === 'healthy' || status === 'problem') {
      checkVercelStatus()
    }
  }

  const getDotColor = () => {
    switch (status) {
      case 'checking':
        return '#0066cc' // Blue for checking
      case 'healthy':
        return '#22c55e' // Green for healthy
      case 'problem':
        return '#ea580c' // Dark orange for problem
      default:
        return '#999' // Gray for idle
    }
  }

  const getDotStyle = () => {
    const baseStyle: React.CSSProperties = {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: getDotColor(),
      display: 'inline-block',
      cursor: 'pointer',
      transition: 'background-color 0.6s ease, opacity 0.6s ease, transform 0.6s ease',
      position: 'relative',
      verticalAlign: 'middle',
      marginLeft: '4px',
      opacity: isTransitioning ? 0.5 : 1,
    }

    if (status === 'checking') {
      return {
        ...baseStyle,
        animation: 'pulse 1s ease-in-out infinite',
        opacity: 1,
      }
    }

    if (isTransitioning) {
      return {
        ...baseStyle,
        animation: 'softShift 0.6s ease-out forwards',
      }
    }

    return baseStyle
  }

  const getStatusText = () => {
    switch (status) {
      case 'healthy':
        return 'well'
      case 'problem':
        return 'problem'
      case 'checking':
        return 'checking...'
      default:
        return 'unknown'
    }
  }

  return (
    <span
        onClick={handleClick}
        onMouseEnter={() => {
          if (status !== 'idle' && status !== 'checking') {
            setShowTooltip(true)
          }
        }}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          minHeight: '44px',
          padding: '0.25em 0',
        }}
      >
        <span style={getDotStyle()} />
        {showCheckingText && (
          <span
            style={{
              fontSize: 'clamp(0.8rem, 2vw, 0.85rem)',
              color: '#999',
              marginLeft: '6px',
              animation: 'fadeOut 1.5s ease-out forwards',
              display: 'inline-block',
              transition: 'opacity 0.5s ease',
            }}
          >
            checking
          </span>
        )}
        {showTooltip && (status === 'healthy' || status === 'problem') && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: '4px',
                  padding: '6px 10px',
                  backgroundColor: '#333',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  zIndex: 1000,
                  pointerEvents: 'none',
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                Vercel status: {getStatusText()}
                <span
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '4px solid transparent',
                    borderRight: '4px solid transparent',
                    borderTop: '4px solid #333',
                  }}
                />
              </span>
        )}
      </span>
  )
}

