'use client'

import { useState, useEffect } from 'react'
import GitHubHoverCard from './GitHubHoverCard'
import ServiceHealth from './ServiceHealth'

interface FooterProps {
  commitInfo?: {
    hash: string
    shortHash: string
    message: string
  } | null
}

export default function Footer({ commitInfo }: FooterProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const tooltipStyles = {
    backgroundColor: isDarkMode ? '#1c2128' : '#fff',
    border: isDarkMode ? '1px solid #373e47' : '1px solid #d1d9e0',
    color: isDarkMode ? '#adbac7' : '#24292f',
    borderBottomColor: isDarkMode ? '#373e47' : '#d1d9e0',
    mutedColor: isDarkMode ? '#768390' : '#656d76',
    boxShadow: isDarkMode 
      ? '0 8px 24px rgba(0, 0, 0, 0.4)' 
      : '0 8px 24px rgba(140, 149, 159, 0.2)',
  }

  return (
    <footer style={{
      marginTop: 'auto',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      fontSize: 'clamp(0.85rem, 2.5vw, 0.9rem)',
      color: '#666',
      position: 'relative',
    }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <p style={{ margin: '0 0 0.5rem 0', lineHeight: '1.6' }}>
          Gurkan Fikret Gunak |{' '}
          <GitHubHoverCard username="gurkanfikretgunak">
            <a
              href="https://github.com/gurkanfikretgunak"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: '#0066cc', 
                textDecoration: 'underline',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25em 0',
              }}
            >
              GitHub
            </a>
          </GitHubHoverCard>
          {' | '}
          <a
            href="https://x.com/gurkandev"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            X
          </a>
          {' | '}
          <a
            href="https://www.linkedin.com/in/gurkanfikretgunak"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#0066cc', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            LinkedIn
          </a>
        </p>
      </div>
      <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.85rem)', color: '#999' }}>
        <GitHubHoverCard repo="gurkanfikretgunak/cursor">
          <a
            href="https://github.com/gurkanfikretgunak/cursor"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#999', 
              textDecoration: 'underline',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25em 0',
            }}
          >
            View Source Code
          </a>
        </GitHubHoverCard>
        {' | '}
        <ServiceHealth />
        {commitInfo && (
          <>
            {' | '}
            <span
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              style={{
                color: '#999',
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                cursor: 'help',
                textDecoration: 'underline',
                textDecorationStyle: 'dotted',
                position: 'relative',
                display: 'inline-block',
                minHeight: '44px',
                alignItems: 'center',
                padding: '0.25em 0',
              }}
            >
              {commitInfo.shortHash}
              {showTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '8px',
                    width: '300px',
                    maxWidth: 'calc(100vw - 32px)',
                    backgroundColor: tooltipStyles.backgroundColor,
                    border: tooltipStyles.border,
                    borderRadius: '6px',
                    boxShadow: tooltipStyles.boxShadow,
                    zIndex: 1000,
                    pointerEvents: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: tooltipStyles.color,
                    overflow: 'hidden',
                    animation: 'fadeIn 0.15s ease-out',
                  }}
                >
                  {/* Header */}
                  <div style={{ 
                    padding: '16px', 
                    borderBottom: `1px solid ${tooltipStyles.borderBottomColor}`,
                  }}>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: '14px', 
                      marginBottom: '4px',
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      color: tooltipStyles.color,
                    }}>
                      Commit Hash
                    </div>
                    <div style={{ 
                      color: tooltipStyles.mutedColor, 
                      fontSize: '12px',
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      wordBreak: 'break-all',
                    }}>
                      {commitInfo.hash}
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: '14px', color: tooltipStyles.color }}>
                      {commitInfo.message}
                    </div>
                  </div>
                  
                  {/* Arrow */}
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
                      borderTop: `6px solid ${tooltipStyles.backgroundColor}`,
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
                      borderTop: tooltipStyles.border,
                    }}
                  />
                </div>
              )}
            </span>
          </>
        )}
      </div>
    </footer>
  )
}

