"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_STYLISH_CAROUSEL_ITEMS,
  type StylishCarouselItem,
} from "./items"

export { DEFAULT_STYLISH_CAROUSEL_ITEMS } from "./items"
export type { StylishCarouselItem }

export type StylishCarouselProps = {
  /** Slides to display. Defaults to bundled demo images. */
  items?: StylishCarouselItem[]
  /** Starting active index (0-based). */
  initialIndex?: number
  /** Slide size (CSS length or clamp). */
  slideSize?: string
  /** Rotation (degrees) per offset from center. */
  rotationDegrees?: number
  /** Scale of inactive slides (0–1). */
  inactiveScale?: number
  /** Y-offset multiplier for the fan-out. */
  yOffsetPercent?: number
  /** Spring bounce (0–1). */
  springBounce?: number
  /** Spring duration in seconds. */
  springDuration?: number
  /** Show prev / next arrows. */
  showArrows?: boolean
  /** Show dot indicators. */
  showDots?: boolean
  /** Click inactive slides to navigate. */
  clickToNavigate?: boolean
  /** Auto-advance interval in ms. `0` disables. */
  autoPlay?: number
  className?: string
  onIndexChange?: (index: number) => void
  /** Border radius of each slide. */
  borderRadius?: string
  /** Extra classes on arrow buttons. */
  arrowClassName?: string
}

/**
 * Lookbook fan carousel - polaroid frames, soft ground shadow, spring physics.
 */
export function StylishCarousel({
  items = DEFAULT_STYLISH_CAROUSEL_ITEMS,
  initialIndex = 0,
  slideSize = "clamp(160px, 42vmin, 340px)",
  rotationDegrees = 24,
  inactiveScale = 0.68,
  yOffsetPercent = 42,
  springBounce = 0.18,
  springDuration = 0.85,
  showArrows = true,
  showDots = true,
  clickToNavigate = true,
  autoPlay = 0,
  className,
  onIndexChange,
  borderRadius = "10px",
  arrowClassName,
}: StylishCarouselProps) {
  const clampedInitial = Math.max(
    0,
    Math.min(initialIndex, Math.max(0, items.length - 1))
  )
  const [activeIndex, setActiveIndex] = React.useState(clampedInitial)
  const autoPlayRef = React.useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = React.useRef<number | null>(null)

  const goTo = React.useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, items.length - 1))
      setActiveIndex(clamped)
      onIndexChange?.(clamped)
    },
    [items.length, onIndexChange]
  )

  const toPrev = React.useCallback(
    () => goTo(activeIndex - 1),
    [activeIndex, goTo]
  )

  const toNext = React.useCallback(
    () => goTo(activeIndex + 1),
    [activeIndex, goTo]
  )

  const rootRef = React.useRef<HTMLDivElement>(null)
  const touchStartY = React.useRef<number | null>(null)
  const axisLock = React.useRef<"x" | "y" | null>(null)
  const [isNarrow, setIsNarrow] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)")
    const onChange = () => setIsNarrow(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const root = rootRef.current
      if (!root) return
      if (
        document.activeElement !== root &&
        !root.contains(document.activeElement)
      ) {
        return
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        toPrev()
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        toNext()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [toPrev, toNext])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
    touchStartY.current = e.touches[0]?.clientY ?? null
    axisLock.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      touchStartX.current == null ||
      touchStartY.current == null ||
      axisLock.current
    ) {
      return
    }
    const x = e.touches[0]?.clientX
    const y = e.touches[0]?.clientY
    if (x == null || y == null) return
    const dx = Math.abs(x - touchStartX.current)
    const dy = Math.abs(y - touchStartY.current)
    if (dx < 8 && dy < 8) return
    axisLock.current = dx > dy ? "x" : "y"
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const endX = e.changedTouches[0]?.clientX
    if (endX === undefined || axisLock.current !== "x") {
      touchStartX.current = null
      touchStartY.current = null
      axisLock.current = null
      return
    }
    const delta = touchStartX.current - endX
    if (Math.abs(delta) > 40) {
      if (delta > 0) toNext()
      else toPrev()
    }
    touchStartX.current = null
    touchStartY.current = null
    axisLock.current = null
  }

  const fitRotation = isNarrow
    ? Math.min(rotationDegrees, 16)
    : rotationDegrees
  const fitYOffset = isNarrow ? Math.min(yOffsetPercent, 28) : yOffsetPercent
  const fitInactiveScale = isNarrow
    ? Math.max(inactiveScale, 0.78)
    : inactiveScale

  React.useEffect(() => {
    if (!autoPlay) return
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1 >= items.length ? 0 : prev + 1
        onIndexChange?.(next)
        return next
      })
    }, autoPlay)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [autoPlay, items.length, onIndexChange])

  const spring = {
    type: "spring" as const,
    bounce: springBounce,
    duration: springDuration,
  }

  const active = items[activeIndex]

  if (!items.length) return null

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex w-full max-w-full select-none flex-col items-center overflow-x-clip px-2",
        className
      )}
      style={{ touchAction: "pan-y" }}
      tabIndex={0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      aria-label="Stylish lookbook carousel"
      role="region"
    >
      <div
        style={{ width: slideSize, aspectRatio: "1 / 1" }}
        className="relative mt-8 mb-2 sm:mt-10"
      >
        {/* Soft ground shadow under the active frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-8 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-[100%] bg-foreground/15 blur-xl dark:bg-foreground/25"
        />

        <motion.div
          className="flex w-fit"
          animate={{ x: `${(-activeIndex * 100) / items.length}%` }}
          transition={spring}
        >
          {items.map((item, i) => {
            const offset = i - activeIndex
            const isActive = offset === 0
            const abs = Math.abs(offset)

            return (
              <motion.div
                key={`${item.src}-${i}`}
                style={{ width: slideSize, aspectRatio: "1 / 1" }}
                className="flex shrink-0 flex-col items-center will-change-transform"
                animate={{
                  rotate: offset * fitRotation,
                  scale: isActive ? 1 : fitInactiveScale,
                  y: `${offset * fitYOffset}%`,
                  filter: abs > 1 ? "blur(1.5px)" : "blur(0px)",
                }}
                transition={spring}
              >
                <div
                  className={cn(
                    "relative flex h-full w-full flex-col overflow-hidden bg-card shadow-soft",
                    "border border-border/70 p-2 pb-10"
                  )}
                  style={{ borderRadius }}
                >
                  <div
                    className="relative min-h-0 flex-1 overflow-hidden"
                    style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt ?? item.title ?? `Slide ${i + 1}`}
                      draggable={false}
                      onClick={() => {
                        if (clickToNavigate) goTo(i)
                      }}
                      className={cn(
                        "size-full object-cover transition-[filter,transform] duration-500",
                        !isActive && "brightness-[0.72] saturate-75",
                        isActive && "scale-[1.02]",
                        clickToNavigate && !isActive && "cursor-pointer"
                      )}
                      loading="lazy"
                    />
                    {isActive ? (
                      <motion.div
                        layoutId="stylish-carousel-rim"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          boxShadow:
                            "inset 0 0 0 1px color-mix(in oklab, var(--foreground) 18%, transparent)",
                          borderRadius: `calc(${borderRadius} - 2px)`,
                        }}
                        transition={spring}
                      />
                    ) : null}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-center px-2">
                    <span className="truncate text-[11px] font-medium tracking-wide text-muted-foreground">
                      {item.title ?? `Look ${i + 1}`}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {active?.title ? (
          <motion.p
            key={active.src}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="mt-10 text-sm font-semibold tracking-tight text-foreground"
          >
            {active.title}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="mt-5 flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full border border-border/70 bg-card/85 px-1.5 py-1.5 shadow-soft backdrop-blur-md sm:gap-2 sm:px-2.5">
        {showArrows ? (
          <button
            type="button"
            aria-label="Previous slide"
            onClick={toPrev}
            disabled={activeIndex === 0}
            className={cn(
              "flex size-[46px] cursor-pointer items-center justify-center rounded-full transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30",
              arrowClassName
            )}
          >
            <ChevronLeftIcon className="icon-dir size-4 text-foreground/80" />
          </button>
        ) : null}

        {showDots ? (
          <div className="flex max-w-[min(100%,220px)] flex-wrap items-center justify-center px-1">
            {items.map((item, i) => (
              <button
                key={`${item.src}-dot-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={activeIndex === i ? "true" : undefined}
                onClick={() => goTo(i)}
                className="flex h-11 min-w-8 cursor-pointer items-center justify-center"
              >
                <motion.span
                  className="block h-1.5 rounded-full bg-foreground"
                  animate={{
                    width: activeIndex === i ? 20 : 6,
                    opacity: activeIndex === i ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
                />
              </button>
            ))}
          </div>
        ) : null}

        {showArrows ? (
          <button
            type="button"
            aria-label="Next slide"
            onClick={toNext}
            disabled={activeIndex === items.length - 1}
            className={cn(
              "flex size-[46px] cursor-pointer items-center justify-center rounded-full transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30",
              arrowClassName
            )}
          >
            <ChevronRightIcon className="icon-dir size-4 text-foreground/80" />
          </button>
        ) : null}
      </div>

      <p className="mt-3 font-mono text-[11px] tracking-wider text-muted-foreground tabular-nums">
        {String(activeIndex + 1).padStart(2, "0")}
        <span className="mx-1 text-muted-foreground/50">/</span>
        {String(items.length).padStart(2, "0")}
      </p>
    </div>
  )
}

export default StylishCarousel
