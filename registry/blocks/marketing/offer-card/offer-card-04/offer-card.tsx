"use client"

import type { CSSProperties } from "react"
import {
  ArrowRightIcon,
  Building2Icon,
  CircleCheckIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "../_lib/meteor-border"

const ACCENT = "#059669"
const ACCENT_HOVER = "#047857"

const FEATURES = [
  "SSO & audit logs",
  "Shared design tokens",
  "Private registry sync",
  "Dedicated success manager",
]

/** Team / enterprise pricing seat — default meteor speed 0.9. */
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
          className="relative overflow-hidden border border-border/70 bg-zinc-950 text-zinc-50 dark:bg-zinc-950"
          style={{ borderRadius: innerRadius }}
        >
          <div
            className="offer-pulse-glow absolute -bottom-6 -end-6 size-24 rounded-full blur-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${ACCENT} 25%, transparent)`,
            }}
          />

          <div className="relative z-10 p-4 text-start">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="flex size-8 items-center justify-center rounded-lg border"
                style={{
                  backgroundColor: `color-mix(in srgb, ${ACCENT} 14%, transparent)`,
                  borderColor: `color-mix(in srgb, ${ACCENT} 28%, transparent)`,
                }}
              >
                <Building2Icon
                  className="size-3.5"
                  style={{ color: ACCENT }}
                  aria-hidden
                />
              </span>
              <div>
                <p className="text-[10px] font-medium text-zinc-400">
                  For teams
                </p>
                <p className="text-sm font-bold text-zinc-50">
                  Enterprise{" "}
                  <span className="offer-badge-shine">Seat</span>
                </p>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-zinc-400">
              Scale design systems across orgs — security, sync, and white-glove
              onboarding included.
            </p>

            <div className="mt-4 flex items-end gap-2" dir="ltr">
              <span className="text-3xl font-bold tracking-tight text-zinc-50">
                $199
              </span>
              <span className="mb-1 flex items-center gap-1 text-xs text-zinc-400">
                <UsersIcon className="size-3" aria-hidden />
                / seat / mo
              </span>
            </div>

            <ul className="mt-4 space-y-1.5">
              {FEATURES.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <CircleCheckIcon
                    className="size-3.5 shrink-0"
                    style={{ color: ACCENT }}
                    aria-hidden
                  />
                  <span className="text-[11.5px] font-medium text-zinc-300">
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
                boxShadow: `0 4px 14px color-mix(in srgb, ${ACCENT} 40%, transparent)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ACCENT
              }}
            >
              <div className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full rtl:translate-x-full rtl:group-hover/btn:-translate-x-full" />
              <span className="relative z-10">Talk to sales</span>
              <ArrowRightIcon className="icon-dir relative z-10 size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
            </a>
          </div>
        </div>
      </MeteorBorder>
      <OfferCardEffectsStyle />
    </div>
  )
}
