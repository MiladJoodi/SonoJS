import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SearchResults01 from "@/registry/blocks/search-filtering/search-results/search-results-01/search-results"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/search-filtering/search-results",
  "Search Results",
  "Ready-to-use Search Results UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import SearchResults from "@/components/blocks/search-filtering/${name}/search-results"

export default function Page() {
  return <SearchResults />
}`

export default function BlockSearchResultsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Search Results"
        pathname="/blocks/search-filtering/search-results"
        description="Full-page results with search bar, type filters, sort, pagination, and empty state."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="search-results-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("search-results-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <SearchResults01 />
        </BlockExample>
      </div>
    </article>
  )
}
