"use client"

import * as React from "react"
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react"

import { cn } from "@sonojs/ui/lib/utils"

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

function toVelocityFactor(v: number) {
  const sign = v < 0 ? -1 : 1
  const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5)
  return sign * magnitude
}

const ScrollTriggerContext = React.createContext<MotionValue<number> | null>(
  null
)

export type ScrollTriggerContainerProps = React.HTMLAttributes<HTMLDivElement>

export function ScrollTriggerContainer({
  children,
  className,
  ...props
}: ScrollTriggerContainerProps) {
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, toVelocityFactor)

  return (
    <ScrollTriggerContext.Provider value={velocityFactor}>
      <div
        className={cn("relative w-full overflow-hidden", className)}
        {...props}
      >
        {children}
      </div>
    </ScrollTriggerContext.Provider>
  )
}

export type ScrollTriggerRowProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  /** Base speed as a percent of one content block width per second. Default 5. */
  baseVelocity?: number
  /** `1` scrolls one way, `-1` the other. Page scroll velocity modulates both. */
  direction?: 1 | -1
  /** When false, ignore page-scroll speed boost. Default true. */
  scrollReactivity?: boolean
}

export function ScrollTriggerRow(props: ScrollTriggerRowProps) {
  const sharedVelocityFactor = React.useContext(ScrollTriggerContext)
  if (sharedVelocityFactor) {
    return (
      <ScrollTriggerRowImpl {...props} velocityFactor={sharedVelocityFactor} />
    )
  }
  return <ScrollTriggerRowLocal {...props} />
}

type ScrollTriggerRowImplProps = ScrollTriggerRowProps & {
  velocityFactor: MotionValue<number>
}

function ScrollTriggerRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  scrollReactivity = true,
  ...props
}: ScrollTriggerRowImplProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const blockRef = React.useRef<HTMLDivElement>(null)
  const [numCopies, setNumCopies] = React.useState(1)

  const baseX = useMotionValue(0)
  const unitWidth = useMotionValue(0)
  const baseDirectionRef = React.useRef(direction >= 0 ? 1 : -1)
  const currentDirectionRef = React.useRef(direction >= 0 ? 1 : -1)

  const isInViewRef = React.useRef(true)
  const isPageVisibleRef = React.useRef(true)
  const prefersReducedMotionRef = React.useRef(false)

  React.useEffect(() => {
    baseDirectionRef.current = direction >= 0 ? 1 : -1
    currentDirectionRef.current = direction >= 0 ? 1 : -1
  }, [direction])

  React.useEffect(() => {
    const container = containerRef.current
    const block = blockRef.current
    if (!container || !block) return

    const updateSizes = () => {
      const cw = container.offsetWidth || 0
      const bw = block.scrollWidth || 0
      unitWidth.set(bw)
      const nextCopies = bw > 0 ? Math.max(3, Math.ceil(cw / bw) + 2) : 1
      setNumCopies((prev) => (prev === nextCopies ? prev : nextCopies))
    }

    updateSizes()

    const ro = new ResizeObserver(updateSizes)
    ro.observe(container)
    ro.observe(block)

    const io = new IntersectionObserver(([entry]) => {
      isInViewRef.current = entry?.isIntersecting ?? true
    })
    io.observe(container)

    const handleVisibility = () => {
      isPageVisibleRef.current = document.visibilityState === "visible"
    }
    document.addEventListener("visibilitychange", handleVisibility, {
      passive: true,
    })
    handleVisibility()

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handlePRM = () => {
      prefersReducedMotionRef.current = mq.matches
    }
    mq.addEventListener("change", handlePRM)
    handlePRM()

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      mq.removeEventListener("change", handlePRM)
    }
  }, [children, unitWidth])

  const x = useTransform([baseX, unitWidth], ([v, bw]) => {
    const width = Number(bw) || 1
    const offset = Number(v) || 0
    return `${-wrap(0, width, offset)}px`
  })

  useAnimationFrame((_, delta) => {
    if (!isInViewRef.current || !isPageVisibleRef.current) return
    if (prefersReducedMotionRef.current) return

    const dt = delta / 1000
    const vf = scrollReactivity ? velocityFactor.get() : 0
    const absVf = Math.min(5, Math.abs(vf))
    const speedMultiplier = 1 + absVf

    if (absVf > 0.1) {
      const scrollDirection = vf >= 0 ? 1 : -1
      currentDirectionRef.current = baseDirectionRef.current * scrollDirection
    }

    const bw = unitWidth.get() || 0
    if (bw <= 0) return

    const pixelsPerSecond = (bw * baseVelocity) / 100
    const moveBy =
      currentDirectionRef.current * pixelsPerSecond * speedMultiplier * dt
    baseX.set(baseX.get() + moveBy)
  })

  const copies = React.useMemo(
    () => Array.from({ length: numCopies }, (_, i) => i),
    [numCopies]
  )

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
      {...props}
    >
      <motion.div
        className="inline-flex transform-gpu items-center will-change-transform select-none"
        style={{ x }}
      >
        {copies.map((i) => (
          <div
            key={i}
            ref={i === 0 ? blockRef : undefined}
            aria-hidden={i !== 0}
            className="inline-flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function ScrollTriggerRowLocal(props: ScrollTriggerRowProps) {
  const { scrollY } = useScroll()
  const localVelocity = useVelocity(scrollY)
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const localVelocityFactor = useTransform(
    localSmoothVelocity,
    toVelocityFactor
  )
  return (
    <ScrollTriggerRowImpl {...props} velocityFactor={localVelocityFactor} />
  )
}

export const ThreeDScrollTriggerContainer = ScrollTriggerContainer
export const ThreeDScrollTriggerRow = ScrollTriggerRow
