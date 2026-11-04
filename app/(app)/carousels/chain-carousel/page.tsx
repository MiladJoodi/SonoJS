import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Chain Carousel",
  description:
    "Dual-rail icon chain with a searchable center picker and auto-rotate. Install with the SonoJS CLI.",
  path: "/carousels/chain-carousel",
})

const exampleDefs = [
  {
    name: "chain-carousel-default",
    title: "Default",
    description:
      "Mirrored rails auto-advance around a searchable center card. Hover or search pauses rotation; pick a result to jump.",
  },
]

const usage = `"use client"

import { ChainCarousel } from "@/components/carousels/chain-carousel"

export default function Page() {
  return (
    <ChainCarousel
      scrollSpeedMs={1500}
      visibleItemCount={7}
      className="w-full"
    />
  )
}`

export default async function ChainCarouselPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Chain Carousel"
        pathname="/carousels/chain-carousel"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A dual-rail icon chain with a searchable center picker. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              items
            </code>{" "}
            with Lucide icons (or logos). Built with{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="chain-carousel" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Defaults ship nine demo features. Pass your own{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            items
          </code>{" "}
          with{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            id
          </code>
          ,{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            name
          </code>
          ,{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            icon
          </code>
          , and optional{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            details
          </code>{" "}
          /{" "}
          <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
            logo
          </code>
          .
        </p>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "items",
              type: "ChainCarouselItem[]",
              defaultValue: "bundled demos",
              description:
                "Chain entries with Lucide `icon` (or `logo` URL), `name`, and optional `details`.",
            },
            {
              name: "scrollSpeedMs",
              type: "number",
              defaultValue: "1500",
              description: "Auto-advance interval in milliseconds.",
            },
            {
              name: "visibleItemCount",
              type: "number",
              defaultValue: "9",
              description:
                "How many rail cards are visible (even values are bumped to the next odd).",
            },
            {
              name: "onChainSelect",
              type: "(id, name) => void",
              description: "Called when a search result is chosen.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the outer section.",
            },
          ]}
        />
      </section>
    </article>
  )
}
