"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface SpringyCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  /** Number of beads in the spring chain. */
  count?: number
  zIndex?: number
}

type Bead = { x: number; y: number; vx: number; vy: number }

/**
 * Physics spring chain of primary beads (no emoji).
 */
export function SpringyCursor({
  containerRef,
  count = 8,
  zIndex,
}: SpringyCursorProps) {
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
    const cursor = { x: 0, y: 0 }
    const beads: Bead[] = Array.from({ length: count }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }))
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

    const readPrimary = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim()
      return raw || "#2563EB"
    }

    measure()
    cursor.x = w / 2
    cursor.y = h / 2
    beads.forEach((b) => {
      b.x = cursor.x
      b.y = cursor.y
    })

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

    const toLocal = (e: MouseEvent) => {
      if (root) {
        const rect = root.getBoundingClientRect()
        cursor.x = e.clientX - rect.left
        cursor.y = e.clientY - rect.top
      } else {
        cursor.x = e.clientX
        cursor.y = e.clientY
      }
    }

    const onResize = () => {
      measure()
      if (canvas) {
        canvas.width = w
        canvas.height = h
      }
    }

    const stiffness = 0.28
    const damping = 0.62
    const rest = 14

    const loop = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, w, h)

      let tx = cursor.x
      let ty = cursor.y
      const color = readPrimary()

      beads.forEach((b, i) => {
        const dx = tx - b.x
        const dy = ty - b.y
        const dist = Math.hypot(dx, dy) || 1
        const stretch = dist - rest
        const fx = (dx / dist) * stretch * stiffness
        const fy = (dy / dist) * stretch * stiffness
        b.vx = (b.vx + fx) * damping
        b.vy = (b.vy + fy) * damping
        b.x += b.vx
        b.y += b.vy

        if (i > 0) {
          const prev = beads[i - 1]!
          ctx.beginPath()
          ctx.strokeStyle = `color-mix(in oklab, ${color} 40%, transparent)`
          ctx.lineWidth = 1.5
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }

        const r = Math.max(2.5, 7 - i * 0.45)
        ctx.beginPath()
        ctx.fillStyle =
          i === 0
            ? color
            : `color-mix(in oklab, ${color} ${Math.max(25, 85 - i * 8)}%, transparent)`
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2)
        ctx.fill()

        tx = b.x
        ty = b.y
      })

      raf = requestAnimationFrame(loop)
    }

    const host: HTMLElement | Window = root ?? window
    host.addEventListener("mousemove", toLocal as EventListener)
    window.addEventListener("resize", onResize)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      canvas?.remove()
      canvas = null
      host.removeEventListener("mousemove", toLocal as EventListener)
      window.removeEventListener("resize", onResize)
    }
  }, [containerRef, count, zIndex])

  return null
}
