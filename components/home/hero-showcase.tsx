"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import {
  ShowcasePreviewFor,
  type ShowcaseDemoId,
} from "@/components/home/hero-showcase-previews"
import { cn } from "@/lib/utils"

const PROMPTS: {
  id: ShowcaseDemoId
  label: string
  text: string
  file: string
}[] = [
  {
    id: "login",
    label: "Login",
    text: "Build a beautiful login form with SonoJS",
    file: "login-form.tsx",
  },
  {
    id: "pricing",
    label: "Pricing",
    text: "Build a pricing card UI",
    file: "pricing-card.tsx",
  },
  {
    id: "player",
    label: "Player",
    text: "Build a music player with SonoJS",
    file: "music-player.tsx",
  },
  {
    id: "palette",
    label: "Command",
    text: "Build a command palette with SonoJS",
    file: "command-palette.tsx",
  },
  {
    id: "chart",
    label: "Chart",
    text: "Build an analytics chart with SonoJS",
    file: "analytics-chart.tsx",
  },
]

function pickPrompt(text: string): ShowcaseDemoId {
  const t = text.toLowerCase()
  if (/pric|plan|tier|bill/.test(t)) return "pricing"
  if (/music|player|audio|song|sound|play/.test(t)) return "player"
  if (/command|palette|search|menu|cmd/.test(t)) return "palette"
  if (/chart|analytics|users|metric|graph/.test(t)) return "chart"
  return "login"
}

type StepState = { label: string; on: boolean; done: boolean }

function settledSteps(file: string): StepState[] {
  return [
    { label: "Reading your project", on: true, done: true },
    { label: "Composing with SonoJS components", on: true, done: true },
    { label: `Wrote ${file}`, on: true, done: true },
  ]
}

export function HeroShowcase({ className }: { className?: string }) {
  const firstPrompt = PROMPTS[0]!
  // Mount already settled — avoids empty→animate→paint that feels like a double load.
  const [active, setActive] = React.useState<ShowcaseDemoId>(firstPrompt.id)
  const [query, setQuery] = React.useState(firstPrompt.text)
  const [steps, setSteps] = React.useState<StepState[]>(() =>
    settledSteps(firstPrompt.file)
  )
  const [showCanvas, setShowCanvas] = React.useState(true)
  const [previewKey, setPreviewKey] = React.useState(0)
  const [motionOn, setMotionOn] = React.useState(false)

  const runRef = React.useRef(0)

  const swapTo = React.useCallback((text: string, id: ShowcaseDemoId) => {
    runRef.current += 1
    const prompt = PROMPTS.find((p) => p.id === id) ?? PROMPTS[0]!
    setMotionOn(false)
    setActive(id)
    setQuery(text)
    setSteps(settledSteps(prompt.file))
    setShowCanvas(true)
    setPreviewKey((k) => k + 1)
  }, [])

  function selectChip(id: ShowcaseDemoId) {
    if (id === active) return
    const prompt = PROMPTS.find((p) => p.id === id)!
    swapTo(prompt.text, id)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = query.trim()
    if (!v) return
    swapTo(v, pickPrompt(v))
  }

  return (
    <section
      aria-label="Interactive demo: describe a UI and watch an agent build it"
      className={cn(
        "relative flex h-[37rem] flex-col gap-2.5 overflow-x-clip overflow-y-visible p-2.5 transition-colors sm:h-[40rem] sm:gap-3.5 sm:p-[18px]",
        className
      )}
    >
      {/* Background shell only — fades at the bottom; foreground cards stay sharp */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-border/70 bg-muted/50 sm:rounded-3xl dark:bg-muted/30"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 14%, transparent 58%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 14%, transparent 58%)",
        }}
      />

      <div
        role="tablist"
        aria-label="Showcase prompts"
        className="relative z-10 flex min-w-0 gap-1.5 overflow-x-auto overscroll-x-contain pb-0.5 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {PROMPTS.map((p) => {
          const selected = p.id === active
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-pressed={selected}
              onClick={() => selectChip(p.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-3 py-2 text-xs transition-colors sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[13px]",
                selected
                  ? "border-primary text-foreground"
                  : "border-border/70 bg-card text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground"
              )}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <form
        onSubmit={onSubmit}
        className={cn(
          "relative z-10 flex items-center gap-1 rounded-[14px] border border-border/70 bg-card py-1 ps-3 pe-1 transition-colors sm:gap-1.5 sm:ps-4 sm:pe-1.5",
          "focus-within:border-primary"
        )}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-label="Describe a UI"
          placeholder="Describe a UI…"
          className="h-9 min-w-0 flex-1 bg-transparent text-[13px] leading-snug text-foreground outline-none placeholder:text-muted-foreground sm:h-9 sm:text-[15px]"
        />
        <button
          type="submit"
          aria-label="Build"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:size-8"
        >
          <ArrowRightIcon className="size-3.5 icon-dir" strokeWidth={1.8} />
        </button>
      </form>

      <ol
        aria-live="polite"
        className="relative z-10 flex min-h-[54px] flex-col gap-1 px-0.5 text-xs text-muted-foreground sm:min-h-[62px] sm:gap-1.5 sm:px-1 sm:text-[13px]"
      >
        {steps.map((s) => (
          <li
            key={s.label}
            className={cn(
              "flex items-start gap-2 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
              s.on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              s.done && "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "relative mt-0.5 grid size-3.5 shrink-0 place-items-center rounded-full border-[1.5px] border-border",
                s.done && "border-primary bg-primary"
              )}
              aria-hidden
            >
              {s.done ? (
                <svg
                  viewBox="0 0 10 10"
                  className="size-2 text-primary-foreground"
                  aria-hidden
                >
                  <path
                    d="M2 5.2l2 2.2L8 2.8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </span>
            <span className="min-w-0 break-words">{s.label}</span>
          </li>
        ))}
      </ol>

      {/* Absolute fill so demo height stays locked; overflow-visible + pad so card shadow-soft isn’t clipped */}
      <div className="relative z-10 min-h-0 w-full min-w-0 flex-1 overflow-visible pb-6 sm:pb-7">
        <div className="absolute inset-x-0 top-0 bottom-6 flex items-start justify-center overflow-visible px-1 sm:bottom-7">
          <ShowcasePreviewFor
            key={previewKey}
            id={active}
            show={showCanvas}
            animate={motionOn}
          />
        </div>
      </div>
    </section>
  )
}
