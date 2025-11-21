import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { promises as fs } from 'fs'
import { join } from 'path'
import * as Sentry from '@sentry/nextjs'
import GitHubHoverCard from './GitHubHoverCard'

const GITHUB_REPO_URL = 'https://github.com/gurkanfikretgunak/cursor/blob/main'
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/gurkanfikretgunak/cursor/main'

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
  
  // Helper function to extract GitHub username or repo from URL
  const extractGitHubInfo = (href: string): { username?: string; repo?: string } | null => {
    if (!href) return null
    
    try {
      const url = new URL(href)
      // Handle both github.com and www.github.com
      if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
        const pathParts = url.pathname.split('/').filter(Boolean)
        if (pathParts.length === 1) {
          // User profile: https://github.com/username or https://github.com/username/
          return { username: pathParts[0] }
        } else if (pathParts.length >= 2) {
          // Repository: https://github.com/owner/repo or https://github.com/owner/repo/
          // Ignore additional path parts like /tree/main, /blob/main, etc.
          return { repo: `${pathParts[0]}/${pathParts[1]}` }
        }
      }
    } catch {
      // Invalid URL, ignore
    }
    return null
  }
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, href, children, ...props }: any) => {
          const githubInfo = href ? extractGitHubInfo(href) : null
          const link = (
            <a href={href} {...props} target="_blank" rel="noopener noreferrer">
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
          
          return link
        },
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

export async function getReadmeContent(): Promise<string> {
  // In production/Vercel: Always fetch from GitHub raw API for latest content
  // In local development: Try file system first, then fallback to GitHub
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1'
  
  if (isProduction) {
    // Always fetch from GitHub in production to get the latest version
    try {
      const response = await fetch(`${GITHUB_RAW_URL}/README.md`, {
        cache: 'no-store', // Always fetch fresh content, no caching
      })
      
      if (response.ok) {
        const content = await response.text()
        if (content && content.trim().length > 0) {
          return content
        }
      }
    } catch (error) {
      console.error('Failed to fetch README from GitHub:', error)
      // Fall through to file system fallback
    }
  }
  
  // Fallback: Try file system (for local development or if GitHub fetch fails)
  const possiblePaths = [
    // From parent directory (root of repo)
    join(process.cwd(), '..', 'README.md'),
    // Alternative parent path
    join(process.cwd(), '../README.md'),
    // In production build (after prebuild copy)
    join(process.cwd(), 'README.md'),
  ]

  for (const filePath of possiblePaths) {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      if (content && content.trim().length > 0) {
        return content
      }
    } catch (error) {
      // Continue to next path
      continue
    }
  }

  // Last resort: Try GitHub API even in development if file system fails
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
    // Log to Sentry if available and configured
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
  
  console.error('Error: Could not load README.md content')
  return '# Error\n\nCould not load README.md content. Please ensure README.md exists in the repository.'
}
