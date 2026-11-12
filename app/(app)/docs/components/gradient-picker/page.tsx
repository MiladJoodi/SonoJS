import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "gradient-picker",
  "Gradient Picker"
)

const exampleDefs = [
  {
    name: "gradient-picker-default",
    title: "Basic",
    description:
      "Linear or radial gradient with stops, angle, preview, and CSS copy.",
    requires: [
      "color-picker",
      "slider",
      "button",
      "popover",
      "toggle-group",
    ],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { GradientPicker } from "@/components/gradient-picker"

export function Example() {
  return (
    <GradientPicker
      onValueChange={(value, css) => {
        console.log(value, css)
      }}
    />
  )
}`

export default async function GradientPickerDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Gradient Picker"
        pathname="/docs/components/gradient-picker"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Independent linear / radial gradient editor. Edit stops with the
            Color Picker, adjust angle, and copy the CSS string.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="gradient-picker" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="gradient-picker.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value / defaultValue / onValueChange",
              type: "GradientValue",
              defaultValue: "blue → violet",
              description:
                "Structured gradient; callback also receives the CSS string.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Locks editing.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "-",
              description: "Root layout classes.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/color-picker",
            title: "Color Picker",
            description: "stop color editing",
          },
          {
            href: "/docs/components/color-palette",
            title: "Color Palette",
            description: "harmony swatches",
          },
        ]}
      />
    </article>
  )
}
