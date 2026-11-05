"use client"

import type { ReactNode } from "react"

import { DocsAdjacentPager } from "@/components/docs/docs-adjacent-pager"
import { JsonLd } from "@/components/seo/json-ld"
import { getBlocksAdjacent } from "@/lib/blocks-nav"
import { breadcrumbListJsonLd } from "@/lib/seo-jsonld"
import { cn } from "@/lib/utils"

/**
 * Block docs title row: truncate title, prev/next ready blocks.
 * Matches the charts view header chrome.
 */
export function BlocksPageHeader({
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
  const { previous, next } = getBlocksAdjacent(pathname)
  const breadcrumbs = breadcrumbListJsonLd(pathname)

  return (
    <header className={cn("space-y-2", className)}>
      {breadcrumbs ? <JsonLd data={breadcrumbs} /> : null}
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-h1 min-w-0 flex-1 truncate" title={title}>
          {title}
        </h1>
        <DocsAdjacentPager
          previous={
            previous
              ? { href: previous.href, title: previous.title }
              : undefined
          }
          next={next ? { href: next.href, title: next.title } : undefined}
          className="mt-1.5 hidden lg:flex"
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
