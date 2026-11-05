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
  title: "Icon Cloud",
  description:
    "Interactive 3D tag cloud with drag spin and play/pause control. Install with the SonoJS CLI.",
  path: "/3d/icon-cloud",
})

const exampleDefs = [
  {
    name: "icon-cloud-default",
    title: "Default",
    description:
      "Local tech icons on a Fibonacci sphere — drag to spin, click an icon to focus, or pause with the control.",
    requires: ["button"],
    npmRequires: ["lucide-react"],
  },
]

const usage = `"use client"

import {
  defaultIconCloudImages,
  IconCloud,
} from "@/components/3d/icon-cloud"

export default function IconCloudDemo() {
  return (
    <div className="relative flex size-full min-h-[420px] w-full items-center justify-center overflow-hidden rounded-[12px]">
      <IconCloud images={defaultIconCloudImages} />
    </div>
  )
}`

export default async function IconCloudDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Icon Cloud"
        pathname="/3d/icon-cloud"
        description={
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              An interactive canvas sphere of icons or images. Drag to rotate,
              click a node to ease it into focus, and use the play/pause control
              for WCAG pause support.
            </p>
            <p>
              Ships with a local Simple Icons set via{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                defaultIconCloudImages
              </code>
              — no CDN at runtime. Pass{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                icons
              </code>{" "}
              for React nodes (Lucide, custom SVG) instead.
            </p>
          </div>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
          previewClassName="p-0"
        />
      </section>

      <DocsInstallation name="icon-cloud" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "icons",
              type: "ReactNode[]",
              description:
                "React icon nodes rendered into the cloud (alternative to images).",
            },
            {
              name: "images",
              type: "string[]",
              description:
                "Image URLs drawn on the sphere. Prefer defaultIconCloudImages for the bundled set.",
            },
            {
              name: "showControl",
              type: "boolean",
              defaultValue: "true",
              description:
                "Show the play/pause control. Keep enabled unless you provide your own pause UI.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the relative wrapper around the canvas.",
            },
          ]}
        />
      </section>
    </article>
  )
}
