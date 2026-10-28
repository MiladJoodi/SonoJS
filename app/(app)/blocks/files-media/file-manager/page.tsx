import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import FileManager01 from "@/registry/blocks/files-media/file-manager/file-manager-01/file-manager"
import FileManager02 from "@/registry/blocks/files-media/file-manager/file-manager-02/file-manager"
import FileManager03 from "@/registry/blocks/files-media/file-manager/file-manager-03/file-manager"
import FileManager04 from "@/registry/blocks/files-media/file-manager/file-manager-04/file-manager"
import FileManager05 from "@/registry/blocks/files-media/file-manager/file-manager-05/file-manager"

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

const CANVAS_STAGE = "bg-canvas p-0"
const WHITE_STAGE = "bg-white p-0 dark:bg-background"

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

export default function BlockFileManagerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="File Manager"
        pathname="/blocks/files-media/file-manager"
        description="Browse and organize files — Drive shell, Finder tree, shared team folder, details inspector, and attach picker."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="file-manager-01"
          usage={[{ title: "app/page.tsx", code: usage("file-manager-01") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <FileManager01 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-manager-02"
          usage={[{ title: "app/page.tsx", code: usage("file-manager-02") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <FileManager02 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-manager-03"
          usage={[{ title: "app/page.tsx", code: usage("file-manager-03") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <FileManager03 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-manager-04"
          usage={[{ title: "app/page.tsx", code: usage("file-manager-04") }]}
          previewAlign="start"
          previewClassName={CANVAS_STAGE}
        >
          <FileManager04 />
        </BlockExample>

        <ExampleRule />

        <BlockExample
          name="file-manager-05"
          usage={[{ title: "app/page.tsx", code: usage("file-manager-05") }]}
          previewAlign="start"
          previewClassName={WHITE_STAGE}
        >
          <FileManager05 />
        </BlockExample>
      </div>
    </article>
  )
}
