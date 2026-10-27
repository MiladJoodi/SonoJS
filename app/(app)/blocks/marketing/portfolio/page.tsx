import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Portfolio01 from "@/registry/blocks/marketing/portfolio/portfolio-01/portfolio"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/marketing/portfolio",
  "Portfolio",
  "Ready-to-use Portfolio UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Portfolio from "@/components/blocks/marketing/${name}/portfolio"

export default function Page() {
  return <Portfolio />
}`

export default function BlockPortfolioDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Portfolio"
        pathname="/blocks/marketing/portfolio"
        description="Filtered project grid with local covers, testimonials, and a closing CTA — tuned for marketing sites."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="portfolio-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("portfolio-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Portfolio01 />
        </BlockExample>
      </div>
    </article>
  )
}
