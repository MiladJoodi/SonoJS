import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FileUpload01 from "@/registry/blocks/files-media/file-upload/file-upload-01/file-upload"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/file-upload",
  "File Upload",
  "Ready-to-use File Upload UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import FileUpload from "@/components/blocks/files-media/${name}/file-upload"

export default function Page() {
  return <FileUpload />
}`

export default function BlockFileUploadDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="File Upload"
        pathname="/blocks/files-media/file-upload"
        description="Drag-and-drop zone with type badges, upload progress rows, and clear / upload actions."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="file-upload-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("file-upload-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <FileUpload01 />
        </BlockExample>
      </div>
    </article>
  )
}
