import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("clothes-rack", "Clothes Rack")

const exampleDefs = [
  {
    name: "clothes-rack-default",
    title: "Default",
    description:
      "Point at a garment to face it; click for the detail view. Parent must have a size — the rack fills it.",
  },
]

const usage = `"use client"

import { ClothesRack } from "@/components/clothes-rack"

export default function Page() {
  return (
    <div className="h-[560px] w-full">
      <ClothesRack gap={6} />
    </div>
  )
}`

export default async function ClothesRackDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Clothes Rack"
        pathname="/docs/components/clothes-rack"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A shop rail of 3D garments that swivel to face you, with cloth that
            moves like fabric. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              three
            </code>
            . Optional fabric scans improve the knit and studio light.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
        />
      </section>

      <DocsInstallation name="clothes-rack" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "items",
              type: "ClothesRackItem[]",
              defaultValue: "defaultItems",
              description: "Garments on the rail, in order.",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "7",
              description:
                "Clear air between side-on garments, as % of body width.",
            },
            {
              name: "restAngle",
              type: "number",
              defaultValue: "80",
              description: "Turn-away angle at rest, in degrees.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "0.25",
              description: "Seconds to turn and face you.",
            },
            {
              name: "flow",
              type: "number",
              defaultValue: "1",
              description: "How loose the cloth is (0 stiff … 2 very loose).",
            },
            {
              name: "breeze",
              type: "number",
              defaultValue: "0",
              description: "Idle draught along the rail (0–1).",
            },
            {
              name: "rail",
              type: '"chrome" | "black" | "brass"',
              defaultValue: '"chrome"',
              description: "Rail finish.",
            },
            {
              name: "hanger",
              type: '"wood" | "black" | "chrome"',
              defaultValue: '"wood"',
              description: "Hanger finish.",
            },
            {
              name: "detail",
              type: "boolean",
              defaultValue: "true",
              description: "Open the detail view on click / Enter.",
            },
            {
              name: "textures",
              type: "GarmentTextures",
              description:
                "Optional jersey/fleece maps, heather grain, and studio HDR URLs.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer box (give it a size).",
            },
          ]}
        />
      </section>
    </article>
  )
}
