"use client"

import * as React from "react"

import { cn } from "@sonojs/ui/lib/utils"

function toRGBA(color: string, alpha = 1): string {
  if (!color) return `rgba(0, 255, 252, ${alpha})`

  if (color.startsWith("#")) {
    const hex =
      color.length === 4
        ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`
        : color

    if (hex.length === 7) {
      const r = Number.parseInt(hex.slice(1, 3), 16)
      const g = Number.parseInt(hex.slice(3, 5), 16)
      const b = Number.parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }

  if (typeof window === "undefined") return color

  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return color
    ctx.fillStyle = color
    const computed = ctx.fillStyle

    if (computed.startsWith("rgba")) {
      return computed.replace(/[\d.]+\)$/g, `${alpha})`)
    }
    if (computed.startsWith("rgb")) {
      return computed.replace("rgb", "rgba").replace(")", `, ${alpha})`)
    }
    if (computed.startsWith("#")) {
      const r = Number.parseInt(computed.slice(1, 3), 16)
      const g = Number.parseInt(computed.slice(3, 5), 16)
      const b = Number.parseInt(computed.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  } catch {
    return color
  }

  return color
}

export type ElectroBorderProps = React.ComponentProps<"div"> & {
  /** Border electric neon color */
  borderColor?: string
  /** Custom card background (optional; theme-adaptive by default) */
  cardBackground?: string
  /** Border thickness in px */
  borderWidth?: number
  /** Animation distortion intensity */
  distortion?: number
  /** Animation speed multiplier */
  animationSpeed?: number
  /** Border corner radius */
  radius?: string | number
  /** Outer glow rings */
  glow?: boolean
  /** Ambient radial aura behind the frame */
  aura?: boolean
  /** Glossy light overlays */
  overlay?: boolean
  /** Master toggle for glow, aura, and overlay (stroke stays) */
  effects?: boolean
  /** Glow / aura blur intensity */
  glowBlur?: number
  /** Turbulence noise octaves (lower = cheaper) */
  numOctaves?: number
}

function ElectroBorder({
  children,
  borderColor = "#00fffc",
  cardBackground,
  borderWidth = 2,
  distortion = 1,
  animationSpeed = 1,
  radius = "12px",
  glow = true,
  aura = true,
  overlay = true,
  effects = true,
  glowBlur = 32,
  numOctaves = 2,
  className,
  style,
  ...props
}: ElectroBorderProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const mainCardRef = React.useRef<HTMLDivElement>(null)
  const rawId = React.useId()
  const filterId = `turbulent-displace-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`

  const parsedRadius = typeof radius === "number" ? `${radius}px` : radius

  const updateFilter = React.useCallback(
    (wOverride?: number, hOverride?: number) => {
      const svg = svgRef.current
      const root = rootRef.current
      if (!svg || !root) return

      let w = wOverride
      let h = hOverride
      if (!w || !h) {
        const rect = root.getBoundingClientRect()
        w = Math.max(100, Math.round(rect.width || 350))
        h = Math.max(100, Math.round(rect.height || 500))
      }

      const dy1 = svg.querySelector<SVGAnimateElement>(
        `[id="${filterId}-dy-anim-1"]`
      )
      const dy2 = svg.querySelector<SVGAnimateElement>(
        `[id="${filterId}-dy-anim-2"]`
      )
      const dx1 = svg.querySelector<SVGAnimateElement>(
        `[id="${filterId}-dx-anim-1"]`
      )
      const dx2 = svg.querySelector<SVGAnimateElement>(
        `[id="${filterId}-dx-anim-2"]`
      )

      if (dy1) dy1.setAttribute("values", `${h}; 0`)
      if (dy2) dy2.setAttribute("values", `0; -${h}`)
      if (dx1) dx1.setAttribute("values", `${w}; 0`)
      if (dx2) dx2.setAttribute("values", `0; -${w}`)

      const duration = Math.max(0.1, 6 / Math.max(0.1, animationSpeed))
      const animations = [dy1, dy2, dx1, dx2]
      for (const anim of animations) {
        if (!anim) continue
        anim.setAttribute("dur", `${duration}s`)
        try {
          if (typeof anim.beginElement === "function") anim.beginElement()
        } catch {
          /* SMIL may be unavailable */
        }
      }

      const disp = svg.querySelector("feDisplacementMap")
      if (disp) disp.setAttribute("scale", `${30 * distortion}`)
    },
    [animationSpeed, distortion, filterId]
  )

  React.useLayoutEffect(() => {
    updateFilter()
    const root = rootRef.current
    if (!root) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width && height) {
        updateFilter(Math.round(width), Math.round(height))
      }
    })
    observer.observe(root)
    return () => observer.disconnect()
  }, [updateFilter])

  React.useEffect(() => {
    updateFilter()
  }, [updateFilter])

  // Pause SMIL when off-screen or when the user prefers reduced motion.
  React.useEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    if (!root || !svg) return

    const setPaused = (paused: boolean) => {
      try {
        if (paused && typeof svg.pauseAnimations === "function") {
          svg.pauseAnimations()
        } else if (!paused && typeof svg.unpauseAnimations === "function") {
          svg.unpauseAnimations()
        }
      } catch {
        /* ignore */
      }
    }

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setPaused(true)
      return
    }

    if (typeof IntersectionObserver === "undefined") return

    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting)
        setPaused(!visible)
      },
      { rootMargin: "250px" }
    )
    io.observe(root)

    const mq = matchMedia("(prefers-reduced-motion: reduce)")
    const onMq = () => setPaused(mq.matches || !visible)
    mq.addEventListener("change", onMq)

    return () => {
      io.disconnect()
      mq.removeEventListener("change", onMq)
    }
  }, [])

  const gradientColor = toRGBA(borderColor, 0.25)
  const electricLight = toRGBA(borderColor, 0.9)
  const electricDim = toRGBA(borderColor, 0.5)

  return (
    <div
      ref={rootRef}
      data-slot="electro-border"
      className={cn("relative w-full min-w-0 overflow-visible", className)}
      style={{
        borderRadius: parsedRadius,
        ...style,
      }}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          !cardBackground &&
            "bg-gradient-to-b from-card to-muted/40 dark:from-card dark:to-background"
        )}
        style={{
          borderRadius: parsedRadius,
          background: cardBackground || undefined,
        }}
      />

      {!cardBackground ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-60"
          style={{
            borderRadius: parsedRadius,
            background: `linear-gradient(-30deg, ${gradientColor}, transparent, ${gradientColor})`,
          }}
        />
      ) : null}

      <svg
        ref={svgRef}
        className="pointer-events-none absolute size-0 opacity-0"
        aria-hidden
        focusable="false"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={numOctaves}
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                id={`${filterId}-dy-anim-1`}
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={numOctaves}
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                id={`${filterId}-dy-anim-2`}
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={numOctaves}
              result="noise3"
              seed="2"
            />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate
                id={`${filterId}-dx-anim-1`}
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={numOctaves}
              result="noise4"
              seed="2"
            />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate
                id={`${filterId}-dx-anim-2`}
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Effect island stays LTR so SVG filter / stroke geometry never
          mirrors when the host writing direction is RTL. */}
      <div
        dir="ltr"
        className="pointer-events-none absolute inset-0"
        style={{ borderRadius: parsedRadius }}
      >
        {/* Sibling strokes (not nested) — nesting inside a bordered box
            would inset the filtered stroke by borderWidth. */}
        <div
          className="absolute inset-0"
          style={{
            border: `${borderWidth}px solid ${electricDim}`,
            borderRadius: parsedRadius,
          }}
        />
        <div
          ref={mainCardRef}
          className="absolute inset-0"
          style={{
            borderRadius: parsedRadius,
            border: `${borderWidth}px solid ${borderColor}`,
            filter: `url(#${filterId})`,
          }}
        />

        {effects && glow ? (
          <div
            className="absolute inset-0"
            style={{
              border: `${borderWidth}px solid ${electricDim}`,
              borderRadius: parsedRadius,
              filter: "blur(1px)",
              opacity: 0.8,
            }}
          />
        ) : null}

        {effects && glow ? (
          <div
            className="absolute inset-0"
            style={{
              border: `${borderWidth}px solid ${electricLight}`,
              borderRadius: parsedRadius,
              filter: "blur(4px)",
              opacity: 0.9,
            }}
          />
        ) : null}
      </div>

      {effects && overlay ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay dark:opacity-50"
          style={{
            borderRadius: parsedRadius,
            background: `linear-gradient(-30deg, ${electricLight}, transparent 35%, transparent 65%, ${electricLight})`,
          }}
        />
      ) : null}

      {effects && aura ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 scale-105 opacity-40 dark:opacity-60"
          style={{
            borderRadius: parsedRadius,
            filter: `blur(${glowBlur}px)`,
            background: `radial-gradient(ellipse at center, ${electricLight} 0%, ${electricDim} 40%, transparent 75%)`,
          }}
        />
      ) : null}

      <div
        className="relative z-10 size-full"
        style={{ borderRadius: parsedRadius }}
      >
        {children}
      </div>
    </div>
  )
}

export { ElectroBorder }
