"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface BubbleCursorProps {
  /** Legacy HTMLElement target. */
  wrapperElement?: HTMLElement
  containerRef?: RefObject<HTMLElement | null>
  zIndex?: number
}

type Bubble = {
  life: number
  maxLife: number
  vx: number
  vy: number
  x: number
  y: number
  r: number
  hue: number
}

function spawn(x: number, y: number): Bubble {
  const maxLife = 50 + Math.random() * 55
  return {
    maxLife,
    life: maxLife,
    vx: (Math.random() - 0.5) * 0.55,
    vy: -0.55 - Math.random() * 1.1,
    x,
    y,
    r: 3 + Math.random() * 7,
    hue: 185 + Math.random() * 45,
  }
}

function paint(ctx: CanvasRenderingContext2D, b: Bubble, dark: boolean) {
  b.x += b.vx
  b.y += b.vy
  b.vx += (Math.random() - 0.5) * 0.04
  b.vy -= 0.012
  b.life -= 1

  if (b.life <= 0) return

  const t = 1 - b.life / b.maxLife
  const radius = Math.max(0.5, b.r * (0.35 + t * 0.95))
  const alpha = Math.max(0, Math.min(1, 1 - t)) * 0.85
  if (alpha <= 0) return

  const fill = dark
    ? `hsla(${b.hue}, 85%, 68%, ${alpha * 0.35})`
    : `hsla(${b.hue}, 70%, 78%, ${alpha * 0.45})`
  const stroke = dark
    ? `hsla(${b.hue}, 90%, 72%, ${alpha})`
    : `hsla(${b.hue}, 65%, 42%, ${alpha})`

  ctx.beginPath()
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  ctx.lineWidth = 1.25
  ctx.arc(b.x, b.y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  const highlightR = Math.max(0.4, radius * 0.28)
  ctx.beginPath()
  ctx.fillStyle = dark
    ? `rgba(255,255,255,${alpha * 0.55})`
    : `rgba(255,255,255,${alpha * 0.7})`
  ctx.arc(
    b.x - radius * 0.32,
    b.y - radius * 0.35,
    highlightR,
    0,
    Math.PI * 2
  )
  ctx.fill()
}

/**
 * Theme-aware aqua bubbles with size variety and specular highlights.
 */
export function BubbleCursor({
  wrapperElement,
  containerRef,
  zIndex,
}: BubbleCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<Bubble[]>([])
  const cursor = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const emitAcc = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (prefersReduced.matches) return

    const wrapper = containerRef?.current ?? wrapperElement ?? null
    const canvas = document.createElement("canvas")
    canvasRef.current = canvas
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.style.top = "0"
    canvas.style.insetInlineStart = "0"
    canvas.style.pointerEvents = "none"
    if (zIndex != null) canvas.style.zIndex = String(zIndex)

    if (wrapper) {
      canvas.style.position = "absolute"
      wrapper.appendChild(canvas)
      canvas.width = wrapper.clientWidth
      canvas.height = wrapper.clientHeight
    } else {
      canvas.style.position = "fixed"
      document.body.appendChild(canvas)
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const host: HTMLElement = wrapper ?? document.body
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)")
    const themeDark = () =>
      document.documentElement.classList.contains("dark") || darkMq.matches

    const onResize = () => {
      if (!canvasRef.current) return
      if (wrapper) {
        canvasRef.current.width = wrapper.clientWidth
        canvasRef.current.height = wrapper.clientHeight
      } else {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    const add = (x: number, y: number) => {
      particles.current.push(spawn(x, y))
      if (Math.random() > 0.55) {
        particles.current.push(
          spawn(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 8)
        )
      }
    }

    const onMove = (e: MouseEvent) => {
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        cursor.current.x = e.clientX - rect.left
        cursor.current.y = e.clientY - rect.top
      } else {
        cursor.current.x = e.clientX
        cursor.current.y = e.clientY
      }
      emitAcc.current += 1
      if (emitAcc.current >= 2) {
        emitAcc.current = 0
        add(cursor.current.x, cursor.current.y)
      }
    }

    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i]!
        if (wrapper) {
          const rect = wrapper.getBoundingClientRect()
          add(t.clientX - rect.left, t.clientY - rect.top)
        } else {
          add(t.clientX, t.clientY)
        }
      }
    }

    const loop = () => {
      if (!canvasRef.current || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const dark = themeDark()
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const b = particles.current[i]!
        paint(ctx, b, dark)
        if (b.life <= 0) particles.current.splice(i, 1)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    host.addEventListener("mousemove", onMove)
    host.addEventListener("touchmove", onTouch, { passive: true })
    host.addEventListener("touchstart", onTouch, { passive: true })
    window.addEventListener("resize", onResize)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      canvas.remove()
      cancelAnimationFrame(rafRef.current)
      host.removeEventListener("mousemove", onMove)
      host.removeEventListener("touchmove", onTouch)
      host.removeEventListener("touchstart", onTouch)
      window.removeEventListener("resize", onResize)
      particles.current = []
      canvasRef.current = null
    }
  }, [wrapperElement, containerRef, zIndex])

  return null
}
