"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
} from "lucide-react"

import {
  MARKETPLACE_CATEGORY_LABEL,
  type MarketplaceCategory,
} from "@/lib/marketplace-catalog"
import type { MarketplacePreviewItem } from "@/lib/marketplace-preview-data"
import {
  type MarketplacePriceKey,
  type MarketplaceProductsFilterState,
  type MarketplaceSortKey,
} from "@/components/marketplace/products-filter"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"

const SORT_TABS: { key: MarketplaceSortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "popular", label: "Popular" },
  { key: "recent", label: "Recent" },
]

/** Compact labels for the horizontal rail (full names stay in catalog). */
const RAIL_CATEGORY_LABEL: Record<MarketplaceCategory, string> = {
  dashboard: "Dashboard",
  landing: "Landing",
  saas: "SaaS",
  auth: "Auth",
  ecommerce: "Ecommerce",
  ai: "AI",
  betting: "Betting",
  crypto: "Crypto",
  fintech: "Fintech",
  hero: "Hero",
  portfolio: "Portfolio",
}

const PRICE_OPTIONS: { key: MarketplacePriceKey; label: string }[] = [
  { key: "all", label: "All prices" },
  { key: "free", label: "Free" },
  { key: "paid", label: "Paid" },
]

export function MarketplaceCategoryRail({
  items,
  value,
  onChange,
  className,
}: {
  items: MarketplacePreviewItem[]
  value: MarketplaceProductsFilterState
  onChange: (next: MarketplaceProductsFilterState) => void
  className?: string
}) {
  const categories = React.useMemo(() => {
    const counts = new Map<MarketplaceCategory, number>()
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1)
    }
    return [...counts.entries()].sort(([a], [b]) =>
      MARKETPLACE_CATEGORY_LABEL[a].localeCompare(MARKETPLACE_CATEGORY_LABEL[b])
    )
  }, [items])

  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollStart, setCanScrollStart] = React.useState(false)
  const [canScrollEnd, setCanScrollEnd] = React.useState(false)

  const updateScrollState = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const pos = Math.abs(el.scrollLeft)
    setCanScrollStart(pos > 4)
    setCanScrollEnd(max - pos > 4)
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    const ro = new ResizeObserver(updateScrollState)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      ro.disconnect()
    }
  }, [updateScrollState, categories])

  const scrollCategories = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const rtl = getComputedStyle(el).direction === "rtl"
    const sign = rtl ? -direction : direction
    el.scrollBy({
      left: sign * Math.min(280, el.clientWidth * 0.55),
      behavior: "smooth",
    })
  }

  const activeCategory = value.categories[0] ?? null
  const priceActive = value.price !== "all"
  const priceLabel =
    PRICE_OPTIONS.find((o) => o.key === value.price)?.label ?? "Pricing"

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded-[14px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] p-2 shadow-[var(--sm-card-shadow)] sm:flex-row sm:items-stretch sm:gap-0 sm:p-1.5",
        className
      )}
    >
      {/* Sort — left */}
      <div
        role="tablist"
        aria-label="Sort products"
        className="flex shrink-0 items-center gap-0.5 rounded-[10px] bg-[var(--sm-chip)] p-1 sm:me-2"
      >
        {SORT_TABS.map((tab) => {
          const active = value.sort === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange({ ...value, sort: tab.key })}
              className={cn(
                "inline-flex h-9 shrink-0 cursor-pointer items-center rounded-lg px-3 text-[13px] font-medium whitespace-nowrap transition-colors",
                active
                  ? "bg-[var(--sm-bg-elevated)] text-[var(--sm-text)] shadow-sm ring-1 ring-[var(--sm-border)]"
                  : "text-[var(--sm-text-secondary)] hover:text-[var(--sm-text)]"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <span
        aria-hidden
        className="hidden w-px shrink-0 self-stretch bg-[var(--sm-border)] sm:block"
      />

      {/* Categories — center */}
      <div className="relative min-w-0 flex-1 sm:mx-2">
        {canScrollStart ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 start-0 z-[1] w-8 bg-gradient-to-r from-[var(--sm-bg-elevated)] to-transparent rtl:bg-gradient-to-l"
            />
            <button
              type="button"
              aria-label="Scroll categories backward"
              onClick={() => scrollCategories(-1)}
              className="absolute start-0 top-1/2 z-10 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text-secondary)] shadow-sm hover:text-[var(--sm-text)]"
            >
              <ChevronLeftIcon className="size-3.5 icon-dir" aria-hidden />
            </button>
          </>
        ) : null}

        <div
          ref={scrollerRef}
          className={cn(
            "flex h-full items-center gap-1 overflow-x-auto py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            canScrollStart && "ps-9",
            canScrollEnd && "pe-9"
          )}
        >
          <button
            type="button"
            aria-pressed={activeCategory === null}
            onClick={() => onChange({ ...value, categories: [], stacks: [] })}
            className={cn(
              "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors",
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
            )}
          >
            All
            <span
              className={cn(
                "tabular-nums text-[11px]",
                activeCategory === null
                  ? "text-primary-foreground/80"
                  : "text-[var(--sm-text-faint)]"
              )}
            >
              {items.length}
            </span>
          </button>

          {categories.map(([cat, count]) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                title={MARKETPLACE_CATEGORY_LABEL[cat]}
                onClick={() =>
                  onChange({
                    ...value,
                    categories: active ? [] : [cat],
                    stacks: [],
                  })
                }
                className={cn(
                  "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                    : "text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
                )}
              >
                {RAIL_CATEGORY_LABEL[cat]}
                <span
                  className={cn(
                    "tabular-nums text-[11px]",
                    active ? "text-primary/80" : "text-[var(--sm-text-faint)]"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {canScrollEnd ? (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 end-0 z-[1] w-8 bg-gradient-to-l from-[var(--sm-bg-elevated)] to-transparent rtl:bg-gradient-to-r"
            />
            <button
              type="button"
              aria-label="Scroll categories forward"
              onClick={() => scrollCategories(1)}
              className="absolute end-0 top-1/2 z-10 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text-secondary)] shadow-sm hover:text-[var(--sm-text)]"
            >
              <ChevronRightIcon className="size-3.5 icon-dir" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      <span
        aria-hidden
        className="hidden w-px shrink-0 self-stretch bg-[var(--sm-border)] sm:block"
      />

      {/* Pricing — right */}
      <div className="flex shrink-0 items-center sm:ms-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border px-3.5 text-[13px] font-medium whitespace-nowrap transition-colors sm:w-auto",
              priceActive
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-[var(--sm-border)] bg-[var(--sm-chip)] text-[var(--sm-text)] hover:bg-[var(--sm-bg-elevated)]"
            )}
          >
            <TagIcon className="size-3.5 opacity-70" aria-hidden />
            {priceActive ? priceLabel : "Pricing"}
            <ChevronDownIcon className="size-3.5 opacity-70" aria-hidden />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-36">
            <DropdownMenuRadioGroup
              value={value.price}
              onValueChange={(next) =>
                onChange({
                  ...value,
                  price: next as MarketplacePriceKey,
                })
              }
            >
              {PRICE_OPTIONS.map((opt) => (
                <DropdownMenuRadioItem key={opt.key} value={opt.key}>
                  {opt.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
