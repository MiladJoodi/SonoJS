"use client"

import { marketplaceProjects } from "@/lib/marketplace-catalog"
import { cn } from "@/lib/utils"

export function MarketStats({ className }: { className?: string }) {
  const count = marketplaceProjects.length
  const categories = new Set(marketplaceProjects.map((p) => p.category)).size

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground",
        className
      )}
      role="status"
    >
      <span className="inline-flex items-center gap-2">
        <span className="relative flex size-2" aria-hidden>
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span>
          <span className="font-medium tabular-nums text-foreground">
            {count}
          </span>{" "}
          {count === 1 ? "project" : "projects"}
        </span>
      </span>
      {categories > 1 ? (
        <>
          <span className="hidden text-border sm:inline" aria-hidden>
            ·
          </span>
          <span>
            <span className="font-medium tabular-nums text-foreground">
              {categories}
            </span>{" "}
            categories
          </span>
        </>
      ) : null}
    </div>
  )
}
