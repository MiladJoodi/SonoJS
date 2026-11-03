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
  "reasoning-text",
  "Reasoning Text"
)

const exampleDefs = [
  {
    name: "reasoning-text-cascade",
    title: "Cascade",
    description:
      'Per-character spring enter/exit — `variant="cascade"` (default).',
    npmRequires: ["motion"],
  },
  {
    name: "reasoning-text-swap",
    title: "Swap",
    description: 'Whole-phrase fade/slide — `variant="swap"`.',
    npmRequires: ["motion"],
  },
  {
    name: "reasoning-text-scramble",
    title: "Scramble",
    description: 'Mono glyph decode into the next phrase — `variant="scramble"`.',
    npmRequires: ["motion"],
  },
]

const usageSource = `import { ReasoningText } from "@/components/sonojs/reasoning-text"

export function Example() {
  return (
    <ReasoningText
      variant="cascade"
      phrases={[
        "Thinking",
        "Reading the context",
        "Connecting the details",
        "Forming a response",
      ]}
    />
  )
}`

export default async function ReasoningTextDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Reasoning Text"
        pathname="/docs/components/reasoning-text"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Animated status text for showing that an AI agent is thinking and
            working — ASCII loader plus shimmering phrase cycles.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="reasoning-text" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="reasoning-text.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "phrases",
              type: "string[]",
              defaultValue: "Thinking / Reading…",
              description: "Phrases cycled while the agent works.",
            },
            {
              name: "variant",
              type: '"cascade" | "swap" | "scramble"',
              defaultValue: '"cascade"',
              description: "Animation when the active phrase changes.",
            },
            {
              name: "interval",
              type: "number",
              defaultValue: "1800",
              description: "Milliseconds each phrase remains visible.",
            },
            {
              name: "shimmerDuration",
              type: "number",
              defaultValue: "2",
              description: "Seconds for one shimmer pass.",
            },
            {
              name: "indicator",
              type: "ReactNode",
              defaultValue: "ascii-line Loader",
              description: "Optional leading visual instead of the default loader.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the status root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
