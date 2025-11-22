'use client'

import { useState, useEffect, useRef } from 'react'

interface LinkedInProfile {
  name: string
  headline: string | null
  location: string | null
  company: string | null
  profileUrl: string
}

interface LinkedInHoverCardProps {
  username: string // LinkedIn username from URL (e.g., "gurkanfikretgunak")
  children: React.ReactNode
  delay?: number
}

export default function LinkedInHoverCard({ 
  username, 
  children, 
  delay = 500 
}: LinkedInHoverCardProps) {
  const [showCard, setShowCard] = useState(false)
  const [data, setData] = useState<LinkedInProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number } | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Check for dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const fetchData = async () => {
    if (loading || data) return

    setLoading(true)
    setError(null)

    try {
      // Since LinkedIn doesn't have a public API, we'll use static data
      // This could be extended to use a server-side API route if needed
      const profileData: LinkedInProfile = {
        name: 'Gurkan Fikret Gunak',
        headline: 'Mobile Team Lead',
        location: 'Türkiye',
        company: 'MasterFabric',
        profileUrl: `https://www.linkedin.com/in/${username}`,
      }
      
      // Simulate a small delay for consistency with GitHubHoverCard
      await new Promise(resolve => setTimeout(resolve, 100))
      setData(profileData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const calculateCardPosition = () => {
    if (!containerRef.current) {
      return { position: 'top' as const, top: 0, left: 0 }
    }
    
    const rect = containerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const cardWidth = 300
    const cardHeight = 250 // Approximate card height
    const padding = 16
    const margin = 2 // Very small margin to bring card close to element
    
    // Calculate center X position - align with the link center
    const centerX = rect.left + (rect.width / 2)
    let left = centerX - (cardWidth / 2)
    
    // Adjust horizontal position to stay within viewport
    if (left < padding) {
      left = padding
    } else if (left + cardWidth > viewportWidth - padding) {
      left = viewportWidth - padding - cardWidth
    }
    
    // Calculate vertical position - position closer to the element
    const spaceAbove = rect.top
    const spaceBelow = viewportHeight - rect.bottom
    const hasSpaceAbove = spaceAbove >= cardHeight + margin + padding
    const hasSpaceBelow = spaceBelow >= cardHeight + margin + padding
    
    let top: number
    let position: 'top' | 'bottom'
    
    if (hasSpaceAbove) {
      // Position above - closer to the element
      position = 'top'
      top = rect.top - cardHeight - margin
    } else if (hasSpaceBelow) {
      // Position below - right next to the element
      position = 'bottom'
      top = rect.bottom + margin
    } else {
      // Not enough space either way, use whichever has more space
      if (spaceAbove > spaceBelow) {
        position = 'top'
        // Position as close as possible while staying in viewport
        top = Math.max(padding, rect.top - Math.min(cardHeight, spaceAbove - margin - padding))
      } else {
        position = 'bottom'
        // Position right below the element
        top = Math.min(viewportHeight - cardHeight - padding, rect.bottom + margin)
      }
    }
    
    return { position, top, left }
  }

  const handleMouseEnter = (e?: React.MouseEvent) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Calculate position immediately for instant positioning
    const pos = calculateCardPosition()
    setPosition(pos.position)
    setCardPosition({ top: pos.top, left: pos.left })
    
    timeoutRef.current = setTimeout(() => {
      // Recalculate position right before showing to ensure accuracy
      const updatedPos = calculateCardPosition()
      setPosition(updatedPos.position)
      setCardPosition({ top: updatedPos.top, left: updatedPos.left })
      setShowCard(true)
      fetchData()
    }, delay)
  }
  
  // Recalculate position on scroll/resize
  useEffect(() => {
    if (!showCard) return
    
    const handleUpdate = () => {
      const pos = calculateCardPosition()
      setCardPosition({ top: pos.top, left: pos.left })
    }
    
    window.addEventListener('scroll', handleUpdate, true)
    window.addEventListener('resize', handleUpdate)
    
    return () => {
      window.removeEventListener('scroll', handleUpdate, true)
      window.removeEventListener('resize', handleUpdate)
    }
  }, [showCard])

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    // Add a small delay before hiding to allow moving to the card
    setTimeout(() => {
      setShowCard(false)
    }, 100)
  }

  const cardStyles = {
    backgroundColor: isDarkMode ? '#1c2128' : '#fff',
    border: isDarkMode ? '1px solid #373e47' : '1px solid #d1d9e0',
    color: isDarkMode ? '#adbac7' : '#24292f',
    borderBottomColor: isDarkMode ? '#373e47' : '#d1d9e0',
    textColor: isDarkMode ? '#adbac7' : '#24292f',
    mutedColor: isDarkMode ? '#768390' : '#656d76',
    boxShadow: isDarkMode 
      ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
      : '0 8px 24px rgba(140, 149, 159, 0.2)',
  }

  return (
    <span
      ref={containerRef}
      style={{ 
        position: 'relative', 
        display: 'inline',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showCard && cardPosition && (
        <div
          ref={cardRef}
          style={{
            position: 'fixed',
            top: `${cardPosition.top}px`,
            left: `${cardPosition.left}px`,
            width: '300px',
            maxWidth: 'calc(100vw - 32px)',
            backgroundColor: cardStyles.backgroundColor,
            border: cardStyles.border,
            borderRadius: '6px',
            boxShadow: cardStyles.boxShadow,
            zIndex: 10000,
            pointerEvents: 'none',
            isolation: 'isolate',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            color: cardStyles.color,
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out',
          }}
        >
          {loading && (
            <div style={{ padding: '16px', textAlign: 'center', color: cardStyles.mutedColor }}>
              Loading...
            </div>
          )}
          {error && (
            <div style={{ padding: '16px', textAlign: 'center', color: '#cf222e' }}>
              {error}
            </div>
          )}
          {data && (
            <div>
              {/* Header with LinkedIn logo/icon */}
              <div style={{ 
                padding: '16px', 
                borderBottom: `1px solid ${cardStyles.borderBottomColor}`,
                display: 'flex',
                gap: '12px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#0077b5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '24px',
                }}>
                  <span style={{ color: '#fff' }}>in</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px', color: cardStyles.textColor }}>
                    {data.name}
                  </div>
                  {data.headline && (
                    <div style={{ color: cardStyles.mutedColor, fontSize: '12px' }}>
                      {data.headline}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Company */}
              {data.company && (
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${cardStyles.borderBottomColor}` }}>
                  <div style={{ fontSize: '14px', color: cardStyles.textColor }}>
                    <span style={{ fontWeight: 600 }}>🏢 {data.company}</span>
                  </div>
                </div>
              )}
              
              {/* Location */}
              {data.location && (
                <div style={{ padding: '12px 16px', fontSize: '12px', color: cardStyles.mutedColor }}>
                  <div>📍 {data.location}</div>
                </div>
              )}
            </div>
          )}
          
          {/* Arrow - positioned based on card position */}
          {position === 'top' ? (
            <>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `6px solid ${cardStyles.backgroundColor}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderTop: cardStyles.border,
                }}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: `6px solid ${cardStyles.backgroundColor}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderBottom: cardStyles.border,
                }}
              />
            </>
          )}
        </div>
      )}
    </span>
  )
}




