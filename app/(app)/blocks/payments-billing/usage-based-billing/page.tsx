import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import UsageBasedBilling01 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-01/usage-based-billing"
import UsageBasedBilling02 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-02/usage-based-billing"
import UsageBasedBilling03 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-03/usage-based-billing"
import UsageBasedBilling04 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-04/usage-based-billing"
import UsageBasedBilling05 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-05/usage-based-billing"
import UsageBasedBilling06 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-06/usage-based-billing"
import UsageBasedBilling07 from "@/registry/blocks/payments-billing/usage-based-billing/usage-based-billing-07/usage-based-billing"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/usage-based-billing",
  "Usage-Based Billing",
  "Ready-to-use Usage-Based Billing UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import UsageBasedBilling from "@/components/blocks/payments-billing/${name}/usage-based-billing"

export default function Page() {
  return <UsageBasedBilling />
}`

export default function BlockUsageBasedBillingDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Usage-Based Billing"
        pathname="/blocks/payments-billing/usage-based-billing"
        description="Plan quotas — upgrade CTAs, gauges, Progress meters, detailed cards, usage lists, or storage breakdown."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="usage-based-billing-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling01 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling02 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling03 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling04 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling05 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-06"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-06"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling06 />
        </BlockExample>

        <BlockExample
          name="usage-based-billing-07"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("usage-based-billing-07"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <UsageBasedBilling07 />
        </BlockExample>
      </div>
    </article>
  )
}
