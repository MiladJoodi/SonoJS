import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductFilter01 from "@/registry/blocks/ecommerce/product-filter/product-filter-01/product-filter"
import ProductFilter02 from "@/registry/blocks/ecommerce/product-filter/product-filter-02/product-filter"
import ProductFilter03 from "@/registry/blocks/ecommerce/product-filter/product-filter-03/product-filter"
import ProductFilter04 from "@/registry/blocks/ecommerce/product-filter/product-filter-04/product-filter"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/product-filter",
  "Product Filter",
  "Ready-to-use Product Filter UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProductFilter from "@/components/blocks/ecommerce/${name}/product-filter"

export default function Page() {
  return <ProductFilter />
}`

export default function BlockProductFilterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product Filter"
        pathname="/blocks/ecommerce/product-filter"
        description="Catalog filter rails and drawers — brand search, sizes, price range, color swatches, and apply flows."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-filter-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-filter-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductFilter01 />
        </BlockExample>

        <BlockExample
          name="product-filter-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-filter-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductFilter02 />
        </BlockExample>

        <BlockExample
          name="product-filter-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-filter-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductFilter03 />
        </BlockExample>

        <BlockExample
          name="product-filter-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-filter-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductFilter04 />
        </BlockExample>
      </div>
    </article>
  )
}
