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
  title: "Image Ring",
  description:
    "An editorial 3D image orbit with depth fade, inertia snap, keyboard control, and optional autoplay. Install with the SonoJS CLI.",
  path: "/3d/image-ring",
})

const exampleDefs = [
  {
    name: "image-ring-default",
    title: "Default",
    description:
      "Drag to orbit, click dots or use arrow keys to step. Front face lifts; sides fall away with depth.",
  },
]

const usage = `"use client"

import { ImageRing } from "@/components/3d/image-ring"

export default function Page() {
  return (
    <div className="h-[560px] w-full">
      <ImageRing
        captions={["Midnight market", "Glass canyon", "Quiet harbour"]}
        autoPlayMs={4200}
      />
    </div>
  )
}`

export default async function ImageRingDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Ring"
        pathname="/3d/image-ring"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An editorial orbit of framed plates - drag for inertia, snap to the
            nearest face, step with keys or dots. Depth fade, focus scale, and a
            light HUD ship on by default. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="image-ring" />

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
              defaultValue: "bundled ./images",
              description:
                "Image URLs around the ring. Defaults to the shipped `images/` files next to the component.",
            },
            {
              name: "captions",
              type: "string[]",
              description: "Optional labels aligned with `images` for the HUD.",
            },
            {
              name: "width",
              type: "number",
              defaultValue: "280",
              description: "Face width in pixels. Height follows `aspectRatio`.",
            },
            {
              name: "aspectRatio",
              type: "number",
              defaultValue: "0.75",
              description: "Width ÷ height of each plate (default 3/4).",
            },
            {
              name: "perspective",
              type: "number",
              defaultValue: "1800",
              description: "CSS perspective distance.",
            },
            {
              name: "imageDistance",
              type: "number",
              defaultValue: "460",
              description: "Distance of each face from the ring center.",
            },
            {
              name: "depthFade",
              type: "number",
              defaultValue: "0.78",
              description: "Opacity floor for the farthest faces.",
            },
            {
              name: "focusScale",
              type: "number",
              defaultValue: "1.04",
              description: "Scale lift applied to the front face.",
            },
            {
              name: "showHud",
              type: "boolean",
              defaultValue: "true",
              description: "Index strip + caption under the stage.",
            },
            {
              name: "showDots",
              type: "boolean",
              defaultValue: "true",
              description: "Snap dots for direct face selection.",
            },
            {
              name: "autoPlayMs",
              type: "number",
              defaultValue: "0",
              description: "Idle advance interval in ms. `0` disables.",
            },
            {
              name: "draggable",
              type: "boolean",
              defaultValue: "true",
              description: "Enable drag and inertia spin.",
            },
            {
              name: "onIndexChange",
              type: "(index: number) => void",
              description: "Called when the front face index changes.",
            },
            {
              name: "initialRotation",
              type: "number",
              defaultValue: "180",
              description: "Starting rotateY in degrees.",
            },
            {
              name: "animationDuration",
              type: "number",
              defaultValue: "1.15",
              description: "Entrance duration in seconds.",
            },
            {
              name: "staggerDelay",
              type: "number",
              defaultValue: "0.07",
              description: "Delay between face entrances.",
            },
            {
              name: "mobileBreakpoint",
              type: "number",
              defaultValue: "768",
              description: "Viewport width that triggers mobile scale.",
            },
            {
              name: "mobileScaleFactor",
              type: "number",
              defaultValue: "0.82",
              description: "Scale applied on small viewports.",
            },
            {
              name: "inertiaPower",
              type: "number",
              defaultValue: "0.85",
              description: "Inertia power after release.",
            },
            {
              name: "inertiaTimeConstant",
              type: "number",
              defaultValue: "280",
              description: "Inertia time constant in ms.",
            },
            {
              name: "inertiaVelocityMultiplier",
              type: "number",
              defaultValue: "18",
              description: "Release velocity multiplier.",
            },
            {
              name: "containerClassName",
              type: "string",
              description: "Classes on the outer stage.",
            },
            {
              name: "ringClassName",
              type: "string",
              description: "Classes on the rotating ring.",
            },
            {
              name: "imageClassName",
              type: "string",
              description: "Classes on each face plate.",
            },
          ]}
        />
      </section>
    </article>
  )
}
