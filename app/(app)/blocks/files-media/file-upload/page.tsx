import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FileUpload01 from "@/registry/blocks/files-media/file-upload/file-upload-01/file-upload"
import FileUpload02 from "@/registry/blocks/files-media/file-upload/file-upload-02/file-upload"
import FileUpload03 from "@/registry/blocks/files-media/file-upload/file-upload-03/file-upload"
import FileUpload04 from "@/registry/blocks/files-media/file-upload/file-upload-04/file-upload"

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

export default function BlockFileUploadDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="File Upload"
        pathname="/blocks/files-media/file-upload"
        description="Multi-file queue, image thumbnails, single-document replace, and dialog upload with retry — four production upload patterns."
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
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <FileUpload01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-upload-02"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("file-upload-02"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <FileUpload02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-upload-03"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("file-upload-03"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <FileUpload03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-upload-04"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("file-upload-04"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-white p-0 dark:bg-background"
        >
          <FileUpload04 />
        </BlockExample>
      </div>
    </article>
  )
}
