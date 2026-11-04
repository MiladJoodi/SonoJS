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
  title: "3D Slider",
  description:
    "A cascaded 3D card slider with wheel, drag, and touch. Install with the SonoJS CLI.",
  path: "/carousels/3d-slider",
})

const exampleDefs = [
  {
    name: "3d-slider-default",
    title: "Default",
    description:
      "Cascaded stack with rotate + translate. Scroll the wheel or drag to scrub; click a card to snap it to center.",
  },
]

const usage = `"use client"

import { ThreeDSlider } from "@/components/carousels/3d-slider"

export default function Page() {
  return <ThreeDSlider className="w-full" />
}`

export default async function ThreeDSliderPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Slider"
        pathname="/carousels/3d-slider"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A responsive cascaded card slider driven by direct DOM transforms -
            wheel, drag, and touch without re-rendering on every frame. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              items
            </code>{" "}
            or use the bundled demo images.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="3d-slider" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/3d-slider/images/
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
              type: "ThreeDSliderItem[]",
              defaultValue: "bundled images",
              description:
                "Cards with `title`, `num`, and `imageUrl`. Defaults to static imports from `./images/`.",
            },
            {
              name: "speedWheel",
              type: "number",
              defaultValue: "0.04",
              description: "Wheel delta multiplier.",
            },
            {
              name: "speedDrag",
              type: "number",
              defaultValue: "-0.15",
              description: "Drag delta multiplier (typically negative).",
            },
            {
              name: "onItemClick",
              type: "(item, index) => void",
              description: "Fires when a card is clicked (also snaps to that card).",
            },
            {
              name: "containerStyle",
              type: "CSSProperties",
              description: "Inline styles on the stage.",
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
