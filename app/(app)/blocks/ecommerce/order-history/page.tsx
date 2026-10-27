import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import OrderHistory01 from "@/registry/blocks/ecommerce/order-history/order-history-01/order-history"
import OrderHistory02 from "@/registry/blocks/ecommerce/order-history/order-history-02/order-history"
import OrderHistory03 from "@/registry/blocks/ecommerce/order-history/order-history-03/order-history"
import OrderHistory04 from "@/registry/blocks/ecommerce/order-history/order-history-04/order-history"
import OrderHistory05 from "@/registry/blocks/ecommerce/order-history/order-history-05/order-history"
import OrderHistory06 from "@/registry/blocks/ecommerce/order-history/order-history-06/order-history"
import OrderHistory07 from "@/registry/blocks/ecommerce/order-history/order-history-07/order-history"
import OrderHistory08 from "@/registry/blocks/ecommerce/order-history/order-history-08/order-history"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/order-history",
  "Order History",
  "Ready-to-use Order History UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import OrderHistory from "@/components/blocks/ecommerce/${name}/order-history"

export default function Page() {
  return <OrderHistory />
}`

export default function BlockOrderHistoryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Order History"
        pathname="/blocks/ecommerce/order-history"
        description="Eight distinct production shells — timeline, action cards, shipment board, invoice groups, console table, ops ledger, delivery dossier, and merchant command center."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="order-history-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory01 />
        </BlockExample>

        <BlockExample
          name="order-history-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderHistory02 />
        </BlockExample>

        <BlockExample
          name="order-history-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory03 />
        </BlockExample>

        <BlockExample
          name="order-history-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderHistory04 />
        </BlockExample>

        <BlockExample
          name="order-history-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory05 />
        </BlockExample>

        <BlockExample
          name="order-history-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory06 />
        </BlockExample>

        <BlockExample
          name="order-history-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory07 />
        </BlockExample>

        <BlockExample
          name="order-history-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-history-08"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderHistory08 />
        </BlockExample>
      </div>
    </article>
  )
}
