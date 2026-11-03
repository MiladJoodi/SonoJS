import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("file-diff", "File Diff")

const exampleDefs = [
  {
    name: "file-diff-default",
    title: "Streaming",
    description:
      "Lines stream in while `status=\"streaming\"`, then settle to complete. Replay remounts the cycle.",
    requires: ["agent-code", "agent-disclosure"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
  {
    name: "file-diff-complete",
    title: "Complete",
    description:
      "A finished diff with copy support and `collapseOnComplete={false}`.",
    requires: ["agent-code", "agent-disclosure"],
    npmRequires: ["lucide-react", "motion", "shiki"],
  },
]

const usageSource = `import { FileDiff } from "@/components/sonojs/file-diff"

export function Example() {
  return (
    <FileDiff
      file="src/app.ts"
      status="complete"
      lines={[
        { id: "1", type: "removed", oldLine: 1, content: "const x = 1" },
        { id: "2", type: "added", newLine: 1, content: "const x = 2" },
      ]}
      copyText="- const x = 1\\n+ const x = 2"
    />
  )
}`

export default async function FileDiffDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="File Diff"
        pathname="/docs/components/file-diff"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A collapsible code diff that shows added and removed lines —
            streaming apply state, syntax tokens via{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[0.85em]">
              agent-code
            </code>
            , and optional copy.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="file-diff" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="file-diff.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "file",
              type: "ReactNode",
              defaultValue: "—",
              description: "Filename shown in the disclosure trigger.",
            },
            {
              name: "lines",
              type: "FileDiffLine[]",
              defaultValue: "—",
              description: "Diff rows with type, line numbers, and content.",
            },
            {
              name: "status",
              type: '"streaming" | "complete"',
              defaultValue: '"streaming"',
              description: "Spinner while applying; check when complete.",
            },
            {
              name: "open / defaultOpen",
              type: "boolean",
              defaultValue: "true",
              description: "Controlled or uncontrolled open state.",
            },
            {
              name: "collapseOnComplete",
              type: "boolean",
              defaultValue: "true",
              description: "Auto-collapses when streaming finishes.",
            },
            {
              name: "language",
              type: "AgentCodeLanguage",
              defaultValue: '"typescript"',
              description: "Highlighter language for line tokens.",
            },
            {
              name: "copyText / onCopy",
              type: "string / () => void",
              defaultValue: "—",
              description: "Enables the copy control in the panel footer.",
            },
            {
              name: "maxHeight",
              type: "number",
              defaultValue: "220",
              description: "Scroll viewport max height in pixels.",
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
