import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ReadingProgress01 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-01/reading-progress"
import ReadingProgress02 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-02/reading-progress"
import ReadingProgress03 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-03/reading-progress"
import ReadingProgress04 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-04/reading-progress"
import ReadingProgress05 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-05/reading-progress"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/content-publishing/reading-progress",
  "Reading Progress",
  "Ready-to-use Reading Progress UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ReadingProgress from "@/components/blocks/content-publishing/${name}/reading-progress"

export default function Page() {
  return <ReadingProgress />
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
  { name: "reading-progress-01", Component: ReadingProgress01 },
  { name: "reading-progress-02", Component: ReadingProgress02 },
  { name: "reading-progress-03", Component: ReadingProgress03 },
  { name: "reading-progress-04", Component: ReadingProgress04 },
  { name: "reading-progress-05", Component: ReadingProgress05 },
] as const

export default function BlockReadingProgressDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Reading Progress"
        pathname="/blocks/content-publishing/reading-progress"
        description="Five reading chrome layouts — sticky bar, circular FAB, chapter sync, bottom dock, and minimal percent pill."
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
