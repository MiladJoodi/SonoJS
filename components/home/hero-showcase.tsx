"use client"

import * as React from "react"

import {
  ShowcaseChartPreview,
  ShowcaseLoginPreview,
} from "@/components/home/hero-showcase-previews"
import { cn } from "@/lib/utils"

type PromptId = "login" | "chart"

const PROMPTS: {
  id: PromptId
  label: string
  user: string
}[] = [
  {
    id: "login",
    label: "Login form",
    user: "Build a login form with email, password, Google, and Apple sign-in.",
  },
  {
    id: "chart",
    label: "Analytics chart",
    user: "Build an analytics chart for weekly active users.",
  },
]

function PreviewFor({ id }: { id: PromptId }) {
  if (id === "chart") return <ShowcaseChartPreview />
  return <ShowcaseLoginPreview />
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

export function HeroShowcase({ className }: { className?: string }) {
  const [active, setActive] = React.useState<PromptId>("login")
  const [typed, setTyped] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const [bubbleIn, setBubbleIn] = React.useState(false)
  const [showPreview, setShowPreview] = React.useState(false)
  const [previewKey, setPreviewKey] = React.useState(0)
  const introDoneRef = React.useRef(false)
  const runRef = React.useRef(0)
  const fadeTimerRef = React.useRef<number | null>(null)

  const current = PROMPTS.find((p) => p.id === active) ?? PROMPTS[0]!

  React.useEffect(() => {
    const run = ++runRef.current
    const prompt = PROMPTS[0]!

    if (prefersReducedMotion()) {
      setBubbleIn(true)
      setTyped(prompt.user)
      setShowPreview(true)
      introDoneRef.current = true
      return
    }

    setBubbleIn(true)
    setTyping(true)

    const startDelay = window.setTimeout(function tick(i = 0) {
      if (run !== runRef.current) return
      const next = Math.min(i + 1, prompt.user.length)
      setTyped(prompt.user.slice(0, next))
      if (next < prompt.user.length) {
        // Slight ease: a bit slower at the start, steadier after.
        const delay = next < 8 ? 38 : next < 20 ? 28 : 22
        window.setTimeout(() => tick(next), delay)
      } else {
        setTyping(false)
        window.setTimeout(() => {
          if (run === runRef.current) {
            setShowPreview(true)
            introDoneRef.current = true
          }
        }, 320)
      }
    }, 280)

    return () => {
      runRef.current += 1
      window.clearTimeout(startDelay)
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    }
  }, [])

  function switchPreview(id: PromptId) {
    if (id === active) return
    const prompt = PROMPTS.find((p) => p.id === id) ?? PROMPTS[0]!

    if (prefersReducedMotion()) {
      setActive(id)
      setTyped(prompt.user)
      setShowPreview(true)
      setPreviewKey((k) => k + 1)
      return
    }

    setShowPreview(false)
    if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current)
    fadeTimerRef.current = window.setTimeout(() => {
      setActive(id)
      setTyped(prompt.user)
      setPreviewKey((k) => k + 1)
      // next frame so enter transition runs
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShowPreview(true))
      })
    }, 280)
  }

  function select(id: PromptId) {
    if (!introDoneRef.current) return
    switchPreview(id)
  }

  function onTabsKeyDown(e: React.KeyboardEvent) {
    if (!introDoneRef.current) return
    const i = PROMPTS.findIndex((p) => p.id === active)
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      select(PROMPTS[(i + 1) % PROMPTS.length]!.id)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      select(PROMPTS[(i - 1 + PROMPTS.length) % PROMPTS.length]!.id)
    } else if (e.key === "Home") {
      e.preventDefault()
      select(PROMPTS[0]!.id)
    } else if (e.key === "End") {
      e.preventDefault()
      select(PROMPTS[PROMPTS.length - 1]!.id)
    }
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 rounded-[16px] border border-border/70 bg-card/60 p-4 shadow-soft sm:p-5",
        className
      )}
    >
      <div
        role="tablist"
        aria-label="Showcase prompts"
        onKeyDown={onTabsKeyDown}
        className="flex flex-wrap gap-2"
      >
        {PROMPTS.map((p) => {
          const selected = p.id === active
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              id={`hero-showcase-tab-${p.id}`}
              aria-selected={selected}
              aria-controls="hero-showcase-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(p.id)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                selected
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "border-border/70 bg-background/80 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
        <div
          className="flex min-h-[88px] flex-col rounded-[12px] border border-border/70 bg-muted/40 p-3"
          aria-label="Example prompt"
        >
          <p
            className={cn(
              "ms-auto max-w-[95%] rounded-[12px_12px_4px_12px] border border-border/70 bg-card px-3 py-2 text-start text-sm leading-snug text-foreground shadow-soft",
              "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              bubbleIn
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0"
            )}
          >
            <span className="sr-only">{current.user}</span>
            <span aria-hidden="true">
              {typed}
              <span
                className={cn(
                  "ms-px inline-block h-[1.05em] w-0.5 translate-y-[-0.15em] bg-primary align-middle",
                  typing && "animate-caret-blink motion-reduce:animate-none",
                  !typing && "opacity-0"
                )}
              />
            </span>
          </p>
        </div>

        <div
          id="hero-showcase-panel"
          role="tabpanel"
          aria-labelledby={`hero-showcase-tab-${active}`}
          aria-live="polite"
          className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-[12px] border border-border/70 bg-muted/30 p-3 sm:p-4"
        >
          <div
            key={previewKey}
            className={cn(
              "w-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              showPreview
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            )}
          >
            {showPreview || prefersReducedMotion() ? (
              <PreviewFor id={active} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
