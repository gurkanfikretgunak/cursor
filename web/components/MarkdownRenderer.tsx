import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as Sentry from '@sentry/nextjs'

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
  // Try multiple paths to find README.md
  const possiblePaths = [
    // In production build (after prebuild copy)
    join(process.cwd(), 'README.md'),
    // From parent directory (root of repo)
    join(process.cwd(), '..', 'README.md'),
    // Alternative parent path
    join(process.cwd(), '../README.md'),
  ]

  for (const filePath of possiblePaths) {
    try {
      const content = readFileSync(filePath, 'utf-8')
      if (content && content.trim().length > 0) {
        return content
      }
    } catch (error) {
      // Log to Sentry if available and configured
      if (error instanceof Error && 
          process.env.NEXT_PUBLIC_SENTRY_DSN && 
          process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
        Sentry.captureException(error, {
          tags: {
            component: 'MarkdownRenderer',
            action: 'readReadme',
          },
          extra: {
            filePath,
          },
        })
      }
      // Continue to next path
      continue
    }
  }

  const errorMessage = 'Could not find README.md in any expected location'
  
  // Log to Sentry if available and configured
  if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
      process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
    Sentry.captureMessage(errorMessage, {
      level: 'error',
      tags: {
        component: 'MarkdownRenderer',
      },
    })
  }
  
  console.error('Error: Could not find README.md in any expected location')
  return '# Error\n\nCould not load README.md content. Please ensure README.md exists in the project root.'
}
