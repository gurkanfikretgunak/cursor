"use client"

import * as React from "react"
import { Button } from "@/ui/button"
import { Github, Chrome } from "lucide-react"

interface OAuthButtonsProps {
  onGoogleClick?: () => void
  onGitHubClick?: () => void
  isLoading?: boolean
}

export function OAuthButtons({
  onGoogleClick,
  onGitHubClick,
  isLoading = false,
}: OAuthButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGoogleClick}
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onGitHubClick}
        disabled={isLoading}
      >
        <Github className="mr-2 h-4 w-4" />
        Continue with GitHub
      </Button>
    </div>
  )
}

