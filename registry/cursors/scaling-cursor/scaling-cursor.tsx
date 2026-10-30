"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface ScalingCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Elastic core + ring that scales and rotates on interactive hover.
 */
export function ScalingCursor({
  containerRef,
  className,
}: ScalingCursorProps) {
  const [ready, setReady] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [reduced, setReduced] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 420, damping: 28, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 420, damping: 28, mass: 0.4 })
  const rx = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.65 })
  const ry = useSpring(my, { stiffness: 180, damping: 22, mass: 0.65 })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (reduced) return

    const root = containerRef?.current ?? null
    const target: HTMLElement | Window = root ?? window

    const toLocal = (e: MouseEvent) => {
      if (root) {
        const rect = root.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }
      return { x: e.clientX, y: e.clientY }
    }

    const onMove = (e: Event) => {
      const p = toLocal(e as MouseEvent)
      mx.set(p.x)
      my.set(p.y)
      setReady(true)
    }
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    target.addEventListener("mousemove", onMove)
    const scope: ParentNode = root ?? document
    const interactive = scope.querySelectorAll(
      "a, button, img, input, textarea, select, [data-cursor-hover]"
    )
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      target.removeEventListener("mousemove", onMove)
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [containerRef, reduced, mx, my])

  if (reduced || !ready) return null

  const scoped = Boolean(containerRef)

  return (
    <div
      className={cn(
        "pointer-events-none z-50",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      aria-hidden
    >
      <motion.div
        className="absolute size-10 rounded-full border-2 border-primary/70"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovering ? 1.55 : 1,
          rotate: hovering ? 45 : 0,
          borderRadius: hovering ? "28%" : "9999px",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 18 }}
      />
      <motion.div
        className="absolute size-2.5 rounded-full bg-foreground mix-blend-difference"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 0.55 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />
    </div>
  )
}
