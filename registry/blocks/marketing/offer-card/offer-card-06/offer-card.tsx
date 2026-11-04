"use client"

import type { CSSProperties, ReactNode } from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const AURORA_COLORS = [
  "#FF66CC",
  "#FFDC18",
  "#41FFD7",
  "#38bdf8",
  "#8338EC",
  "#F72585",
  "#3A86FF",
]

const FEATURES = [
  "Next.js + TypeScript ready",
  "Copy, paste, customize in minutes",
  "Save 100+ hours of development",
]

function PingDot() {
  return (
    <div className="relative inline-flex" aria-hidden>
      <span className="absolute size-2 animate-ping rounded-full bg-emerald-500 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </div>
  )
}

function LineShadowText({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <span
      data-text={children}
      className={cn(
        "offer06-line-shadow relative z-0 inline-flex font-bold tracking-tighter italic",
        "after:absolute after:inset-s-[0.04em] after:top-[0.04em] after:-z-10 after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--offer06-shadow)_45%,var(--offer06-shadow)_55%,transparent_0)]",
        "after:bg-size-[0.06em_0.06em] after:bg-clip-text after:text-transparent",
        className
      )}
    >
      {children}
    </span>
  )
}

function AuroraText({
  children,
  className,
  colors = AURORA_COLORS,
}: {
  children: ReactNode
  className?: string
  colors?: string[]
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden
        className="offer06-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animationDuration: "10s",
        }}
      >
        {children}
      </span>
    </span>
  )
}

function Offer06EffectsStyle() {
  return (
    <style>{`
@keyframes offer06-aurora {
  0% { background-position: 0% 50%; transform: rotate(-5deg) scale(0.9); }
  25% { background-position: 50% 100%; transform: rotate(5deg) scale(1.1); }
  50% { background-position: 100% 50%; transform: rotate(-3deg) scale(0.95); }
  75% { background-position: 50% 0%; transform: rotate(3deg) scale(1.05); }
  100% { background-position: 0% 50%; transform: rotate(-5deg) scale(0.9); }
}
@keyframes offer06-line-shadow {
  0% { background-position: 0 0; }
  100% { background-position: 100% -100%; }
}
.offer06-aurora {
  animation-name: offer06-aurora;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.offer06-line-shadow::after {
  animation: offer06-line-shadow 15s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .offer06-aurora,
  .offer06-line-shadow::after {
    animation: none !important;
  }
}
`}</style>
  )
}

export type OfferCardProps = {
  className?: string
  badge?: string
  headlineLead?: string
  headlineItalic?: string
  headlineMid?: string
  productName?: string
  description?: ReactNode
  features?: string[]
  price?: string
  priceNote?: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  trustLead?: string
  trustHighlight?: string
}

/**
 * Full-width sidebar-style Pro upsell - green ping badge, line-shadow + aurora
 * headline, checklist, centered lifetime price (no meteor border).
 */
export default function OfferCard({
  className,
  badge = "Limited Time Offer",
  headlineLead = "Ship",
  headlineItalic = "Faster",
  headlineMid = "with",
  productName = "SonoJS Pro",
  description,
  features = FEATURES,
  price = "$89",
  priceNote = "once",
  ctaLabel = "Get Lifetime Access",
  ctaHref = "/pricing",
  onCtaClick,
  trustLead = "Trusted by",
  trustHighlight = "thousands",
}: OfferCardProps) {
  const ctaClassName =
    "inline-flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"

  const ctaInner = (
    <>
      {ctaLabel}
      <ChevronRightIcon className="icon-dir size-4" aria-hidden />
    </>
  )

  return (
    <div
      className={cn(
        "my-0 flex w-full max-w-[280px] flex-col gap-5 rounded-xl border border-border/70 bg-card px-5 py-7 text-start",
        className
      )}
      style={
        {
          "--offer06-shadow": "currentColor",
        } as CSSProperties
      }
    >
      <div className="flex items-center gap-2">
        <PingDot />
        <span className="text-xs font-semibold tracking-tight text-emerald-500 uppercase">
          {badge}
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-2xl leading-tight font-bold text-foreground">
          {headlineLead}{" "}
          <LineShadowText>{headlineItalic}</LineShadowText> {headlineMid}{" "}
          <AuroraText>{productName}</AuroraText>
        </p>
        <p className="text-sm leading-relaxed font-medium text-muted-foreground">
          {description ?? (
            <>
              Stop building from scratch. <br />
              Get{" "}
              <span className="font-semibold text-foreground">
                production-ready templates
              </span>{" "}
              and{" "}
              <span className="font-semibold text-foreground">
                premium components
              </span>{" "}
              that your users will love.
            </>
          )}
        </p>
      </div>

      <div className="space-y-2.5 font-medium">
        {features.map((label) => (
          <div
            key={label}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <div className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-foreground">
              <CheckIcon
                className="size-2.5 stroke-3 text-primary-foreground"
                aria-hidden
              />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-baseline justify-center gap-2" dir="ltr">
          <span className="text-3xl font-bold text-foreground">{price}</span>
          <span className="text-sm font-medium text-muted-foreground">
            {priceNote}
          </span>
        </div>

        {onCtaClick ? (
          <button
            type="button"
            className={ctaClassName}
            onClick={onCtaClick}
          >
            {ctaInner}
          </button>
        ) : (
          <a href={ctaHref} className={ctaClassName}>
            {ctaInner}
          </a>
        )}

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {trustLead}{" "}
            <span className="font-semibold">{trustHighlight}</span> developers
          </p>
        </div>
      </div>

      <Offer06EffectsStyle />
    </div>
  )
}
