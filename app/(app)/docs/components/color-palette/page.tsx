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

export const metadata = componentDocsMetadata("color-palette", "Color Palette")

const exampleDefs = [
  {
    name: "color-palette-default",
    title: "Harmonies",
    description:
      "Pick a base color and generate complementary, analogous, and more.",
    requires: ["color-picker", "button", "popover"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { ColorPalette } from "@/components/color-palette"

export function Example() {
  return <ColorPalette defaultBaseColor="#3B82F6" defaultHarmony="triadic" />
}`

export default async function ColorPaletteDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Color Palette"
        pathname="/docs/components/color-palette"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Generate color harmonies from a base color. Click a swatch to copy
            its HEX value.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="color-palette" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="color-palette.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "baseColor / defaultBaseColor / onBaseColorChange",
              type: "string",
              defaultValue: '"#3B82F6"',
              description: "Base color for the harmony.",
            },
            {
              name: "harmony / defaultHarmony / onHarmonyChange",
              type: "ColorHarmony",
              defaultValue: '"analogous"',
              description:
                "complementary, analogous, triadic, split-complementary, tetradic, monochromatic.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Locks the control.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/color-picker",
            title: "Color Picker",
            description: "pick the base color",
          },
          {
            href: "/docs/components/gradient-picker",
            title: "Gradient Picker",
            description: "build CSS gradients",
          },
        ]}
      />
    </article>
  )
}
