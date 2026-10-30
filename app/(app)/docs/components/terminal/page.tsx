import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("terminal", "Terminal")

const exampleDefs = [
  {
    name: "terminal-default",
    title: "Streaming",
    description:
      "ANSI-colored build output streams in while `isStreaming` is true. Copy and clear sit in the header.",
    requires: ["button", "spinner"],
    npmRequires: ["ansi-to-react", "lucide-react"],
  },
  {
    name: "terminal-complete",
    title: "Complete",
    description: "Finished output with `isStreaming={false}` — no caret or status.",
    requires: ["button", "spinner"],
    npmRequires: ["ansi-to-react", "lucide-react"],
  },
]

const usageSource = `import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalStatus,
  TerminalTitle,
} from "@/components/sonojs/terminal"

export function Example() {
  return (
    <Terminal output="$ npm run build\\n✓ Done" isStreaming={false}>
      <TerminalHeader>
        <TerminalTitle>Build Output</TerminalTitle>
        <div className="flex items-center gap-1">
          <TerminalStatus />
          <TerminalActions>
            <TerminalCopyButton />
            <TerminalClearButton />
          </TerminalActions>
        </div>
      </TerminalHeader>
      <TerminalContent />
    </Terminal>
  )
}`

export default async function TerminalDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Terminal"
        pathname="/docs/components/terminal"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A streaming terminal surface for ANSI build and agent logs — copy,
            clear, and an optional streaming caret.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="terminal" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="terminal.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "output",
              type: "string",
              description: "Full terminal text (ANSI escapes supported).",
            },
            {
              name: "isStreaming",
              type: "boolean",
              defaultValue: "false",
              description: "Shows status + caret while true.",
            },
            {
              name: "autoScroll",
              type: "boolean",
              defaultValue: "true",
              description: "Keep the viewport pinned to the latest line.",
            },
            {
              name: "onClear",
              type: "() => void",
              description: "Enables the clear action in the header.",
            },
            {
              name: "children",
              type: "ReactNode",
              description:
                "Compose `TerminalHeader` / `TerminalContent`, or omit for the default chrome.",
            },
          ]}
        />
      </section>
    </article>
  )
}
