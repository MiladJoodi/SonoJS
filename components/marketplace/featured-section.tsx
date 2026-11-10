"use client"

import * as React from "react"

import { MarketplaceProductCard } from "@/components/marketplace/product-card"
import { useAutoDragScroll } from "@/hooks/use-auto-drag-scroll"
import {
  compareMarketplaceNewest,
  type MarketplacePreviewItem,
} from "@/lib/marketplace-preview-data"
import { cn } from "@/lib/utils"

const TABS = ["Featured", "Popular"] as const

/** First visible featured cards in the horizontal strip (≈ one viewport row). */
const MARKETPLACE_FEATURED_ATF_COUNT = 4

/** Cap unique cards before ×3 marquee (keeps DOM + video observers bounded). */
const MARKETPLACE_FEATURED_MAX = 12

function FeaturedMarquee({
  items,
  durationSec,
}: {
  items: MarketplacePreviewItem[]
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
          <MarketplaceProductCard
            item={item}
            size="featured"
            loading={i < MARKETPLACE_FEATURED_ATF_COUNT ? "eager" : "lazy"}
          />
        </div>
      ))}
    </div>
  )
}

export function MarketplaceFeaturedSection({
  items,
  className,
}: {
  items: MarketplacePreviewItem[]
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
      : [...items].sort(compareMarketplaceNewest)

  const featured = ordered.slice(0, MARKETPLACE_FEATURED_MAX)
  const durationSec = Math.max(28, featured.length * 7)

  return (
    <section
      id="marketplace-browse"
      className={cn("w-full scroll-mt-24", className)}
    >
      <div className="mb-4 flex w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <h2 className="min-w-0 shrink truncate text-lg font-bold tracking-tight text-[var(--sm-text)] sm:text-xl">
          <span aria-hidden className="me-2">
            🔥
          </span>
          Featured Products
        </h2>
        <div className="flex shrink-0 rounded-full border border-[var(--sm-border)] bg-[var(--sm-chip)] p-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "cursor-pointer rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-colors sm:px-3.5 sm:text-[12.5px]",
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

      {featured.length === 0 ? (
        <p className="px-4 py-8 text-center text-[13px] text-[var(--sm-text-faint)] sm:px-6 lg:px-8">
          Nothing featured yet.
        </p>
      ) : (
        <FeaturedMarquee items={featured} durationSec={durationSec} />
      )}
    </section>
  )
}
