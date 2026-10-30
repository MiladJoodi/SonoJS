"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface ThreeDCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * Concentric rings with CSS perspective depth parallax.
 */
export function ThreeDCursor({ containerRef, className }: ThreeDCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const layers = useRef([
    { x: 0, y: 0, lag: 0.32 },
    { x: 0, y: 0, lag: 0.18 },
    { x: 0, y: 0, lag: 0.1 },
  ])
  const [render, setRender] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ])
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
      layers.current.forEach((layer) => {
        layer.x = lerp(layer.x, mouse.current.x, layer.lag)
        layer.y = lerp(layer.y, mouse.current.y, layer.lag)
      })
      setRender(layers.current.map((l) => ({ x: l.x, y: l.y })))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [containerRef, reduced])

  if (reduced || !ready) return null

  const scoped = Boolean(containerRef)
  const sizes = [14, 28, 48]
  const opacities = [1, 0.65, 0.35]

  return (
    <div
      className={cn(
        "pointer-events-none z-50",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      style={{ perspective: 600 }}
      aria-hidden
    >
      {render.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary"
          style={{
            width: sizes[i],
            height: sizes[i],
            left: p.x,
            top: p.y,
            opacity: opacities[i],
            transform: `translate(-50%, -50%) translateZ(${(2 - i) * 24}px) rotateX(${(2 - i) * 8}deg)`,
            boxShadow:
              i === 0
                ? "0 0 12px color-mix(in oklab, var(--primary) 50%, transparent)"
                : undefined,
            background:
              i === 0
                ? "color-mix(in oklab, var(--primary) 85%, transparent)"
                : "transparent",
          }}
        />
      ))}
    </div>
  )
}

/** Alias matching registry slug export style. */
export function Cursor3D(props: ThreeDCursorProps) {
  return <ThreeDCursor {...props} />
}
