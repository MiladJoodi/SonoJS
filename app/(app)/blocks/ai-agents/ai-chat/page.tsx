import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AiChat01 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-01/ai-chat"
import AiChat02 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-02/ai-chat"
import AiChat03 from "@/registry/blocks/ai-agents/ai-chat/ai-chat-03/ai-chat"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/ai-chat",
  "AI Chat",
  "Ready-to-use AI Chat UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AiChat from "@/components/blocks/ai-agents/${name}/ai-chat"

export default function Page() {
  return <AiChat />
}`

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

export default function BlockAiChatDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="AI Chat"
        pathname="/blocks/ai-agents/ai-chat"
        description="Full chats with streaming replies, model controls, or a compact card assistant."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="ai-chat-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("ai-chat-01"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AiChat01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="ai-chat-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("ai-chat-02"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AiChat02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="ai-chat-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("ai-chat-03"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AiChat03 />
        </BlockExample>
      </div>
    </article>
  )
}
