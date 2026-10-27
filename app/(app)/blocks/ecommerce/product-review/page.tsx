import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProductReview01 from "@/registry/blocks/ecommerce/product-review/product-review-01/product-review"
import ProductReview02 from "@/registry/blocks/ecommerce/product-review/product-review-02/product-review"
import ProductReview03 from "@/registry/blocks/ecommerce/product-review/product-review-03/product-review"
import ProductReview04 from "@/registry/blocks/ecommerce/product-review/product-review-04/product-review"
import ProductReview05 from "@/registry/blocks/ecommerce/product-review/product-review-05/product-review"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/product-review",
  "Product Review",
  "Ready-to-use Product Review UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProductReview from "@/components/blocks/ecommerce/${name}/product-review"

export default function Page() {
  return <ProductReview />
}`

export default function BlockProductReviewDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Product Review"
        pathname="/blocks/ecommerce/product-review"
        description="Customer review lists and rating summaries — verified buyers, star scores, image strips, and helpful votes."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="product-review-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-review-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductReview01 />
        </BlockExample>

        <BlockExample
          name="product-review-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-review-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductReview02 />
        </BlockExample>

        <BlockExample
          name="product-review-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-review-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductReview03 />
        </BlockExample>

        <BlockExample
          name="product-review-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-review-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductReview04 />
        </BlockExample>

        <BlockExample
          name="product-review-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("product-review-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProductReview05 />
        </BlockExample>
      </div>
    </article>
  )
}
