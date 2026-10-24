import type { ReactNode } from "react"

import { getDocsAdjacent } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

import { DocsAdjacentPager } from "./docs-adjacent-pager"

/**
 * Docs page title row with prev/next. Long titles truncate; pager stays shrink-0.
 */
export function DocsPageHeader({
  title,
  description,
  pathname,
  className,
}: {
  title: string
  description?: ReactNode
  pathname: string
  className?: string
}) {
  const { previous, next } = getDocsAdjacent(pathname)

  return (
    <header className={cn("space-y-2", className)}>
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-h1 min-w-0 flex-1 truncate" title={title}>
          {title}
        </h1>
        <DocsAdjacentPager
          previous={previous}
          next={next}
          className="mt-1.5"
        />
      </div>
      {description ? (
        typeof description === "string" ? (
          <p className="leading-relaxed text-muted-foreground">{description}</p>
        ) : (
          description
        )
      ) : null}
    </header>
  )
}
