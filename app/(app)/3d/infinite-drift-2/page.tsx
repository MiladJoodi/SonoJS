import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Infinite Drift 2",
  description:
    "WebGL inverted-dome gallery with tiled atlas, radial curve, drag inertia, and auto drift. Install with the SonoJS CLI.",
  path: "/3d/infinite-drift-2",
})

const exampleDefs = [
  {
    name: "infinite-drift-2-default",
    title: "Default",
    description:
      "Glass-rim tiles under a chromatic dome lens - drag or scroll to pan. Demo photos ship with the install.",
  },
]

const usage = `"use client"

import { InfiniteDrift2 } from "@/components/3d/infinite-drift-2"

export default function Page() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[12px] bg-canvas sm:h-[520px]">
      {/* 16 atlas photos install under components/3d/infinite-drift-2/images */}
      <InfiniteDrift2 height="100%" />
    </div>
  )
}`

export default async function InfiniteDrift2DocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Infinite Drift 2"
        pathname="/3d/infinite-drift-2"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Fullscreen WebGL gallery: infinite tiled image atlas, radial dome
            distortion, multi-touch inertial drag, and optional auto drift.
            Bundled atlas photos install under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/infinite-drift-2/images
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="bg-canvas p-0"
        />
      </section>

      <DocsInstallation name="infinite-drift-2" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "images",
              type: "string[]",
              defaultValue: "bundled atlas (16)",
              description:
                "Image URLs packed into a square atlas (up to 16 → 4×4 grid).",
            },
            {
              name: "curve",
              type: "number",
              defaultValue: "0.35",
              description:
                "Lens distortion (0 = flat, higher = deeper dome / fisheye).",
            },
            {
              name: "curveRadius",
              type: "number",
              defaultValue: "1.5",
              description: "Radial reach of the dome curve.",
            },
            {
              name: "zoom",
              type: "number",
              defaultValue: "0.08",
              description: "Zoom scale offset in the distortion formula.",
            },
            {
              name: "tileWidth",
              type: "number",
              defaultValue: "220",
              description: "Tile width in pixels.",
            },
            {
              name: "tileHeight",
              type: "number",
              defaultValue: "220",
              description: "Tile height in pixels.",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "18",
              description: "Gap between tiles in pixels.",
            },
            {
              name: "borderRadius",
              type: "number",
              defaultValue: "12",
              description: "Rounded corner radius for each tile.",
            },
            {
              name: "tileRotation",
              type: "number",
              defaultValue: "0",
              description: "Per-tile rotation in degrees.",
            },
            {
              name: "grayscale",
              type: "number",
              defaultValue: "0",
              description: "Grayscale mix (0 = color, 1 = monochrome).",
            },
            {
              name: "vignette",
              type: "number",
              defaultValue: "0.38",
              description: "Edge darkening intensity.",
            },
            {
              name: "chromaticAberration",
              type: "number",
              defaultValue: "0.55",
              description: "RGB fringe at the dome rim (0–1).",
            },
            {
              name: "glass",
              type: "number",
              defaultValue: "0.85",
              description: "Specular glass rim on tiles (0–1).",
            },
            {
              name: "depthFade",
              type: "number",
              defaultValue: "0.75",
              description: "How much edge tiles darken into the dome.",
            },
            {
              name: "autoScrollX",
              type: "number",
              defaultValue: "0.35",
              description: "Continuous drift speed on X.",
            },
            {
              name: "autoScrollY",
              type: "number",
              defaultValue: "0.15",
              description: "Continuous drift speed on Y.",
            },
            {
              name: "enableDrag",
              type: "boolean",
              defaultValue: "true",
              description: "Pointer drag panning.",
            },
            {
              name: "enableWheel",
              type: "boolean",
              defaultValue: "true",
              description: "Mouse wheel panning.",
            },
            {
              name: "axis",
              type: '"both" | "x" | "y"',
              defaultValue: '"both"',
              description: "Allowed pan axes.",
            },
            {
              name: "dragSensitivity",
              type: "number",
              defaultValue: "1",
              description: "Drag pan multiplier.",
            },
            {
              name: "wheelSensitivity",
              type: "number",
              defaultValue: "0.6",
              description: "Wheel pan multiplier.",
            },
            {
              name: "friction",
              type: "number",
              defaultValue: "0.92",
              description: "Inertia decay (0.80–0.98 typical).",
            },
            {
              name: "height",
              type: "string | number",
              defaultValue: "420",
              description: "Stage height (mobile-friendly default).",
            },
            {
              name: "width",
              type: "string | number",
              defaultValue: '"100%"',
              description: "Stage width.",
            },
            {
              name: "backgroundColor",
              type: "string",
              defaultValue: '"transparent"',
              description: "Container background behind the canvas.",
            },
            {
              name: "dpr",
              type: "number",
              defaultValue: "2",
              description: "Max device pixel ratio for rendering.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the stage.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Optional overlay content above the canvas.",
            },
          ]}
        />
      </section>
    </article>
  )
}
