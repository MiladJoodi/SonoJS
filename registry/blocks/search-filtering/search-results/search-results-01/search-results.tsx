"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  FilterIcon,
  ImageIcon,
  InboxIcon,
  PackageIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  VideoIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Input } from "@sonojs/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sonojs/ui/components/select"
import { cn } from "@/lib/utils"

const FILTER_CHIPS = [
  "All",
  "Articles",
  "Images",
  "Videos",
  "Documents",
  "Products",
] as const
type FilterChip = (typeof FILTER_CHIPS)[number]

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
] as const

type ResultType = "article" | "image" | "video" | "doc" | "product"

interface SearchResult {
  id: string
  type: ResultType
  title: string
  snippet: string
  href: string
  date: string
  tags: string[]
}

const ALL_RESULTS: SearchResult[] = [
  {
    id: "1",
    type: "article",
    title: "Getting started with SonoJS",
    snippet:
      "Install the CLI, add your first component, and wire theme tokens in a React project. Covers Tailwind setup and the default control scale.",
    href: "/docs/getting-started",
    date: "Jun 20, 2026",
    tags: ["docs", "guide"],
  },
  {
    id: "2",
    type: "product",
    title: "SonoJS Pro",
    snippet:
      "Unlock premium blocks, priority support, and advanced theming tools. Includes ongoing updates and the full template library.",
    href: "/pricing",
    date: "Jun 18, 2026",
    tags: ["pricing", "pro"],
  },
  {
    id: "3",
    type: "doc",
    title: "Component API reference",
    snippet:
      "TypeScript-annotated props for every installable SonoJS component. Filter by name, variant, or registry dependency.",
    href: "/docs/components",
    date: "Jun 15, 2026",
    tags: ["api", "docs"],
  },
  {
    id: "4",
    type: "article",
    title: "Dark mode with semantic tokens",
    snippet:
      "How SonoJS CSS variables invert in dark mode without scattering dark: utilities across every component.",
    href: "/docs/theming",
    date: "Jun 12, 2026",
    tags: ["theming", "dark mode"],
  },
  {
    id: "5",
    type: "image",
    title: "Hero section preview",
    snippet:
      "High-resolution screenshot of a marketing hero block on a 1440px canvas with soft shadow and brand primary.",
    href: "/blocks/marketing",
    date: "Jun 10, 2026",
    tags: ["design", "assets"],
  },
  {
    id: "6",
    type: "video",
    title: "Build a dashboard in 15 minutes",
    snippet:
      "Compose an analytics layout with SonoJS cards, charts, and data table blocks — step-by-step walkthrough.",
    href: "/docs/examples",
    date: "Jun 8, 2026",
    tags: ["tutorial", "video"],
  },
  {
    id: "7",
    type: "article",
    title: "Tree-shaking installable sources",
    snippet:
      "How the copy-source CLI keeps bundles lean: you only ship the components you add, with registry dependencies declared up front.",
    href: "/docs/cli",
    date: "Jun 5, 2026",
    tags: ["performance", "cli"],
  },
  {
    id: "8",
    type: "doc",
    title: "Accessibility guidelines",
    snippet:
      "WCAG-oriented checklist for interactive controls — focus rings, keyboard maps, and RTL-safe layouts across the registry.",
    href: "/docs/accessibility",
    date: "Jun 2, 2026",
    tags: ["a11y", "docs"],
  },
  {
    id: "9",
    type: "product",
    title: "SonoJS CLI",
    snippet:
      "Add components and blocks with one command. Works with Vite, Next.js, and other React toolchains using your project aliases.",
    href: "/docs/cli",
    date: "May 28, 2026",
    tags: ["cli", "tooling"],
  },
  {
    id: "10",
    type: "article",
    title: "Direction and logical CSS",
    snippet:
      "Build once for LTR and RTL with ms/me, start/end, and DirectionProvider — a core SonoJS system concern.",
    href: "/docs/direction",
    date: "May 25, 2026",
    tags: ["rtl", "layout"],
  },
]

const TYPE_TO_CHIP: Record<ResultType, FilterChip> = {
  article: "Articles",
  image: "Images",
  video: "Videos",
  doc: "Documents",
  product: "Products",
}

const TYPE_ICON: Record<ResultType, React.ElementType> = {
  article: FileTextIcon,
  image: ImageIcon,
  video: VideoIcon,
  doc: PackageIcon,
  product: PackageIcon,
}

function typeTone(type: ResultType) {
  switch (type) {
    case "article":
      return "bg-primary/10 text-primary"
    case "image":
      return "bg-violet-500/10 text-violet-700 dark:text-violet-300"
    case "video":
      return "bg-destructive/10 text-destructive"
    case "doc":
      return "bg-sky-500/10 text-sky-700 dark:text-sky-300"
    default:
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  }
}

const RESULTS_PER_PAGE = 5

export default function SearchResults({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [query, setQuery] = React.useState("sonojs components")
  const [activeFilter, setActiveFilter] = React.useState<FilterChip>("All")
  const [activeSort, setActiveSort] = React.useState("relevance")
  const [page, setPage] = React.useState(1)

  const filtered = ALL_RESULTS.filter(
    (r) => activeFilter === "All" || TYPE_TO_CHIP[r.type] === activeFilter
  )

  const sorted = React.useMemo(() => {
    const list = [...filtered]
    if (activeSort === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (activeSort === "newest" || activeSort === "oldest") {
      const dir = activeSort === "newest" ? -1 : 1
      list.sort(
        (a, b) =>
          dir * (new Date(a.date).getTime() - new Date(b.date).getTime())
      )
    }
    return list
  }, [filtered, activeSort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / RESULTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated = sorted.slice(
    (safePage - 1) * RESULTS_PER_PAGE,
    safePage * RESULTS_PER_PAGE
  )

  const clearFilter = () => {
    setActiveFilter("All")
    setPage(1)
  }

  return (
    <div
      className={cn(
        "min-h-[min(48rem,100svh)] bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="border-b border-border/70 bg-card shadow-soft">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
          <InputGroup className="h-[46px]">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs, blocks, and charts…"
              aria-label="Search query"
            />
            {query ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  className="cursor-pointer"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <XIcon className="size-3.5" aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        {/* Aside first → start edge in LTR and RTL */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          <aside className="shrink-0 border-b border-border/70 pb-8 lg:w-56 lg:border-b-0 lg:pb-0">
            <div className="sticky top-6 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
              <h2 className="mb-4 text-sm font-semibold">Filter by type</h2>
              <div className="flex flex-col gap-1" role="list">
                {FILTER_CHIPS.map((chip) => {
                  const count =
                    chip === "All"
                      ? ALL_RESULTS.length
                      : ALL_RESULTS.filter((r) => TYPE_TO_CHIP[r.type] === chip)
                          .length
                  const active = activeFilter === chip
                  return (
                    <button
                      key={chip}
                      type="button"
                      role="listitem"
                      onClick={() => {
                        setActiveFilter(chip)
                        setPage(1)
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      {chip}
                      <Badge variant={active ? "default" : "secondary"}>
                        {count}
                      </Badge>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 border-t border-border/70 pt-4">
                <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Date range
                </h3>
                <div className="grid gap-2">
                  <Input
                    type="date"
                    dir="ltr"
                    aria-label="Start date"
                    className="h-10 cursor-pointer"
                  />
                  <Input
                    type="date"
                    dir="ltr"
                    aria-label="End date"
                    className="h-10 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                {sorted.length} results for{" "}
                <span className="font-semibold text-foreground">
                  &ldquo;{query || "…"}&rdquo;
                </span>
              </p>
              <div className="flex items-center gap-2">
                <SlidersHorizontalIcon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <Select
                  value={activeSort}
                  onValueChange={(value) => {
                    setActiveSort(value)
                    setPage(1)
                  }}
                >
                  <SelectTrigger
                    size="sm"
                    className="w-[8.5rem] cursor-pointer"
                    aria-label="Sort results"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFilter !== "All" ? (
              <div className="mb-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={clearFilter}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/15"
                >
                  <FilterIcon className="size-3" aria-hidden />
                  {activeFilter}
                  <XIcon className="size-3" aria-hidden />
                </button>
              </div>
            ) : null}

            {paginated.length === 0 ? (
              <div className="rounded-[12px] border border-border/70 bg-card px-6 py-16 text-center shadow-soft">
                <InboxIcon
                  className="mx-auto mb-4 size-12 text-muted-foreground/30"
                  aria-hidden
                />
                <h2 className="mb-2 text-lg font-semibold">No results found</h2>
                <p className="mx-auto mb-6 max-w-xs text-sm text-muted-foreground">
                  Try different keywords or clear filters to see more results.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={clearFilter}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {paginated.map((result) => {
                  const Icon = TYPE_ICON[result.type]
                  return (
                    <li key={result.id}>
                      <a
                        href={result.href}
                        className="group flex cursor-pointer gap-4 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-colors hover:border-primary/30"
                      >
                        <div
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-lg",
                            typeTone(result.type)
                          )}
                        >
                          <Icon className="size-5" aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1 text-start">
                          <div className="mb-1 flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                              {result.title}
                            </span>
                            <ArrowUpRightIcon
                              className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                              aria-hidden
                            />
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                            {result.snippet}
                          </p>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                              <ClockIcon className="size-3" aria-hidden />
                              {result.date}
                            </span>
                            <span className="flex flex-wrap gap-1">
                              {result.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}

            {totalPages > 1 && sorted.length > 0 ? (
              <div className="mt-8 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-1 disabled:cursor-not-allowed"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeftIcon className="icon-dir size-4" aria-hidden />
                  Previous
                </Button>
                <div
                  className="flex gap-1"
                  dir="ltr"
                  role="navigation"
                  aria-label="Pagination"
                >
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Button
                        key={p}
                        type="button"
                        size="icon-xs"
                        variant={p === safePage ? "default" : "ghost"}
                        className="cursor-pointer"
                        aria-label={`Go to page ${p}`}
                        aria-current={p === safePage ? "page" : undefined}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer gap-1 disabled:cursor-not-allowed"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                  <ChevronRightIcon className="icon-dir size-4" aria-hidden />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
