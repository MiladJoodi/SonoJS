"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  ChevronRightIcon,
  LightbulbIcon,
  TerminalIcon,
  ThumbsDownIcon,
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
    "A product-docs style walkthrough of primitives, tokens, and CSS-first theming.",
  author: { name: "Alex Rivera", role: "Lead Engineer" },
  date: "March 18, 2026",
  readTime: "8 min read",
  updated: "Updated Mar 20, 2026",
} as const

const TOC = [
  { id: "intro", label: "Overview", step: "01" },
  { id: "primitives", label: "Primitives", step: "02" },
  { id: "tokens", label: "Tokens", step: "03" },
  { id: "conclusion", label: "Ship checklist", step: "04" },
] as const

export default function ArticleLayout({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [activeId, setActiveId] = React.useState<string>(TOC[0].id)
  const [vote, setVote] = React.useState<"up" | "down" | null>(null)

  React.useEffect(() => {
    const nodes = TOC.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    )
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main
      className={cn(
        "min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="border-b border-border/70">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <a
            href="#"
            className="cursor-pointer transition-colors hover:text-foreground"
          >
            Docs
          </a>
          <ChevronRightIcon className="size-3.5 icon-dir opacity-60" aria-hidden />
          <a
            href="#"
            className="cursor-pointer transition-colors hover:text-foreground"
          >
            Guides
          </a>
          <ChevronRightIcon className="size-3.5 icon-dir opacity-60" aria-hidden />
          <span className="font-medium text-foreground">Design systems</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-10">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-8 overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
              <div className="border-b border-border/70 bg-muted/40 px-3 py-2.5">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  On this page
                </p>
              </div>
              <nav aria-label="Table of contents" className="p-2">
                <ul className="relative space-y-0.5" role="list">
                  <span
                    className="absolute inset-y-2 start-[1.15rem] w-px bg-border"
                    aria-hidden
                  />
                  {TOC.map((item) => {
                    const active = activeId === item.id
                    return (
                      <li key={item.id} className="relative">
                        <a
                          href={`#${item.id}`}
                          onClick={() => setActiveId(item.id)}
                          className={cn(
                            "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                            active
                              ? "bg-primary/10 font-medium text-foreground"
                              : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                          )}
                        >
                          <span
                            className={cn(
                              "relative z-10 flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] tabular-nums ring-2 ring-card",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {item.step.replace(/^0/, "")}
                          </span>
                          <span className="min-w-0 truncate">{item.label}</span>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <article className="min-w-0 flex-1 space-y-8 text-start">
            <header className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Guide</Badge>
                <Badge variant="outline">{ARTICLE.updated}</Badge>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {ARTICLE.title}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
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

            <Separator />

            <section id="intro" className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">Overview</h2>
              <p className="leading-7 text-muted-foreground">
                A production design system speeds up delivery and keeps
                accessibility a default. Pair unstyled accessible primitives
                with semantic tokens and you get a foundation that scales
                across products.
              </p>
              <div className="relative overflow-hidden rounded-[12px] border border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-sky-500/10 p-4 shadow-soft">
                <div
                  className="pointer-events-none absolute -end-6 -top-6 size-24 rounded-full bg-emerald-400/20 blur-2xl"
                  aria-hidden
                />
                <div className="relative flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <LightbulbIcon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        Tip
                      </p>
                      <Badge className="border-transparent bg-emerald-500/20 text-emerald-800 dark:text-emerald-200">
                        Recommended
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                      Start from primitives that already own keyboard and ARIA —
                      then layer visual tokens, not the other way around.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="primitives" className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                Primitives
              </h2>
              <p className="leading-7 text-muted-foreground">
                Primitives should own focus traps, keyboard navigation, and ARIA
                roles. You style the surface; behavior stays consistent out of
                the box.
              </p>
              <div className="sono-code-block rounded-[12px] shadow-soft">
                <div className="flex items-center gap-2 border-b border-[color:var(--code-border)] bg-[color:var(--code-header-bg)] px-4 py-2.5">
                  <TerminalIcon
                    className="size-3.5 text-[color:var(--code-header-fg)]"
                    aria-hidden
                  />
                  <span className="font-mono text-[13px] text-[color:var(--code-header-fg)]">
                    tokens.css
                  </span>
                </div>
                <pre className="sono-code-pre overflow-x-auto p-4 font-mono text-[13px] leading-[1.65]">
                  <code>
                    <span style={{ color: "var(--code-syntax-keyword)" }}>
                      :root
                    </span>
                    <span style={{ color: "var(--code-fg)" }}> {"{"}</span>
                    {"\n"}
                    {"  "}
                    <span style={{ color: "var(--code-syntax-variable)" }}>
                      --primary
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>: </span>
                    <span style={{ color: "var(--code-syntax-number)" }}>
                      #2563eb
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>;</span>
                    {"\n"}
                    {"  "}
                    <span style={{ color: "var(--code-syntax-variable)" }}>
                      --radius
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>: </span>
                    <span style={{ color: "var(--code-syntax-number)" }}>
                      0.75rem
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>;</span>
                    {"\n"}
                    {"  "}
                    <span style={{ color: "var(--code-syntax-variable)" }}>
                      --border
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>: </span>
                    <span style={{ color: "var(--code-syntax-function)" }}>
                      oklch
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>(</span>
                    <span style={{ color: "var(--code-syntax-number)" }}>
                      0.9 0 0
                    </span>
                    <span style={{ color: "var(--code-fg)" }}>);</span>
                    {"\n"}
                    <span style={{ color: "var(--code-fg)" }}>{"}"}</span>
                  </code>
                </pre>
              </div>
            </section>

            <section id="tokens" className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">Tokens</h2>
              <p className="leading-7 text-muted-foreground">
                Keep colors, radius, and spacing in CSS variables. Light and
                dark modes swap tokens without shipping a theme runtime.
              </p>
              <div className="relative overflow-hidden rounded-[12px] border border-amber-500/35 bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-rose-500/10 p-4 shadow-soft">
                <div
                  className="pointer-events-none absolute -start-4 -top-4 size-20 rounded-full bg-amber-400/25 blur-2xl"
                  aria-hidden
                />
                <div className="relative flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                    <AlertTriangleIcon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-amber-950 dark:text-amber-100">
                      Warning
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
                      Avoid hardcoding hex in components. Raw values break when
                      product teams remap brand tokens later.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="conclusion" className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight">
                Ship checklist
              </h2>
              <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
                <li>Keyboard paths verified for every interactive primitive</li>
                <li>Light and dark themes swap via CSS variables only</li>
                <li>Focus rings visible at 375 / 768 / 1280 viewports</li>
              </ul>
            </section>

            <footer className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-border/70 bg-card px-4 py-3 shadow-soft">
              <p className="text-sm text-muted-foreground">
                Was this guide helpful?
              </p>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Helpful"
                  aria-pressed={vote === "up"}
                  className={cn(
                    "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    vote === "up" && "text-foreground"
                  )}
                  onClick={() => setVote((v) => (v === "up" ? null : "up"))}
                >
                  <ThumbsUpIcon
                    className={cn("size-4", vote === "up" && "fill-current")}
                    aria-hidden
                  />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Not helpful"
                  aria-pressed={vote === "down"}
                  className={cn(
                    "size-8 rounded-md text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    vote === "down" && "text-foreground"
                  )}
                  onClick={() => setVote((v) => (v === "down" ? null : "down"))}
                >
                  <ThumbsDownIcon
                    className={cn("size-4", vote === "down" && "fill-current")}
                    aria-hidden
                  />
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </main>
  )
}
