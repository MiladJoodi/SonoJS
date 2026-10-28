import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import WebhookManagement01 from "@/registry/blocks/developer-tools/webhook-management/webhook-management-01/webhook-management"
import WebhookManagement02 from "@/registry/blocks/developer-tools/webhook-management/webhook-management-02/webhook-management"
import WebhookManagement03 from "@/registry/blocks/developer-tools/webhook-management/webhook-management-03/webhook-management"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/developer-tools/webhook-management",
  "Webhook Management",
  "Ready-to-use Webhook Management UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import WebhookManagement from "@/components/blocks/developer-tools/${name}/webhook-management"

export default function Page() {
  return <WebhookManagement />
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

export default function BlockWebhookManagementDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Webhook Management"
        pathname="/blocks/developer-tools/webhook-management"
        description="Ops dashboard, delivery inspector, and compact endpoints table."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="webhook-management-01"
          usage={[
            { title: "app/page.tsx", code: usage("webhook-management-01") },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WebhookManagement01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="webhook-management-02"
          usage={[
            { title: "app/page.tsx", code: usage("webhook-management-02") },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WebhookManagement02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="webhook-management-03"
          usage={[
            { title: "app/page.tsx", code: usage("webhook-management-03") },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WebhookManagement03 />
        </BlockExample>
      </div>
    </article>
  )
}
