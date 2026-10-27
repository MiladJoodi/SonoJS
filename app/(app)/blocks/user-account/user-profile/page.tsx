import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import UserProfile01 from "@/registry/blocks/user-account/user-profile/user-profile-01/user-profile"

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

export default function BlockUserProfileDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="User Profile"
        pathname="/blocks/user-account/user-profile"
        description="Cover banner, follow actions, sidebar bio/stats/skills, and repositories / activity / starred tabs."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="user-profile-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("user-profile-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <UserProfile01 />
        </BlockExample>
      </div>
    </article>
  )
}
