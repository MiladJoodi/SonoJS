"use client"

import * as React from "react"
import { ArrowUpRightIcon, FileQuestionIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@sonojs/ui/components/empty"
import { cn } from "@/lib/utils"

type CategoryId =
  | "all"
  | "engineering"
  | "design"
  | "tutorial"
  | "opinion"
  | "release"

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
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
  date: string
  readTime: string
  index: string
}

const ALL_POSTS: Post[] = [
  {
    title: "Building Accessible Design Systems with Primitives and Tailwind",
    category: "engineering",
    author: "Alex Rivera",
    date: "Mar 18, 2026",
    readTime: "8 min",
    index: "01",
  },
  {
    title: "Zero Runtime Theming: CSS Custom Properties Replace JS",
    category: "design",
    author: "Sarah Chen",
    date: "Mar 15, 2026",
    readTime: "6 min",
    index: "02",
  },
  {
    title: "Copy-source CLI to npm: Why We Ship as a Library",
    category: "opinion",
    author: "Marcus Kim",
    date: "Mar 12, 2026",
    readTime: "5 min",
    index: "03",
  },
  {
    title: "Tailwind CSS v4 Migration Guide for Libraries",
    category: "tutorial",
    author: "Alex Rivera",
    date: "Mar 10, 2026",
    readTime: "12 min",
    index: "04",
  },
  {
    title: "Testing 60+ Components: Our Accessibility Audit Strategy",
    category: "engineering",
    author: "Sarah Chen",
    date: "Mar 8, 2026",
    readTime: "7 min",
    index: "05",
  },
  {
    title: "oklch Color Spaces Explained for UI Engineers",
    category: "design",
    author: "Marcus Kim",
    date: "Mar 5, 2026",
    readTime: "9 min",
    index: "06",
  },
  {
    title: "SonoJS v1.2 — Calendar and Tree Components",
    category: "release",
    author: "SonoJS Team",
    date: "Mar 1, 2026",
    readTime: "3 min",
    index: "07",
  },
  {
    title: "Composable vs Monolithic Component APIs",
    category: "opinion",
    author: "Alex Rivera",
    date: "Feb 26, 2026",
    readTime: "6 min",
    index: "08",
  },
  {
    title: "Building a Stepper Component from Scratch",
    category: "tutorial",
    author: "Sarah Chen",
    date: "Feb 22, 2026",
    readTime: "10 min",
    index: "09",
  },
  {
    title: "How We Generate Tailwind Safelisted Classes",
    category: "engineering",
    author: "Marcus Kim",
    date: "Feb 18, 2026",
    readTime: "8 min",
    index: "10",
  },
  {
    title: "Design Token Architecture for Tailwind v4",
    category: "design",
    author: "Alex Rivera",
    date: "Feb 14, 2026",
    readTime: "7 min",
    index: "11",
  },
  {
    title: "SonoJS v1.1 — Data Table and Timeline",
    category: "release",
    author: "SonoJS Team",
    date: "Feb 10, 2026",
    readTime: "3 min",
    index: "12",
  },
]

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

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-07-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Journal</p>
          <h1
            id="blog-grid-07-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Type index
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            A literary table of contents — large titles, thin rules, no covers.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter by category"
          className="mb-10 flex flex-wrap gap-2"
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
                  "inline-flex cursor-pointer items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <Empty className="border border-dashed border-border/70 bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileQuestionIcon aria-hidden />
              </EmptyMedia>
              <EmptyTitle>No articles found</EmptyTitle>
              <EmptyDescription>
                No articles in this category yet.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveCategory("all")}
              >
                Clear filters
              </Button>
            </EmptyContent>
          </Empty>
        ) : (
          <ol className="list-none p-0">
            {filtered.map((post) => (
              <li key={post.title} className="border-b border-border/70">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group grid cursor-pointer grid-cols-[3.5rem_minmax(0,1fr)] gap-4 py-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-6 sm:py-7"
                >
                  <span
                    dir="ltr"
                    className="pt-1 text-sm tabular-nums text-muted-foreground sm:text-base"
                  >
                    <span className="hidden sm:inline">{post.date}</span>
                    <span className="sm:hidden">{post.index}</span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                        {post.title}
                      </h2>
                      <ArrowUpRightIcon
                        className="icon-dir mt-1 size-5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span aria-hidden className="mx-1.5">
                        ·
                      </span>
                      <span dir="ltr">{post.readTime}</span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
