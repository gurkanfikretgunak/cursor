'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
        process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
      import('@sentry/nextjs').then((Sentry) => {
        Sentry.captureException(error)
      })
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Something went wrong!</CardTitle>
              <CardDescription>
                An error occurred. We've been notified and are looking into it.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={reset} className="w-full">
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  )
}
