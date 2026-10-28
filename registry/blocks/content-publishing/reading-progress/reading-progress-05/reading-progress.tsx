"use client"

import * as React from "react"
import { BookOpenIcon } from "lucide-react"

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

export default function ReadingProgress({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const articleRef = React.useRef<HTMLElement>(null)
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
  }, [])

  const showPill = progress > 4 && progress < 98

  return (
    <section
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div
        className="sticky top-0 z-50 h-px w-full bg-border"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="h-full bg-foreground transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {showPill ? (
        <div
          className="pointer-events-none fixed start-4 top-1/2 z-40 -translate-y-1/2 sm:start-6"
          aria-hidden={false}
        >
          <div
            className="pointer-events-none rounded-full border border-border/70 bg-card/95 px-2.5 py-1.5 shadow-soft backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <span className="font-mono text-xs font-semibold tabular-nums text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
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
              className="border-transparent bg-muted text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mb-6 text-h1 font-bold tracking-tight">
          {ARTICLE.title}
        </h1>
        <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-border/70 pb-6">
          <Avatar className="size-10 shrink-0">
            <AvatarFallback className="bg-muted text-sm font-bold">
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
    </section>
  )
}
