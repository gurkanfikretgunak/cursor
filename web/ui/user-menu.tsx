"use client"

import * as React from "react"
import { Button } from "@/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog"
import { User, LogOut, Settings } from "lucide-react"

interface UserMenuProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  onSignOut?: () => void
  onProfileClick?: () => void
}

export function UserMenu({ user, onSignOut, onProfileClick }: UserMenuProps) {
  if (!user) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            {user.image && (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="h-12 w-12 rounded-full"
              />
            )}
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user.name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={onProfileClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

