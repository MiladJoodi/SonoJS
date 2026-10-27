import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TeamMembers01 from "@/registry/blocks/user-account/team-members/team-members-01/team-members"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/user-account/team-members",
  "Team Members",
  "Ready-to-use Team Members UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import TeamMembers from "@/components/blocks/user-account/${name}/team-members"

export default function Page() {
  return <TeamMembers />
}`

export default function BlockTeamMembersDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Team Members"
        pathname="/blocks/user-account/team-members"
        description="Invite dialog, member table with roles and status, and row actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="team-members-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("team-members-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers01 />
        </BlockExample>
      </div>
    </article>
  )
}
