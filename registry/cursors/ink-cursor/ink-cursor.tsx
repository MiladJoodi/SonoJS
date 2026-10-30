"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface InkCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  zIndex?: number
}

type Stamp = {
  x: number
  y: number
  r: number
  life: number
  max: number
  vx: number
  vy: number
}

/**
 * Soft liquid-ink smear via Canvas 2D velocity (no WebGL).
 */
export function InkCursor({ containerRef, zIndex }: InkCursorProps) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (prefersReduced.matches) return

    const root = containerRef?.current ?? null
    let canvas: HTMLCanvasElement | null = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    const stamps: Stamp[] = []
    const cursor = { x: 0, y: 0 }
    const prev = { x: 0, y: 0, ready: false }
    let raf = 0

    const measure = () => {
      if (root) {
        w = root.clientWidth
        h = root.clientHeight
      } else {
        w = window.innerWidth
        h = window.innerHeight
      }
    }

    const readInk = () => {
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim()
      return primary || "#2563EB"
    }

    measure()
    canvas.width = w
    canvas.height = h
    canvas.style.pointerEvents = "none"
    canvas.style.insetInlineStart = "0"
    canvas.style.top = "0"
    if (zIndex != null) canvas.style.zIndex = String(zIndex)

    if (root) {
      canvas.style.position = "absolute"
      root.appendChild(canvas)
    } else {
      canvas.style.position = "fixed"
      document.body.appendChild(canvas)
    }

    const onMove = (e: MouseEvent) => {
      if (root) {
        const rect = root.getBoundingClientRect()
        cursor.x = e.clientX - rect.left
        cursor.y = e.clientY - rect.top
      } else {
        cursor.x = e.clientX
        cursor.y = e.clientY
      }

      if (!prev.ready) {
        prev.x = cursor.x
        prev.y = cursor.y
        prev.ready = true
        return
      }

      const dx = cursor.x - prev.x
      const dy = cursor.y - prev.y
      const speed = Math.min(28, Math.hypot(dx, dy))
      const steps = Math.max(1, Math.floor(speed / 4))
      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps
        stamps.push({
          x: prev.x + dx * t,
          y: prev.y + dy * t,
          r: 3.5 + speed * 0.22 + Math.random() * 2,
          life: 22 + Math.random() * 14,
          max: 22 + Math.random() * 14,
          vx: dx * 0.04,
          vy: dy * 0.04,
        })
      }
      prev.x = cursor.x
      prev.y = cursor.y
      if (stamps.length > 120) stamps.splice(0, stamps.length - 120)
    }

    const onResize = () => {
      measure()
      if (canvas) {
        canvas.width = w
        canvas.height = h
      }
    }

    const loop = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, w, h)
      const ink = readInk()

      for (let i = stamps.length - 1; i >= 0; i--) {
        const s = stamps[i]!
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.92
        s.vy *= 0.92
        s.life -= 1
        s.r *= 0.985
        if (s.life <= 0 || s.r < 0.4) {
          stamps.splice(i, 1)
          continue
        }
        const alpha = Math.max(0, s.life / s.max) * 0.55
        ctx.beginPath()
        ctx.fillStyle = `color-mix(in oklab, ${ink} ${Math.round(alpha * 100)}%, transparent)`
        ctx.arc(s.x, s.y, Math.max(0.5, s.r), 0, Math.PI * 2)
        ctx.fill()
      }

      // Leading tip
      ctx.beginPath()
      ctx.fillStyle = ink
      ctx.arc(cursor.x, cursor.y, 3.2, 0, Math.PI * 2)
      ctx.fill()

      raf = requestAnimationFrame(loop)
    }

    const host: HTMLElement | Window = root ?? window
    host.addEventListener("mousemove", onMove as EventListener)
    window.addEventListener("resize", onResize)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      canvas?.remove()
      canvas = null
      host.removeEventListener("mousemove", onMove as EventListener)
      window.removeEventListener("resize", onResize)
    }
  }, [containerRef, zIndex])

  return null
}
