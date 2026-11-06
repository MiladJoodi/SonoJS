"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FilterIcon } from "lucide-react"

import { MarketplaceFeaturedSection } from "@/components/marketplace/featured-section"
import { MarketplaceHero } from "@/components/marketplace/hero"
import { MarketplaceProductCard } from "@/components/marketplace/product-card"
import {
  applyMarketplaceProductsFilter,
  EMPTY_PRODUCTS_FILTER,
  MarketplaceProductsFilter,
  MarketplaceProductsToolbar,
  type MarketplaceProductsFilterState,
  type MarketplaceSortKey,
} from "@/components/marketplace/products-filter"
import {
  getMarketplacePreviewItems,
  type MarketplacePreviewItem,
} from "@/lib/marketplace-preview-data"
import type { MarketplaceCategory } from "@/lib/marketplace-catalog"
import { cn } from "@/lib/utils"

const CATEGORY_IDS = [
  "dashboard",
  "landing",
  "saas",
  "auth",
  "ecommerce",
  "ai",
  "betting",
  "crypto",
  "fintech",
  "hero",
] as const satisfies readonly MarketplaceCategory[]

function parseSortParam(raw: string | null): MarketplaceSortKey {
  if (raw === "rating" || raw === "name") return raw
  return "default"
}

function parseCategoryParam(raw: string | null): MarketplaceCategory[] {
  if (!raw) return []
  const set = new Set<string>(CATEGORY_IDS)
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is MarketplaceCategory => set.has(s))
}

function MarketplaceProductsSection({
  items,
  filters,
  setFilters,
  filtered,
  filtersOpen,
  setFiltersOpen,
  activeFilterCount,
  resultsRef,
  resultsMinHeight,
}: {
  items: MarketplacePreviewItem[]
  filters: MarketplaceProductsFilterState
  setFilters: React.Dispatch<
    React.SetStateAction<MarketplaceProductsFilterState>
  >
  filtered: MarketplacePreviewItem[]
  filtersOpen: boolean
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>
  activeFilterCount: number
  resultsRef: React.RefObject<HTMLDivElement | null>
  resultsMinHeight: number | undefined
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--sm-text)] sm:text-xl">
            All products
          </h2>
          <p className="mt-0.5 min-h-[1.25rem] text-[13px] tabular-nums text-[var(--sm-text-faint)]">
            <span className="inline-block min-w-[9ch]">
              {filtered.length} of {items.length}
            </span>
          </p>
        </div>

        <button
          type="button"
          aria-label="Filters"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((v) => !v)}
          className={cn(
            "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium",
            filtersOpen || activeFilterCount > 0
              ? "border-primary/40 bg-primary/10 text-primary"
              : "border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text)]"
          )}
        >
          <FilterIcon className="size-3.5" aria-hidden />
          Filters
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full text-[10px] font-bold tabular-nums",
              activeFilterCount > 0
                ? "bg-primary text-primary-foreground"
                : "bg-transparent text-transparent"
            )}
            aria-hidden={activeFilterCount === 0}
          >
            {activeFilterCount || 0}
          </span>
        </button>
      </div>

      {filtersOpen ? (
        <MarketplaceProductsFilter
          items={items}
          value={filters}
          onChange={setFilters}
          className="max-w-md"
        />
      ) : null}

      <MarketplaceProductsToolbar value={filters} onChange={setFilters} />

      <div
        ref={resultsRef}
        style={
          resultsMinHeight && filtered.length < items.length
            ? { minHeight: resultsMinHeight }
            : undefined
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {filtered.map((item: MarketplacePreviewItem, index: number) => (
            <MarketplaceProductCard
              key={item.slug}
              item={item}
              loading={index < 6 ? "eager" : "lazy"}
            />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-[var(--sm-text-faint)]">
            Nothing matches these filters.
          </p>
        ) : null}
      </div>
    </div>
  )
}

export function MarketplaceCatalogPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const items = React.useMemo(() => getMarketplacePreviewItems(), [])

  const [filters, setFilters] = React.useState<MarketplaceProductsFilterState>(
    () => ({
      ...EMPTY_PRODUCTS_FILTER,
      q: searchParams.get("q") ?? "",
      categories: parseCategoryParam(searchParams.get("category")),
      sort: parseSortParam(searchParams.get("sort")),
    })
  )
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  const filtered = React.useMemo(
    () => applyMarketplaceProductsFilter(items, filters),
    [items, filters]
  )

  const resultsRef = React.useRef<HTMLDivElement>(null)
  const [resultsMinHeight, setResultsMinHeight] = React.useState<number>()

  React.useLayoutEffect(() => {
    const el = resultsRef.current
    if (!el) return
    const measure = () => {
      if (filtered.length !== items.length) return
      const h = el.getBoundingClientRect().height
      if (h > 0) setResultsMinHeight(h)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [filtered.length, items.length, items])

  React.useEffect(() => {
    const params = new URLSearchParams()
    if (filters.q.trim()) params.set("q", filters.q.trim())
    if (filters.categories.length) {
      params.set("category", filters.categories.join(","))
    }
    if (filters.sort !== "default") params.set("sort", filters.sort)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [filters, pathname, router])

  const activeFilterCount = filters.categories.length

  return (
    <div
      data-marketplace=""
      className="min-h-0 flex-1 bg-[var(--sm-bg)] text-[var(--sm-text)]"
    >
      <MarketplaceHero />

      <div className="w-full py-8 lg:py-10">
        <MarketplaceFeaturedSection items={items} />
      </div>

      <div className="w-full px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <section id="marketplace-all" className="scroll-mt-24">
          <MarketplaceProductsSection
            items={items}
            filters={filters}
            setFilters={setFilters}
            filtered={filtered}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            activeFilterCount={activeFilterCount}
            resultsRef={resultsRef}
            resultsMinHeight={resultsMinHeight}
          />
        </section>
      </div>
    </div>
  )
}
