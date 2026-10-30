"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export interface NeonCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

type TrailPoint = { x: number; y: number; id: number }

/**
 * Black-stage neon: cyan core + magenta ring with spring lag,
 * dotted trail, and click pulse.
 */
export function NeonCursor({ containerRef, className }: NeonCursorProps) {
  const [ready, setReady] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)
  const idRef = useRef(0)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 380, damping: 28, mass: 0.45 })
  const sy = useSpring(my, { stiffness: 380, damping: 28, mass: 0.45 })
  const rx = useSpring(mx, { stiffness: 160, damping: 22, mass: 0.7 })
  const ry = useSpring(my, { stiffness: 160, damping: 22, mass: 0.7 })

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

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

    const onMove = (e: Event) => {
      const p = toLocal(e as MouseEvent)
      mx.set(p.x)
      my.set(p.y)
      setReady(true)
      const now = performance.now()
      if (now - lastTrail > 28) {
        lastTrail = now
        const id = ++idRef.current
        setTrail((prev) => [...prev.slice(-14), { x: p.x, y: p.y, id }])
      }
    }
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onOver = (e: Event) => {
      const el = e.target as HTMLElement | null
      if (
        el?.matches?.(
          "a, button, input, [data-hover='true'], [data-cursor-hover]"
        )
      ) {
        setHovering(true)
      }
    }
    const onOut = (e: Event) => {
      const el = e.target as HTMLElement | null
      if (
        el?.matches?.(
          "a, button, input, [data-hover='true'], [data-cursor-hover]"
        )
      ) {
        setHovering(false)
      }
    }

    target.addEventListener("mousemove", onMove)
    target.addEventListener("mousedown", onDown)
    target.addEventListener("mouseup", onUp)
    target.addEventListener("mouseover", onOver)
    target.addEventListener("mouseout", onOut)

    return () => {
      target.removeEventListener("mousemove", onMove)
      target.removeEventListener("mousedown", onDown)
      target.removeEventListener("mouseup", onUp)
      target.removeEventListener("mouseover", onOver)
      target.removeEventListener("mouseout", onOut)
    }
  }, [containerRef, reducedMotion, mx, my])

  if (reducedMotion || !ready) return null

  const scoped = Boolean(containerRef)

  return (
    <div
      className={cn(
        "pointer-events-none z-[9999]",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      aria-hidden
    >
      {trail.map((pt, i) => (
        <div
          key={pt.id}
          className="absolute size-1.5 rounded-full bg-cyan-300/70"
          style={{
            left: pt.x,
            top: pt.y,
            transform: "translate(-50%, -50%)",
            opacity: (i + 1) / trail.length,
          }}
        />
      ))}
      <motion.div
        className="absolute size-14 rounded-full"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.45) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: hovering ? 1.65 : clicking ? 0.85 : 1,
          opacity: hovering ? 0.95 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      />
      <motion.div
        className="absolute size-10 rounded-full border-2 border-fuchsia-400 mix-blend-screen"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 18px rgba(232,121,249,0.75)",
        }}
        animate={{
          scale: hovering ? 1.45 : 1,
          borderColor: hovering ? "rgb(34,211,238)" : "rgb(232,121,249)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
      />
      <motion.div
        className="absolute size-3 rounded-full bg-cyan-300 mix-blend-screen"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 14px rgba(103,232,249,0.95)",
        }}
        animate={{ scale: clicking ? 0.65 : hovering ? 1.25 : 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
      />
    </div>
  )
}
