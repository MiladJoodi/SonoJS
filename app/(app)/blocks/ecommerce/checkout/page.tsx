import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Checkout01 from "@/registry/blocks/ecommerce/checkout/checkout-01/checkout"
import Checkout02 from "@/registry/blocks/ecommerce/checkout/checkout-02/checkout"
import Checkout03 from "@/registry/blocks/ecommerce/checkout/checkout-03/checkout"
import Checkout04 from "@/registry/blocks/ecommerce/checkout/checkout-04/checkout"
import Checkout05 from "@/registry/blocks/ecommerce/checkout/checkout-05/checkout"
import Checkout06 from "@/registry/blocks/ecommerce/checkout/checkout-06/checkout"
import Checkout07 from "@/registry/blocks/ecommerce/checkout/checkout-07/checkout"
import Checkout08 from "@/registry/blocks/ecommerce/checkout/checkout-08/checkout"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/ecommerce/checkout", "Checkout", "Ready-to-use Checkout UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import Checkout from "@/components/blocks/ecommerce/${name}/checkout"

export default function Page() {
  return <Checkout />
}`

export default function BlockCheckoutDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Checkout"
        pathname="/blocks/ecommerce/checkout"
        description="Eight checkout layouts — fixed sidebar, two-column, stepper, payment form, vertical fields, one column, modal, and drawer."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="checkout-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout01 />
        </BlockExample>

        <BlockExample
          name="checkout-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout02 />
        </BlockExample>

        <BlockExample
          name="checkout-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout03 />
        </BlockExample>

        <BlockExample
          name="checkout-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout04 />
        </BlockExample>

        <BlockExample
          name="checkout-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout05 />
        </BlockExample>

        <BlockExample
          name="checkout-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Checkout06 />
        </BlockExample>

        <BlockExample
          name="checkout-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-07"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Checkout07 />
        </BlockExample>

        <BlockExample
          name="checkout-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("checkout-08"),
            },
          ]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Checkout08 />
        </BlockExample>
      </div>
    </article>
  )
}
