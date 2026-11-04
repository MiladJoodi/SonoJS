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
  title: "3D Carousel",
  description:
    "Stacked 3D card carousel with autoplay, arrows, dots, and swipe. Install with the SonoJS CLI.",
  path: "/carousels/3d-carousel",
})

const exampleDefs = [
  {
    name: "3d-carousel-default",
    title: "Default",
    description:
      "Active card centered with neighbors scaled back. Auto-rotates in view; pause on hover. Arrows on desktop, swipe on touch, dots to jump.",
  },
]

const usage = `"use client"

import { ThreeDCarousel } from "@/components/carousels/3d-carousel"

export default function Page() {
  return (
    <ThreeDCarousel
      autoRotate
      rotateInterval={4000}
      cardHeight={500}
      className="w-full"
    />
  )
}`

export default async function ThreeDCarouselPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Carousel"
        pathname="/carousels/3d-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A stacked card carousel with depth, autoplay, keyboard-friendly
            controls, and swipe. Pass your own{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              items
            </code>{" "}
            - install ships the demo images next to the component.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="3d-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/3d-carousel/images/
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
              type: "ThreeDCarouselItem[]",
              defaultValue: "bundled images",
              description:
                "Card list with `id`, `title`, `brand`, `description`, `tags`, `imageUrl`, and `link`. Defaults to static imports from `./images/`.",
            },
            {
              name: "autoRotate",
              type: "boolean",
              defaultValue: "true",
              description:
                "Advance automatically while the stage is in view and not hovered.",
            },
            {
              name: "rotateInterval",
              type: "number",
              defaultValue: "4000",
              description: "Milliseconds between auto-rotations.",
            },
            {
              name: "cardHeight",
              type: "number",
              defaultValue: "500",
              description: "Height of each card in pixels.",
            },
            {
              name: "isMobileSwipe",
              type: "boolean",
              defaultValue: "true",
              description: "Enable swipe navigation on touch devices.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the outer section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
