import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Integrations01 from "@/registry/blocks/developer-tools/integrations/integrations-01/integrations"
import Integrations02 from "@/registry/blocks/developer-tools/integrations/integrations-02/integrations"
import Integrations03 from "@/registry/blocks/developer-tools/integrations/integrations-03/integrations"

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

export default function BlockIntegrationsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Integrations"
        pathname="/blocks/developer-tools/integrations"
        description="Marketplace catalog, connected detail studio, and compact connected apps list."
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

        <ExampleRule />

        <BlockExample
          name="integrations-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("integrations-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Integrations02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="integrations-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("integrations-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Integrations03 />
        </BlockExample>
      </div>
    </article>
  )
}
