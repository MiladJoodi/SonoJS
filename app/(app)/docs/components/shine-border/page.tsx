import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("shine-border", "Shine Border")

const exampleDefs = [
  {
    name: "shine-border-default",
    title: "Default",
    description:
      "Multi-stop `shineColor` array on a login card. Parent needs `relative overflow-hidden`.",
    requires: ["card", "button", "input", "label"],
  },
  {
    name: "shine-border-monotone",
    title: "Monotone",
    description:
      "Single `shineColor` that follows the active theme (white in dark, black in light).",
    requires: ["card", "button", "input", "label"],
    npmRequires: ["next-themes"],
  },
]

const usageSource = `import { ShineBorder } from "@/components/shine-border"

export function Example() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <ShineBorder />
    </div>
  )
}`

export default async function ShineBorderDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Shine Border"
        pathname="/docs/components/shine-border"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An animated shine that runs along the border of its container.
            Animation lives in a companion CSS file — no globals edit required.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="shine-border" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="shine-border.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "className",
              type: "string",
              description: "Classes on the shine overlay.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "14",
              description: "Animation duration in seconds.",
            },
            {
              name: "shineColor",
              type: "string | string[]",
              defaultValue: '"#000000"',
              description: "Border shine color, or a gradient stop list.",
            },
            {
              name: "borderWidth",
              type: "number",
              defaultValue: "1",
              description: "Border width in pixels.",
            },
            {
              name: "style",
              type: "React.CSSProperties",
              description: "Additional inline styles on the overlay.",
            },
          ]}
        />
      </section>
    </article>
  )
}
