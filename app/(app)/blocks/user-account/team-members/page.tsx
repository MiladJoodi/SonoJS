import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import TeamMembers01 from "@/registry/blocks/user-account/team-members/team-members-01/team-members"
import TeamMembers02 from "@/registry/blocks/user-account/team-members/team-members-02/team-members"
import TeamMembers03 from "@/registry/blocks/user-account/team-members/team-members-03/team-members"
import TeamMembers04 from "@/registry/blocks/user-account/team-members/team-members-04/team-members"
import TeamMembers05 from "@/registry/blocks/user-account/team-members/team-members-05/team-members"
import TeamMembers06 from "@/registry/blocks/user-account/team-members/team-members-06/team-members"

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

export default function BlockTeamMembersDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Team Members"
        pathname="/blocks/user-account/team-members"
        description="Table, card grid, search tabs, seats meter, inline invite, and split directory."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="team-members-01"
          usage={[{ title: "app/page.tsx", code: usage("team-members-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-members-02"
          usage={[{ title: "app/page.tsx", code: usage("team-members-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-members-03"
          usage={[{ title: "app/page.tsx", code: usage("team-members-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-members-04"
          usage={[{ title: "app/page.tsx", code: usage("team-members-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-members-05"
          usage={[{ title: "app/page.tsx", code: usage("team-members-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers05 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-members-06"
          usage={[{ title: "app/page.tsx", code: usage("team-members-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <TeamMembers06 />
        </BlockExample>
      </div>
    </article>
  )
}
