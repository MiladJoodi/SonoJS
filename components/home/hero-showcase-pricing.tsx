"use client"

import * as React from "react"

import {
  DemoCard,
  Stagger,
} from "@/components/home/hero-showcase-chrome"
import { cn } from "@/lib/utils"

const PRICES = [12, 29, 79] as const

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/** Animate from previous value to `target` when the price changes. */
function useCountedPrice(target: number) {
  const [display, setDisplay] = React.useState(target)
  const displayRef = React.useRef(target)
  const rafRef = React.useRef(0)

  React.useEffect(() => {
    displayRef.current = display
  }, [display])

  React.useEffect(() => {
    const from = displayRef.current
    if (from === target) return

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setDisplay(target)
      return
    }

    const delta = Math.abs(target - from)
    const duration = Math.min(520, 220 + delta * 18)
    const start = performance.now()
    cancelAnimationFrame(rafRef.current)

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const next = Math.round(from + (target - from) * easeOutCubic(t))
      setDisplay(next)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target])

  return display
}

export function ShowcasePricingPreview({
  show,
  className,
}: {
  show: boolean
  className?: string
}) {
  const [plan, setPlan] = React.useState(1)
  const [yearly, setYearly] = React.useState(false)

  React.useEffect(() => {
    setPlan(1)
    setYearly(false)
  }, [show])

  const price = Math.round(PRICES[plan]! * (yearly ? 0.8 : 1))
  const counted = useCountedPrice(price)

  return (
    <DemoCard show={show} className={className}>
      <Stagger i={0} show={show}>
        <div className="mb-3 flex gap-1 rounded-[10px] border border-border/70 bg-background p-[3px]">
          {(["Solo", "Team", "Scale"] as const).map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={plan === i}
              onClick={() => {
                setPlan(i)
              }}
              className={cn(
                "h-[30px] flex-1 cursor-pointer rounded-[7px] text-[13px] font-medium transition-colors",
                plan === i
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </Stagger>
      <Stagger i={1} show={show}>
        <div className="mb-3 flex gap-1 rounded-[10px] border border-border/70 bg-background p-[3px]">
          {(
            [
              { label: "Monthly", short: "Monthly", yr: false },
              { label: "Yearly · save 20%", short: "Yearly", yr: true },
            ] as const
          ).map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={yearly === b.yr}
              title={b.label}
              onClick={() => {
                setYearly(b.yr)
              }}
              className={cn(
                "h-[30px] flex-1 cursor-pointer rounded-[7px] px-1 text-[12px] font-medium transition-colors sm:text-[13px]",
                yearly === b.yr
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <span className="sm:hidden">{b.short}</span>
              <span className="hidden sm:inline">{b.label}</span>
            </button>
          ))}
        </div>
      </Stagger>
      <Stagger i={2} show={show}>
        <p
          className="mt-2 text-[2.25rem] leading-none font-semibold tracking-[-0.04em] tabular-nums sm:text-[46px]"
          aria-live="polite"
        >
          ${counted}
          <small className="ms-1 text-xs font-normal tracking-normal text-muted-foreground sm:text-sm">
            / seat / month
          </small>
        </p>
      </Stagger>
      <Stagger i={3} show={show}>
        <ul className="mt-3.5 grid gap-2 text-sm text-muted-foreground">
          {[
            "Unlimited projects",
            "Shared team workspaces",
            "Email support",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-start">
              <span
                className="size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </Stagger>
      <Stagger i={4} show={show}>
        <button
          type="button"
          className="mt-4 flex h-[42px] w-full cursor-pointer items-center justify-center rounded-[10px] bg-primary text-sm font-medium text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Choose plan
        </button>
      </Stagger>
    </DemoCard>
  )
}

