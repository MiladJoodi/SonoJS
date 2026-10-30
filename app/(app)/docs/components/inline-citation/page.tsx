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
  "inline-citation",
  "Inline Citation"
)

const exampleDefs = [
  {
    name: "inline-citation-default",
    title: "Default",
    description:
      "Hover the citation pill to browse sources in a carousel with title, URL, and description.",
  },
]

const usageSource = `import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationSource,
  InlineCitationText,
} from "@/components/sonojs/inline-citation"

export function Example() {
  return (
    <p>
      AI keeps improving.{" "}
      <InlineCitation>
        <InlineCitationText>
          New breakthroughs are announced regularly
        </InlineCitationText>
        <InlineCitationCard>
          <InlineCitationCardTrigger
            sources={["https://example.com/nlp-advances"]}
          />
          <InlineCitationCardBody className="p-4">
            <InlineCitationSource
              title="Advances in NLP"
              url="https://example.com/nlp-advances"
              description="A short summary of the source."
            />
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>
      .
    </p>
  )
}`

export default async function InlineCitationDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Inline Citation"
        pathname="/docs/components/inline-citation"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Hoverable citations inline with text — a pill shows source hostnames,
            and the card carousels full titles, URLs, and quotes.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="inline-citation" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="inline-citation.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "InlineCitationCardTrigger sources",
              type: "string[]",
              description:
                "Source URLs — first hostname is shown, plus `+N` when more exist.",
            },
            {
              name: "InlineCitationSource",
              type: "title? / url? / description?",
              description: "Source metadata inside a carousel slide.",
            },
            {
              name: "InlineCitationQuote",
              type: "blockquote props",
              description: "Optional quoted excerpt with a start-edge border.",
            },
            {
              name: "InlineCitationCarousel*",
              type: "Carousel wrappers",
              description:
                "Prev / next / index wired through a shared Embla API context.",
            },
          ]}
        />
      </section>
    </article>
  )
}
