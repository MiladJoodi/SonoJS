"use client"

import type * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkIcon,
  CalendarIcon,
  ClockIcon,
  MessageSquareIcon,
  Share2Icon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const ARTICLE = {
  title: "Building accessible design systems that scale",
  subtitle:
    "How accessible primitives, semantic tokens, and CSS-first theming combine into a component library teams can ship with.",
  author: {
    name: "Alex Rivera",
    role: "Lead Engineer",
    bio: "Builds design systems and component libraries for startups and product teams.",
  },
  date: "March 18, 2026",
  readTime: "8 min read",
  tags: ["Engineering", "Accessibility", "Design Systems"],
  likes: 142,
  comments: 23,
} as const

const TOC = [
  { id: "intro", label: "Introduction", level: 1 },
  { id: "primitives", label: "Accessible primitives", level: 1 },
  { id: "tokens", label: "Tokens and theming", level: 1 },
  { id: "conclusion", label: "Conclusion", level: 1 },
] as const

const RELATED = [
  {
    title: "Zero-runtime theming with CSS custom properties",
    date: "Mar 15, 2026",
    readTime: "6 min",
    tag: "Design",
  },
  {
    title: "Shipping a component library as npm packages",
    date: "Mar 12, 2026",
    readTime: "5 min",
    tag: "Opinion",
  },
] as const

function ActionChip({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
      {...props}
    >
      {children}
    </button>
  )
}

export default function ArticleLayout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      className={cn("min-h-svh w-full min-w-0 bg-canvas text-foreground", className)}
      {...props}
    >
      <div className="border-b border-border/70 bg-card">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <a
            href="#"
            className="mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-3.5 icon-dir" aria-hidden />
            Back to Blog
          </a>

          <div className="max-w-3xl space-y-4 text-start">
            <div className="flex flex-wrap gap-2">
              {ARTICLE.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {ARTICLE.title}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {ARTICLE.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{ARTICLE.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ARTICLE.author.role}
                  </p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-8 sm:block"
              />
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarIcon className="size-3.5" aria-hidden />
                  {ARTICLE.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <ClockIcon className="size-3.5" aria-hidden />
                  {ARTICLE.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_200px]">
          <article className="min-w-0">
            <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border/70 pb-6">
              <ActionChip aria-label={`${ARTICLE.likes} likes`}>
                <ThumbsUpIcon className="size-3.5" aria-hidden />
                {ARTICLE.likes}
              </ActionChip>
              <ActionChip aria-label={`${ARTICLE.comments} comments`}>
                <MessageSquareIcon className="size-3.5" aria-hidden />
                {ARTICLE.comments}
              </ActionChip>
              <div className="flex-1" />
              <ActionChip aria-label="Bookmark">
                <BookmarkIcon className="size-3.5" aria-hidden />
              </ActionChip>
              <ActionChip aria-label="Share">
                <Share2Icon className="size-3.5" aria-hidden />
              </ActionChip>
            </div>

            <div className="space-y-8 text-start">
              <section id="intro">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  Introduction
                </h2>
                <p className="leading-7 text-muted-foreground">
                  A production design system speeds up delivery and keeps
                  accessibility a default. Pair unstyled accessible primitives
                  with semantic tokens and you get a foundation that scales
                  across products without rewriting the hard parts.
                </p>
              </section>

              <Separator />

              <section id="primitives">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  Accessible primitives
                </h2>
                <p className="mb-4 leading-7 text-muted-foreground">
                  Primitives should own focus traps, keyboard navigation, and
                  ARIA roles. You style the surface; behavior stays consistent
                  out of the box.
                </p>
                <blockquote className="my-6 rounded-[12px] border-s-4 border-primary bg-primary/5 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    “Accessibility works best when it is the default path, not
                    a checklist at the end.”
                  </p>
                </blockquote>
              </section>

              <Separator />

              <section id="tokens">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  Tokens and theming
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Keep colors, radius, and spacing in CSS variables. Light and
                  dark modes swap tokens without shipping a theme runtime —
                  consumers stay in control of the look.
                </p>
              </section>

              <Separator />

              <section id="conclusion">
                <h2 className="mb-3 text-2xl font-semibold tracking-tight">
                  Conclusion
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Accessible behavior, flexible styling, and low runtime cost
                  make a stack teams can adopt once and reuse everywhere.
                </p>
              </section>
            </div>

            <div className="mt-10 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
              <div className="flex items-start gap-4">
                <Avatar className="size-12 shrink-0">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="min-w-0 space-y-2 text-start">
                  <div>
                    <p className="font-semibold">{ARTICLE.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ARTICLE.author.role}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {ARTICLE.author.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Button type="button" variant="outline" size="xs">
                      View profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="group flex cursor-pointer items-center gap-4 rounded-[12px] border border-border/70 bg-card p-4 text-start shadow-soft transition-colors hover:border-primary/30"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                  <ArrowLeftIcon
                    className="size-4 text-muted-foreground icon-dir group-hover:text-primary"
                    aria-hidden
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Previous
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold group-hover:text-primary">
                    Zero-runtime theming
                  </span>
                </span>
              </button>
              <button
                type="button"
                className="group flex cursor-pointer items-center justify-end gap-4 rounded-[12px] border border-border/70 bg-card p-4 text-end shadow-soft transition-colors hover:border-primary/30"
              >
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Next
                  </span>
                  <span className="mt-1 block truncate text-sm font-semibold group-hover:text-primary">
                    Token migration guide
                  </span>
                </span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-primary/10">
                  <ArrowRightIcon
                    className="size-4 text-muted-foreground icon-dir group-hover:text-primary"
                    aria-hidden
                  />
                </span>
              </button>
            </div>
          </article>

          <aside className="hidden min-w-0 lg:block">
            <div className="sticky top-8 space-y-5 text-start">
              <p className="text-xs font-medium text-muted-foreground">
                On this page
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-1" role="list">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex cursor-pointer items-center gap-1.5 rounded-md py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <Separator />

              <p className="text-xs font-medium text-muted-foreground">
                Related
              </p>
              <ul className="space-y-3" role="list">
                {RELATED.map((rel) => (
                  <li key={rel.title}>
                    <button
                      type="button"
                      className="group w-full cursor-pointer rounded-[12px] border border-border/70 bg-card p-3 text-start shadow-soft transition-colors hover:border-primary/30"
                    >
                      <Badge variant="secondary" className="mb-2">
                        {rel.tag}
                      </Badge>
                      <p className="line-clamp-2 text-xs font-semibold leading-snug group-hover:text-primary">
                        {rel.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {rel.readTime} · {rel.date}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
