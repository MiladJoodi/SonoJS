import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ChatComposer01 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-01/chat-composer"
import ChatComposer02 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-02/chat-composer"
import ChatComposer03 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-03/chat-composer"
import ChatComposer04 from "@/registry/blocks/ai-agents/chat-composer/chat-composer-04/chat-composer"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ai-agents/chat-composer",
  "Chat Composer",
  "Ready-to-use Chat Composer UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ChatComposer from "@/components/blocks/ai-agents/${name}/chat-composer"

export default function Page() {
  return <ChatComposer />
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

export default function BlockChatComposerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Chat Composer"
        pathname="/blocks/ai-agents/chat-composer"
        description="Centered composers with voice, model selection, or agent tooling pills."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="chat-composer-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("chat-composer-01"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ChatComposer01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="chat-composer-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("chat-composer-02"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <div className="flex w-full justify-center">
            <ChatComposer02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="chat-composer-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("chat-composer-03"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <div className="flex w-full justify-center">
            <ChatComposer03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="chat-composer-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("chat-composer-04"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ChatComposer04 />
        </BlockExample>
      </div>
    </article>
  )
}
