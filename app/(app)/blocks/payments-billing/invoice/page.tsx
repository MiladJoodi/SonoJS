import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Invoice01 from "@/registry/blocks/payments-billing/invoice/invoice-01/invoice"
import Invoice02 from "@/registry/blocks/payments-billing/invoice/invoice-02/invoice"
import Invoice03 from "@/registry/blocks/payments-billing/invoice/invoice-03/invoice"
import Invoice04 from "@/registry/blocks/payments-billing/invoice/invoice-04/invoice"
import Invoice05 from "@/registry/blocks/payments-billing/invoice/invoice-05/invoice"
import Invoice06 from "@/registry/blocks/payments-billing/invoice/invoice-06/invoice"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/invoice",
  "Invoice",
  "Ready-to-use Invoice UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Invoice from "@/components/blocks/payments-billing/${name}/invoice"

export default function Page() {
  return <Invoice />
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

export default function BlockInvoiceDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Invoice"
        pathname="/blocks/payments-billing/invoice"
        description="EU / Stripe-grade VAT documents — paid classic, open SEPA, reverse-charge B2B, compact receipt, signed & stamped, and wide multi-rate statement."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="invoice-01"
          usage={[{ title: "app/page.tsx", code: usage("invoice-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="invoice-02"
          usage={[{ title: "app/page.tsx", code: usage("invoice-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="invoice-03"
          usage={[{ title: "app/page.tsx", code: usage("invoice-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="invoice-04"
          usage={[{ title: "app/page.tsx", code: usage("invoice-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="invoice-05"
          usage={[{ title: "app/page.tsx", code: usage("invoice-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="invoice-06"
          usage={[{ title: "app/page.tsx", code: usage("invoice-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice06 />
        </BlockExample>
      </div>
    </article>
  )
}
