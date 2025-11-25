import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as Sentry from '@sentry/nextjs'
import GitHubHoverCard from './GitHubHoverCard'
import LinkedInHoverCard from './LinkedInHoverCard'
import { Card } from '@/ui/card'

const GITHUB_REPO_URL = 'https://github.com/gurkanfikretgunak/cursor/blob/main'
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/gurkanfikretgunak/cursor/main'

interface MarkdownRendererProps {
  content: string
}

function convertLinksToGitHub(markdown: string): string {
  return markdown.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (match, text, path) => {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return match
      }
      if (path.startsWith('#')) {
        return match
      }
      if (path.startsWith('mailto:')) {
        return match
      }
      const cleanPath = path.startsWith('/') ? path.slice(1) : path
      const githubUrl = `${GITHUB_REPO_URL}/${cleanPath}`
      return `[${text}](${githubUrl})`
    }
  )
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const processedContent = convertLinksToGitHub(content)
  
  const extractGitHubInfo = (href: string): { username?: string; repo?: string } | null => {
    if (!href) return null
    
    try {
      const url = new URL(href)
      if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
        const pathParts = url.pathname.split('/').filter(Boolean)
        if (pathParts.length === 1) {
          return { username: pathParts[0] }
        } else if (pathParts.length >= 2) {
          return { repo: `${pathParts[0]}/${pathParts[1]}` }
        }
      }
    } catch {
      // Invalid URL, ignore
    }
    return null
  }

  const extractLinkedInInfo = (href: string): string | null => {
    if (!href) return null
    
    try {
      const url = new URL(href)
      if (url.hostname === 'linkedin.com' || url.hostname === 'www.linkedin.com') {
        const pathParts = url.pathname.split('/').filter(Boolean)
        if (pathParts.length >= 2 && pathParts[0] === 'in') {
          return pathParts[1]
        }
      }
    } catch {
      // Invalid URL, ignore
    }
    return null
  }
  
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, href, children, ...props }: any) => {
            const githubInfo = href ? extractGitHubInfo(href) : null
            const linkedInUsername = href ? extractLinkedInInfo(href) : null
            const link = (
              <a 
                href={href} 
                {...props} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors"
              >
                {children}
              </a>
            )
            
            if (githubInfo) {
              if (githubInfo.username) {
                return (
                  <GitHubHoverCard username={githubInfo.username}>
                    {link}
                  </GitHubHoverCard>
                )
              } else if (githubInfo.repo) {
                return (
                  <GitHubHoverCard repo={githubInfo.repo}>
                    {link}
                  </GitHubHoverCard>
                )
              }
            }
            
            if (linkedInUsername) {
              return (
                <LinkedInHoverCard username={linkedInUsername}>
                  {link}
                </LinkedInHoverCard>
              )
            }
            
            return link
          },
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <Card className="p-4 my-4 overflow-x-auto">
                <pre className="m-0">
                  <code className={`${className} font-mono text-sm`} {...props}>
                    {children}
                  </code>
                </pre>
              </Card>
            ) : (
              <code 
                className={`${className} font-mono text-sm bg-muted px-1.5 py-0.5 rounded`} 
                {...props}
              >
                {children}
              </code>
            )
          },
          h1: ({ node, ...props }: any) => (
            <h1 className="text-3xl font-bold mt-6 mb-4 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }: any) => (
            <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />
          ),
          h3: ({ node, ...props }: any) => (
            <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />
          ),
          h4: ({ node, ...props }: any) => (
            <h4 className="text-lg font-semibold mt-3 mb-2" {...props} />
          ),
          p: ({ node, ...props }: any) => (
            <p className="mb-4 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }: any) => (
            <ul className="mb-4 pl-6 list-disc" {...props} />
          ),
          ol: ({ node, ...props }: any) => (
            <ol className="mb-4 pl-6 list-decimal" {...props} />
          ),
          li: ({ node, ...props }: any) => (
            <li className="mb-2" {...props} />
          ),
          blockquote: ({ node, ...props }: any) => (
            <blockquote 
              className="border-l-4 border-border pl-4 my-4 text-muted-foreground italic" 
              {...props} 
            />
          ),
          hr: ({ node, ...props }: any) => (
            <hr className="border-t border-border my-8" {...props} />
          ),
          table: ({ node, ...props }: any) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }: any) => (
            <th className="border-b border-border p-2 text-left font-semibold" {...props} />
          ),
          td: ({ node, ...props }: any) => (
            <td className="border-b border-border p-2" {...props} />
          ),
          img: ({ node, ...props }: any) => (
            <img className="max-w-full h-auto my-4 rounded" {...props} />
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}

export async function getReadmeContent(): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  
  if (isProduction) {
    try {
      const response = await fetch(`${GITHUB_RAW_URL}/README.md`, {
        cache: 'no-store',
      })
      
      if (response.ok) {
        const content = await response.text()
        if (content && content.trim().length > 0) {
          return content
        }
      }
    } catch (error) {
      console.error('Failed to fetch README from GitHub:', error)
    }
  }
  
  const cwd = process.cwd()
  const possiblePaths = [
    join(cwd, '..', 'README.md'),
    join(cwd, '../README.md'),
    join(cwd, 'README.md'),
    join(cwd, 'web', 'README.md'),
  ]

  for (const filePath of possiblePaths) {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      if (content && content.trim().length > 0) {
        return content
      }
    } catch (error) {
      continue
    }
  }

  try {
    const response = await fetch(`${GITHUB_RAW_URL}/README.md`, {
      cache: 'no-store',
    })
    
    if (response.ok) {
      const content = await response.text()
      if (content && content.trim().length > 0) {
        return content
      }
    }
  } catch (error) {
    if (error instanceof Error && 
        process.env.NEXT_PUBLIC_SENTRY_DSN && 
        process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
      Sentry.captureException(error, {
        tags: {
          component: 'MarkdownRenderer',
          action: 'readReadme',
        },
      })
    }
  }

  const errorMessage = 'Could not load README.md from GitHub or file system'
  
  if (process.env.NEXT_PUBLIC_SENTRY_DSN && 
      process.env.NEXT_PUBLIC_SENTRY_DSN !== 'your_sentry_dsn_here') {
    Sentry.captureMessage(errorMessage, {
      level: 'error',
      tags: {
        component: 'MarkdownRenderer',
      },
    })
  }
  
  console.error('Error: Could not load README.md content')
  return '# Error\n\nCould not load README.md content. Please ensure README.md exists in the repository.'
}
