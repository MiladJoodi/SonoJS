import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("dotted-map", "Dotted Map")

const exampleDefs = [
  {
    name: "dotted-map-default",
    title: "Default",
    description:
      "Markers with flag clip + label pill via `renderMarkerOverlay`. Import flags from `@/components/dotted-map/flags`.",
    npmRequires: ["svg-dotted-map"],
  },
  {
    name: "dotted-map-smaller-dots",
    title: "Smaller dots",
    description: "`dotRadius={0.1}` for a denser landmass silhouette.",
    npmRequires: ["svg-dotted-map"],
  },
  {
    name: "dotted-map-pulse",
    title: "Pulse markers",
    description:
      "`pulse` animates all markers; set `marker.pulse={false}` to opt out per pin.",
    npmRequires: ["svg-dotted-map"],
  },
]

const usageSource = `"use client"

import * as React from "react"

import { DottedMap, type Marker } from "@/components/dotted-map"
import { flagKr, flagUs } from "@/components/dotted-map/flags"

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

export default function DottedMapDemo() {
  const id = React.useId().replace(/:/g, "")

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-[12px] border border-border/70">
      <DottedMap<MyMarker>
        markers={markers}
        renderMarkerOverlay={({ marker, x, y, r, index }) => {
          const { countryCode, label } = marker.overlay
          const href = FLAG_SRC[countryCode]
          const imgR = r * 0.82
          const size = imgR * 2
          const clipId = \`\${id}-flag-\${index}\`
          const fontSize = r * 0.9
          const pillH = r * 1.5
          const pillW = label.length * (fontSize * 0.62) + r * 1.4
          const pillX = x + r + r * 0.6
          const pillY = y - pillH / 2

          return (
            <g key={\`\${countryCode}-\${index}\`} style={{ pointerEvents: "none" }}>
              <defs>
                <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                  <circle cx={0.5} cy={0.5} r={0.5} />
                </clipPath>
              </defs>
              <image
                href={href}
                x={x - imgR}
                y={y - imgR}
                width={size}
                height={size}
                preserveAspectRatio="xMidYMid slice"
                clipPath={\`url(#\${clipId})\`}
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
  )
}`

export default async function DottedMapDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Dotted Map"
        pathname="/docs/components/dotted-map"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An SVG dotted world map with optional markers, staggered rows, pulse
            rings, and a generic{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              renderMarkerOverlay
            </code>{" "}
            hook for custom pins.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewClassName="p-0" />
      </section>

      <DocsInstallation name="dotted-map" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "width",
              type: "number",
              defaultValue: "150",
              description: "Width of the SVG map coordinate space.",
            },
            {
              name: "height",
              type: "number",
              defaultValue: "75",
              description: "Height of the SVG map coordinate space.",
            },
            {
              name: "mapSamples",
              type: "number",
              defaultValue: "1200",
              description:
                "Landmass sample count. Land dots are painted to a cached bitmap (not one SVG node per sample). Raise only for denser maps.",
            },
            {
              name: "markers",
              type: "Marker[]",
              defaultValue: "[]",
              description: "Lat/lng markers projected onto the map.",
            },
            {
              name: "dotColor",
              type: "string",
              defaultValue: "currentColor",
              description: "Fill color for landmass dots.",
            },
            {
              name: "markerColor",
              type: "string",
              defaultValue: '"#FF6900"',
              description: "Fill/stroke color for markers and pulse rings.",
            },
            {
              name: "dotRadius",
              type: "number",
              defaultValue: "0.2",
              description: "Radius of map sample dots.",
            },
            {
              name: "stagger",
              type: "boolean",
              defaultValue: "true",
              description: "Offset alternating rows for a staggered look.",
            },
            {
              name: "pulse",
              type: "boolean",
              defaultValue: "false",
              description:
                "Animate all markers (respects prefers-reduced-motion; per-marker pulse=false opts out).",
            },
            {
              name: "renderMarkerOverlay",
              type: "(args) => ReactNode",
              description:
                "Custom SVG overlay per marker (x, y, r, and projected marker).",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the root SVG.",
            },
            {
              name: "style",
              type: "CSSProperties",
              description: "Inline styles merged into the SVG.",
            },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Marker</h2>
        <ComponentSource
          title="marker.ts"
          lang="ts"
          code={`export type Marker = {
  lat: number
  lng: number
  size?: number
  pulse?: boolean
}`}
        />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Set{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            pulse
          </code>{" "}
          on{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            DottedMap
          </code>{" "}
          to animate all markers, or set{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            marker.pulse
          </code>{" "}
          per pin. Extend{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            Marker
          </code>{" "}
          with generics when you need overlay data.
        </p>
      </section>
    </article>
  )
}
