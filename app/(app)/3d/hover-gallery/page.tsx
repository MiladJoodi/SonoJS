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
  title: "Hover Gallery",
  description:
    "A 3D hover-expand gallery with keyboard focus, glow, and optional autoplay. Install with the SonoJS CLI.",
  path: "/3d/hover-gallery",
})

const exampleDefs = [
  {
    name: "hover-gallery-default",
    title: "Default",
    description:
      "Hover or focus a strip to expand it; neighbors tilt in 3D. Demo images ship with the install.",
  },
]

const usage = `"use client"

import { HoverGallery } from "@/components/3d/hover-gallery"

export default function Page() {
  return (
    <HoverGallery
      itemHeight={420}
      onImageClick={(index, item) => {
        console.log(index, item.title)
      }}
    />
  )
}`

export default async function HoverGalleryDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Hover Gallery"
        pathname="/3d/hover-gallery"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A flex strip of plates that expand on hover or click, with spring
            tilt for neighbors. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            . Bundled photos install under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/hover-gallery/images
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

      <DocsInstallation name="hover-gallery" />

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
              type: "HoverGalleryItem[]",
              defaultValue: "bundled demo",
              description: "Full items with url, title, category, description.",
            },
            {
              name: "images",
              type: "string[]",
              description:
                "URL-only list; titles/meta fall back to the demo set.",
            },
            {
              name: "itemHeight",
              type: "number | string",
              defaultValue: "420",
              description: "Plate height (px number or CSS length).",
            },
            {
              name: "gap",
              type: "number",
              defaultValue: "10",
              description: "Gap between plates in pixels.",
            },
            {
              name: "perspective",
              type: "number",
              defaultValue: "1000",
              description: "CSS perspective for the tilt.",
            },
            {
              name: "hoverScale",
              type: "number",
              defaultValue: "1.05",
              description: "Image scale when a plate is active.",
            },
            {
              name: "transitionDuration",
              type: "number",
              defaultValue: "0.5",
              description: "Active image scale duration in seconds.",
            },
            {
              name: "enableKeyboardNavigation",
              type: "boolean",
              defaultValue: "true",
              description: "Arrow keys, Enter/Space, Escape.",
            },
            {
              name: "autoPlay",
              type: "boolean",
              defaultValue: "false",
              description: "Cycle the active plate automatically.",
            },
            {
              name: "autoPlayDelay",
              type: "number",
              defaultValue: "4000",
              description: "Autoplay interval in ms.",
            },
            {
              name: "onImageClick",
              type: "(index, item) => void",
              description: "Fires when a plate is clicked or activated.",
            },
            {
              name: "onImageHover",
              type: "(index, item) => void",
              description: "Fires when a plate is hovered.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer wrapper.",
            },
            {
              name: "style",
              type: "CSSProperties",
              description: "Inline styles on the outer wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
