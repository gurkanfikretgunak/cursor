import MarkdownRenderer, { getReadmeContent } from '@/components/MarkdownRenderer'

// Force dynamic rendering to always get fresh content
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable caching

export default async function Home() {
  const readmeContent = await getReadmeContent()

  return (
    <MarkdownRenderer content={readmeContent} />
  )
}
