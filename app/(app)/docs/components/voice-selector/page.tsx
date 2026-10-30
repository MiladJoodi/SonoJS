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
  "voice-selector",
  "Voice Selector"
)

const exampleDefs = [
  {
    name: "voice-selector-default",
    title: "Default",
    description:
      "Searchable dialog of AI voices with preview playback, accent, age, and gender metadata.",
    requires: ["button", "dialog", "command", "spinner"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  VoiceSelector,
  VoiceSelectorContent,
  VoiceSelectorEmpty,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorTrigger,
} from "@/components/sonojs/voice-selector"

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <VoiceSelector open={open} onOpenChange={setOpen}>
      <VoiceSelectorTrigger asChild>
        <Button variant="outline">Select a voice...</Button>
      </VoiceSelectorTrigger>
      <VoiceSelectorContent>
        <VoiceSelectorInput placeholder="Search voices..." />
        <VoiceSelectorList>
          <VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
          <VoiceSelectorItem value="liam" onSelect={() => setOpen(false)}>
            <VoiceSelectorName>Liam</VoiceSelectorName>
          </VoiceSelectorItem>
        </VoiceSelectorList>
      </VoiceSelectorContent>
    </VoiceSelector>
  )
}`

export default async function VoiceSelectorDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Voice Selector"
        pathname="/docs/components/voice-selector"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A searchable dialog for picking an AI voice — preview playback,
            accent / age / gender metadata, and a compact trigger.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="voice-selector" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="voice-selector.tsx"
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
              type: "string",
              description: "Selected voice ID (controlled or uncontrolled).",
            },
            {
              name: "open / onOpenChange",
              type: "boolean",
              description: "Dialog open state.",
            },
            {
              name: "VoiceSelectorPreview",
              type: "playing? / loading? / onPlay?",
              description: "Play / pause / spinner control for audio previews.",
            },
            {
              name: "VoiceSelectorGender",
              type: "value?: male | female | …",
              description: "Gender icon (or custom children).",
            },
            {
              name: "VoiceSelectorAccent",
              type: "value?: american | british | …",
              description: "Accent flag emoji (or custom children).",
            },
            {
              name: "useVoiceSelector()",
              type: "hook",
              description:
                "Context: `value`, `setValue`, `open`, `setOpen` inside the tree.",
            },
          ]}
        />
      </section>
    </article>
  )
}
