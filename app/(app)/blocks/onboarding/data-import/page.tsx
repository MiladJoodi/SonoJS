import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import DataImport01 from "@/registry/blocks/onboarding/data-import/data-import-01/data-import"
import DataImport02 from "@/registry/blocks/onboarding/data-import/data-import-02/data-import"
import DataImport03 from "@/registry/blocks/onboarding/data-import/data-import-03/data-import"

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

const EXAMPLES = [
  { name: "data-import-01", Component: DataImport01 },
  { name: "data-import-02", Component: DataImport02 },
  { name: "data-import-03", Component: DataImport03 },
] as const

export default function BlockDataImportDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Data Import"
        pathname="/blocks/onboarding/data-import"
        description="Upload, map columns, and track import progress."
      />

      <div className="flex flex-col gap-8">
        {EXAMPLES.map(({ name, Component }) => (
          <BlockExample
            key={name}
            name={name}
            usage={[
              {
                title: "app/page.tsx",
                code: usage(name),
              },
            ]}
            previewAlign="start"
            previewClassName="bg-white p-0 dark:bg-background"
          >
            <Component />
          </BlockExample>
        ))}
      </div>
    </article>
  )
}
