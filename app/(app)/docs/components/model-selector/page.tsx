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
  "model-selector",
  "Model Selector"
)

const exampleDefs = [
  {
    name: "model-selector-default",
    title: "Default",
    description:
      "Searchable dialog of models grouped by provider, with chef and host logos.",
    requires: ["button"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorInput,
  ModelSelectorList,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorItem,
  ModelSelectorLogo,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/sonojs/model-selector"

export function Example() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("gpt-4o")

  return (
    <ModelSelector open={open} onOpenChange={setOpen}>
      <ModelSelectorTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          <ModelSelectorLogo provider="openai" />
          <ModelSelectorName>GPT-4o</ModelSelectorName>
        </Button>
      </ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput placeholder="Search models..." />
        <ModelSelectorList>
          <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
          <ModelSelectorGroup heading="OpenAI">
            <ModelSelectorItem
              value="gpt-4o"
              onSelect={() => {
                setSelected("gpt-4o")
                setOpen(false)
              }}
            >
              <ModelSelectorLogo provider="openai" />
              <ModelSelectorName>GPT-4o</ModelSelectorName>
            </ModelSelectorItem>
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  )
}`

export default async function ModelSelectorDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Model Selector"
        pathname="/docs/components/model-selector"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A searchable dialog for picking an AI model — grouped by chef, with
            provider logos and a compact trigger.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="model-selector" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="model-selector.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "ModelSelector",
              type: "Dialog props",
              description: "`open` / `onOpenChange` and other Dialog root props.",
            },
            {
              name: "ModelSelectorTrigger",
              type: "DialogTrigger props",
              description: "Usually `asChild` wrapping a Button.",
            },
            {
              name: "ModelSelectorContent",
              type: "DialogContent + title?",
              defaultValue: 'title="Model Selector"',
              description:
                "Dialog shell with Command inside. `title` is screen-reader only.",
            },
            {
              name: "ModelSelectorInput",
              type: "CommandInput props",
              description: "Search field for filtering models.",
            },
            {
              name: "ModelSelectorList / Group / Item / Empty",
              type: "Command* props",
              description: "List chrome — same API as Command.",
            },
            {
              name: "ModelSelectorLogo",
              type: '{ provider: string }',
              description:
                "12×12 logo from `models.dev/logos/{provider}.svg`.",
            },
            {
              name: "ModelSelectorLogoGroup",
              type: "div props",
              description: "Overlapping host provider logos.",
            },
            {
              name: "ModelSelectorName",
              type: "span props",
              description: "Truncated model label.",
            },
          ]}
        />
      </section>
    </article>
  )
}
