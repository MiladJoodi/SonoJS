import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AdvancedFilters01 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-01/advanced-filters"
import AdvancedFilters02 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-02/advanced-filters"
import AdvancedFilters03 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-03/advanced-filters"
import AdvancedFilters04 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-04/advanced-filters"
import AdvancedFilters05 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-05/advanced-filters"
import AdvancedFilters06 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-06/advanced-filters"
import AdvancedFilters07 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-07/advanced-filters"
import AdvancedFilters08 from "@/registry/blocks/data-tables/advanced-filters/advanced-filters-08/advanced-filters"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/data-tables/advanced-filters",
  "Advanced Filters",
  "Ready-to-use Advanced Filters UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AdvancedFilters from "@/components/blocks/data-tables/${name}/advanced-filters"

export default function Page() {
  return <AdvancedFilters />
}`

const previewClassName =
  "bg-canvas px-3 py-8 sm:px-10 sm:py-12"

export default function BlockAdvancedFiltersDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Advanced Filters"
        pathname="/blocks/data-tables/advanced-filters"
        description="Production-ready facet patterns — brand pickers, smart commerce, SEO consoles, rule builders, status pipelines, and range ladders."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="advanced-filters-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-01"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters01 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-02"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters02 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-03"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters03 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-04"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters04 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-05"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters05 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-06"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters06 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-07"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters07 />
          </div>
        </BlockExample>

        <BlockExample
          name="advanced-filters-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("advanced-filters-08"),
            },
          ]}
          previewClassName={previewClassName}
        >
          <div className="flex w-full min-w-0 justify-center overflow-x-auto">
            <AdvancedFilters08 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
