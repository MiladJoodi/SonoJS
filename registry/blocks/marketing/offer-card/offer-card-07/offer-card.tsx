"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import { FloatingStars } from "./floating-stars"

function Offer07EffectsStyle() {
  return (
    <style>{`
@keyframes offer07-float-stars {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-40px) translateX(40px); }
  100% { transform: translateY(0) translateX(0); }
}
@keyframes offer07-float-stars-reverse {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(40px) translateX(-40px); }
  100% { transform: translateY(0) translateX(0); }
}
.offer07-float-stars {
  animation: offer07-float-stars 12s ease-in-out infinite;
}
.offer07-float-stars-reverse {
  animation: offer07-float-stars-reverse 15s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .offer07-float-stars,
  .offer07-float-stars-reverse {
    animation: none !important;
  }
}
`}</style>
  )
}

function SonoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24.9 28"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M22.5 19.8 12.8 26.3c-1.3.9-2.4.3-2.4-1.3v-8.5c0-1.6 1.1-3.6 2.4-4.5l9.7-6.5c1.3-.9 2.4-.3 2.4 1.3v8.5c0 1.6-1.1 3.6-2.4 4.5Z"
        fill="#2563EB"
      />
      <path
        d="m12.3 15.9-9.7 6.5c-1.3.9-2.4.3-2.4-1.3v-8.5c0-1.6 1.1-3.6 2.4-4.5l9.7-6.5c1.3-.9 2.4-.3 2.4 1.3v8.5c0 1.6-1.1 3.6-2.4 4.5Z"
        fill="#2563EB"
        opacity=".4"
      />
    </svg>
  )
}

function HeroBackdrop() {
  return (
    <>
      {/* Light: pastel wash + violet/cyan core (top-right) */}
      <div
        aria-hidden
        className="absolute inset-0 dark:hidden"
        style={{
          background: [
            "radial-gradient(ellipse 95% 85% at 90% 8%, rgba(115,0,255,0.5) 0%, rgba(93,208,231,0.32) 38%, transparent 70%)",
            "linear-gradient(180deg, #E9E9FF 0%, #CCE5F1 100%)",
          ].join(", "),
        }}
      />
      {/* Dark: navy field so white stars + mark read cleanly */}
      <div
        aria-hidden
        className="absolute inset-0 hidden dark:block"
        style={{
          background: [
            "radial-gradient(ellipse 95% 85% at 90% 8%, rgba(115,0,255,0.72) 0%, rgba(93,208,231,0.34) 40%, transparent 72%)",
            "linear-gradient(180deg, #2A3A62 0%, #1A2440 48%, #12192E 100%)",
          ].join(", "),
        }}
      />
    </>
  )
}

export type OfferCardProps = {
  className?: string
  title?: string
  description?: string
  label?: string
  ctaLabel?: string
  closeLabel?: string
  href?: string
  /** Controlled open state. When omitted, card manages dismiss internally. */
  open?: boolean
  onClose?: () => void
}

/**
 * Floating corner Pro promo - pastel hero, star field, SonoJS mark,
 * dismiss + CTA. Root is in-flow; wrap with `fixed start-6 bottom-6 z-50` in apps.
 */
export default function OfferCard({
  className,
  title = "Build faster with SonoJS Pro",
  description = "Components, blocks, charts, and tools for React. Made for teams that care about the details. Install once and reuse across every product.",
  label = "Now available",
  ctaLabel = "Explore Pro",
  closeLabel = "Close",
  href = "#",
  open,
  onClose,
}: OfferCardProps) {
  const [internalOpen, setInternalOpen] = React.useState(true)
  const visible = open ?? internalOpen

  const handleDismiss = (event?: React.MouseEvent) => {
    event?.preventDefault()
    // Docs / demos often pass `open` to keep the card mounted; only hide
    // when uncontrolled, and always forward onClose for real apps.
    if (open === undefined) setInternalOpen(false)
    onClose?.()
  }

  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Preview-safe default (`href="#"`) — no navigation / hash jump.
    if (!href || href === "#") event.preventDefault()
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        // Inline width: arbitrary w-[258px] is not always emitted into the docs CSS graph.
        "relative min-w-0 shrink-0 overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-xl dark:border-white/12 dark:bg-[#141820] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65)]",
        className
      )}
      style={{ width: 292, maxWidth: 292 }}
    >
      <div className="relative flex h-[200px] flex-col items-center justify-center gap-2 overflow-hidden px-4 py-6">
        <HeroBackdrop />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50">
            <FloatingStars />
          </div>
        </div>
        <div className="relative flex items-center gap-2.5">
          <SonoMark className="h-8 w-auto drop-shadow-sm dark:brightness-110" />
          <span className="text-2xl font-semibold tracking-tight text-[#2563EB] dark:text-white">
            SonoJS
          </span>
        </div>
        <span className="relative text-xs font-medium text-[#4E75A5] dark:text-sky-200/75">
          {label}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Close"
        className="absolute end-2 top-2 text-[#4E75A5]/80 hover:bg-black/5 hover:text-[#1e3a5f] dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white"
        onClick={handleDismiss}
      >
        <XIcon className="size-4" aria-hidden />
      </Button>

      <div className="flex flex-col gap-3 p-4 text-start">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex w-full min-w-0 items-center gap-2 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={handleDismiss}
          >
            {closeLabel}
          </Button>
          <Button asChild size="sm" className="min-w-0 flex-1">
            <a href={href} onClick={handleCtaClick}>
              {ctaLabel}
            </a>
          </Button>
        </div>
      </div>

      <Offer07EffectsStyle />
    </div>
  )
}
