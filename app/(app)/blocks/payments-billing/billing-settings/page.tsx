import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import BillingSettings01 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-01/billing-settings"
import BillingSettings02 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-02/billing-settings"
import BillingSettings03 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-03/billing-settings"
import BillingSettings04 from "@/registry/blocks/payments-billing/billing-settings/billing-settings-04/billing-settings"

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

export default function BlockBillingSettingsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Billing Settings"
        pathname="/blocks/payments-billing/billing-settings"
        description="Overview, preferences, change plan, and company & tax — elevated cards on a white stage."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="billing-settings-01"
          usage={[
            { title: "app/page.tsx", code: usage("billing-settings-01") },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingSettings01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="billing-settings-02"
          usage={[
            { title: "app/page.tsx", code: usage("billing-settings-02") },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingSettings02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="billing-settings-03"
          usage={[
            { title: "app/page.tsx", code: usage("billing-settings-03") },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingSettings03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="billing-settings-04"
          usage={[
            { title: "app/page.tsx", code: usage("billing-settings-04") },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <BillingSettings04 />
        </BlockExample>
      </div>
    </article>
  )
}
