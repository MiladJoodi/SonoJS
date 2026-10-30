"use client"

import {
  type CSSProperties,
  type RefObject,
  useEffect,
  useReducer,
  useRef,
} from "react"

import { cn } from "@/lib/utils"

interface Ripple {
  id: string
  x: number
  y: number
  layer: number
}

export interface RippleCursorProps {
  maxSize?: number
  duration?: number
  blur?: boolean
  containerRef?: RefObject<HTMLElement | null>
  className?: string
  /** Min ms between ripple bursts while moving. */
  throttleMs?: number
}

type Action =
  | { type: "ADD"; payload: Ripple[] }
  | { type: "REMOVE"; payload: string }

function reducer(state: Ripple[], action: Action): Ripple[] {
  switch (action.type) {
    case "ADD":
      return [...state, ...action.payload].slice(-48)
    case "REMOVE":
      return state.filter((r) => !r.id.startsWith(action.payload))
    default:
      return state
  }
}

/**
 * Concentric multi-layer ripples with stepped opacity + primary tint.
 */
export function RippleCursor({
  maxSize = 64,
  duration = 1100,
  blur = true,
  containerRef,
  className,
  throttleMs = 55,
}: RippleCursorProps) {
  const [ripples, dispatch] = useReducer(reducer, [])
  const timeouts = useRef<number[]>([])
  const reduced = useRef(false)
  const lastEmit = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reduced.current = mq.matches
    const onChange = () => {
      reduced.current = mq.matches
    }
    mq.addEventListener("change", onChange)

    const root = containerRef?.current ?? null
    const target: HTMLElement | Window = root ?? window

    const handleMove = (e: Event) => {
      if (reduced.current) return
      const now = performance.now()
      if (now - lastEmit.current < throttleMs) return
      lastEmit.current = now

      const me = e as MouseEvent
      let x = me.clientX
      let y = me.clientY
      if (root) {
        const rect = root.getBoundingClientRect()
        x = me.clientX - rect.left
        y = me.clientY - rect.top
      }

      const base = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const layers: Ripple[] = [0, 1, 2].map((layer) => ({
        id: `${base}-${layer}`,
        x,
        y,
        layer,
      }))
      dispatch({ type: "ADD", payload: layers })
      const tid = window.setTimeout(() => {
        dispatch({ type: "REMOVE", payload: base })
      }, duration + 120)
      timeouts.current.push(tid)
    }

    target.addEventListener("mousemove", handleMove)
    return () => {
      target.removeEventListener("mousemove", handleMove)
      mq.removeEventListener("change", onChange)
      timeouts.current.forEach((id) => clearTimeout(id))
      timeouts.current = []
    }
  }, [containerRef, duration, throttleMs])

  const scoped = Boolean(containerRef)

  return (
    <div
      className={cn(
        "pointer-events-none z-[9999] overflow-hidden",
        scoped ? "absolute inset-0" : "fixed inset-0",
        className
      )}
      aria-hidden
    >
      <style>{`
        @keyframes sono-ripple-ring {
          from { transform: translate(-50%, -50%) scale(0.15); opacity: var(--ripple-o); }
          to { transform: translate(-50%, -50%) scale(2.15); opacity: 0; }
        }
      `}</style>
      {ripples.map((ripple) => {
        const delay = ripple.layer * 70
        const size = maxSize * (1 + ripple.layer * 0.22)
        const opacity = 0.55 - ripple.layer * 0.14
        return (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-primary/70 bg-primary/15"
            style={
              {
                left: ripple.x,
                top: ripple.y,
                width: size,
                height: size,
                "--ripple-o": opacity,
                animation: `sono-ripple-ring ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms forwards`,
                filter: blur ? "blur(1.5px)" : "none",
                boxShadow:
                  "0 0 14px color-mix(in oklab, var(--primary) 45%, transparent)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
