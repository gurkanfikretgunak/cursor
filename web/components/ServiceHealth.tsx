'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { Button } from '@/ui/button'
import { cn } from '@/lib/utils'

type HealthStatus = 'idle' | 'checking' | 'healthy' | 'problem'

export default function ServiceHealth() {
  const [status, setStatus] = useState<HealthStatus>('idle')
  const [showCheckingText, setShowCheckingText] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    if (!hasChecked) {
      checkVercelStatus()
      setHasChecked(true)
    }
  }, [hasChecked])

  const checkVercelStatus = async () => {
    setStatus('checking')
    setShowCheckingText(false)
    
    setTimeout(() => {
      setShowCheckingText(true)
    }, 800)
    
    setTimeout(async () => {
      try {
        const statusResponse = await fetch('https://www.vercel-status.com/api/v2/status.json', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        })

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        
        const siteResponse = await fetch(window.location.origin, {
          method: 'HEAD',
          cache: 'no-store',
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)

        let isHealthy = false

        if (statusResponse.ok) {
          const statusData = await statusResponse.json()
          const indicator = statusData?.status?.indicator
          isHealthy = indicator === 'none' || indicator === 'minor'
        }

        if (siteResponse.ok && isHealthy) {
          setTimeout(() => {
            setIsTransitioning(true)
            setShowCheckingText(false)
            setTimeout(() => {
              setStatus('healthy')
              setIsTransitioning(false)
            }, 300)
          }, 2000)
        } else {
          setTimeout(() => {
            setIsTransitioning(true)
            setShowCheckingText(false)
            setTimeout(() => {
              setStatus('problem')
              setIsTransitioning(false)
            }, 300)
          }, 2000)
        }
      } catch (error) {
        setTimeout(() => {
          setIsTransitioning(true)
          setShowCheckingText(false)
          setTimeout(() => {
            setStatus('problem')
            setIsTransitioning(false)
          }, 300)
        }, 2000)
      }
    }, 800)
  }

  const handleClick = () => {
    if (status === 'idle' || status === 'healthy' || status === 'problem') {
      checkVercelStatus()
    }
  }

  const getStatusVariant = (): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'checking':
        return 'secondary'
      case 'healthy':
        return 'default'
      case 'problem':
        return 'destructive'
      default:
        return 'outline'
    }
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClick}
            className="h-auto p-0 min-h-[44px] inline-flex items-center gap-1.5"
            disabled={status === 'checking'}
          >
            <Badge
              variant={getStatusVariant()}
              className={cn(
                'h-2 w-2 rounded-full p-0',
                status === 'checking' && 'animate-pulse',
                isTransitioning && 'opacity-50'
              )}
            />
            {showCheckingText && (
              <span className="text-xs text-muted-foreground animate-in fade-in-0 fade-out-0">
                checking
              </span>
            )}
          </Button>
        </TooltipTrigger>
        {(status === 'healthy' || status === 'problem') && (
          <TooltipContent>
            <p className="text-sm">Vercel status: {getStatusText()}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}
