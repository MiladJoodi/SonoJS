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
  title: "3D Bend Carousel",
  description:
    "A physics-driven bent card stack with drag, snap, glare, and optional autoplay. Install with the SonoJS CLI.",
  path: "/carousels/3d-bend-carousel",
})

const exampleDefs = [
  {
    name: "3d-bend-carousel-default",
    title: "Default",
    description:
      "Vertical concave bend with drag, snap, loop, and autoplay. Off-center cards fade to grayscale; glare tracks the curve.",
  },
]

const usage = `"use client"

import { ThreeDBendCarousel } from "@/components/carousels/3d-bend-carousel"

export default function Page() {
  return (
    <ThreeDBendCarousel
      orientation="vertical"
      curveDirection="concave"
      grayscaleInactive
      itemWidth={340}
      aspectRatio={0.8}
      gap={-35}
      perspective={1100}
      bendAngle={48}
      depth={420}
      snap
      loop
      autoPlay
      autoPlayInterval={4000}
    />
  )
}`

export default async function ThreeDBendCarouselPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Bend Carousel"
        pathname="/carousels/3d-bend-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A physics-driven bent stack of cards - drag, wheel, keyboard, snap,
            and optional autoplay. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              items
            </code>{" "}
            or image URLs; install ships demo photos next to the component.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="3d-bend-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Demo images install under{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            components/carousels/3d-bend-carousel/images/
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
              type: "(string | BendCarouselItem)[]",
              defaultValue: "bundled images",
              description:
                "Cards as objects or image URL strings. Defaults to static imports from `./images/`.",
            },
            {
              name: "images",
              type: "string[]",
              description: "Alias for a list of image URLs when not using `items`.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description: "Bend axis - vertical stack or horizontal rail.",
            },
            {
              name: "curveDirection",
              type: '"concave" | "convex"',
              defaultValue: '"concave"',
              description: "Curve away into the screen or forward toward the viewer.",
            },
            {
              name: "itemWidth",
              type: "number",
              defaultValue: "320",
              description: "Card width in pixels. Height follows `aspectRatio`.",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "-40",
              description: "Spacing between cards (negative for a shingle stack).",
            },
            {
              name: "bendAngle",
              type: "number",
              defaultValue: "45",
              description: "Max bend rotation in degrees.",
            },
            {
              name: "depth",
              type: "number",
              defaultValue: "400",
              description: "Z displacement for off-center cards.",
            },
            {
              name: "autoPlay",
              type: "boolean",
              defaultValue: "false",
              description: "Advance automatically while mounted.",
            },
            {
              name: "loop",
              type: "boolean",
              defaultValue: "true",
              description: "Seamless infinite looping.",
            },
            {
              name: "grayscaleInactive",
              type: "boolean",
              defaultValue: "true",
              description: "Desaturate cards away from the center.",
            },
            {
              name: "showControls",
              type: "boolean",
              defaultValue: "true",
              description: "Floating prev / next / play controls.",
            },
            {
              name: "showIndicators",
              type: "boolean",
              defaultValue: "true",
              description: "Counter and pagination dots.",
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
