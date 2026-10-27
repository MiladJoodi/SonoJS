import { BlocksPageHeader } from "@/components/blocks"
import { AgentRunTimelinePreviewFrame } from "./preview"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/ai-agents/agent-run-timeline", "Agent Run Timeline", "Ready-to-use Agent Run Timeline UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

export default function AgentRunTimelineDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Agent Run Timeline"
        pathname="/blocks/ai-agents/agent-run-timeline"
        description="The plan an agent keeps while it works, one line per step. Steps move through in progress, done, and plan changes mid-run."
      />

      <AgentRunTimelinePreviewFrame />
    </article>
  )
}
