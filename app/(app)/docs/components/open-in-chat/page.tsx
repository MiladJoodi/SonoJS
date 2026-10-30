import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("open-in-chat", "Open In Chat")

const exampleDefs = [
  {
    name: "open-in-chat-default",
    title: "Default",
    description:
      "Pass a `query` to `OpenIn`, then compose provider items inside `OpenInContent`.",
    requires: ["button", "dropdown-menu"],
    npmRequires: ["lucide-react"],
  },
]

const usageSource = `import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInScira,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from "@/components/sonojs/open-in-chat"

const sampleQuery = "How can I implement authentication in Next.js?"

export function Example() {
  return (
    <OpenIn query={sampleQuery}>
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInCursor />
        <OpenInT3 />
        <OpenInScira />
        <OpenInv0 />
      </OpenInContent>
    </OpenIn>
  )
}`

export default async function OpenInChatDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Open In Chat"
        pathname="/docs/components/open-in-chat"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A dropdown that opens the same prompt in ChatGPT, Claude, Cursor,
            T3, Scira, or v0 with one click.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="open-in-chat" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="open-in-chat.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "query",
              type: "string",
              description:
                "Prompt text shared with every provider link via context.",
            },
            {
              name: "…DropdownMenu",
              type: "DropdownMenu props",
              description: "`OpenIn` forwards remaining props to `DropdownMenu`.",
            },
            {
              name: "children",
              type: "ReactNode",
              description:
                "Compose `OpenInTrigger`, `OpenInContent`, and provider items.",
            },
          ]}
        />
      </section>
    </article>
  )
}
