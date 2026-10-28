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
  readTime: "14 min read",
  tags: ["Design Systems", "React", "Tailwind CSS"],
  sections: [
    {
      id: "intro",
      heading: "Introduction",
      paragraphs: [
        "Modern front-end development demands more than just getting things to work — it requires systems that scale, components that compose, and designs that adapt across products and teams. SonoJS is built to satisfy all three without forcing a rigid architecture on your app.",
        "This guide walks through the practical path from a fresh project to a production UI: setup, tokens, layout, accessibility, and a checklist you can reuse on every release. Keep this page open while you scroll — the chapter rail on the side tracks where you are.",
        "If you are evaluating component kits, focus on install ergonomics, token ownership, and direction support. Those three decide whether a library survives the second product, not the first demo.",
      ],
    },
    {
      id: "setup",
      heading: "Setting Up the Project",
      paragraphs: [
        "The fastest way to start is with the SonoJS CLI. Run npx @sonojs/ui@latest init and follow the prompts for your framework, theme tokens, and TypeScript setup. The CLI writes a components map, CSS entry, and baseline dependencies so add commands land in the right folders.",
        "After init, add only the primitives you need. Prefer small increments — button, then field, then dialog — so review stays readable. Each add installs registry dependencies recursively and runs npm for missing packages.",
        "Pin versions when a major would break APIs. DayPicker-style ranges are a good example: declare the major your source expects so consumers do not silently upgrade into a broken UI.",
      ],
    },
    {
      id: "tokens",
      heading: "Semantic Token System",
      paragraphs: [
        "Style with tokens like bg-primary and text-foreground. Because these map to CSS custom properties backed by oklch values, dark mode is zero-effort once the theme sheet is in place.",
        "Keep brand color decisions in the theme file, not scattered across components. Heights, radius, and spacing should follow the control scale so docs previews and installed apps stay visually aligned.",
        "When you need a one-off surface, derive it from existing tokens with color-mix rather than inventing a new hex. That keeps contrast tooling and theme switches honest.",
      ],
    },
    {
      id: "responsive",
      heading: "Responsive Layouts",
      paragraphs: [
        "Prefer logical layout utilities so grids and stacks adapt without physical left/right assumptions. Use ms/me, ps/pe, and start/end so RTL and LTR inherit direction from the document.",
        "Keep control heights consistent across breakpoints. Responsive work should change width, stacking, and gutters — not shrink buttons below the default control height.",
        "For sticky chrome like this chapter rail, make sure the reading column is tall enough that sticky has room to travel. Short demos make progress and active states flicker.",
      ],
    },
    {
      id: "a11y",
      heading: "Accessibility by Default",
      paragraphs: [
        "Interactive components ship with correct ARIA attributes, keyboard navigation, and focus management. Overlays handle focus trapping and restore focus on close.",
        "Reading chrome should expose progress to assistive tech with a real progressbar role and live values. Chapter links need clear labels and visible focus rings.",
        "Test with keyboard only once per release. If you cannot reach every control and see where focus is, the page is not ready — no matter how polished the visual design looks.",
      ],
    },
    {
      id: "checklist",
      heading: "Production Checklist",
      paragraphs: [
        "Before shipping: run typecheck, verify the production build, and test at 375px, 768px, and 1280px. Check light and dark modes and confirm focus rings stay visible on primary and muted surfaces.",
        "Spot-check direction with both LTR and RTL providers. Directional icons should flip; brand marks and avatars should not. Sticky sidebars and progress bars must remain usable in both directions.",
        "Finally, scroll this article end-to-end once. The chapter rail should settle on one active item at a time, the progress bar should climb smoothly, and nothing in the side chrome should jitter as sections pass the reading line.",
      ],
    },
  ],
} as const

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export default function ReadingProgress({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const rootRef = React.useRef<HTMLElement>(null)
  const articleRef = React.useRef<HTMLElement>(null)
  const [progress, setProgress] = React.useState(0)
  const [activeId, setActiveId] = React.useState<
    (typeof ARTICLE.sections)[number]["id"]
  >(ARTICLE.sections[0].id)
  const activeIdRef = React.useRef(activeId)
  activeIdRef.current = activeId

  React.useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const article = articleRef.current
      if (!article) return

      const articleRect = article.getBoundingClientRect()
      const viewport = window.innerHeight
      const total = article.offsetHeight - viewport
      const scrolled = clamp(-articleRect.top, 0, Math.max(total, 0))
      const nextProgress =
        total > 0 ? clamp((scrolled / total) * 100, 0, 100) : 0
      setProgress((prev) =>
        Math.abs(prev - nextProgress) < 0.35 ? prev : nextProgress
      )

      // Reading line ~28% from the top of the viewport — pick the last
      // section whose heading has crossed it. Hysteresis via sticky last id.
      const marker = viewport * 0.28
      let nextId: (typeof ARTICLE.sections)[number]["id"] =
        ARTICLE.sections[0].id
      for (const section of ARTICLE.sections) {
        const node = document.getElementById(section.id)
        if (!node) continue
        const top = node.getBoundingClientRect().top
        if (top <= marker) nextId = section.id
      }
      if (nextId !== activeIdRef.current) setActiveId(nextId)
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className={cn(
        "relative w-full min-w-0 bg-white text-foreground dark:bg-background",
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
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-10 space-y-3 text-start">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Chapters
              </p>
              <span
                dir="ltr"
                className="font-mono text-xs tabular-nums text-primary"
              >
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
                        onClick={(e) => {
                          e.preventDefault()
                          const node = document.getElementById(section.id)
                          node?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                          setActiveId(section.id)
                        }}
                        className={cn(
                          "flex min-h-9 cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary/10 font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                        )}
                        aria-current={active ? "true" : undefined}
                      >
                        <span
                          className={cn(
                            "h-4 w-0.5 shrink-0 rounded-full transition-colors",
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

        <article ref={articleRef} className="min-w-0 max-w-2xl flex-1">
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
          <div className="mb-10 flex flex-wrap items-center gap-3 border-b border-border/70 pb-6">
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
          <div className="space-y-14">
            {ARTICLE.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-14"
              >
                <h2 className="mb-5 text-xl font-bold tracking-tight">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}
