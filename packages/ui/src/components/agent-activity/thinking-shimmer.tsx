import type { ReactNode } from "react"

import { cn } from "@sonojs/ui/lib/utils"

import { TextShimmer } from "./text-shimmer"

export interface ThinkingShimmerProps {
  /** Loading message shown to the user. */
  children?: ReactNode
  /** Seconds taken for one shimmer pass. */
  duration?: number
  className?: string
}

export function ThinkingShimmer({
  children = "Thinking…",
  duration = 2,
  className,
}: ThinkingShimmerProps) {
  return (
    <TextShimmer
      as="span"
      duration={duration}
      className={cn("font-medium", className)}
    >
      {children}
    </TextShimmer>
  )
}
