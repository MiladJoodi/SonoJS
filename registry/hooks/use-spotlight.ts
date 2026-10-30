"use client"

import { type RefObject, useEffect, useRef, useState } from "react"

export interface SpotlightEffectConfig {
  spotlightSize?: number
  spotlightIntensity?: number
  fadeSpeed?: number
  /** CSS rgb channels, e.g. `"255, 255, 255"` */
  glowColor?: string
  pulseSpeed?: number
  /** Soft vignette darkness 0–1 (outside the hole). */
  vignette?: number
  /** Scope the effect to this element instead of the viewport */
  containerRef?: RefObject<HTMLElement | null>
}

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor
}

export function useSpotlightEffect(
  config: SpotlightEffectConfig = {}
): [RefObject<HTMLCanvasElement | null>, boolean] {
  const {
    spotlightSize = 220,
    spotlightIntensity = 0.92,
    fadeSpeed = 0.14,
    glowColor = "255, 248, 240",
    pulseSpeed = 2600,
    vignette = 0.78,
    containerRef,
  } = config

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const spotlightPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const animationFrame = useRef<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    if (prefersReduced.matches) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef?.current ?? null
    const target: HTMLElement | Window = container ?? window

    const resizeCanvas = () => {
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      // Seed center so first frame isn't black corner.
      if (targetPos.current.x === 0 && targetPos.current.y === 0) {
        targetPos.current = {
          x: canvas.width / 2,
          y: canvas.height / 2,
        }
        spotlightPos.current = { ...targetPos.current }
      }
    }

    const handleMouseMove = (e: Event) => {
      const me = e as MouseEvent
      if (container) {
        const rect = container.getBoundingClientRect()
        targetPos.current = {
          x: me.clientX - rect.left,
          y: me.clientY - rect.top,
        }
      } else {
        targetPos.current = { x: me.clientX, y: me.clientY }
      }
      setIsHovered(true)
    }

    const handleMouseLeave = () => setIsHovered(false)

    const render = () => {
      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      )
      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      )

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = `rgba(0, 0, 0, ${vignette})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const pulseScale =
        1 + 0.08 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2)
      const currentSize = spotlightSize * pulseScale

      // Soft cutout
      const hole = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSize
      )
      hole.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`)
      hole.addColorStop(
        0.45,
        `rgba(${glowColor}, ${spotlightIntensity * 0.45})`
      )
      hole.addColorStop(0.78, `rgba(${glowColor}, 0.08)`)
      hole.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = hole
      ctx.beginPath()
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSize,
        0,
        Math.PI * 2
      )
      ctx.fill()

      // Warm glow edge (readable under light)
      ctx.globalCompositeOperation = "source-over"
      const glow = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSize * 0.15,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSize * 1.15
      )
      glow.addColorStop(0, `rgba(${glowColor}, 0.22)`)
      glow.addColorStop(0.55, `rgba(${glowColor}, 0.08)`)
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSize * 1.15,
        0,
        Math.PI * 2
      )
      ctx.fill()

      animationFrame.current = requestAnimationFrame(render)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    target.addEventListener("mousemove", handleMouseMove)
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave)
    } else {
      document.addEventListener("mouseleave", handleMouseLeave)
    }
    animationFrame.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      target.removeEventListener("mousemove", handleMouseMove)
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave)
      } else {
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (animationFrame.current != null) {
        cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [
    spotlightSize,
    spotlightIntensity,
    fadeSpeed,
    glowColor,
    pulseSpeed,
    vignette,
    containerRef,
  ])

  return [canvasRef, isHovered]
}

export default useSpotlightEffect
