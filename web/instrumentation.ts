// This file configures the initialization of Sentry before anything else runs.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

export async function register() {
  // Only initialize Sentry if DSN is provided and valid
  if (
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SENTRY_DSN &&
    process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here' &&
    process.env.NEXT_PUBLIC_SENTRY_DSN.startsWith('https://')
  ) {
    try {
      const Sentry = await import('@sentry/nextjs')
      
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: 1.0,
        debug: false,
        environment: process.env.NODE_ENV,
      })
    } catch (error) {
      // Silently fail if Sentry can't be initialized
      console.warn('Sentry initialization skipped:', error)
    }
  }
}

