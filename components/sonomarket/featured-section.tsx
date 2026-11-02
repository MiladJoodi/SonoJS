"use client"

import * as React from "react"

import { SonoMarketProductCard } from "@/components/sonomarket/product-card"
import { useAutoDragScroll } from "@/hooks/use-auto-drag-scroll"
import type { SonoMarketPreviewItem } from "@/lib/sonomarket-preview-data"
import { cn } from "@/lib/utils"

const TABS = ["Featured", "Popular", "New"] as const

function FeaturedMarquee({
  items,
  durationSec,
}: {
  items: SonoMarketPreviewItem[]
  durationSec: number
}) {
  const ref = useAutoDragScroll(durationSec)
  const strip = [...items, ...items, ...items]

  return (
    <div
      ref={ref}
      className="flex w-full touch-pan-y select-none gap-4 overflow-x-auto sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {strip.map((item, i) => (
        <div
          key={`${item.slug}-${i}`}
          className="w-[260px] shrink-0 sm:w-[280px] lg:w-[300px]"
        >
          <SonoMarketProductCard item={item} size="featured" />
        </div>
      ))}
    </div>
  )
}

export function SonoMarketFeaturedSection({
  items,
  className,
}: {
  items: SonoMarketPreviewItem[]
  className?: string
}) {
  const [tab, setTab] = React.useState<(typeof TABS)[number]>("Featured")

  const ordered =
    tab === "Popular"
      ? [...items].sort(
          (a, b) =>
            b.reviewCount - a.reviewCount ||
            b.rating - a.rating ||
            a.title.localeCompare(b.title)
        )
      : tab === "New"
        ? [...items].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        : items

  const durationSec = Math.max(28, ordered.length * 7)

  return (
    <section
      id="sonomarket-browse"
      className={cn("w-full scroll-mt-24", className)}
    >
      <div className="mx-auto mb-4 flex w-full max-w-[1600px] flex-wrap items-end justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-[var(--sm-text)] sm:text-xl">
            <span aria-hidden>🔥</span>
            Featured Products
          </h2>
          <p className="mt-0.5 text-[13px] text-[var(--sm-text-faint)]">
            Handpicked templates and projects
          </p>
        </div>
        <div className="flex rounded-full border border-[var(--sm-border)] bg-[var(--sm-chip)] p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                tab === t
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-[var(--sm-text-secondary)] hover:text-[var(--sm-text)]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {ordered.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-[var(--sm-text-faint)] sm:px-6 lg:px-8">
          Nothing featured yet.
        </p>
      ) : (
        <FeaturedMarquee items={ordered} durationSec={durationSec} />
      )}
    </section>
  )
}
