import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import NotificationCenter01 from "@/registry/blocks/communication/notification-center/notification-center-01/notification-center"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/communication/notification-center",
  "Notification Center",
  "Ready-to-use Notification Center UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import NotificationCenter from "@/components/blocks/communication/${name}/notification-center"

export default function Page() {
  return <NotificationCenter />
}`

export default function BlockNotificationCenterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Notification Center"
        pathname="/blocks/communication/notification-center"
        description="Compact inbox with filters, avatars, type-specific actions, and mark-all-read."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="notification-center-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("notification-center-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <NotificationCenter01 />
        </BlockExample>
      </div>
    </article>
  )
}
