"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RotateCcwIcon,
} from "lucide-react"

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

export type PageFlipLeaf = {
  id?: string | number
  frontImage: string
  backImage: string
  frontTitle?: string
  backTitle?: string
  frontSubtitle?: string
  backSubtitle?: string
  frontBadge?: string
  backBadge?: string
}

export type ImagePageflipProps = {
  pages?: PageFlipLeaf[]
  defaultTurnedIndex?: number
  turnedIndex?: number
  onPageChange?: (turnedCount: number, totalLeaves: number) => void
  pageWidth?: number
  pageHeight?: number
  perspective?: number
  peekAngle?: number
  turnAngle?: number
  duration?: number
  easing?: string
  shadowIntensity?: number
  spineShift?: boolean
  radius?: string | number
  showPageNumbers?: boolean
  showSpineBinding?: boolean
  /** Badge accent. Default SonoJS primary. */
  accentColor?: string
  autoplay?: boolean
  autoplayInterval?: number
  pauseOnHover?: boolean
  interactive?: boolean
  showControls?: boolean
  className?: string
  style?: React.CSSProperties
}

export type ImagePageflipHandle = {
  next: () => void
  prev: () => void
  reset: () => void
  goTo: (index: number) => void
  getTurnedCount: () => number
  getTotalLeaves: () => number
}

const DEFAULT_PAGES: PageFlipLeaf[] = [
  {
    id: 1,
    frontImage: assetSrc(image01),
    backImage: assetSrc(image02),
    frontTitle: "Villa Solarium",
    frontSubtitle: "Horizon pool and architecture",
    frontBadge: "Cover",
    backTitle: "Minimal Horizon",
    backSubtitle: "Geometric water pavilion",
    backBadge: "Plate 01",
  },
  {
    id: 2,
    frontImage: assetSrc(image03),
    backImage: assetSrc(image04),
    frontTitle: "Apex Structure",
    frontSubtitle: "Parametric glass facade",
    frontBadge: "Plate 02",
    backTitle: "Glass Skyline",
    backSubtitle: "Monolith metropolitan tower",
    backBadge: "Plate 03",
  },
  {
    id: 3,
    frontImage: assetSrc(image05),
    backImage: assetSrc(image06),
    frontTitle: "Emerald Cascade",
    frontSubtitle: "Alpine mist and forest ridge",
    frontBadge: "Plate 04",
    backTitle: "Nordic Pavilion",
    backSubtitle: "Natural timber canopy",
    backBadge: "Plate 05",
  },
  {
    id: 4,
    frontImage: assetSrc(image07),
    backImage: assetSrc(image08),
    frontTitle: "Warm Solarium",
    frontSubtitle: "Sunlight and interior loft",
    frontBadge: "Plate 06",
    backTitle: "Zen Courtyard",
    backSubtitle: "Stone water feature",
    backBadge: "Plate 07",
  },
  {
    id: 5,
    frontImage: assetSrc(image09),
    backImage: assetSrc(image10),
    frontTitle: "City Lattice",
    frontSubtitle: "Urban geometric skyline",
    frontBadge: "Plate 08",
    backTitle: "Monolith Curve",
    backSubtitle: "Concrete finish study",
    backBadge: "Endplate",
  },
]

function useIsRtl() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      if (typeof document === "undefined") return () => {}
      const el = document.documentElement
      const mo = new MutationObserver(onStoreChange)
      mo.observe(el, { attributes: true, attributeFilter: ["dir", "class"] })
      const ro = new MutationObserver(onStoreChange)
      // Also watch nearest dir changes via periodic check is overkill; html dir is enough.
      return () => {
        mo.disconnect()
        ro.disconnect()
      }
    },
    () => {
      if (typeof document === "undefined") return false
      const dir =
        document.documentElement.getAttribute("dir") ||
        getComputedStyle(document.documentElement).direction
      return dir === "rtl"
    },
    () => false
  )
}

export const ImagePageflip = React.forwardRef<
  ImagePageflipHandle,
  ImagePageflipProps
>(function ImagePageflip(
  {
    pages = DEFAULT_PAGES,
    defaultTurnedIndex = 0,
    turnedIndex: controlledTurnedIndex,
    onPageChange,
    pageWidth = 230,
    pageHeight = 330,
    perspective = 1300,
    turnAngle = 180,
    duration = 0.65,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    shadowIntensity = 0.45,
    spineShift = true,
    radius = "12px",
    showPageNumbers = true,
    showSpineBinding = true,
    accentColor = "#2563EB",
    autoplay = false,
    autoplayInterval = 3500,
    pauseOnHover = true,
    interactive = true,
    showControls = true,
    className,
    style,
  },
  ref
) {
  const [internalTurned, setInternalTurned] = React.useState(defaultTurnedIndex)
  const [isHovered, setIsHovered] = React.useState(false)
  const isRtl = useIsRtl()

  const totalLeaves = pages.length
  const currentTurned =
    controlledTurnedIndex !== undefined ? controlledTurnedIndex : internalTurned
  const isOpen = currentTurned > 0 && currentTurned < totalLeaves
  const parsedRadius = typeof radius === "number" ? `${radius}px` : radius

  const setTurned = React.useCallback(
    (newCount: number) => {
      const clamped = Math.max(0, Math.min(newCount, totalLeaves))
      if (controlledTurnedIndex === undefined) {
        setInternalTurned(clamped)
      }
      onPageChange?.(clamped, totalLeaves)
    },
    [controlledTurnedIndex, totalLeaves, onPageChange]
  )

  const flipNext = React.useCallback(() => {
    if (currentTurned < totalLeaves) setTurned(currentTurned + 1)
  }, [currentTurned, totalLeaves, setTurned])

  const flipPrev = React.useCallback(() => {
    if (currentTurned > 0) setTurned(currentTurned - 1)
  }, [currentTurned, setTurned])

  const resetBook = React.useCallback(() => {
    setTurned(0)
  }, [setTurned])

  React.useImperativeHandle(ref, () => ({
    next: flipNext,
    prev: flipPrev,
    reset: resetBook,
    goTo: (idx) => setTurned(idx),
    getTurnedCount: () => currentTurned,
    getTotalLeaves: () => totalLeaves,
  }))

  const turnedRef = React.useRef(currentTurned)
  React.useEffect(() => {
    turnedRef.current = currentTurned
  }, [currentTurned])

  React.useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered) || totalLeaves <= 1) return
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (reduce.matches) return
    }
    const timer = window.setInterval(() => {
      const prev = turnedRef.current
      setTurned(prev >= totalLeaves ? 0 : prev + 1)
    }, autoplayInterval)
    return () => window.clearInterval(timer)
  }, [
    autoplay,
    autoplayInterval,
    pauseOnHover,
    isHovered,
    totalLeaves,
    setTurned,
  ])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (isRtl) flipPrev()
        else flipNext()
      }
      if (e.key === "ArrowLeft") {
        if (isRtl) flipNext()
        else flipPrev()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [flipNext, flipPrev, isRtl])

  const handleLeafClick = (index: number) => {
    if (!interactive) return
    if (index === currentTurned) flipNext()
    else if (index === currentTurned - 1) flipPrev()
  }

  const spineOffset = spineShift && isOpen ? pageWidth / 2 : 0

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-6 select-none",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative flex items-center justify-center transition-all duration-500"
        style={{
          perspective: `${perspective}px`,
          width: `${pageWidth * 2 + 40}px`,
          height: `${pageHeight + 40}px`,
        }}
      >
        <div
          className="relative"
          style={{
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            transformStyle: "preserve-3d",
            transition: `transform ${duration}s ${easing}`,
            transform: `translateX(${spineOffset}px)`,
          }}
        >
          {showSpineBinding ? (
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 z-30 w-px bg-foreground/15"
              style={{
                insetInlineStart: "0px",
                opacity: isOpen ? 1 : 0.35,
                transition: `opacity ${duration}s ${easing}`,
              }}
            />
          ) : null}

          {/* Soft ground shadow only — oval blur, never a page-sized card (that read as a blank leaf) */}
          {shadowIntensity > 0 ? (
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-8 h-12 rounded-full blur-2xl transition-[width,opacity] duration-500"
              style={{
                insetInlineStart: "50%",
                transform: "translateX(-50%)",
                width: isOpen ? "160%" : "110%",
                background: `rgba(0, 0, 0, ${shadowIntensity * 0.55})`,
                opacity: isOpen ? 0.7 : 0.55,
              }}
            />
          ) : null}

          {pages.map((leaf, index) => {
            const isTurned = index < currentTurned
            const isActive = index === currentTurned
            const zIndex = isTurned ? index + 1 : totalLeaves - index
            const leafRotation = isTurned ? -turnAngle : 0

            return (
              <div
                key={leaf.id ?? index}
                role={interactive ? "button" : undefined}
                tabIndex={interactive && isActive ? 0 : -1}
                onClick={() => handleLeafClick(index)}
                onKeyDown={(e) => {
                  if (!interactive) return
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    handleLeafClick(index)
                  }
                }}
                className={cn(
                  "absolute inset-0 origin-left",
                  interactive
                    ? "cursor-pointer"
                    : "pointer-events-none"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  transition: `transform ${duration}s ${easing}`,
                  transform: `rotateY(${leafRotation}deg)`,
                  zIndex,
                  borderRadius: parsedRadius,
                }}
              >
                <div
                  className="absolute inset-0 size-full overflow-hidden bg-zinc-950"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: parsedRadius,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leaf.frontImage}
                    alt={leaf.frontTitle ?? `Page ${index * 2 + 1}`}
                    className="pointer-events-none size-full object-cover select-none"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent p-3.5 text-white">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      {leaf.frontBadge ? (
                        <span
                          className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}20`,
                          }}
                        >
                          {leaf.frontBadge}
                        </span>
                      ) : (
                        <span />
                      )}
                      {showPageNumbers ? (
                        <span className="font-mono text-[10px] text-zinc-300/80">
                          {index * 2 + 1}
                        </span>
                      ) : null}
                    </div>
                    {leaf.frontTitle ? (
                      <h4 className="line-clamp-1 text-xs font-semibold tracking-tight text-white drop-shadow-sm sm:text-sm">
                        {leaf.frontTitle}
                      </h4>
                    ) : null}
                    {leaf.frontSubtitle ? (
                      <p className="line-clamp-1 text-[10px] font-medium text-zinc-300/70">
                        {leaf.frontSubtitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div
                  className="absolute inset-0 size-full overflow-hidden bg-zinc-950"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: parsedRadius,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leaf.backImage}
                    alt={leaf.backTitle ?? `Page ${index * 2 + 2}`}
                    className="pointer-events-none size-full object-cover select-none"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/35 to-transparent p-3.5 text-white">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      {leaf.backBadge ? (
                        <span
                          className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md"
                          style={{
                            color: accentColor,
                            backgroundColor: `${accentColor}20`,
                          }}
                        >
                          {leaf.backBadge}
                        </span>
                      ) : (
                        <span />
                      )}
                      {showPageNumbers ? (
                        <span className="font-mono text-[10px] text-zinc-300/80">
                          {index * 2 + 2}
                        </span>
                      ) : null}
                    </div>
                    {leaf.backTitle ? (
                      <h4 className="line-clamp-1 text-xs font-semibold tracking-tight text-white drop-shadow-sm sm:text-sm">
                        {leaf.backTitle}
                      </h4>
                    ) : null}
                    {leaf.backSubtitle ? (
                      <p className="line-clamp-1 text-[10px] font-medium text-zinc-300/70">
                        {leaf.backSubtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showControls ? (
        <div className="mt-4 flex select-none items-center justify-center gap-3">
          <button
            type="button"
            onClick={flipPrev}
            disabled={currentTurned === 0}
            aria-label="Previous page"
            className="flex cursor-pointer items-center gap-1 rounded-[12px] border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeftIcon className="icon-dir size-3.5" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            onClick={resetBook}
            disabled={currentTurned === 0}
            aria-label="Reset book"
            className="flex cursor-pointer items-center gap-1 rounded-[12px] border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <RotateCcwIcon className="size-3" />
            <span>Reset</span>
          </button>

          <div className="rounded-[12px] border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground shadow-xs">
            <span className="font-semibold text-foreground">
              {currentTurned}
            </span>
            <span className="opacity-50"> / </span>
            <span>{totalLeaves} leaves</span>
          </div>

          <button
            type="button"
            onClick={flipNext}
            disabled={currentTurned === totalLeaves}
            aria-label="Next page"
            className="flex cursor-pointer items-center gap-1 rounded-[12px] border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-all hover:bg-muted hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <span>Next</span>
            <ChevronRightIcon className="icon-dir size-3.5" />
          </button>
        </div>
      ) : null}
    </div>
  )
})

ImagePageflip.displayName = "ImagePageflip"

export default ImagePageflip
export const ThreeDImagePageflip = ImagePageflip
