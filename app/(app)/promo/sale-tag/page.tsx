import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SaleTag01 from "@/registry/promo/sale-tag/sale-tag-01/sale-tag"
import SaleTag02 from "@/registry/promo/sale-tag/sale-tag-02/sale-tag"
import SaleTag03 from "@/registry/promo/sale-tag/sale-tag-03/sale-tag"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Sale Tag",
  description:
    "Hanging price-tag sale popups — drop in on a string, swing, copy the code. Black Friday, Cyber Monday, and Kraft looks.",
  path: "/promo/sale-tag",
})

const usage = (name: string) =>
  `import SaleTag from "@/components/${name}/sale-tag"

export default function Page() {
  return <SaleTag />
}`

const shell = {
  previewAlign: "start" as const,
  previewClassName: "bg-canvas p-0",
}

export default function PromoSaleTagDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Sale Tag"
        pathname="/promo/sale-tag"
        description="A price tag that drops from a string, springs into place, and copies your promo code. Drag sideways to swing. Close it and a corner chip brings it back."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="sale-tag-01"
          usage={[{ title: "app/page.tsx", code: usage("sale-tag-01") }]}
          {...shell}
        >
          <div className="relative min-h-[440px] w-full bg-canvas">
            <SaleTag01 />
          </div>
        </BlockExample>

        <BlockExample
          name="sale-tag-02"
          usage={[{ title: "app/page.tsx", code: usage("sale-tag-02") }]}
          {...shell}
        >
          <div className="relative min-h-[440px] w-full bg-canvas">
            <SaleTag02 />
          </div>
        </BlockExample>

        <BlockExample
          name="sale-tag-03"
          usage={[{ title: "app/page.tsx", code: usage("sale-tag-03") }]}
          {...shell}
        >
          <div className="relative min-h-[440px] w-full bg-canvas">
            <SaleTag03 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
