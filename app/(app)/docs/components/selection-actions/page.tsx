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
  "selection-actions",
  "Selection Actions"
)

const exampleDefs = [
  {
    name: "selection-actions-default",
    title: "Default",
    description:
      "Highlight a selection, then Explain / Improve / expand / custom prompt. Demo runs idle → thinking → result once per action.",
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { SelectionActions } from "@/components/sonojs/selection-actions"

export function Example() {
  return (
    <SelectionActions
      leadingText="Pistachio holds the top slot all weekend. "
      selection="Churn it first thing Saturday…"
      result="Churn pistachio first thing Saturday…"
    />
  )
}`

export default async function SelectionActionsDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Selection Actions"
        pathname="/docs/components/selection-actions"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A contextual AI action bar that appears beneath selected text —
            explain, improve, shorten, fix grammar, or a custom edit.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="selection-actions" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="selection-actions.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "leadingText",
              type: "string",
              defaultValue: "sample lead-in",
              description: "Text preceding the highlighted selection.",
            },
            {
              name: "selection",
              type: "string",
              defaultValue: "sample selection",
              description: "Highlighted text the actions operate on.",
            },
            {
              name: "result",
              type: "string",
              defaultValue: "sample result",
              description: "Replacement text after a successful action.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
