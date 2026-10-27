import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import WebhookManagement01 from "@/registry/blocks/developer-tools/webhook-management/webhook-management-01/webhook-management"

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

export default function BlockWebhookManagementDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Webhook Management"
        pathname="/blocks/developer-tools/webhook-management"
        description="Add endpoints, manage active webhooks, and inspect recent delivery logs."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="webhook-management-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("webhook-management-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WebhookManagement01 />
        </BlockExample>
      </div>
    </article>
  )
}
