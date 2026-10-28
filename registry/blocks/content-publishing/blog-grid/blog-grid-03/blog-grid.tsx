"use client"

import * as React from "react"
import { ClockIcon, SparklesIcon } from "lucide-react"

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

type CategoryId = "engineering" | "design" | "tutorial" | "opinion" | "release"

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

function CoverTile({
  post,
  className,
  editorsPick,
}: {
  post: Post
  className?: string
  editorsPick?: boolean
}) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group relative flex min-h-[200px] cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <img
        src={post.cover}
        alt={post.alt}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative mt-auto flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          {editorsPick ? (
            <Badge className="gap-1 border-transparent bg-amber-500 text-amber-950 shadow-sm">
              <SparklesIcon className="size-3" aria-hidden />
              Editor&apos;s pick
            </Badge>
          ) : null}
          <Badge
            variant="outline"
            className={cn(
              "capitalize shadow-sm backdrop-blur-sm",
              CATEGORY_BADGE[post.category]
            )}
          >
            {post.category}
          </Badge>
        </div>
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
          {post.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/75">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <span dir="ltr">{post.date}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1" dir="ltr">
            <ClockIcon className="size-3" aria-hidden />
            {post.readTime}
          </span>
        </div>
      </div>
    </a>
  )
}

function TextCard({ post, className }: { post: Post; className?: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "group flex cursor-pointer flex-col gap-3 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft outline-none transition-[border-color] hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Badge
        variant="outline"
        className={cn("w-fit capitalize", CATEGORY_BADGE[post.category])}
      >
        {post.category}
      </Badge>
      <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
        {post.title}
      </h3>
      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.excerpt}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{post.author}</span>
        <span aria-hidden>·</span>
        <span dir="ltr">{post.date}</span>
        <span aria-hidden>·</span>
        <span dir="ltr">{post.readTime}</span>
      </div>
    </a>
  )
}

export default function BlogGrid({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [
    hero,
    tall,
    a,
    b,
    c,
    textA,
    mid,
    textB,
    wide,
    footA,
    footB,
    footC,
  ] = ALL_POSTS

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white py-14 dark:bg-background text-foreground sm:py-20",
        className
      )}
      aria-labelledby="blog-grid-03-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl text-start">
          <p className="mb-2 text-sm font-medium text-primary">Journal</p>
          <h1
            id="blog-grid-03-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Bento mosaic
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Asymmetric spans, cover overlays, and text cards — a mosaic that
            refuses equal columns.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          <CoverTile
            post={hero!}
            editorsPick
            className="min-h-[280px] sm:col-span-2 lg:col-span-4 lg:row-span-2 lg:min-h-[380px]"
          />
          <CoverTile
            post={tall!}
            className="min-h-[280px] sm:col-span-2 lg:col-span-2 lg:row-span-2"
          />

          <CoverTile post={a!} className="lg:col-span-2" />
          <CoverTile post={b!} className="lg:col-span-2" />
          <CoverTile post={c!} className="lg:col-span-2" />

          <TextCard post={textA!} className="lg:col-span-2" />
          <CoverTile
            post={mid!}
            className="min-h-[220px] sm:col-span-2 lg:col-span-2"
          />
          <TextCard post={textB!} className="lg:col-span-2" />

          <CoverTile
            post={wide!}
            className="min-h-[220px] sm:col-span-2 lg:col-span-4"
          />
          <TextCard post={footA!} className="lg:col-span-2" />

          <CoverTile post={footB!} className="lg:col-span-3" />
          <CoverTile post={footC!} className="lg:col-span-3" />
        </div>
      </div>
    </section>
  )
}
