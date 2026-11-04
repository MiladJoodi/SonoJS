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
  title: "Infinite Drift",
  description:
    "Curved image bands with inertial drag and scroll - Canvas 2D, no WebGL. Install with the SonoJS CLI.",
  path: "/3d/infinite-drift",
})

const exampleDefs = [
  {
    name: "infinite-drift-default",
    title: "Default",
    description:
      "Drag vertically or scroll the page - five curved bands drift with inertia. Demo photos ship with the install.",
  },
]

const usage = `"use client"

import { InfiniteDrift } from "@/components/3d/infinite-drift"

export default function Page() {
  return (
    <InfiniteDrift
      height={600}
      bands={[
        {
          speed: 1,
          rotation: 7,
          curveAmount: 40,
          images: ["/media/a.jpg", "/media/b.jpg", "/media/c.jpg"],
        },
        {
          speed: 1.3,
          offsetY: -100,
          images: ["/media/d.jpg", "/media/e.jpg"],
        },
      ]}
    />
  )
}`

export default async function InfiniteDriftDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Infinite Drift"
        pathname="/3d/infinite-drift"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Horizontal image strips with parabolic curvature and optional tilt,
            driven by wheel, page scroll, and drag inertia. Pure Canvas 2D -
            no Three.js. Bundled photos install under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/infinite-drift/images
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="p-0"
        />
      </section>

      <DocsInstallation name="infinite-drift" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "bands",
              type: "InfiniteDriftBand[]",
              defaultValue: "bundled demo",
              description:
                "Per-band images, speed, offsetY, rotation, curveAmount, curveDirection, rotationType.",
            },
            {
              name: "height",
              type: "string | number",
              defaultValue: "600",
              description: "Stage height.",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "20",
              description: "Gap between images in a band (px).",
            },
            {
              name: "imageHeight",
              type: "number",
              defaultValue: "100",
              description: "Drawn image height in the strip.",
            },
            {
              name: "bandHeight",
              type: "number",
              defaultValue: "120",
              description: "Band strip canvas height.",
            },
            {
              name: "maxImageWidth",
              type: "number",
              defaultValue: "300",
              description: "Cap width when preserving ratios.",
            },
            {
              name: "inertia",
              type: "number",
              defaultValue: "0.92",
              description: "Velocity decay each frame.",
            },
            {
              name: "preserveOriginalRatios",
              type: "boolean",
              defaultValue: "true",
              description: "Keep source aspect ratios when sizing tiles.",
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
