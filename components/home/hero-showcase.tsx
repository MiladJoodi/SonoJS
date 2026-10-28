"use client"

import * as React from "react"
import { ArrowRightIcon, Volume2Icon, VolumeXIcon } from "lucide-react"

import {
  chime,
  getShowcaseSound,
  setShowcaseSound,
  tick,
} from "@/components/home/hero-showcase-audio"
import {
  ShowcasePreviewFor,
  type ShowcaseDemoId,
} from "@/components/home/hero-showcase-previews"
import { cn } from "@/lib/utils"

/* Stage demos: login | pricing | player | palette | chart */

const PROMPTS: {
  id: ShowcaseDemoId
  label: string
  text: string
  file: string
}[] = [
  {
    id: "login",
    label: "Login form",
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
    label: "Music player",
    text: "Build a music player with SonoJS",
    file: "music-player.tsx",
  },
  {
    id: "palette",
    label: "Command palette",
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

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function pickPrompt(text: string): ShowcaseDemoId {
  const t = text.toLowerCase()
  if (/pric|plan|tier|bill/.test(t)) return "pricing"
  if (/music|player|audio|song|sound|play/.test(t)) return "player"
  if (/command|palette|search|menu|cmd/.test(t)) return "palette"
  if (/chart|analytics|users|metric|graph/.test(t)) return "chart"
  return "login"
}

type StepState = { label: string; on: boolean; done: boolean }

export function HeroShowcase({ className }: { className?: string }) {
  const [active, setActive] = React.useState<ShowcaseDemoId>("login")
  const [query, setQuery] = React.useState("")
  const [steps, setSteps] = React.useState<StepState[]>([])
  const [showCanvas, setShowCanvas] = React.useState(false)
  const [soundOn, setSoundOn] = React.useState(true)
  const [previewKey, setPreviewKey] = React.useState(0)

  const runRef = React.useRef(0)
  const autoRef = React.useRef(true)
  const nextTimerRef = React.useRef<number | null>(null)

  const clearNext = React.useCallback(() => {
    if (nextTimerRef.current) {
      window.clearTimeout(nextTimerRef.current)
      nextTimerRef.current = null
    }
  }, [])

  const build = React.useCallback(
    async (text: string, id: ShowcaseDemoId, fast: boolean) => {
      const run = ++runRef.current
      clearNext()
      setActive(id)
      setShowCanvas(false)
      setSteps([])
      setPreviewKey((k) => k + 1)

      const prompt = PROMPTS.find((p) => p.id === id) ?? PROMPTS[0]!
      const reduced = prefersReducedMotion()
      const skipType = fast || reduced

      if (skipType) {
        setQuery(text)
      } else {
        setQuery("")
        for (let i = 0; i < text.length; i++) {
          if (run !== runRef.current) return
          setQuery(text.slice(0, i + 1))
          await sleep(24)
        }
        await sleep(260)
      }

      if (run !== runRef.current) return

      const labels = [
        "Reading your project",
        "Composing with SonoJS components",
        `Wrote ${prompt.file}`,
      ]
      const stepDelay = skipType ? 260 : 420

      for (let j = 0; j < labels.length; j++) {
        if (run !== runRef.current) return
        const label = labels[j]!
        setSteps((prev) => [
          ...prev.map((s) => ({ ...s, done: true })),
          { label, on: false, done: false },
        ])
        await sleep(16)
        if (run !== runRef.current) return
        setSteps((prev) =>
          prev.map((s, i) => (i === j ? { ...s, on: true } : s))
        )
        await sleep(stepDelay)
        if (run !== runRef.current) return
        setSteps((prev) =>
          prev.map((s, i) => (i === j ? { ...s, done: true } : s))
        )
      }

      if (run !== runRef.current) return
      setShowCanvas(true)
      chime()

      if (autoRef.current && !reduced) {
        nextTimerRef.current = window.setTimeout(() => {
          const ids = PROMPTS.map((p) => p.id)
          const next = ids[(ids.indexOf(id) + 1) % ids.length]!
          const nextPrompt = PROMPTS.find((p) => p.id === next)!
          void build(nextPrompt.text, next, false)
        }, 7500)
      }
    },
    [clearNext]
  )

  React.useEffect(() => {
    setShowcaseSound(true)
    const first = PROMPTS[0]!
    void build(first.text, first.id, prefersReducedMotion())
    return () => {
      runRef.current += 1
      clearNext()
    }
  }, [build, clearNext])

  function selectChip(id: ShowcaseDemoId) {
    autoRef.current = false
    clearNext()
    tick()
    const prompt = PROMPTS.find((p) => p.id === id)!
    void build(prompt.text, id, false)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const v = query.trim()
    if (!v) return
    autoRef.current = false
    clearNext()
    void build(v, pickPrompt(v), true)
  }

  function toggleSound() {
    const next = !getShowcaseSound()
    setShowcaseSound(next)
    setSoundOn(next)
    if (next) tick()
  }

  return (
    <section
      aria-label="Interactive demo: describe a UI and watch an agent build it"
      onPointerDown={() => {
        autoRef.current = false
        clearNext()
      }}
      className={cn(
        "flex min-h-[540px] flex-col gap-3.5 rounded-3xl border border-border/70 bg-muted/50 p-[18px] transition-colors dark:bg-muted/30",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <div
          role="tablist"
          aria-label="Showcase prompts"
          className="flex flex-1 flex-wrap gap-1.5"
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
                  "cursor-pointer rounded-full border px-3 py-1.5 text-[13px] transition-colors",
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
        <button
          type="button"
          aria-pressed={soundOn}
          aria-label="Sound"
          onClick={toggleSound}
          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          {soundOn ? (
            <Volume2Icon className="size-[17px]" />
          ) : (
            <VolumeXIcon className="size-[17px]" />
          )}
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className={cn(
          "flex items-center gap-2 rounded-[14px] border border-border/70 bg-card py-1.5 ps-4 pe-1.5 transition-colors",
          "focus-within:border-primary"
        )}
      >
        <input
          value={query}
          onChange={(e) => {
            autoRef.current = false
            clearNext()
            setQuery(e.target.value)
          }}
          autoComplete="off"
          aria-label="Describe a UI"
          placeholder="Describe any UI, then press Enter"
          className="h-9 min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="Build"
          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-[10px] bg-primary text-primary-foreground transition-transform active:scale-[0.98]"
        >
          <ArrowRightIcon className="size-4 icon-dir" strokeWidth={1.8} />
        </button>
      </form>

      <ol
        aria-live="polite"
        className="flex min-h-[62px] flex-col gap-1.5 px-1 text-[13px] text-muted-foreground"
      >
        {steps.map((s) => (
          <li
            key={s.label}
            className={cn(
              "flex items-center gap-2 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
              s.on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              s.done && "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "relative grid size-3.5 shrink-0 place-items-center rounded-full border-[1.5px] border-border",
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
            {s.label}
          </li>
        ))}
      </ol>

      <div className="grid flex-1 place-items-center pb-1.5">
        <ShowcasePreviewFor
          key={previewKey}
          id={active}
          show={showCanvas}
        />
      </div>
    </section>
  )
}
