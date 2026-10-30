"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface FairyDustCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  zIndex?: number
}

type Spark = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  hue: number
  twinkle: number
}

/**
 * Tiny primary/gold sparkles with gravity and twinkle.
 */
export function FairyDustCursor({
  containerRef,
  zIndex,
}: FairyDustCursorProps) {
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
    const sparks: Spark[] = []
    let raf = 0
    let emitAcc = 0

    const measure = () => {
      if (root) {
        w = root.clientWidth
        h = root.clientHeight
      } else {
        w = window.innerWidth
        h = window.innerHeight
      }
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

    const spawn = (x: number, y: number) => {
      const n = 2 + Math.floor(Math.random() * 3)
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -0.8 - Math.random() * 1.8,
          life: 30 + Math.random() * 28,
          max: 30 + Math.random() * 28,
          size: 1.2 + Math.random() * 2.4,
          hue: Math.random() > 0.45 ? 45 + Math.random() * 20 : 215 + Math.random() * 25,
          twinkle: Math.random() * Math.PI * 2,
        })
      }
    }

    const onMove = (e: MouseEvent) => {
      let x = e.clientX
      let y = e.clientY
      if (root) {
        const rect = root.getBoundingClientRect()
        x = e.clientX - rect.left
        y = e.clientY - rect.top
      }
      emitAcc += 1
      if (emitAcc >= 1) {
        emitAcc = 0
        spawn(x, y)
      }
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
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]!
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.055
        s.twinkle += 0.35
        s.life -= 1
        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        const base = Math.max(0, s.life / s.max)
        const tw = 0.55 + 0.45 * Math.sin(s.twinkle)
        const alpha = base * tw
        ctx.beginPath()
        ctx.fillStyle = `hsla(${s.hue}, 90%, 62%, ${alpha})`
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = `hsla(${s.hue}, 100%, 85%, ${alpha * 0.7})`
        ctx.arc(s.x, s.y, s.size * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }
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
