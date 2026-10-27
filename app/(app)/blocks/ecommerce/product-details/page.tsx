import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductDetails01 from "@/registry/blocks/ecommerce/product-details/product-details-01/product-details"
import ProductDetails02 from "@/registry/blocks/ecommerce/product-details/product-details-02/product-details"
import ProductDetails03 from "@/registry/blocks/ecommerce/product-details/product-details-03/product-details"
import ProductDetails04 from "@/registry/blocks/ecommerce/product-details/product-details-04/product-details"
import ProductDetails05 from "@/registry/blocks/ecommerce/product-details/product-details-05/product-details"
import ProductDetails06 from "@/registry/blocks/ecommerce/product-details/product-details-06/product-details"
import ProductDetails07 from "@/registry/blocks/ecommerce/product-details/product-details-07/product-details"
import ProductDetails08 from "@/registry/blocks/ecommerce/product-details/product-details-08/product-details"

const usage = (name: string) =>
  `import ProductDetails from "@/components/blocks/ecommerce/${name}/product-details"

export default function Page() {
  return <ProductDetails />
}`

export default function BlockProductDetailsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product Details"
        pathname="/blocks/ecommerce/product-details"
        description="Product detail pages with gallery, sizing, delivery check, accordion specs, and reviews."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-details-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails01 />
        </BlockExample>

        <BlockExample
          name="product-details-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails02 />
        </BlockExample>

        <BlockExample
          name="product-details-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails03 />
        </BlockExample>

        <BlockExample
          name="product-details-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails04 />
        </BlockExample>

        <BlockExample
          name="product-details-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails05 />
        </BlockExample>

        <BlockExample
          name="product-details-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails06 />
        </BlockExample>

        <BlockExample
          name="product-details-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails07 />
        </BlockExample>

        <BlockExample
          name="product-details-08"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-details-08"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0"
        >
          <ProductDetails08 />
        </BlockExample>
      </div>
    </article>
  )
}
