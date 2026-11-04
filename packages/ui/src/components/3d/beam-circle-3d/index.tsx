"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

import {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  ViteIcon,
} from "./icons"

export {
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  ViteIcon,
  type TechIconProps,
} from "./icons"

export type BeamOrbitConfig = {
  id: number
  /** Orbit radius as a fraction of viewBox width. */
  radiusFactor?: number
  /** Seconds for one travel cycle. Default 10. */
  speed?: number
  orbitColor?: string
  orbitThickness?: number
  orbitOpacity?: number
  boxColor?: string
  glowColor?: string
  /** Badge diameter in px. Default 32. */
  size?: number
  /** Initial offset along the arc (0–1). */
  delay?: number
  direction?: "cw" | "ccw"
  children?: React.ReactNode
}

export type BeamCircle3DProps = {
  width?: string | number
  height?: string | number
  viewBoxWidth?: number
  viewBoxHeight?: number
  mode?: "semi-circle" | "full-circle"
  orbits?: BeamOrbitConfig[]
  orbitDirection?: "cw" | "ccw"
  orbitThickness?: number
  arcOpacity?: number
  arcGlowIntensity?: number
  showArcs?: boolean
  badgeBorderWidth?: number
  badgeBorderColor?: string
  badgeShadow?: "none" | "sm" | "md" | "lg" | "glow"
  badgeBorderRadius?: string
  centerContent?: React.ReactNode
  centerNodeSize?: number
  centerGlow?: boolean
  animationPaused?: boolean
  speedMultiplier?: number
  className?: string
}

const DEFAULT_SEMI_ORBITS: BeamOrbitConfig[] = [
  {
    id: 0,
    radiusFactor: 0.16,
    speed: 8,
    size: 36,
    delay: 0.1,
    glowColor: "#2563EB",
    boxColor: "var(--card)",
    children: <ReactIcon size={30} />,
  },
  {
    id: 1,
    radiusFactor: 0.22,
    speed: 12,
    size: 40,
    delay: 0.4,
    glowColor: "#396EF0",
    boxColor: "var(--card)",
    children: <ViteIcon size={34} />,
  },
  {
    id: 2,
    radiusFactor: 0.28,
    speed: 16,
    size: 42,
    delay: 0.7,
    glowColor: "#60A5FA",
    boxColor: "var(--card)",
    children: <TailwindIcon size={36} />,
  },
  {
    id: 3,
    radiusFactor: 0.34,
    speed: 22,
    size: 44,
    delay: 0.88,
    glowColor: "#93C5FD",
    boxColor: "var(--card)",
    children: <NextjsIcon size={38} />,
  },
]

function resolveShadow(
  shadow: BeamCircle3DProps["badgeShadow"],
  glowColor?: string
): string {
  if (glowColor) return `0 0 16px ${glowColor}66, 0 2px 8px rgba(0,0,0,0.15)`
  switch (shadow) {
    case "none":
      return "none"
    case "sm":
      return "0 1px 4px rgba(0,0,0,0.10)"
    case "lg":
      return "0 4px 20px rgba(0,0,0,0.22)"
    case "glow":
      return "0 0 24px rgba(0,0,0,0.30), 0 2px 12px rgba(0,0,0,0.18)"
    default:
      return "0 2px 8px rgba(0,0,0,0.12)"
  }
}

function ArcTravelerBadge({
  cx,
  cy,
  radius,
  speed = 10,
  delay = 0,
  badgeSize = 32,
  boxColor,
  glowColor,
  isFullCircle = false,
  direction = "cw",
  paused = false,
  speedMultiplier = 1,
  borderWidth = 1,
  borderColor,
  shadow = "md",
  borderRadius = "9999px",
  children,
}: {
  cx: number
  cy: number
  radius: number
  speed?: number
  delay?: number
  badgeSize?: number
  boxColor?: string
  glowColor?: string
  isFullCircle?: boolean
  direction?: "cw" | "ccw"
  paused?: boolean
  speedMultiplier?: number
  borderWidth?: number
  borderColor?: string
  shadow?: BeamCircle3DProps["badgeShadow"]
  borderRadius?: string
  children?: React.ReactNode
}) {
  const foRef = React.useRef<SVGForeignObjectElement>(null)
  const lastRef = React.useRef(0)
  const tAccRef = React.useRef(delay * speed)
  const pausedRef = React.useRef(paused)
  const speedMultRef = React.useRef(speedMultiplier)

  React.useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  React.useEffect(() => {
    speedMultRef.current = speedMultiplier
  }, [speedMultiplier])

  React.useEffect(() => {
    tAccRef.current = delay * speed
  }, [delay, speed])

  React.useEffect(() => {
    let frame = 0
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const place = (x: number, y: number) => {
      const el = foRef.current
      if (!el) return
      el.setAttribute("x", String(x - badgeSize / 2))
      el.setAttribute("y", String(y - badgeSize / 2))
    }

    // Initial position
    if (isFullCircle) {
      const angle = (tAccRef.current / speed) * 2 * Math.PI
      place(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
    } else {
      const progress = (Math.sin((tAccRef.current / speed) * Math.PI) + 1) / 2
      const rawAngle = Math.PI - progress * Math.PI
      const angle = direction === "ccw" ? Math.PI - rawAngle : rawAngle
      place(cx + radius * Math.cos(angle), cy - radius * Math.sin(angle))
    }

    if (reduce) return

    const tick = (ts: number) => {
      const dt = lastRef.current ? (ts - lastRef.current) / 1000 : 0
      lastRef.current = ts

      if (!pausedRef.current) {
        tAccRef.current += dt * speedMultRef.current
      }

      const t = tAccRef.current
      let x: number
      let y: number

      if (isFullCircle) {
        const angle =
          (t / speed) * 2 * Math.PI * (direction === "ccw" ? -1 : 1)
        x = cx + radius * Math.cos(angle)
        y = cy + radius * Math.sin(angle)
      } else {
        const progress = (Math.sin((t / speed) * Math.PI) + 1) / 2
        const rawAngle = Math.PI - progress * Math.PI
        const angle = direction === "ccw" ? Math.PI - rawAngle : rawAngle
        x = cx + radius * Math.cos(angle)
        y = cy - radius * Math.sin(angle)
      }

      place(x, y)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [cx, cy, radius, speed, delay, isFullCircle, direction, badgeSize])

  const resolvedBorder = glowColor
    ? `${glowColor}99`
    : (borderColor ?? "currentColor")

  return (
    <foreignObject
      ref={foRef}
      width={badgeSize}
      height={badgeSize}
      style={{ overflow: "visible" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius,
          borderStyle: "solid",
          borderWidth: `${borderWidth}px`,
          borderColor: resolvedBorder,
          backgroundColor: boxColor ?? "transparent",
          boxShadow: resolveShadow(shadow, glowColor),
          boxSizing: "border-box",
          padding: 0,
        }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(
              children as React.ReactElement<{ size?: number }>,
              { size: Math.round(badgeSize * 0.86) }
            )
          : children}
      </div>
    </foreignObject>
  )
}

export function BeamCircle3D({
  width = "100%",
  height = "100%",
  viewBoxWidth = 800,
  viewBoxHeight = 300,
  mode = "semi-circle",
  orbits: customOrbits,
  orbitDirection = "cw",
  orbitThickness = 1.5,
  arcOpacity = 0.75,
  arcGlowIntensity = 0.75,
  showArcs = true,
  badgeBorderWidth = 1,
  badgeBorderColor,
  badgeShadow = "md",
  badgeBorderRadius = "9999px",
  centerContent,
  centerNodeSize = 52,
  centerGlow = true,
  animationPaused = false,
  speedMultiplier = 1,
  className,
}: BeamCircle3DProps) {
  const orbits = React.useMemo(
    () => customOrbits ?? DEFAULT_SEMI_ORBITS,
    [customOrbits]
  )

  const cx = viewBoxWidth / 2
  // Flush the arc baseline to the bottom edge of the stage (no leftover gap).
  const cy = mode === "semi-circle" ? viewBoxHeight : viewBoxHeight / 2

  const midOpacity = arcOpacity * arcGlowIntensity
  const edgeOpacity = arcOpacity * arcGlowIntensity * 0.6

  const resolveRadius = (radiusFactor: number, badgeSize: number) => {
    const raw = viewBoxWidth * radiusFactor
    const pad = badgeSize / 2 + 10
    const maxR =
      mode === "semi-circle"
        ? Math.max(0, cy - pad)
        : Math.max(0, Math.min(cx, cy) - pad)
    return Math.min(raw, maxR)
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-end overflow-hidden bg-transparent text-foreground select-none transition-colors duration-300",
        className
      )}
      style={{ width, height }}
    >
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMax meet"
        className="block size-full"
        aria-hidden={!centerContent}
      >
        <defs>
          {orbits.map((orbit) => {
            const r = resolveRadius(
              orbit.radiusFactor ?? 0.3,
              orbit.size ?? 32
            )
            const gradId = `arcGrad_${orbit.id}`
            const x0 = cx - r
            const x1 = cx + r
            const oMid =
              orbit.orbitOpacity !== undefined
                ? orbit.orbitOpacity * arcGlowIntensity
                : midOpacity
            const oEdge =
              orbit.orbitOpacity !== undefined
                ? orbit.orbitOpacity * arcGlowIntensity * 0.6
                : edgeOpacity
            return (
              <linearGradient
                key={gradId}
                id={gradId}
                x1={x0}
                y1={cy}
                x2={x1}
                y2={cy}
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0%"
                  stopColor={orbit.orbitColor ?? "currentColor"}
                  stopOpacity={0}
                />
                <stop
                  offset="20%"
                  stopColor={orbit.orbitColor ?? "currentColor"}
                  stopOpacity={oEdge}
                />
                <stop
                  offset="50%"
                  stopColor={orbit.orbitColor ?? "currentColor"}
                  stopOpacity={oMid}
                />
                <stop
                  offset="80%"
                  stopColor={orbit.orbitColor ?? "currentColor"}
                  stopOpacity={oEdge}
                />
                <stop
                  offset="100%"
                  stopColor={orbit.orbitColor ?? "currentColor"}
                  stopOpacity={0}
                />
              </linearGradient>
            )
          })}
        </defs>

        {showArcs
          ? orbits.map((orbit) => {
              const r = resolveRadius(
                orbit.radiusFactor ?? 0.3,
                orbit.size ?? 32
              )
              const thickness = orbit.orbitThickness ?? orbitThickness
              const gradId = `arcGrad_${orbit.id}`

              return (
                <g key={`arc_${orbit.id}`}>
                  {mode === "semi-circle" ? (
                    <path
                      d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                      fill="none"
                      stroke={`url(#${gradId})`}
                      strokeWidth={thickness}
                      strokeLinecap="round"
                    />
                  ) : (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="none"
                      stroke={orbit.orbitColor ?? "currentColor"}
                      strokeWidth={thickness}
                      strokeOpacity={orbit.orbitOpacity ?? arcOpacity}
                    />
                  )}
                </g>
              )
            })
          : null}

        {orbits.map((orbit) => {
          const badgeSize = orbit.size ?? 32
          const r = resolveRadius(orbit.radiusFactor ?? 0.3, badgeSize)
          return (
            <ArcTravelerBadge
              key={`badge_${orbit.id}`}
              cx={cx}
              cy={cy}
              radius={r}
              speed={orbit.speed ?? 10}
              delay={orbit.delay ?? 0}
              badgeSize={badgeSize}
              boxColor={orbit.boxColor}
              glowColor={orbit.glowColor}
              isFullCircle={mode === "full-circle"}
              direction={orbit.direction ?? orbitDirection}
              paused={animationPaused}
              speedMultiplier={speedMultiplier}
              borderWidth={badgeBorderWidth}
              borderColor={badgeBorderColor}
              shadow={badgeShadow}
              borderRadius={badgeBorderRadius}
            >
              {orbit.children}
            </ArcTravelerBadge>
          )
        })}

        {centerGlow && !centerContent ? (
          <circle
            cx={cx}
            cy={cy}
            r={18}
            className="pointer-events-none fill-primary/30"
          />
        ) : null}

        {centerContent ? (
          <foreignObject
            x={cx - centerNodeSize / 2}
            y={
              mode === "semi-circle"
                ? cy - centerNodeSize
                : cy - centerNodeSize / 2
            }
            width={centerNodeSize}
            height={centerNodeSize}
            style={{ overflow: "visible" }}
          >
            <div
              className="relative flex size-full items-center justify-center"
              style={
                centerGlow
                  ? {
                      filter:
                        "drop-shadow(0 0 12px color-mix(in oklab, var(--primary) 45%, transparent))",
                    }
                  : undefined
              }
            >
              {centerContent}
            </div>
          </foreignObject>
        ) : null}
      </svg>
    </div>
  )
}

export default BeamCircle3D
export const ThreeDBeamCircle = BeamCircle3D
