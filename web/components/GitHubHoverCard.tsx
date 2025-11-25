'use client'

import { useState, useEffect } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/ui/hover-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Badge } from '@/ui/badge'
import { Separator } from '@/ui/separator'

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  followers: number
  following: number
  public_repos: number
  location: string | null
  company: string | null
  blog: string | null
  twitter_username: string | null
}

interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
  updated_at: string
}

interface GitHubHoverCardProps {
  username?: string
  repo?: string
  children: React.ReactNode
}

export default function GitHubHoverCard({ 
  username, 
  repo, 
  children
}: GitHubHoverCardProps) {
  const [data, setData] = useState<GitHubUser | GitHubRepo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (loading || data) return

    setLoading(true)
    setError(null)

    try {
      if (username) {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (!response.ok) throw new Error('Failed to fetch user')
        const userData: GitHubUser = await response.json()
        setData(userData)
      } else if (repo) {
        const response = await fetch(`https://api.github.com/repos/${repo}`)
        if (!response.ok) throw new Error('Failed to fetch repository')
        const repoData: GitHubRepo = await response.json()
        setData(repoData)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const isUser = (data: GitHubUser | GitHubRepo | null): data is GitHubUser => {
    return data !== null && 'login' in data && !('full_name' in data)
  }

  const isRepo = (data: GitHubUser | GitHubRepo | null): data is GitHubRepo => {
    return data !== null && 'full_name' in data
  }

  return (
    <HoverCard openDelay={500} onOpenChange={(open) => open && fetchData()}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0">
        {loading && (
          <div className="p-4 text-center text-muted-foreground">
            Loading...
          </div>
        )}
        {error && (
          <div className="p-4 text-center text-destructive">
            {error}
          </div>
        )}
        {data && isUser(data) && (
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={data.avatar_url} alt={data.login} />
                  <AvatarFallback>{data.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm">{data.name || data.login}</CardTitle>
                  <CardDescription className="text-xs">@{data.login}</CardDescription>
                </div>
              </div>
            </CardHeader>
            {data.bio && (
              <>
                <CardContent className="pt-0 pb-3">
                  <p className="text-sm">{data.bio}</p>
                </CardContent>
                <Separator />
              </>
            )}
            <CardContent className="pt-3 pb-3">
              <div className="flex gap-4 text-xs">
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{data.followers}</span> followers
                </div>
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{data.following}</span> following
                </div>
                <div className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{data.public_repos}</span> repos
                </div>
              </div>
            </CardContent>
            {(data.location || data.company) && (
              <>
                <Separator />
                <CardContent className="pt-3">
                  <div className="text-xs text-muted-foreground space-y-1">
                    {data.location && <div>📍 {data.location}</div>}
                    {data.company && <div>🏢 {data.company}</div>}
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        )}
        {data && isRepo(data) && (
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data.owner.avatar_url} alt={data.owner.login} />
                  <AvatarFallback>{data.owner.login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm">{data.name}</CardTitle>
                  <CardDescription className="text-xs">{data.owner.login}</CardDescription>
                </div>
              </div>
            </CardHeader>
            {data.description && (
              <>
                <CardContent className="pt-0 pb-3">
                  <p className="text-sm">{data.description}</p>
                </CardContent>
                <Separator />
              </>
            )}
            <CardContent className="pt-3 pb-3">
              <div className="flex gap-4 items-center text-xs">
                {data.language && (
                  <Badge variant="outline" className="text-xs">
                    {data.language}
                  </Badge>
                )}
                <div className="text-muted-foreground">
                  ⭐ <span className="font-semibold text-foreground">{data.stargazers_count}</span>
                </div>
                <div className="text-muted-foreground">
                  🍴 <span className="font-semibold text-foreground">{data.forks_count}</span>
                </div>
              </div>
            </CardContent>
            <Separator />
            <CardContent className="pt-3">
              <div className="text-xs text-muted-foreground">
                Updated {new Date(data.updated_at).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
