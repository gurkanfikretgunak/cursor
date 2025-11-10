# Sentry Setup Guide

This project includes Sentry for error tracking and performance monitoring.

## Setup Instructions

### 1. Create a Sentry Account

1. Go to [sentry.io](https://sentry.io) and sign up for a free account
2. Create a new project (select Next.js as the platform)
3. Copy your DSN from the project settings

### 2. Configure Environment Variables

Update your `.env.local` file with your Sentry credentials:

```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/your-project-id
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your-sentry-auth-token
```

**Where to find these values:**
- **DSN**: Project Settings > Client Keys (DSN)
- **ORG**: Organization slug from Sentry dashboard URL
- **PROJECT**: Project slug from Sentry dashboard URL
- **AUTH_TOKEN**: Settings > Auth Tokens (create one with `project:releases` scope)

### 3. Optional: Configure .sentryclirc

For source map uploads during build, update `.sentryclirc`:

```ini
[auth]
token=your_sentry_auth_token_here

[defaults]
org=your_sentry_org
project=your_sentry_project
```

## Features

- **Error Tracking**: Automatic error capture and reporting
- **Performance Monitoring**: Track page load times and API calls
- **Session Replay**: Record user sessions for debugging
- **Source Maps**: Upload source maps for better error stack traces
- **Release Tracking**: Track deployments and releases

## Usage

Sentry is automatically initialized when a valid DSN is provided. The app will work normally even without Sentry configured.

### Manual Error Reporting

```typescript
import * as Sentry from '@sentry/nextjs'

// Capture an exception
Sentry.captureException(new Error('Something went wrong'))

// Capture a message
Sentry.captureMessage('Something important happened', 'info')

// Add context
Sentry.setUser({ id: '123', email: 'user@example.com' })
Sentry.setTag('page', 'home')
Sentry.setContext('custom', { key: 'value' })
```

## Development

- Sentry is **optional** - the app works without it
- If DSN is not configured or invalid, Sentry is automatically disabled
- No errors will occur if Sentry is not set up

## Production

- Make sure to set all Sentry environment variables in your hosting platform (Vercel, etc.)
- Source maps will be uploaded automatically during build if configured
- Errors will be tracked and sent to your Sentry dashboard

