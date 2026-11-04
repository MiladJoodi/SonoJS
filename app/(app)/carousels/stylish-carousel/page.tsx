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
  title: "Stylish Carousel",
  description:
    "A fan-out image carousel with spring physics, arrows, dots, and swipe. Install with the SonoJS CLI.",
  path: "/carousels/stylish-carousel",
})

const exampleDefs = [
  {
    name: "stylish-carousel-default",
    title: "Default",
    description:
      "Slides fan with rotate + scale. Arrows, dots, click-to-jump, keyboard, and swipe. Spring-tuned motion.",
  },
]

const usage = `"use client"

import { StylishCarousel } from "@/components/carousels/stylish-carousel"

export default function Page() {
  return (
    <StylishCarousel
      initialIndex={3}
      showArrows
      showDots
      clickToNavigate
      slideSize="clamp(200px, 40vw, 420px)"
    />
  )
}`

export default async function StylishCarouselPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Stylish Carousel"
        pathname="/carousels/stylish-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A cinematic fan-out of images with spring physics. Pass{" "}
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

      <DocsInstallation name="stylish-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/stylish-carousel/images/
          </code>
          . Pass your own{" "}
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
              type: "StylishCarouselItem[]",
              defaultValue: "bundled images",
              description:
                "Slides with `src` and optional `title` / `alt`. Defaults to static imports from `./images/`.",
            },
            {
              name: "initialIndex",
              type: "number",
              defaultValue: "0",
              description: "Starting active slide (0-based).",
            },
            {
              name: "slideSize",
              type: "string",
              defaultValue: 'clamp(...)',
              description: "CSS size for each square slide.",
            },
            {
              name: "rotationDegrees",
              type: "number",
              defaultValue: "28",
              description: "Rotate degrees per offset from center.",
            },
            {
              name: "inactiveScale",
              type: "number",
              defaultValue: "0.62",
              description: "Scale of non-active slides.",
            },
            {
              name: "autoPlay",
              type: "number",
              defaultValue: "0",
              description: "Auto-advance interval in ms. `0` disables.",
            },
            {
              name: "showArrows",
              type: "boolean",
              defaultValue: "true",
              description: "Prev / next controls.",
            },
            {
              name: "showDots",
              type: "boolean",
              defaultValue: "true",
              description: "Dot indicators.",
            },
            {
              name: "clickToNavigate",
              type: "boolean",
              defaultValue: "true",
              description: "Click an inactive slide to jump to it.",
            },
            {
              name: "onIndexChange",
              type: "(index: number) => void",
              description: "Fires when the active index changes.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
