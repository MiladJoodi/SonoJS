import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BillingHistory01 from "@/registry/blocks/payments-billing/billing-history/billing-history-01/billing-history"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/billing-history",
  "Billing History",
  "Ready-to-use Billing History UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import BillingHistory from "@/components/blocks/payments-billing/${name}/billing-history"

export default function Page() {
  return <BillingHistory />
}`

export default function BlockBillingHistoryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Billing History"
        pathname="/blocks/payments-billing/billing-history"
        description="Transaction history with search, status and type filters, a paginated table, and empty state."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="billing-history-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("billing-history-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingHistory01 />
        </BlockExample>
      </div>
    </article>
  )
}
