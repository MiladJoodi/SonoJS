"use client"

import type { CSSProperties, MouseEvent, ReactNode } from "react"
import {
  ArrowRightIcon,
  CircleCheckIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import {
  MeteorBorder,
  OfferCardEffectsStyle,
} from "../_lib/meteor-border"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"
import avatar5 from "./images/avatar-5.webp"

const ACCENT = "#173eff"
const ACCENT_HOVER = "#3758f9"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const AVATARS = [avatar1, avatar2, avatar3, avatar4, avatar5].map(assetSrc)

const FEATURES = [
  "559+ premium blocks",
  "404+ components",
  "6 ready templates",
  "Lifetime updates",
]

export type OfferCardProps = {
  className?: string
  speed?: number
  meteorColor?: string
  accentHover?: string
  borderWidth?: number
  borderRadius?: number
  badge?: string
  eyebrow?: string
  headlineItalic?: string
  headlinePrefix?: string
  productName?: string
  description?: ReactNode
  features?: string[]
  price?: string
  compareAt?: string
  tier?: string
  ctaLabel?: string
  ctaHref?: string
  /** When set, CTA renders as a button (e.g. open auth dialog) instead of a link. */
  onCtaClick?: () => void
  avatars?: string[]
  trustLead?: string
  trustHighlight?: string
  trustTrail?: string
}

/** Classic limited-offer upsell — default meteor speed 0.9. */
export default function OfferCard({
  className,
  speed = 0.9,
  meteorColor = ACCENT,
  accentHover = ACCENT_HOVER,
  borderWidth = 1.5,
  borderRadius = 16,
  badge = "Limited Offer",
  eyebrow = "Ship",
  headlineItalic = "Faster",
  headlinePrefix = "with",
  productName = "SonoJS Pro",
  description,
  features = FEATURES,
  price = "$89",
  compareAt = "$149",
  tier = "STARTER",
  ctaLabel = "Get Lifetime Access",
  ctaHref = "#",
  onCtaClick,
  avatars = AVATARS,
  trustLead = "Trusted by",
  trustHighlight = "millions",
  trustTrail = "of devs",
}: OfferCardProps) {
  const accent = meteorColor
  const innerRadius = Math.max(0, borderRadius - borderWidth)

  return (
    <div
      className={cn("relative w-full max-w-[300px] overflow-hidden", className)}
      style={
        {
          "--offer-accent": accent,
          "--offer-accent-hover": accentHover,
          borderRadius,
        } as CSSProperties
      }
    >
      <MeteorBorder
        meteorColor={accent}
        speed={speed}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
      >
        <div
          className="relative overflow-hidden border border-border/70 bg-card"
          style={{ borderRadius: innerRadius }}
        >
          <div
            className="offer-pulse-glow absolute -end-6 -top-6 size-24 rounded-full blur-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
            }}
          />
          <div
            className="offer-pulse-glow absolute -bottom-4 -start-4 size-16 rounded-full blur-xl"
            style={{
              animationDelay: "1.2s",
              backgroundColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
            }}
          />

          <div className="relative z-10 p-4 text-start">
            <div className="mb-3 flex items-center gap-1.5">
              <div
                className="flex items-center gap-1 rounded-full border px-2.5 py-0.5"
                style={{
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${accent} 20%, transparent)`,
                }}
              >
                <ZapIcon
                  className="size-2.5 shrink-0"
                  style={{ color: accent }}
                  aria-hidden
                />
                <span
                  className="text-[9px] font-bold tracking-widest uppercase"
                  style={{ color: accent }}
                >
                  {badge}
                </span>
              </div>
            </div>

            <div className="mb-1">
              <p className="text-[11px] font-medium text-muted-foreground">
                {eyebrow}
              </p>
              <h3 className="text-base font-extrabold leading-tight tracking-tight text-foreground">
                <span className="italic">{headlineItalic}</span>{" "}
                {headlinePrefix}{" "}
                <span className="offer-badge-shine font-black">
                  {productName}
                </span>
              </h3>
            </div>

            <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
              {description ?? (
                <>
                  Stop building from scratch. Get{" "}
                  <span className="font-semibold text-foreground">premium</span>{" "}
                  components &amp; blocks your users will{" "}
                  <span className="font-semibold text-foreground">love</span>.
                </>
              )}
            </p>

            <ul className="mb-4 space-y-1.5">
              {features.map((label) => (
                <li key={label} className="flex items-center gap-2">
                  <CircleCheckIcon
                    className="size-3.5 shrink-0"
                    style={{ color: accent }}
                    aria-hidden
                  />
                  <span className="min-w-0 text-[11.5px] font-medium text-muted-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3.5 py-2"
              style={{
                background: `linear-gradient(to inline-end, color-mix(in srgb, ${accent} 6%, transparent), color-mix(in srgb, ${accent} 2%, transparent))`,
                borderColor: `color-mix(in srgb, ${accent} 15%, transparent)`,
              }}
            >
              <div className="flex items-baseline gap-1.5" dir="ltr">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  {price}
                </span>
                {compareAt ? (
                  <span className="text-xs text-muted-foreground line-through">
                    {compareAt}
                  </span>
                ) : null}
              </div>
              <span
                className="rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase"
                style={{
                  color: accent,
                  backgroundColor: `color-mix(in srgb, ${accent} 10%, transparent)`,
                  borderColor: `color-mix(in srgb, ${accent} 20%, transparent)`,
                }}
              >
                {tier}
              </span>
            </div>

            {(() => {
              const ctaClassName =
                "group/btn relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-md transition-all hover:shadow-lg"
              const ctaStyle = {
                backgroundColor: accent,
                boxShadow: `0 4px 14px color-mix(in srgb, ${accent} 35%, transparent)`,
              } as const
              const ctaHover = {
                onMouseEnter: (
                  e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
                ) => {
                  e.currentTarget.style.backgroundColor = accentHover
                },
                onMouseLeave: (
                  e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>
                ) => {
                  e.currentTarget.style.backgroundColor = accent
                },
              }
              const ctaInner = (
                <>
                  <div className="absolute inset-0 -translate-x-full rounded-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full rtl:translate-x-full rtl:group-hover/btn:-translate-x-full" />
                  <span className="relative z-10 font-bold">{ctaLabel}</span>
                  <ArrowRightIcon className="icon-dir relative z-10 size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                </>
              )
              if (onCtaClick) {
                return (
                  <button
                    type="button"
                    className={ctaClassName}
                    style={ctaStyle}
                    onClick={onCtaClick}
                    {...ctaHover}
                  >
                    {ctaInner}
                  </button>
                )
              }
              return (
                <a
                  href={ctaHref}
                  className={ctaClassName}
                  style={ctaStyle}
                  {...ctaHover}
                >
                  {ctaInner}
                </a>
              )
            })()}

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
              <div className="flex shrink-0 -space-x-1.5 rtl:space-x-reverse">
                {avatars.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    alt=""
                    className="size-5 rounded-full border-[1.5px] border-card bg-muted object-cover"
                    src={src}
                  />
                ))}
              </div>
              <div className="flex min-w-0 items-center gap-0.5">
                <StarIcon className="size-2.5 shrink-0 fill-amber-400 text-amber-400" />
                <span className="text-[9px] font-medium text-muted-foreground">
                  {trustLead}{" "}
                  <span className="font-bold text-foreground">
                    {trustHighlight}
                  </span>{" "}
                  {trustTrail}
                </span>
              </div>
            </div>
          </div>
        </div>
      </MeteorBorder>
      <OfferCardEffectsStyle />
    </div>
  )
}
