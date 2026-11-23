"use client"

import Link from "next/link"

import type { DocsNavGroup } from "@/lib/docs-nav"
import { cn } from "@/lib/utils"

export type ComponentsDirectoryItem = {
  title: string
  href: string
  slug: string
  featured?: boolean
}

/** Name-only catalog - sectioned links, no wireframe thumbs. */
export function ComponentsDirectory({
  groups,
}: {
  groups: DocsNavGroup[]
}) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-10 md:gap-12">
      {groups.map((group) => (
        <section
          key={group.title}
          className="scroll-mt-[calc(var(--header-height)+1rem)]"
        >
          <div className="mb-3 flex min-w-0 items-center gap-2 border-b border-border/50 pb-2 md:mb-4">
            <h2 className="text-sm font-semibold tracking-tight md:text-base">
              {group.title}
            </h2>
            <span
              aria-hidden
              className="mb-0.5 min-w-4 flex-1 border-b border-dashed border-border/50"
            />
            <span className="shrink-0 text-xs text-muted-foreground/70 tabular-nums">
              {group.pages.length}
            </span>
          </div>

          <ul className="flex flex-wrap gap-2">
            {group.pages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  prefetch={false}
                  className={cn(
                    "inline-flex h-10 cursor-pointer items-center rounded-md border border-border/70 bg-card px-3 text-sm font-medium text-foreground no-underline",
                    "transition-colors hover:border-border hover:bg-muted/40",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
