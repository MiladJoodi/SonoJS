import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TransferFunds01 from "@/registry/blocks/payments-billing/transfer-funds/transfer-funds-01/transfer-funds"
import TransferFunds02 from "@/registry/blocks/payments-billing/transfer-funds/transfer-funds-02/transfer-funds"
import TransferFunds03 from "@/registry/blocks/payments-billing/transfer-funds/transfer-funds-03/transfer-funds"

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

export default function BlockTransferFundsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Transfer Funds"
        pathname="/blocks/payments-billing/transfer-funds"
        description="Instant wallet transfer, scheduled/recurring sends, and international wire with FX — three distinct money-movement flows."
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

        <ExampleRule />

        <BlockExample
          name="transfer-funds-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("transfer-funds-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TransferFunds02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="transfer-funds-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("transfer-funds-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TransferFunds03 />
        </BlockExample>
      </div>
    </article>
  )
}
