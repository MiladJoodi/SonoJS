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
  title: "Glass Coin Carousel",
  description:
    "A WebGL orbit of glass coins with fresnel shading and a center label. Install with the SonoJS CLI.",
  path: "/3d/glass-coin-carousel",
})

const exampleDefs = [
  {
    name: "glass-coin-carousel-default",
    title: "Default",
    description:
      "Nine glass coins orbit a center label. Needs WebGL 2. Colors and speed are props.",
  },
]

const usage = `"use client"

import { GlassCoinCarousel } from "@/components/3d/glass-coin-carousel"

export default function Page() {
  return (
    <div className="relative h-[500px] w-full">
      <GlassCoinCarousel
        color1="#2DD4BF"
        color2="#818CF8"
        centerText="SonoJS"
      />
    </div>
  )
}`

export default async function GlassCoinCarouselDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Glass Coin Carousel"
        pathname="/3d/glass-coin-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A raymarched orbit of glass coins with fresnel edges and dual-tone
            fill. Runs on{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              WebGL 2
            </code>
            ; theme follows{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              .dark
            </code>{" "}
            on{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              html
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

      <DocsInstallation name="glass-coin-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "coinsCount",
              type: "number",
              defaultValue: "9",
              description: "Orbiting coins (clamped 1–9).",
            },
            {
              name: "radius",
              type: "number",
              defaultValue: "2.3",
              description: "Orbit radius in scene units.",
            },
            {
              name: "coinRadius",
              type: "number",
              defaultValue: "0.65",
              description: "Individual coin radius.",
            },
            {
              name: "coinThickness",
              type: "number",
              defaultValue: "0.12",
              description: "Individual coin thickness.",
            },
            {
              name: "speed",
              type: "number",
              defaultValue: "0.8",
              description: "Orbit speed. Frozen under reduced motion.",
            },
            {
              name: "color1",
              type: "string",
              defaultValue: '"#2DD4BF"',
              description: "First glass tint (aqua).",
            },
            {
              name: "color2",
              type: "string",
              defaultValue: '"#818CF8"',
              description: "Second glass tint (soft violet) for iridescence.",
            },
            {
              name: "maxOpacity",
              type: "number",
              defaultValue: "0.88",
              description: "Maximum glass opacity.",
            },
            {
              name: "centerText",
              type: "string",
              defaultValue: '"SonoJS"',
              description: "Center overlay label. Empty string hides it.",
            },
            {
              name: "centerTextClassName",
              type: "string",
              description: "Classes on the center text.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the root stage.",
            },
          ]}
        />
      </section>
    </article>
  )
}
