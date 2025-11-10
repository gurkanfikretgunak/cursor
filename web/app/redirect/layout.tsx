import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redirecting...',
  description: 'Redirecting to external link',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Redirecting...',
    description: 'Redirecting to external link',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Redirecting...',
    description: 'Redirecting to external link',
  },
}

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

