import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("magic-card", "Magic Card")

const exampleDefs = [
  {
    name: "magic-card-default",
    title: "Default",
    description:
      "Gradient spotlight that follows the pointer. Pass `gradientColor` for light and dark surfaces.",
    requires: ["card", "button", "input", "label"],
    npmRequires: ["motion"],
  },
  {
    name: "magic-card-orb",
    title: "Orb",
    description:
      '`mode="orb"` with `glowFrom` / `glowTo` for a soft blurred glow under the content.',
    requires: ["card", "button", "avatar"],
    npmRequires: ["motion"],
  },
]

const usageSource = `import { MagicCard } from "@/components/magic-card"

export function Example() {
  return (
    <MagicCard>
      <div className="p-4">
        <p>Hello World</p>
        <span>Hover me</span>
      </div>
    </MagicCard>
  )
}`

export default async function MagicCardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Magic Card"
        pathname="/docs/components/magic-card"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A spotlight that follows the pointer and highlights the border on
            hover — gradient fill or soft orb glow.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewClassName="bg-canvas p-0"
        />
      </section>

      <DocsInstallation name="magic-card" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Content rendered inside the card.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the card root.",
            },
            {
              name: "mode",
              type: '"gradient" | "orb"',
              defaultValue: '"gradient"',
              description: "Spotlight style: gradient wash or orb glow.",
            },
            {
              name: "gradientSize",
              type: "number",
              defaultValue: "200",
              description: "Radius of the gradient spotlight in pixels.",
            },
            {
              name: "gradientColor",
              type: "string",
              defaultValue: '"#262626"',
              description: "Fill color of the gradient spotlight (gradient mode).",
            },
            {
              name: "gradientOpacity",
              type: "number",
              defaultValue: "0.8",
              description: "Opacity of the gradient spotlight (gradient mode).",
            },
            {
              name: "gradientFrom",
              type: "string",
              defaultValue: '"#9E7AFF"',
              description: "Start color of the border gradient.",
            },
            {
              name: "gradientTo",
              type: "string",
              defaultValue: '"#FE8BBB"',
              description: "End color of the border gradient.",
            },
            {
              name: "glowFrom",
              type: "string",
              defaultValue: '"#ee4f27"',
              description: "Orb glow start color (orb mode).",
            },
            {
              name: "glowTo",
              type: "string",
              defaultValue: '"#6b21ef"',
              description: "Orb glow end color (orb mode).",
            },
            {
              name: "glowAngle",
              type: "number",
              defaultValue: "90",
              description: "Orb glow gradient angle in degrees (orb mode).",
            },
            {
              name: "glowSize",
              type: "number",
              defaultValue: "420",
              description: "Orb glow diameter in pixels (orb mode).",
            },
            {
              name: "glowBlur",
              type: "number",
              defaultValue: "60",
              description: "Orb glow blur in pixels (orb mode).",
            },
            {
              name: "glowOpacity",
              type: "number",
              defaultValue: "0.9",
              description: "Orb glow opacity while hovered (orb mode).",
            },
          ]}
        />
      </section>
    </article>
  )
}
