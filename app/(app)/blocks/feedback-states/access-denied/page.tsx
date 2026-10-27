import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import AccessDenied01 from "@/registry/blocks/feedback-states/access-denied/access-denied-01/access-denied"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/feedback-states/access-denied",
  "Access Denied",
  "Ready-to-use Access Denied UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import AccessDenied from "@/components/blocks/feedback-states/${name}/access-denied"

export default function Page() {
  return <AccessDenied />
}`

export default function BlockAccessDeniedDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Access Denied"
        pathname="/blocks/feedback-states/access-denied"
        description="Restricted-resource gate with identity context and request-access actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="access-denied-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("access-denied-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <AccessDenied01 />
        </BlockExample>
      </div>
    </article>
  )
}
