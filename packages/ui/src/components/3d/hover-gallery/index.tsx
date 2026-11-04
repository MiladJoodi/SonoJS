"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@sonojs/ui/lib/utils"

import image01 from "./images/01.jpg"
import image02 from "./images/02.jpg"
import image03 from "./images/03.jpg"
import image04 from "./images/04.jpg"
import image05 from "./images/05.jpg"
import image06 from "./images/06.jpg"
import image07 from "./images/07.jpg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export type HoverGalleryItem = {
  url: string
  title: string
  category: string
  description: string
  /** Soft active glow (CSS color). */
  glow?: string
}

export type HoverGalleryProps = {
  /** Image URLs only - metadata falls back to the demo set. */
  images?: string[]
  /** Full gallery items (preferred). */
  items?: HoverGalleryItem[]
  itemHeight?: string | number
  gap?: number
  perspective?: number
  hoverScale?: number
  transitionDuration?: number
  enableKeyboardNavigation?: boolean
  autoPlay?: boolean
  autoPlayDelay?: number
  className?: string
  style?: React.CSSProperties
  onImageClick?: (index: number, item: HoverGalleryItem) => void
  onImageHover?: (index: number, item: HoverGalleryItem) => void
}

const DEFAULT_ITEMS: HoverGalleryItem[] = [
  {
    url: assetSrc(image01),
    title: "Neon Rails",
    category: "City",
    description: "Rain-slick streets and long exposures under city lights.",
    glow: "color-mix(in oklab, var(--primary) 35%, transparent)",
  },
  {
    url: assetSrc(image02),
    title: "Soft Geometry",
    category: "Abstract",
    description: "Fluid shapes and high-contrast pastel textures.",
    glow: "color-mix(in oklab, var(--primary) 28%, transparent)",
  },
  {
    url: assetSrc(image03),
    title: "Orbit Map",
    category: "Science",
    description: "Data nodes mapping connections across a quiet globe.",
    glow: "color-mix(in oklab, var(--primary) 32%, transparent)",
  },
  {
    url: assetSrc(image04),
    title: "Calm Columns",
    category: "Art",
    description: "Dreamlike structures rising from still water.",
    glow: "color-mix(in oklab, var(--primary) 30%, transparent)",
  },
  {
    url: assetSrc(image05),
    title: "Line Speed",
    category: "Motion",
    description: "Tight curves and carbon fiber catching studio light.",
    glow: "color-mix(in oklab, var(--primary) 34%, transparent)",
  },
  {
    url: assetSrc(image06),
    title: "Shadow Planes",
    category: "Architecture",
    description: "Brutalist angles playing with hard architectural shade.",
    glow: "color-mix(in oklab, var(--primary) 26%, transparent)",
  },
  {
    url: assetSrc(image07),
    title: "Deep Field",
    category: "Space",
    description: "Dust clouds and stellar nurseries across quiet dark.",
    glow: "color-mix(in oklab, var(--primary) 30%, transparent)",
  },
]

export function HoverGallery({
  images,
  items,
  itemHeight = 420,
  gap = 10,
  perspective = 1000,
  hoverScale = 1.05,
  transitionDuration = 0.5,
  enableKeyboardNavigation = true,
  autoPlay = false,
  autoPlayDelay = 4000,
  className,
  style,
  onImageClick,
  onImageHover,
}: HoverGalleryProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null)

  const galleryItems = React.useMemo(() => {
    if (items && items.length > 0) return items
    if (images && images.length > 0) {
      return images.map((url, index) => {
        const fallback = DEFAULT_ITEMS[index % DEFAULT_ITEMS.length]!
        return {
          url,
          title: fallback.title,
          category: fallback.category,
          description: fallback.description,
          glow: fallback.glow,
        }
      })
    }
    return DEFAULT_ITEMS
  }, [images, items])

  React.useEffect(() => {
    if (!autoPlay || galleryItems.length === 0) return
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      if (reduce.matches) return
    }

    const id = window.setInterval(() => {
      setActiveIndex((prev) =>
        prev === null ? 0 : (prev + 1) % galleryItems.length
      )
    }, autoPlayDelay)

    return () => window.clearInterval(id)
  }, [autoPlay, autoPlayDelay, galleryItems.length])

  const handleImageClick = (index: number, item: HoverGalleryItem) => {
    setActiveIndex((prev) => (prev === index ? null : index))
    onImageClick?.(index, item)
  }

  const handleImageHover = (index: number, item: HoverGalleryItem) => {
    if (!autoPlay) setActiveIndex(index)
    onImageHover?.(index, item)
  }

  const handleImageLeave = () => {
    if (!autoPlay) setActiveIndex(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (!enableKeyboardNavigation) return
    const item = galleryItems[index]
    if (!item) return

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault()
        handleImageClick(index, item)
        break
      case "ArrowLeft": {
        event.preventDefault()
        const prevIndex = index > 0 ? index - 1 : galleryItems.length - 1
        ;(containerRef.current?.children[prevIndex] as HTMLElement | undefined)?.focus()
        break
      }
      case "ArrowRight": {
        event.preventDefault()
        const nextIndex = index < galleryItems.length - 1 ? index + 1 : 0
        ;(containerRef.current?.children[nextIndex] as HTMLElement | undefined)?.focus()
        break
      }
      case "Escape":
        setActiveIndex(null)
        break
    }
  }

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center overflow-hidden py-4",
        className
      )}
      style={style}
      onMouseLeave={handleImageLeave}
    >
      <div
        ref={containerRef}
        className="flex w-full items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
          gap: `${gap}px`,
        }}
      >
        {galleryItems.map((item, index) => {
          const isActive = activeIndex === index
          const isFocused = focusedIndex === index

          return (
            <motion.div
              key={`${item.url}-${index}`}
              role="button"
              tabIndex={enableKeyboardNavigation ? 0 : -1}
              onClick={() => handleImageClick(index, item)}
              onMouseEnter={() => handleImageHover(index, item)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={item.title}
              aria-pressed={isActive}
              layout
              animate={{
                rotateY:
                  activeIndex === null
                    ? 0
                    : index < activeIndex
                      ? 24
                      : index > activeIndex
                        ? -24
                        : 0,
              }}
              transition={{
                layout: { type: "spring", stiffness: 100, damping: 17 },
                rotateY: { type: "spring", stiffness: 90, damping: 15 },
              }}
              style={{
                height:
                  typeof itemHeight === "number"
                    ? `${itemHeight}px`
                    : itemHeight,
                zIndex: isActive ? 20 : 10,
                flex: isActive ? 5.8 : 1,
                minWidth: isActive ? "280px" : "60px",
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "relative cursor-pointer select-none overflow-hidden rounded-[12px] border bg-muted/40 shadow-sm transition-[border-color,filter] duration-300",
                isActive
                  ? "border-border/80"
                  : activeIndex === null
                    ? "border-border/50 brightness-[0.85] grayscale-[0.2] hover:border-border dark:brightness-[0.75]"
                    : "border-border/30 brightness-[0.45] grayscale dark:brightness-[0.35]",
                isFocused &&
                  "scale-[1.01] border-primary/50 ring-2 ring-ring/60 ring-offset-2 ring-offset-background"
              )}
            >
              {isActive && item.glow ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 rounded-[12px] transition-all duration-500"
                  style={{
                    boxShadow: `inset 0 0 20px ${item.glow}, 0 0 15px ${item.glow}`,
                  }}
                />
              ) : null}

              <motion.div
                animate={{ scale: isActive ? hoverScale : 1 }}
                transition={{
                  duration: transitionDuration,
                  ease: [0.1, 0.7, 0, 1],
                }}
                className="absolute inset-0 h-full w-full"
                style={{
                  backgroundImage: `url(${item.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 z-2 bg-linear-to-t transition-opacity duration-300",
                  isActive
                    ? "from-black/90 via-black/40 to-black/10 opacity-100"
                    : "from-black/60 via-transparent to-transparent opacity-40"
                )}
              />

              <div className="absolute inset-0 z-4 flex flex-col justify-end overflow-hidden p-5 text-white">
                <AnimatePresence>
                  {isActive ? (
                    <div key="overlay" className="flex w-full flex-col items-start">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, delay: 0.05 }}
                        className="mb-1 text-[9px] font-semibold tracking-widest text-primary uppercase"
                      >
                        {item.category}
                      </motion.span>

                      <motion.h4
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mb-1 text-base leading-tight font-semibold tracking-tight text-zinc-50 md:text-lg lg:text-xl"
                      >
                        {item.title}
                      </motion.h4>

                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 0.75, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        className="mb-3 max-w-[280px] text-[11px] leading-relaxed font-medium tracking-wide text-zinc-300 sm:max-w-sm md:text-xs"
                      >
                        {item.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="group/btn flex items-center gap-1 text-[9px] font-semibold tracking-widest text-zinc-100 uppercase"
                      >
                        <span>Explore</span>
                        <ArrowRightIcon className="icon-dir size-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                      </motion.div>
                    </div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default HoverGallery
