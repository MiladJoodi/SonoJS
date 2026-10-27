import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AccountSettings01 from "@/registry/blocks/user-account/account-settings/account-settings-01/account-settings"
import AccountSettings02 from "@/registry/blocks/user-account/account-settings/account-settings-02/account-settings"
import AccountSettings03 from "@/registry/blocks/user-account/account-settings/account-settings-03/account-settings"

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

export default function BlockAccountSettingsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Account Settings"
        pathname="/blocks/user-account/account-settings"
        description="Profile, workspace, and alerts — tabbed panels or stacked section forms."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="account-settings-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("account-settings-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AccountSettings01 />
        </BlockExample>

        <BlockExample
          name="account-settings-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("account-settings-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AccountSettings02 />
        </BlockExample>

        <BlockExample
          name="account-settings-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("account-settings-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <AccountSettings03 />
        </BlockExample>
      </div>
    </article>
  )
}
