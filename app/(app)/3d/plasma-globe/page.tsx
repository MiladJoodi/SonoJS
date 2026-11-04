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
  title: "Plasma Globe",
  description:
    "OGL plasma sphere with animated filaments, pointer tilt, and transparent canvas. Install with the SonoJS CLI.",
  path: "/3d/plasma-globe",
})

const exampleDefs = [
  {
    name: "plasma-globe-default",
    title: "Default",
    description:
      "Electric blue filaments with glass corona - move the pointer to bend the arcs.",
    npmRequires: ["ogl"],
  },
]

const usage = `"use client"

import { PlasmaGlobe } from "@/components/3d/plasma-globe"

export default function Page() {
  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_48%,#e2e8f0_100%)] sm:h-[480px] dark:bg-[linear-gradient(180deg,#020617_0%,#0b1220_55%,#020617_100%)]">
      <PlasmaGlobe height="100%" />
    </div>
  )
}`

export default async function PlasmaGlobeDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Plasma Globe"
        pathname="/3d/plasma-globe"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Procedural plasma sphere rendered with OGL - multiple filaments,
            volumetric glow, and optional pointer tilt. The canvas is
            transparent, so light and dark stage colors both show through.
            Respects{" "}
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
          previewSurface="canvas"
          previewClassName="p-0"
        />
      </section>

      <DocsInstallation name="plasma-globe" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "speed",
              type: "number",
              defaultValue: "1",
              description: "Global animation time multiplier.",
            },
            {
              name: "intensity",
              type: "number",
              defaultValue: "1.15",
              description: "Emission / color intensity multiplier.",
            },
            {
              name: "interactive",
              type: "boolean",
              defaultValue: "true",
              description: "Pointer tilt plus filament focus bias.",
            },
            {
              name: "corona",
              type: "number",
              defaultValue: "1.15",
              description: "Glass Fresnel rim and outer halo strength.",
            },
            {
              name: "crackle",
              type: "number",
              defaultValue: "0.45",
              description: "Electrical flicker on filaments (0–1).",
            },
            {
              name: "height",
              type: "string | number",
              defaultValue: "380",
              description: "Stage height (shorter default for mobile).",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the stage container.",
            },
            {
              name: "style",
              type: "CSSProperties",
              description: "Inline styles on the stage container.",
            },
          ]}
        />
      </section>
    </article>
  )
}
