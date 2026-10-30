"use client"

import type { CSSProperties } from "react"
import {
  ArrowRightIcon,
  CircleCheckIcon,
  FlameIcon,
  TimerIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "../_lib/meteor-border"

const ACCENT = "#ea580c"
const ACCENT_HOVER = "#c2410c"

const FEATURES = [
  "Everything in Pro",
  "All future updates",
  "Commercial license",
  "No renewals — ever",
]

/** Flash lifetime deal — default meteor speed 0.9. */
export default function OfferCard({
  className,
  speed = 0.9,
}: {
  className?: string
  speed?: number
}) {
  const borderRadius = 16
  const borderWidth = 1.5
  const innerRadius = borderRadius - borderWidth

  return (
    <div
      className={cn("relative w-full max-w-[300px] overflow-hidden", className)}
      style={
        {
          "--offer-accent": ACCENT,
          borderRadius,
        } as CSSProperties
      }
    >
      <MeteorBorder
        meteorColor={ACCENT}
        speed={speed}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
      >
        <div
          className="relative overflow-hidden border border-border/70 bg-card"
          style={{ borderRadius: innerRadius }}
        >
          <div
            className="offer-pulse-glow absolute -end-4 -top-4 size-20 rounded-full blur-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${ACCENT} 30%, transparent)`,
            }}
          />

          <div className="relative z-10 p-4 text-start">
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                style={{
                  color: ACCENT,
                  backgroundColor: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                }}
              >
                <FlameIcon className="size-2.5" aria-hidden />
                Flash sale
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[9px] font-semibold text-muted-foreground">
                <TimerIcon className="size-2.5" aria-hidden />
                48h left
              </span>
            </div>

            <h3 className="text-base font-extrabold leading-tight tracking-tight text-foreground">
              Lifetime for{" "}
              <span className="offer-badge-shine font-black">less.</span>
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              One payment. Every block, chart, and update — locked in before the
              clock runs out.
            </p>

            <div
              className="mt-4 mb-3.5 rounded-xl border px-3.5 py-3 text-center"
              style={{
                background: `linear-gradient(to bottom, color-mix(in srgb, ${ACCENT} 10%, transparent), transparent)`,
                borderColor: `color-mix(in srgb, ${ACCENT} 20%, transparent)`,
              }}
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Lifetime access
              </p>
              <div
                className="mt-1 flex items-baseline justify-center gap-2"
                dir="ltr"
              >
                <span className="text-3xl font-bold tracking-tight text-foreground">
                  $49
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  $199
                </span>
              </div>
            </div>

            <ul className="mb-4 space-y-1.5">
              {FEATURES.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <CircleCheckIcon
                    className="size-3.5 shrink-0"
                    style={{ color: ACCENT }}
                    aria-hidden
                  />
                  <span className="text-[11.5px] font-medium text-muted-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="group/btn relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:shadow-lg"
              style={{
                backgroundColor: ACCENT,
                boxShadow: `0 4px 16px color-mix(in srgb, ${ACCENT} 40%, transparent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT
              }}
            >
              <div className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 ease-in-out group-hover/btn:translate-x-full rtl:translate-x-full rtl:group-hover/btn:-translate-x-full" />
              <span className="relative z-10">Claim lifetime deal</span>
              <ArrowRightIcon className="icon-dir relative z-10 size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </a>
          </div>
        </div>
      </MeteorBorder>
      <OfferCardEffectsStyle />
    </div>
  )
}
