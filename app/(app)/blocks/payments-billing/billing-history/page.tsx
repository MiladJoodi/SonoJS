import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BillingHistory01 from "@/registry/blocks/payments-billing/billing-history/billing-history-01/billing-history"
import BillingHistory02 from "@/registry/blocks/payments-billing/billing-history/billing-history-02/billing-history"
import BillingHistory03 from "@/registry/blocks/payments-billing/billing-history/billing-history-03/billing-history"

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

export default function BlockBillingHistoryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Billing History"
        pathname="/blocks/payments-billing/billing-history"
        description="Transaction ledger, month-grouped invoice archive, and receipt inspector."
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

        <ExampleRule />

        <BlockExample
          name="billing-history-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("billing-history-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingHistory02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="billing-history-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("billing-history-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingHistory03 />
        </BlockExample>
      </div>
    </article>
  )
}
