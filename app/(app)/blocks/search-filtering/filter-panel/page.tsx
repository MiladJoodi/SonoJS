import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FilterPanel01 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-01/filter-panel"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/search-filtering/filter-panel",
  "Filter Panel",
  "Ready-to-use Filter Panel UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import FilterPanel from "@/components/blocks/search-filtering/${name}/filter-panel"

export default function Page() {
  return <FilterPanel />
}`

export default function BlockFilterPanelDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Filter Panel"
        pathname="/blocks/search-filtering/filter-panel"
        description="Report filters — date range, multi-select dimensions, numeric sliders, and saved presets."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="filter-panel-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("filter-panel-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <FilterPanel01 />
        </BlockExample>
      </div>
    </article>
  )
}
