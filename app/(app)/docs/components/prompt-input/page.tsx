import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("prompt-input", "Prompt Input")

const exampleDefs = [
  {
    name: "prompt-input-default",
    title: "Default",
    description:
      "Collapsed prompt that expands on focus — model select, effort cycle, image attachments, and mic / send.",
  },
]

const usageSource = `import { PromptInput } from "@/components/sonojs/prompt-input"

export function Example() {
  return (
    <PromptInput
      onSubmit={(value, meta) => {
        console.log(value, meta.model, meta.effort, meta.attachments)
      }}
    />
  )
}`

export default async function PromptInputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Prompt Input"
        pathname="/docs/components/prompt-input"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An AI prompt bar for chat interfaces — morphing expand, model and
            effort controls, image attachments, and voice input.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="prompt-input" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="prompt-input.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "value / defaultValue",
              type: "string",
              defaultValue: '""',
              description: "Controlled or uncontrolled prompt text.",
            },
            {
              name: "onChange",
              type: "(value: string) => void",
              defaultValue: "—",
              description: "Fires when the textarea value changes.",
            },
            {
              name: "onSubmit",
              type: "(value, meta) => void",
              defaultValue: "—",
              description:
                "Fires on send with `{ model, effort, attachments }`.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Ask anything"',
              description: "Collapsed and expanded placeholder copy.",
            },
            {
              name: "models",
              type: "string[]",
              defaultValue: "GPT / Opus / Gemini / …",
              description: "Model labels shown in the morphing select.",
            },
            {
              name: "efforts",
              type: "string[]",
              defaultValue: "Low / Medium / Max Effort",
              description: "Cycled effort levels next to the model control.",
            },
            {
              name: "maxAttachments",
              type: "number",
              defaultValue: "6",
              description: "Maximum image attachments allowed.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the outer wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
