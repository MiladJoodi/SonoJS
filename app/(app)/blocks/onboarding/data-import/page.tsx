import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataImport01 from "@/registry/blocks/onboarding/data-import/data-import-01/data-import"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/onboarding/data-import",
  "Data Import",
  "Ready-to-use Data Import UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import DataImport from "@/components/blocks/onboarding/${name}/data-import"

export default function Page() {
  return <DataImport />
}`

export default function BlockDataImportDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Import"
        pathname="/blocks/onboarding/data-import"
        description="Migrate tokens and components — live progress bars, rerun, and expandable logs."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="data-import-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("data-import-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <DataImport01 />
        </BlockExample>
      </div>
    </article>
  )
}
