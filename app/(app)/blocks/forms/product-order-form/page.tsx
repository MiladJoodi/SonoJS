import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductOrderForm01 from "@/registry/blocks/forms/product-order-form/product-order-form-01/product-order-form"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/forms/product-order-form",
  "Product Order Form",
  "Ready-to-use Product Order Form UI blocks for React and Tailwind. Preview and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProductOrderForm from "@/components/blocks/forms/${name}/product-order-form"

export default function Page() {
  return <ProductOrderForm />
}`

export default function BlockProductOrderFormDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product Order Form"
        pathname="/blocks/forms/product-order-form"
        description="Order products with gallery, variants, shipping methods, and a sticky order summary."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-order-form-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-order-form-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductOrderForm01 />
        </BlockExample>
      </div>
    </article>
  )
}
