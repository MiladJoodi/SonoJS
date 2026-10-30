"use client"

import {
  type HTMLAttributes,
  type RefObject,
} from "react"

import { cn } from "@/lib/utils"
import { useSpotlightEffect } from "@/registry/hooks/use-spotlight"

export interface SpotlightCursorConfig {
  /** Spotlight radius in px (maps to spotlightSize). */
  radius?: number
  /** Hole brightness 0–1 (maps to spotlightIntensity). */
  brightness?: number
  /** Glow as CSS rgb channels, e.g. `"255, 255, 255"`. */
  color?: string
  /** Lerp factor toward the pointer (maps to fadeSpeed). */
  smoothing?: number
  pulseSpeed?: number
  /** Outside darkness 0–1. */
  vignette?: number
}

export interface SpotlightCursorProps
  extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightCursorConfig
  containerRef?: RefObject<HTMLElement | null>
}

/**
 * Soft vignette spotlight — content under the beam stays readable (no WebGL).
 */
export function SpotlightCursor({
  config = {},
  containerRef,
  className,
  ...rest
}: SpotlightCursorProps) {
  const {
    radius = 240,
    brightness = 0.95,
    color = "255, 248, 236",
    smoothing = 0.14,
    pulseSpeed = 2600,
    vignette = 0.8,
  } = config

  const [canvasRef] = useSpotlightEffect({
    spotlightSize: radius,
    spotlightIntensity: brightness,
    fadeSpeed: smoothing,
    glowColor: color,
    pulseSpeed,
    vignette,
    containerRef,
  })

  const scoped = Boolean(containerRef)

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none z-[9999]",
        scoped
          ? "absolute inset-0 size-full"
          : "fixed inset-0 size-full",
        className
      )}
      aria-hidden
      {...rest}
    />
  )
}
