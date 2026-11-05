import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("border-beam", "Border Beam")

const exampleDefs = [
  {
    name: "border-beam-default",
    title: "Default",
    description:
      "Place `BorderBeam` inside a `relative overflow-hidden` parent. `duration={8}` and `size={100}`.",
    requires: ["card", "button", "input", "label"],
  },
  {
    name: "border-beam-dual",
    title: "Two beams",
    description:
      "Stack two beams with a `delay` offset and custom `via-*` colors via `className`.",
    requires: ["card", "button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "border-beam-reverse",
    title: "Reverse",
    description: "`reverse` runs the beam the other way around the border.",
    requires: ["card", "button", "input", "label"],
  },
  {
    name: "border-beam-spring",
    title: "Spring",
    description:
      "Pass a motion `transition` (e.g. spring) and `initialOffset` on a button.",
    requires: ["button"],
  },
]

const usageSource = `import { BorderBeam } from "@/components/border-beam"

export function Example() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <BorderBeam />
    </div>
  )
}`

export default async function BorderBeamDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Border Beam"
        pathname="/docs/components/border-beam"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An animated beam of light that travels along the border of its
            container. Parent needs `relative` and `overflow-hidden`.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="border-beam" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="border-beam.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "className",
              type: "string",
              description: "Classes on the moving beam (e.g. via color stops).",
            },
            {
              name: "size",
              type: "number",
              defaultValue: "50",
              description: "Beam square size in pixels.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "6",
              description: "Loop duration in seconds.",
            },
            {
              name: "delay",
              type: "number",
              defaultValue: "0",
              description: "Start delay in seconds (applied as a negative delay).",
            },
            {
              name: "colorFrom",
              type: "string",
              defaultValue: '"#ffaa40"',
              description: "Gradient start color.",
            },
            {
              name: "colorTo",
              type: "string",
              defaultValue: '"#9c40ff"',
              description: "Gradient mid color.",
            },
            {
              name: "transition",
              type: "Transition",
              description: "Override motion transition (e.g. spring).",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Inline styles on the beam.",
            },
            {
              name: "reverse",
              type: "boolean",
              defaultValue: "false",
              description: "Reverse travel direction along the border.",
            },
            {
              name: "initialOffset",
              type: "number",
              defaultValue: "0",
              description: "Starting offset along the path (0–100).",
            },
            {
              name: "borderWidth",
              type: "number",
              defaultValue: "1",
              description: "Visible border width of the beam mask in pixels.",
            },
          ]}
        />
      </section>
    </article>
  )
}
