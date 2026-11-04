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
  title: "3D Image Slider",
  description:
    "A continuous 3D cylinder of images that spins while in view. Install with the SonoJS CLI.",
  path: "/carousels/3d-image-slider",
})

const exampleDefs = [
  {
    name: "3d-image-slider-default",
    title: "Default",
    description:
      "Ten images around a spinning cylinder. Soft edge mask, linear loop while in view; slows under reduced motion.",
  },
]

const usage = `"use client"

import { ThreeDImageSlider } from "@/components/carousels/3d-image-slider"

export default function Page() {
  return (
    <div className="h-[560px] w-full">
      <ThreeDImageSlider
        duration={32}
        cardWidth="15em"
        rotationDirection="left"
        withMask
      />
    </div>
  )
}`

export default async function ThreeDImageSliderPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Image Slider"
        pathname="/carousels/3d-image-slider"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A continuous 3D image cylinder that rotates while on screen. Pass
            your own{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              images
            </code>{" "}
            - install ships demo photos next to the component. Built with{" "}
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

      <DocsInstallation name="3d-image-slider" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/3d-image-slider/images/
          </code>{" "}
          and are imported by the defaults. Pass your own{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            images
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
              name: "images",
              type: "string[]",
              defaultValue: "bundled images",
              description:
                "Image URLs around the cylinder. Defaults to static imports from `./images/`.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "32",
              description: "Seconds for one full 360° rotation.",
            },
            {
              name: "cardWidth",
              type: "string",
              defaultValue: '"17.5em"',
              description: "CSS width of each card (px, rem, em, …).",
            },
            {
              name: "cardAspectRatio",
              type: "string",
              defaultValue: '"7/10"',
              description: "CSS aspect-ratio of each card.",
            },
            {
              name: "perspective",
              type: "string",
              defaultValue: '"35em"',
              description: "CSS perspective on the stage.",
            },
            {
              name: "rotationDirection",
              type: '"left" | "right"',
              defaultValue: '"left"',
              description: "Cylinder spin direction.",
            },
            {
              name: "withMask",
              type: "boolean",
              defaultValue: "true",
              description: "Soft edge fade mask on the stage.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the outer stage.",
            },
            {
              name: "containerClassName",
              type: "string",
              description: "Alias for `className`.",
            },
            {
              name: "imageClassName",
              type: "string",
              description: "Extra classes on each image.",
            },
          ]}
        />
      </section>
    </article>
  )
}
