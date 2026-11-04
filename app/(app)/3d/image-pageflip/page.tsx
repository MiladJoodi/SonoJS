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
  title: "Image Pageflip",
  description:
    "A 3D book of image leaves with peek, spine shift, controls, and optional autoplay. Install with the SonoJS CLI.",
  path: "/3d/image-pageflip",
})

const exampleDefs = [
  {
    name: "image-pageflip-default",
    title: "Default",
    description:
      "Click a page or use Prev / Next. Hover peeks the top leaf. Demo photos ship with the install.",
  },
]

const usage = `"use client"

import { ImagePageflip } from "@/components/3d/image-pageflip"

export default function Page() {
  return (
    <ImagePageflip
      pageWidth={230}
      pageHeight={330}
      spineShift
      showPageNumbers
    />
  )
}`

export default async function ImagePageflipDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Pageflip"
        pathname="/3d/image-pageflip"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A perspective book of double-sided image leaves - peek on hover,
            flip on click, optional autoplay and spine centering. Bundled photos
            install under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/image-pageflip/images
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

      <DocsInstallation name="image-pageflip" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "pages",
              type: "PageFlipLeaf[]",
              defaultValue: "bundled demo",
              description: "Leaves with front/back images and optional meta.",
            },
            {
              name: "defaultTurnedIndex",
              type: "number",
              defaultValue: "0",
              description: "Initial turned leaf count (uncontrolled).",
            },
            {
              name: "turnedIndex",
              type: "number",
              description: "Controlled turned leaf count.",
            },
            {
              name: "onPageChange",
              type: "(turned, total) => void",
              description: "Fires after a flip.",
            },
            {
              name: "pageWidth",
              type: "number",
              defaultValue: "230",
              description: "Single page width in px.",
            },
            {
              name: "pageHeight",
              type: "number",
              defaultValue: "330",
              description: "Single page height in px.",
            },
            {
              name: "perspective",
              type: "number",
              defaultValue: "1300",
              description: "CSS perspective in px.",
            },
            {
              name: "peekAngle",
              type: "number",
              defaultValue: "14",
              description: "Hover peek degrees.",
            },
            {
              name: "turnAngle",
              type: "number",
              defaultValue: "180",
              description: "Full flip degrees.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "0.65",
              description: "Flip duration in seconds.",
            },
            {
              name: "spineShift",
              type: "boolean",
              defaultValue: "true",
              description: "Center a two-page spread when open.",
            },
            {
              name: "accentColor",
              type: "string",
              defaultValue: '"#2563EB"',
              description: "Badge accent color.",
            },
            {
              name: "autoplay",
              type: "boolean",
              defaultValue: "false",
              description: "Auto-advance leaves.",
            },
            {
              name: "showControls",
              type: "boolean",
              defaultValue: "true",
              description: "Prev / Reset / Next toolbar.",
            },
            {
              name: "interactive",
              type: "boolean",
              defaultValue: "true",
              description: "Click leaves to flip.",
            },
            {
              name: "className",
              type: "string",
              description: "Outer wrapper classes.",
            },
          ]}
        />
      </section>
    </article>
  )
}
