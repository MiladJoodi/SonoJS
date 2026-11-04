"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ExternalLinkIcon,
  PauseIcon,
  PlayIcon,
} from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_3D_BEND_CAROUSEL_ITEMS,
  type BendCarouselItem,
} from "./items"

export { DEFAULT_3D_BEND_CAROUSEL_ITEMS } from "./items"
export type { BendCarouselItem }

export type ThreeDBendCarouselProps = {
  /** Array of items (objects or image URL strings). */
  items?: (string | BendCarouselItem)[]
  /** Compatibility alias for image URLs. */
  images?: string[]
  /** Card width in pixels. */
  itemWidth?: number
  /** Aspect ratio (width / height). */
  aspectRatio?: number
  /** Gap between items in pixels (negative for stacked/shingle). */
  gap?: number
  /** CSS perspective in pixels. */
  perspective?: number
  /** Maximum bend rotation angle in degrees. */
  bendAngle?: number
  /** Depth displacement along Z in pixels. */
  depth?: number
  /** Curvature direction. */
  curveDirection?: "concave" | "convex"
  /** Bend axis. */
  orientation?: "vertical" | "horizontal"
  /** Viewport height. */
  height?: number | string
  /** Container width. */
  width?: number | string
  /** Lerp damping (lower = floatier). */
  damping?: number
  /** Friction applied to drag velocity on release. */
  momentumFactor?: number
  /** Snap to nearest card when idle. */
  snap?: boolean
  /** Seamless infinite looping. */
  loop?: boolean
  /** Fade off-center cards to grayscale. */
  grayscaleInactive?: boolean
  /** Scale for the active center card. */
  activeScale?: number
  /** Minimum opacity for farthest cards. */
  minOpacity?: number
  /** Mouse / touch drag. */
  enableDrag?: boolean
  /** Mouse wheel navigation. */
  enableWheel?: boolean
  /** Keyboard arrow navigation. */
  enableKeyboard?: boolean
  /** Auto-advance slides. */
  autoPlay?: boolean
  /** Autoplay interval in ms. */
  autoPlayInterval?: number
  /** Pause autoplay while hovered. */
  pauseOnHover?: boolean
  /** Floating prev / next / play controls. */
  showControls?: boolean
  /** Pagination counter + dots. */
  showIndicators?: boolean
  /** Specular sheen overlay on cards. */
  showGlare?: boolean
  className?: string
  cardClassName?: string
  onActiveChange?: (index: number) => void
  onItemClick?: (item: BendCarouselItem, index: number) => void
  renderItem?: (
    item: BendCarouselItem,
    index: number,
    isCenter: boolean
  ) => React.ReactNode
}

export type ThreeDBendCarouselRef = {
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  togglePlay: () => void
  getActiveIndex: () => number
}

const controlBtnClass = cn(
  "flex size-10 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground shadow-soft backdrop-blur-md transition-all duration-200",
  "hover:scale-105 hover:bg-card active:scale-95"
)

export const ThreeDBendCarousel = React.forwardRef<
  ThreeDBendCarouselRef,
  ThreeDBendCarouselProps
>(function ThreeDBendCarousel(
  {
    items: rawItems,
    images,
    itemWidth: itemWidthProp = 320,
    aspectRatio = 0.8,
    gap = -40,
    perspective = 1000,
    bendAngle = 45,
    depth = 400,
    curveDirection = "concave",
    orientation = "vertical",
    height = 560,
    width = "100%",
    damping = 0.085,
    momentumFactor = 120,
    snap = true,
    loop = true,
    grayscaleInactive = true,
    activeScale = 1.04,
    minOpacity = 0.22,
    enableDrag = true,
    enableWheel = true,
    enableKeyboard = true,
    autoPlay = false,
    autoPlayInterval = 4000,
    pauseOnHover = true,
    showControls = true,
    showIndicators = true,
    showGlare = true,
    className,
    cardClassName,
    onActiveChange,
    onItemClick,
    renderItem,
  },
  ref
) {
  const formattedItems: BendCarouselItem[] = React.useMemo(() => {
    if (rawItems && rawItems.length > 0) {
      return rawItems.map((item, idx) => {
        if (typeof item === "string") {
          return {
            id: idx,
            image: item,
            title: `Item ${idx + 1}`,
            badge: `${idx + 1 < 10 ? "0" : ""}${idx + 1}`,
          }
        }
        return item
      })
    }
    if (images && images.length > 0) {
      return images.map((src, idx) => ({
        id: idx,
        image: src,
        title: `Slide ${idx + 1}`,
        badge: `${idx + 1 < 10 ? "0" : ""}${idx + 1}`,
      }))
    }
    return DEFAULT_3D_BEND_CAROUSEL_ITEMS
  }, [rawItems, images])

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = React.useState(0)

  React.useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const measure = () => setContainerW(node.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const itemWidth =
    containerW > 0
      ? Math.min(itemWidthProp, Math.max(200, containerW - 48))
      : Math.min(itemWidthProp, 280)
  const fitDepth =
    containerW > 0 && containerW < 480 ? Math.min(depth, 260) : depth
  const fitBend =
    containerW > 0 && containerW < 480 ? Math.min(bendAngle, 34) : bendAngle
  const fitHeight =
    typeof height === "number" && containerW > 0 && containerW < 480
      ? Math.min(height, 480)
      : height

  const count = formattedItems.length
  const itemHeight = itemWidth / aspectRatio
  const isVertical = orientation === "vertical"
  const itemDimension = isVertical ? itemHeight : itemWidth
  const step = itemDimension + gap
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([])
  const glareRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const currentOffsetRef = React.useRef(0)
  const targetOffsetRef = React.useRef(0)
  const isDraggingRef = React.useRef(false)
  const isHoveringRef = React.useRef(false)
  const dragStartCoordRef = React.useRef(0)
  const dragStartOffsetRef = React.useRef(0)
  const lastCoordRef = React.useRef(0)
  const lastTimeRef = React.useRef(0)
  const velocityRef = React.useRef(0)
  const rafIdRef = React.useRef<number | null>(null)
  const wheelDebounceTimerRef = React.useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const activeIndexRef = React.useRef(0)

  React.useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const updateTransforms = React.useCallback(() => {
    if (!containerRef.current || count === 0) return

    const containerDim = isVertical
      ? containerRef.current.clientHeight || 600
      : containerRef.current.clientWidth || 900

    const centerOffset = containerDim / 2
    const currentOffset = currentOffsetRef.current
    const totalSpan = count * step

    let nearestIndex = 0
    let minDistance = Infinity

    for (let i = 0; i < count; i++) {
      const el = cardRefs.current[i]
      if (!el) continue

      let deltaPixels = i * step - currentOffset

      if (loop && totalSpan > 0) {
        deltaPixels =
          ((deltaPixels % totalSpan) + totalSpan * 1.5) % totalSpan -
          totalSpan / 2
      }

      const distFromCenter = Math.abs(deltaPixels)
      if (distFromCenter < minDistance) {
        minDistance = distFromCenter
        nearestIndex = i
      }

      const viewThreshold = Math.max(1, centerOffset * 0.85)
      const normalized = Math.max(
        -1.6,
        Math.min(1.6, deltaPixels / viewThreshold)
      )
      const absNorm = Math.abs(normalized)

      const curveSign = curveDirection === "concave" ? 1 : -1
      const rotateAngle = -normalized * fitBend * curveSign
      const translateZ = -absNorm * fitDepth

      const opacity = Math.max(minOpacity, 1 - Math.pow(absNorm * 0.75, 1.25))
      const scale = Math.max(
        0.85,
        activeScale - absNorm * (activeScale - 0.92)
      )
      const zIndex = Math.round(100 - absNorm * 50)

      let transformOrigin = "center center"
      if (isVertical) {
        if (normalized > 0.04) transformOrigin = "top center"
        else if (normalized < -0.04) transformOrigin = "bottom center"
      } else if (normalized > 0.04) transformOrigin = "left center"
      else if (normalized < -0.04) transformOrigin = "right center"

      if (isVertical) {
        el.style.transform = `translate3d(-50%, calc(-50% + ${deltaPixels}px), ${translateZ}px) rotateX(${rotateAngle}deg) scale(${scale})`
      } else {
        el.style.transform = `translate3d(calc(-50% + ${deltaPixels}px), -50%, ${translateZ}px) rotateY(${rotateAngle}deg) scale(${scale})`
      }

      el.style.transformOrigin = transformOrigin
      el.style.opacity = `${opacity}`
      el.style.zIndex = `${zIndex}`

      if (grayscaleInactive) {
        const grayPercent = Math.min(100, Math.pow(absNorm, 1.4) * 100)
        const brightness = Math.max(0.6, 1 - absNorm * 0.35)
        el.style.filter = `grayscale(${grayPercent.toFixed(1)}%) brightness(${brightness.toFixed(2)})`
      }

      const glareEl = glareRefs.current[i]
      if (glareEl && showGlare) {
        const glareOpacity = Math.max(0, 0.45 - absNorm * 0.45)
        const glareAngle = isVertical
          ? 180 + rotateAngle * 2
          : 90 + rotateAngle * 2
        glareEl.style.opacity = `${glareOpacity.toFixed(3)}`
        glareEl.style.background = `linear-gradient(${glareAngle}deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`
      }
    }

    if (nearestIndex !== activeIndexRef.current) {
      activeIndexRef.current = nearestIndex
      setActiveIndex(nearestIndex)
      onActiveChange?.(nearestIndex)
    }
  }, [
    count,
    isVertical,
    step,
    loop,
    curveDirection,
    fitBend,
    fitDepth,
    minOpacity,
    activeScale,
    grayscaleInactive,
    showGlare,
    onActiveChange,
  ])

  const tick = React.useCallback(() => {
    const diff = targetOffsetRef.current - currentOffsetRef.current

    if (Math.abs(diff) > 0.05 || isDraggingRef.current) {
      currentOffsetRef.current += diff * damping
      updateTransforms()
      rafIdRef.current = requestAnimationFrame(tick)
    } else {
      currentOffsetRef.current = targetOffsetRef.current
      updateTransforms()
      rafIdRef.current = null
    }
  }, [damping, updateTransforms])

  const wakeRaf = React.useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(tick)
    }
  }, [tick])

  const snapToNearest = React.useCallback(() => {
    if (!snap || count === 0) return
    const rawTarget = targetOffsetRef.current
    const targetCard = Math.round(rawTarget / step)
    let newTarget = targetCard * step

    if (!loop) {
      newTarget = Math.max(0, Math.min((count - 1) * step, newTarget))
    }

    targetOffsetRef.current = newTarget
    wakeRaf()
  }, [snap, count, step, loop, wakeRaf])

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0) return
      const normalizedTarget = Math.max(0, Math.min(count - 1, index))

      if (loop) {
        const currentVirtual = Math.round(currentOffsetRef.current / step)
        const currentMod = ((currentVirtual % count) + count) % count
        let diff = normalizedTarget - currentMod

        if (diff > count / 2) diff -= count
        if (diff < -count / 2) diff += count

        targetOffsetRef.current = (currentVirtual + diff) * step
      } else {
        targetOffsetRef.current = normalizedTarget * step
      }
      wakeRaf()
    },
    [count, loop, step, wakeRaf]
  )

  const next = React.useCallback(() => {
    if (loop) {
      targetOffsetRef.current += step
    } else {
      const nextIdx = Math.min(count - 1, activeIndexRef.current + 1)
      targetOffsetRef.current = nextIdx * step
    }
    wakeRaf()
  }, [loop, step, count, wakeRaf])

  const prev = React.useCallback(() => {
    if (loop) {
      targetOffsetRef.current -= step
    } else {
      const prevIdx = Math.max(0, activeIndexRef.current - 1)
      targetOffsetRef.current = prevIdx * step
    }
    wakeRaf()
  }, [loop, step, wakeRaf])

  React.useImperativeHandle(
    ref,
    () => ({
      next,
      prev,
      goTo,
      togglePlay: () => setIsPlaying((p) => !p),
      getActiveIndex: () => activeIndexRef.current,
    }),
    [next, prev, goTo]
  )

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!enableDrag) return

    isDraggingRef.current = true
    const clientCoord =
      "touches" in e
        ? isVertical
          ? e.touches[0]!.clientY
          : e.touches[0]!.clientX
        : isVertical
          ? e.clientY
          : e.clientX

    dragStartCoordRef.current = clientCoord
    dragStartOffsetRef.current = targetOffsetRef.current
    lastCoordRef.current = clientCoord
    lastTimeRef.current = performance.now()
    velocityRef.current = 0

    wakeRaf()
  }

  React.useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return

      const clientCoord =
        "touches" in e
          ? isVertical
            ? e.touches[0]!.clientY
            : e.touches[0]!.clientX
          : isVertical
            ? e.clientY
            : e.clientX

      const delta = dragStartCoordRef.current - clientCoord
      let newTarget = dragStartOffsetRef.current + delta

      if (!loop) {
        const maxOffset = (count - 1) * step
        if (newTarget < 0) {
          newTarget = newTarget * 0.35
        } else if (newTarget > maxOffset) {
          newTarget = maxOffset + (newTarget - maxOffset) * 0.35
        }
      }

      targetOffsetRef.current = newTarget

      const now = performance.now()
      const dt = now - lastTimeRef.current
      if (dt > 8) {
        const dCoord = lastCoordRef.current - clientCoord
        velocityRef.current = dCoord / dt
        lastCoordRef.current = clientCoord
        lastTimeRef.current = now
      }

      wakeRaf()
    }

    const handleDragEnd = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false

      const momentum = velocityRef.current * momentumFactor
      targetOffsetRef.current += momentum

      snapToNearest()
      wakeRaf()
    }

    window.addEventListener("mousemove", handleDragMove, { passive: true })
    window.addEventListener("mouseup", handleDragEnd)
    window.addEventListener("touchmove", handleDragMove, { passive: true })
    window.addEventListener("touchend", handleDragEnd)

    return () => {
      window.removeEventListener("mousemove", handleDragMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchmove", handleDragMove)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isVertical, loop, count, step, momentumFactor, snapToNearest, wakeRaf])

  const handleWheel = React.useCallback(
    (e: WheelEvent) => {
      if (!enableWheel) return
      e.preventDefault()

      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      const normalizedDelta =
        Math.sign(delta) * Math.min(Math.abs(delta), 120)

      let newTarget = targetOffsetRef.current + normalizedDelta * 1.1

      if (!loop) {
        const maxOffset = (count - 1) * step
        newTarget = Math.max(0, Math.min(maxOffset, newTarget))
      }

      targetOffsetRef.current = newTarget
      wakeRaf()

      if (snap) {
        if (wheelDebounceTimerRef.current) {
          clearTimeout(wheelDebounceTimerRef.current)
        }
        wheelDebounceTimerRef.current = setTimeout(() => {
          snapToNearest()
        }, 180)
      }
    },
    [enableWheel, loop, count, step, wakeRaf, snap, snapToNearest]
  )

  React.useEffect(() => {
    if (!enableKeyboard) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return
      const isFocused =
        document.activeElement === containerRef.current ||
        containerRef.current.contains(document.activeElement)

      if (!isFocused && !isHoveringRef.current) return

      if (isVertical) {
        if (e.key === "ArrowUp") {
          e.preventDefault()
          prev()
        } else if (e.key === "ArrowDown") {
          e.preventDefault()
          next()
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        next()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enableKeyboard, isVertical, next, prev])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container || !enableWheel) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [handleWheel, enableWheel])

  React.useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (pauseOnHover && isHoveringRef.current) return
      if (isDraggingRef.current) return
      next()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, pauseOnHover, autoPlayInterval, next])

  React.useEffect(() => {
    updateTransforms()

    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      updateTransforms()
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [updateTransforms])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseEnter={() => {
        isHoveringRef.current = true
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      className={cn(
        "group relative flex max-w-full cursor-grab select-none items-center justify-center overflow-hidden outline-none active:cursor-grabbing",
        className
      )}
      style={{
        width,
        height: fitHeight,
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
        touchAction: isVertical ? "pan-x" : "pan-y",
      }}
      aria-label="3D bend carousel"
      role="region"
    >
      <div
        className="pointer-events-none relative z-[1] flex h-full w-full items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {formattedItems.map((item, index) => {
          const isCenter = activeIndex === index

          return (
            <div
              key={item.id ?? index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (isCenter) {
                  item.onClick?.()
                  onItemClick?.(item, index)
                } else {
                  goTo(index)
                }
              }}
              className={cn(
                "absolute top-1/2 left-1/2 overflow-hidden rounded-[12px]",
                "border border-border/70 bg-card",
                "pointer-events-auto cursor-pointer transition-[box-shadow] duration-300",
                isCenter
                  ? "shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)]"
                  : "shadow-soft",
                cardClassName
              )}
              style={{
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                willChange: "transform, opacity, filter",
                backfaceVisibility: "hidden",
              }}
            >
              {renderItem ? (
                renderItem(item, index, isCenter)
              ) : (
                <div className="group/card relative flex h-full w-full flex-col justify-end overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title || `Slide ${index + 1}`}
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                    loading="lazy"
                    draggable={false}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      boxShadow: isCenter
                        ? "inset 0 0 0 1px rgba(255,255,255,0.22)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between">
                    {item.badge ? (
                      <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase shadow-sm backdrop-blur-md">
                        {item.badge}
                      </span>
                    ) : null}
                    {item.tag ? (
                      <span className="rounded-md border border-white/10 bg-black/35 px-2 py-0.5 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-md">
                        {item.tag}
                      </span>
                    ) : null}
                  </div>

                  <div className="relative z-10 p-5 text-white">
                    {item.subtitle ? (
                      <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-white/70 uppercase">
                        {item.subtitle}
                      </p>
                    ) : null}
                    {item.title ? (
                      <h3 className="line-clamp-1 text-lg leading-snug font-semibold tracking-tight text-white">
                        {item.title}
                      </h3>
                    ) : null}
                    {item.description ? (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/75">
                        {item.description}
                      </p>
                    ) : null}

                    {item.link ? (
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-white/90 transition-colors group-hover/card:text-white">
                        <span>Explore</span>
                        <ExternalLinkIcon className="icon-dir ms-0.5 size-3.5 transition-transform group-hover/card:translate-x-0.5 rtl:group-hover/card:-translate-x-0.5" />
                      </div>
                    ) : null}
                  </div>

                  {showGlare ? (
                    <div
                      ref={(el) => {
                        glareRefs.current[index] = el
                      }}
                      className="pointer-events-none absolute inset-0 transition-opacity duration-150"
                      style={{ mixBlendMode: "overlay" }}
                    />
                  ) : null}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showControls ? (
        <div
          className={cn(
            "absolute z-30 flex items-center gap-2 rounded-full border border-border/70 bg-card/80 p-1.5 shadow-soft backdrop-blur-md",
            isVertical
              ? "end-4 top-1/2 -translate-y-1/2 flex-col"
              : "inset-x-0 bottom-5 mx-auto w-fit flex-row justify-center"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className={controlBtnClass}
          >
            {isVertical ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronLeftIcon className="icon-dir size-4" />
            )}
          </button>

          {autoPlay ? (
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              className={cn(
                controlBtnClass,
                isPlaying && "text-primary"
              )}
            >
              {isPlaying ? (
                <PauseIcon className="size-3.5" />
              ) : (
                <PlayIcon className="ms-0.5 size-3.5" />
              )}
            </button>
          ) : null}

          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className={controlBtnClass}
          >
            {isVertical ? (
              <ChevronDownIcon className="size-4" />
            ) : (
              <ChevronRightIcon className="icon-dir size-4" />
            )}
          </button>
        </div>
      ) : null}

      {showIndicators && count > 1 ? (
        <div
          className={cn(
            "pointer-events-auto absolute z-30",
            isVertical
              ? "start-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
              : "bottom-5 start-5 flex items-center gap-2"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/85 px-3 py-1.5 font-mono shadow-soft backdrop-blur-md">
            <span className="text-xs font-medium text-foreground tabular-nums">
              {(activeIndex + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] text-muted-foreground">/</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {count.toString().padStart(2, "0")}
            </span>
          </div>

          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 p-1.5 backdrop-blur-md",
              isVertical && "flex-col"
            )}
          >
            {formattedItems.map((item, i) => (
              <button
                key={item.id ?? i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={activeIndex === i ? "true" : undefined}
                className={cn(
                  "cursor-pointer rounded-full transition-all duration-300",
                  activeIndex === i
                    ? isVertical
                      ? "h-4 w-1.5 bg-foreground"
                      : "h-1.5 w-4 bg-foreground"
                    : "size-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
})

ThreeDBendCarousel.displayName = "ThreeDBendCarousel"

export default ThreeDBendCarousel
