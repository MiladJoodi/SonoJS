"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_COOL_SLIDE_GALLERY_SLIDES,
  type CoolSlideGallerySlide,
} from "./slides"

export { DEFAULT_COOL_SLIDE_GALLERY_SLIDES } from "./slides"
export type { CoolSlideGallerySlide }

export type TitlePosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right"
  | "center"

export type EasingPreset = "smooth" | "spring" | "bouncy" | "snappy"

export type CoolSlideGalleryProps = {
  slides?: CoolSlideGallerySlide[]
  cardWidth?: number
  cardHeight?: number
  /** Border radius scale 0–20. */
  radius?: number
  tilt?: number
  sideTilt?: number
  gap?: number
  dimOpacity?: number
  autoplay?: boolean
  autoplayDirection?: "left-to-right" | "right-to-left"
  autoplayDelay?: number
  animationDuration?: number
  easing?: EasingPreset
  showTitle?: boolean
  titlePosition?: TitlePosition
  showArrows?: boolean
  showDots?: boolean
  showCounter?: boolean
  showBadge?: boolean
  clickable?: boolean
  draggable?: boolean
  dragThreshold?: number
  keyboardNavigation?: boolean
  maxVisible?: number
  depth?: number
  scaleStep?: number
  perspective?: number
  className?: string
  onSlideChange?: (index: number, slide: CoolSlideGallerySlide) => void
}

const EASING_MAP: Record<EasingPreset, [number, number, number, number]> = {
  smooth: [0.22, 1, 0.36, 1],
  spring: [0.34, 1.56, 0.64, 1],
  bouncy: [0.5, 1.7, 0.5, 1],
  snappy: [0.16, 1, 0.3, 1],
}

function getTitleStyles(position: TitlePosition): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
  }
  switch (position) {
    case "bottom-left":
      return { ...base, bottom: 0, insetInlineStart: 0, insetInlineEnd: 0 }
    case "bottom-right":
      return {
        ...base,
        bottom: 0,
        insetInlineEnd: 0,
        textAlign: "end",
      }
    case "top-left":
      return { ...base, top: 0, insetInlineStart: 0, insetInlineEnd: 0 }
    case "top-right":
      return {
        ...base,
        top: 0,
        insetInlineEnd: 0,
        textAlign: "end",
      }
    case "center":
      return {
        ...base,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        width: "100%",
      }
    default:
      return { ...base, bottom: 0, insetInlineStart: 0, insetInlineEnd: 0 }
  }
}

function getGradientForPosition(position: TitlePosition): string {
  switch (position) {
    case "top-left":
    case "top-right":
      return "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 58%)"
    case "center":
      return "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)"
    default:
      return "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0) 62%)"
  }
}

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    const measure = () => setWidth(node.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [ref])

  return width
}

/**
 * Museum coverflow gallery - depth stage, floor bloom, rim light, glass controls.
 */
export function CoolSlideGallery({
  slides: slidesProp,
  cardWidth = 380,
  cardHeight = 440,
  radius = 6,
  tilt = 16,
  sideTilt = 5,
  gap = 7.5,
  dimOpacity = 48,
  autoplay = false,
  autoplayDirection = "right-to-left",
  autoplayDelay = 2.8,
  animationDuration = 0.65,
  easing = "smooth",
  showTitle = true,
  titlePosition = "bottom-left",
  showArrows = true,
  showDots = true,
  showCounter = true,
  showBadge = true,
  clickable = true,
  draggable = true,
  dragThreshold = 45,
  keyboardNavigation = true,
  maxVisible = 2,
  depth = 250,
  scaleStep = 0.14,
  perspective = 1600,
  className,
  onSlideChange,
}: CoolSlideGalleryProps) {
  const slides =
    slidesProp && slidesProp.length > 0
      ? slidesProp
      : DEFAULT_COOL_SLIDE_GALLERY_SLIDES
  const n = slides.length

  const [active, setActive] = React.useState(0)
  const lockRef = React.useRef(false)
  const dragStartX = React.useRef(0)
  const dragStartY = React.useRef(0)
  const isDragging = React.useRef(false)
  const axisLock = React.useRef<"x" | "y" | null>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "200px" })
  const stageWidth = useElementWidth(containerRef)

  const isNarrow = stageWidth > 0 && stageWidth < 480
  const fitWidth =
    stageWidth > 0
      ? Math.min(cardWidth, Math.max(220, stageWidth - (isNarrow ? 24 : 48)))
      : Math.min(cardWidth, 320)
  const aspect = cardHeight / cardWidth
  const fitHeight = Math.round(fitWidth * aspect)
  const fitDepth = isNarrow ? Math.min(depth, 140) : depth
  const fitGap = isNarrow ? Math.min(gap, 5.5) : gap
  const fitTilt = isNarrow ? Math.min(tilt, 12) : tilt
  const fitMaxVisible = isNarrow ? Math.min(maxVisible, 1) : maxVisible
  const fitScaleStep = isNarrow ? Math.max(scaleStep, 0.18) : scaleStep

  const lock = React.useCallback(() => {
    lockRef.current = true
    window.setTimeout(() => {
      lockRef.current = false
    }, Math.max(50, animationDuration * 1000))
  }, [animationDuration])

  const step = React.useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current || n < 2) return
      lock()
      setActive((a) => {
        const next = (((a + dir) % n) + n) % n
        onSlideChange?.(next, slides[next]!)
        return next
      })
    },
    [n, lock, onSlideChange, slides]
  )

  const goTo = React.useCallback(
    (i: number) => {
      if (lockRef.current || i === active || i < 0 || i >= n) return
      lock()
      setActive(i)
      onSlideChange?.(i, slides[i]!)
    },
    [active, lock, n, onSlideChange, slides]
  )

  React.useEffect(() => {
    if (!keyboardNavigation) return
    const onKey = (e: KeyboardEvent) => {
      const root = containerRef.current
      if (!root) return
      if (document.activeElement !== root && !root.contains(document.activeElement)) {
        return
      }
      if (e.key === "ArrowRight") {
        e.preventDefault()
        step(1)
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        step(-1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [step, keyboardNavigation])

  React.useEffect(() => {
    if (!autoplay || n < 2 || !isInView) return
    const ms = Math.max(300, autoplayDelay * 1000)
    const dir: 1 | -1 = autoplayDirection === "left-to-right" ? -1 : 1
    const id = window.setInterval(() => step(dir), ms)
    return () => window.clearInterval(id)
  }, [autoplay, autoplayDirection, autoplayDelay, n, step, isInView])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable || lockRef.current) return
    if ((e.target as HTMLElement).closest("[data-gallery-controls]")) return
    isDragging.current = true
    axisLock.current = null
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || axisLock.current) return
    const dx = Math.abs(e.clientX - dragStartX.current)
    const dy = Math.abs(e.clientY - dragStartY.current)
    if (dx < 8 && dy < 8) return
    axisLock.current = dx > dy ? "x" : "y"
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    const axis = axisLock.current
    axisLock.current = null
    if (axis !== "x") return
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > dragThreshold) {
      step(delta > 0 ? -1 : 1)
    }
  }

  const [x1, y1, x2, y2] = EASING_MAP[easing]
  const transition = {
    type: "tween" as const,
    duration: animationDuration,
    ease: [x1, y1, x2, y2] as [number, number, number, number],
  }

  const effectiveRadius =
    (Math.max(0, Math.min(20, radius)) / 20) *
    (Math.min(fitWidth, fitHeight) / 2)
  const dimValue = 1 - Math.max(0, Math.min(100, dimOpacity)) / 100
  const current = slides[active]

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full max-w-full select-none flex-col items-center justify-center overflow-x-clip overflow-y-visible will-change-transform",
        className
      )}
      style={{
        minHeight: fitHeight + (isNarrow ? 150 : 120),
        perspective: `${isNarrow ? Math.min(perspective, 1100) : perspective}px`,
        touchAction: "pan-y",
        cursor: draggable ? "grab" : "default",
      }}
      tabIndex={keyboardNavigation ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cool slide gallery"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-28 left-1/2 h-20 w-[min(420px,70%)] -translate-x-1/2 rounded-[100%] bg-foreground/12 blur-3xl dark:bg-primary/20"
      />

      <div
        style={{
          position: "relative",
          width: fitWidth,
          height: fitHeight,
          maxWidth: "100%",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
        }}
      >
        {slides.map((slide, i) => {
          let rel = i - active
          if (rel > n / 2) rel -= n
          if (rel < -n / 2) rel += n

          const ax = Math.abs(rel)
          const visible = ax <= fitMaxVisible
          const isActive = rel === 0
          const sc = Math.max(0.32, 1 - ax * fitScaleStep)
          const tx = rel * (fitGap * 32)
          const tz = -ax * fitDepth
          const ry = -rel * fitTilt
          const rz = rel * sideTilt

          return (
            <motion.div
              key={`${slide.src}-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: fitWidth,
                height: fitHeight,
                borderRadius: effectiveRadius,
                overflow: "hidden",
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                pointerEvents: visible && !autoplay ? "auto" : "none",
                willChange: "transform, opacity",
                cursor:
                  clickable && visible && !isActive ? "pointer" : "default",
                boxShadow: isActive
                  ? "0 28px 60px -24px rgba(0,0,0,0.55)"
                  : "0 16px 36px -22px rgba(0,0,0,0.4)",
              }}
              animate={{
                x: `calc(-50% + ${tx}px)`,
                y: "-50%",
                translateZ: tz,
                rotateY: ry,
                rotateZ: rz,
                scale: sc,
                opacity: visible ? 1 : 0,
              }}
              transition={transition}
              onClick={() => {
                if (
                  clickable &&
                  !isDragging.current &&
                  !isActive &&
                  visible
                ) {
                  goTo(i)
                }
              }}
              aria-label={slide.title ?? slide.alt ?? `Slide ${i + 1}`}
              aria-hidden={!visible}
            >
              <img
                src={slide.src}
                alt={slide.alt ?? slide.title ?? `Slide ${i + 1}`}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit]"
                style={{
                  boxShadow: isActive
                    ? "inset 0 0 0 1px rgba(255,255,255,0.28)"
                    : "inset 0 0 0 1px rgba(255,255,255,0.1)",
                }}
              />

              {showTitle && (slide.title || slide.subtitle) ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: getGradientForPosition(titlePosition),
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      ...getTitleStyles(titlePosition),
                      padding: isNarrow ? "16px 16px" : "22px 24px",
                    }}
                  >
                    {slide.badge && showBadge ? (
                      <span className="mb-2 inline-block rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur-md">
                        {slide.badge}
                      </span>
                    ) : null}
                    {slide.title ? (
                      <p
                        className="font-semibold tracking-tight text-white"
                        style={{
                          fontSize: "clamp(16px, 4.5vw, 26px)",
                          letterSpacing: "-0.02em",
                          lineHeight: "1.15",
                          textShadow: "0 2px 14px rgba(0,0,0,0.45)",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {slide.title}
                      </p>
                    ) : null}
                    {slide.subtitle ? (
                      <p
                        className="mt-1.5 font-medium text-white/70"
                        style={{
                          fontSize: "clamp(11px, 3vw, 13px)",
                          letterSpacing: "0.02em",
                          textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                        }}
                      >
                        {slide.subtitle}
                      </p>
                    ) : null}
                  </div>
                </>
              ) : null}

              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  pointerEvents: "none",
                }}
                animate={{ opacity: isActive ? 0 : dimValue }}
                transition={transition}
              />
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {current ? (
          <motion.div
            key={current.src}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className="mt-6 px-4 text-center sm:mt-8"
          >
            <p className="text-caption tracking-[0.18em] text-muted-foreground uppercase">
              Collection
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {current.title ?? `Slide ${active + 1}`}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        data-gallery-controls
        className="mt-4 flex max-w-[calc(100%-1rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-border/70 bg-card/85 px-2 py-1.5 shadow-soft backdrop-blur-md sm:mt-5 sm:gap-3 sm:px-3"
        style={{ pointerEvents: "all" }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        {showArrows ? (
          <motion.button
            type="button"
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            className="flex size-[46px] cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
            whileTap={{ scale: 0.94 }}
          >
            <ChevronLeftIcon className="icon-dir size-4" />
          </motion.button>
        ) : null}

        {showDots ? (
          <div className="flex items-center gap-1 px-1">
            {slides.map((slide, i) => (
              <motion.button
                key={`${slide.src}-dot-${i}`}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active === i ? "true" : undefined}
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(i)
                }}
                className="flex h-11 min-w-11 cursor-pointer items-center justify-center"
              >
                <motion.span
                  className="block rounded-full bg-foreground/65"
                  animate={{
                    width: active === i ? 22 : 6,
                    height: 6,
                    opacity: active === i ? 1 : 0.35,
                  }}
                  transition={{ type: "spring", bounce: 0.3, duration: 0.45 }}
                />
              </motion.button>
            ))}
          </div>
        ) : null}

        {showCounter ? (
          <span className="px-1.5 font-mono text-[11px] font-medium tracking-wider text-muted-foreground tabular-nums">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1 opacity-40">/</span>
            {String(n).padStart(2, "0")}
          </span>
        ) : null}

        {showArrows ? (
          <motion.button
            type="button"
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            className="flex size-[46px] cursor-pointer items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground"
            whileTap={{ scale: 0.94 }}
          >
            <ChevronRightIcon className="icon-dir size-4" />
          </motion.button>
        ) : null}
      </div>
    </div>
  )
}

export default CoolSlideGallery
