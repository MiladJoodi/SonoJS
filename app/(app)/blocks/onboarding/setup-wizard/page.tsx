import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SetupWizard01 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-01/setup-wizard"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/onboarding/setup-wizard",
  "Setup Wizard",
  "Ready-to-use Setup Wizard UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import SetupWizard from "@/components/blocks/onboarding/${name}/setup-wizard"

export default function Page() {
  return <SetupWizard />
}`

export default function BlockSetupWizardDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Setup Wizard"
        pathname="/blocks/onboarding/setup-wizard"
        description="Multi-step onboarding with account setup, email verification, experience selection, and launch."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="setup-wizard-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("setup-wizard-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <SetupWizard01 />
        </BlockExample>
      </div>
    </article>
  )
}
