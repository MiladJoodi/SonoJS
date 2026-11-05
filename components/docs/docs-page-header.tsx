import type { ReactNode } from "react"

import { JsonLd } from "@/components/seo/json-ld"
import { getAiAdjacent } from "@/lib/ai-nav"
import { getCarouselsAdjacent } from "@/lib/carousels-nav"
import { get3dAdjacent } from "@/lib/3d-nav"
import { getDocsAdjacent } from "@/lib/docs-nav"
import { breadcrumbListJsonLd } from "@/lib/seo-jsonld"
import { cn } from "@/lib/utils"

import { DocsAdjacentPager } from "./docs-adjacent-pager"

function adjacentForPath(pathname: string) {
  if (pathname.startsWith("/3d")) return get3dAdjacent(pathname)
  if (pathname.startsWith("/ai")) return getAiAdjacent(pathname)
  if (pathname.startsWith("/carousels")) return getCarouselsAdjacent(pathname)
  return getDocsAdjacent(pathname)
}

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
  const { previous, next } = adjacentForPath(pathname)
  const breadcrumbs = breadcrumbListJsonLd(pathname)

  return (
    <header className={cn("space-y-2", className)}>
      {breadcrumbs ? <JsonLd data={breadcrumbs} /> : null}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-h1 min-w-0 flex-1 truncate" title={title}>
          {title}
        </h1>
        <DocsAdjacentPager
          previous={previous}
          next={next}
          className={cn(
            "mt-1.5",
            /* Mobile: pager lives in Browse sticky bar */
            "hidden lg:flex"
          )}
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
