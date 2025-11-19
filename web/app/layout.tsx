import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import LinkInterceptor from '@/components/LinkInterceptor'
import { getLastCommit } from '@/lib/git'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cursor.gurkanfikretgunak.com'
const siteName = 'Cursor Experience Project'
const siteDescription = 'A curated collection of Cursor IDE configurations, rules, and developer experience enhancements. Created by Gurkan Fikret Gunak, Mobile Team Lead.'
const author = 'Gurkan Fikret Gunak'
const twitterHandle = '@gurkandev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'Cursor IDE',
    'Cursor Editor',
    'AI Code Editor',
    'Developer Tools',
    'Flutter Development',
    'Mobile Development',
    'Code Rules',
    'Development Workflow',
    'IDE Configuration',
    'Developer Experience',
    'Gurkan Fikret Gunak',
    'MCP',
    'Model Context Protocol',
  ],
  authors: [
    {
      name: author,
      url: 'https://github.com/gurkanfikretgunak',
    },
  ],
  creator: author,
  publisher: author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    creator: twitterHandle,
    site: twitterHandle,
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Technology',
  classification: 'Developer Tools',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const commitInfo = getLastCommit()

  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <LinkInterceptor>
          {children}
          <Footer commitInfo={commitInfo} />
        </LinkInterceptor>
      </body>
    </html>
  )
}

