import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("citations", "Citations")

const exampleDefs = [
  {
    name: "citations-default",
    title: "Inline + disclosure",
    description:
      "Superscript `Citation` links jump to rows in a live `Citations` list. Replay remounts the stream.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "citations-stack",
    title: "Stack + list",
    description:
      "`CitationStack` favicon cluster with a flat `CitationList` — useful under a streaming reply.",
    requires: ["agent-disclosure"],
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import { Citation, Citations } from "@/components/sonojs/citations"

const PREFIX = "answer"

export function Example() {
  return (
    <>
      <p>
        See the MDN notes
        <Citation citationId="mdn" index={1} idPrefix={PREFIX} />.
      </p>
      <Citations
        idPrefix={PREFIX}
        defaultOpen
        citations={[
          {
            id: "mdn",
            title: "Array.prototype.sort()",
            domain: "developer.mozilla.org",
            url: "https://developer.mozilla.org/",
          },
        ]}
      />
    </>
  )
}`

export default async function CitationsDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Citations"
        pathname="/docs/components/citations"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Collapsible citations for linked sources in AI responses —
            inline markers, favicon stacks, and an animated source list.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="citations" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="citations.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "citations",
              type: "CitationItem[]",
              defaultValue: "—",
              description: "Source rows with id, title, optional domain/url.",
            },
            {
              name: "title",
              type: "ReactNode",
              defaultValue: '"Sources"',
              description: "Disclosure trigger label.",
            },
            {
              name: "open / defaultOpen",
              type: "boolean",
              defaultValue: "false",
              description: "Controlled or uncontrolled open state.",
            },
            {
              name: "idPrefix",
              type: "string",
              defaultValue: "auto",
              description:
                "Shared prefix for `Citation` anchors and list row ids.",
            },
            {
              name: "Citation index / citationId",
              type: "number / string",
              defaultValue: "—",
              description: "Inline superscript link into the list.",
            },
            {
              name: "CitationStack limit",
              type: "number",
              defaultValue: "3",
              description: "Max favicons in the overlapping stack.",
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
