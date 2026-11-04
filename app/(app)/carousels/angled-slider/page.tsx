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
  title: "Angled Slider",
  description:
    "An infinite angled marquee of image cards that straighten on hover. Install with the SonoJS CLI.",
  path: "/carousels/angled-slider",
})

const exampleDefs = [
  {
    name: "angled-slider-default",
    title: "Default",
    description:
      "Cards rest at a 3D angle and scroll in a seamless loop. Hover pauses the marquee and snaps the card flat.",
  },
]

const usage = `"use client"

import { AngledSlider } from "@/components/carousels/angled-slider"

export default function Page() {
  return <AngledSlider speed={30} className="w-full" />
}`

export default async function AngledSliderPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Angled Slider"
        pathname="/carousels/angled-slider"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An infinite marquee of angled image cards - hover to pause and
            straighten. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              items
            </code>{" "}
            or use the bundled demos. Built with{" "}
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

      <DocsInstallation name="angled-slider" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/angled-slider/images/
          </code>{" "}
          and are imported by the defaults. Pass your own{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            items
          </code>{" "}
          when you replace them.
        </p>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "items",
              type: "AngledSliderItem[]",
              defaultValue: "bundled images",
              description:
                "Cards with `id`, `url`, optional `title` / `alt`. Defaults to static imports from `./images/`.",
            },
            {
              name: "speed",
              type: "number",
              defaultValue: "40",
              description: "Seconds for one full loop (higher = slower).",
            },
            {
              name: "direction",
              type: '"left" | "right"',
              defaultValue: '"left"',
              description: "Marquee scroll direction.",
            },
            {
              name: "containerHeight",
              type: "string",
              defaultValue: '"400px"',
              description: "Stage height CSS length.",
            },
            {
              name: "cardWidth",
              type: "string",
              defaultValue: '"300px"',
              description: "Card width CSS length.",
            },
            {
              name: "gap",
              type: "string",
              defaultValue: '"40px"',
              description: "Gap between cards.",
            },
            {
              name: "angle",
              type: "number",
              defaultValue: "20",
              description: "Resting rotateY in degrees.",
            },
            {
              name: "hoverScale",
              type: "number",
              defaultValue: "1.05",
              description: "Scale while a card is hovered.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the stage.",
            },
          ]}
        />
      </section>
    </article>
  )
}
