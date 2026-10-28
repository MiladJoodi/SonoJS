"use client"

import * as React from "react"
import {
  BookmarkIcon,
  Link2Icon,
  Share2Icon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import coverAsset from "./images/cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const COVER = assetSrc(coverAsset)

const ARTICLE = {
  title: "Building accessible design systems that scale",
  subtitle:
    "An editorial take on primitives, tokens, and CSS-first theming for product teams.",
  author: {
    name: "Alex Rivera",
    role: "Lead Engineer",
    bio: "Builds design systems and component libraries for startups and product teams.",
  },
  date: "March 18, 2026",
  readTime: "8 min read",
  tags: ["Engineering", "Design Systems"],
} as const

const RELATED = [
  {
    title: "Zero-runtime theming with CSS custom properties",
    readTime: "6 min",
    tag: "Design",
  },
  {
    title: "Shipping a component library as npm packages",
    readTime: "5 min",
    tag: "Opinion",
  },
  {
    title: "Focus management patterns for overlays",
    readTime: "7 min",
    tag: "A11y",
  },
] as const

export default function ArticleLayout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="hidden w-16 shrink-0 lg:block">
            <div className="sticky top-10 flex flex-col items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="h-px w-8 bg-border" aria-hidden />
              <button
                type="button"
                aria-label="Like"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ThumbsUpIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Bookmark"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BookmarkIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Share2Icon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Copy link"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Link2Icon className="size-4" aria-hidden />
              </button>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <header className="max-w-3xl space-y-5 text-start">
              <div className="flex flex-wrap gap-2">
                {ARTICLE.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight">
                {ARTICLE.title}
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {ARTICLE.subtitle}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {ARTICLE.author.name}
                </span>
                <span aria-hidden> · </span>
                {ARTICLE.date}
                <span aria-hidden> · </span>
                {ARTICLE.readTime}
              </p>
            </header>

            <div className="mt-8 max-w-3xl overflow-hidden rounded-[12px] border border-border/70 shadow-soft lg:mt-10">
              <img
                src={COVER}
                alt="Editorial cover for the design systems article"
                className="aspect-2/1 w-full object-cover"
              />
            </div>

            <div className="mt-4 flex gap-1 lg:hidden">
              <button
                type="button"
                aria-label="Like"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ThumbsUpIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Bookmark"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <BookmarkIcon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Share2Icon className="size-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Copy link"
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Link2Icon className="size-4" aria-hidden />
              </button>
            </div>

            <article className="mt-10 max-w-3xl space-y-8 text-start">
              <p className="leading-8 text-muted-foreground">
                <span
                  className="float-start me-3 text-5xl font-semibold leading-none text-foreground"
                  aria-hidden
                >
                  A
                </span>
                production design system speeds up delivery and keeps
                accessibility a default. Pair unstyled accessible primitives
                with semantic tokens and you get a foundation that scales
                across products without rewriting the hard parts every quarter.
              </p>
              <div className="clear-both" aria-hidden />

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Accessible primitives
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Primitives should own focus traps, keyboard navigation, and
                  ARIA roles. You style the surface; behavior stays consistent
                  out of the box so every product inherits the same interaction
                  contract.
                </p>
              </section>

              <figure className="my-2 border-y border-border/70 py-8 text-center">
                <blockquote className="mx-auto max-w-xl text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
                  “Accessibility works best when it is the default path, not a
                  checklist at the end.”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  — {ARTICLE.author.name}
                </figcaption>
              </figure>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Tokens and theming
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Keep colors, radius, and spacing in CSS variables. Light and
                  dark modes swap tokens without shipping a theme runtime —
                  consumers stay in control of the look while components stay
                  portable.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Conclusion
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Accessible behavior, flexible styling, and low runtime cost
                  make a stack teams can adopt once and reuse everywhere.
                </p>
              </section>

              <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12 shrink-0">
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 space-y-2">
                    <p className="font-semibold">{ARTICLE.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ARTICLE.author.bio}
                    </p>
                    <Button type="button" variant="outline" size="xs">
                      View profile
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            <section className="mt-14 max-w-3xl space-y-5 text-start">
              <h2 className="text-lg font-semibold tracking-tight">
                Related reading
              </h2>
              <ul
                className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {RELATED.map((rel) => (
                  <li key={rel.title}>
                    <button
                      type="button"
                      className="group flex h-full w-full cursor-pointer flex-col rounded-[12px] border border-border/70 bg-card p-4 text-start shadow-soft transition-colors hover:border-primary/30"
                    >
                      <Badge variant="secondary" className="w-fit">
                        {rel.tag}
                      </Badge>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm font-semibold leading-snug group-hover:text-primary">
                        {rel.title}
                      </p>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {rel.readTime}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
