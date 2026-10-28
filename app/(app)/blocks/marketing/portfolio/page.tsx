import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Portfolio01 from "@/registry/blocks/marketing/portfolio/portfolio-01/portfolio"
import Portfolio02 from "@/registry/blocks/marketing/portfolio/portfolio-02/portfolio"
import Portfolio03 from "@/registry/blocks/marketing/portfolio/portfolio-03/portfolio"
import Portfolio04 from "@/registry/blocks/marketing/portfolio/portfolio-04/portfolio"

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
        description="Featured case, spotlight rail, kinetic studio, and neon showreel — portfolio layouts for marketing sites."
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

        <BlockExample
          name="portfolio-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("portfolio-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Portfolio02 />
        </BlockExample>

        <BlockExample
          name="portfolio-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("portfolio-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="p-0"
        >
          <Portfolio03 />
        </BlockExample>

        <BlockExample
          name="portfolio-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("portfolio-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="p-0"
        >
          <Portfolio04 />
        </BlockExample>
      </div>
    </article>
  )
}
