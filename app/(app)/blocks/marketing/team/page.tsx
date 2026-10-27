import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Team01 from "@/registry/blocks/marketing/team/team-01/team"
import Team02 from "@/registry/blocks/marketing/team/team-02/team"
import Team03 from "@/registry/blocks/marketing/team/team-03/team"
import Team04 from "@/registry/blocks/marketing/team/team-04/team"
import Team05 from "@/registry/blocks/marketing/team/team-05/team"
import Team06 from "@/registry/blocks/marketing/team/team-06/team"
import Team07 from "@/registry/blocks/marketing/team/team-07/team"
import Team08 from "@/registry/blocks/marketing/team/team-08/team"
import Team09 from "@/registry/blocks/marketing/team/team-09/team"
import Team10 from "@/registry/blocks/marketing/team/team-10/team"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata("/blocks/marketing/team", "Team", "Ready-to-use Team UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.")

const usage = (name: string) => `import Team from "@/components/blocks/marketing/${name}/team"

export default function Page() {
  return <Team />
}`

const previewProps = {
  previewAlign: "center" as const,
  previewClassName: "bg-canvas px-4 py-12 md:px-8",
}

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

export default function BlockTeamDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Team"
        pathname="/blocks/marketing/team"
        description="Team member grids for marketing pages — photo cards with name, role, bio, and social links."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="team-01"
          usage={[{ title: "app/page.tsx", code: usage("team-01") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team01 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-02"
          usage={[{ title: "app/page.tsx", code: usage("team-02") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team02 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-03"
          usage={[{ title: "app/page.tsx", code: usage("team-03") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team03 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-04"
          usage={[{ title: "app/page.tsx", code: usage("team-04") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team04 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-05"
          usage={[{ title: "app/page.tsx", code: usage("team-05") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team05 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-06"
          usage={[{ title: "app/page.tsx", code: usage("team-06") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team06 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-07"
          usage={[{ title: "app/page.tsx", code: usage("team-07") }]}
          previewAlign="center"
          previewClassName="bg-canvas p-0"
        >
          <Team07 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-08"
          usage={[{ title: "app/page.tsx", code: usage("team-08") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team08 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-09"
          usage={[{ title: "app/page.tsx", code: usage("team-09") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team09 />
          </div>
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="team-10"
          usage={[{ title: "app/page.tsx", code: usage("team-10") }]}
          {...previewProps}
        >
          <div className="flex w-full items-center justify-center py-6">
            <Team10 />
          </div>
        </BlockExample>
      </div>
    </article>
  )
}
