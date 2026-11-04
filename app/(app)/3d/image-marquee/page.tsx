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
  title: "Image Marquee",
  description:
    "A tilted 3D column marquee of images with alternating scroll and optional links. Install with the SonoJS CLI.",
  path: "/3d/image-marquee",
})

const exampleDefs = [
  {
    name: "image-marquee-default",
    title: "Default",
    description:
      "Four columns tilt in space and drift up and down. Demo frames ship with the install.",
  },
]

const usage = `"use client"

import { ImageMarquee, type MarqueeImage } from "@/components/3d/image-marquee"

const images: MarqueeImage[] = [
  { src: "/media/hero-1.jpg", alt: "Studio shelf" },
  { src: "/media/hero-2.jpg", alt: "Glass desk", href: "/work/desk" },
]

export default function Page() {
  return (
    <ImageMarquee
      images={images}
      cols={4}
      onImageClick={(image, index) => {
        console.log(index, image.alt)
      }}
    />
  )
}`

export default async function ImageMarqueeDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Marquee"
        pathname="/3d/image-marquee"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A skewed grid of image columns that scroll in opposite directions.
            Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            . Bundled photos install under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/image-marquee/images
            </code>
            . For the CSS text/card strip, see{" "}
            <a
              href="/docs/components/marquee"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Marquee
            </a>
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

      <DocsInstallation name="image-marquee" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "images",
              type: "MarqueeImage[]",
              defaultValue: "bundled demo",
              description:
                "Tiles with `src`, `alt`, and optional `href` / `target`.",
            },
            {
              name: "cols",
              type: "number",
              defaultValue: "4",
              description:
                "Column count from `sm` up (clamped 2–6). Mobile uses 2.",
            },
            {
              name: "onImageClick",
              type: "(image, index) => void",
              description:
                "Click handler. When set, it runs instead of opening `href`.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
