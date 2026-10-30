"use client"

import { type RefObject, useEffect } from "react"

export interface FollowCursorProps {
  /** Override fill; defaults to themed foreground. */
  color?: string
  zIndex?: number
  containerRef?: RefObject<HTMLElement | null>
  /** How many ghost dots trail behind the leader. */
  trailLength?: number
}

/**
 * Soft canvas leader with a short fading ghost trail (3–5 dots).
 */
export function FollowCursor({
  color,
  zIndex,
  containerRef,
  trailLength = 5,
}: FollowCursorProps) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (prefersReduced.matches) return

    let canvas: HTMLCanvasElement | null = null
    let ctx: CanvasRenderingContext2D | null = null
    let raf = 0
    let w = 0
    let h = 0
    const cursor = { x: 0, y: 0 }

    const readFg = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground")
        .trim()
      return raw || "#18181b"
    }

    const fill =
      color ??
      `color-mix(in oklab, ${readFg()} 72%, transparent)`

    type Node = { x: number; y: number; size: number; lag: number }
    const nodes: Node[] = Array.from(
      { length: Math.max(1, trailLength) },
      (_, i) => ({
        x: 0,
        y: 0,
        size: Math.max(3, 11 - i * 1.4),
        lag: 6 + i * 3.5,
      })
    )

    const measure = () => {
      const el = containerRef?.current
      if (el) {
        w = el.clientWidth
        h = el.clientHeight
      } else {
        w = window.innerWidth
        h = window.innerHeight
      }
    }

    const onMove = (e: MouseEvent) => {
      const el = containerRef?.current
      if (el) {
        const rect = el.getBoundingClientRect()
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

    const destroy = () => {
      cancelAnimationFrame(raf)
      canvas?.remove()
      canvas = null
      const el = containerRef?.current
      ;(el ?? window).removeEventListener(
        "mousemove",
        onMove as EventListener
      )
      window.removeEventListener("resize", onResize)
    }

    const loop = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      let tx = cursor.x
      let ty = cursor.y
      nodes.forEach((node, i) => {
        node.x += (tx - node.x) / node.lag
        node.y += (ty - node.y) / node.lag
        const alpha = 1 - i / (nodes.length + 0.5)
        ctx!.globalAlpha = alpha
        ctx!.fillStyle = fill
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx!.fill()
        tx = node.x
        ty = node.y
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(loop)
    }

    measure()
    cursor.x = w / 2
    cursor.y = h / 2
    nodes.forEach((n) => {
      n.x = cursor.x
      n.y = cursor.y
    })

    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d")
    canvas.width = w
    canvas.height = h
    canvas.style.pointerEvents = "none"
    canvas.style.insetInlineStart = "0"
    canvas.style.top = "0"
    if (zIndex != null) canvas.style.zIndex = String(zIndex)

    const el = containerRef?.current
    if (el) {
      canvas.style.position = "absolute"
      el.appendChild(canvas)
      el.addEventListener("mousemove", onMove)
    } else {
      canvas.style.position = "fixed"
      document.body.appendChild(canvas)
      window.addEventListener("mousemove", onMove)
    }
    window.addEventListener("resize", onResize)
    raf = requestAnimationFrame(loop)

    return destroy
  }, [color, zIndex, containerRef, trailLength])

  return null
}
