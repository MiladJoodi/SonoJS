import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import UserProfile01 from "@/registry/blocks/user-account/user-profile/user-profile-01/user-profile"
import UserProfile02 from "@/registry/blocks/user-account/user-profile/user-profile-02/user-profile"
import UserProfile03 from "@/registry/blocks/user-account/user-profile/user-profile-03/user-profile"
import UserProfile04 from "@/registry/blocks/user-account/user-profile/user-profile-04/user-profile"
import UserProfile05 from "@/registry/blocks/user-account/user-profile/user-profile-05/user-profile"
import UserProfile06 from "@/registry/blocks/user-account/user-profile/user-profile-06/user-profile"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/user-account/user-profile",
  "User Profile",
  "Ready-to-use User Profile UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import UserProfile from "@/components/blocks/user-account/${name}/user-profile"

export default function Page() {
  return <UserProfile />
}`

const EXAMPLES = [
  { name: "user-profile-01", Component: UserProfile01 },
  { name: "user-profile-02", Component: UserProfile02 },
  { name: "user-profile-03", Component: UserProfile03 },
  { name: "user-profile-04", Component: UserProfile04 },
  { name: "user-profile-05", Component: UserProfile05 },
  { name: "user-profile-06", Component: UserProfile06 },
] as const

export default function BlockUserProfileDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="User Profile"
        pathname="/blocks/user-account/user-profile"
        description="Six styles — GitHub tabs, creator card, cover + work, account settings, resume timeline, and org directory."
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
            previewClassName="bg-white p-0 dark:bg-background"
          >
            <Component />
          </BlockExample>
        ))}
      </div>
    </article>
  )
}
