import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("thinking-orbs", "Thinking Orbs")

const exampleDefs = [
  {
    name: "thinking-orbs-working",
    title: "Working",
    description: 'Particles on tilted orbits — `state="working"`.',
  },
  {
    name: "thinking-orbs-weaving",
    title: "Weaving",
    description: 'Three strands plait around the sphere — `state="weaving"`.',
  },
  {
    name: "thinking-orbs-searching",
    title: "Searching",
    description: 'Scan meridian over a dotted globe — `state="searching"`.',
  },
  {
    name: "thinking-orbs-connecting",
    title: "Connecting",
    description:
      'Constellation wires itself with packets on the edges — `state="connecting"`.',
  },
]

const usageSource = `import { ThinkingOrb } from "@/components/sonojs/thinking-orbs"

export function Example() {
  return <ThinkingOrb state="working" size={64} />
}`

export default async function ThinkingOrbsDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Thinking Orbs"
        pathname="/docs/components/thinking-orbs"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Animated orb states that visualize an AI agent&apos;s work —
            canvas particle modes for working, searching, weaving, and more.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="thinking-orbs" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="thinking-orbs.tsx"
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
              type: "OrbState",
              defaultValue: '"working"',
              description:
                "working · searching · solving · listening · connecting · weaving · composing · breathing · shaping",
            },
            {
              name: "size",
              type: "64 | 20",
              defaultValue: "64",
              description: "Tuned size presets (not a simple scale factor).",
            },
            {
              name: "theme",
              type: '"auto" | "dark" | "light"',
              defaultValue: '"auto"',
              description: "Ink palette; auto follows host dark/light.",
            },
            {
              name: "speed",
              type: "number",
              defaultValue: "1",
              description: "Speed multiplier on the preset base speed.",
            },
            {
              name: "paused",
              type: "boolean",
              defaultValue: "false",
              description: "Freeze on the current frame.",
            },
            {
              name: "aria-label",
              type: "string",
              defaultValue: "derived",
              description: "Accessible label; defaults per state.",
            },
          ]}
        />
      </section>
    </article>
  )
}
