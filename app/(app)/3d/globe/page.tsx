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
  title: "Globe",
  description:
    "Autorotating interactive WebGL globe with drag spin and city markers. Install with the SonoJS CLI.",
  path: "/3d/globe",
})

const exampleDefs = [
  {
    name: "globe-default",
    title: "Default",
    description:
      "Slow autorotation with orange markers — drag horizontally to spin the globe.",
    npmRequires: ["cobe", "motion"],
  },
]

const usage = `"use client"

import { Globe } from "@/components/3d/globe"

export default function Page() {
  return (
    <div className="bg-canvas relative flex h-[380px] w-full max-w-lg items-center justify-center overflow-hidden rounded-[12px] border border-border/70 px-10 pb-40 pt-8 sm:h-[480px]">
      <span className="pointer-events-none bg-linear-to-b from-foreground to-foreground/30 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent">
        Globe
      </span>
      <Globe className="top-28" />
    </div>
  )
}`

export default async function GlobeDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Globe"
        pathname="/3d/globe"
        description={
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              Highly performant WebGL globe with autorotation, pointer drag,
              and configurable markers. Built with{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                cobe
              </code>{" "}
              and spring physics from{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                motion
              </code>
              .
            </p>
            <p>
              Pass a custom{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                config
              </code>{" "}
              to change colors, brightness, and marker locations.
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

      <DocsInstallation name="globe" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "className",
              type: "string",
              description: "Classes on the absolute square wrapper around the canvas.",
            },
            {
              name: "config",
              type: "COBEOptions",
              defaultValue: "GLOBE_CONFIG",
              description:
                "Cobe options — size, colors, markers, and map quality. See cobe.vercel.app for the full shape.",
            },
          ]}
        />
      </section>
    </article>
  )
}
