"use client"

import * as React from "react"
import { createMap } from "svg-dotted-map"

import { cn } from "@sonojs/ui/lib/utils"

export type Marker = {
  lat: number
  lng: number
  size?: number
  pulse?: boolean
}

/** addMarkers returns markers with lat/lng removed; only x, y and other props (e.g. size) remain */
type MapMarker<M extends Marker> = Omit<M, "lat" | "lng"> & {
  x: number
  y: number
}

export type DottedMapProps<M extends Marker = Marker> =
  React.SVGProps<SVGSVGElement> & {
    width?: number
    height?: number
    mapSamples?: number
    markers?: M[]
    dotColor?: string
    markerColor?: string
    dotRadius?: number
    stagger?: boolean
    pulse?: boolean
    renderMarkerOverlay?: (args: {
      marker: MapMarker<M>
      index: number
      x: number
      y: number
      r: number
    }) => React.ReactNode
  }

/** Dense enough to read continents; light enough for install + docs. */
const DEFAULT_MAP_SAMPLES = 1200

const EMPTY_MARKERS: Marker[] = []

type MapPoint = { x: number; y: number }

type CachedMap = {
  points: MapPoint[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addMarkers: (markers: any[]) => any[]
  xStep: number
  yToRowIndex: Map<number, number>
}

const mapCache = new Map<string, CachedMap>()
const landImageCache = new Map<string, string>()

function buildStagger(points: MapPoint[]) {
  const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
  const rowMap = new Map<number, number>()
  let step = 0
  let prevY = Number.NaN
  let prevXInRow = Number.NaN

  for (const p of sorted) {
    if (p.y !== prevY) {
      prevY = p.y
      prevXInRow = Number.NaN
      if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
    }
    if (!Number.isNaN(prevXInRow)) {
      const delta = p.x - prevXInRow
      if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
    }
    prevXInRow = p.x
  }

  return { xStep: step || 1, yToRowIndex: rowMap }
}

function getCachedMap(
  width: number,
  height: number,
  mapSamples: number
): CachedMap {
  const key = `${width}x${height}x${mapSamples}`
  const hit = mapCache.get(key)
  if (hit) return hit

  const { points, addMarkers } = createMap({ width, height, mapSamples })
  const stagger = buildStagger(points)
  const entry: CachedMap = {
    points,
    addMarkers,
    xStep: stagger.xStep,
    yToRowIndex: stagger.yToRowIndex,
  }
  mapCache.set(key, entry)
  return entry
}

function paintLandImage(args: {
  width: number
  height: number
  points: MapPoint[]
  xStep: number
  yToRowIndex: Map<number, number>
  stagger: boolean
  dotRadius: number
  fill: string
}): string {
  const cacheKey = [
    args.width,
    args.height,
    args.points.length,
    args.xStep,
    args.stagger,
    args.dotRadius,
    args.fill,
  ].join("|")
  const hit = landImageCache.get(cacheKey)
  if (hit) return hit

  const scale = 8
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(args.width * scale))
  canvas.height = Math.max(1, Math.round(args.height * scale))
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  ctx.scale(scale, scale)
  ctx.fillStyle = args.fill

  for (const point of args.points) {
    const rowIndex = args.yToRowIndex.get(point.y) ?? 0
    const offsetX = args.stagger && rowIndex % 2 === 1 ? args.xStep / 2 : 0
    ctx.beginPath()
    ctx.arc(point.x + offsetX, point.y, args.dotRadius, 0, Math.PI * 2)
    ctx.fill()
  }

  const href = canvas.toDataURL("image/png")
  landImageCache.set(cacheKey, href)
  return href
}

function subscribeReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  mediaQuery.addEventListener("change", onChange)
  return () => mediaQuery.removeEventListener("change", onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export function DottedMap<M extends Marker = Marker>({
  width = 150,
  height = 75,
  mapSamples = DEFAULT_MAP_SAMPLES,
  markers = EMPTY_MARKERS as M[],
  dotColor = "currentColor",
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  pulse = false,
  renderMarkerOverlay,
  className,
  style,
  ...svgProps
}: DottedMapProps<M>) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const reduceMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
  const [landHref, setLandHref] = React.useState<string | null>(null)

  const { points, addMarkers, xStep, yToRowIndex } = React.useMemo(
    () => getCachedMap(width, height, mapSamples),
    [width, height, mapSamples]
  )

  const processedMarkers = React.useMemo(
    () => addMarkers(markers),
    [addMarkers, markers]
  )

  React.useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paint = () => {
      const resolved =
        !dotColor || dotColor === "currentColor"
          ? getComputedStyle(svg).color || "#737373"
          : dotColor

      const href = paintLandImage({
        width,
        height,
        points,
        xStep,
        yToRowIndex,
        stagger,
        dotRadius,
        fill: resolved,
      })
      setLandHref(href || null)
    }

    paint()

    // Theme toggles change `currentColor` without remounting the map.
    const root = document.documentElement
    const observer = new MutationObserver(paint)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [
    width,
    height,
    points,
    xStep,
    yToRowIndex,
    stagger,
    dotRadius,
    dotColor,
  ])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("text-muted-foreground", className)}
      style={{ width: "100%", height: "100%", ...style }}
      {...svgProps}
    >
      {landHref ? (
        <image
          href={landHref}
          x={0}
          y={0}
          width={width}
          height={height}
          preserveAspectRatio="none"
          aria-hidden
        />
      ) : null}

      {processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0

        const x = marker.x + offsetX
        const y = marker.y
        const r = marker.size ?? dotRadius
        const shouldPulse =
          !reduceMotion &&
          (pulse ? marker.pulse !== false : marker.pulse === true)
        const pulseTo = r * 2.8

        return (
          <g key={`${marker.x}-${marker.y}-${index}`}>
            <circle cx={x} cy={y} r={r} fill={markerColor} />

            {shouldPulse ? (
              <g pointerEvents="none">
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={1}
                  strokeWidth={0.35}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={markerColor}
                  strokeOpacity={0.9}
                  strokeWidth={0.3}
                >
                  <animate
                    attributeName="r"
                    values={`${r};${pulseTo}`}
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0"
                    dur="1.4s"
                    begin="0.7s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ) : null}

            {renderMarkerOverlay?.({
              marker: { ...marker, x, y },
              index,
              x,
              y,
              r,
            })}
          </g>
        )
      })}
    </svg>
  )
}
