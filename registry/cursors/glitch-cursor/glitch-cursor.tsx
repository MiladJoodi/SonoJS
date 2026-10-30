"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface GlitchCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * RGB-split layers with brief scramble on motion — black-stage friendly.
 */
export function GlitchCursor({ containerRef, className }: GlitchCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [render, setRender] = useState({ x: 0, y: 0, ox: 0, oy: 0, scramble: 0 })
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const scrambleUntil = useRef(0)

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
      if (Math.random() > 0.82) {
        scrambleUntil.current = performance.now() + 90 + Math.random() * 80
      }
    }

    target.addEventListener("mousemove", onMove)

    let raf = 0
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.28)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.28)
      const now = performance.now()
      const scrambling = now < scrambleUntil.current
      const ox = scrambling ? (Math.random() - 0.5) * 10 : Math.sin(now / 180) * 2.5
      const oy = scrambling ? (Math.random() - 0.5) * 8 : Math.cos(now / 210) * 2
      setRender({
        x: pos.current.x,
        y: pos.current.y,
        ox,
        oy,
        scramble: scrambling ? 1 : 0,
      })
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
  const layers = [
    { color: "bg-cyan-400", mx: 1, my: 0.4 },
    { color: "bg-fuchsia-400", mx: -1, my: -0.5 },
    { color: "bg-lime-300", mx: 0.3, my: 1 },
  ] as const

  return (
    <div
      className={cn(
        "pointer-events-none z-50 mix-blend-screen",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      aria-hidden
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          className={cn("absolute size-5 rounded-sm opacity-80", layer.color)}
          style={{
            left: render.x + render.ox * layer.mx * (2 + i),
            top: render.y + render.oy * layer.my * (2 + i),
            transform: `translate(-50%, -50%) skewX(${render.scramble * (i - 1) * 8}deg)`,
          }}
        />
      ))}
      <div
        className="absolute size-2 rounded-full bg-white"
        style={{
          left: render.x,
          top: render.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
