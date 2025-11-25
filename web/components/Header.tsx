'use client'

import { Separator } from '@/ui/separator'

export default function Header() {
  return (
    <header className="relative flex justify-center items-center p-4 min-h-[60px]">
      <div className="flex items-center gap-2">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
          style={{ animationDuration: '4s' }}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground"
          />
        </svg>
      </div>
      <Separator className="absolute bottom-0 left-0 right-0" />
    </header>
  )
}
