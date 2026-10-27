import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ProgressChecklist01 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-01/progress-checklist"
import ProgressChecklist02 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-02/progress-checklist"
import ProgressChecklist03 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-03/progress-checklist"
import ProgressChecklist04 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-04/progress-checklist"
import ProgressChecklist05 from "@/registry/blocks/onboarding/progress-checklist/progress-checklist-05/progress-checklist"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/onboarding/progress-checklist",
  "Progress Checklist",
  "Ready-to-use Progress Checklist UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ProgressChecklist from "@/components/blocks/onboarding/${name}/progress-checklist"

export default function Page() {
  return <ProgressChecklist />
}`

export default function BlockProgressChecklistDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Progress Checklist"
        pathname="/blocks/onboarding/progress-checklist"
        description="Get-started checklists — accordion, sequential CTAs, Progress bar, or quick-start panels."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="progress-checklist-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("progress-checklist-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProgressChecklist01 />
        </BlockExample>

        <BlockExample
          name="progress-checklist-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("progress-checklist-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProgressChecklist02 />
        </BlockExample>

        <BlockExample
          name="progress-checklist-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("progress-checklist-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProgressChecklist03 />
        </BlockExample>

        <BlockExample
          name="progress-checklist-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("progress-checklist-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProgressChecklist04 />
        </BlockExample>

        <BlockExample
          name="progress-checklist-05"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("progress-checklist-05"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <ProgressChecklist05 />
        </BlockExample>
      </div>
    </article>
  )
}
