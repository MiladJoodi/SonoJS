import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import SetupWizard01 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-01/setup-wizard"
import SetupWizard02 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-02/setup-wizard"
import SetupWizard03 from "@/registry/blocks/onboarding/setup-wizard/setup-wizard-03/setup-wizard"

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

export default function BlockSetupWizardDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Setup Wizard"
        pathname="/blocks/onboarding/setup-wizard"
        description="Compact card, vertical rail, and brand-split multi-step onboarding."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="setup-wizard-01"
          usage={[{ title: "app/page.tsx", code: usage("setup-wizard-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <SetupWizard01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="setup-wizard-02"
          usage={[{ title: "app/page.tsx", code: usage("setup-wizard-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <SetupWizard02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="setup-wizard-03"
          usage={[{ title: "app/page.tsx", code: usage("setup-wizard-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <SetupWizard03 />
        </BlockExample>
      </div>
    </article>
  )
}
