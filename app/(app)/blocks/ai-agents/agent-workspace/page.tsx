import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AgentWorkspace01 from "@/registry/blocks/ai-agents/agent-workspace/agent-workspace-01/agent-workspace"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/agent-workspace",
  "Agent Workspace",
  "Ready-to-use Agent Workspace UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AgentWorkspace from "@/components/blocks/ai-agents/${name}/agent-workspace"

export default function Page() {
  return (
    <div className="h-dvh">
      <AgentWorkspace />
    </div>
  )
}`

export default function BlockAgentWorkspaceDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Agent Workspace"
        pathname="/blocks/ai-agents/agent-workspace"
        description="Full chat application with thread sidebar, model picker, streaming replies, stop/retry, and command search."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="agent-workspace-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("agent-workspace-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 h-180 overflow-hidden dark:bg-background"
        >
          <div className="relative h-180 w-full min-h-0">
            <AgentWorkspace01 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
