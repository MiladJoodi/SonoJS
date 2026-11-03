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
  "agent-activity-2",
  "Agent Activity 2"
)

const exampleDefs = [
  {
    name: "agent-activity-2-steps",
    title: "Steps",
    description:
      "Auto-advancing checklist with a shimmer status and expandable timeline. Replay remounts the stage cycle.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "agent-activity-2-reasoning",
    title: "Reasoning",
    description:
      "`variant=\"reasoning\"` shows longer muted thought lines as the agent works.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "agent-activity-2-search",
    title: "Search",
    description:
      "`variant=\"search\"` lists web results with a query row and external links.",
    npmRequires: ["lucide-react"],
  },
  {
    name: "agent-activity-2-coding",
    title: "Coding",
    description:
      "`variant=\"coding\"` shows tool rows (read / edit / run) with selectable press state.",
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import { AgentActivity2 } from "@/components/sonojs/agent-activity-2"

export function Example() {
  return <AgentActivity2 variant="steps" />
}
`

export default async function AgentActivity2DocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Agent Activity 2"
        pathname="/docs/components/agent-activity-2"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An expandable agent trace for steps, reasoning, search, and coding —
            shimmer while working, then a settled summary.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="agent-activity-2" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="agent-activity-2.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"steps" | "reasoning" | "search" | "coding"',
              defaultValue: '"steps"',
              description: "Which built-in trace demo to play.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the root section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
