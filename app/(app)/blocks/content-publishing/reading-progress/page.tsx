import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ReadingProgress01 from "@/registry/blocks/content-publishing/reading-progress/reading-progress-01/reading-progress"

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

export default function BlockReadingProgressDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Reading Progress"
        pathname="/blocks/content-publishing/reading-progress"
        description="Sticky primary reading bar, share actions, back-to-top, and an inline progress card on a long article."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="reading-progress-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("reading-progress-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ReadingProgress01 />
        </BlockExample>
      </div>
    </article>
  )
}
