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
  title: "Beam Circle",
  description:
    "Orbiting icons around a pulsing hub - loaders, brand marks, or dashboard ornaments. Install with the SonoJS CLI.",
  path: "/3d/beam-circle",
})

const exampleDefs = [
  {
    name: "beam-circle-default",
    title: "Default",
    description:
      "Four orbits with shipped tech marks (React, TypeScript, Tailwind, Next.js). Icons install with the component under `icons/`.",
  },
]

const usage = `"use client"

import {
  BeamCircle,
  ReactIcon,
  TypescriptIcon,
} from "@/components/3d/beam-circle"

export default function Page() {
  return (
    <BeamCircle
      size={320}
      centerIcon={<ReactIcon size={28} />}
      orbits={[
        {
          id: 1,
          radiusFactor: 0.4,
          speed: 10,
          icon: <TypescriptIcon />,
          iconSize: 28,
        },
      ]}
    />
  )
}`

export default async function BeamCircleDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Beam Circle"
        pathname="/3d/beam-circle"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Dashed rings with icons that orbit a center hub. Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            . Respects{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              prefers-reduced-motion
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

      <DocsInstallation name="beam-circle" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "size",
              type: "number",
              defaultValue: "300",
              description: "Stage diameter in pixels.",
            },
            {
              name: "centerIcon",
              type: "ReactNode",
              defaultValue: "<SunIcon />",
              description: "Content in the center hub.",
            },
            {
              name: "orbits",
              type: "OrbitConfig[]",
              defaultValue: "bundled demo",
              description:
                "`id`, `radiusFactor`, `speed`, `icon`, `iconSize`, optional `orbitColor` / `orbitThickness`.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
