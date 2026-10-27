import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TransferFunds01 from "@/registry/blocks/payments-billing/transfer-funds/transfer-funds-01/transfer-funds"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/transfer-funds",
  "Transfer Funds",
  "Ready-to-use Transfer Funds UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import TransferFunds from "@/components/blocks/payments-billing/${name}/transfer-funds"

export default function Page() {
  return <TransferFunds />
}`

export default function BlockTransferFundsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Transfer Funds"
        pathname="/blocks/payments-billing/transfer-funds"
        description="Three-step transfer — account details, review summary, and success receipt."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="transfer-funds-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("transfer-funds-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TransferFunds01 />
        </BlockExample>
      </div>
    </article>
  )
}
