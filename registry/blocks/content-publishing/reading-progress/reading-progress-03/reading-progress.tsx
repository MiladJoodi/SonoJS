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
      id: "intro",
      heading: "Introduction",
      body: "Modern front-end development demands more than just getting things to work — it requires systems that scale, components that compose, and designs that adapt. SonoJS is built to satisfy all three.",
    },
    {
      id: "setup",
      heading: "Setting Up the Project",
      body: "The fastest way to start is with the SonoJS CLI. Run npx @sonojs/ui@latest init and follow the prompts for your framework, theme tokens, and TypeScript setup.",
    },
    {
      id: "tokens",
      heading: "Semantic Token System",
      body: "Style with tokens like bg-primary and text-foreground. Because these map to CSS custom properties backed by oklch values, dark mode is zero-effort.",
    },
    {
      id: "responsive",
      heading: "Responsive Layouts",
      body: "Prefer logical layout utilities so grids and stacks adapt without physical left/right assumptions. Keep control heights consistent across breakpoints.",
    },
    {
      id: "a11y",
      heading: "Accessibility by Default",
      body: "Interactive components ship with correct ARIA attributes, keyboard navigation, and focus management. Overlays handle focus trapping.",
    },
    {
      id: "checklist",
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
  const [activeId, setActiveId] = React.useState(ARTICLE.sections[0].id)

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

  React.useEffect(() => {
    const nodes = ARTICLE.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={cn(
        "relative min-h-svh w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      {...props}
    >
      <div
        className="sticky top-0 z-50 h-1 w-full bg-muted"
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

      <div className="mx-auto flex max-w-5xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="sticky top-8 space-y-3 text-start">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Chapters
              </p>
              <span className="font-mono text-xs tabular-nums text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <nav aria-label="Article chapters">
              <ul className="space-y-0.5" role="list">
                {ARTICLE.sections.map((section) => {
                  const active = activeId === section.id
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={() => setActiveId(section.id)}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-primary/10 font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "h-4 w-0.5 shrink-0 rounded-full",
                            active ? "bg-primary" : "bg-transparent"
                          )}
                          aria-hidden
                        />
                        <span className="truncate">{section.heading}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </aside>

        <article ref={articleRef} className="min-w-0 flex-1 max-w-2xl">
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
              <section key={section.id} id={section.id}>
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
      </div>
    </section>
  )
}
