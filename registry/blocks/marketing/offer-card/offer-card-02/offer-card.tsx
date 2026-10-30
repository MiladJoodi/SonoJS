"use client"

import type { CSSProperties } from "react"
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "../_lib/meteor-border"

const ACCENT = "#2563eb"
const ACCENT_HOVER = "#1d4ed8"

const FEATURES = [
  "Unlimited projects",
  "Priority email support",
  "Team seats (up to 5)",
  "Advanced theming tokens",
]

/** Pricing “Most Popular” tier — slow elegant meteor (speed 0.9). */
export default function OfferCard({
  className,
  speed = 0.9,
}: {
  className?: string
  speed?: number
}) {
  const borderRadius = 18
  const borderWidth = 1.5
  const innerRadius = borderRadius - borderWidth

  return (
    <div
      className={cn("relative w-full max-w-[320px] overflow-hidden", className)}
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
            className="offer-pulse-glow absolute -end-8 top-1/2 size-28 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${ACCENT} 18%, transparent)`,
            }}
          />

          <div className="relative z-10 p-5 text-start">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase"
                style={{
                  color: ACCENT,
                  backgroundColor: `color-mix(in srgb, ${ACCENT} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${ACCENT} 22%, transparent)`,
                }}
              >
                <SparklesIcon className="size-2.5" aria-hidden />
                Most Popular
              </span>
              <span className="text-[10px] font-medium text-muted-foreground">
                Billed yearly
              </span>
            </div>

            <p className="text-[11px] font-medium text-muted-foreground">
              Pricing
            </p>
            <h3 className="mt-0.5 text-lg font-extrabold tracking-tight text-foreground">
              Grow with{" "}
              <span className="offer-badge-shine font-black">Pro</span>
            </h3>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
              The plan teams pick for shipping UI faster — components, blocks,
              and charts in one seat.
            </p>

            <div className="mt-4 flex items-end gap-1.5" dir="ltr">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                $29
              </span>
              <span className="mb-1 text-xs text-muted-foreground">/mo</span>
              <span className="mb-1 ms-1 text-xs text-muted-foreground line-through">
                $39
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {FEATURES.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <span
                    className="flex size-4 shrink-0 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${ACCENT} 14%, transparent)`,
                    }}
                  >
                    <CheckIcon
                      className="size-2.5"
                      style={{ color: ACCENT }}
                      aria-hidden
                    />
                  </span>
                  <span className="text-[12px] font-medium text-foreground/90">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="group/btn relative mt-5 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:shadow-lg"
              style={{
                backgroundColor: ACCENT,
                boxShadow: `0 4px 14px color-mix(in srgb, ${ACCENT} 35%, transparent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT
              }}
            >
              <div className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full rtl:translate-x-full rtl:group-hover/btn:-translate-x-full" />
              <span className="relative z-10">Choose Pro</span>
              <ArrowRightIcon className="icon-dir relative z-10 size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </a>
            <p className="mt-2.5 text-center text-[10px] text-muted-foreground">
              Cancel anytime · 14-day refund
            </p>
          </div>
        </div>
      </MeteorBorder>
      <OfferCardEffectsStyle />
    </div>
  )
}
