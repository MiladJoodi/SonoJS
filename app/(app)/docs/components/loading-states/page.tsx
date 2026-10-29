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
  "loading-states",
  "Loading States"
)

const exampleDefs = [
  {
    name: "loading-states-drive",
    title: "Drive",
    description: 'Chevron pixel wave — `variant="drive"` (default).',
  },
  {
    name: "loading-states-dots",
    title: "Dots",
    description: 'Same pattern with circular pixels — `variant="dots"`.',
  },
  {
    name: "loading-states-orbit",
    title: "Orbit",
    description: 'Perimeter chase around the center cell — `variant="orbit"`.',
  },
]

const usageSource = `import { LoadingState } from "@/components/sonojs/loading-states"

export function Example() {
  return (
    <LoadingState
      variant="drive"
      label="Working"
      showElapsed
    />
  )
}`

export default async function LoadingStatesDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Loading States"
        pathname="/docs/components/loading-states"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Animated loading states for waiting while an AI agent works — pixel
            grid, shimmer label, optional elapsed timer.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="loading-states" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="loading-states.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "label",
              type: "string",
              defaultValue: '"Working"',
              description: "Work message (shimmer) announced to assistive tech.",
            },
            {
              name: "variant",
              type: '"drive" | "dots" | "orbit"',
              defaultValue: '"drive"',
              description: "Pixel grid animation treatment.",
            },
            {
              name: "showElapsed",
              type: "boolean",
              defaultValue: "true",
              description: "Show the elapsed duration beside the label.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
