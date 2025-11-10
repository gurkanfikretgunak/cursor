import MarkdownRenderer, { getReadmeContent } from '@/components/MarkdownRenderer'
import BlurTransition from '@/components/BlurTransition'

// Force dynamic rendering to always get fresh content
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching

export default function Home() {
  const readmeContent = getReadmeContent()

  return (
    <main>
      <BlurTransition duration={1500} delay={400} blurAmount={40}>
        <MarkdownRenderer content={readmeContent} />
      </BlurTransition>
    </main>
  )
}

