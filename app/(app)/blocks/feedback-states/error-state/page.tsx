import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ErrorState01 from "@/registry/blocks/feedback-states/error-state/error-state-01/error-state"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/error-state",
  "Error State",
  "Ready-to-use Error State UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ErrorState from "@/components/blocks/feedback-states/${name}/error-state"

export default function Page() {
  return <ErrorState />
}`

export default function BlockErrorStateDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Error State"
        pathname="/blocks/feedback-states/error-state"
        description="Server error page with alert, trace reference, retry, and support."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="error-state-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("error-state-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ErrorState01 />
        </BlockExample>
      </div>
    </article>
  )
}
