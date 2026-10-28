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
      body: "Modern front-end development demands more than just getting things to work — it requires systems that scale, components that compose, and designs that adapt. SonoJS is built to satisfy all three.",
    },
    {
      heading: "Setting Up the Project",
      body: "The fastest way to start is with the SonoJS CLI. Run npx @sonojs/ui@latest init and follow the prompts for your framework, theme tokens, and TypeScript setup.",
    },
    {
      heading: "Semantic Token System",
      body: "Style with tokens like bg-primary and text-foreground. Because these map to CSS custom properties backed by oklch values, dark mode is zero-effort.",
    },
    {
      heading: "Responsive Layouts",
      body: "Prefer logical layout utilities so grids and stacks adapt without physical left/right assumptions. Keep control heights consistent across breakpoints.",
    },
    {
      heading: "Accessibility by Default",
      body: "Interactive components ship with correct ARIA attributes, keyboard navigation, and focus management. Overlays handle focus trapping.",
    },
    {
      heading: "Production Checklist",
      body: "Before shipping: run typecheck, verify the build, and test at 375px, 768px, and 1280px. Check light and dark modes and visible focus rings.",
    },
  ],
} as const

function useArticleProgress(articleRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const el = articleRef.current
      const { top, height } = el.getBoundingClientRect()
      const scrolled = Math.max(0, -top)
      const total = height - window.innerHeight
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [articleRef])

  return progress
}

export default function ReadingProgress({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const articleRef = React.useRef<HTMLElement>(null)
  const progress = useArticleProgress(articleRef)
  const [copied, setCopied] = React.useState(false)
  const showChrome = progress > 2
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const copy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).catch(() => {})
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
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
        <h1 className="mb-6 text-h1 font-bold tracking-tight">
          {ARTICLE.title}
        </h1>
        <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-border/70 pb-6">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-bold text-primary">
              {ARTICLE.author[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-start">
            <p className="text-sm font-semibold">{ARTICLE.author}</p>
            <p className="text-xs text-muted-foreground">
              <span dir="ltr">{ARTICLE.date}</span>
              <span aria-hidden> · </span>
              <span className="inline-flex items-center gap-1">
                <BookOpenIcon className="size-3" aria-hidden />
                {ARTICLE.readTime}
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-10">
          {ARTICLE.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-4 text-xl font-bold tracking-tight">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      {showChrome ? (
        <div className="fixed end-6 bottom-6 z-40 flex flex-col items-center gap-2">
          <div className="flex flex-col gap-2 rounded-[12px] border border-border/70 bg-card/95 p-1.5 shadow-soft backdrop-blur-sm">
            <button
              type="button"
              aria-label="Share"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => {
                if (typeof window === "undefined") return
                window.open(
                  `https://x.com/intent/tweet?text=${encodeURIComponent(ARTICLE.title)}`,
                  "_blank",
                  "noopener,noreferrer"
                )
              }}
            >
              <Share2Icon className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={copied ? "Link copied" : "Copy link"}
              className={cn(
                "inline-flex size-9 cursor-pointer items-center justify-center rounded-md transition-colors",
                copied
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              onClick={copy}
            >
              {copied ? (
                <CheckIcon className="size-4" aria-hidden />
              ) : (
                <Link2Icon className="size-4" aria-hidden />
              )}
            </button>
          </div>

          <button
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative flex size-14 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card shadow-soft transition-transform hover:scale-105 active:scale-95"
          >
            <svg
              className="absolute inset-0 size-full -rotate-90"
              viewBox="0 0 56 56"
              aria-hidden
            >
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                className="stroke-muted"
                strokeWidth="3"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                className="stroke-primary transition-[stroke-dashoffset] duration-150 ease-out"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <span
              className="relative z-10 flex flex-col items-center"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {progress > 8 ? (
                <span className="text-[10px] font-bold tabular-nums text-foreground">
                  {Math.round(progress)}
                </span>
              ) : (
                <ArrowUpIcon className="size-4 text-foreground" aria-hidden />
              )}
            </span>
          </button>
        </div>
      ) : null}
    </section>
  )
}
