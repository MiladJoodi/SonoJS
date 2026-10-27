import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Invoice01 from "@/registry/blocks/payments-billing/invoice/invoice-01/invoice"

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

export default function BlockInvoiceDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Invoice"
        pathname="/blocks/payments-billing/invoice"
        description="Printable invoice with line items, totals, payment receipt, and export actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="invoice-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("invoice-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Invoice01 />
        </BlockExample>
      </div>
    </article>
  )
}
