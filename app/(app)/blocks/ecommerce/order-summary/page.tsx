import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import OrderSummary01 from "@/registry/blocks/ecommerce/order-summary/order-summary-01/order-summary"
import OrderSummary02 from "@/registry/blocks/ecommerce/order-summary/order-summary-02/order-summary"
import OrderSummary03 from "@/registry/blocks/ecommerce/order-summary/order-summary-03/order-summary"
import OrderSummary04 from "@/registry/blocks/ecommerce/order-summary/order-summary-04/order-summary"
import OrderSummary05 from "@/registry/blocks/ecommerce/order-summary/order-summary-05/order-summary"
import OrderSummary06 from "@/registry/blocks/ecommerce/order-summary/order-summary-06/order-summary"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/ecommerce/order-summary", "Order Summary", "Ready-to-use Order Summary UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import OrderSummary from "@/components/blocks/ecommerce/${name}/order-summary"

export default function Page() {
  return <OrderSummary />
}`

export default function BlockOrderSummaryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Order Summary"
        pathname="/blocks/ecommerce/order-summary"
        description="Six production shells—boutique receipt, fulfillment board, commerce success, atelier split, account console, and invoice document."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="order-summary-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary01 />
        </BlockExample>

        <BlockExample
          name="order-summary-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary02 />
        </BlockExample>

        <BlockExample
          name="order-summary-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary03 />
        </BlockExample>

        <BlockExample
          name="order-summary-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary04 />
        </BlockExample>

        <BlockExample
          name="order-summary-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary05 />
        </BlockExample>

        <BlockExample
          name="order-summary-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-summary-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderSummary06 />
        </BlockExample>
      </div>
    </article>
  )
}
