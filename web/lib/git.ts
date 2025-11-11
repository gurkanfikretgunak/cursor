import { execSync } from 'child_process'
import { join } from 'path'

export interface CommitInfo {
  hash: string
  shortHash: string
  message: string
}

/**
 * Gets the last commit hash and message from git
 * Falls back gracefully if git is not available or not in a git repo
 * 
 * Priority:
 * 1. Vercel environment variables (VERCEL_GIT_COMMIT_SHA, VERCEL_GIT_COMMIT_MESSAGE)
 * 2. Git commands (for local development)
 */
export function getLastCommit(): CommitInfo | null {
  // First, try Vercel environment variables (available during build/deployment)
  const vercelCommitSha = process.env.VERCEL_GIT_COMMIT_SHA
  
  if (vercelCommitSha) {
    // VERCEL_GIT_COMMIT_MESSAGE might not always be available
    const vercelCommitMessage = process.env.VERCEL_GIT_COMMIT_MESSAGE || 
                                 process.env.VERCEL_GIT_COMMIT_REF || 
                                 'Deployed to Vercel'
    
    return {
      hash: vercelCommitSha,
      shortHash: vercelCommitSha.substring(0, 7),
      message: vercelCommitMessage,
    }
  }

  // Fallback: Try git commands (for local development)
  const possiblePaths = [
    process.cwd(), // Current directory (web/)
    join(process.cwd(), '..'), // Parent directory (root of repo)
  ]

  for (const cwd of possiblePaths) {
    try {
      // Check if this is a git repository
      execSync('git rev-parse --git-dir', {
        encoding: 'utf-8',
        cwd,
        stdio: ['ignore', 'pipe', 'ignore'],
      })

      // Get the commit hash and message
      const hash = execSync('git rev-parse HEAD', {
        encoding: 'utf-8',
        cwd,
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()

      const shortHash = execSync('git rev-parse --short HEAD', {
        encoding: 'utf-8',
        cwd,
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()

      const message = execSync('git log -1 --pretty=%B', {
        encoding: 'utf-8',
        cwd,
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim()

      if (hash && message) {
        return {
          hash,
          shortHash,
          message: message.split('\n')[0], // Get first line only
        }
      }
    } catch (error) {
      // Not a git repo in this path, try next
      continue
    }
  }

  // Git not available or not in a git repo
  return null
}

