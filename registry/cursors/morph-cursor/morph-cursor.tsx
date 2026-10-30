"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

export type MorphCursorMode = "default" | "link" | "text" | "media"

export interface MorphCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Semantic morph cursor: dot ↔ ring ↔ caret ↔ play from data-cursor.
 */
export function MorphCursor({ containerRef, className }: MorphCursorProps) {
  const [mode, setMode] = useState<MorphCursorMode>("default")
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 380, damping: 28, mass: 0.45 })
  const sy = useSpring(my, { stiffness: 380, damping: 28, mass: 0.45 })

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

    const resolveMode = (el: Element | null): MorphCursorMode => {
      const host = el?.closest?.("[data-cursor]") as HTMLElement | null
      const raw = host?.dataset.cursor
      if (raw === "link" || raw === "text" || raw === "media") return raw
      if (host?.matches?.("a, button")) return "link"
      return "default"
    }

    const onOver = (e: Event) => {
      setMode(resolveMode(e.target as Element))
    }
    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as Element | null
      setMode(resolveMode(related))
    }

    target.addEventListener("mousemove", onMove)
    target.addEventListener("mouseover", onOver)
    target.addEventListener("mouseout", onOut)

    return () => {
      target.removeEventListener("mousemove", onMove)
      target.removeEventListener("mouseover", onOver)
      target.removeEventListener("mouseout", onOut)
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
        className="absolute flex items-center justify-center"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {mode === "default" && (
          <motion.div
            key="dot"
            className="size-2.5 rounded-full bg-foreground mix-blend-difference"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          />
        )}
        {mode === "link" && (
          <motion.div
            key="ring"
            className="size-10 rounded-full border-2 border-primary bg-primary/10"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
          />
        )}
        {mode === "text" && (
          <motion.div
            key="caret"
            className="h-6 w-0.5 rounded-full bg-primary"
            initial={{ scaleY: 0.4, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          />
        )}
        {mode === "media" && (
          <motion.div
            key="play"
            className="flex size-11 items-center justify-center rounded-full border border-primary/60 bg-card/80 shadow-soft backdrop-blur-sm"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <span
              className="ms-0.5 size-0 border-y-[6px] border-y-transparent border-s-[10px] border-s-primary"
              aria-hidden
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
