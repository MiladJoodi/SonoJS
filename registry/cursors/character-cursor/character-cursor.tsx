"use client"

import { type RefObject, useEffect, useRef } from "react"

export interface CharacterCursorProps {
  containerRef?: RefObject<HTMLElement | null>
  /** Characters that can spawn. */
  characters?: string
  zIndex?: number
}

type Glyph = {
  ch: string
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  rot: number
  vr: number
}

/**
 * Flying letter particles that drift and fade from the pointer.
 */
export function CharacterCursor({
  containerRef,
  characters = "ABCDEFGHKLMNPRSTUVWXYZ",
  zIndex,
}: CharacterCursorProps) {
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
    const glyphs: Glyph[] = []
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

    const readFg = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim() || "#18181b"

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
      const ch = characters[Math.floor(Math.random() * characters.length)]!
      glyphs.push({
        ch,
        x,
        y,
        vx: (Math.random() - 0.5) * 2.4,
        vy: -1.2 - Math.random() * 2.2,
        life: 40 + Math.random() * 35,
        max: 40 + Math.random() * 35,
        size: 11 + Math.random() * 10,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.12,
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
      if (emitAcc >= 3) {
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
      const color = readFg()
      for (let i = glyphs.length - 1; i >= 0; i--) {
        const g = glyphs[i]!
        g.x += g.vx
        g.y += g.vy
        g.vy += 0.04
        g.rot += g.vr
        g.life -= 1
        if (g.life <= 0) {
          glyphs.splice(i, 1)
          continue
        }
        const alpha = Math.max(0, g.life / g.max)
        ctx.save()
        ctx.translate(g.x, g.y)
        ctx.rotate(g.rot)
        ctx.globalAlpha = alpha * 0.9
        ctx.fillStyle = color
        ctx.font = `600 ${g.size}px ui-sans-serif, system-ui, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(g.ch, 0, 0)
        ctx.restore()
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
  }, [containerRef, characters, zIndex])

  return null
}
