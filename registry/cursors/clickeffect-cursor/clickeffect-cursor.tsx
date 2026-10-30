"use client"

import {
  type ReactNode,
  type RefObject,
  Fragment,
  useEffect,
  useState,
} from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

interface Point {
  x: number
  y: number
  id: number
}

export interface ClickEffectCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  children?: ReactNode
}

/**
 * Black-stage click burst: expanding ring + particle spray, soft trail.
 */
export function ClickEffectCursor({
  containerRef,
  className,
  children,
}: ClickEffectCursorProps) {
  const [mousePosition, setMousePosition] = useState<{
    x: number | null
    y: number | null
  }>({ x: null, y: null })
  const [clicks, setClicks] = useState<Point[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<Point[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const root = containerRef?.current ?? null
    const target: HTMLElement | Window = root ?? window
    let lastTrail = 0

    const toLocal = (e: MouseEvent) => {
      if (root) {
        const rect = root.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }
      return { x: e.clientX, y: e.clientY }
    }

    const updateMousePosition = (e: Event) => {
      const { x, y } = toLocal(e as MouseEvent)
      setMousePosition({ x, y })
      if (reducedMotion) return
      const now = performance.now()
      if (now - lastTrail < 32) return
      lastTrail = now
      setTrail((prev) => [...prev.slice(-16), { x, y, id: Date.now() }])
    }

    const handleClick = (e: Event) => {
      if (reducedMotion) return
      const { x, y } = toLocal(e as MouseEvent)
      const newClick = { x, y, id: Date.now() }
      setClicks((prev) => [...prev, newClick])
      window.setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id))
      }, 900)
    }

    target.addEventListener("mousemove", updateMousePosition)
    target.addEventListener("click", handleClick)
    return () => {
      target.removeEventListener("mousemove", updateMousePosition)
      target.removeEventListener("click", handleClick)
    }
  }, [containerRef, reducedMotion])

  const scoped = Boolean(containerRef)
  const posClass = scoped ? "absolute" : "fixed"

  return (
    <div
      className={cn(
        scoped ? "absolute inset-0" : "relative min-h-[200px] w-full",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}

      {!reducedMotion && (
        <AnimatePresence>
          {trail.map((point, index) => (
            <motion.div
              key={point.id}
              className={cn(posClass, "pointer-events-none")}
              initial={{ scale: 1, opacity: 0.45 }}
              animate={{ scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              style={{
                left: point.x,
                top: point.y,
                transform: "translate(-50%, -50%)",
              }}
              transition={{ duration: 0.45 }}
            >
              <div
                className="size-1.5 rounded-full bg-fuchsia-300"
                style={{
                  opacity: (index / Math.max(trail.length, 1)) * 0.6,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {mousePosition.x !== null && mousePosition.y !== null && (
        <motion.div
          className={cn(posClass, "pointer-events-none z-50")}
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.35 : 1,
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 520,
                  damping: 30,
                  mass: 0.45,
                }
          }
          style={{ marginInlineStart: -10, marginTop: -10 }}
        >
          <div className="relative">
            <div className="size-5 rounded-full bg-fuchsia-400 mix-blend-screen shadow-[0_0_16px_rgba(232,121,249,0.85)]" />
            {!reducedMotion && (
              <div className="absolute inset-0 size-5 animate-ping rounded-full border border-fuchsia-200/80" />
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {clicks.map((click) => (
          <Fragment key={click.id}>
            <motion.div
              className={cn(posClass, "pointer-events-none")}
              style={{
                left: click.x,
                top: click.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="size-14 rounded-full border-2 border-cyan-300/90 shadow-[0_0_20px_rgba(103,232,249,0.55)]" />
            </motion.div>
            <motion.div
              className={cn(posClass, "pointer-events-none")}
              style={{
                left: click.x,
                top: click.y,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.04 }}
            >
              <div className="size-8 rounded-full border border-fuchsia-300/70" />
            </motion.div>
            {[...Array(14)].map((_, i) => {
              const angle = (i / 14) * Math.PI * 2
              const dist = 56 + (i % 3) * 18
              return (
                <motion.div
                  key={i}
                  className={cn(
                    posClass,
                    "pointer-events-none size-1.5 rounded-full",
                    i % 2 === 0 ? "bg-cyan-300" : "bg-fuchsia-300"
                  )}
                  style={{ left: click.x, top: click.y }}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1.2, 0],
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.65,
                    ease: "easeOut",
                    times: [0, 0.25, 1],
                  }}
                />
              )
            })}
          </Fragment>
        ))}
      </AnimatePresence>
    </div>
  )
}
