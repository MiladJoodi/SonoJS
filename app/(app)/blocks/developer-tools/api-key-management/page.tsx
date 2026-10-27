import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import ApiKeys01 from "@/registry/blocks/developer-tools/api-key-management/api-keys-01/api-keys"
import ApiKeys02 from "@/registry/blocks/developer-tools/api-key-management/api-keys-02/api-keys"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/developer-tools/api-key-management",
  "API Key Management",
  "Ready-to-use API Key Management UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import ApiKeys from "@/components/blocks/developer-tools/${name}/api-keys"

export default function Page() {
  return <ApiKeys />
}`

export default function BlockApiKeyManagementDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="API Key Management"
        pathname="/blocks/developer-tools/api-key-management"
        description="Two patterns — admin key table with create dialog, and personal access tokens with one-time secret reveal."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="api-keys-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("api-keys-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApiKeys01 />
        </BlockExample>

        <BlockExample
          name="api-keys-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("api-keys-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <ApiKeys02 />
        </BlockExample>
      </div>
    </article>
  )
}
