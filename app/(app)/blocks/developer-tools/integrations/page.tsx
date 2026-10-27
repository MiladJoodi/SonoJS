import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Integrations01 from "@/registry/blocks/developer-tools/integrations/integrations-01/integrations"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/developer-tools/integrations",
  "Integrations",
  "Ready-to-use Integrations UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import Integrations from "@/components/blocks/developer-tools/${name}/integrations"

export default function Page() {
  return <Integrations />
}`

export default function BlockIntegrationsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Integrations"
        pathname="/blocks/developer-tools/integrations"
        description="Searchable integration catalog with category filters, connect actions, and a request card."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="integrations-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("integrations-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Integrations01 />
        </BlockExample>
      </div>
    </article>
  )
}
