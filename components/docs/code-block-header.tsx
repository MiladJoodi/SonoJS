import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Compact filename / CLI row for dark code chrome (VS Code–scale height). */
export function CodeBlockHeader({
  title,
  children,
  className,
}: {
  title: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-8 min-w-0 items-center justify-between gap-2 border-b border-[color:var(--code-border)] px-3",
        className
      )}
    >
      <div className="min-w-0 truncate font-mono text-xs font-normal leading-none text-[color:var(--code-header-fg)]">
        {title}
      </div>
      {children}
    </div>
  )
}
