'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import BlurTransition from '@/components/BlurTransition'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'

function RedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const destination = searchParams.get('url') || '/'
  const redirectStartTime = useRef<number>(Date.now())
  const redirectType = useRef<'auto' | 'manual'>('auto')

  useEffect(() => {
    if (!destination || destination === '/') {
      router.push('/')
      return
    }

    if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
        process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
      import('@sentry/nextjs').then((Sentry) => {
        try {
          const url = new URL(destination)
          Sentry.setTag('redirect_domain', url.hostname)
          Sentry.setTag('redirect_protocol', url.protocol.replace(':', ''))
          Sentry.setContext('redirect', {
            destination,
            start_time: new Date().toISOString(),
            referrer: typeof window !== 'undefined' ? document.referrer : 'unknown',
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
          })
          
          Sentry.captureMessage('Redirect initiated', {
            level: 'info',
            tags: {
              component: 'RedirectPage',
              action: 'redirect_start',
            },
            extra: {
              destination,
              referrer: typeof window !== 'undefined' ? document.referrer : 'unknown',
            },
          })
        } catch (error) {
          if (error instanceof Error) {
            Sentry.setContext('redirect', {
              destination,
              start_time: new Date().toISOString(),
              error: error.message,
            })
          }
        }
      })
    }

    let intervalId: NodeJS.Timeout | null = null
    
    intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (intervalId) {
            clearInterval(intervalId)
            intervalId = null
          }
          
          if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
              process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
            import('@sentry/nextjs').then((Sentry) => {
              const duration = Date.now() - redirectStartTime.current
              
              Sentry.setTag('redirect_type', redirectType.current)
              Sentry.setContext('redirect_completion', {
                destination,
                duration_ms: duration,
                countdown_completed: true,
                completion_time: new Date().toISOString(),
              })
              
              Sentry.captureMessage('Redirect completed (auto)', {
                level: 'info',
                tags: {
                  component: 'RedirectPage',
                  action: 'redirect_complete',
                  redirect_type: 'auto',
                },
                extra: {
                  destination,
                  duration_ms: duration,
                },
              })
            })
          }
          
          setTimeout(() => {
            window.location.href = destination
          }, 100)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [destination, router])

  const handleManualClick = () => {
    redirectType.current = 'manual'
    const duration = Date.now() - redirectStartTime.current
    
    if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
        process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
      import('@sentry/nextjs').then((Sentry) => {
        Sentry.setTag('redirect_type', 'manual')
        Sentry.setContext('redirect_completion', {
          destination,
          duration_ms: duration,
          countdown_value: countdown,
          completion_time: new Date().toISOString(),
        })
        
        Sentry.captureMessage('Redirect completed (manual)', {
          level: 'info',
          tags: {
            component: 'RedirectPage',
            action: 'redirect_complete',
            redirect_type: 'manual',
          },
          extra: {
            destination,
            duration_ms: duration,
            countdown_at_click: countdown,
          },
        })
      })
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background p-4 animate-in fade-in duration-300">
      <BlurTransition duration={600} delay={0} blurAmount={20}>
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl font-normal">
              Redirecting to:
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border bg-muted p-4">
              <p className="text-sm sm:text-base font-light break-all text-primary">
                {destination}
              </p>
            </div>
            <div className="flex items-center justify-center min-h-[3rem]">
              <Badge variant="default" className="text-2xl sm:text-3xl font-semibold px-4 py-2">
                {countdown > 0 ? countdown : 'Redirecting...'}
              </Badge>
            </div>
          </CardContent>
          <CardContent>
            <CardDescription className="text-center text-sm sm:text-base">
              Click{' '}
              <Button
                variant="link"
                onClick={handleManualClick}
                className="h-auto p-0 text-primary underline-offset-4"
                asChild
              >
                <a href={destination}>here</a>
              </Button>{' '}
              if you are not redirected automatically
            </CardDescription>
          </CardContent>
        </Card>
      </BlurTransition>
    </div>
  )
}

export default function RedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-background p-4">
          <div className="text-muted-foreground text-sm sm:text-base font-mono">
            Loading...
          </div>
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  )
}
