"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { TemplateCategoryRail } from "@/components/templates/category-rail"
import { TemplateFeaturedSection } from "@/components/templates/featured-section"
import { TemplateHero } from "@/components/templates/hero"
import { TemplateProductCard } from "@/components/templates/product-card"
import {
  applyTemplateProductsFilter,
  EMPTY_PRODUCTS_FILTER,
  type TemplatePriceKey,
  type TemplateProductsFilterState,
} from "@/components/templates/products-filter"
import type { TemplatePreviewItem } from "@/lib/templates-preview-data"
import type { TemplateCategory } from "@/lib/templates-catalog-meta"
import { Button } from "@sonojs/ui/components/button"

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
  "portfolio",
] as const satisfies readonly TemplateCategory[]

/** Initial / reset window size for All products. */
const TEMPLATES_PAGE_SIZE = 24
/** Eager-load covers for the first N *visible* cards. */
const TEMPLATES_EAGER_COVERS = 6

function parsePriceParam(raw: string | null): TemplatePriceKey {
  if (raw === "free" || raw === "paid") return raw
  return "all"
}

function parseCategoryParam(raw: string | null): TemplateCategory[] {
  if (!raw) return []
  const set = new Set<string>(CATEGORY_IDS)
  const first = raw
    .split(",")
    .map((s) => s.trim())
    .find((s): s is TemplateCategory => set.has(s))
  return first ? [first] : []
}

function TemplateProductsSection({
  items,
  filters,
  setFilters,
  filtered,
  resultsRef,
  resultsMinHeight,
}: {
  items: TemplatePreviewItem[]
  filters: TemplateProductsFilterState
  setFilters: React.Dispatch<
    React.SetStateAction<TemplateProductsFilterState>
  >
  filtered: TemplatePreviewItem[]
  resultsRef: React.RefObject<HTMLDivElement | null>
  resultsMinHeight: number | undefined
}) {
  const [visibleCount, setVisibleCount] = React.useState(TEMPLATES_PAGE_SIZE)
  const sentinelRef = React.useRef<HTMLDivElement>(null)

  // Reset window whenever filter (or result set) changes.
  React.useEffect(() => {
    setVisibleCount(TEMPLATES_PAGE_SIZE)
  }, [
    filters.categories.join(","),
    filters.price,
    filters.stacks.join(","),
    filtered.length,
  ])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const loadMore = React.useCallback(() => {
    setVisibleCount((n) => Math.min(n + TEMPLATES_PAGE_SIZE, filtered.length))
  }, [filtered.length])

  React.useEffect(() => {
    if (!hasMore) return
    const node = sentinelRef.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) loadMore()
      },
      { root: null, rootMargin: "240px 0px", threshold: 0 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loadMore, visible.length])

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
      </div>

      <TemplateCategoryRail
        items={items}
        value={filters}
        onChange={setFilters}
      />

      <div
        ref={resultsRef}
        style={
          resultsMinHeight && filtered.length < items.length
            ? { minHeight: resultsMinHeight }
            : undefined
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {visible.map((item: TemplatePreviewItem, index: number) => (
            <TemplateProductCard
              key={item.slug}
              item={item}
              loading={index < TEMPLATES_EAGER_COVERS ? "eager" : "lazy"}
            />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-[var(--sm-text-faint)]">
            Nothing matches these filters.
          </p>
        ) : null}
        {hasMore ? (
          <div className="flex flex-col items-center gap-3 pt-6 pb-2">
            <div ref={sentinelRef} className="h-px w-full" aria-hidden />
            <Button
              type="button"
              variant="outline"
              onClick={loadMore}
              className="cursor-pointer border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] shadow-none"
            >
              Load more
            </Button>
            <p className="text-[12px] tabular-nums text-[var(--sm-text-faint)]">
              Showing {visible.length} of {filtered.length}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function TemplateCatalogPage({
  items,
}: {
  /** Thin list rows from the server - no long product bodies. */
  items: TemplatePreviewItem[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = React.useState<TemplateProductsFilterState>(
    () => ({
      ...EMPTY_PRODUCTS_FILTER,
      categories: parseCategoryParam(searchParams.get("category")),
      price: parsePriceParam(searchParams.get("price")),
    })
  )

  const filtered = React.useMemo(
    () => applyTemplateProductsFilter(items, filters),
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
    if (filters.categories.length) {
      params.set("category", filters.categories[0])
    }
    if (filters.price !== "all") params.set("price", filters.price)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [filters, pathname, router])

  return (
    <div
      data-templates=""
      className="min-h-0 flex-1 bg-[var(--sm-bg)] text-[var(--sm-text)]"
    >
      <TemplateHero />

      <div className="w-full py-8 lg:py-10">
        <TemplateFeaturedSection items={items} />
      </div>

      <div className="w-full px-4 pb-6 sm:px-6 lg:px-8 lg:pb-8">
        <section id="templates-all" className="scroll-mt-24">
          <TemplateProductsSection
            items={items}
            filters={filters}
            setFilters={setFilters}
            filtered={filtered}
            resultsRef={resultsRef}
            resultsMinHeight={resultsMinHeight}
          />
        </section>
      </div>
    </div>
  )
}
