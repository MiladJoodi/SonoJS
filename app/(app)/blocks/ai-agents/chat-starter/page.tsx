import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ChatStarter from "@/registry/blocks/ai-agents/chat-starter/chat-starter-01/chat-starter"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/chat-starter",
  "Chat Starter",
  "Ready-to-use Chat Starter UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = `import ChatStarter from "@/components/blocks/ai-agents/chat-starter-01/chat-starter"

export default function Page() {
  return (
    <div className="h-dvh">
      <ChatStarter />
    </div>
  )
}`

export default function BlockChatStarterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Chat Starter"
        pathname="/blocks/ai-agents/chat-starter"
        description="Full-screen chat with a history rail, setup notice, demo streaming when no key is set, and an installable /api/chat route for your own provider key."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="chat-starter-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage,
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0 h-180 overflow-hidden"
        >
          <div className="relative h-180 w-full min-h-0">
            <ChatStarter contained />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
