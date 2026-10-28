import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import WorkspaceSetup01 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-01/workspace-setup"
import WorkspaceSetup02 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-02/workspace-setup"
import WorkspaceSetup03 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-03/workspace-setup"
import WorkspaceSetup04 from "@/registry/blocks/onboarding/workspace-setup/workspace-setup-04/workspace-setup"

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

export default function BlockWorkspaceSetupDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Workspace Setup"
        pathname="/blocks/onboarding/workspace-setup"
        description="Compact form, plan picker, brand split, and create-with-invites — single-page create workspace."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="workspace-setup-01"
          usage={[{ title: "app/page.tsx", code: usage("workspace-setup-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WorkspaceSetup01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="workspace-setup-02"
          usage={[{ title: "app/page.tsx", code: usage("workspace-setup-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WorkspaceSetup02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="workspace-setup-03"
          usage={[{ title: "app/page.tsx", code: usage("workspace-setup-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WorkspaceSetup03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="workspace-setup-04"
          usage={[{ title: "app/page.tsx", code: usage("workspace-setup-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <WorkspaceSetup04 />
        </BlockExample>
      </div>
    </article>
  )
}
