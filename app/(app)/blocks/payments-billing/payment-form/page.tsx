import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import PaymentForm01 from "@/registry/blocks/payments-billing/payment-form/payment-form-01/payment-form"
import PaymentForm02 from "@/registry/blocks/payments-billing/payment-form/payment-form-02/payment-form"
import PaymentForm03 from "@/registry/blocks/payments-billing/payment-form/payment-form-03/payment-form"
import PaymentForm04 from "@/registry/blocks/payments-billing/payment-form/payment-form-04/payment-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/payments-billing/payment-form", "Payment Form", "Ready-to-use Payment Form UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import PaymentForm from "@/components/blocks/payments-billing/${name}/payment-form"

export default function Page() {
  return <PaymentForm />
}`

export default function BlockPaymentFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Payment Form"
        pathname="/blocks/payments-billing/payment-form"
        description="Four production checkouts: card terminal, commerce receipt, SaaS upgrade, and editorial subscription."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="payment-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <PaymentForm01 />
        </BlockExample>

        <BlockExample
          name="payment-form-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-form-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <PaymentForm02 />
        </BlockExample>

        <BlockExample
          name="payment-form-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-form-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <PaymentForm03 />
        </BlockExample>

        <BlockExample
          name="payment-form-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("payment-form-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <PaymentForm04 />
        </BlockExample>
      </div>
    </article>
  )
}
