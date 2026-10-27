import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Changelog01 from "@/registry/blocks/content-publishing/changelog/changelog-01/changelog"

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

export default function BlockChangelogDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Changelog"
        pathname="/blocks/content-publishing/changelog"
        description="Version timeline with typed change badges, release cards, and show-older load-more."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="changelog-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("changelog-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Changelog01 />
        </BlockExample>
      </div>
    </article>
  )
}
