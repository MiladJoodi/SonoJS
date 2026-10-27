import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import WorkspaceSetup01 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-01/workspace-setup"
import WorkspaceSetup02 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-02/workspace-setup"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/onboarding/workspace-setup",
  "Workspace Setup",
  "Ready-to-use Workspace Setup UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import WorkspaceSetup from "@/components/blocks/onboarding/${name}/workspace-setup"

export default function Page() {
  return <WorkspaceSetup />
}`

export default function BlockWorkspaceSetupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Workspace Setup"
        pathname="/blocks/onboarding/workspace-setup"
        description="Create a team workspace — signup fields, or org/region with plan selection."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="workspace-setup-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("workspace-setup-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <WorkspaceSetup01 />
        </BlockExample>

        <BlockExample
          name="workspace-setup-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("workspace-setup-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <WorkspaceSetup02 />
        </BlockExample>
      </div>
    </article>
  )
}
