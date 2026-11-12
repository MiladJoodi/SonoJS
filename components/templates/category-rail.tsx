"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
} from "lucide-react"

import {
  TEMPLATE_CATEGORY_LABEL,
  type TemplateCategory,
} from "@/lib/templates-catalog-meta"
import type { TemplatePreviewItem } from "@/lib/templates-preview-data"
import {
  type TemplatePriceKey,
  type TemplateProductsFilterState,
} from "@/components/templates/products-filter"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@sonojs/ui/components/sheet"

/** Compact labels for the horizontal rail (full names stay in catalog). */
const RAIL_CATEGORY_LABEL: Record<TemplateCategory, string> = {
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

const PRICE_OPTIONS: { key: TemplatePriceKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "free", label: "Free" },
  { key: "paid", label: "Pro" },
]

function useCategoryCounts(items: TemplatePreviewItem[]) {
  return React.useMemo(() => {
    const counts = new Map<TemplateCategory, number>()
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1)
    }
    return [...counts.entries()].sort(([a], [b]) =>
      TEMPLATE_CATEGORY_LABEL[a].localeCompare(TEMPLATE_CATEGORY_LABEL[b])
    )
  }, [items])
}

function activeFilterCount(value: TemplateProductsFilterState) {
  return (value.categories.length > 0 ? 1 : 0) + (value.price !== "all" ? 1 : 0)
}

function filterSummary(value: TemplateProductsFilterState) {
  const parts: string[] = []
  const cat = value.categories[0]
  if (cat) parts.push(RAIL_CATEGORY_LABEL[cat])
  if (value.price === "free") parts.push("Free")
  else if (value.price === "paid") parts.push("Pro")
  return parts.join(" · ")
}

function PriceSegment({
  value,
  onChange,
  className,
}: {
  value: TemplateProductsFilterState
  onChange: (next: TemplateProductsFilterState) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      aria-label="Price"
      className={cn("flex h-9 shrink-0 items-center gap-0.5", className)}
    >
      {PRICE_OPTIONS.map((opt) => {
        const active = value.price === opt.key
        return (
          <button
            key={opt.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange({ ...value, price: opt.key })}
            className={cn(
              "inline-flex h-9 shrink-0 cursor-pointer items-center rounded-full px-2.5 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-3",
              active
                ? "bg-primary text-primary-foreground"
                : "text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]"
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function CategoryPills({
  items,
  categories,
  value,
  onChange,
  layout,
}: {
  items: TemplatePreviewItem[]
  categories: [TemplateCategory, number][]
  value: TemplateProductsFilterState
  onChange: (next: TemplateProductsFilterState) => void
  layout: "rail" | "sheet"
}) {
  const activeCategory = value.categories[0] ?? null
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollStart, setCanScrollStart] = React.useState(false)
  const [canScrollEnd, setCanScrollEnd] = React.useState(false)

  const updateScrollState = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el || layout !== "rail") return
    const max = el.scrollWidth - el.clientWidth
    const pos = Math.abs(el.scrollLeft)
    setCanScrollStart(pos > 4)
    setCanScrollEnd(max - pos > 4)
  }, [layout])

  React.useEffect(() => {
    if (layout !== "rail") return
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
  }, [updateScrollState, categories, layout])

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

  const pill = (
    active: boolean,
    label: string,
    count: number,
    onClick: () => void,
    key?: string
  ) => (
    <button
      key={key}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13px] font-medium whitespace-nowrap transition-colors",
        layout === "rail" ? "h-9 shrink-0" : "h-10 w-full justify-between",
        active
          ? key === "all" || (!key && label === "All")
            ? "bg-primary text-primary-foreground"
            : "bg-primary/15 text-primary ring-1 ring-primary/30"
          : "text-[var(--sm-text-secondary)] hover:bg-[var(--sm-chip)] hover:text-[var(--sm-text)]",
        layout === "sheet" && !active && "bg-[var(--sm-chip)]/60"
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          "tabular-nums text-[11px]",
          active && (key === "all" || label === "All")
            ? "text-primary-foreground/80"
            : active
              ? "text-primary/80"
              : "text-[var(--sm-text-faint)]"
        )}
      >
        {count}
      </span>
    </button>
  )

  const allPill = pill(
    activeCategory === null,
    "All",
    items.length,
    () => onChange({ ...value, categories: [], stacks: [] }),
    "all"
  )

  const catPills = categories.map(([cat, count]) => {
    const active = activeCategory === cat
    return pill(
      active,
      layout === "sheet"
        ? TEMPLATE_CATEGORY_LABEL[cat]
        : RAIL_CATEGORY_LABEL[cat],
      count,
      () =>
        onChange({
          ...value,
          categories: active ? [] : [cat],
          stacks: [],
        }),
      cat
    )
  })

  if (layout === "sheet") {
    return (
      <div className="flex flex-col gap-1.5">
        {allPill}
        {catPills}
      </div>
    )
  }

  return (
    <div className="relative min-w-0 flex-1">
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
          "flex h-9 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          canScrollStart && "ps-9",
          canScrollEnd && "pe-9"
        )}
      >
        {allPill}
        {catPills}
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
  )
}

export function TemplateCategoryRail({
  items,
  value,
  onChange,
  className,
}: {
  items: TemplatePreviewItem[]
  value: TemplateProductsFilterState
  onChange: (next: TemplateProductsFilterState) => void
  className?: string
}) {
  const categories = useCategoryCounts(items)
  const [open, setOpen] = React.useState(false)
  const activeCount = activeFilterCount(value)
  const summary = filterSummary(value)
  const hasActive = activeCount > 0

  return (
    <>
      {/* Desktop / tablet: one-line rail */}
      <div
        className={cn(
          "hidden w-full items-center gap-2 rounded-[14px] border border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] p-1.5 shadow-[var(--sm-card-shadow)] md:flex",
          className
        )}
      >
        <CategoryPills
          items={items}
          categories={categories}
          value={value}
          onChange={onChange}
          layout="rail"
        />
        <span aria-hidden className="h-5 w-px shrink-0 bg-[var(--sm-border)]" />
        <PriceSegment value={value} onChange={onChange} />
      </div>

      {/* Mobile: Filter trigger → bottom sheet (grabber + label = discoverable) */}
      <div className={cn("md:hidden", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            "flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-[14px] border px-3.5 text-start shadow-[var(--sm-card-shadow)] transition-colors",
            hasActive
              ? "border-primary/35 bg-primary/10 text-primary"
              : "border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] text-[var(--sm-text)]"
          )}
        >
          <SlidersHorizontalIcon className="size-4 shrink-0 opacity-80" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
            Filters
            {summary ? (
              <span
                className={cn(
                  "font-normal",
                  hasActive
                    ? "text-primary/80"
                    : "text-[var(--sm-text-faint)]"
                )}
              >
                {" "}
                · {summary}
              </span>
            ) : (
              <span className="font-normal text-[var(--sm-text-faint)]">
                {" "}
                · Category & price
              </span>
            )}
          </span>
          {hasActive ? (
            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground tabular-nums">
              {activeCount}
            </span>
          ) : null}
          <ChevronDownIcon
            className={cn(
              "size-4 shrink-0 opacity-60 transition-transform",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="max-h-[85dvh] gap-0 rounded-t-[16px] border-[var(--sm-border)] bg-[var(--sm-bg-elevated)] p-0"
          >
            {/* Grabber — classic bottom-sheet cue */}
            <div className="flex justify-center pt-3 pb-1" aria-hidden>
              <span className="h-1 w-10 rounded-full bg-[var(--sm-border)]" />
            </div>

            <SheetHeader className="border-b border-[var(--sm-border)] px-4 pb-3 pt-1">
              <SheetTitle className="text-[var(--sm-text)]">Filters</SheetTitle>
              <SheetDescription className="text-[var(--sm-text-faint)]">
                Pick a category and price. Changes apply instantly.
              </SheetDescription>
            </SheetHeader>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-2 text-[12px] font-semibold tracking-[0.06em] text-[var(--sm-text-faint)] uppercase">
                Price
              </p>
              <PriceSegment
                value={value}
                onChange={onChange}
                className="mb-5 w-full justify-stretch [&>button]:flex-1 [&>button]:justify-center"
              />

              <p className="mb-2 text-[12px] font-semibold tracking-[0.06em] text-[var(--sm-text-faint)] uppercase">
                Category
              </p>
              <CategoryPills
                items={items}
                categories={categories}
                value={value}
                onChange={onChange}
                layout="sheet"
              />
            </div>

            <SheetFooter className="flex-row gap-2 border-t border-[var(--sm-border)] p-4">
              {hasActive ? (
                <Button
                  type="button"
                  variant="outline"
                  className="h-[46px] flex-1 cursor-pointer border-[var(--sm-border)]"
                  onClick={() =>
                    onChange({
                      ...value,
                      categories: [],
                      stacks: [],
                      price: "all",
                    })
                  }
                >
                  Clear
                </Button>
              ) : null}
              <Button
                type="button"
                className="h-[46px] flex-1 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
