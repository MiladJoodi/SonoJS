"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
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

const CATEGORIES: { id: CategoryId; label: string; badgeClass: string }[] = [
  {
    id: "all",
    label: "All",
    badgeClass: "border-transparent bg-muted text-muted-foreground",
  },
  {
    id: "engineering",
    label: "Engineering",
    badgeClass: "border-transparent bg-primary/10 text-primary",
  },
  {
    id: "design",
    label: "Design",
    badgeClass:
      "border-transparent bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  {
    id: "tutorial",
    label: "Tutorials",
    badgeClass:
      "border-transparent bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  {
    id: "opinion",
    label: "Opinion",
    badgeClass:
      "border-transparent bg-amber-500/15 text-amber-800 dark:text-amber-300",
  },
  {
    id: "release",
    label: "Releases",
    badgeClass:
      "border-transparent bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
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
    excerpt: "An accessible multi-step wizard with clear focus and state.",
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

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 3

function categoryBadgeClass(id: string) {
  return (
    CATEGORIES.find((c) => c.id === id)?.badgeClass ??
    CATEGORIES[0]!.badgeClass
  )
}

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [activeCategory, setActiveCategory] =
    React.useState<CategoryId>("all")
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT)

  const filtered = React.useMemo(() => {
    if (activeCategory === "all") return ALL_POSTS
    return ALL_POSTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  React.useEffect(() => {
    setVisibleCount(INITIAL_COUNT)
  }, [activeCategory])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-14 dark:bg-background text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-05-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl text-start">
            <p className="mb-2 text-sm font-medium text-primary">Journal</p>
            <h1
              id="blog-grid-05-heading"
              className="text-h1 font-semibold tracking-tight text-foreground"
            >
              Cinematic theater
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Full-bleed video-ratio tiles with title and meta on a gradient
              scrim — load more as you go.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const selected = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selected
                      ? "bg-foreground text-background shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="rounded-[12px] border border-dashed border-border/70 bg-card px-6 py-12 text-center text-sm text-muted-foreground shadow-soft">
            No articles in this category yet.
          </p>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {visible.map((post, index) => {
                const tall = index === 0
                return (
                  <a
                    key={post.title}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                      "group relative flex cursor-pointer overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      tall
                        ? "aspect-[4/5] sm:aspect-auto sm:row-span-2 sm:min-h-full"
                        : "aspect-video"
                    )}
                  >
                    <img
                      src={post.cover}
                      alt={post.alt}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                    <Badge
                      variant="outline"
                      className={cn(
                        "absolute start-3 top-3 capitalize shadow-sm backdrop-blur-sm",
                        categoryBadgeClass(post.category)
                      )}
                    >
                      {post.category}
                    </Badge>
                    <div className="relative mt-auto flex w-full flex-col gap-2 p-5 sm:p-6">
                      <h2
                        className={cn(
                          "font-semibold leading-snug tracking-tight text-white",
                          tall ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
                        )}
                      >
                        {post.title}
                      </h2>
                      {tall ? (
                        <p className="line-clamp-2 max-w-md text-sm text-white/80">
                          {post.excerpt}
                        </p>
                      ) : null}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-white/75">
                        <span className="font-semibold text-white">
                          {post.author}
                        </span>
                        <span aria-hidden>·</span>
                        <span dir="ltr">{post.date}</span>
                        <span aria-hidden>·</span>
                        <span
                          className="inline-flex items-center gap-1"
                          dir="ltr"
                        >
                          <ClockIcon className="size-3" aria-hidden />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>

            {hasMore ? (
              <div className="mt-10 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="cursor-pointer"
                  onClick={() =>
                    setVisibleCount((n) =>
                      Math.min(n + LOAD_MORE_COUNT, filtered.length)
                    )
                  }
                >
                  Load more
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
