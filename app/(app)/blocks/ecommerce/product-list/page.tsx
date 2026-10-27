import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductList01 from "@/registry/blocks/ecommerce/product-list/product-list-01/product-list"
import ProductList02 from "@/registry/blocks/ecommerce/product-list/product-list-02/product-list"
import ProductList03 from "@/registry/blocks/ecommerce/product-list/product-list-03/product-list"
import ProductList04 from "@/registry/blocks/ecommerce/product-list/product-list-04/product-list"
import ProductList05 from "@/registry/blocks/ecommerce/product-list/product-list-05/product-list"
import ProductList06 from "@/registry/blocks/ecommerce/product-list/product-list-06/product-list"
import ProductList07 from "@/registry/blocks/ecommerce/product-list/product-list-07/product-list"
import ProductList08 from "@/registry/blocks/ecommerce/product-list/product-list-08/product-list"
import ProductList09 from "@/registry/blocks/ecommerce/product-list/product-list-09/product-list"
import ProductList10 from "@/registry/blocks/ecommerce/product-list/product-list-10/product-list"
import ProductList11 from "@/registry/blocks/ecommerce/product-list/product-list-11/product-list"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/ecommerce/product-list", "Product List", "Ready-to-use Product List UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) =>
  `import ProductList from "@/components/blocks/ecommerce/${name}/product-list"

export default function Page() {
  return <ProductList />
}`

export default function BlockProductListDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product List"
        pathname="/blocks/ecommerce/product-list"
        description="Eleven production catalog shells — lookbook, spec desk, runway rail, atelier sale, cover stories, apothecary, pharmacy shelf, spotlights, ranked ticker, concierge rows, and museum pedestals."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-list-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList01 />
        </BlockExample>

        <BlockExample
          name="product-list-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList02 />
        </BlockExample>

        <BlockExample
          name="product-list-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList03 />
        </BlockExample>

        <BlockExample
          name="product-list-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList04 />
        </BlockExample>

        <BlockExample
          name="product-list-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList05 />
        </BlockExample>

        <BlockExample
          name="product-list-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList06 />
        </BlockExample>

        <BlockExample
          name="product-list-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList07 />
        </BlockExample>

        <BlockExample
          name="product-list-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-08"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList08 />
        </BlockExample>

        <BlockExample
          name="product-list-09"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-09"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList09 />
        </BlockExample>

        <BlockExample
          name="product-list-10"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-10"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList10 />
        </BlockExample>

        <BlockExample
          name="product-list-11"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-list-11"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ProductList11 />
        </BlockExample>
      </div>
    </article>
  )
}
