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
  "streaming-response",
  "Streaming Response"
)

const exampleDefs = [
  {
    name: "streaming-response-default",
    title: "Streaming",
    description:
      "Tokens stream in while `status=\"streaming\"`, then actions and sources appear. Replay remounts.",
    requires: ["agent-disclosure", "citations"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "streaming-response-complete",
    title: "Complete",
    description:
      "Copy, feedback, and a sources disclosure with `CitationStack` / `CitationList`.",
    requires: ["agent-disclosure", "citations"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { StreamingResponse } from "@/components/sonojs/streaming-response"

export function Example() {
  return (
    <StreamingResponse
      status="complete"
      copyText="Hello from Sono"
      sources={[
        {
          id: "docs",
          title: "SonoJS Docs",
          domain: "sonojs.com",
          url: "https://sonojs.com",
        },
      ]}
    >
      <p>Hello from Sono</p>
    </StreamingResponse>
  )
}`

export default async function StreamingResponseDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Streaming Response"
        pathname="/docs/components/streaming-response"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A streaming AI response surface with sources and feedback actions —
            copy, retry, thumbs, and a citations disclosure via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[0.85em]">
              agent-disclosure
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="streaming-response" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="streaming-response.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "—",
              description: "Response body (text or rendered markdown).",
            },
            {
              name: "status",
              type: '"streaming" | "complete" | "error"',
              defaultValue: '"streaming"',
              description: "Controls busy state and when actions appear.",
            },
            {
              name: "copyText / onCopy",
              type: "string / () => void",
              defaultValue: "—",
              description: "Enables the copy action.",
            },
            {
              name: "onRetry",
              type: "() => void",
              defaultValue: "—",
              description: "Shows a retry control when provided.",
            },
            {
              name: "sources",
              type: "CitationItem[]",
              defaultValue: "[]",
              description: "Optional footer sources stack + list.",
            },
            {
              name: "feedback / onFeedbackChange",
              type: '"up" | "down" | null',
              defaultValue: "null",
              description: "Thumbs up/down after complete.",
            },
            {
              name: "showActions",
              type: "boolean",
              defaultValue: "true",
              description: "Hide the action row without changing status.",
            },
            {
              name: "announce",
              type: "boolean",
              defaultValue: "true",
              description: "aria-live polite on the content region.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Optional class names on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
