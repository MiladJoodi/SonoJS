"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/lib/utils"

type Stamp = { id: number; x: number; y: number }

export interface TrailCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Max ghost stamps kept. */
  length?: number
}

/**
 * Soft ghost stamps that fade behind the pointer (not a rainbow ribbon).
 */
export function TrailCursor({
  containerRef,
  className,
  length = 12,
}: TrailCursorProps) {
  const [stamps, setStamps] = useState<Stamp[]>([])
  const [core, setCore] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const idRef = useRef(0)
  const last = useRef(0)

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
      setCore(p)
      setReady(true)
      const now = performance.now()
      if (now - last.current < 24) return
      last.current = now
      const id = ++idRef.current
      setStamps((prev) => [...prev.slice(-(length - 1)), { id, x: p.x, y: p.y }])
    }

    target.addEventListener("mousemove", onMove)
    return () => target.removeEventListener("mousemove", onMove)
  }, [containerRef, length, reduced])

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
      {stamps.map((s, i) => {
        const t = (i + 1) / stamps.length
        const size = 6 + t * 10
        return (
          <div
            key={s.id}
            className="absolute rounded-full bg-foreground/25"
            style={{
              width: size,
              height: size,
              left: s.x,
              top: s.y,
              opacity: t * 0.55,
              transform: "translate(-50%, -50%)",
            }}
          />
        )
      })}
      <div
        className="absolute size-3 rounded-full bg-foreground mix-blend-difference"
        style={{
          left: core.x,
          top: core.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
