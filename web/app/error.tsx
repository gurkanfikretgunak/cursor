'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'

export default function Error({
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
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          <CardDescription>
            {error.message || 'An unexpected error occurred'}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
