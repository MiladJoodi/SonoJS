import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import OrderTracking01 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-01/order-tracking"
import OrderTracking02 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-02/order-tracking"
import OrderTracking03 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-03/order-tracking"
import OrderTracking04 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-04/order-tracking"
import OrderTracking05 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-05/order-tracking"
import OrderTracking06 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-06/order-tracking"
import OrderTracking07 from "@/registry/blocks/ecommerce/order-tracking/order-tracking-07/order-tracking"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/order-tracking",
  "Order Tracking",
  "Ready-to-use Order Tracking UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import OrderTracking from "@/components/blocks/ecommerce/${name}/order-tracking"

export default function Page() {
  return <OrderTracking />
}`

export default function BlockOrderTrackingDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Order Tracking"
        pathname="/blocks/ecommerce/order-tracking"
        description="Shipment tracking layouts — status rails, vertical timelines, delivery details, and billing."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="order-tracking-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking01 />
        </BlockExample>

        <BlockExample
          name="order-tracking-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking02 />
        </BlockExample>

        <BlockExample
          name="order-tracking-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking03 />
        </BlockExample>

        <BlockExample
          name="order-tracking-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking04 />
        </BlockExample>

        <BlockExample
          name="order-tracking-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking05 />
        </BlockExample>

        <BlockExample
          name="order-tracking-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking06 />
        </BlockExample>

        <BlockExample
          name="order-tracking-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-tracking-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <OrderTracking07 />
        </BlockExample>
      </div>
    </article>
  )
}
