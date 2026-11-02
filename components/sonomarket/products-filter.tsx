"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"

import {
  MARKETPLACE_CATEGORY_LABEL,
  MARKETPLACE_STACK_LABEL,
  type MarketplaceCategory,
  type MarketplaceStack,
} from "@/lib/marketplace-catalog"
import type { SonoMarketPreviewItem } from "@/lib/sonomarket-preview-data"
import { cn } from "@/lib/utils"

export type SonoMarketSortKey = "default" | "rating" | "name"

export type SonoMarketProductsFilterState = {
  q: string
  categories: MarketplaceCategory[]
  stacks: MarketplaceStack[]
  sort: SonoMarketSortKey
}

export const EMPTY_PRODUCTS_FILTER: SonoMarketProductsFilterState = {
  q: "",
  categories: [],
  stacks: [],
  sort: "default",
}

export function applySonoMarketProductsFilter(
  items: SonoMarketPreviewItem[],
  state: SonoMarketProductsFilterState
): SonoMarketPreviewItem[] {
  let next = items

  const q = state.q.trim().toLowerCase()
  if (q) {
    next = next.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.tagline.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.stack.some((s) =>
          MARKETPLACE_STACK_LABEL[s].toLowerCase().includes(q)
        )
    )
  }

  if (state.categories.length > 0) {
    next = next.filter((i) => state.categories.includes(i.category))
  }

  if (state.stacks.length > 0) {
    next = next.filter((i) => state.stacks.every((s) => i.stack.includes(s)))
  }

  if (state.sort === "rating") {
    next = [...next].sort(
      (a, b) => b.rating - a.rating || a.title.localeCompare(b.title)
    )
  } else if (state.sort === "name") {
    next = [...next].sort((a, b) => a.title.localeCompare(b.title))
  } else {
    next = [...next].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }

  return next
}

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value]
}

export function SonoMarketProductsFilter({
  items,
  value,
  onChange,
  className,
}: {
  items: SonoMarketPreviewItem[]
  value: SonoMarketProductsFilterState
  onChange: (next: SonoMarketProductsFilterState) => void
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

  const hasActive = value.categories.length > 0

  return (
    <aside
      className={cn(
        "relative flex w-full flex-col rounded-[12px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] p-5",
        className
      )}
    >
      {hasActive ? (
        <button
          type="button"
          onClick={() => onChange({ ...value, categories: [] })}
          className="absolute end-3 top-3 z-10 inline-flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-[12px] font-medium text-[var(--sm-text-faint)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
        >
          <XIcon className="size-3.5" aria-hidden />
          Clear
        </button>
      ) : null}

      <p className="mb-3 text-[12px] font-semibold tracking-[0.08em] text-[var(--sm-text-faint)] uppercase">
        Category
      </p>
      <ul className="space-y-0.5">
        {categories.map(([cat, count]) => {
          const active = value.categories.includes(cat)
          return (
            <li key={cat}>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...value,
                    categories: toggleIn(value.categories, cat),
                    stacks: [],
                  })
                }
                aria-pressed={active}
                className={cn(
                  "flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1.5 text-start transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-[var(--sm-text)] hover:bg-[var(--sm-chip)]"
                )}
              >
                <span className="text-[14px] font-medium leading-none">
                  {MARKETPLACE_CATEGORY_LABEL[cat]}
                </span>
                <span
                  className={cn(
                    "tabular-nums text-[13px]",
                    active
                      ? "text-primary"
                      : "text-[var(--sm-text-faint)]"
                  )}
                >
                  {count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

/** Horizontal search + sort bar above the product grid. */
export function SonoMarketProductsToolbar({
  value,
  onChange,
  className,
}: {
  value: SonoMarketProductsFilterState
  onChange: (next: SonoMarketProductsFilterState) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center",
        className
      )}
    >
      <div className="relative min-w-0 flex-1">
        <SearchIcon
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-[var(--sm-text-faint)]"
          aria-hidden
        />
        <input
          type="search"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder="Search products…"
          aria-label="Search products"
          className="h-[46px] w-full rounded-md border border-[var(--sm-border)] bg-[var(--sm-input,var(--sm-bg-elevated))] pe-3 ps-9 text-sm text-[var(--sm-text)] outline-none placeholder:text-[var(--sm-text-faint)] focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              sort: value.sort === "rating" ? "default" : "rating",
            })
          }
          aria-pressed={value.sort === "rating"}
          className={cn(
            "h-[46px] cursor-pointer rounded-md border px-4 text-[14px] font-medium transition-colors",
            value.sort === "rating"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
          )}
        >
          Top rated
        </button>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              sort: value.sort === "name" ? "default" : "name",
            })
          }
          aria-pressed={value.sort === "name"}
          className={cn(
            "h-[46px] cursor-pointer rounded-md border px-4 text-[14px] font-medium transition-colors",
            value.sort === "name"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
          )}
        >
          A–Z
        </button>
      </div>
    </div>
  )
}
