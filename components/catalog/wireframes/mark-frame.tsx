import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Shared catalog mark chrome. `bold` = tighter padding for component thumbs. */
export function MarkFrame({
  children,
  className,
  density = "default",
}: {
  children: ReactNode
  className?: string
  density?: "default" | "bold"
}) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center overflow-hidden rounded-[6px] bg-muted/20",
        density === "bold" ? "p-1" : "p-2",
        className
      )}
    >
      {children}
    </div>
  )
}
