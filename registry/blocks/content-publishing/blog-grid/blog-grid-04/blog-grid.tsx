"use client"

import * as React from "react"
import {
  ClockIcon,
  FileQuestionIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

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

type CategoryId = "engineering" | "design" | "tutorial" | "opinion" | "release"
type SortMode = "latest" | "popular"

const CATEGORY_BADGE: Record<CategoryId, string> = {
  engineering: "border-transparent bg-primary/10 text-primary",
  design:
    "border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-300",
  tutorial: "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
  opinion:
    "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300",
  release:
    "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
}

type Post = {
  title: string
  category: CategoryId
  author: string
  initials: string
  date: string
  readTime: string
  excerpt: string
  cover: string
  alt: string
  popularity: number
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
    popularity: 94,
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
    popularity: 88,
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
    popularity: 76,
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
    popularity: 91,
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
    popularity: 82,
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
    popularity: 85,
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
    popularity: 70,
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
    popularity: 79,
  },
  {
    title: "Building a Stepper Component from Scratch",
    category: "tutorial",
    author: "Sarah Chen",
    initials: "SC",
    date: "Feb 22, 2026",
    readTime: "10 min",
    excerpt: "An accessible multi-step wizard with clear focus and state.",
    cover: assetSrc(cover09),
    alt: "Portrait of product lead",
    popularity: 73,
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
    popularity: 68,
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
    popularity: 81,
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
    popularity: 65,
  },
]

const VISIBLE = 10

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortMode, setSortMode] = React.useState<SortMode>("latest")

  const filtered = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    let result = ALL_POSTS
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      )
    }
    if (sortMode === "popular") {
      return [...result].sort((a, b) => b.popularity - a.popularity)
    }
    return result
  }, [searchQuery, sortMode])

  const rows = filtered.slice(0, VISIBLE)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-14 dark:bg-background text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-04-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Journal</p>
          <h1
            id="blog-grid-04-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Editorial archive
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Dense list rows with thumbs, excerpts, and sort — built for
            scanning an archive.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <InputGroup className="w-full sm:max-w-md">
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

          <div
            role="tablist"
            aria-label="Sort articles"
            className="inline-flex rounded-[12px] border border-border/70 bg-card p-1 shadow-soft"
          >
            {(
              [
                { id: "latest", label: "Latest" },
                { id: "popular", label: "Popular" },
              ] as const
            ).map((mode) => {
              const selected = sortMode === mode.id
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setSortMode(mode.id)}
                  className={cn(
                    "cursor-pointer rounded-[10px] px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode.label}
                </button>
              )
            })}
          </div>
        </div>

        {rows.length === 0 ? (
          <Empty className="border border-dashed border-border/70 bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileQuestionIcon aria-hidden />
              </EmptyMedia>
              <EmptyTitle>No articles found</EmptyTitle>
              <EmptyDescription>
                {searchQuery
                  ? `No results for “${searchQuery}”. Try a different search term.`
                  : "No articles in the archive yet."}
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ul className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
            {rows.map((post, index) => (
              <li
                key={post.title}
                className={cn(
                  index > 0 && "border-t border-border/70"
                )}
              >
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group flex cursor-pointer items-center gap-4 px-4 py-4 outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:gap-5 sm:px-5"
                >
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                    <img
                      src={post.cover}
                      alt={post.alt}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1 text-start">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "capitalize",
                          CATEGORY_BADGE[post.category]
                        )}
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground sm:hidden">
                        <span dir="ltr">{post.date}</span>
                      </span>
                    </div>
                    <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground sm:hidden">
                      <span className="inline-flex items-center gap-1" dir="ltr">
                        <ClockIcon className="size-3" aria-hidden />
                        {post.readTime}
                      </span>
                    </p>
                  </div>

                  <div className="hidden shrink-0 flex-col items-end gap-1.5 text-end sm:flex">
                    <span
                      dir="ltr"
                      className="text-sm font-medium text-foreground"
                    >
                      {post.date}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                      dir="ltr"
                    >
                      <ClockIcon className="size-3" aria-hidden />
                      {post.readTime}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
