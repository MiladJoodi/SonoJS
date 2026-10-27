import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BentoGrid01 from "@/registry/blocks/marketing/bento-grid/bento-grid-01/bento-grid"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/bento-grid",
  "Bento Grid",
  "Ready-to-use Bento Grid UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import BentoGrid from "@/components/blocks/marketing/${name}/bento-grid"

export default function Page() {
  return <BentoGrid />
}`

export default function BlockBentoGridDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Bento Grid"
        pathname="/blocks/marketing/bento-grid"
        description="Asymmetric feature grids with chart, security, regions, and deploy status cards."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="bento-grid-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("bento-grid-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <BentoGrid01 />
        </BlockExample>
      </div>
    </article>
  )
}
