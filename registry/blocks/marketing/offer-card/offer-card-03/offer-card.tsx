"use client"

import type { CSSProperties } from "react"
import {
  ArrowRightIcon,
  CircleCheckIcon,
  OrbitIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "../_lib/meteor-border"

const ACCENT = "#7c3aed"
const ACCENT_HOVER = "#6d28d9"

const FEATURES = [
  "Glass surfaces & aura glows",
  "Motion-ready presets",
  "Dark / light parity",
  "RTL from day one",
]

/** Glassmorphic Aura tier — default meteor speed 0.9. */
export default function OfferCard({
  className,
  speed = 0.9,
}: {
  className?: string
  speed?: number
}) {
  const borderRadius = 20
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
          className="relative overflow-hidden border border-white/20 bg-card/70 backdrop-blur-xl dark:border-white/10 dark:bg-card/50"
          style={{ borderRadius: innerRadius }}
        >
          <div
            className="offer-pulse-glow absolute -start-10 -top-10 size-36 rounded-full blur-3xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${ACCENT} 28%, transparent)`,
            }}
          />
          <div
            className="offer-pulse-glow absolute -bottom-8 -end-8 size-28 rounded-full blur-3xl"
            style={{
              animationDelay: "0.8s",
              backgroundColor: `color-mix(in srgb, #06b6d4 22%, transparent)`,
            }}
          />

          <div className="relative z-10 p-4 text-start">
            <div
              className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5"
              style={{
                backgroundColor: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
                borderColor: `color-mix(in srgb, ${ACCENT} 28%, transparent)`,
              }}
            >
              <OrbitIcon
                className="size-2.5"
                style={{ color: ACCENT }}
                aria-hidden
              />
              <span
                className="text-[9px] font-bold tracking-widest uppercase"
                style={{ color: ACCENT }}
              >
                Aura
              </span>
            </div>

            <h3 className="text-base font-extrabold leading-tight tracking-tight text-foreground">
              Soft glow.{" "}
              <span className="offer-badge-shine font-black">Hard polish.</span>
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              Meta-ready surfaces for pricing heroes — frosted glass, dual orbs,
              and a violet meteor that never sleeps.
            </p>

            <ul className="mt-4 space-y-1.5">
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

            <div
              className="mt-4 mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-2xl border px-3.5 py-2.5"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${ACCENT} 12%, transparent), color-mix(in srgb, #06b6d4 8%, transparent))`,
                borderColor: `color-mix(in srgb, ${ACCENT} 22%, transparent)`,
              }}
            >
              <div className="flex items-baseline gap-1.5" dir="ltr">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  $129
                </span>
                <span className="text-xs text-muted-foreground">lifetime</span>
              </div>
              <span
                className="rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase"
                style={{
                  color: ACCENT,
                  backgroundColor: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                }}
              >
                Studio
              </span>
            </div>

            <a
              href="#"
              className="group/btn relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:shadow-lg"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, #06b6d4)`,
                boxShadow: `0 4px 18px color-mix(in srgb, ${ACCENT} 40%, transparent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.08)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "none"
              }}
            >
              <div className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full rtl:translate-x-full rtl:group-hover/btn:-translate-x-full" />
              <span className="relative z-10">Unlock Aura</span>
              <ArrowRightIcon className="icon-dir relative z-10 size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </a>
          </div>
        </div>
      </MeteorBorder>
      <OfferCardEffectsStyle />
    </div>
  )
}
