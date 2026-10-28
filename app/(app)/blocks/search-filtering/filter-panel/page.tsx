import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FilterPanel01 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-01/filter-panel"
import FilterPanel02 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-02/filter-panel"
import FilterPanel03 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-03/filter-panel"
import FilterPanel04 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-04/filter-panel"
import FilterPanel05 from "@/registry/blocks/search-filtering/filter-panel/filter-panel-05/filter-panel"

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

const WHITE_STAGE = "bg-white p-0 dark:bg-background"

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

export default function BlockFilterPanelDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Filter Panel"
        pathname="/blocks/search-filtering/filter-panel"
        description="Standalone filter patterns — report builders, accordion facets, table toolbars, chip + sheet, and domain filter sidebars."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="filter-panel-01"
          usage={[{ title: "app/page.tsx", code: usage("filter-panel-01") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FilterPanel01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="filter-panel-02"
          usage={[{ title: "app/page.tsx", code: usage("filter-panel-02") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FilterPanel02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="filter-panel-03"
          usage={[{ title: "app/page.tsx", code: usage("filter-panel-03") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FilterPanel03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="filter-panel-04"
          usage={[{ title: "app/page.tsx", code: usage("filter-panel-04") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FilterPanel04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="filter-panel-05"
          usage={[{ title: "app/page.tsx", code: usage("filter-panel-05") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FilterPanel05 />
        </BlockExample>
      </div>
    </article>
  )
}
