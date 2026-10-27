import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ShoppingCart01 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-01/shopping-cart"
import ShoppingCart02 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-02/shopping-cart"
import ShoppingCart03 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-03/shopping-cart"
import ShoppingCart04 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-04/shopping-cart"
import ShoppingCart05 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-05/shopping-cart"
import ShoppingCart06 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-06/shopping-cart"
import ShoppingCart07 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-07/shopping-cart"
import ShoppingCart08 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-08/shopping-cart"
import ShoppingCart09 from "@/registry/blocks/ecommerce/shopping-cart/shopping-cart-09/shopping-cart"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/ecommerce/shopping-cart", "Shopping Cart", "Ready-to-use Shopping Cart UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import ShoppingCart from "@/components/blocks/ecommerce/${name}/shopping-cart"

export default function Page() {
  return <ShoppingCart />
}`

export default function BlockShoppingCartDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Shopping Cart"
        pathname="/blocks/ecommerce/shopping-cart"
        description="Nine production cart patterns — classic bag, split rail, product cards, device configs, beauty table, sale fashion, modal, drawer, and spreadsheet — each with a distinct layout."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="shopping-cart-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart01 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart02 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart03 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart04 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart05 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart06 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart07 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-08"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart08 />
        </BlockExample>

        <BlockExample
          name="shopping-cart-09"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("shopping-cart-09"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ShoppingCart09 />
        </BlockExample>
      </div>
    </article>
  )
}
