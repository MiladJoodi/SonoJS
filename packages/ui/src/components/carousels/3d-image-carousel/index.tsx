"use client"

import * as React from "react"
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_3D_IMAGE_CAROUSEL_SLIDES,
  type ThreeDImageCarouselSlide,
} from "./slides"

export { DEFAULT_3D_IMAGE_CAROUSEL_SLIDES } from "./slides"
export type { ThreeDImageCarouselSlide }

export type ThreeDImageCarouselProps = {
  /** Slide images with optional link targets. */
  slides?: ThreeDImageCarouselSlide[]
  /** Visible stack depth - 3 (compact) or 5 (wide). */
  itemCount?: 3 | 5
  /** Advance automatically while mounted. */
  autoplay?: boolean
  /** Seconds between autoplay steps. */
  delay?: number
  /** Pause autoplay while the pointer is over the stage. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Cascade / stack carousel CSS - structural transforms only.
 * Arrow sides use logical start/end via [dir=rtl] swaps below.
 */
const EMBEDDED_CSS = `
.cascade-slider_container {
  position: relative;
  max-width: 1000px;
  width: 100%;
  margin-inline: auto;
  z-index: 20;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
}
.cascade-slider_slides {
  position: relative;
  height: 100%;
}
.cascade-slider_item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%) scale(0.3);
  transition: all 1s ease;
  opacity: 0;
  z-index: 1;
  cursor: grab;
}
.cascade-slider_item.now {
  cursor: default;
}
.cascade-slider_item:active {
  cursor: grabbing;
}
.cascade-slider_item.next {
  left: 50%;
  transform: translateY(-50%) translateX(-120%) scale(0.6);
  opacity: 1;
  z-index: 4;
}
.cascade-slider_item.prev {
  left: 50%;
  transform: translateY(-50%) translateX(20%) scale(0.6);
  opacity: 1;
  z-index: 4;
}
.cascade-slider_item.now {
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%) scale(1);
  opacity: 1;
  z-index: 5;
}
.cascade-slider_arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  z-index: 6;
  transform: translate(0, -50%);
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}
@media screen and (max-width: 575px) {
  .cascade-slider_arrow-start { inset-inline-start: 5px; }
  .cascade-slider_arrow-end { inset-inline-end: 5px; }
}
@media screen and (min-width: 576px) {
  .cascade-slider_arrow-start { inset-inline-start: -4%; }
  .cascade-slider_arrow-end { inset-inline-end: -4%; }
}
.cascade-slider_slides img {
  max-width: 150px;
  height: auto;
  border-radius: 35px;
  display: block;
  transition: filter 1s ease;
}
.cascade-slider_item:not(.now) img {
  filter: grayscale(0.95);
}
@media screen and (min-width: 414px) {
  .cascade-slider_container { height: 40vh; min-height: 14rem; }
  .cascade-slider_slides img { max-width: 200px; }
}
@media screen and (min-width: 576px) {
  .cascade-slider_container { height: 60vh; min-height: 16rem; }
  .cascade-slider_slides img { max-width: 270px; }
}
@media screen and (min-width: 768px) {
  .cascade-slider_item.next { transform: translateY(-50%) translateX(-125%) scale(0.6); }
  .cascade-slider_item.prev { transform: translateY(-50%) translateX(25%) scale(0.6); }
  .cascade-slider_slides img { max-width: 250px; }
}
@media screen and (min-width: 991px) {
  .cascade-slider_item.next { transform: translateY(-50%) translateX(-115%) scale(0.55); z-index: 4; }
  .cascade-slider_item.prev { transform: translateY(-50%) translateX(15%) scale(0.55); z-index: 4; }
  .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-150%) scale(0.37); z-index: 1; }
  .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(50%) scale(0.37); z-index: 2; }
  .cascade-slider_slides img { max-width: 300px; }
  .cascade-slider_container { height: 37vh; min-height: 18rem; }
}
@media screen and (min-width: 1100px) {
  .cascade-slider_item.next { transform: translateY(-50%) translateX(-130%) scale(0.55); }
  .cascade-slider_item.prev { transform: translateY(-50%) translateX(30%) scale(0.55); }
  .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-180%) scale(0.37); }
  .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(80%) scale(0.37); }
  .cascade-slider_slides img { max-width: 350px; }
}
`

function getSlideClasses(
  index: number,
  activeIndex: number,
  total: number,
  visibleCount: 3 | 5
): string {
  const diff = index - activeIndex
  if (diff === 0) return "now"
  if (diff === 1 || diff === -total + 1) return "next"
  if (visibleCount === 5 && (diff === 2 || diff === -total + 2)) return "next2"
  if (diff === -1 || diff === total - 1) return "prev"
  if (visibleCount === 5 && (diff === -2 || diff === total - 2)) return "prev2"
  return ""
}

export function ThreeDImageCarousel({
  slides = DEFAULT_3D_IMAGE_CAROUSEL_SLIDES,
  itemCount = 5,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  className,
}: ThreeDImageCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const autoplayIntervalRef = React.useRef<number | null>(null)
  const total = slides.length

  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const swipeThreshold = 50

  const navigate = React.useCallback(
    (direction: "next" | "prev") => {
      if (total < 1) return
      setActiveIndex((current) => {
        if (direction === "next") return (current + 1) % total
        return (current - 1 + total) % total
      })
    },
    [total]
  )

  const stopAutoplay = React.useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    }
  }, [])

  const startAutoplay = React.useCallback(() => {
    if (!autoplay || total <= 1) return
    stopAutoplay()
    autoplayIntervalRef.current = window.setInterval(() => {
      navigate("next")
    }, delay * 1000)
  }, [autoplay, delay, navigate, stopAutoplay, total])

  React.useEffect(() => {
    startAutoplay()
    return () => {
      stopAutoplay()
    }
  }, [startAutoplay, stopAutoplay])

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) stopAutoplay()
  }

  const handleEnd = React.useCallback(
    (clientX: number) => {
      if (!isDragging) return
      const distance = clientX - startX
      if (Math.abs(distance) > swipeThreshold) {
        if (distance < 0) navigate("next")
        else navigate("prev")
      }
      setIsDragging(false)
      setStartX(0)
    },
    [isDragging, navigate, startX]
  )

  const handleExit = (e: React.MouseEvent) => {
    if (autoplay && pauseOnHover) startAutoplay()
    if (isDragging) handleEnd(e.clientX)
  }

  const handleStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    stopAutoplay()
  }

  if (total < 1) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EMBEDDED_CSS }} />
      <div
        className={cn(
          "cascade-slider_container bg-transparent",
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleExit}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseUp={(e) => {
          handleEnd(e.clientX)
          startAutoplay()
        }}
        onTouchStart={(e) => handleStart(e.touches[0]?.clientX ?? 0)}
        onTouchEnd={(e) => {
          handleEnd(e.changedTouches[0]?.clientX ?? 0)
          startAutoplay()
        }}
      >
        <div className="cascade-slider_slides">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "cascade-slider_item",
                getSlideClasses(index, activeIndex, total, itemCount)
              )}
              data-slide-number={index}
            >
              <a href={slide.href} className="cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.src} alt={`Slide ${index + 1}`} draggable={false} />
              </a>
            </div>
          ))}
        </div>

        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="cascade-slider_arrow cascade-slider_arrow-start cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
              onClick={(e) => {
                e.stopPropagation()
                navigate("prev")
              }}
            >
              <ArrowLeftCircleIcon
                aria-hidden
                className="size-7.5 icon-dir"
              />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="cascade-slider_arrow cascade-slider_arrow-end cursor-pointer rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/60"
              onClick={(e) => {
                e.stopPropagation()
                navigate("next")
              }}
            >
              <ArrowRightCircleIcon
                aria-hidden
                className="size-7.5 icon-dir"
              />
            </button>
          </>
        ) : null}
      </div>
    </>
  )
}

export default ThreeDImageCarousel
