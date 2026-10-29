import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("code-block", "Code Block")

const exampleDefs = [
  {
    name: "agent-code-block-streaming",
    title: "Streaming",
    description:
      "`status=\"streaming\"` shows Writing and auto-scrolls as tokens arrive. Replay remounts the stream.",
    requires: ["agent-code"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
  {
    name: "agent-code-block-default",
    title: "Ready",
    description:
      "Complete AI code surface with filename, language, line numbers, and copy.",
    requires: ["agent-code"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
]

const usageSource = `import { AgentCodeBlock } from "@/components/sonojs/agent-code-block"

export function Example() {
  return (
    <AgentCodeBlock
      filename="app.ts"
      language="typescript"
      code={\`export const answer = 42\`}
    />
  )
}`

export default async function CodeBlockDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Code Block"
        pathname="/docs/components/code-block"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A syntax-highlighted code block for AI-generated code, with copy
            support — streaming Writing status, line numbers, and highlights.
            Content stays{" "}
            <code className="sono-inline-code">dir=&quot;ltr&quot;</code>.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="agent-code-block" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="agent-code-block.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "code",
              type: "string",
              defaultValue: "—",
              description: "Source text to highlight.",
            },
            {
              name: "language",
              type: "AgentCodeLanguage",
              defaultValue: '"typescript"',
              description: "Highlighter language.",
            },
            {
              name: "filename",
              type: "ReactNode",
              defaultValue: "—",
              description: "Optional filename in the header.",
            },
            {
              name: "status",
              type: '"streaming" | "complete"',
              defaultValue: '"complete"',
              description: "Shows Writing vs Ready in the header.",
            },
            {
              name: "showLineNumbers",
              type: "boolean",
              defaultValue: "true",
              description: "Renders a gutter with line numbers.",
            },
            {
              name: "highlightLines",
              type: "number[]",
              defaultValue: "[]",
              description: "1-based line numbers to tint.",
            },
            {
              name: "maxHeight",
              type: "number",
              defaultValue: "280",
              description: "Scroll viewport max height in pixels.",
            },
            {
              name: "wrap",
              type: "boolean",
              defaultValue: "false",
              description: "Wrap long lines instead of horizontal scroll.",
            },
            {
              name: "copyable",
              type: "boolean",
              defaultValue: "true",
              description: "Shows the copy control in the header.",
            },
            {
              name: "onCopy",
              type: "() => void",
              defaultValue: "—",
              description: "Optional override for the copy action.",
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
