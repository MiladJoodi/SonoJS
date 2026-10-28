"use client"

import * as React from "react"
import {
  LayoutGridIcon,
  LayoutListIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { ButtonGroup } from "@sonojs/ui/components/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@sonojs/ui/components/pagination"
import { cn } from "@/lib/utils"

import cover01 from "./images/cover-01.webp"
import cover02 from "./images/cover-02.webp"
import cover03 from "./images/cover-03.webp"
import cover04 from "./images/cover-04.webp"
import cover05 from "./images/cover-05.webp"
import cover06 from "./images/cover-06.webp"
import cover07 from "./images/cover-07.webp"
import cover08 from "./images/cover-08.webp"
import cover09 from "./images/cover-09.webp"
import cover10 from "./images/cover-10.webp"
import cover11 from "./images/cover-11.webp"
import cover12 from "./images/cover-12.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type CategoryId =
  | "engineering"
  | "design"
  | "tutorial"
  | "opinion"
  | "release"

type Post = {
  title: string
  category: CategoryId
  author: string
  date: string
  readTime: string
  excerpt: string
  cover: string
  alt: string
}

const ALL_POSTS: Post[] = [
  {
    title: "Building Accessible Design Systems with Primitives and Tailwind",
    category: "engineering",
    author: "Alex Rivera",
    date: "Mar 18, 2026",
    readTime: "8 min",
    excerpt:
      "Combining accessible primitives with Tailwind to ship libraries that scale.",
    cover: assetSrc(cover01),
    alt: "Design system workspace",
  },
  {
    title: "Zero Runtime Theming: CSS Custom Properties Replace JS",
    category: "design",
    author: "Sarah Chen",
    date: "Mar 15, 2026",
    readTime: "6 min",
    excerpt:
      "Why pure CSS theming wins — and how oklch keeps contrast honest.",
    cover: assetSrc(cover02),
    alt: "Theming mood board",
  },
  {
    title: "Copy-source CLI to npm: Why We Ship as a Library",
    category: "opinion",
    author: "Marcus Kim",
    date: "Mar 12, 2026",
    readTime: "5 min",
    excerpt:
      "Trade-offs between copy-paste collections and versioned packages.",
    cover: assetSrc(cover03),
    alt: "Team collaboration",
  },
  {
    title: "Tailwind CSS v4 Migration Guide for Libraries",
    category: "tutorial",
    author: "Alex Rivera",
    date: "Mar 10, 2026",
    readTime: "12 min",
    excerpt:
      "CSS-first config, @theme, and @source — a practical migration path.",
    cover: assetSrc(cover04),
    alt: "Product headphones on desk",
  },
  {
    title: "Testing 60+ Components: Our Accessibility Audit Strategy",
    category: "engineering",
    author: "Sarah Chen",
    date: "Mar 8, 2026",
    readTime: "7 min",
    excerpt: "Keeping hundreds of a11y checks green across packages.",
    cover: assetSrc(cover05),
    alt: "Watch and planning notes",
  },
  {
    title: "oklch Color Spaces Explained for UI Engineers",
    category: "design",
    author: "Marcus Kim",
    date: "Mar 5, 2026",
    readTime: "9 min",
    excerpt:
      "Perceptual uniformity and why oklch beats HSL for UI tokens.",
    cover: assetSrc(cover06),
    alt: "Creative imagination cover",
  },
  {
    title: "SonoJS v1.2 — Calendar and Tree Components",
    category: "release",
    author: "SonoJS Team",
    date: "Mar 1, 2026",
    readTime: "3 min",
    excerpt: "Keyboard-first data display with full ARIA support.",
    cover: assetSrc(cover07),
    alt: "Portrait of engineer",
  },
  {
    title: "Composable vs Monolithic Component APIs",
    category: "opinion",
    author: "Alex Rivera",
    date: "Feb 26, 2026",
    readTime: "6 min",
    excerpt:
      "Why CardHeader + CardContent beats a dozen props every time.",
    cover: assetSrc(cover08),
    alt: "Portrait of designer",
  },
  {
    title: "Building a Stepper Component from Scratch",
    category: "tutorial",
    author: "Sarah Chen",
    date: "Feb 22, 2026",
    readTime: "10 min",
    excerpt:
      "An accessible multi-step wizard with clear focus and state.",
    cover: assetSrc(cover09),
    alt: "Portrait of product lead",
  },
  {
    title: "How We Generate Tailwind Safelisted Classes",
    category: "engineering",
    author: "Marcus Kim",
    date: "Feb 18, 2026",
    readTime: "8 min",
    excerpt:
      "An automated safelist so every utility ships from node_modules.",
    cover: assetSrc(cover10),
    alt: "Prediction analytics visual",
  },
  {
    title: "Design Token Architecture for Tailwind v4",
    category: "design",
    author: "Alex Rivera",
    date: "Feb 14, 2026",
    readTime: "7 min",
    excerpt: "Structuring @theme variables for multi-brand systems.",
    cover: assetSrc(cover11),
    alt: "Creative workspace",
  },
  {
    title: "SonoJS v1.1 — Data Table and Timeline",
    category: "release",
    author: "SonoJS Team",
    date: "Feb 10, 2026",
    readTime: "3 min",
    excerpt: "Sortable tables plus timelines for feeds and changelogs.",
    cover: assetSrc(cover12),
    alt: "Time management desk",
  },
]

const PER_PAGE = 6

function pageItems(totalPages: number, current: number) {
  const pages: Array<number | "ellipsis"> = []
  for (let page = 1; page <= totalPages; page++) {
    if (
      totalPages > 5 &&
      page !== 1 &&
      page !== totalPages &&
      Math.abs(page - current) > 1
    ) {
      if (page === 2 || page === totalPages - 1) pages.push("ellipsis")
      continue
    }
    pages.push(page)
  }
  return pages
}

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [view, setView] = React.useState<"list" | "grid">("list")
  const [currentPage, setCurrentPage] = React.useState(1)
  const searchRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/") return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      searchRef.current?.focus()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const filtered = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return ALL_POSTS
    return ALL_POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE
  )

  function handleSearch(value: string) {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-14 dark:bg-background text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-10-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Journal</p>
          <h1
            id="blog-grid-10-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Command density
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Search-forward index with dense list and compact grid modes.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <InputGroup className="h-12 w-full max-w-2xl [&_[data-slot=input-group-control]]:h-12 [&_[data-slot=input-group-control]]:text-base">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              ref={searchRef}
              type="search"
              placeholder="Search articles, authors, categories…"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search articles"
              className="text-base"
            />
            {searchQuery ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  aria-label="Clear search"
                  onClick={() => handleSearch("")}
                >
                  <XIcon aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Press{" "}
              <kbd className="rounded border border-border/70 bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                /
              </kbd>{" "}
              to focus search
            </p>

            <ButtonGroup aria-label="View mode">
              <Button
                type="button"
                variant={view === "list" ? "secondary" : "outline"}
                size="icon"
                aria-pressed={view === "list"}
                aria-label="List view"
                onClick={() => setView("list")}
              >
                <LayoutListIcon className="size-4" aria-hidden />
              </Button>
              <Button
                type="button"
                variant={view === "grid" ? "secondary" : "outline"}
                size="icon"
                aria-pressed={view === "grid"}
                aria-label="Grid view"
                onClick={() => setView("grid")}
              >
                <LayoutGridIcon className="size-4" aria-hidden />
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {paginated.length === 0 ? (
          <p className="rounded-[12px] border border-dashed border-border/70 bg-card px-6 py-12 text-center text-sm text-muted-foreground shadow-soft">
            No results for “{searchQuery}”.
          </p>
        ) : view === "list" ? (
          <ul className="divide-y divide-border/70 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            {paginated.map((post) => (
              <li key={post.title}>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex cursor-pointer flex-col gap-2 px-4 py-3.5 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:flex-row sm:items-center sm:gap-4"
                >
                  <Badge
                    variant="outline"
                    className="w-fit shrink-0 capitalize"
                  >
                    {post.category}
                  </Badge>
                  <span className="min-w-0 flex-1 text-sm font-semibold text-foreground">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground sm:w-28 sm:text-end">
                    {post.author}
                  </span>
                  <span
                    dir="ltr"
                    className="shrink-0 text-xs text-muted-foreground sm:w-24 sm:text-end"
                  >
                    {post.date}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((post) => (
              <a
                key={post.title}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none transition-[border-color] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.cover}
                    alt={post.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1.5 p-3">
                  <Badge variant="outline" className="capitalize">
                    {post.category}
                  </Badge>
                  <h2 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {post.author}
                    <span aria-hidden className="mx-1">
                      ·
                    </span>
                    <span dir="ltr">{post.date}</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={safePage <= 1}
                    className={cn(
                      safePage <= 1 && "pointer-events-none opacity-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>
                {pageItems(totalPages, safePage).map((item, i) =>
                  item === "ellipsis" ? (
                    <PaginationItem key={`e-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        isActive={item === safePage}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(item)
                        }}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={safePage >= totalPages}
                    className={cn(
                      safePage >= totalPages &&
                        "pointer-events-none opacity-50"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : null}
      </div>
    </section>
  )
}
