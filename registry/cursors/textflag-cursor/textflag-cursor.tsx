"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export interface TextFlagCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Word that waves like a flag behind the pointer. */
  text?: string
}

/**
 * Characters of a word that wave behind the pointer like a flag.
 */
export function TextFlagCursor({
  containerRef,
  className,
  text = "SONOJS",
}: TextFlagCursorProps) {
  const letters = text.split("")
  const mouse = useRef({ x: 0, y: 0 })
  const nodes = useRef(letters.map(() => ({ x: 0, y: 0 })))
  const [render, setRender] = useState(letters.map(() => ({ x: 0, y: 0 })))
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const time = useRef(0)

  useEffect(() => {
    nodes.current = letters.map(() => ({ x: 0, y: 0 }))
    setRender(letters.map(() => ({ x: 0, y: 0 })))
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps -- letters derived from text

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
    const gap = 14
    const last = letters.length - 1
    const tick = () => {
      time.current += 0.08
      // Trail left of the pointer; last letter nearest cursor so LTR reads correctly.
      let tx = mouse.current.x
      let ty = mouse.current.y
      for (let i = last; i >= 0; i--) {
        const n = nodes.current[i]!
        const fromEnd = last - i
        const lag = 0.35 - fromEnd * 0.03
        n.x = lerp(n.x, tx, Math.max(0.08, lag))
        n.y = lerp(n.y, ty, Math.max(0.08, lag))
        const wave = Math.sin(time.current + fromEnd * 0.55) * (4 + fromEnd * 1.2)
        tx = n.x - gap
        ty = n.y + wave * 0.15
      }
      setRender(
        nodes.current.map((n, i) => {
          const fromEnd = last - i
          return {
            x: n.x,
            y: n.y + Math.sin(time.current + fromEnd * 0.55) * (5 + fromEnd * 1.4),
          }
        })
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [containerRef, reduced, letters.length])

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
      {letters.map((ch, i) => {
        const fromEnd = letters.length - 1 - i
        return (
          <span
            key={`${ch}-${i}`}
            className="absolute text-sm font-semibold tracking-wide text-primary"
            style={{
              left: render[i]?.x ?? 0,
              top: render[i]?.y ?? 0,
              transform: "translate(-50%, -50%)",
              opacity: 1 - fromEnd * 0.08,
            }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}
