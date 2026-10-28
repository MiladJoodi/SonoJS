import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import NotificationCenter01 from "@/registry/blocks/communication/notification-center/notification-center-01/notification-center"
import NotificationCenter02 from "@/registry/blocks/communication/notification-center/notification-center-02/notification-center"
import NotificationCenter03 from "@/registry/blocks/communication/notification-center/notification-center-03/notification-center"

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

const EXAMPLES = [
  { name: "notification-center-01", Component: NotificationCenter01 },
  { name: "notification-center-02", Component: NotificationCenter02 },
  { name: "notification-center-03", Component: NotificationCenter03 },
] as const

export default function BlockNotificationCenterDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Notification Center"
        pathname="/blocks/communication/notification-center"
        description="Inbox panel, header bell popover, and channel preferences."
      />

      <div className="flex flex-col gap-8">
        {EXAMPLES.map(({ name, Component }) => (
          <BlockExample
            key={name}
            name={name}
            usage={[
              {
                title: "app/page.tsx",
                code: usage(name),
              },
            ]}
            previewAlign="start"
            previewClassName="bg-canvas p-0"
            previewSize={
              name === "notification-center-02" ? "compact" : "default"
            }
          >
            <Component />
          </BlockExample>
        ))}
      </div>
    </article>
  )
}
