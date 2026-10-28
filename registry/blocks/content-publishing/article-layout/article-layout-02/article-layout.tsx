"use client"

import * as React from "react"
import {
  BookmarkIcon,
  ClockIcon,
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
    "Primitives, tokens, and CSS-first theming — a magazine-style long read for product teams.",
  author: { name: "Alex Rivera", role: "Lead Engineer" },
  date: "March 18, 2026",
  readTime: "8 min read",
  tags: ["Engineering", "Accessibility"],
  likes: 142,
} as const

const JUMP = [
  { id: "intro", label: "Intro" },
  { id: "primitives", label: "Primitives" },
  { id: "tokens", label: "Tokens" },
  { id: "conclusion", label: "Outro" },
] as const

export default function ArticleLayout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  return (
    <main
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <header className="relative isolate min-h-[52vh] overflow-hidden sm:min-h-[60vh]">
        <img
          src={COVER}
          alt=""
          className="absolute inset-0 size-full object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/55 to-zinc-950/20"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-[52vh] max-w-3xl flex-col justify-end px-4 pb-12 pt-24 text-start sm:min-h-[60vh] sm:px-6 sm:pb-16">
          <div className="mb-4 flex flex-wrap gap-2">
            {ARTICLE.tags.map((tag) => (
              <Badge
                key={tag}
                className="border-transparent bg-white/15 text-white backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-tight">
            {ARTICLE.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {ARTICLE.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <Avatar size="sm" className="ring-2 ring-white/30">
              <AvatarFallback className="bg-white/20 text-white">
                AR
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-white">{ARTICLE.author.name}</span>
            <span aria-hidden>·</span>
            <span>{ARTICLE.date}</span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" aria-hidden />
              {ARTICLE.readTime}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {JUMP.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="cursor-pointer rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-soft transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <article className="space-y-8 text-start">
          <section id="intro">
            <p className="text-lg leading-8 text-muted-foreground">
              A production design system speeds up delivery and keeps
              accessibility a default. Pair unstyled accessible primitives with
              semantic tokens and you get a foundation that scales across
              products.
            </p>
          </section>

          <section id="primitives" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Accessible primitives
            </h2>
            <p className="leading-7 text-muted-foreground">
              Primitives should own focus traps, keyboard navigation, and ARIA
              roles. You style the surface; behavior stays consistent out of
              the box — so every product inherits the same interaction contract.
            </p>
            <blockquote className="border-s-2 border-foreground/20 ps-5 text-xl font-medium leading-snug tracking-tight text-foreground">
              Accessibility works best when it is the default path, not a
              checklist at the end.
            </blockquote>
          </section>

          <section id="tokens" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Tokens and theming
            </h2>
            <p className="leading-7 text-muted-foreground">
              Keep colors, radius, and spacing in CSS variables. Light and dark
              modes swap tokens without shipping a theme runtime — consumers
              stay in control of the look while components stay portable.
            </p>
          </section>

          <section id="conclusion" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              Conclusion
            </h2>
            <p className="leading-7 text-muted-foreground">
              Accessible behavior, flexible styling, and low runtime cost make a
              stack teams can adopt once and reuse everywhere.
            </p>
            <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
              <p className="text-sm font-semibold">{ARTICLE.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {ARTICLE.author.role}
              </p>
              <Button type="button" variant="outline" size="xs" className="mt-3">
                Follow
              </Button>
            </div>
          </section>
        </article>
      </div>

      <aside
        className="pointer-events-none fixed end-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        aria-label="Share actions"
      >
        <div className="pointer-events-auto flex flex-col gap-2 rounded-[12px] border border-border/70 bg-card/95 p-2 shadow-soft backdrop-blur-sm">
          <button
            type="button"
            aria-label="Like"
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className={cn(
              "inline-flex size-10 cursor-pointer items-center justify-center rounded-md transition-colors",
              liked
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <ThumbsUpIcon className="size-4" aria-hidden />
          </button>
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
            aria-label="Copy link"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Link2Icon className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Share"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Share2Icon className="size-4" aria-hidden />
          </button>
        </div>
      </aside>
    </main>
  )
}
