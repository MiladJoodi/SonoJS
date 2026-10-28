import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AccountSettings01 from "@/registry/blocks/user-account/account-settings/account-settings-01/account-settings"
import AccountSettings02 from "@/registry/blocks/user-account/account-settings/account-settings-02/account-settings"
import AccountSettings03 from "@/registry/blocks/user-account/account-settings/account-settings-03/account-settings"
import AccountSettings04 from "@/registry/blocks/user-account/account-settings/account-settings-04/account-settings"
import AccountSettings05 from "@/registry/blocks/user-account/account-settings/account-settings-05/account-settings"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/user-account/account-settings",
  "Account Settings",
  "Ready-to-use Account Settings UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AccountSettings from "@/components/blocks/user-account/${name}/account-settings"

export default function Page() {
  return <AccountSettings />
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

export default function BlockAccountSettingsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Account Settings"
        pathname="/blocks/user-account/account-settings"
        description="Tabs shell, stacked workspace form, sessions, connected accounts, and appearance."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="account-settings-01"
          usage={[{ title: "app/page.tsx", code: usage("account-settings-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccountSettings01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-settings-02"
          usage={[{ title: "app/page.tsx", code: usage("account-settings-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccountSettings02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-settings-03"
          usage={[{ title: "app/page.tsx", code: usage("account-settings-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccountSettings03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-settings-04"
          usage={[{ title: "app/page.tsx", code: usage("account-settings-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccountSettings04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="account-settings-05"
          usage={[{ title: "app/page.tsx", code: usage("account-settings-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccountSettings05 />
        </BlockExample>
      </div>
    </article>
  )
}
