'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface LinkInterceptorProps {
  children: ReactNode
}

export default function LinkInterceptor({ children }: LinkInterceptorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    // Reset navigation state when pathname changes
    setIsNavigating(false)
  }, [pathname])

  useEffect(() => {
    // Don't intercept on the redirect page itself
    if (pathname === '/redirect') {
      return
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (link && link.href) {
        const href = link.getAttribute('href')
        
        // Skip if it's an anchor link, mailto, tel, or javascript
        if (
          !href ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('javascript:')
        ) {
          return
        }

        // Intercept all external links (http/https)
        if (href.startsWith('http://') || href.startsWith('https://')) {
          e.preventDefault()
          e.stopPropagation()
          
          // Add fade-out animation before navigation
          setIsNavigating(true)
          
          // Track link click with Sentry
          if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
              process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
            import('@sentry/nextjs').then((Sentry) => {
              Sentry.setTag('link_type', 'external')
              Sentry.setContext('link_click', {
                href,
                source_page: pathname,
                timestamp: new Date().toISOString(),
              })
              
              Sentry.captureMessage('External link clicked', {
                level: 'info',
                tags: {
                  component: 'LinkInterceptor',
                  action: 'external_link_click',
                },
                extra: {
                  destination: href,
                  source: pathname,
                },
              })
            })
          }
          
          // Small delay for fade-out animation, then navigate
          setTimeout(() => {
            router.push(`/redirect?url=${encodeURIComponent(href)}`)
          }, 150)
          return
        }

        // For relative links, you can also intercept if needed
        // Uncomment the following to intercept ALL links:
        /*
        try {
          const currentUrl = new URL(window.location.href)
          const targetUrl = new URL(href, currentUrl.origin)
          
          // Only intercept if it's going to a different page
          if (targetUrl.pathname !== currentUrl.pathname) {
            e.preventDefault()
            e.stopPropagation()
            setIsNavigating(true)
            setTimeout(() => {
              router.push(`/redirect?url=${encodeURIComponent(targetUrl.href)}`)
            }, 150)
          }
        } catch {
          // If URL parsing fails, let it navigate normally
        }
        */
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [router, pathname])

  return (
    <div
      style={{
        opacity: isNavigating ? 0.3 : 1,
        transition: 'opacity 150ms ease-out',
        pointerEvents: isNavigating ? 'none' : 'auto',
      }}
    >
      {children}
    </div>
  )
}

