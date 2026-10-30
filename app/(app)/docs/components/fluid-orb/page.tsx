import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("fluid-orb", "Fluid AI Orb")

const exampleDefs = [
  {
    name: "fluid-orb-default",
    title: "Basic",
    description:
      "A WebGL fluid orb for AI idle and thinking states. Respects `prefers-reduced-motion`.",
  },
  {
    name: "fluid-orb-color",
    title: "Color",
    description: "Tint the fluid with any hex via the `color` prop.",
  },
  {
    name: "fluid-orb-size",
    title: "Size",
    description: "Set the diameter in pixels with `size` (default `240`).",
  },
]

const usageSource = `import { FluidOrb } from "@/components/sonojs/fluid-orb"

export function Example() {
  return <FluidOrb size={160} color="#1A73F2" />
}`

export default async function FluidOrbDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Fluid AI Orb"
        pathname="/docs/components/fluid-orb"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A circular WebGL fluid for AI idle and thinking states. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              size
            </code>{" "}
            and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              color
            </code>{" "}
            to match your brand.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="fluid-orb" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="fluid-orb.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "size",
              type: "number",
              defaultValue: "240",
              description: "Orb diameter in CSS pixels.",
            },
            {
              name: "color",
              type: "string",
              defaultValue: '"#1A73F2"',
              description: "Hex tint mixed into the fluid shader.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the rounded wrapper.",
            },
            {
              name: "…div props",
              type: 'React.ComponentProps<"div">',
              defaultValue: "—",
              description: "Pass-through props for the wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
