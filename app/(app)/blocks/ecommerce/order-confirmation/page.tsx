import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import OrderConfirmation01 from "@/registry/blocks/ecommerce/order-confirmation/order-confirmation-01/order-confirmation"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/order-confirmation",
  "Order Confirmation",
  "Ready-to-use Order Confirmation UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import OrderConfirmation from "@/components/blocks/ecommerce/${name}/order-confirmation"

export default function Page() {
  return <OrderConfirmation />
}`

export default function BlockOrderConfirmationDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Order Confirmation"
        pathname="/blocks/ecommerce/order-confirmation"
        description="Post-checkout success page with delivery timeline, shipping and payment details, and order totals."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="order-confirmation-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("order-confirmation-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <OrderConfirmation01 />
        </BlockExample>
      </div>
    </article>
  )
}
