import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import RateLimit01 from "@/registry/blocks/feedback-states/rate-limit/rate-limit-01/rate-limit"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/rate-limit",
  "Rate Limit",
  "Ready-to-use Rate Limit UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import RateLimit from "@/components/blocks/feedback-states/${name}/rate-limit"

export default function Page() {
  return <RateLimit />
}`

export default function BlockRateLimitDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Rate Limit"
        pathname="/blocks/feedback-states/rate-limit"
        description="429 cooldown with usage details, retry gate, and upgrade path."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="rate-limit-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("rate-limit-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <RateLimit01 />
        </BlockExample>
      </div>
    </article>
  )
}
