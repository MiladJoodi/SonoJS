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
  title: "Hanging Bag",
  description:
    "A React Three Fiber dry-cleaner carousel of pastel project bags on a chrome elliptical rack. Install with the SonoJS CLI.",
  path: "/3d/hanging-bag",
})

const exampleDefs = [
  {
    name: "hanging-bag-default",
    title: "Default",
    description:
      "Scroll to spin the rack, drag to orbit, Ctrl+scroll to zoom. Heavy WebGL — Chromium recommended; HDR Environment loads from the network.",
  },
]

const usage = `"use client"

import { HangingBag } from "@/components/3d/hanging-bag"

export default function Page() {
  return <HangingBag height="min(100vh, 640px)" />
}`

export default async function HangingBagDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Hanging Bag"
        pathname="/3d/hanging-bag"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Pastel project bags on wire hangers ride a chrome elliptical rail —
            auto-rotate, wheel to spin, orbit to inspect. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              @react-three/fiber
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              drei
            </code>
            , and a Vignette pass. Needs a GPU; Chromium is recommended.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
        />
      </section>

      <DocsInstallation name="hanging-bag" />

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
              type: "HangingBagItem[]",
              defaultValue: "DEFAULT_HANGING_BAG_ITEMS",
              description: "Project bags on the rack, in order around the ellipse.",
            },
            {
              name: "height",
              type: "number | string",
              defaultValue: '"min(100vh, 640px)"',
              description: "Stage height (CSS length or px number).",
            },
            {
              name: "className",
              type: "string",
              description: "Class names on the stage wrapper.",
            },
            {
              name: "showHint",
              type: "boolean",
              defaultValue: "true",
              description: "Orbit / scroll hint strip in the corner.",
            },
          ]}
        />
      </section>
    </article>
  )
}
