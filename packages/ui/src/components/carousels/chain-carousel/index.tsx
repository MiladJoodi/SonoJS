"use client"

import * as React from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { SearchIcon, XIcon } from "lucide-react"

import { Input } from "@sonojs/ui/components/input"
import { cn } from "@sonojs/ui/lib/utils"

import {
  DEFAULT_CHAIN_CAROUSEL_ITEMS,
  type ChainCarouselItem,
} from "./items"

export { DEFAULT_CHAIN_CAROUSEL_ITEMS } from "./items"
export type { ChainCarouselItem }

type AnimatedChainItem = ChainCarouselItem & {
  distanceFromCenter: number
  originalIndex: number
}

export type ChainCarouselProps = {
  /** Items in the rotating chain. Defaults to bundled demos. */
  items?: ChainCarouselItem[]
  /** Auto-scroll interval in ms. */
  scrollSpeedMs?: number
  /** Visible cards (odd preferred; even is bumped by 1). */
  visibleItemCount?: number
  className?: string
  /** Fires when an item is chosen from search. */
  onChainSelect?: (
    chainId: ChainCarouselItem["id"],
    chainName: string
  ) => void
}

function CarouselItemCard({
  chain,
  side,
}: {
  chain: AnimatedChainItem
  side: "start" | "end"
}) {
  const { distanceFromCenter, id, name, details, logo, icon: FallbackIcon } =
    chain
  const distance = Math.abs(distanceFromCenter)
  const opacity = Math.max(0.2, 1 - distance / 3.6)
  const scale = 1 - distance * 0.09
  const yOffset = distanceFromCenter * 78
  const xOffset = side === "start" ? -distance * 42 : distance * 42
  const isNear = distance <= 1

  return (
    <motion.div
      key={id}
      className={cn(
        "absolute flex items-center gap-3",
        side === "start" ? "flex-row-reverse" : "flex-row"
      )}
      animate={{
        opacity,
        scale,
        y: yOffset,
        x: xOffset,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <div
        className={cn(
          "relative rounded-full border p-1.5 transition-colors",
          isNear
            ? "border-foreground/30 bg-foreground shadow-soft"
            : "border-border/70 bg-card"
        )}
      >
        {logo ? (
          <img
            src={logo}
            alt=""
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <FallbackIcon
            className={cn(
              "size-7",
              isNear ? "text-background" : "text-foreground"
            )}
            aria-hidden
          />
        )}
        {distance === 0 ? (
          <span
            aria-hidden
            className="absolute -inset-1 animate-pulse rounded-full border border-primary/40"
          />
        ) : null}
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-col",
          side === "start" ? "text-end" : "text-start"
        )}
      >
        <span
          className={cn(
            "truncate text-sm font-semibold lg:text-base",
            isNear ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {name}
        </span>
        {details ? (
          <span className="truncate text-[11px] text-muted-foreground lg:text-xs">
            {details}
          </span>
        ) : null}
      </div>
    </motion.div>
  )
}

/**
 * Dual-rail picker - linked beads, glass hub, searchable jump.
 */
export function ChainCarousel({
  items = DEFAULT_CHAIN_CAROUSEL_ITEMS,
  scrollSpeedMs = 1600,
  visibleItemCount = 9,
  className,
  onChainSelect,
}: ChainCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showDropdown, setShowDropdown] = React.useState(false)

  const rootRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(rootRef, {
    margin: "-80px 0px -80px 0px",
  })
  const totalItems = items.length
  const mobileStrip = React.useMemo(() => {
    if (totalItems === 0) return []
    const half = 2
    const out: AnimatedChainItem[] = []
    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i
      if (index < 0) index += totalItems
      if (index >= totalItems) index -= totalItems
      out.push({
        ...items[index]!,
        originalIndex: index,
        distanceFromCenter: i,
      })
    }
    return out
  }, [currentIndex, items, totalItems])

  React.useEffect(() => {
    if (isPaused || totalItems === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }, scrollSpeedMs)

    return () => clearInterval(interval)
  }, [isPaused, totalItems, scrollSpeedMs])

  React.useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const handleScroll = () => {
      setIsPaused(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsPaused(false)
      }, 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const getVisibleItems = React.useCallback((): AnimatedChainItem[] => {
    if (totalItems === 0) return []

    const itemsToShow =
      visibleItemCount % 2 === 0 ? visibleItemCount + 1 : visibleItemCount
    const half = Math.floor(itemsToShow / 2)
    const visibleItems: AnimatedChainItem[] = []

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i
      if (index < 0) index += totalItems
      if (index >= totalItems) index -= totalItems

      visibleItems.push({
        ...items[index]!,
        originalIndex: index,
        distanceFromCenter: i,
      })
    }
    return visibleItems
  }, [currentIndex, items, totalItems, visibleItemCount])

  const filteredItems = React.useMemo(() => {
    const q = searchTerm.toLowerCase()
    return items.filter((item) => item.name.toLowerCase().includes(q))
  }, [items, searchTerm])

  const handleSelectChain = (
    id: ChainCarouselItem["id"],
    name: string
  ) => {
    const index = items.findIndex((c) => c.id === id)
    if (index !== -1) {
      setCurrentIndex(index)
      setIsPaused(true)
      onChainSelect?.(id, name)
    }
    setSearchTerm(name)
    setShowDropdown(false)
  }

  const currentItem = items[currentIndex]
  const visible = getVisibleItems()

  return (
    <div ref={rootRef} className={cn("w-full overflow-x-clip", className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-4 py-6 md:px-8 xl:flex-row xl:gap-6 xl:py-10">
        <motion.div
          className="relative -start-10 hidden h-[460px] w-full max-w-md items-center justify-center xl:flex xl:max-w-xl"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: "-40%", opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
        >
          <div
            aria-hidden
            className="absolute end-8 top-1/2 h-[70%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
          />
          {visible.map((chain) => (
            <CarouselItemCard
              key={`start-${chain.id}`}
              chain={chain}
              side="start"
            />
          ))}
        </motion.div>

        <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 text-center">
          {/* Mobile neighbor strip (rails are xl-only) */}
          <div className="flex w-full items-center justify-center gap-2 xl:hidden">
            {mobileStrip.map((chain) => {
              const selected = chain.distanceFromCenter === 0
              return (
                <button
                  key={`mobile-${chain.id}`}
                  type="button"
                  aria-label={chain.name}
                  aria-current={selected ? "true" : undefined}
                  onClick={() => {
                    setCurrentIndex(chain.originalIndex)
                    setIsPaused(true)
                    window.setTimeout(() => setIsPaused(false), 1800)
                  }}
                  className={cn(
                    "flex size-11 cursor-pointer items-center justify-center rounded-full border transition-all",
                    selected
                      ? "scale-110 border-foreground/40 bg-foreground shadow-soft"
                      : "border-border/70 bg-card opacity-70 hover:opacity-100"
                  )}
                >
                  {chain.logo ? (
                    <img
                      src={chain.logo}
                      alt=""
                      className="size-7 rounded-full object-cover"
                    />
                  ) : (
                    <chain.icon
                      className={cn(
                        "size-5",
                        selected ? "text-background" : "text-foreground"
                      )}
                      aria-hidden
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="relative flex flex-col items-center">
            <div
              aria-hidden
              className="absolute size-36 rounded-full bg-primary/15 blur-2xl"
            />
            <AnimatePresence mode="wait">
              {currentItem ? (
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="relative flex flex-col items-center"
                >
                  <div className="rounded-full border border-border/70 bg-card/90 p-3 shadow-soft backdrop-blur-md">
                    <div className="rounded-full bg-foreground p-3">
                      {currentItem.logo ? (
                        <img
                          src={currentItem.logo}
                          alt=""
                          className="size-12 rounded-full object-cover"
                        />
                      ) : (
                        <currentItem.icon
                          className="size-10 text-background"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground xl:text-2xl">
                    {currentItem.name}
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                    {currentItem.details || "View details"}
                  </p>
                  <p className="mt-3 font-mono text-[11px] tracking-wider text-muted-foreground/80 tabular-nums">
                    {String(currentIndex + 1).padStart(2, "0")}
                    <span className="mx-1 opacity-40">/</span>
                    {String(totalItems).padStart(2, "0")}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative flex items-center px-1 sm:px-3">
              <SearchIcon
                className="pointer-events-none absolute start-4 size-4 text-muted-foreground sm:start-6"
                aria-hidden
              />
              <Input
                type="text"
                value={searchTerm}
                placeholder="Jump to an item…"
                onChange={(e) => {
                  const val = e.target.value
                  setSearchTerm(val)
                  setShowDropdown(val.length > 0)
                  if (val === "") setIsPaused(false)
                }}
                onFocus={() => {
                  if (searchTerm.length > 0) setShowDropdown(true)
                  setIsPaused(true)
                }}
                onBlur={() => {
                  window.setTimeout(() => setShowDropdown(false), 200)
                }}
                className="h-[46px] cursor-text rounded-full border-border/70 ps-10 pe-10"
                aria-autocomplete="list"
                aria-expanded={showDropdown}
              />
              {searchTerm ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("")
                    setShowDropdown(false)
                    setIsPaused(false)
                  }}
                  className="absolute end-4 flex size-10 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground sm:end-6"
                  aria-label="Clear search"
                >
                  <XIcon className="size-4" />
                </button>
              ) : null}
            </div>

            {showDropdown && filteredItems.length > 0 ? (
              <div className="absolute inset-x-0 z-20 mt-2 max-h-60 overflow-y-auto rounded-[12px] border border-border/70 bg-card/95 shadow-soft backdrop-blur-md">
                {filteredItems.slice(0, 10).map((chain) => (
                  <div
                    key={chain.id}
                    role="option"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      handleSelectChain(chain.id, chain.name)
                    }}
                    className="m-1.5 flex min-h-[46px] cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/60"
                  >
                    {chain.logo ? (
                      <img
                        src={chain.logo}
                        alt=""
                        className="size-6 rounded-full object-cover"
                      />
                    ) : (
                      <chain.icon
                        className="size-5 text-primary"
                        aria-hidden
                      />
                    )}
                    <span className="font-medium text-foreground">
                      {chain.name}
                    </span>
                    {chain.details ? (
                      <span className="ms-auto truncate text-xs text-muted-foreground">
                        {chain.details}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <motion.div
          className="relative -end-10 hidden h-[460px] w-full max-w-md items-center justify-center xl:flex xl:max-w-xl"
          onMouseEnter={() => !searchTerm && setIsPaused(true)}
          onMouseLeave={() => !searchTerm && setIsPaused(false)}
          initial={{ x: "40%", opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
        >
          <div
            aria-hidden
            className="absolute start-8 top-1/2 h-[70%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
          />
          {visible.map((chain) => (
            <CarouselItemCard
              key={`end-${chain.id}`}
              chain={chain}
              side="end"
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default ChainCarousel
