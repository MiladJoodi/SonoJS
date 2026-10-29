import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("voice-ai-orb", "Voice AI Orb")

const exampleDefs = [
  {
    name: "voice-ai-orb-listening",
    title: "Listening",
    description:
      "Mic-active idle. Use the control bar or pass `defaultState`.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "voice-ai-orb-reasoning",
    title: "Reasoning",
    description:
      'Thinking state with a spin ring — `defaultState="reasoning"`.',
    npmRequires: ["lucide-react"],
  },
  {
    name: "voice-ai-orb-speaking",
    title: "Speaking",
    description:
      'TTS playback — larger core + taller EQ bars via `defaultState="speaking"`.',
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { VoiceAiOrb } from "@/components/ui/voice-ai-orb"

export function Example() {
  return (
    <VoiceAiOrb
      state="listening"
      transcript="Can you audit our PostgreSQL query latency?"
    />
  )
}`

export default async function VoiceAiOrbDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Voice AI Orb"
        pathname="/docs/components/voice-ai-orb"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A voice-agent status orb for listening, reasoning, and speaking —
            with EQ bars, mute, and a short transcript.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="voice-ai-orb" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="voice-ai-orb.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "state",
              type: '"listening" | "reasoning" | "speaking"',
              defaultValue: "uncontrolled",
              description: "Controlled voice state. Omit for internal control bar.",
            },
            {
              name: "defaultState",
              type: "VoiceAiOrbState",
              defaultValue: '"listening"',
              description: "Initial state when uncontrolled.",
            },
            {
              name: "muted",
              type: "boolean",
              defaultValue: "uncontrolled",
              description: "Controlled mute. Collapses EQ bars when true.",
            },
            {
              name: "transcript",
              type: "string",
              defaultValue: "sample audit question",
              description: "Quoted line under the status label.",
            },
            {
              name: "showControls",
              type: "boolean",
              defaultValue: "true",
              description: "Listen / Reason / Speak / mute control bar.",
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
