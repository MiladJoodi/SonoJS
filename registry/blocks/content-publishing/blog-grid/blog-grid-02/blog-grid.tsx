"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
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
    label: "All Posts",
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

  const filtered = React.useMemo(() => {
    if (activeCategory === "all") return ALL_POSTS
    return ALL_POSTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const featured = filtered[0]
  const sideStack = filtered.slice(1, 4)
  const secondary = filtered.slice(4)

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-14 dark:bg-background text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-02-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Journal</p>
          <h1
            id="blog-grid-02-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Featured split
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Magazine layout — one hero story, a side stack of compact cards,
            then a secondary grid.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter by category"
          className="mb-8 flex flex-wrap gap-2"
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
                  "inline-flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
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

        {featured ? (
          <div className="mb-10 grid gap-6 lg:grid-cols-5">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group relative col-span-1 flex min-h-[320px] cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-ring lg:col-span-3 lg:min-h-[420px]"
            >
              <img
                src={featured.cover}
                alt={featured.alt}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="relative mt-auto flex flex-col gap-3 p-6 sm:p-8">
                <Badge
                  variant="outline"
                  className={cn(
                    "w-fit capitalize shadow-sm backdrop-blur-sm",
                    categoryBadgeClass(featured.category)
                  )}
                >
                  {featured.category}
                </Badge>
                <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-white/80">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/75">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6 ring-1 ring-white/30">
                      <AvatarFallback className="bg-white/20 text-[10px] text-white">
                        {featured.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-white">
                      {featured.author}
                    </span>
                  </div>
                  <span aria-hidden>·</span>
                  <span dir="ltr">{featured.date}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1" dir="ltr">
                    <ClockIcon className="size-3" aria-hidden />
                    {featured.readTime}
                  </span>
                </div>
              </div>
            </a>

            <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
              {sideStack.map((post) => (
                <a
                  key={post.title}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group flex min-h-0 flex-1 cursor-pointer gap-3 overflow-hidden rounded-[12px] border border-border/70 bg-card p-3 shadow-soft outline-none transition-[border-color] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-28">
                    <img
                      src={post.cover}
                      alt={post.alt}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-0.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "w-fit capitalize",
                        categoryBadgeClass(post.category)
                      )}
                    >
                      {post.category}
                    </Badge>
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span dir="ltr">{post.date}</span>
                      <span aria-hidden>·</span>
                      <span dir="ltr">{post.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {secondary.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((post) => (
              <a
                key={post.title}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none transition-[border-color] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.cover}
                    alt={post.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    variant="outline"
                    className={cn(
                      "absolute start-3 top-3 capitalize shadow-sm backdrop-blur-sm",
                      categoryBadgeClass(post.category)
                    )}
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/70 pt-3">
                    <span className="truncate text-xs font-semibold text-foreground">
                      {post.author}
                    </span>
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
        ) : null}

        {filtered.length === 0 ? (
          <p className="rounded-[12px] border border-dashed border-border/70 bg-card px-6 py-12 text-center text-sm text-muted-foreground shadow-soft">
            No articles in this category yet.
          </p>
        ) : null}
      </div>
    </section>
  )
}
