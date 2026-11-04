"use client"

import * as React from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

import { DEFAULT_3D_IMAGE_SLIDER_IMAGES } from "./default-images"

export { DEFAULT_3D_IMAGE_SLIDER_IMAGES } from "./default-images"

export type ThreeDImageSliderProps = {
  /** Image URLs around the cylinder. Defaults to bundled demo images. */
  images?: string[]
  /** Seconds for one full 360° rotation. */
  duration?: number
  /** CSS width of each card (px, rem, em, …). */
  cardWidth?: string
  /** CSS aspect-ratio of each card. */
  cardAspectRatio?: string
  /** CSS perspective on the stage. */
  perspective?: string
  /** Extra classes on the outer stage. */
  className?: string
  /** Alias for `className` (kept for older call sites). */
  containerClassName?: string
  /** Extra classes on each image. */
  imageClassName?: string
  /** Cylinder spin direction. */
  rotationDirection?: "left" | "right"
  /** Soft edge fade mask on the stage. */
  withMask?: boolean
}

/**
 * Orbital cylinder gallery - continuous spin with hover pause, rim light, and drag scrub.
 */
export function ThreeDImageSlider({
  images = DEFAULT_3D_IMAGE_SLIDER_IMAGES,
  duration = 36,
  cardWidth = "min(68vw, 14em)",
  cardAspectRatio = "3/4",
  perspective = "min(90vw, 36em)",
  className,
  containerClassName,
  imageClassName,
  rotationDirection = "left",
  withMask = true,
}: ThreeDImageSliderProps) {
  const n = Math.max(images.length, 1)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: "200px" })
  const prefersReducedMotion = useReducedMotion()
  const [paused, setPaused] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const dragBase = React.useRef(0)
  const dragStartX = React.useRef(0)
  const dragStartY = React.useRef(0)
  const axisLock = React.useRef<"x" | "y" | null>(null)
  const canHover = React.useRef(false)

  React.useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover)").matches
  }, [])

  const autoOffset = useMotionValue(0)
  const dragOffset = useMotionValue(0)
  const smoothDrag = useSpring(dragOffset, { stiffness: 120, damping: 24 })
  const totalRotate = useTransform(
    [autoOffset, smoothDrag],
    ([auto, drag]) => (auto as number) + (drag as number)
  )

  const animationDuration = prefersReducedMotion ? duration * 5 : duration
  const dirSign = rotationDirection === "left" ? 1 : -1

  React.useEffect(() => {
    if (!isInView || paused || dragging || prefersReducedMotion) return

    let frame = 0
    let last = performance.now()
    const degPerMs = (360 / (animationDuration * 1000)) * dirSign

    const tick = (now: number) => {
      const dt = now - last
      last = now
      autoOffset.set(autoOffset.get() + degPerMs * dt)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [
    isInView,
    paused,
    dragging,
    prefersReducedMotion,
    animationDuration,
    dirSign,
    autoOffset,
  ])

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true)
    axisLock.current = null
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    dragBase.current = dragOffset.get()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    if (!axisLock.current) {
      const dx = Math.abs(e.clientX - dragStartX.current)
      const dy = Math.abs(e.clientY - dragStartY.current)
      if (dx < 8 && dy < 8) return
      axisLock.current = dx > dy ? "x" : "y"
      if (axisLock.current === "y") {
        try {
          ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
        } catch {
          /* noop */
        }
        setDragging(false)
        return
      }
    }
    if (axisLock.current !== "x") return
    const delta = (e.clientX - dragStartX.current) * 0.35
    dragOffset.set(dragBase.current + delta)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return
    setDragging(false)
    axisLock.current = null
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
  }

  const maskStyles = withMask
    ? {
        WebkitMask:
          "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 10% 90%, transparent)",
      }
    : {}

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative grid h-full min-h-[380px] w-full max-w-full place-items-center overflow-hidden sm:min-h-[480px]",
        containerClassName,
        className
      )}
      style={{
        perspective,
        ...maskStyles,
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
      onMouseEnter={() => {
        if (canHover.current) setPaused(true)
      }}
      onMouseLeave={() => {
        setPaused(false)
        setDragging(false)
        axisLock.current = null
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="region"
      aria-label="3D image cylinder"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[18%] bottom-[10%] h-20 rounded-[100%] bg-foreground/10 blur-2xl dark:bg-foreground/15"
      />

      <motion.div
        className="pointer-events-none grid place-self-center will-change-transform"
        style={{ transformStyle: "preserve-3d", rotateY: totalRotate }}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="col-start-1 row-start-1"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.55em) / tan(0.5 * (1turn / ${n}))))`,
            }}
          >
            <div
              className="relative overflow-hidden rounded-[12px] border border-white/15 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.55)] sm:rounded-[14px]"
              style={{
                width: cardWidth,
                aspectRatio: cardAspectRatio,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className={cn("size-full object-cover", imageClassName)}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/35"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default ThreeDImageSlider
