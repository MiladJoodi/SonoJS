"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  BookOpenIcon,
  CheckIcon,
  Link2Icon,
  Share2Icon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@sonojs/ui/components/avatar"
import { Badge } from "@sonojs/ui/components/badge"
import { cn } from "@/lib/utils"

const ARTICLE = {
  title: "Building production-ready UIs with SonoJS and Tailwind v4",
  author: "Alex Rivera",
  date: "June 23, 2026",
  readTime: "8 min read",
  tags: ["Design Systems", "React", "Tailwind CSS"],
  sections: [
    {
      heading: "Introduction",
      body: "Modern front-end development demands more than just getting things to work — it requires systems that scale, components that compose, and designs that adapt. SonoJS is built to satisfy all three. In this guide, we walk through a full-featured interface, from project setup to production.",
    },
    {
      heading: "Setting Up the Project",
      body: "The fastest way to start is with the SonoJS CLI. Run npx @sonojs/ui@latest init and follow the prompts for your framework, theme tokens, and TypeScript setup. The scaffolder wires Tailwind v4 with the correct CSS imports and aliases.",
    },
    {
      heading: "Semantic Token System",
      body: "One of SonoJS’s strongest features is its token hierarchy. Instead of hardcoding colors, you style with tokens like bg-primary, text-foreground, and border-border. Because these map to CSS custom properties backed by oklch values, dark mode is zero-effort: flip the dark class and every token inverts appropriately.",
    },
    {
      heading: "Responsive Layouts",
      body: "Prefer logical layout utilities and breakpoint maps so grids and stacks adapt without physical left/right assumptions. Keep control heights consistent across breakpoints and let width and stacking change instead.",
    },
    {
      heading: "Accessibility by Default",
      body: "Interactive SonoJS components ship with correct ARIA attributes, keyboard navigation, and focus management. Overlays handle focus trapping. Your job is semantic HTML structure — use main, nav, section, and header landmarks appropriately.",
    },
    {
      heading: "Production Checklist",
      body: "Before shipping: run typecheck, verify the build, and test at 375px, 768px, and 1280px viewports. Check both light and dark modes. Ensure interactive elements have visible focus rings and aria-labels. Use Lighthouse or axe DevTools to catch remaining gaps.",
    },
  ],
} as const

function ProgressFill({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  return (
    <div
      className={cn(
        "h-full rounded-full bg-primary transition-[width] duration-150 ease-out",
        className
      )}
      style={{ width: `${progress}%` }}
    />
  )
}

function ReadingProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="sticky top-0 z-50 h-1 w-full bg-muted"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <ProgressFill progress={progress} className="rounded-none" />
    </div>
  )
}

function ShareButton({
  label,
  onClick,
  active,
  children,
}: {
  label: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] border shadow-soft transition-colors",
        active
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-border/70 bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
      )}
    >
      {children}
    </button>
  )
}

function useCopyLink() {
  const [copied, setCopied] = React.useState(false)

  const copy = React.useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }, [])

  return { copied, copy }
}

function ShareSidebar({ title }: { title: string }) {
  const { copied, copy } = useCopyLink()

  return (
    <div className="pointer-events-none absolute end-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      <p className="pointer-events-none mb-1 text-xs tracking-widest text-muted-foreground uppercase [writing-mode:vertical-lr] rtl:[writing-mode:vertical-rl]">
        Share
      </p>
      <div className="pointer-events-auto flex flex-col items-center gap-3">
        <ShareButton
          label="Share"
          onClick={() => {
            if (typeof window === "undefined") return
            const url = `https://x.com/intent/tweet?text=${encodeURIComponent(title)}`
            window.open(url, "_blank", "noopener,noreferrer")
          }}
        >
          <Share2Icon className="size-4" aria-hidden />
        </ShareButton>
        <ShareButton
          label={copied ? "Link copied" : "Copy link"}
          onClick={copy}
          active={copied}
        >
          {copied ? (
            <CheckIcon className="size-4" aria-hidden />
          ) : (
            <Link2Icon className="size-4" aria-hidden />
          )}
        </ShareButton>
      </div>
    </div>
  )
}

export default function ReadingProgress({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [progress, setProgress] = React.useState(0)
  const [showBackToTop, setShowBackToTop] = React.useState(false)
  const articleRef = React.useRef<HTMLElement>(null)
  const { copied, copy } = useCopyLink()

  React.useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const el = articleRef.current
      const { top, height } = el.getBoundingClientRect()
      const scrolled = Math.max(0, -top)
      const total = height - window.innerHeight
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
      setProgress(pct)
      setShowBackToTop(scrolled > 300)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <ReadingProgressBar progress={progress} />
      <ShareSidebar title={ARTICLE.title} />

      {showBackToTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed end-8 bottom-8 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform hover:scale-105 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="size-5" aria-hidden />
        </button>
      ) : null}

      <article
        ref={articleRef}
        className="mx-auto max-w-2xl px-4 py-16 sm:py-24"
      >
        <div className="mb-8 flex flex-wrap gap-2">
          {ARTICLE.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-transparent bg-primary/10 text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="mb-6 text-h1 font-bold tracking-tight text-foreground">
          {ARTICLE.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-border/70 pb-6">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
              {ARTICLE.author[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-start">
            <p className="text-sm font-semibold text-foreground">
              {ARTICLE.author}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span dir="ltr">{ARTICLE.date}</span>
              <span className="size-1 rounded-full bg-border" aria-hidden />
              <span className="inline-flex items-center gap-1">
                <BookOpenIcon className="size-3" aria-hidden />
                {ARTICLE.readTime}
              </span>
            </div>
          </div>
          <div className="ms-auto flex items-center gap-2 lg:hidden">
            <ShareButton
              label="Share"
              onClick={() => {
                if (typeof window === "undefined") return
                const url = `https://x.com/intent/tweet?text=${encodeURIComponent(ARTICLE.title)}`
                window.open(url, "_blank", "noopener,noreferrer")
              }}
            >
              <Share2Icon className="size-4" aria-hidden />
            </ShareButton>
            <ShareButton
              label={copied ? "Link copied" : "Copy link"}
              onClick={copy}
              active={copied}
            >
              {copied ? (
                <CheckIcon className="size-4" aria-hidden />
              ) : (
                <Link2Icon className="size-4" aria-hidden />
              )}
            </ShareButton>
          </div>
        </div>

        <div className="space-y-10">
          {ARTICLE.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-[12px] border border-border/70 bg-card p-5 shadow-soft">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">
              Reading progress
            </p>
            <p
              dir="ltr"
              className="text-sm font-bold tabular-nums text-primary"
            >
              {Math.round(progress)}%
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <ProgressFill progress={progress} />
          </div>
          {progress >= 95 ? (
            <p className="mt-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Article complete — thanks for reading.
            </p>
          ) : null}
        </div>
      </article>
    </section>
  )
}
