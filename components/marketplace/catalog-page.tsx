"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FilterIcon, ShoppingBagIcon, XIcon } from "lucide-react"

import {
  CatalogFilters,
  type CatalogFilterState,
} from "@/components/marketplace/catalog-filters"
import { MarketStats } from "@/components/marketplace/market-stats"
import {
  MarketplaceOfferColumn,
  useMarketplaceOfferRail,
} from "@/components/marketplace/marketplace-offer-column"
import { ProjectCard } from "@/components/marketplace/project-card"
import {
  MARKETPLACE_CATEGORY_LABEL,
  MARKETPLACE_STACK_LABEL,
  marketplaceProjects,
  type MarketplaceCategory,
  type MarketplaceStack,
} from "@/lib/marketplace-catalog"
import { Button } from "@sonojs/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import { cn } from "@/lib/utils"

type SortKey = "best" | "newest" | "price-asc" | "price-desc"

function parseListParam<T extends string>(
  raw: string | null,
  allowed: readonly T[]
): T[] {
  if (!raw) return []
  const set = new Set(allowed)
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is T => set.has(s as T))
}

function filterProjects(state: CatalogFilterState, sort: SortKey) {
  const q = state.q.trim().toLowerCase()
  let list = marketplaceProjects.filter((p) => {
    if (state.categories.length && !state.categories.includes(p.category)) {
      return false
    }
    if (
      state.stacks.length &&
      !state.stacks.every((s) => p.stack.includes(s))
    ) {
      return false
    }
    if (!q) return true
    const hay = `${p.title} ${p.tagline} ${p.description}`.toLowerCase()
    return hay.includes(q)
  })

  list = [...list].sort((a, b) => {
    if (sort === "newest") {
      return b.updatedAt.localeCompare(a.updatedAt)
    }
    if (sort === "price-asc") return a.priceCents - b.priceCents
    if (sort === "price-desc") return b.priceCents - a.priceCents
    return b.rating * b.reviewCount - a.rating * a.reviewCount
  })

  return list
}

export function MarketplaceCatalogPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const showOfferRail = useMarketplaceOfferRail()

  const [filters, setFilters] = React.useState<CatalogFilterState>(() => ({
    q: searchParams.get("q") ?? "",
    categories: parseListParam(
      searchParams.get("category"),
      [
        "dashboard",
        "landing",
        "saas",
        "auth",
        "ecommerce",
        "ai",
      ] as const satisfies readonly MarketplaceCategory[]
    ),
    stacks: parseListParam(
      searchParams.get("stack"),
      [
        "nextjs",
        "react",
        "tailwind",
        "typescript",
        "javascript",
        "html",
        "css",
        "sass",
        "nodejs",
        "d3",
        "threejs",
        "reactquery",
        "socketio",
        "recharts",
        "clerk",
        "authjs",
        "jwt",
        "linkedin",
        "github",
        "medium",
        "devto",
        "stripe",
        "drizzle",
        "prisma",
        "npm",
        "gmail",
      ] as const satisfies readonly MarketplaceStack[]
    ),
  }))
  const [sort, setSort] = React.useState<SortKey>(
    () => (searchParams.get("sort") as SortKey) || "best"
  )
  const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

  const results = React.useMemo(
    () => filterProjects(filters, sort),
    [filters, sort]
  )

  const activeChips = React.useMemo(() => {
    const chips: { key: string; label: string; clear: () => void }[] = []
    if (filters.q.trim()) {
      chips.push({
        key: "q",
        label: `“${filters.q.trim()}”`,
        clear: () => setFilters((f) => ({ ...f, q: "" })),
      })
    }
    for (const cat of filters.categories) {
      chips.push({
        key: `cat-${cat}`,
        label: MARKETPLACE_CATEGORY_LABEL[cat],
        clear: () =>
          setFilters((f) => ({
            ...f,
            categories: f.categories.filter((c) => c !== cat),
          })),
      })
    }
    for (const stack of filters.stacks) {
      chips.push({
        key: `stack-${stack}`,
        label: MARKETPLACE_STACK_LABEL[stack],
        clear: () =>
          setFilters((f) => ({
            ...f,
            stacks: f.stacks.filter((s) => s !== stack),
          })),
      })
    }
    return chips
  }, [filters])

  React.useEffect(() => {
    const params = new URLSearchParams()
    if (filters.q.trim()) params.set("q", filters.q.trim())
    if (filters.categories.length) {
      params.set("category", filters.categories.join(","))
    }
    if (filters.stacks.length) {
      params.set("stack", filters.stacks.join(","))
    }
    if (sort !== "best") params.set("sort", sort)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, [filters, sort, pathname, router])

  return (
    <div className="relative min-h-0 flex-1 bg-canvas">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-70 dark:opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="workspace-shell relative py-8 sm:py-10 lg:py-12">
        <header className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
          <p className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
            <ShoppingBagIcon className="size-4" aria-hidden />
            Marketplace
          </p>
          <h1 className="text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Ship faster with ready projects
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-base text-muted-foreground">
            Browse live demos, pick a kit, grab the source.
          </p>
          <MarketStats className="mt-4" />
        </header>

        <div
          className={cn(
            "mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8",
            showOfferRail &&
              "xl:max-w-[min(100%,calc(80rem+var(--offer-rail-width)+2rem))] xl:grid-cols-[240px_minmax(0,1fr)_var(--offer-rail-width)]"
          )}
        >
          <div className="hidden lg:block">
            <div className="sticky top-24 rounded-[12px] border border-border/60 bg-card/80 p-0 shadow-soft backdrop-blur-md">
              <CatalogFilters
                value={filters}
                onChange={setFilters}
                resultCount={results.length}
                className="border-0 bg-transparent shadow-none"
              />
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 cursor-pointer border-border/70 shadow-none lg:hidden"
                  >
                    <FilterIcon className="size-4" aria-hidden />
                    Filters
                    {filters.categories.length + filters.stacks.length > 0 ? (
                      <span className="rounded-full bg-primary/15 px-1.5 text-[11px] font-semibold text-primary">
                        {filters.categories.length + filters.stacks.length}
                      </span>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="max-h-[85vh] overflow-y-auto rounded-t-[12px] p-4"
                >
                  <SheetHeader className="mb-4 text-start">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <CatalogFilters
                    value={filters}
                    onChange={setFilters}
                    resultCount={results.length}
                    className="border-0 p-0 shadow-none"
                  />
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {results.length}
                </span>{" "}
                of {marketplaceProjects.length}
              </p>

              <div className="ms-auto flex items-center gap-2">
                <span className="hidden text-xs font-medium tracking-wide text-muted-foreground uppercase sm:inline">
                  Sort
                </span>
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as SortKey)}
                >
                  <SelectTrigger className="h-10 w-[160px] cursor-pointer shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best">Best sellers</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: low</SelectItem>
                    <SelectItem value="price-desc">Price: high</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeChips.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="Active filters">
                {activeChips.map((chip) => (
                  <li key={chip.key}>
                    <button
                      type="button"
                      onClick={chip.clear}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-soft transition-colors hover:bg-muted"
                    >
                      {chip.label}
                      <XIcon className="size-3 opacity-60" aria-hidden />
                      <span className="sr-only">Remove filter</span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({ q: "", categories: [], stacks: [] })
                    }
                    className="cursor-pointer px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline"
                  >
                    Clear all
                  </button>
                </li>
              </ul>
            ) : null}

            {results.length === 0 ? (
              <div
                className={cn(
                  "flex min-h-64 flex-col items-center justify-center gap-3 rounded-[12px] border border-dashed border-border/70 bg-card px-6 text-center"
                )}
              >
                <p className="text-sm font-medium text-foreground">
                  No projects match
                </p>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Try clearing filters or a shorter search.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer shadow-none"
                  onClick={() =>
                    setFilters({ q: "", categories: [], stacks: [] })
                  }
                >
                  Reset filters
                </Button>
              </div>
            ) : (
              <ul
                className={cn(
                  "grid gap-4 sm:grid-cols-2",
                  showOfferRail
                    ? "xl:grid-cols-2 2xl:grid-cols-3"
                    : "xl:grid-cols-3"
                )}
              >
                {results.map((project, i) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} index={i} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          <MarketplaceOfferColumn />
        </div>
      </div>
    </div>
  )
}
