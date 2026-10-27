import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import PaymentMethods01 from "@/registry/blocks/payments-billing/payment-methods/payment-methods-01/payment-methods"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/payment-methods",
  "Payment Methods",
  "Ready-to-use Payment Methods UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import PaymentMethods from "@/components/blocks/payments-billing/${name}/payment-methods"

export default function Page() {
  return <PaymentMethods />
}`

export default function BlockPaymentMethodsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Payment Methods"
        pathname="/blocks/payments-billing/payment-methods"
        description="Cards and wallets — balances, physical card reveal, freeze/settings actions, and recent activity."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="payment-methods-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-methods-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <PaymentMethods01 />
        </BlockExample>
      </div>
    </article>
  )
}
