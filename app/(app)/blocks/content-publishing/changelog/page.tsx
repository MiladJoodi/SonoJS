import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Changelog01 from "@/registry/blocks/content-publishing/changelog/changelog-01/changelog"
import Changelog02 from "@/registry/blocks/content-publishing/changelog/changelog-02/changelog"
import Changelog03 from "@/registry/blocks/content-publishing/changelog/changelog-03/changelog"
import Changelog04 from "@/registry/blocks/content-publishing/changelog/changelog-04/changelog"
import Changelog05 from "@/registry/blocks/content-publishing/changelog/changelog-05/changelog"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/content-publishing/changelog",
  "Changelog",
  "Ready-to-use Changelog UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Changelog from "@/components/blocks/content-publishing/${name}/changelog"

export default function Page() {
  return <Changelog />
}`

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

const examples = [
  { name: "changelog-01", Component: Changelog01 },
  { name: "changelog-02", Component: Changelog02 },
  { name: "changelog-03", Component: Changelog03 },
  { name: "changelog-04", Component: Changelog04 },
  { name: "changelog-05", Component: Changelog05 },
] as const

export default function BlockChangelogDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Changelog"
        pathname="/blocks/content-publishing/changelog"
        description="Five release layouts — classic timeline, product feed, featured latest, magazine grid, and accordion version history."
      />

      <div className="flex flex-col gap-8">
        {examples.map(({ name, Component }, i) => (
          <div key={name} className="flex flex-col gap-8">
            {i > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={name}
              usage={[{ title: "app/page.tsx", code: usage(name) }]}
              previewAlign="start"
              previewClassName="bg-white p-0 dark:bg-background"
            >
              <Component />
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
