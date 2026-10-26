"use client"

import type { ReactNode } from "react"

import { DocsAdjacentPager } from "@/components/docs/docs-adjacent-pager"
import { getBlocksAdjacent } from "@/lib/blocks-nav"
import { cn } from "@/lib/utils"

import { BlocksBackButton } from "./blocks-back-button"

/**
 * Block docs title row: back to /blocks, truncate title, prev/next ready blocks.
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

  return (
    <header className={cn("space-y-2", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <BlocksBackButton />
          <h1 className="text-h1 min-w-0 flex-1 truncate" title={title}>
            {title}
          </h1>
        </div>
        <DocsAdjacentPager
          previous={
            previous
              ? { href: previous.href, title: previous.title }
              : undefined
          }
          next={next ? { href: next.href, title: next.title } : undefined}
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
