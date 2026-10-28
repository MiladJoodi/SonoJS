"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const READ_MINUTES = 11

const ARTICLE = {
  series: "Essay · Summer 2026",
  title: "The quiet interface: designing for attention, not dopamine",
  dek: "A field note on slowing the scroll — progress as place, not a percentage shout.",
  author: "Noor Haddad",
  role: "Design lead",
  date: "Aug 4, 2026",
  sections: [
    {
      id: "signal",
      heading: "Signal over noise",
      paragraphs: [
        "Most reading chrome shouts. Bars race across the top, docks claim the thumb zone, pills float like notifications. The reader never forgets they are being measured.",
        "A quieter pattern treats progress as place. You always know where you are in the essay, but the chrome stays at the edge — a spine, not a banner.",
      ],
    },
    {
      id: "spine",
      heading: "The vertical spine",
      paragraphs: [
        "Map each section to a tick on a tall rail along the inline end. As the reading line moves, ticks fill and the active chapter label updates. No competing sticky header.",
        "Because the rail is logical (`end`), it mirrors correctly in RTL without rewriting layout math. The article column stays centered and calm.",
      ],
    },
    {
      id: "tempo",
      heading: "Tempo and remaining time",
      paragraphs: [
        "Show remaining minutes only when it helps — mid-read, not at the first pixel. Round gently so the number does not jitter every scroll frame.",
        "When the reader reaches the end, swap the HUD for a finished state. Completion should feel like closing a book, not clearing a quest.",
      ],
    },
    {
      id: "craft",
      heading: "Typography as the product",
      paragraphs: [
        "If the chrome is quiet, the type has to carry the experience. Generous leading, a clear dek, and section titles that earn their weight.",
        "Pull quotes and short paragraphs give the spine room to breathe. Short demos make every tick fire at once — long copy is part of the interaction design.",
      ],
    },
    {
      id: "ship",
      heading: "Ship notes",
      paragraphs: [
        "Throttle scroll updates with requestAnimationFrame. Prefer a reading-line spy over noisy IntersectionObserver thresholds on short blocks.",
        "Expose a real progressbar for assistive tech, keep focus rings on chapter ticks, and never trap scroll inside the demo unless the product truly uses a nested scroller.",
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

      const rect = article.getBoundingClientRect()
      const viewport = window.innerHeight
      const total = Math.max(article.offsetHeight - viewport, 0)
      const scrolled = clamp(-rect.top, 0, total)
      const next = total > 0 ? (scrolled / total) * 100 : 0
      setProgress((prev) => (Math.abs(prev - next) < 0.4 ? prev : next))

      const marker = viewport * 0.32
      let nextId = ARTICLE.sections[0].id
      for (const section of ARTICLE.sections) {
        const node = document.getElementById(section.id)
        if (!node) continue
        if (node.getBoundingClientRect().top <= marker) nextId = section.id
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

  const done = progress >= 97
  const minutesLeft = Math.max(
    0,
    Math.ceil(READ_MINUTES * (1 - progress / 100))
  )
  const activeSection =
    ARTICLE.sections.find((s) => s.id === activeId) ?? ARTICLE.sections[0]
  const activeIndex = ARTICLE.sections.findIndex((s) => s.id === activeId)

  return (
    <section
      className={cn(
        "relative w-full min-w-0 bg-white text-foreground dark:bg-background",
        className
      )}
      aria-labelledby="reading-progress-05-heading"
      {...props}
    >
      {/* End-edge vertical spine — exclusive to this variant */}
      <div
        className="pointer-events-none fixed end-3 top-1/2 z-40 hidden -translate-y-1/2 sm:end-5 md:flex"
        aria-hidden
      >
        <div className="pointer-events-auto flex flex-col items-center gap-3">
          <div
            className="relative flex h-56 w-10 flex-col items-center justify-between py-1"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          >
            <div className="absolute inset-y-1 start-1/2 w-px -translate-x-1/2 bg-border/80" />
            <div
              className="absolute start-1/2 top-1 w-px -translate-x-1/2 bg-foreground transition-[height] duration-200 ease-out"
              style={{ height: `calc(${clamp(progress, 0, 100)}% - 0.25rem)` }}
            />
            {ARTICLE.sections.map((section, i) => {
              const filled = progress >= ((i + 0.5) / ARTICLE.sections.length) * 100
              const active = section.id === activeId
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-label={section.heading}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative z-10 size-2.5 cursor-pointer rounded-full border transition-[transform,background-color,border-color] duration-200",
                    active
                      ? "scale-125 border-foreground bg-foreground"
                      : filled
                        ? "border-foreground/70 bg-foreground/70"
                        : "border-border bg-card hover:border-foreground/40"
                  )}
                  onClick={() => {
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    setActiveId(section.id)
                  }}
                />
              )
            })}
          </div>

          <div className="w-10 rounded-[12px] border border-border/70 bg-card/95 px-1.5 py-2 text-center shadow-soft backdrop-blur-sm">
            {done ? (
              <CheckIcon
                className="mx-auto size-3.5 text-emerald-600 dark:text-emerald-400"
                aria-hidden
              />
            ) : (
              <p
                dir="ltr"
                className="font-mono text-[10px] font-semibold tabular-nums leading-none text-foreground"
              >
                {Math.round(progress)}
                <span className="block text-[9px] font-medium text-muted-foreground">
                  %
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / compact HUD — bottom-end chip, not a full dock */}
      <div className="fixed end-4 bottom-4 z-40 md:hidden">
        <div
          className="flex items-center gap-3 rounded-full border border-border/70 bg-card/95 py-2 ps-3 pe-2.5 shadow-soft backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div className="min-w-0 text-start">
            <p className="truncate text-[11px] font-medium text-foreground">
              {done ? "Finished" : activeSection.heading}
            </p>
            <p className="text-[10px] text-muted-foreground" dir="ltr">
              {done
                ? "Nice read"
                : minutesLeft <= 1
                  ? "< 1 min left"
                  : `${minutesLeft} min left`}
            </p>
          </div>
          <div
            className="relative size-9 shrink-0"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          >
            <svg viewBox="0 0 36 36" className="size-9 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-muted"
                strokeWidth="2.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-foreground transition-[stroke-dashoffset] duration-200 ease-out"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15}`}
                strokeDashoffset={`${2 * Math.PI * 15 * (1 - progress / 100)}`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-semibold tabular-nums">
              {Math.round(progress)}
            </span>
          </div>
        </div>
      </div>

      <article
        ref={articleRef}
        className="mx-auto max-w-xl px-4 py-16 pe-14 sm:py-24 sm:pe-16 md:pe-20"
      >
        <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          {ARTICLE.series}
        </p>
        <h1
          id="reading-progress-05-heading"
          className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {ARTICLE.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {ARTICLE.dek}
        </p>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-y border-border/70 py-4 text-sm">
          <span className="font-semibold text-foreground">{ARTICLE.author}</span>
          <span className="text-muted-foreground">{ARTICLE.role}</span>
          <span className="text-muted-foreground" dir="ltr">
            {ARTICLE.date}
          </span>
          <span className="ms-auto font-mono text-xs tabular-nums text-muted-foreground" dir="ltr">
            {activeIndex + 1}/{ARTICLE.sections.length}
          </span>
        </div>

        {/* Desktop chapter label under meta — tied to spine */}
        <div
          className="sticky top-0 z-30 -mx-4 mb-10 hidden border-b border-border/60 bg-white/90 px-4 py-3 backdrop-blur-md md:block dark:bg-background/90"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-medium text-foreground">
              {done ? "Essay complete" : activeSection.heading}
            </p>
            <p className="shrink-0 text-xs text-muted-foreground" dir="ltr">
              {done
                ? "100%"
                : minutesLeft <= 1
                  ? "Almost done"
                  : `${minutesLeft} min left`}
            </p>
          </div>
        </div>

        <div className="space-y-16">
          {ARTICLE.sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-20"
            >
              <p
                dir="ltr"
                className="mb-3 font-mono text-[11px] tabular-nums tracking-wide text-muted-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mb-5 text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {index === 1 ? (
                <blockquote className="mb-6 border-s-2 border-foreground/80 ps-5 text-xl font-medium leading-snug text-foreground">
                  Progress should feel like place — a spine you can touch —
                  not a timer racing the thumb.
                </blockquote>
              ) : null}
              <div className="space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-[1.75] text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 border-t border-border/70 pt-8 text-start">
          <p className="text-sm text-muted-foreground">
            {done
              ? "You reached the end. The spine is full — close the tab when you’re ready."
              : "Keep scrolling. The end-edge spine fills as each chapter crosses the reading line."}
          </p>
        </footer>
      </article>
    </section>
  )
}
