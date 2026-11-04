"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_3D_CAROUSEL_ITEMS,
  type ThreeDCarouselItem,
} from "./items"

export { DEFAULT_3D_CAROUSEL_ITEMS } from "./items"
export type { ThreeDCarouselItem }

const MOBILE_BREAKPOINT = 768

function useIsMobileViewport() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

export type ThreeDCarouselProps = {
  /** Card items in the stack. Defaults to bundled demo images. */
  items?: ThreeDCarouselItem[]
  /** Advance automatically while the stage is in view and not hovered. */
  autoRotate?: boolean
  /** Milliseconds between auto-rotations. */
  rotateInterval?: number
  /** Height of each card in pixels. */
  cardHeight?: number
  /** Enable swipe navigation on touch devices. */
  isMobileSwipe?: boolean
  className?: string
}

type StackRole = "active" | "next" | "prev" | "hidden"

function stackRole(index: number, active: number, length: number): StackRole {
  if (index === active) return "active"
  if (index === (active + 1) % length) return "next"
  if (index === (active - 1 + length) % length) return "prev"
  return "hidden"
}

/**
 * Spotlight product carousel - perspective stack, autoplay scrubber, glass chrome.
 */
export function ThreeDCarousel({
  items = DEFAULT_3D_CAROUSEL_ITEMS,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 520,
  isMobileSwipe = true,
  className,
}: ThreeDCarouselProps) {
  const [active, setActive] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const touchStartX = React.useRef<number | null>(null)
  const touchStartY = React.useRef<number | null>(null)
  const axisLock = React.useRef<"x" | "y" | null>(null)
  const isMobile = useIsMobileViewport()
  const minSwipeDistance = 48
  const count = items.length
  const current = items[active]

  const fitHeight = isMobile ? Math.min(cardHeight, 440) : cardHeight

  const stackMotion: Record<
    StackRole,
    { x: string; rotateY: number; z: number; scale: number; opacity: number }
  > = React.useMemo(
    () => ({
      active: { x: "0%", rotateY: 0, z: 80, scale: 1, opacity: 1 },
      next: {
        x: isMobile ? "18%" : "34%",
        rotateY: isMobile ? -10 : -18,
        z: -40,
        scale: isMobile ? 0.92 : 0.88,
        opacity: isMobile ? 0.4 : 0.55,
      },
      prev: {
        x: isMobile ? "-18%" : "-34%",
        rotateY: isMobile ? 10 : 18,
        z: -40,
        scale: isMobile ? 0.92 : 0.88,
        opacity: isMobile ? 0.4 : 0.55,
      },
      hidden: { x: "0%", rotateY: 0, z: -120, scale: 0.78, opacity: 0 },
    }),
    [isMobile]
  )

  React.useEffect(() => {
    if (!autoRotate || !isInView || isPaused || count < 2) return
    const interval = window.setInterval(() => {
      setActive((prev) => (prev + 1) % count)
    }, rotateInterval)
    return () => window.clearInterval(interval)
  }, [autoRotate, count, isPaused, isInView, rotateInterval])

  React.useEffect(() => {
    const node = carouselRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const onTouchStart = (event: React.TouchEvent) => {
    if (!isMobileSwipe) return
    touchStartX.current = event.targetTouches[0]?.clientX ?? null
    touchStartY.current = event.targetTouches[0]?.clientY ?? null
    axisLock.current = null
    setIsPaused(true)
  }

  const onTouchMove = (event: React.TouchEvent) => {
    if (!isMobileSwipe || touchStartX.current == null || touchStartY.current == null) {
      return
    }
    const x = event.targetTouches[0]?.clientX
    const y = event.targetTouches[0]?.clientY
    if (x == null || y == null) return
    if (!axisLock.current) {
      const dx = Math.abs(x - touchStartX.current)
      const dy = Math.abs(y - touchStartY.current)
      if (dx < 8 && dy < 8) return
      axisLock.current = dx > dy ? "x" : "y"
    }
  }

  const onTouchEnd = (event: React.TouchEvent) => {
    setIsPaused(false)
    if (!isMobileSwipe || touchStartX.current == null || count < 2) {
      touchStartX.current = null
      touchStartY.current = null
      axisLock.current = null
      return
    }
    if (axisLock.current !== "x") {
      touchStartX.current = null
      touchStartY.current = null
      axisLock.current = null
      return
    }
    const endX = event.changedTouches[0]?.clientX
    if (endX == null) return
    const distance = touchStartX.current - endX
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % count)
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + count) % count)
    }
    touchStartX.current = null
    touchStartY.current = null
    axisLock.current = null
  }

  const goPrev = () => {
    if (count < 2) return
    setActive((prev) => (prev - 1 + count) % count)
  }

  const goNext = () => {
    if (count < 2) return
    setActive((prev) => (prev + 1) % count)
  }

  const showProgress = autoRotate && isInView && !isPaused && count > 1

  return (
    <section
      className={cn(
        "flex w-full min-w-0 items-center justify-center overflow-x-clip bg-transparent",
        className
      )}
    >
      <div className="w-full min-w-0 max-w-5xl px-3 sm:px-6">
        <div
          ref={carouselRef}
          className="relative overflow-x-clip overflow-y-visible pt-3 pb-2"
          style={{
            minHeight: fitHeight + (isMobile ? 96 : 72),
            perspective: isMobile ? "900px" : "1400px",
            touchAction: "pan-y",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Product spotlight carousel"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-28 left-1/2 h-32 w-[min(360px,70%)] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25"
          />

          <div
            className="relative mx-auto flex w-full items-center justify-center"
            style={{
              height: fitHeight,
              maxWidth: isMobile ? "100%" : 420,
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((item, index) => {
              const role = stackRole(index, active, count)
              const motionState = stackMotion[role]
              const isActive = role === "active"

              return (
                <motion.article
                  key={item.id}
                  className={cn(
                    "absolute inset-x-0 top-0 mx-auto w-full max-w-md overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
                    role === "hidden" && "pointer-events-none"
                  )}
                  style={{
                    height: fitHeight,
                    transformStyle: "preserve-3d",
                    zIndex: isActive ? 30 : role === "hidden" ? 0 : 10,
                  }}
                  animate={{
                    x: motionState.x,
                    rotateY: motionState.rotateY,
                    z: motionState.z,
                    scale: motionState.scale,
                    opacity: motionState.opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 0.9,
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="relative h-[42%] overflow-hidden sm:h-[46%]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- installable registry demo URLs */}
                    <img
                      src={item.imageUrl}
                      alt=""
                      className={cn(
                        "size-full object-cover transition-transform duration-700",
                        isActive && "scale-105"
                      )}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-black/25" />
                    <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3 sm:p-4">
                      <span className="max-w-[70%] truncate rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md">
                        {item.brand}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-white/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-[58%] flex-col px-4 pt-4 pb-5 sm:h-[54%] sm:px-6 sm:pt-5 sm:pb-6">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border/70 bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.link}
                      className="group relative mt-4 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 self-start text-sm font-medium text-foreground sm:mt-5"
                    >
                      Learn more
                      <ArrowUpRightIcon className="icon-dir size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-start scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {count > 1 ? (
            <div className="relative z-40 mt-6 flex flex-col items-center gap-3 sm:mt-8">
              <div className="flex items-center gap-1 rounded-full border border-border/70 bg-card/90 p-1 shadow-soft backdrop-blur-md">
                <button
                  type="button"
                  className="flex size-[46px] cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted active:scale-95"
                  onClick={goPrev}
                  aria-label="Previous"
                >
                  <ChevronLeftIcon className="icon-dir size-5" />
                </button>

                <div className="flex items-center px-1">
                  {items.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className="flex h-11 min-w-9 cursor-pointer items-center justify-center"
                      onClick={() => setActive(idx)}
                      aria-label={`Go to item ${idx + 1}`}
                      aria-current={active === idx ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-all duration-300",
                          active === idx
                            ? "w-6 bg-foreground"
                            : "w-1.5 bg-muted-foreground/35"
                        )}
                      />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="flex size-[46px] cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted active:scale-95"
                  onClick={goNext}
                  aria-label="Next"
                >
                  <ChevronRightIcon className="icon-dir size-5" />
                </button>
              </div>

              {showProgress ? (
                <div className="h-0.5 w-24 overflow-hidden rounded-full bg-muted sm:w-28">
                  <motion.div
                    key={active}
                    className="h-full origin-start bg-foreground/70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: rotateInterval / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : null}

              <AnimatePresence mode="wait">
                {current ? (
                  <motion.p
                    key={current.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="text-caption text-muted-foreground"
                  >
                    {String(active + 1).padStart(2, "0")} · {current.brand}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default ThreeDCarousel
