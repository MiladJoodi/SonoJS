import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SearchResults01 from "@/registry/blocks/search-filtering/search-results/search-results-01/search-results"
import SearchResults02 from "@/registry/blocks/search-filtering/search-results/search-results-02/search-results"
import SearchResults03 from "@/registry/blocks/search-filtering/search-results/search-results-03/search-results"
import SearchResults04 from "@/registry/blocks/search-filtering/search-results/search-results-04/search-results"

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

export default function BlockSearchResultsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Search Results"
        pathname="/blocks/search-filtering/search-results"
        description="SERP and directory layouts — knowledge results, product listings, people search, and advanced search with light refine."
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
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <SearchResults01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="search-results-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("search-results-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <SearchResults02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="search-results-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("search-results-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <SearchResults03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="search-results-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("search-results-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <SearchResults04 />
        </BlockExample>
      </div>
    </article>
  )
}
