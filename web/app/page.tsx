import MarkdownRenderer, { getReadmeContent } from '@/components/MarkdownRenderer'

export default function Home() {
  const readmeContent = getReadmeContent()

  return (
    <main>
      <MarkdownRenderer content={readmeContent} />
    </main>
  )
}

