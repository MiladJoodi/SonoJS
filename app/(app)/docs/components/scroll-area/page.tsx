import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("scroll-area", "Scroll Area")

const exampleDefs = [
  {
    name: "scroll-area-default",
    title: "Basic",
    description: "A fixed-height region with a styled vertical scrollbar.",
    requires: ["separator"],
  },
  {
    name: "scroll-area-horizontal",
    title: "Horizontal",
    description:
      'Add `ScrollBar` with `orientation="horizontal"` for sideways scroll.',
  },
]

const usageSource = `import { ScrollArea } from "@/components/ui/scroll-area"

export function Example() {
  return (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      Your scrollable content here.
    </ScrollArea>
  )
}`

const compositionSource = `ScrollArea
└── ScrollBar`

export default async function ScrollAreaDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Scroll Area"
        pathname="/docs/components/scroll-area"
        description={
          <p className="leading-relaxed text-muted-foreground">
          Augments native scroll for custom, cross-browser scrollbar styling.
          Vertical bars sit on the inline end and adapt with writing direction.
        </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="scroll-area" />

      <section className="space-y-3">
        <h2 className="text-h3">Composition</h2>
        <ComponentSource
          title="structure"
          lang="tsx"
          code={compositionSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="scroll-area.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description:
                "On `ScrollArea` — size the root (e.g. `h-72 w-48`) so content can overflow.",
            },
            {
              name: "orientation",
              type: '"vertical" | "horizontal"',
              defaultValue: '"vertical"',
              description: "On `ScrollBar` — scrollbar axis.",
            },
            {
              name: "type",
              type: '"auto" | "always" | "scroll" | "hover"',
              defaultValue: '"hover"',
              description:
                "On `ScrollArea` — when the scrollbar is visible (Radix `type`).",
            },
          ]}
        />
      </section>
    </article>
  )
}
