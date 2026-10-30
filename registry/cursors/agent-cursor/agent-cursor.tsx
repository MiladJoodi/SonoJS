"use client"

import {
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  MessageCircleIcon,
  PencilLineIcon,
  SparklesIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type AgentAction = "ask" | "rewrite" | "explain"

const AGENT_META: Record<
  AgentAction,
  { label: string; icon: typeof SparklesIcon }
> = {
  ask: { label: "Ask AI", icon: MessageCircleIcon },
  rewrite: { label: "Rewrite", icon: PencilLineIcon },
  explain: { label: "Explain", icon: SparklesIcon },
}

export interface AgentCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  className?: string
}

/**
 * AI copilot pointer: breathing orb + contextual glass chip on data-agent hotspots.
 */
export function AgentCursor({ containerRef, className }: AgentCursorProps) {
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const [render, setRender] = useState({ x: 0, y: 0 })
  const [action, setAction] = useState<AgentAction | null>(null)
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

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-agent]"
      ) as HTMLElement | null
      const raw = el?.dataset.agent
      if (raw === "ask" || raw === "rewrite" || raw === "explain") {
        setAction(raw)
      }
    }
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-agent]"
      ) as HTMLElement | null
      if (el) setAction(null)
    }

    target.addEventListener("mousemove", onMove)
    target.addEventListener("mouseover", onOver)
    target.addEventListener("mouseout", onOut)

    let raf = 0
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.28)
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.28)
      setRender({ x: pos.current.x, y: pos.current.y })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      target.removeEventListener("mousemove", onMove)
      target.removeEventListener("mouseover", onOver)
      target.removeEventListener("mouseout", onOut)
      cancelAnimationFrame(raf)
    }
  }, [containerRef, reduced])

  if (reduced || !ready) return null

  const scoped = Boolean(containerRef)
  const meta = action ? AGENT_META[action] : null
  const Icon = meta?.icon

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
        className="absolute"
        style={{
          left: render.x,
          top: render.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative flex size-5 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/35" />
          <span className="absolute size-5 rounded-full border border-primary/50 bg-primary/20" />
          <span className="relative size-2.5 rounded-full bg-primary shadow-[0_0_12px_color-mix(in_oklab,var(--primary)_60%,transparent)]" />
        </div>
        {meta && Icon ? (
          <div className="absolute start-6 top-1/2 flex -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border/60 bg-card/75 px-2.5 py-1 text-xs font-medium text-card-foreground shadow-soft backdrop-blur-md">
            <Icon className="size-3.5 text-primary" />
            {meta.label}
          </div>
        ) : null}
      </div>
    </div>
  )
}
