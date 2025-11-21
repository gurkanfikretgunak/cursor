'use client'

import { useState, useEffect, useRef } from 'react'

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  followers: number
  following: number
  public_repos: number
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
}

interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
  updated_at: string
}

interface GitHubHoverCardProps {
  username?: string
  repo?: string // Format: "owner/repo"
  children: React.ReactNode
  delay?: number
}

export default function GitHubHoverCard({ 
  username, 
  repo, 
  children, 
  delay = 500 
}: GitHubHoverCardProps) {
  const [showCard, setShowCard] = useState(false)
  const [data, setData] = useState<GitHubUser | GitHubRepo | null>(null)
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
      if (username) {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) throw new Error('Failed to fetch user')
        const userData: GitHubUser = await response.json()
        setData(userData)
      } else if (repo) {
        const response = await fetch(`https://api.github.com/repos/${repo}`)
        if (!response.ok) throw new Error('Failed to fetch repository')
        const repoData: GitHubRepo = await response.json()
        setData(repoData)
      }
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
    const cardHeight = 350 // Approximate card height
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
  

  const isUser = (data: GitHubUser | GitHubRepo | null): data is GitHubUser => {
    return data !== null && 'login' in data && !('full_name' in data)
  }

  const isRepo = (data: GitHubUser | GitHubRepo | null): data is GitHubRepo => {
    return data !== null && 'full_name' in data
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
          {data && isUser(data) && (
            <div>
              {/* Header with avatar */}
              <div style={{ 
                padding: '16px', 
                borderBottom: `1px solid ${cardStyles.borderBottomColor}`,
                display: 'flex',
                gap: '12px',
              }}>
                <img
                  src={data.avatar_url}
                  alt={data.login}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px', color: cardStyles.textColor }}>
                    {data.name || data.login}
                  </div>
                  <div style={{ color: cardStyles.mutedColor, fontSize: '12px' }}>
                    {data.login}
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              {data.bio && (
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${cardStyles.borderBottomColor}` }}>
                  <div style={{ fontSize: '14px', color: cardStyles.textColor }}>
                    {data.bio}
                  </div>
                </div>
              )}
              
              {/* Stats */}
              <div style={{ 
                padding: '12px 16px',
                display: 'flex',
                gap: '16px',
                borderBottom: `1px solid ${cardStyles.borderBottomColor}`,
                fontSize: '12px',
              }}>
                <div style={{ color: cardStyles.mutedColor }}>
                  <span style={{ fontWeight: 600, color: cardStyles.textColor }}>{data.followers}</span> followers
                </div>
                <div style={{ color: cardStyles.mutedColor }}>
                  <span style={{ fontWeight: 600, color: cardStyles.textColor }}>{data.following}</span> following
                </div>
                <div style={{ color: cardStyles.mutedColor }}>
                  <span style={{ fontWeight: 600, color: cardStyles.textColor }}>{data.public_repos}</span> repos
                </div>
              </div>
              
              {/* Location/Company */}
              {(data.location || data.company) && (
                <div style={{ padding: '12px 16px', fontSize: '12px', color: cardStyles.mutedColor }}>
                  {data.location && <div>📍 {data.location}</div>}
                  {data.company && <div style={{ marginTop: '4px' }}>🏢 {data.company}</div>}
                </div>
              )}
            </div>
          )}
          {data && isRepo(data) && (
            <div>
              {/* Header with owner avatar */}
              <div style={{ 
                padding: '16px', 
                borderBottom: `1px solid ${cardStyles.borderBottomColor}`,
                display: 'flex',
                gap: '12px',
              }}>
                <img
                  src={data.owner.avatar_url}
                  alt={data.owner.login}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px', color: cardStyles.textColor }}>
                    {data.name}
                  </div>
                  <div style={{ color: cardStyles.mutedColor, fontSize: '12px' }}>
                    {data.owner.login}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {data.description && (
                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${cardStyles.borderBottomColor}` }}>
                  <div style={{ fontSize: '14px', color: cardStyles.textColor }}>
                    {data.description}
                  </div>
                </div>
              )}
              
              {/* Stats */}
              <div style={{ 
                padding: '12px 16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                borderBottom: `1px solid ${cardStyles.borderBottomColor}`,
                fontSize: '12px',
              }}>
                {data.language && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#f1e05a',
                      display: 'inline-block',
                    }} />
                    <span style={{ color: cardStyles.mutedColor }}>{data.language}</span>
                  </div>
                )}
                <div style={{ color: cardStyles.mutedColor }}>
                  ⭐ <span style={{ fontWeight: 600, color: cardStyles.textColor }}>{data.stargazers_count}</span>
                </div>
                <div style={{ color: cardStyles.mutedColor }}>
                  🍴 <span style={{ fontWeight: 600, color: cardStyles.textColor }}>{data.forks_count}</span>
                </div>
              </div>
              
              {/* Updated date */}
              <div style={{ padding: '12px 16px', fontSize: '12px', color: cardStyles.mutedColor }}>
                Updated {new Date(data.updated_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
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

