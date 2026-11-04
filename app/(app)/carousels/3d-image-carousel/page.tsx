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
  title: "3D Image Carousel",
  description:
    "A cascade-style 3D image carousel with drag, arrows, and optional autoplay. Install with the SonoJS CLI.",
  path: "/carousels/3d-image-carousel",
})

const exampleDefs = [
  {
    name: "3d-image-carousel-default",
    title: "Default",
    description:
      "Five-deep cascade stack with autoplay. Drag or use the arrows to step. Side plates sit grayscale until centered.",
  },
]

const usage = `"use client"

import { ThreeDImageCarousel } from "@/components/carousels/3d-image-carousel"

export default function Page() {
  return (
    <ThreeDImageCarousel
      itemCount={5}
      autoplay
      delay={4}
      className="w-full"
    />
  )
}`

export default async function ThreeDImageCarouselPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Image Carousel"
        pathname="/carousels/3d-image-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A responsive cascade of images with depth stacking, drag or swipe
            navigation, optional autoplay, and arrow controls. Pass your own{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              slides
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

      <DocsInstallation name="3d-image-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/3d-image-carousel/images/
          </code>{" "}
          and are imported by the component defaults. Pass your own{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            slides
          </code>{" "}
          (URLs or static imports) when you replace them.
        </p>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "slides",
              type: "ThreeDImageCarouselSlide[]",
              defaultValue: "bundled images",
              description:
                "Slide list with `id`, `src`, and `href`. Defaults to static imports from `./images/`.",
            },
            {
              name: "itemCount",
              type: "3 | 5",
              defaultValue: "5",
              description:
                "Visible stack depth - `3` for a compact trio, `5` for the full cascade.",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: "false",
              description: "Advance automatically while the carousel is mounted.",
            },
            {
              name: "delay",
              type: "number",
              defaultValue: "3",
              description: "Seconds between autoplay steps.",
            },
            {
              name: "pauseOnHover",
              type: "boolean",
              defaultValue: "true",
              description:
                "Pause autoplay while the pointer is over the stage.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the cascade container.",
            },
          ]}
        />
      </section>
    </article>
  )
}
