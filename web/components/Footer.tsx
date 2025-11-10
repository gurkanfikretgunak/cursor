'use client'

import { useState } from 'react'

interface FooterProps {
  commitInfo?: {
    hash: string
    shortHash: string
    message: string
  } | null
}

export default function Footer({ commitInfo }: FooterProps) {
  const [showTooltip, setShowTooltip] = useState(false)

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
                <span
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                    maxWidth: '90vw',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <div style={{ marginBottom: '0.25rem', fontWeight: 'bold' }}>
                    {commitInfo.hash}
                  </div>
                  <div style={{ fontSize: '0.7rem', opacity: 0.9 }}>
                    {commitInfo.message}
                  </div>
                  {/* Tooltip arrow */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px',
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
          </>
        )}
      </div>
    </footer>
  )
}

