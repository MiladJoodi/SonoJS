"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface MultiCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Number of offset clones. */
  count?: number
}

type Node = { x: number; y: number }

/**
 * Multiple offset cursors with staggered lag and opacity.
 */
export function MultiCursor({
  containerRef,
  className,
  count = 5,
}: MultiCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const nodes = useRef<Node[]>(
    Array.from({ length: count }, () => ({ x: 0, y: 0 }))
  )
  const [render, setRender] = useState<Node[]>(
    Array.from({ length: count }, () => ({ x: 0, y: 0 }))
  )
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    nodes.current = Array.from({ length: count }, () => ({ x: 0, y: 0 }))
    setRender(Array.from({ length: count }, () => ({ x: 0, y: 0 })))
  }, [count])

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
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const toLocal = (e: MouseEvent) => {
      if (root) {
        const rect = root.getBoundingClientRect()
        return { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }
      return { x: e.clientX, y: e.clientY }
    }

    const onMove = (e: Event) => {
      mouse.current = toLocal(e as MouseEvent)
      setReady(true)
    }

    target.addEventListener("mousemove", onMove)

    const offsets = Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2
      const r = i === 0 ? 0 : 10 + i * 6
      return { x: Math.cos(a) * r, y: Math.sin(a) * r }
    })

    let raf = 0
    const tick = () => {
      nodes.current.forEach((n, i) => {
        const lag = 0.35 - i * 0.05
        const ox = offsets[i]?.x ?? 0
        const oy = offsets[i]?.y ?? 0
        n.x = lerp(n.x, mouse.current.x + ox, Math.max(0.08, lag))
        n.y = lerp(n.y, mouse.current.y + oy, Math.max(0.08, lag))
      })
      setRender(nodes.current.map((n) => ({ x: n.x, y: n.y })))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [containerRef, count, reduced])

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
      {render.map((p, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full border-2",
            i === 0
              ? "size-3 border-transparent bg-primary"
              : "size-4 border-primary/70 bg-primary/15"
          )}
          style={{
            left: p.x,
            top: p.y,
            opacity: 1 - i * 0.14,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
