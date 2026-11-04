"use client"

import * as React from "react"
import {
  animate,
  motion,
  useMotionValue,
  type Variants,
} from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_ANGLED_SLIDER_ITEMS,
  type AngledSliderItem,
} from "./items"

export { DEFAULT_ANGLED_SLIDER_ITEMS } from "./items"
export type { AngledSliderItem }

export type AngledSliderProps = {
  /** Cards to marquee. Defaults to bundled demo images. */
  items?: AngledSliderItem[]
  /** Seconds for one full loop (higher = slower). */
  speed?: number
  /** Marquee direction. */
  direction?: "left" | "right"
  /** Stage height (CSS length). */
  containerHeight?: string
  /** Card width (CSS length). */
  cardWidth?: string
  /** Gap between cards (CSS length). */
  gap?: string
  /** Resting rotateY angle in degrees. */
  angle?: number
  /** Scale while a card is hovered. */
  hoverScale?: number
  className?: string
}

const cardVariants: Variants = {
  offHover: (angle: number) => ({
    rotateY: angle,
    z: 40,
    opacity: 0.88,
    scale: 1,
    y: 0,
    zIndex: 20,
    transition: {
      type: "spring",
      mass: 2.4,
      stiffness: 320,
      damping: 36,
    },
  }),
  onHover: (hoverScale: number) => ({
    rotateY: 0,
    z: 160,
    opacity: 1,
    scale: hoverScale,
    y: -10,
    zIndex: 50,
    transition: {
      type: "spring",
      mass: 2.2,
      stiffness: 360,
      damping: 32,
    },
  }),
}

function AngledCard({
  item,
  angle,
  hoverScale,
  cardWidth,
  index,
}: {
  item: AngledSliderItem
  angle: number
  hoverScale: number
  cardWidth: string
  index: number
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      className="group relative shrink-0 cursor-pointer overflow-visible"
      style={{
        width: cardWidth,
        height: "100%",
        transformStyle: "preserve-3d",
      }}
      custom={hovered ? hoverScale : angle}
      variants={cardVariants}
      initial="offHover"
      animate={hovered ? "onHover" : "offHover"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-border/70 bg-muted shadow-soft">
        <img
          src={item.url}
          alt={item.alt || item.title || "Slide"}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          loading="lazy"
          decoding="async"
          draggable={false}
        />

        {/* Editorial index stamp */}
        <div className="absolute start-3 top-3 z-10 rounded-md border border-white/20 bg-black/35 px-2 py-1 font-mono text-[10px] tracking-widest text-white/90 backdrop-blur-md">
          {String((index % 100) + 1).padStart(2, "0")}
        </div>

        {/* Shine - hover-capable pointers only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 [@media(hover:hover)]:group-hover:translate-x-full [@media(hover:hover)]:group-hover:opacity-100 rtl:translate-x-full [@media(hover:hover)]:rtl:group-hover:-translate-x-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

        {item.title ? (
          <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
            <p className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-white/60 uppercase">
              Featured
            </p>
            <h3 className="text-base leading-tight font-semibold tracking-tight sm:text-lg">
              {item.title}
            </h3>
          </div>
        ) : null}
      </div>
    </motion.div>
  )
}

/**
 * Editorial angled marquee - posters straighten and lift on hover.
 */
export function AngledSlider({
  items = DEFAULT_ANGLED_SLIDER_ITEMS,
  speed = 42,
  direction = "left",
  containerHeight = "min(420px, 70vw)",
  cardWidth = "min(72vw, 280px)",
  gap = "20px",
  angle = 14,
  hoverScale = 1.05,
  className,
}: AngledSliderProps) {
  const [loopWidth, setLoopWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const duplicatedItems = React.useMemo(
    () => [...items, ...items, ...items],
    [items]
  )

  React.useEffect(() => {
    const calculateWidth = () => {
      const track = trackRef.current
      if (!track) return
      // One loop = first third of the tripled track
      setLoopWidth(track.scrollWidth / 3)
    }

    calculateWidth()
    window.addEventListener("resize", calculateWidth)
    const ro = trackRef.current
      ? new ResizeObserver(calculateWidth)
      : null
    if (trackRef.current && ro) ro.observe(trackRef.current)
    return () => {
      window.removeEventListener("resize", calculateWidth)
      ro?.disconnect()
    }
  }, [items.length, cardWidth, gap])

  React.useEffect(() => {
    if (loopWidth <= 0 || isPaused) return

    const startX = direction === "left" ? 0 : -loopWidth
    const endX = direction === "left" ? -loopWidth : 0

    let stopped = false
    let controls: ReturnType<typeof animate> | null = null

    const runAnimation = () => {
      if (stopped) return
      const currentX = x.get()
      const dist = Math.abs(endX - currentX)
      const duration = speed * (dist / loopWidth)

      controls = animate(x, endX, {
        duration,
        ease: "linear",
        onComplete: () => {
          if (stopped) return
          x.set(startX)
          runAnimation()
        },
      })
    }

    runAnimation()

    return () => {
      stopped = true
      controls?.stop()
    }
  }, [loopWidth, speed, direction, isPaused, x])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-full overflow-hidden py-8 sm:py-12",
        className
      )}
      style={{
        height: containerHeight,
        perspective: "1000px",
        touchAction: "pan-y",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
      role="region"
      aria-label="Angled poster slider"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 start-0 z-20 w-10 bg-gradient-to-r from-card to-transparent sm:w-20 rtl:bg-gradient-to-l"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 z-20 w-10 bg-gradient-to-l from-card to-transparent sm:w-20 rtl:bg-gradient-to-r"
      />

      <motion.div
        ref={trackRef}
        className="flex h-full items-center"
        style={{ x, gap, transformStyle: "preserve-3d" }}
      >
        {duplicatedItems.map((item, index) => (
          <AngledCard
            key={`${item.id}-${index}`}
            item={item}
            angle={angle}
            hoverScale={hoverScale}
            cardWidth={cardWidth}
            index={index % items.length}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default AngledSlider
