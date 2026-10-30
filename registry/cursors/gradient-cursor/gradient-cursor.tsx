"use client"

import {
  type RefObject,
  useEffect,
  useState,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface GradientCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Dual soft gradient blobs with spring lag — black-stage friendly.
 */
export function GradientCursor({
  containerRef,
  className,
}: GradientCursorProps) {
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const aX = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.8 })
  const aY = useSpring(my, { stiffness: 120, damping: 20, mass: 0.8 })
  const bX = useSpring(mx, { stiffness: 60, damping: 18, mass: 1.1 })
  const bY = useSpring(my, { stiffness: 60, damping: 18, mass: 1.1 })

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

    target.addEventListener("mousemove", onMove)
    return () => target.removeEventListener("mousemove", onMove)
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
        className="absolute size-40 rounded-full blur-2xl"
        style={{
          x: aX,
          y: aY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.55) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute size-52 rounded-full blur-3xl"
        style={{
          x: bX,
          y: bY,
          translateX: "-40%",
          translateY: "-60%",
          background:
            "radial-gradient(circle, rgba(232,121,249,0.45) 0%, transparent 68%)",
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        className="absolute size-3 rounded-full bg-white/90"
        style={{
          x: aX,
          y: aY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 16px rgba(255,255,255,0.6)",
        }}
      />
    </div>
  )
}
