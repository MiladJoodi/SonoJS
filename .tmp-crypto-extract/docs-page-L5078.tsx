import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import CryptoPortfolio01 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-01/crypto-portfolio"
import CryptoPortfolio02 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-02/crypto-portfolio"
import CryptoPortfolio03 from "@/registry/blocks/dashboards-analytics/crypto-portfolio/crypto-portfolio-03/crypto-portfolio"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/dashboards-analytics/crypto-portfolio",
  "Crypto Portfolio",
  "Ready-to-use Crypto Portfolio UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import CryptoPortfolio from "@/components/blocks/dashboards-analytics/${name}/crypto-portfolio"

export default function Page() {
  return <CryptoPortfolio />
}`

export default function BlockCryptoPortfolioDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Crypto Portfolio"
        pathname="/blocks/dashboards-analytics/crypto-portfolio"
        description="Clean balance overview, a dark trading desk, or live Recharts area markets."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="crypto-portfolio-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crypto-portfolio-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <CryptoPortfolio01 />
        </BlockExample>

        <BlockExample
          name="crypto-portfolio-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crypto-portfolio-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-[#05070d] p-0"
        >
          <CryptoPortfolio02 />
        </BlockExample>

        <BlockExample
          name="crypto-portfolio-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("crypto-portfolio-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-[#05070d] p-0"
        >
          <CryptoPortfolio03 />
        </BlockExample>
      </div>
    </article>
  )
}
