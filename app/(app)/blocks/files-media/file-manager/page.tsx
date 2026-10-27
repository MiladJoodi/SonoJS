import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FileManager01 from "@/registry/blocks/files-media/file-manager/file-manager-01/file-manager"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/file-manager",
  "File Manager",
  "Ready-to-use File Manager UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import FileManager from "@/components/blocks/files-media/${name}/file-manager"

export default function Page() {
  return <FileManager />
}`

export default function BlockFileManagerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="File Manager"
        pathname="/blocks/files-media/file-manager"
        description="Drive-style browser with sidebar, breadcrumbs, storage usage, and grid or list file views."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="file-manager-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("file-manager-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <FileManager01 />
        </BlockExample>
      </div>
    </article>
  )
}
