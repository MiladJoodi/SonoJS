"use client"

import * as React from "react"
import { ChevronRightIcon, SearchIcon, XIcon } from "lucide-react"

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

type CategoryId =
  | "engineering"
  | "design"
  | "tutorial"
  | "opinion"
  | "release"

const TOPIC_RAILS: { id: CategoryId; label: string }[] = [
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "tutorial", label: "Tutorials" },
  { id: "opinion", label: "Opinion" },
  { id: "release", label: "Releases" },
]

type Post = {
  title: string
  category: CategoryId
  author: string
  date: string
  cover: string
  alt: string
}

const ALL_POSTS: Post[] = [
  {
    title: "Building Accessible Design Systems with Primitives and Tailwind",
    category: "engineering",
    author: "Alex Rivera",
    date: "Mar 18, 2026",
    cover: assetSrc(cover01),
    alt: "Design system workspace",
  },
  {
    title: "Zero Runtime Theming: CSS Custom Properties Replace JS",
    category: "design",
    author: "Sarah Chen",
    date: "Mar 15, 2026",
    cover: assetSrc(cover02),
    alt: "Theming mood board",
  },
  {
    title: "Copy-source CLI to npm: Why We Ship as a Library",
    category: "opinion",
    author: "Marcus Kim",
    date: "Mar 12, 2026",
    cover: assetSrc(cover03),
    alt: "Team collaboration",
  },
  {
    title: "Tailwind CSS v4 Migration Guide for Libraries",
    category: "tutorial",
    author: "Alex Rivera",
    date: "Mar 10, 2026",
    cover: assetSrc(cover04),
    alt: "Product headphones on desk",
  },
  {
    title: "Testing 60+ Components: Our Accessibility Audit Strategy",
    category: "engineering",
    author: "Sarah Chen",
    date: "Mar 8, 2026",
    cover: assetSrc(cover05),
    alt: "Watch and planning notes",
  },
  {
    title: "oklch Color Spaces Explained for UI Engineers",
    category: "design",
    author: "Marcus Kim",
    date: "Mar 5, 2026",
    cover: assetSrc(cover06),
    alt: "Creative imagination cover",
  },
  {
    title: "SonoJS v1.2 — Calendar and Tree Components",
    category: "release",
    author: "SonoJS Team",
    date: "Mar 1, 2026",
    cover: assetSrc(cover07),
    alt: "Portrait of engineer",
  },
  {
    title: "Composable vs Monolithic Component APIs",
    category: "opinion",
    author: "Alex Rivera",
    date: "Feb 26, 2026",
    cover: assetSrc(cover08),
    alt: "Portrait of designer",
  },
  {
    title: "Building a Stepper Component from Scratch",
    category: "tutorial",
    author: "Sarah Chen",
    date: "Feb 22, 2026",
    cover: assetSrc(cover09),
    alt: "Portrait of product lead",
  },
  {
    title: "How We Generate Tailwind Safelisted Classes",
    category: "engineering",
    author: "Marcus Kim",
    date: "Feb 18, 2026",
    cover: assetSrc(cover10),
    alt: "Prediction analytics visual",
  },
  {
    title: "Design Token Architecture for Tailwind v4",
    category: "design",
    author: "Alex Rivera",
    date: "Feb 14, 2026",
    cover: assetSrc(cover11),
    alt: "Creative workspace",
  },
  {
    title: "SonoJS v1.1 — Data Table and Timeline",
    category: "release",
    author: "SonoJS Team",
    date: "Feb 10, 2026",
    cover: assetSrc(cover12),
    alt: "Time management desk",
  },
]

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const q = searchQuery.trim().toLowerCase()

  const rails = React.useMemo(() => {
    return TOPIC_RAILS.map((rail) => {
      let posts = ALL_POSTS.filter((p) => p.category === rail.id)
      if (q) {
        posts = posts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.author.toLowerCase().includes(q)
        )
      }
      return { ...rail, posts }
    }).filter((rail) => rail.posts.length > 0)
  }, [q])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-08-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl text-start">
            <p className="mb-2 text-sm font-medium text-primary">Journal</p>
            <h1
              id="blog-grid-08-heading"
              className="text-h1 font-semibold tracking-tight text-foreground"
            >
              Topic rails
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Horizontal category shelves — scroll each rail like a shelf of
              covers.
            </p>
          </div>

          <InputGroup className="w-full sm:w-80">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search all topics…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search all topics"
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

        {rails.length === 0 ? (
          <p className="rounded-[12px] border border-dashed border-border/70 bg-card px-6 py-12 text-center text-sm text-muted-foreground shadow-soft">
            No topics match “{searchQuery}”.
          </p>
        ) : (
          <div className="flex flex-col gap-12">
            {rails.map((rail) => (
              <section
                key={rail.id}
                aria-labelledby={`blog-grid-08-rail-${rail.id}`}
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2
                    id={`blog-grid-08-rail-${rail.id}`}
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    {rail.label}
                  </h2>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    View all
                    <ChevronRightIcon
                      className="icon-dir size-4"
                      aria-hidden
                    />
                  </a>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {rail.posts.map((post) => (
                    <a
                      key={post.title}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="group w-64 shrink-0 cursor-pointer snap-start overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none transition-[border-color] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring sm:w-72"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={post.cover}
                          alt={post.alt}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="space-y-1.5 p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
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
              </section>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
