"use client"

import * as React from "react"

import {
  DottedMap,
  type Marker,
} from "@sonojs/ui/components/dotted-map"
import { flagKr, flagUs } from "@sonojs/ui/components/dotted-map/flags"

type CountryCode = "kr" | "us"

type MyMarker = Marker & {
  overlay: {
    countryCode: CountryCode
    label: string
  }
}

const FLAG_SRC: Record<CountryCode, string> = {
  kr: flagKr,
  us: flagUs,
}

const markers: MyMarker[] = [
  {
    lat: 37.5665,
    lng: 126.978,
    size: 2.8,
    overlay: { countryCode: "kr", label: "Seoul" },
  },
  {
    lat: 40.7128,
    lng: -74.006,
    size: 2.8,
    overlay: { countryCode: "us", label: "NYC" },
  },
]

/** Same component users get from `sonojs add dotted-map`. */
export function DottedMapDefault() {
  const id = React.useId().replace(/:/g, "")

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-[12px] border border-border/70">
      <div className="pointer-events-none absolute inset-0 z-10 bg-radial from-transparent to-background to-200%" />
      <div className="relative z-0 size-full">
        <DottedMap<MyMarker>
          markers={markers}
          // Hide the default fill — overlay draws a centered flag + orange ring
          markerColor="transparent"
          renderMarkerOverlay={({ marker, x, y, r, index }) => {
            const { countryCode, label } = marker.overlay
            const href = FLAG_SRC[countryCode]
            const imgR = r * 0.82
            const size = imgR * 2
            const clipId = `${id}-flag-${index}`
            const ring = "#FF6900"

            const fontSize = r * 0.9
            const pillH = r * 1.5
            const pillW = label.length * (fontSize * 0.62) + r * 1.4
            const pillX = x + r + r * 0.6
            const pillY = y - pillH / 2

            return (
              <g key={`${countryCode}-${index}`} style={{ pointerEvents: "none" }}>
                <defs>
                  <clipPath id={clipId}>
                    <circle cx={x} cy={y} r={imgR} />
                  </clipPath>
                </defs>

                {/* Clip the group in SVG user space so the flag stays locked to (x, y) */}
                <g clipPath={`url(#${clipId})`}>
                  <image
                    href={href}
                    x={x - imgR}
                    y={y - imgR}
                    width={size}
                    height={size}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>

                {/* Orange ring concentric with the flag */}
                <circle
                  cx={x}
                  cy={y}
                  r={imgR}
                  fill="none"
                  stroke={ring}
                  strokeWidth={r * 0.14}
                />

                <rect
                  x={pillX}
                  y={pillY}
                  width={pillW}
                  height={pillH}
                  rx={pillH / 2}
                  fill="rgba(0,0,0,0.55)"
                />
                <text
                  x={pillX + r * 0.7}
                  y={y + fontSize * 0.35}
                  fontSize={fontSize}
                  fill="white"
                >
                  {label}
                </text>
              </g>
            )
          }}
        />
      </div>
    </div>
  )
}
