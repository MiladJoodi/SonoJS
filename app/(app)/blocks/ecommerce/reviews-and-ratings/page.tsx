import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Rating01 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-01/rating"
import Rating02 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-02/rating"
import Rating03 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-03/rating"
import Rating04 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-04/rating"
import Rating05 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-05/rating"
import Rating06 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-06/rating"
import Rating07 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-07/rating"
import Rating08 from "@/registry/blocks/ecommerce/reviews-and-ratings/rating-08/rating"

const usage = (name: string) => `import Rating from "@/components/blocks/ecommerce/${name}/rating"

export default function Page() {
  return <Rating />
}`

const previewProps = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas px-10 py-12",
  previewSize: "compact" as const,
}

function ExampleRule() {
  return (
    <div
      role="separator"
      className="h-px w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, color-mix(in oklab, var(--foreground) 18%, transparent) 0 8px, transparent 8px 16px)",
      }}
    />
  )
}

export default function BlockReviewsRatingsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Reviews & Ratings"
        pathname="/blocks/ecommerce/reviews-and-ratings"
        description="Premium star ratings, score cards, and review lists for product pages — gold stars, soft surfaces, LTR-locked chrome."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="rating-01"
          usage={[{ title: "app/page.tsx", code: usage("rating-01") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-02"
          usage={[{ title: "app/page.tsx", code: usage("rating-02") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-03"
          usage={[{ title: "app/page.tsx", code: usage("rating-03") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-04"
          usage={[{ title: "app/page.tsx", code: usage("rating-04") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-10 py-12"
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-05"
          usage={[{ title: "app/page.tsx", code: usage("rating-05") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-10 py-12"
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-06"
          usage={[{ title: "app/page.tsx", code: usage("rating-06") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-10 py-12"
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating06 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-07"
          usage={[{ title: "app/page.tsx", code: usage("rating-07") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-10 py-12"
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating07 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="rating-08"
          usage={[{ title: "app/page.tsx", code: usage("rating-08") }]}
          previewAlign="center"
          previewClassName="bg-canvas px-10 py-12"
        >
          <div className="flex w-full items-center justify-center bg-canvas py-8">
            <Rating08 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
