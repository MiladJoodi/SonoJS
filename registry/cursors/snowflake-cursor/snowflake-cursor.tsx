"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface SnowflakeCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  zIndex?: number
}

type Flake = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  rot: number
  vr: number
  arms: number
}

function drawFlake(
  ctx: CanvasRenderingContext2D,
  f: Flake,
  color: string,
  alpha: number
) {
  ctx.save()
  ctx.translate(f.x, f.y)
  ctx.rotate(f.rot)
  ctx.globalAlpha = alpha
  ctx.strokeStyle = color
  ctx.lineWidth = 1.2
  ctx.lineCap = "round"
  for (let i = 0; i < f.arms; i++) {
    const a = (i / f.arms) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(a) * f.size, Math.sin(a) * f.size)
    ctx.stroke()
    const mid = f.size * 0.55
    ctx.beginPath()
    ctx.moveTo(Math.cos(a) * mid, Math.sin(a) * mid)
    ctx.lineTo(
      Math.cos(a) * mid + Math.cos(a + 0.9) * f.size * 0.28,
      Math.sin(a) * mid + Math.sin(a + 0.9) * f.size * 0.28
    )
    ctx.stroke()
  }
  ctx.restore()
}

/**
 * Crystal snowflakes with spin and gentle fall along the pointer path.
 */
export function SnowflakeCursor({
  containerRef,
  zIndex,
}: SnowflakeCursorProps) {
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
    const flakes: Flake[] = []
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

    const readColor = () => {
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim()
      return primary || "#60A5FA"
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
      flakes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.4 + Math.random() * 1.1,
        life: 55 + Math.random() * 45,
        max: 55 + Math.random() * 45,
        size: 5 + Math.random() * 8,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.08,
        arms: 6,
      })
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
      if (emitAcc >= 2) {
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
      const color = readColor()
      for (let i = flakes.length - 1; i >= 0; i--) {
        const f = flakes[i]!
        f.x += f.vx
        f.y += f.vy
        f.vx += (Math.random() - 0.5) * 0.03
        f.rot += f.vr
        f.life -= 1
        if (f.life <= 0) {
          flakes.splice(i, 1)
          continue
        }
        drawFlake(ctx, f, color, Math.max(0, f.life / f.max) * 0.85)
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
