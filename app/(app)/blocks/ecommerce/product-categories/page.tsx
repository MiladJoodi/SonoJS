import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductCategories01 from "@/registry/blocks/ecommerce/product-categories/product-categories-01/product-categories"
import ProductCategories02 from "@/registry/blocks/ecommerce/product-categories/product-categories-02/product-categories"
import ProductCategories03 from "@/registry/blocks/ecommerce/product-categories/product-categories-03/product-categories"
import ProductCategories04 from "@/registry/blocks/ecommerce/product-categories/product-categories-04/product-categories"
import ProductCategories05 from "@/registry/blocks/ecommerce/product-categories/product-categories-05/product-categories"
import ProductCategories06 from "@/registry/blocks/ecommerce/product-categories/product-categories-06/product-categories"
import ProductCategories07 from "@/registry/blocks/ecommerce/product-categories/product-categories-07/product-categories"
import ProductCategories08 from "@/registry/blocks/ecommerce/product-categories/product-categories-08/product-categories"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/product-categories",
  "Product Categories",
  "Ready-to-use Product Categories UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProductCategories from "@/components/blocks/ecommerce/${name}/product-categories"

export default function Page() {
  return <ProductCategories />
}`

export default function BlockProductCategoriesDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product Categories"
        pathname="/blocks/ecommerce/product-categories"
        description="Eight production category layouts — lookbook orbit, poster wall, apothecary tray, spotlight triptych, lookbook index, offer desk, wellness shelf, and marketplace hubs."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-categories-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories01 />
        </BlockExample>

        <BlockExample
          name="product-categories-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-zinc-950 p-0"
        >
          <ProductCategories02 />
        </BlockExample>

        <BlockExample
          name="product-categories-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories03 />
        </BlockExample>

        <BlockExample
          name="product-categories-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories04 />
        </BlockExample>

        <BlockExample
          name="product-categories-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories05 />
        </BlockExample>

        <BlockExample
          name="product-categories-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories06 />
        </BlockExample>

        <BlockExample
          name="product-categories-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductCategories07 />
        </BlockExample>

        <BlockExample
          name="product-categories-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-categories-08"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-muted p-0 dark:bg-background"
        >
          <ProductCategories08 />
        </BlockExample>
      </div>
    </article>
  )
}
