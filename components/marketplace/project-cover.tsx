"use client"

import * as React from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

import type { MarketplaceCoverVariant } from "@/lib/marketplace-catalog"
import { cn } from "@/lib/utils"

function CoverChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-[6%] top-[10%] bottom-[12%] overflow-hidden rounded-lg border border-white/25 bg-white/12 shadow-soft backdrop-blur-[2px] dark:border-white/15 dark:bg-black/25">
      <div className="flex h-6 items-center gap-1.5 border-b border-white/15 px-2.5 sm:h-7 sm:px-3">
        <span className="size-1.5 rounded-full bg-red-400/80" />
        <span className="size-1.5 rounded-full bg-amber-400/80" />
        <span className="size-1.5 rounded-full bg-emerald-400/70" />
        <span className="ms-2 h-1.5 w-[28%] max-w-24 rounded-full bg-white/25" />
      </div>
      <div className="h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)]">{children}</div>
    </div>
  )
}

function VariantUi({
  variant,
  hue,
}: {
  variant: MarketplaceCoverVariant
  hue: number
}) {
  const accent = `hsl(${hue} 70% 62%)`

  if (variant === "dashboard" || variant === "saas") {
    return (
      <div className="flex h-full">
        <div className="flex w-[18%] flex-col gap-1 border-e border-white/10 bg-black/20 p-1.5 sm:p-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-sm bg-white/20 sm:h-2",
                i === 1 && "bg-white/45"
              )}
              style={i === 1 ? { backgroundColor: accent, opacity: 0.85 } : undefined}
            />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-1.5 sm:gap-2 sm:p-2">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-5 rounded-md bg-white/15 sm:h-7"
                style={
                  i === 0
                    ? { backgroundColor: accent, opacity: 0.35 }
                    : undefined
                }
              />
            ))}
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-md bg-white/10 p-1.5 sm:p-2">
            <svg
              viewBox="0 0 120 48"
              className="h-full w-full opacity-90"
              preserveAspectRatio="none"
              aria-hidden
            >
              <polyline
                fill="none"
                stroke={accent}
                strokeWidth="2"
                strokeLinecap="round"
                points="0,36 18,28 36,32 54,18 72,22 90,10 120,14"
              />
              <polyline
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
                points="0,40 20,34 40,38 60,26 80,30 100,20 120,24"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "landing") {
    return (
      <div className="flex h-full flex-col gap-1.5 p-2 sm:gap-2 sm:p-3">
        <div className="mx-auto h-1.5 w-1/3 rounded-full bg-white/30" />
        <div className="mx-auto h-2 w-2/3 rounded-full bg-white/50 sm:h-2.5" />
        <div className="mx-auto h-1.5 w-1/2 rounded-full bg-white/25" />
        <div className="mx-auto mt-1 flex gap-1.5">
          <div
            className="h-4 w-12 rounded-md sm:h-5 sm:w-14"
            style={{ backgroundColor: accent, opacity: 0.9 }}
          />
          <div className="h-4 w-12 rounded-md bg-white/25 sm:h-5 sm:w-14" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-1 sm:gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 rounded-md bg-white/15 sm:h-10" />
          ))}
        </div>
      </div>
    )
  }

  if (variant === "auth") {
    return (
      <div className="flex h-full items-center justify-center p-2 sm:p-3">
        <div className="w-[55%] max-w-[140px] space-y-1.5 rounded-lg border border-white/20 bg-black/25 p-2 sm:space-y-2 sm:p-2.5">
          <div className="mx-auto h-1.5 w-1/2 rounded-full bg-white/40" />
          <div className="h-3 rounded-md bg-white/15 sm:h-3.5" />
          <div className="h-3 rounded-md bg-white/15 sm:h-3.5" />
          <div
            className="h-4 rounded-md sm:h-5"
            style={{ backgroundColor: accent, opacity: 0.9 }}
          />
          <div className="mx-auto h-1 w-2/3 rounded-full bg-white/20" />
        </div>
      </div>
    )
  }

  if (variant === "shop") {
    return (
      <div className="grid h-full grid-cols-3 gap-1 p-1.5 sm:gap-1.5 sm:p-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-1 overflow-hidden rounded-md bg-white/12 p-1"
          >
            <div
              className="min-h-0 flex-1 rounded-sm bg-white/20"
              style={
                i === 1
                  ? { backgroundColor: accent, opacity: 0.45 }
                  : undefined
              }
            />
            <div className="h-1 rounded-full bg-white/30" />
            <div className="h-1 w-1/2 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    )
  }

  // ai
  return (
    <div className="flex h-full flex-col gap-1.5 p-2 sm:p-2.5">
      <div className="ms-0 max-w-[70%] space-y-1 rounded-lg rounded-ss-sm bg-white/15 p-1.5">
        <div className="h-1 w-full rounded-full bg-white/35" />
        <div className="h-1 w-[80%] rounded-full bg-white/25" />
      </div>
      <div
        className="ms-auto max-w-[65%] space-y-1 rounded-lg rounded-se-sm p-1.5"
        style={{ backgroundColor: accent, opacity: 0.35 }}
      >
        <div className="h-1 w-full rounded-full bg-white/50" />
        <div className="h-1 w-[60%] rounded-full bg-white/35" />
      </div>
      <div className="ms-0 max-w-[55%] rounded-lg rounded-ss-sm bg-white/12 p-1.5">
        <div className="h-1 w-full rounded-full bg-white/30" />
      </div>
      <div className="mt-auto flex items-center gap-1 rounded-md border border-white/15 bg-black/20 p-1">
        <div className="h-2.5 flex-1 rounded-sm bg-white/15" />
        <div
          className="size-3 shrink-0 rounded-sm sm:size-3.5"
          style={{ backgroundColor: accent, opacity: 0.9 }}
        />
      </div>
    </div>
  )
}

/** Living UI-mock cover — or real screenshot when `imageSrc` is set. */
export function ProjectCover({
  hue,
  title,
  variant = "dashboard",
  className,
  compact,
  interactive,
  imageSrc,
  imageSrcDark,
}: {
  hue: number
  title: string
  variant?: MarketplaceCoverVariant
  className?: string
  compact?: boolean
  /** Light parallax on hover when true */
  interactive?: boolean
  /** Real screenshot under /public (light / default) */
  imageSrc?: string | null
  /** Optional dark-mode screenshot */
  imageSrcDark?: string | null
}) {
  const { resolvedTheme } = useTheme()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const layerRef = React.useRef<HTMLDivElement>(null)
  const effectiveHue = hue % 360
  const [imgFailed, setImgFailed] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const resolvedImageSrc =
    mounted && resolvedTheme === "dark" && imageSrcDark
      ? imageSrcDark
      : imageSrc
  const showImage = Boolean(resolvedImageSrc) && !imgFailed

  React.useEffect(() => {
    setImgFailed(false)
  }, [resolvedImageSrc])

  const onMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !layerRef.current || !rootRef.current) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
      const rect = rootRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      layerRef.current.style.transform = `translate3d(${x * 8}px, ${y * 6}px, 0) scale(1.03)`
    },
    [interactive]
  )

  const onLeave = React.useCallback(() => {
    if (!layerRef.current) return
    layerRef.current.style.transform = "translate3d(0,0,0) scale(1)"
  }, [])

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative overflow-hidden rounded-[12px] border border-border/60",
        compact ? "aspect-[16/10]" : "aspect-[16/11]",
        interactive && "cursor-default",
        className
      )}
      style={
        showImage
          ? { background: "var(--card)" }
          : {
              background: `
          radial-gradient(
            ellipse 80% 60% at 20% 10%,
            hsl(${effectiveHue} 70% 55% / 0.45),
            transparent 55%
          ),
          linear-gradient(
            155deg,
            hsl(${effectiveHue} 48% 22%) 0%,
            hsl(${(effectiveHue + 28) % 360} 42% 14%) 55%,
            hsl(${(effectiveHue + 55) % 360} 38% 10%) 100%
          )
        `,
            }
      }
      onMouseMove={interactive ? onMove : undefined}
      onMouseLeave={interactive ? onLeave : undefined}
      aria-hidden
    >
      {showImage && resolvedImageSrc ? (
        <div
          ref={layerRef}
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
        >
          <Image
            src={resolvedImageSrc}
            alt=""
            fill
            unoptimized
            className="object-cover object-top"
            sizes={
              compact
                ? "120px"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
            }
            onError={() => setImgFailed(true)}
          />
        </div>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 85% 15%, hsl(${effectiveHue} 80% 65% / 0.35), transparent 40%)`,
            }}
          />
          <div
            ref={layerRef}
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform motion-reduce:transition-none"
          >
            <CoverChrome>
              <VariantUi variant={variant} hue={effectiveHue} />
            </CoverChrome>
          </div>
        </>
      )}
      <span className="sr-only">{title} preview</span>
    </div>
  )
}
