import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Wishlist01 from "@/registry/blocks/ecommerce/wishlist/wishlist-01/wishlist"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/ecommerce/wishlist",
  "Wishlist",
  "Ready-to-use Wishlist UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Wishlist from "@/components/blocks/ecommerce/${name}/wishlist"

export default function Page() {
  return <Wishlist />
}`

export default function BlockWishlistDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Wishlist"
        pathname="/blocks/ecommerce/wishlist"
        description="Saved-items grid with remove, discount badges, stock state, and add-to-cart actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="wishlist-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("wishlist-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Wishlist01 />
        </BlockExample>
      </div>
    </article>
  )
}
