import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("persona", "Persona")

const exampleDefs = [
  {
    name: "persona-default",
    title: "States",
    description:
      "Drive `state` between idle, listening, thinking, speaking, and asleep.",
    requires: ["button", "button-group", "tooltip"],
    npmRequires: ["lucide-react", "@rive-app/react-webgl2"],
  },
  {
    name: "persona-variants",
    title: "Variants",
    description:
      "`variant` picks the Rive visual: obsidian, command, glint, halo, mana, or opal.",
    npmRequires: ["@rive-app/react-webgl2"],
  },
]

const usageSource = `import { Persona } from "@/components/sonojs/persona"

export function Example() {
  return <Persona className="size-32" state="listening" variant="obsidian" />
}`

export default async function PersonaDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Persona"
        pathname="/docs/components/persona"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An animated AI visual powered by Rive WebGL2 — idle, listening,
            thinking, speaking, and asleep, with multiple look variants.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="persona" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="persona.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "state",
              type: '"idle" | "listening" | "thinking" | "speaking" | "asleep"',
              defaultValue: '"idle"',
              description: "Conversational state for the Rive state machine.",
            },
            {
              name: "variant",
              type: '"obsidian" | "command" | "glint" | "halo" | "mana" | "opal"',
              defaultValue: '"obsidian"',
              description: "Which Rive asset / look to load.",
            },
            {
              name: "className",
              type: "string",
              description: "Size and layout on the canvas (default `size-16`).",
            },
            {
              name: "onLoad / onReady / onPlay / onPause / onStop",
              type: "callbacks",
              description: "Rive lifecycle hooks.",
            },
          ]}
        />
      </section>
    </article>
  )
}
