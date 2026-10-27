import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MediaGallery01 from "@/registry/blocks/files-media/media-gallery/media-gallery-01/media-gallery"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/media-gallery",
  "Media Gallery",
  "Ready-to-use Media Gallery UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import MediaGallery from "@/components/blocks/files-media/${name}/media-gallery"

export default function Page() {
  return <MediaGallery />
}`

export default function BlockMediaGalleryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Media Gallery"
        pathname="/blocks/files-media/media-gallery"
        description="Asset library with tag filters, masonry or list layout, multi-select, upload, and lightbox preview."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="media-gallery-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("media-gallery-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <MediaGallery01 />
        </BlockExample>
      </div>
    </article>
  )
}
