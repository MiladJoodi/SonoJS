import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AgentWorkspace01 from "@/registry/blocks/ai-agents/agent-workspace/agent-workspace-01/agent-workspace"
import ChatStarter01 from "@/registry/blocks/ai-agents/chat-starter/chat-starter-01/chat-starter"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/agent-workspace",
  "Agent Workspace",
  "Ready-to-use Agent Workspace and Chat Starter UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

export default function BlockAgentWorkspaceDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Agent Workspace"
        pathname="/blocks/ai-agents/agent-workspace"
        description="Two full-screen chat apps in one place: a rich Agent Workspace (threads, models, command search), and a deployable Chat Starter (demo mode + your own /api/chat key)."
      />

      <div className="flex flex-col gap-8">
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-h3">Agent Workspace</h2>
            <p className="text-sm text-muted-foreground">
              Full product shell — sidebar threads, model picker, streaming
              conversation, stop/retry, and command search.
            </p>
          </div>
          <BlockExample
            name="agent-workspace-01"
            title="agent-workspace-01"
            usage={[
              {
                title: "app/page.tsx",
                code: `import AgentWorkspace from "@/components/blocks/ai-agents/agent-workspace-01/agent-workspace"

export default function Page() {
  return (
    <div className="h-dvh">
      <AgentWorkspace />
    </div>
  )
}`,
              },
            ]}
            previewAlign="start"
            previewClassName="bg-white p-0 h-180 overflow-hidden dark:bg-background"
          >
            <div className="relative h-180 w-full min-h-0">
              <AgentWorkspace01 />
            </div>
          </BlockExample>
        </section>

        <ExampleRule />

        <section id="chat-starter-01" className="scroll-mt-24 space-y-3">
          <div className="space-y-1">
            <h2 className="text-h3">Chat Starter</h2>
            <p className="text-sm text-muted-foreground">
              Deployable starter — history rail, setup notice, scripted demo
              replies when no key is set, and an installable{" "}
              <code className="text-foreground">/api/chat</code> route for your
              own provider key.
            </p>
          </div>
          <BlockExample
            name="chat-starter-01"
            title="chat-starter-01"
            usage={[
              {
                title: "app/page.tsx",
                code: `import ChatStarter from "@/components/blocks/ai-agents/chat-starter-01/chat-starter"

export default function Page() {
  return (
    <div className="h-dvh">
      <ChatStarter />
    </div>
  )
}`,
              },
            ]}
            previewAlign="start"
            previewClassName="bg-white p-0 h-180 overflow-hidden dark:bg-background"
          >
            <div className="relative h-180 w-full min-h-0">
              <ChatStarter01 contained />
            </div>
          </BlockExample>
        </section>
      </div>
    </article>
  )
}
