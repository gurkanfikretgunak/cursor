'use client'

import { useEffect, useState, useRef } from 'react'

interface MatrixRainProps {
  text?: string
  columns?: number
  onAnimationComplete?: () => void
}

// Matrix character set: Katakana, numbers, symbols
const MATRIX_CHARS = 'アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルヱエケセテネヘメレヲオコソトノホモヨロヲン0123456789!@#$%&*'

export default function MatrixRain({
  text = 'LOADING',
  columns = 10,
  onAnimationComplete,
}: MatrixRainProps) {
  const [characters, setCharacters] = useState<string[][]>([])
  const [isResolving, setIsResolving] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const animationFrameRef = useRef<number>()
  const resolveStartRef = useRef<number>()

  useEffect(() => {
    // Initialize columns with random characters
    const initChars: string[][] = []
    for (let col = 0; col < columns; col++) {
      const column: string[] = []
      const columnHeight = Math.floor(Math.random() * 6) + 6 // 6-11 characters per column
      for (let row = 0; row < columnHeight; row++) {
        column.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)])
      }
      initChars.push(column)
    }
    setCharacters(initChars)

    // Start resolving after a short delay
    const resolveTimer = setTimeout(() => {
      setIsResolving(true)
      resolveStartRef.current = Date.now()
    }, 800)

    return () => {
      clearTimeout(resolveTimer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [columns])

  useEffect(() => {
    if (!isResolving) return

    const resolveDuration = 1500 // 1.5 seconds to resolve

    const animate = () => {
      const elapsed = resolveStartRef.current ? Date.now() - resolveStartRef.current : 0
      const progress = Math.min(elapsed / resolveDuration, 1)

      setCharacters((prev) => {
        const newChars = prev.map((column, colIndex) => {
          // Map column index to text character position
          const textIndex = Math.floor((colIndex / columns) * text.length)
          const targetChar = text[textIndex] || ' '

          return column.map((char, rowIndex) => {
            // Middle rows resolve to text
            const middleRow = Math.floor(column.length / 2)
            const distanceFromMiddle = Math.abs(rowIndex - middleRow)

            // Resolve center characters to text
            if (distanceFromMiddle <= 1) {
              if (progress > 0.4) {
                // Gradually resolve
                const resolveChance = (progress - 0.4) / 0.6
                if (Math.random() < resolveChance) {
                  return targetChar
                }
              }
            }

            // Continue random characters with variation
            if (progress < 0.8) {
              return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
            }

            return char
          })
        })
        return newChars
      })

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete - trigger callback only once
        if (!hasCompleted && onAnimationComplete) {
          setHasCompleted(true)
          setTimeout(() => {
            onAnimationComplete()
          }, 300) // Small delay to show final resolved text
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isResolving, text, columns])

  return (
    <div
      className="matrix-rain-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 'clamp(0.9rem, 3vw, 1rem)',
        letterSpacing: '0.1em',
        minHeight: '2rem',
        padding: '0.5rem 0',
      }}
    >
      {characters.map((column, colIndex) => (
        <div
          key={colIndex}
          className="matrix-column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animationDelay: `${colIndex * 0.15}s`,
          }}
        >
          {column.map((char, rowIndex) => {
            // Calculate opacity based on position and resolution state
            const middleRow = Math.floor(column.length / 2)
            const distanceFromMiddle = Math.abs(rowIndex - middleRow)
            
            let opacity = 0.3
            if (isResolving && distanceFromMiddle <= 1) {
              opacity = Math.max(0.6, 1 - distanceFromMiddle * 0.2)
            } else {
              opacity = 0.3 + (1 - distanceFromMiddle / column.length) * 0.4
            }

            return (
              <span
                key={`${colIndex}-${rowIndex}`}
                className="matrix-char"
                style={{
                  color: '#00d4ff',
                  opacity: Math.max(0.2, Math.min(1, opacity)),
                  animationDelay: `${(colIndex * 0.15 + rowIndex * 0.08)}s`,
                }}
              >
                {char}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

