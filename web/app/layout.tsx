import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import SplashScreen from '@/components/SplashScreen'
import BlurTransition from '@/components/BlurTransition'
import LinkInterceptor from '@/components/LinkInterceptor'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cursor Experience Project',
  description: 'A curated collection of Cursor IDE configurations, rules, and developer experience enhancements.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#fff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <LinkInterceptor>
          <SplashScreen />
          {children}
          <BlurTransition duration={1500} delay={800} blurAmount={40}>
            <Footer />
          </BlurTransition>
        </LinkInterceptor>
      </body>
    </html>
  )
}

