"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface InvertCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  size?: number
  lag?: number
}

/**
 * Editorial invert lens — white disc with mix-blend-mode difference.
 * No wrapping stacking context (z-index parent would break blending).
 */
export function InvertCursor({
  containerRef,
  className,
  size = 36,
  lag = 0.22,
}: InvertCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [render, setRender] = useState({ x: 0, y: 0 })
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
      setRender({ x: pos.current.x, y: pos.current.y })
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
        "pointer-events-none rounded-full bg-white mix-blend-difference",
        scoped ? "absolute" : "fixed",
        className
      )}
      style={{
        width: size,
        height: size,
        left: render.x,
        top: render.y,
        transform: "translate(-50%, -50%)",
        zIndex: 50,
      }}
      aria-hidden
    />
  )
}
