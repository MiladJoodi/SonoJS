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
  "structured-output",
  "Structured Output"
)

const exampleDefs = [
  {
    name: "structured-output-default",
    title: "Default",
    description:
      "Default model pricing rows with brand icons for GPT, Claude, and Llama.",
  },
  {
    name: "structured-output-custom",
    title: "Custom rows",
    description:
      "Pass `rows` to compare any models — icons resolve from the model name prefix.",
  },
]

const usageSource = `import { DataTable } from "@/components/sonojs/structured-output"

export function Example() {
  return (
    <DataTable
      rows={[
        { model: "gpt-4o", context: "128k", price: "$5.00" },
        { model: "claude-3.5", context: "200k", price: "$3.00" },
      ]}
    />
  )
}`

export default async function StructuredOutputDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Structured Output"
        pathname="/docs/components/structured-output"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A structured table for comparing AI models and their results —
            model, context window, and input price.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="structured-output" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="structured-output.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "rows",
              type: "DataTableRow[]",
              defaultValue: "gpt / claude / llama",
              description:
                "Rows with `model`, `context`, and `price`. Icons follow the model prefix.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the table root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
