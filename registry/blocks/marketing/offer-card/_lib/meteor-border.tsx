"use client"

import { useEffect, useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const FALLBACK_COLOR = "#173eff"

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
}

function MeteorCanvas({
  color = FALLBACK_COLOR,
  speed = 0.9,
  borderRadius = 16,
  /** Trail stroke width in CSS px (before DPR). */
  trailWidth = 5,
  /** Bright head radius in CSS px (before DPR). */
  headRadius = 3.75,
}: {
  color?: string
  speed?: number
  borderRadius?: number
  trailWidth?: number
  headRadius?: number
}) {
  const cycleSec = Math.max(0.5, 6 / speed)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)

  useEffect(() => {
    const resolve = () => {
      if (color.startsWith("var(")) {
        const name = color.slice(4, -1).trim()
        colorRef.current =
          getComputedStyle(document.documentElement)
            .getPropertyValue(name)
            .trim() || FALLBACK_COLOR
      } else {
        colorRef.current = color
      }
    }
    resolve()
    if (!color.startsWith("var(")) return
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.attributeName === "style") resolve()
      }
    })
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    })
    return () => obs.disconnect()
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.offsetWidth
      h = parent.offsetHeight
      canvas.width = (w + 80) * dpr
      canvas.height = (h + 80) * dpr
    }
    resize()
    window.addEventListener("resize", resize)

    const pointOnPath = (
      progress: number,
      width: number,
      height: number,
      radius: number
    ) => {
      const r = Math.min(radius, width / 2, height / 2)
      const corner = (Math.PI / 2) * r
      const sw = width - 2 * r
      const sh = height - 2 * r
      const dist =
        ((((progress % 1) + 1) % 1) * (2 * sw + 2 * sh + 4 * corner))
      let x = 0
      let y = 0
      let angle = 0

      if (dist < sw) {
        x = r + dist
        y = 0
        angle = 0
      } else if (dist < sw + corner) {
        const e = ((dist - sw) / corner) * (Math.PI / 2) - Math.PI / 2
        x = width - r + Math.cos(e) * r
        y = r + Math.sin(e) * r
        angle = e + Math.PI / 2
      } else if (dist < sw + corner + sh) {
        x = width
        y = r + (dist - (sw + corner))
        angle = Math.PI / 2
      } else if (dist < sw + 2 * corner + sh) {
        const e = ((dist - (sw + corner + sh)) / corner) * (Math.PI / 2)
        x = width - r + Math.cos(e) * r
        y = height - r + Math.sin(e) * r
        angle = e + Math.PI / 2
      } else if (dist < 2 * sw + 2 * corner + sh) {
        x = width - r - (dist - (sw + 2 * corner + sh))
        y = height
        angle = Math.PI
      } else if (dist < 2 * sw + 3 * corner + sh) {
        const e =
          ((dist - (2 * sw + 2 * corner + sh)) / corner) * (Math.PI / 2) +
          Math.PI / 2
        x = r + Math.cos(e) * r
        y = height - r + Math.sin(e) * r
        angle = e + Math.PI / 2
      } else if (dist < 2 * sw + 3 * corner + 2 * sh) {
        x = 0
        y = height - r - (dist - (2 * sw + 3 * corner + sh))
        angle = -Math.PI / 2
      } else {
        const e =
          ((dist - (2 * sw + 3 * corner + 2 * sh)) / corner) * (Math.PI / 2) +
          Math.PI
        x = r + Math.cos(e) * r
        y = r + Math.sin(e) * r
        angle = e + Math.PI / 2
      }

      return { x: (x + 40) * dpr, y: (y + 40) * dpr, angle }
    }

    const state = { particles: [] as Particle[], progress: 0 }
    let last = Date.now()
    let raf = 0

    const tick = () => {
      try {
        if (w <= 0 || h <= 0) {
          raf = requestAnimationFrame(tick)
          return
        }
        const col = colorRef.current
        const now = Date.now()
        const dt = (now - last) / 1000
        last = now
        state.progress += dt / cycleSec

        const { x, y, angle } = pointOnPath(
          state.progress,
          w,
          h,
          borderRadius
        )

        if (Math.random() > 0.1) {
          const speedPx = rand(12, 48) * dpr
          const jitter = (Math.random() - 0.5) * 1.5
          state.particles.push({
            x: x + (Math.random() - 0.5) * 5 * dpr,
            y: y + (Math.random() - 0.5) * 5 * dpr,
            vx: -Math.cos(angle + jitter) * speedPx,
            vy: -Math.sin(angle + jitter) * speedPx,
            size: rand(1.5, 5.5) * dpr,
            life: 1,
            maxLife: rand(0.4, 1.2),
          })
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        state.particles = state.particles.filter((p) => p.life > 0)
        ctx.shadowBlur = 14 * dpr
        ctx.shadowColor = col

        for (const p of state.particles) {
          p.x += p.vx * dt
          p.y += p.vy * dt
          p.life -= dt / p.maxLife
          ctx.beginPath()
          ctx.globalAlpha = Math.max(0, p.life)
          ctx.fillStyle = col
          const radius = Math.max(0, (p.size / 2) * p.life)
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalAlpha = 1

        const rr = Math.min(borderRadius, w / 2, h / 2)
        const corner = (Math.PI / 2) * rr
        const sw = w - 2 * rr
        const sh = h - 2 * rr
        const perimeter = 2 * sw + 2 * sh + 4 * corner || 1
        const trail = (80 * dpr) / perimeter
        const tail = pointOnPath(state.progress - trail, w, h, borderRadius)

        const grad = ctx.createLinearGradient(x, y, tail.x, tail.y)
        grad.addColorStop(0, "white")
        grad.addColorStop(0.2, col)
        grad.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = trailWidth * dpr
        ctx.lineCap = "round"
        for (let i = 0; i <= 12; i++) {
          const pt = pointOnPath(
            state.progress - (i / 12) * trail,
            w,
            h,
            borderRadius
          )
          if (i === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke()

        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.shadowBlur = 22 * dpr
        ctx.arc(x, y, headRadius * dpr, 0, Math.PI * 2)
        ctx.fill()
      } catch {
        /* ignore frame errors */
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [cycleSec, borderRadius, trailWidth, headRadius])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute z-20"
      style={{
        top: -40,
        insetInlineStart: -40,
        width: "calc(100% + 80px)",
        height: "calc(100% + 80px)",
      }}
    />
  )
}

export function MeteorBorder({
  children,
  className,
  meteorColor = FALLBACK_COLOR,
  speed = 0.9,
  borderWidth = 1.5,
  borderRadius = 16,
  trailWidth = 5,
  headRadius = 3.75,
}: {
  children: ReactNode
  className?: string
  meteorColor?: string
  speed?: number
  borderWidth?: number
  borderRadius?: number
  trailWidth?: number
  headRadius?: number
}) {
  return (
    <div
      className={cn("group relative", className)}
      style={{ padding: borderWidth, borderRadius }}
    >
      <div
        className="absolute inset-0 bg-foreground/10 dark:bg-white/10"
        style={{ borderRadius }}
      />
      <MeteorCanvas
        color={meteorColor}
        speed={speed}
        borderRadius={borderRadius}
        trailWidth={trailWidth}
        headRadius={headRadius}
      />
      <div
        className="relative z-10 h-full w-full overflow-hidden bg-zinc-950"
        style={{ borderRadius: Math.max(0, borderRadius - borderWidth) }}
      >
        {children}
      </div>
    </div>
  )
}

/** Shared shine + pulse keyframes for offer-card variants. */
export function OfferCardEffectsStyle() {
  return (
    <style>{`
      @keyframes offer-badge-shine {
        0%   { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      .offer-badge-shine {
        background: linear-gradient(90deg, var(--offer-accent) 0%, var(--offer-accent) 40%, #ffffff 50%, var(--offer-accent) 60%, var(--offer-accent) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: offer-badge-shine 3s linear infinite;
      }
      @keyframes offer-pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50%       { opacity: 1;   transform: scale(1.15); }
      }
      .offer-pulse-glow { animation: offer-pulse-glow 2.5s ease-in-out infinite; }
    `}</style>
  )
}
