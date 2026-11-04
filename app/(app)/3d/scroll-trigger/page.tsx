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
  title: "Scroll Trigger",
  description:
    "Infinite horizontal rows whose speed reacts to page scroll velocity. Install with the SonoJS CLI.",
  path: "/3d/scroll-trigger",
})

const exampleDefs = [
  {
    name: "scroll-trigger-default",
    title: "Default",
    description:
      "Three review rows: scroll the page to speed them up. Opposite `direction` values cross traffic.",
  },
]

const usage = `"use client"

import {
  ScrollTriggerContainer,
  ScrollTriggerRow,
} from "@/components/3d/scroll-trigger"

export default function Page() {
  return (
    <ScrollTriggerContainer className="w-full">
      <ScrollTriggerRow baseVelocity={5} direction={1}>
        <div className="mx-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          Item 1
        </div>
        <div className="mx-4 rounded-lg bg-muted px-4 py-2">Item 2</div>
        <div className="mx-4 rounded-lg bg-muted px-4 py-2">Item 3</div>
      </ScrollTriggerRow>
    </ScrollTriggerContainer>
  )
}`

export default async function ScrollTriggerDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Scroll Trigger"
        pathname="/3d/scroll-trigger"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Horizontal infinite rows powered by{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              motion
            </code>
            . Base speed plus page-scroll velocity. Pauses when offscreen,
            hidden, or when the user prefers reduced motion. Wrap rows in{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              ScrollTriggerContainer
            </code>{" "}
            so they share one scroll signal.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="scroll-trigger" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <h3 className="text-h4">ScrollTriggerContainer</h3>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "ReactNode",
              description: "Usually one or more `ScrollTriggerRow` elements.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer wrapper.",
            },
          ]}
        />
        <h3 className="text-h4">ScrollTriggerRow</h3>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "ReactNode",
              description:
                "Items in the row. Duplicated automatically for a seamless loop.",
            },
            {
              name: "baseVelocity",
              type: "number",
              defaultValue: "5",
              description:
                "Base speed as a percent of one content block width per second.",
            },
            {
              name: "direction",
              type: "1 | -1",
              defaultValue: "1",
              description: "Travel direction along the row.",
            },
            {
              name: "scrollReactivity",
              type: "boolean",
              defaultValue: "true",
              description: "When false, ignore page-scroll speed boost.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the row overflow wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
