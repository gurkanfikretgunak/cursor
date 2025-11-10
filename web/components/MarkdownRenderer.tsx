import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { readFileSync } from 'fs'
import { join } from 'path'

const GITHUB_REPO_URL = 'https://github.com/gurkanfikretgunak/cursor/blob/main'

interface MarkdownRendererProps {
  content: string
}

function convertLinksToGitHub(markdown: string): string {
  // Convert ALL relative links to GitHub URLs
  // Pattern: [text](path/to/file.md) -> [text](https://github.com/.../path/to/file.md)
  // Also handles: [text](path/to/file.json), [text](path/to/), etc.
  return markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (match, text, path) => {
      // Skip if already a full URL (http/https)
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return match
      }
      
      // Skip anchor links (starting with #)
      if (path.startsWith('#')) {
        return match
      }
      
      // Skip mailto links
      if (path.startsWith('mailto:')) {
        return match
      }
      
      // Convert all relative paths to GitHub URLs
      // Remove leading slash if present
      const cleanPath = path.startsWith('/') ? path.slice(1) : path
      
      // Convert to GitHub URL
      const githubUrl = `${GITHUB_REPO_URL}/${cleanPath}`
      return `[${text}](${githubUrl})`
    }
  )
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = convertLinksToGitHub(content)
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" />
        ),
        code: ({ node, inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <pre>
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  )
}

export function getReadmeContent(): string {
  try {
    // Try reading from current directory (after prebuild copy)
    const filePath = join(process.cwd(), 'README.md')
    return readFileSync(filePath, 'utf-8')
  } catch (error) {
    // Fallback: try reading from parent directory
    try {
      const altPath = join(process.cwd(), '..', 'README.md')
      return readFileSync(altPath, 'utf-8')
    } catch (altError) {
      console.error('Error reading README.md:', error, altError)
      return '# Error\n\nCould not load README.md content.'
    }
  }
}

