"use client"

import { cn } from "@/lib/utils"

type MarkProps = { size: number; className?: string }

export function VercelIcon({ size, className }: MarkProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={cn("shrink-0 text-foreground", className)}
      aria-hidden
    >
      <path fill="currentColor" d="m12 1.608 12 20.784H0Z" />
    </svg>
  )
}
