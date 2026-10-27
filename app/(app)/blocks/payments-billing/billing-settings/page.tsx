import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BillingSettings01 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-01/billing-settings"
import BillingSettings02 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-02/billing-settings"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/payments-billing/billing-settings",
  "Billing Settings",
  "Ready-to-use Billing Settings UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import BillingSettings from "@/components/blocks/payments-billing/${name}/billing-settings"

export default function Page() {
  return <BillingSettings />
}`

export default function BlockBillingSettingsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Billing Settings"
        pathname="/blocks/payments-billing/billing-settings"
        description="Full settings stack with history table, or a compact single-panel billing view."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="billing-settings-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("billing-settings-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <BillingSettings01 />
        </BlockExample>

        <BlockExample
          name="billing-settings-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("billing-settings-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <BillingSettings02 />
        </BlockExample>
      </div>
    </article>
  )
}
