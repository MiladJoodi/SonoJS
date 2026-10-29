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
  "agent-activity",
  "Agent Activity"
)

const exampleDefs = [
  {
    name: "agent-activity-steps",
    title: "Steps",
    description:
      "Streams `type: \"step\"` rows while `status=\"working\"`. Replay remounts the cycle.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "agent-activity-search",
    title: "Search",
    description:
      "Web search query with result rows and a `moreCount` footer. Replay remounts.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "agent-activity-tools",
    title: "Tools",
    description:
      "Read / edit / run tool rows with optional +/- line counts. Replay remounts.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "agent-activity-complete",
    title: "Complete",
    description:
      '`status="complete"` collapses by default — click the summary to expand.',
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import {
  AgentActivity,
  type AgentActivityItem,
} from "@/components/sonojs/agent-activity"

const items: AgentActivityItem[] = [
  { id: "1", type: "step", label: "Reading briefs", status: "complete" },
  { id: "2", type: "step", label: "Writing report", status: "active" },
]

export function Example() {
  return (
    <AgentActivity items={items} status="working" />
  )
}`

export default async function AgentActivityDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Agent Activity"
        pathname="/docs/components/agent-activity"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A live timeline that shows an AI agent&apos;s work step by step —
            thinking shimmer while running, then a collapsible summary.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="agent-activity" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="agent-activity.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "items",
              type: "AgentActivityItem[]",
              defaultValue: "—",
              description: "Chronological activity entries (step, text, search, tool, trace).",
            },
            {
              name: "status",
              type: '"working" | "complete"',
              defaultValue: '"working"',
              description: "Working always stays expanded; complete can collapse.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "0",
              description: "Elapsed seconds for the step/text summary.",
            },
            {
              name: "open",
              type: "boolean",
              defaultValue: "uncontrolled",
              description: "Controlled expanded state after complete.",
            },
            {
              name: "defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Initial open state when complete.",
            },
            {
              name: "collapseOnComplete",
              type: "boolean",
              defaultValue: "true",
              description: "Collapse when status flips from working to complete.",
            },
            {
              name: "activeLabel",
              type: "ReactNode",
              defaultValue: "derived",
              description: "Shimmer label while working.",
            },
            {
              name: "summary",
              type: "ReactNode",
              defaultValue: "derived",
              description: "Completed trigger label.",
            },
            {
              name: "maxHeight",
              type: "number",
              defaultValue: "208",
              description: "Max viewport height before the stream glides.",
            },
          ]}
        />
      </section>
    </article>
  )
}
