import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import PaymentMethods01 from "@/registry/blocks/payments-billing/payment-methods/payment-methods-01/payment-methods"
import PaymentMethods02 from "@/registry/blocks/payments-billing/payment-methods/payment-methods-02/payment-methods"
import PaymentMethods03 from "@/registry/blocks/payments-billing/payment-methods/payment-methods-03/payment-methods"

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

export default function BlockPaymentMethodsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Payment Methods"
        pathname="/blocks/payments-billing/payment-methods"
        description="Cards & wallets dashboard, saved methods manager, and add-card dialog."
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
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <PaymentMethods01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="payment-methods-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-methods-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <PaymentMethods02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="payment-methods-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-methods-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <PaymentMethods03 />
        </BlockExample>
      </div>
    </article>
  )
}
