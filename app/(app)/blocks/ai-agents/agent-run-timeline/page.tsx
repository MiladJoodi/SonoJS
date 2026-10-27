import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { AgentRunTimeline } from "@/registry/blocks/ai-agents/agent-run-timeline/agent-run-timeline"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/agent-run-timeline",
  "Agent Run Timeline",
  "Ready-to-use Agent Run Timeline UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = `import { AgentRunTimeline } from "@/components/blocks/agent-run-timeline"

export default function Page() {
  return (
    <div className="h-dvh">
      <AgentRunTimeline />
    </div>
  )
}`

export default function AgentRunTimelineDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Agent Run Timeline"
        pathname="/blocks/ai-agents/agent-run-timeline"
        description="The plan an agent keeps while it works, one line per step. Steps move through in progress, done, and plan changes mid-run."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="agent-run-timeline"
          usage={[
            {
              title: "app/page.tsx",
              code: usage,
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 h-180 overflow-hidden dark:bg-background"
        >
          <div className="relative h-180 w-full min-h-0">
            <AgentRunTimeline />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
