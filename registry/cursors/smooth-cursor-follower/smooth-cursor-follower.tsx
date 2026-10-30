"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface SmoothCursorFollowerProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Core lag (0–1). Higher = snappier. */
  dotSmoothness?: number
  /** Outer ring lag (0–1). */
  borderSmoothness?: number
}

/**
 * Dual-ring follower: tight core + slower primary outline that
 * scales on interactive hover.
 */
export function SmoothCursorFollower({
  containerRef,
  className,
  dotSmoothness = 0.28,
  borderSmoothness = 0.12,
}: SmoothCursorFollowerProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const core = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({
    core: { x: 0, y: 0 },
    ring: { x: 0, y: 0 },
  })
  const [hovering, setHovering] = useState(false)
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

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

    let raf = 0
    const tick = () => {
      core.current.x = lerp(core.current.x, mouse.current.x, dotSmoothness)
      core.current.y = lerp(core.current.y, mouse.current.y, dotSmoothness)
      ring.current.x = lerp(ring.current.x, mouse.current.x, borderSmoothness)
      ring.current.y = lerp(ring.current.y, mouse.current.y, borderSmoothness)
      setPos({
        core: { ...core.current },
        ring: { ...ring.current },
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
      cancelAnimationFrame(raf)
    }
  }, [containerRef, dotSmoothness, borderSmoothness, reducedMotion])

  if (reducedMotion || !ready) return null

  const scoped = Boolean(containerRef)
  const ringSize = hovering ? 52 : 32

  return (
    <div
      className={cn(
        "pointer-events-none z-50",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      aria-hidden
    >
      <div
        className="absolute rounded-full bg-primary/20 blur-md transition-[width,height] duration-300"
        style={{
          width: hovering ? 64 : 40,
          height: hovering ? 64 : 40,
          transform: "translate(-50%, -50%)",
          left: pos.ring.x,
          top: pos.ring.y,
        }}
      />
      <div
        className="absolute rounded-full border-2 border-primary/80 transition-[width,height] duration-300"
        style={{
          width: ringSize,
          height: ringSize,
          transform: "translate(-50%, -50%)",
          left: pos.ring.x,
          top: pos.ring.y,
        }}
      />
      <div
        className="absolute size-2.5 rounded-full bg-foreground mix-blend-difference shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_55%,transparent)]"
        style={{
          transform: "translate(-50%, -50%)",
          left: pos.core.x,
          top: pos.core.y,
        }}
      />
    </div>
  )
}
