import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "electro-border",
  "Electro Border"
)

const exampleDefs = [
  {
    name: "electro-border-default",
    title: "Default",
    description:
      "Cyan electric frame with glow, aura, and overlay around a content card.",
    requires: ["button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "electro-border-color",
    title: "Custom color",
    description:
      "`borderColor=\"#ff9900\"` with a slightly higher `distortion`.",
    requires: ["button"],
    npmRequires: ["lucide-react"],
  },
  {
    name: "electro-border-border-only",
    title: "Border only",
    description:
      "`effects={false}` — turbulent stroke without glow, aura, or overlay.",
  },
]

const usageSource = `import { ElectroBorder } from "@/components/ui/electro-border"

export function Example() {
  return (
    <ElectroBorder borderColor="#00fffc" radius="12px">
      <div className="p-8">Your content</div>
    </ElectroBorder>
  )
}`

export default async function ElectroBorderDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Electro Border"
        pathname="/docs/components/electro-border"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A dynamic SVG turbulence border with optional glow, aura, and
            overlay — wrap any child for an energized frame.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="electro-border" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="electro-border.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "borderColor",
              type: "string",
              defaultValue: '"#00fffc"',
              description: "Stroke and effect color.",
            },
            {
              name: "cardBackground",
              type: "string",
              description:
                "Optional fill for the frame body; omit for theme-adaptive card surface.",
            },
            {
              name: "borderWidth",
              type: "number",
              defaultValue: "2",
              description: "Border thickness in pixels.",
            },
            {
              name: "distortion",
              type: "number",
              defaultValue: "1",
              description: "Displacement scale multiplier for the filter.",
            },
            {
              name: "animationSpeed",
              type: "number",
              defaultValue: "1",
              description: "Higher is faster turbulence motion.",
            },
            {
              name: "radius",
              type: "string | number",
              defaultValue: '"12px"',
              description: "Corner radius for the frame layers.",
            },
            {
              name: "glow",
              type: "boolean",
              defaultValue: "true",
              description: "Soft blur rings around the stroke.",
            },
            {
              name: "aura",
              type: "boolean",
              defaultValue: "true",
              description: "Radial glow behind the card.",
            },
            {
              name: "overlay",
              type: "boolean",
              defaultValue: "true",
              description: "Glossy gradient overlay on the surface.",
            },
            {
              name: "effects",
              type: "boolean",
              defaultValue: "true",
              description:
                "Master switch for glow, aura, and overlay (stroke stays).",
            },
            {
              name: "glowBlur",
              type: "number",
              defaultValue: "32",
              description: "Blur radius for glow and aura layers.",
            },
            {
              name: "numOctaves",
              type: "number",
              defaultValue: "2",
              description: "Turbulence noise octaves (lower is cheaper).",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the root wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
