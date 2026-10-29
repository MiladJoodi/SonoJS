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
  "prompt-input-2",
  "Prompt Input 2"
)

const exampleDefs = [
  {
    name: "prompt-input-2-default",
    title: "Default",
    description:
      "Compose a prompt with quick actions, model select, and send / stop. Submitting briefly enters the loading state.",
    requires: ["button", "popover", "select"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "prompt-input-2-loading",
    title: "Loading",
    description:
      "`loading` swaps the send control for stop. Call `onStop` to cancel.",
    requires: ["button", "popover", "select"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { PromptInput2 } from "@/components/sonojs/prompt-input-2"

export function Example() {
  return (
    <PromptInput2
      models={[
        { value: "sono-fast", label: "Sono Fast" },
        { value: "sono-pro", label: "Sono Pro" },
      ]}
      actions={[
        { value: "attach", label: "Attach file" },
      ]}
      onSubmit={(value, model) => {
        console.log(value, model)
      }}
    />
  )
}`

export default async function PromptInput2DocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Prompt Input 2"
        pathname="/docs/components/prompt-input-2"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A prompt bar for composing agent requests with model selection and
            quick actions — auto-growing textarea, plus menu, and send / stop.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="prompt-input-2" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="prompt-input-2.tsx"
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
              name: "onValueChange",
              type: "(value: string) => void",
              defaultValue: "—",
              description: "Fires when the textarea value changes.",
            },
            {
              name: "models",
              type: "PromptModel[]",
              defaultValue: "[]",
              description: "Optional model options for the select.",
            },
            {
              name: "model / defaultModel",
              type: "string",
              defaultValue: "—",
              description: "Controlled or uncontrolled selected model value.",
            },
            {
              name: "onModelChange",
              type: "(model: string) => void",
              defaultValue: "—",
              description: "Fires when the selected model changes.",
            },
            {
              name: "actions",
              type: "PromptAction[]",
              defaultValue: "[]",
              description: "Quick actions shown in the plus popover.",
            },
            {
              name: "onAction",
              type: "(action: string) => void",
              defaultValue: "—",
              description: "Fires when a quick action is chosen.",
            },
            {
              name: "onSubmit",
              type: "(value: string, model?: string) => void",
              defaultValue: "—",
              description: "Fires on Enter (without Shift) or send click.",
            },
            {
              name: "loading",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the stop control instead of send.",
            },
            {
              name: "onStop",
              type: "() => void",
              defaultValue: "—",
              description: "Called when the stop control is pressed.",
            },
            {
              name: "minRows / maxRows",
              type: "number",
              defaultValue: "2 / 8",
              description: "Auto-grow bounds for the textarea height.",
            },
            {
              name: "leadingAction",
              type: "ReactNode",
              defaultValue: "—",
              description: "Optional control rendered after the actions menu.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the form root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
