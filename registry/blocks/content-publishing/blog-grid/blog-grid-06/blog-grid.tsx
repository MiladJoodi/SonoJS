"use client"

import * as React from "react"
import {
  ClockIcon,
  FileQuestionIcon,
  FilterIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
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
  | "all"
  | "engineering"
  | "design"
  | "tutorial"
  | "opinion"
  | "release"

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All Posts" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "tutorial", label: "Tutorials" },
  { id: "opinion", label: "Opinion" },
  { id: "release", label: "Releases" },
]

type Post = {
  title: string
  category: Exclude<CategoryId, "all">
  author: string
  initials: string
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
    initials: "AR",
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
    initials: "SC",
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
    initials: "MK",
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
    initials: "AR",
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
    initials: "SC",
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
    initials: "MK",
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
    initials: "SJ",
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
    initials: "AR",
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
    initials: "SC",
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
    initials: "MK",
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
    initials: "AR",
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
    initials: "SJ",
    date: "Feb 10, 2026",
    readTime: "3 min",
    excerpt: "Sortable tables plus timelines for feeds and changelogs.",
    cover: assetSrc(cover12),
    alt: "Time management desk",
  },
]

function categoryCount(id: CategoryId) {
  if (id === "all") return ALL_POSTS.length
  return ALL_POSTS.filter((p) => p.category === id).length
}

function FilterList({
  activeCategory,
  onSelect,
  onClear,
}: {
  activeCategory: CategoryId
  onSelect: (id: CategoryId) => void
  onClear: () => void
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="mb-2 flex items-center justify-between gap-2 px-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </p>
        {activeCategory !== "all" ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="h-7 px-2 text-xs"
            onClick={onClear}
          >
            Clear
          </Button>
        ) : null}
      </div>
      {CATEGORIES.map((cat) => {
        const selected = activeCategory === cat.id
        const count = categoryCount(cat.id)
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "bg-primary/10 font-semibold text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            aria-current={selected ? "true" : undefined}
          >
            <span>{cat.label}</span>
            <span
              dir="ltr"
              className={cn(
                "tabular-nums text-xs",
                selected ? "text-primary" : "text-muted-foreground"
              )}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryId>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    let result = ALL_POSTS
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory)
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, searchQuery])

  function handleCategoryChange(id: CategoryId) {
    setActiveCategory(id)
    setSheetOpen(false)
  }

  function clearFilters() {
    setActiveCategory("all")
    setSearchQuery("")
  }

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-10 dark:bg-background text-foreground sm:py-14",
        className
      )}
      aria-labelledby="blog-grid-06-heading"
      {...props}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:gap-10 lg:px-8">
        <aside className="hidden w-56 shrink-0 lg:block lg:w-64">
          <div className="sticky top-6 rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
            <FilterList
              activeCategory={activeCategory}
              onSelect={handleCategoryChange}
              onClear={clearFilters}
            />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl text-start">
              <p className="mb-2 text-sm font-medium text-primary">Journal</p>
              <h1
                id="blog-grid-06-heading"
                className="text-h1 font-semibold tracking-tight text-foreground"
              >
                Filter rail
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                App-shell index with a sticky category rail and cover cards.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start gap-2 border-border/70 lg:hidden"
                  >
                    <FilterIcon className="size-4" aria-hidden />
                    Filters
                    {activeCategory !== "all" ? (
                      <Badge variant="secondary" className="ms-auto capitalize">
                        {activeCategory}
                      </Badge>
                    ) : null}
                  </Button>
                </SheetTrigger>
                <SheetContent side="start" className="w-[min(100%,20rem)]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 px-1">
                    <FilterList
                      activeCategory={activeCategory}
                      onSelect={handleCategoryChange}
                      onClear={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <InputGroup className="w-full sm:w-72">
                <InputGroupAddon align="inline-start">
                  <SearchIcon aria-hidden />
                </InputGroupAddon>
                <InputGroupInput
                  type="search"
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search articles"
                />
                {searchQuery ? (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery("")}
                    >
                      <XIcon aria-hidden />
                    </InputGroupButton>
                  </InputGroupAddon>
                ) : null}
              </InputGroup>
            </div>
          </div>

          {filtered.length === 0 ? (
            <Empty className="border border-dashed border-border/70 bg-card">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FileQuestionIcon aria-hidden />
                </EmptyMedia>
                <EmptyTitle>No articles found</EmptyTitle>
                <EmptyDescription>
                  {searchQuery
                    ? `No results for “${searchQuery}”. Try a different search term.`
                    : "No articles in this category yet."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear filters
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((post) => (
                <a
                  key={post.title}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none transition-[border-color,box-shadow] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img
                      src={post.cover}
                      alt={post.alt}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge
                      variant="outline"
                      className="absolute start-3 top-3 capitalize shadow-sm backdrop-blur-sm"
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ClockIcon className="size-3" aria-hidden />
                      <span dir="ltr">{post.readTime}</span>
                    </div>
                    <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarFallback className="text-[10px]">
                            {post.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-xs font-semibold text-foreground">
                          {post.author}
                        </span>
                      </div>
                      <span
                        dir="ltr"
                        className="shrink-0 text-xs text-muted-foreground"
                      >
                        {post.date}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
