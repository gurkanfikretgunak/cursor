'use client'

import { useState } from 'react'
import GitHubHoverCard from './GitHubHoverCard'
import LinkedInHoverCard from './LinkedInHoverCard'
import ServiceHealth from './ServiceHealth'
import { Separator } from '@/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'

interface FooterProps {
  commitInfo?: {
    hash: string
    shortHash: string
    message: string
  } | null
}

export default function Footer({ commitInfo }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Main links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Gurkan Fikret Gunak</span>
            <Separator orientation="vertical" className="h-4" />
            <GitHubHoverCard username="gurkanfikretgunak">
              <a
                href="https://github.com/gurkanfikretgunak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors min-h-[44px] inline-flex items-center px-1"
              >
                GitHub
              </a>
            </GitHubHoverCard>
            <Separator orientation="vertical" className="h-4" />
            <a
              href="https://x.com/gurkandev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors min-h-[44px] inline-flex items-center px-1"
            >
              X
            </a>
            <Separator orientation="vertical" className="h-4" />
            <LinkedInHoverCard username="gurkanfikretgunak">
              <a
                href="https://www.linkedin.com/in/gurkanfikretgunak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 underline-offset-4 hover:underline transition-colors min-h-[44px] inline-flex items-center px-1"
              >
                LinkedIn
              </a>
            </LinkedInHoverCard>
          </div>

          {/* Secondary links and info */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <GitHubHoverCard repo="gurkanfikretgunak/cursor">
              <a
                href="https://github.com/gurkanfikretgunak/cursor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-colors min-h-[44px] inline-flex items-center px-1"
              >
                View Source Code
              </a>
            </GitHubHoverCard>
            <Separator orientation="vertical" className="h-4" />
            <ServiceHealth />
            {commitInfo && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help underline decoration-dotted underline-offset-2 min-h-[44px] inline-flex items-center px-1 font-mono">
                        {commitInfo.shortHash}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <Card className="border-0 shadow-none p-0">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-mono">
                            Commit Hash
                          </CardTitle>
                          <CardDescription className="text-xs font-mono break-all">
                            {commitInfo.hash}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm">{commitInfo.message}</p>
                        </CardContent>
                      </Card>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
