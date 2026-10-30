"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export interface ArrowCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Position lag 0–1. */
  lag?: number
}

/**
 * Velocity-aware chevron that rotates with pointer motion direction.
 */
export function ArrowCursor({
  containerRef,
  className,
  lag = 0.22,
}: ArrowCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const prev = useRef({ x: 0, y: 0 })
  const angle = useRef(0)
  const [render, setRender] = useState({ x: 0, y: 0, angle: 0 })
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)

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

    let raf = 0
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, lag)
      pos.current.y = lerp(pos.current.y, mouse.current.y, lag)

      const dx = pos.current.x - prev.current.x
      const dy = pos.current.y - prev.current.y
      const speed = Math.hypot(dx, dy)
      if (speed > 0.35) {
        const targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
        let delta = targetAngle - angle.current
        while (delta > 180) delta -= 360
        while (delta < -180) delta += 360
        angle.current += delta * 0.18
      }
      prev.current = { ...pos.current }

      setRender({
        x: pos.current.x,
        y: pos.current.y,
        angle: angle.current,
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [containerRef, lag, reduced])

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
      <div
        className="absolute flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
        style={{
          left: render.x,
          top: render.y,
          transform: `translate(-50%, -50%) rotate(${render.angle}deg)`,
        }}
      >
        <ChevronUpIcon className="size-4" strokeWidth={2.5} />
      </div>
    </div>
  )
}
