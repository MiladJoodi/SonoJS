"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  BookmarkIcon,
  MessageSquareIcon,
  Share2Icon,
  ThumbsUpIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import coverAsset from "./images/cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const COVER = assetSrc(coverAsset)

const ARTICLE = {
  series: "Design Systems Handbook",
  chapter: "Chapter 3 of 8",
  title: "Building accessible design systems that scale",
  subtitle:
    "Primitives, tokens, and CSS-first theming — part of a continuing series.",
  author: { name: "Alex Rivera", role: "Lead Engineer" },
  date: "March 18, 2026",
  readTime: "8 min read",
  likes: 142,
  comments: 23,
  nextChapter: "Token migration playbook",
} as const

const COMMENTS = [
  {
    initials: "SC",
    name: "Sarah Chen",
    body: "The callout on semantic tokens finally clicked for our design sync.",
    time: "2h ago",
  },
  {
    initials: "MK",
    name: "Maya Kim",
    body: "Would love a follow-up on focus rings inside nested dialogs.",
    time: "5h ago",
  },
] as const

export default function ArticleLayout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const articleRef = React.useRef<HTMLElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <main
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white pb-24 text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div
        className="sticky top-0 z-30 h-1 w-full bg-muted"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="border-b border-border/70 bg-card">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 text-start">
            <Badge variant="secondary">{ARTICLE.series}</Badge>
            <span className="text-xs text-muted-foreground">
              {ARTICLE.chapter}
            </span>
          </div>
          <Button type="button" variant="outline" size="xs" className="gap-1.5">
            Next chapter
            <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
          </Button>
        </div>
      </div>

      <article
        ref={articleRef}
        className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14"
      >
        <header className="space-y-5 text-start">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {ARTICLE.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {ARTICLE.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Avatar size="sm">
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">
              {ARTICLE.author.name}
            </span>
            <span aria-hidden>·</span>
            <span>{ARTICLE.date}</span>
            <span aria-hidden>·</span>
            <span>{ARTICLE.readTime}</span>
          </div>
        </header>

        <div className="mt-8 overflow-hidden rounded-[12px] border border-border/70 shadow-soft">
          <img
            src={COVER}
            alt="Horizontal workspace cover for the design systems handbook"
            className="aspect-21/9 w-full object-cover object-center"
          />
        </div>

        <div className="mt-10 space-y-8 text-start">
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Introduction
            </h2>
            <p className="leading-7 text-muted-foreground">
              A production design system speeds up delivery and keeps
              accessibility a default. Pair unstyled accessible primitives with
              semantic tokens and you get a foundation that scales across
              products without rewriting the hard parts.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Accessible primitives
            </h2>
            <p className="leading-7 text-muted-foreground">
              Primitives should own focus traps, keyboard navigation, and ARIA
              roles. You style the surface; behavior stays consistent out of the
              box so every product inherits the same interaction contract.
            </p>
            <blockquote className="rounded-[12px] border-s-4 border-primary bg-primary/5 p-5 text-sm leading-relaxed text-muted-foreground italic">
              “Accessibility works best when it is the default path, not a
              checklist at the end.”
            </blockquote>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Tokens and theming
            </h2>
            <p className="leading-7 text-muted-foreground">
              Keep colors, radius, and spacing in CSS variables. Light and dark
              modes swap tokens without shipping a theme runtime — consumers
              stay in control of the look.
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              Conclusion
            </h2>
            <p className="leading-7 text-muted-foreground">
              Accessible behavior, flexible styling, and low runtime cost make a
              stack teams can adopt once and reuse everywhere.
            </p>
          </section>

          <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-start">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Up next
                </p>
                <p className="mt-1 font-semibold">{ARTICLE.nextChapter}</p>
              </div>
              <Button type="button" size="sm" className="gap-1.5">
                Continue
                <ArrowRightIcon className="size-3.5 icon-dir" aria-hidden />
              </Button>
            </div>
          </div>

          <section className="space-y-4 text-start">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold tracking-tight">
                Discussion
              </h2>
              <span className="text-xs text-muted-foreground">
                {ARTICLE.comments} comments
              </span>
            </div>
            <ul className="space-y-3" role="list">
              {COMMENTS.map((c) => (
                <li
                  key={c.name}
                  className="rounded-[12px] border border-border/70 bg-card p-4 shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{c.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <p className="text-sm font-semibold">{c.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {c.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {c.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Button type="button" variant="outline" size="sm">
              View all comments
            </Button>
          </section>
        </div>
      </article>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Like"
              aria-pressed={liked}
              onClick={() => setLiked((v) => !v)}
              className={cn(
                "inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors",
                liked
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <ThumbsUpIcon className="size-4" aria-hidden />
              <span className="tabular-nums">
                {ARTICLE.likes + (liked ? 1 : 0)}
              </span>
            </button>
            <button
              type="button"
              aria-label="Comments"
              className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <MessageSquareIcon className="size-4" aria-hidden />
              <span className="tabular-nums">{ARTICLE.comments}</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Bookmark"
              aria-pressed={saved}
              onClick={() => setSaved((v) => !v)}
              className={cn(
                "inline-flex size-10 cursor-pointer items-center justify-center rounded-md transition-colors",
                saved
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
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
          </div>
        </div>
      </div>
    </main>
  )
}
