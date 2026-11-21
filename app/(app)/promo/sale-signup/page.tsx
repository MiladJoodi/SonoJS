import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import { DocsInstallation } from "@/components/docs"
import SaleSignup01 from "@/registry/promo/sale-signup/sale-signup-01/sale-signup"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Sale Signup",
  description:
    "Early Black Friday email signup modal — cream form, burgundy tier offers, free-gift arch card. Install with the SonoJS CLI.",
  path: "/promo/sale-signup",
})

const usage = `import SaleSignup from "@/components/sale-signup-01/sale-signup"

export default function Page() {
  return (
    <div className="relative min-h-svh w-full">
      <SaleSignup position="fixed" onSubmit={async (email) => {
        // send email to your list
        console.log(email)
      }} />
    </div>
  )
}`

export default async function PromoSaleSignupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Sale Signup"
        pathname="/promo/sale-signup"
        description="A split signup modal for early Black Friday: email capture on cream paper, house-shaped discount tiers on burgundy, and an arched free-gift card. Drop it fixed over your storefront."
      />

      <DocsInstallation name="sale-signup-01" />

      <BlockExample
        name="sale-signup-01"
        usage={[{ title: "app/page.tsx", code: usage }]}
        previewAlign="center"
        previewClassName="bg-canvas p-0"
      >
        <div className="relative min-h-[560px] w-full bg-canvas sm:min-h-[640px]">
          <SaleSignup01 />
        </div>
      </BlockExample>
    </article>
  )
}
