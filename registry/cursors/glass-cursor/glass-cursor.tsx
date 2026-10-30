"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface GlassCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  size?: number
  lag?: number
}

/**
 * Liquid-glass disc: backdrop blur, rim, and specular highlight.
 */
export function GlassCursor({
  containerRef,
  className,
  size = 64,
  lag = 0.2,
}: GlassCursorProps) {
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
        "pointer-events-none overflow-hidden rounded-full border-2 border-slate-400/70 bg-white/70 shadow-[0_8px_28px_rgba(15,23,42,0.28),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl dark:border-white/40 dark:bg-white/20 dark:shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.35)]",
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
    >
      <div
        className="absolute rounded-full bg-white blur-[0.5px] dark:bg-white/55"
        style={{
          width: size * 0.42,
          height: size * 0.26,
          insetInlineStart: "14%",
          top: "12%",
          opacity: 0.95,
        }}
      />
      <div className="absolute inset-[18%] rounded-full border border-slate-300/80 dark:border-white/30" />
    </div>
  )
}
