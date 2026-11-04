"use client"

import * as React from "react"
import {
  animate,
  easeOut,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

import image01 from "./images/01.jpg"
import image02 from "./images/02.jpg"
import image03 from "./images/03.jpg"
import image04 from "./images/04.jpg"
import image05 from "./images/05.jpg"
import image06 from "./images/06.jpg"
import image07 from "./images/07.jpg"
import image08 from "./images/08.jpg"
import image09 from "./images/09.jpg"
import image10 from "./images/10.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_IMAGES = [
  assetSrc(image01),
  assetSrc(image02),
  assetSrc(image03),
  assetSrc(image04),
  assetSrc(image05),
  assetSrc(image06),
  assetSrc(image07),
  assetSrc(image08),
  assetSrc(image09),
  assetSrc(image10),
]

function wrapIndex(value: number, length: number) {
  if (length <= 0) return 0
  return ((value % length) + length) % length
}

function shortestAngleDelta(from: number, to: number) {
  return ((((to - from) % 360) + 540) % 360) - 180
}

function indexFromRotation(rotation: number, angle: number, length: number) {
  if (angle <= 0 || length <= 0) return 0
  return wrapIndex(Math.round((180 - rotation) / angle), length)
}

function faceDepth(rotation: number, index: number, angle: number) {
  const faceWorld = rotation - index * angle
  const delta = Math.abs(shortestAngleDelta(faceWorld, 180))
  return 1 - Math.min(1, delta / 180)
}

export interface ImageRingProps {
  /** Image URLs around the ring. */
  images?: string[]
  /** Optional captions aligned with `images` (shown for the front face). */
  captions?: string[]
  /** Face width in pixels. Height follows `aspectRatio`. */
  width?: number
  /** Width ÷ height. Default portrait `3 / 4`. */
  aspectRatio?: number
  /** CSS perspective distance in pixels. */
  perspective?: number
  /** Distance of each face from the ring center. */
  imageDistance?: number
  /** Starting `rotateY` of the ring, in degrees. */
  initialRotation?: number
  /** Entrance animation duration in seconds. */
  animationDuration?: number
  /** Stagger between face entrances in seconds. */
  staggerDelay?: number
  /** Opacity floor for the farthest faces (0–1). */
  depthFade?: number
  /** Soft scale lift for the front face. */
  focusScale?: number
  /** Classes on the outer stage. */
  containerClassName?: string
  /** Classes on the rotating ring. */
  ringClassName?: string
  /** Classes on each face plate. */
  imageClassName?: string
  /** Enable drag / inertia spin. */
  draggable?: boolean
  /** Show the front-face caption + index strip. */
  showHud?: boolean
  /** Show snap dots under the stage. */
  showDots?: boolean
  /** Idle auto-advance interval in ms. `0` disables. */
  autoPlayMs?: number
  /** Viewport width at or below which `mobileScaleFactor` applies. */
  mobileBreakpoint?: number
  /** Scale applied on small viewports. */
  mobileScaleFactor?: number
  /** Inertia power after drag end. */
  inertiaPower?: number
  /** Inertia time constant (ms). */
  inertiaTimeConstant?: number
  /** Multiplier for release velocity. */
  inertiaVelocityMultiplier?: number
  /** Fires when the snapped front index changes. */
  onIndexChange?: (index: number) => void
}

export function ImageRing({
  images = DEFAULT_IMAGES,
  captions,
  width = 280,
  aspectRatio = 3 / 4,
  perspective = 1800,
  imageDistance = 460,
  initialRotation = 180,
  animationDuration = 1.15,
  staggerDelay = 0.07,
  depthFade = 0.78,
  focusScale = 1.04,
  containerClassName,
  ringClassName,
  imageClassName,
  draggable = true,
  showHud = true,
  showDots = true,
  autoPlayMs = 0,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.82,
  inertiaPower = 0.85,
  inertiaTimeConstant = 280,
  inertiaVelocityMultiplier = 18,
  onIndexChange,
}: ImageRingProps) {
  const ringRef = React.useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const rotationY = useMotionValue(initialRotation)
  const startX = React.useRef(0)
  const currentRotationY = React.useRef(initialRotation)
  const isDragging = React.useRef(false)
  const velocity = React.useRef(0)
  const lastClientX = React.useRef(0)
  const lastMoveAt = React.useRef(0)

  const angle = React.useMemo(
    () => (images.length > 0 ? 360 / images.length : 0),
    [images.length]
  )

  const [rotation, setRotation] = React.useState(initialRotation)

  const currentScale = React.useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("resize", onStoreChange)
      return () => window.removeEventListener("resize", onStoreChange)
    },
    () =>
      window.innerWidth <= mobileBreakpoint ? mobileScaleFactor : 1,
    () => 1
  )

  useMotionValueEvent(rotationY, "change", (latest) => {
    currentRotationY.current = latest
    setRotation(latest)
  })

  const activeIndex = indexFromRotation(rotation, angle, images.length)
  const depths = React.useMemo(
    () => images.map((_, i) => faceDepth(rotation, i, angle)),
    [images, angle, rotation]
  )

  const faceHeight = width / aspectRatio
  const caption = captions?.[activeIndex]

  React.useEffect(() => {
    onIndexChange?.(activeIndex)
  }, [activeIndex, onIndexChange])

  const snapTo = React.useCallback(
    (nextRotation: number, withSpring: boolean) => {
      const snapped =
        angle > 0 ? Math.round(nextRotation / angle) * angle : nextRotation
      if (reduceMotion || !withSpring) {
        rotationY.set(snapped)
        return
      }
      animate(rotationY.get(), snapped, {
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
        onUpdate: (latest) => rotationY.set(latest),
      })
    },
    [angle, reduceMotion, rotationY]
  )

  const stepBy = React.useCallback(
    (steps: number) => {
      if (angle <= 0) return
      rotationY.stop()
      snapTo(rotationY.get() - steps * angle, true)
    },
    [angle, rotationY, snapTo]
  )

  const interactionRef = React.useRef({
    draggable,
    currentScale,
    angle,
    reduceMotion: !!reduceMotion,
    inertiaPower,
    inertiaTimeConstant,
    inertiaVelocityMultiplier,
    snapTo,
    rotationY,
  })

  React.useEffect(() => {
    interactionRef.current = {
      draggable,
      currentScale,
      angle,
      reduceMotion: !!reduceMotion,
      inertiaPower,
      inertiaTimeConstant,
      inertiaVelocityMultiplier,
      snapTo,
      rotationY,
    }
  }, [
    angle,
    currentScale,
    draggable,
    inertiaPower,
    inertiaTimeConstant,
    inertiaVelocityMultiplier,
    reduceMotion,
    rotationY,
    snapTo,
  ])

  const onDragMove = React.useCallback((event: MouseEvent | TouchEvent) => {
    const ctx = interactionRef.current
    if (!ctx.draggable || !isDragging.current) return
    const clientX =
      "touches" in event ? event.touches[0]!.clientX : event.clientX
    const now = performance.now()
    const dt = Math.max(1, now - lastMoveAt.current)
    const deltaX = clientX - startX.current
    const instant = (-deltaX * 0.55) / Math.max(1, ctx.currentScale)
    velocity.current = ((clientX - lastClientX.current) / dt) * -18
    ctx.rotationY.set(currentRotationY.current + instant)
    startX.current = clientX
    lastClientX.current = clientX
    lastMoveAt.current = now
  }, [])

  const onDragEnd = React.useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false

    // mouseup/touchend use `{ once: true }` - only clear move listeners here
    document.removeEventListener("mousemove", onDragMove)
    document.removeEventListener("touchmove", onDragMove)

    const ctx = interactionRef.current
    const initial = ctx.rotationY.get()
    const boost = velocity.current * ctx.inertiaVelocityMultiplier

    if (ctx.reduceMotion) {
      ctx.snapTo(initial, false)
      velocity.current = 0
      return
    }

    animate(initial, initial + boost, {
      type: "inertia",
      velocity: boost,
      power: ctx.inertiaPower,
      timeConstant: ctx.inertiaTimeConstant,
      restDelta: 0.35,
      modifyTarget: (next) =>
        ctx.angle > 0 ? Math.round(next / ctx.angle) * ctx.angle : next,
      onUpdate: (latest) => ctx.rotationY.set(latest),
    })

    velocity.current = 0
  }, [onDragMove])

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return
    if ("button" in event && event.button !== 0) return

    isDragging.current = true
    const clientX =
      "touches" in event ? event.touches[0]!.clientX : event.clientX
    startX.current = clientX
    lastClientX.current = clientX
    lastMoveAt.current = performance.now()
    rotationY.stop()
    velocity.current = 0
    currentRotationY.current = rotationY.get()

    document.addEventListener("mousemove", onDragMove)
    document.addEventListener("mouseup", onDragEnd, { once: true })
    document.addEventListener("touchmove", onDragMove, { passive: true })
    document.addEventListener("touchend", onDragEnd, { once: true })
  }

  React.useEffect(() => {
    if (!autoPlayMs || autoPlayMs < 800 || reduceMotion || images.length < 2) {
      return
    }
    const id = window.setInterval(() => {
      if (isDragging.current || document.hidden) return
      stepBy(1)
    }, autoPlayMs)
    return () => window.clearInterval(id)
  }, [autoPlayMs, images.length, reduceMotion, stepBy])

  React.useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", onDragMove)
      document.removeEventListener("mouseup", onDragEnd)
      document.removeEventListener("touchmove", onDragMove)
      document.removeEventListener("touchend", onDragEnd)
    }
  }, [onDragMove, onDragEnd])

  const goToIndex = (targetIndex: number) => {
    if (angle <= 0) return
    const current = rotationY.get()
    const currentIndex = indexFromRotation(current, angle, images.length)
    let delta = targetIndex - currentIndex
    if (delta > images.length / 2) delta -= images.length
    if (delta < -images.length / 2) delta += images.length
    snapTo(current - delta * angle, true)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      stepBy(-1)
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      stepBy(1)
    } else if (event.key === "Home") {
      event.preventDefault()
      goToIndex(0)
    } else if (event.key === "End") {
      event.preventDefault()
      goToIndex(images.length - 1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Image ring"
      tabIndex={0}
      className={cn(
        "relative h-full w-full select-none overflow-hidden outline-none",
        "rounded-[12px] focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        draggable && "cursor-grab touch-none active:cursor-grabbing",
        containerClassName
      )}
      style={{
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute"
        style={{
          perspective: `${perspective}px`,
          width: `${width}px`,
          height: `${faceHeight}px`,
          left: "50%",
          top: showHud || showDots ? "44%" : "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          ref={ringRef}
          className={cn("absolute h-full w-full", ringClassName)}
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotationY,
          }}
        >
          {images.map((imageUrl, index) => {
            const depth = depths[index] ?? 0
            // Keep faces sharp - no CSS filters on 3D nodes (they blur the ring).
            const opacity = depthFade + (1 - depthFade) * Math.pow(depth, 1.35)
            const scale = 1 + (focusScale - 1) * Math.pow(depth, 2.2)

            return (
              <motion.div
                key={`${imageUrl}-${index}`}
                aria-hidden={index !== activeIndex}
                className={cn(
                  "absolute h-full w-full overflow-hidden rounded-[12px]",
                  "border border-border/50 bg-card",
                  "shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)]",
                  "origin-center will-change-transform",
                  imageClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  rotateY: index * -angle,
                  z: -imageDistance,
                  transformOrigin: `50% 50% ${imageDistance}px`,
                  opacity,
                  scale,
                }}
                initial={reduceMotion ? false : { y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : index * staggerDelay,
                  duration: reduceMotion ? 0 : animationDuration,
                  ease: easeOut,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt=""
                  draggable={false}
                  className="pointer-events-none h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.1)_0%,transparent_40%)]"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {(showDots || showHud) && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 flex flex-col items-center gap-2.5 px-4">
          {showDots && images.length > 1 ? (
            <div
              className="pointer-events-auto flex items-center justify-center gap-1.5"
              role="tablist"
              aria-label="Slides"
            >
              {images.map((_, index) => {
                const active = index === activeIndex
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Go to image ${index + 1}`}
                    className={cn(
                      "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                      active
                        ? "w-5 bg-foreground"
                        : "w-1.5 bg-foreground/25 hover:bg-foreground/45"
                    )}
                    onClick={(event) => {
                      event.stopPropagation()
                      goToIndex(index)
                    }}
                  />
                )
              })}
            </div>
          ) : null}

          {showHud ? (
            <div className="flex max-w-md flex-col items-center gap-1">
              <p className="text-caption tabular-nums tracking-wide text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-1.5 text-border">/</span>
                {String(images.length).padStart(2, "0")}
              </p>
              {caption ? (
                <p className="truncate text-center text-sm font-medium text-foreground/90">
                  {caption}
                </p>
              ) : (
                <p className="text-center text-xs text-muted-foreground">
                  Drag to orbit · arrow keys to step
                </p>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default ImageRing
