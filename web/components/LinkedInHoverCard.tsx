'use client'

import { useState } from 'react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/ui/hover-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import { Separator } from '@/ui/separator'

interface LinkedInProfile {
  name: string
  headline: string | null
  location: string | null
  company: string | null
  profileUrl: string
}

interface LinkedInHoverCardProps {
  username: string
  children: React.ReactNode
}

export default function LinkedInHoverCard({ 
  username, 
  children
}: LinkedInHoverCardProps) {
  const [data, setData] = useState<LinkedInProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (loading || data) return

    setLoading(true)
    setError(null)

    try {
      // Since LinkedIn doesn't have a public API, we'll use static data
      const profileData: LinkedInProfile = {
        name: 'Gurkan Fikret Gunak',
        headline: 'Mobile Team Lead',
        location: 'Türkiye',
        company: 'MasterFabric',
        profileUrl: `https://www.linkedin.com/in/${username}`,
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
      setData(profileData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
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
        {data && (
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Avatar className="bg-[#0077b5]">
                  <AvatarFallback className="text-white font-semibold">
                    in
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm">{data.name}</CardTitle>
                  {data.headline && (
                    <CardDescription className="text-xs">{data.headline}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            {data.company && (
              <>
                <Separator />
                <CardContent className="pt-3 pb-3">
                  <div className="text-sm">
                    <span className="font-semibold">🏢 {data.company}</span>
                  </div>
                </CardContent>
              </>
            )}
            {data.location && (
              <>
                <Separator />
                <CardContent className="pt-3">
                  <div className="text-xs text-muted-foreground">
                    <div>📍 {data.location}</div>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        )}
      </HoverCardContent>
    </HoverCard>
  )
}
