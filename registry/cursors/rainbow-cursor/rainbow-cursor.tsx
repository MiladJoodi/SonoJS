"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface RainbowCursorProps {
  /** Legacy HTMLElement target (same as containerRef.current). */
  element?: HTMLElement
  containerRef?: RefObject<HTMLElement | null>
  length?: number
  colors?: string[]
  size?: number
  trailSpeed?: number
  colorCycleSpeed?: number
  blur?: number
  pulseSpeed?: number
  pulseMin?: number
  pulseMax?: number
  zIndex?: number
}

function lerpHex(a: string, b: string, t: number) {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ] as const
  const [r1, g1, b1] = parse(a)
  const [r2, g2, b2] = parse(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bch = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${bch})`
}

/**
 * Smooth multi-band rainbow ribbon with configurable length / blur.
 */
export function RainbowCursor({
  element,
  containerRef,
  length = 28,
  colors = ["#FF4D4D", "#FF9F1C", "#FFD60A", "#2EC4B6", "#3A86FF", "#8338EC"],
  size = 3.5,
  trailSpeed = 0.32,
  colorCycleSpeed = 0.0018,
  blur = 1.25,
  pulseSpeed = 0.008,
  pulseMin = 0.85,
  pulseMax = 1.15,
  zIndex,
}: RainbowCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const cursor = useRef({ x: 0, y: 0 })
  const particles = useRef<Array<{ x: number; y: number }>>([])
  const rafRef = useRef(0)
  const initted = useRef(false)
  const time = useRef(0)
  const lastMove = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (prefersReduced.matches) return

    const wrapper = containerRef?.current ?? element ?? null
    const hasWrapper = wrapper != null
    const host: HTMLElement = wrapper ?? document.body

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    canvasRef.current = canvas
    ctxRef.current = ctx
    particles.current = []
    initted.current = false

    canvas.style.top = "0"
    canvas.style.insetInlineStart = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.position = hasWrapper ? "absolute" : "fixed"
    if (zIndex != null) canvas.style.zIndex = String(zIndex)

    if (hasWrapper && wrapper) {
      wrapper.appendChild(canvas)
      canvas.width = wrapper.clientWidth
      canvas.height = wrapper.clientHeight
    } else {
      document.body.appendChild(canvas)
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      // Light throttle keeps the ribbon smooth without jitter spikes.
      if (now - lastMove.current < 8) return
      lastMove.current = now

      if (hasWrapper && wrapper) {
        const rect = wrapper.getBoundingClientRect()
        cursor.current.x = e.clientX - rect.left
        cursor.current.y = e.clientY - rect.top
      } else {
        cursor.current.x = e.clientX
        cursor.current.y = e.clientY
      }

      if (!initted.current) {
        initted.current = true
        for (let i = 0; i < length; i++) {
          particles.current.push({
            x: cursor.current.x,
            y: cursor.current.y,
          })
        }
      }
    }

    const onResize = () => {
      if (hasWrapper && wrapper) {
        canvas.width = wrapper.clientWidth
        canvas.height = wrapper.clientHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const draw = () => {
      const c = canvasRef.current
      const g = ctxRef.current
      if (!c || !g || !initted.current) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      g.clearRect(0, 0, c.width, c.height)
      g.lineJoin = "round"
      g.lineCap = "round"
      if (blur > 0) g.filter = `blur(${blur}px)`

      const points: Array<{ x: number; y: number }> = []
      let x = cursor.current.x
      let y = cursor.current.y

      particles.current.forEach((p, i) => {
        const next = particles.current[i + 1] ?? particles.current[0]!
        p.x = x
        p.y = y
        points.push({ x, y })
        x += (next.x - p.x) * trailSpeed
        y += (next.y - p.y) * trailSpeed
      })

      time.current += colorCycleSpeed
      const pulse =
        pulseMin +
        ((Math.sin(time.current * pulseSpeed * 100) + 1) *
          (pulseMax - pulseMin)) /
          2
      const stroke = size * pulse
      const offset = time.current % 1

      colors.forEach((color, band) => {
        const next = colors[(band + 1) % colors.length]!
        g.beginPath()
        g.strokeStyle = lerpHex(color, next, (band + offset) / colors.length)
        g.globalAlpha = 0.92 - band * 0.04
        if (points[0]) {
          g.moveTo(points[0].x, points[0].y + band * (stroke - 0.8))
        }
        for (let i = 1; i < points.length; i++) {
          const pt = points[i]!
          g.lineTo(pt.x, pt.y + band * stroke)
        }
        g.lineWidth = stroke
        g.stroke()
      })

      g.globalAlpha = 1
      g.filter = "none"
      rafRef.current = requestAnimationFrame(draw)
    }

    host.addEventListener("mousemove", onMove)
    window.addEventListener("resize", onResize)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      canvas.remove()
      cancelAnimationFrame(rafRef.current)
      host.removeEventListener("mousemove", onMove)
      window.removeEventListener("resize", onResize)
      canvasRef.current = null
      ctxRef.current = null
    }
  }, [
    element,
    containerRef,
    length,
    colors,
    size,
    trailSpeed,
    colorCycleSpeed,
    blur,
    pulseSpeed,
    pulseMin,
    pulseMax,
    zIndex,
  ])

  return null
}
