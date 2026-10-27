import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import Gallery01 from "@/registry/blocks/files-media/image-gallery/gallery-01/gallery"
import Gallery02 from "@/registry/blocks/files-media/image-gallery/gallery-02/gallery"
import Gallery03 from "@/registry/blocks/files-media/image-gallery/gallery-03/gallery"
import Gallery04 from "@/registry/blocks/files-media/image-gallery/gallery-04/gallery"
import Gallery05 from "@/registry/blocks/files-media/image-gallery/gallery-05/gallery"
import Gallery06 from "@/registry/blocks/files-media/image-gallery/gallery-06/gallery"
import Gallery07 from "@/registry/blocks/files-media/image-gallery/gallery-07/gallery"
import Gallery08 from "@/registry/blocks/files-media/image-gallery/gallery-08/gallery"
import Gallery09 from "@/registry/blocks/files-media/image-gallery/gallery-09/gallery"
import Gallery10 from "@/registry/blocks/files-media/image-gallery/gallery-10/gallery"

const usage = (name: string) =>
  `import Gallery from "@/components/blocks/files-media/${name}/gallery"

export default function Page() {
  return <Gallery />
}`

export default function BlockImageGalleryDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Image Gallery"
        pathname="/blocks/files-media/image-gallery"
        description="Photo grids for portfolios, product shoots, and media libraries."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="gallery-01"
          usage={[{ title: "app/page.tsx", code: usage("gallery-01") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery01 />
        </BlockExample>

        <BlockExample
          name="gallery-02"
          usage={[{ title: "app/page.tsx", code: usage("gallery-02") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery02 />
        </BlockExample>

        <BlockExample
          name="gallery-03"
          usage={[{ title: "app/page.tsx", code: usage("gallery-03") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery03 />
        </BlockExample>

        <BlockExample
          name="gallery-04"
          usage={[{ title: "app/page.tsx", code: usage("gallery-04") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery04 />
        </BlockExample>

        <BlockExample
          name="gallery-05"
          usage={[{ title: "app/page.tsx", code: usage("gallery-05") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery05 />
        </BlockExample>

        <BlockExample
          name="gallery-06"
          usage={[{ title: "app/page.tsx", code: usage("gallery-06") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery06 />
        </BlockExample>

        <BlockExample
          name="gallery-07"
          usage={[{ title: "app/page.tsx", code: usage("gallery-07") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery07 />
        </BlockExample>

        <BlockExample
          name="gallery-08"
          usage={[{ title: "app/page.tsx", code: usage("gallery-08") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery08 />
        </BlockExample>

        <BlockExample
          name="gallery-09"
          usage={[{ title: "app/page.tsx", code: usage("gallery-09") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery09 />
        </BlockExample>

        <BlockExample
          name="gallery-10"
          usage={[{ title: "app/page.tsx", code: usage("gallery-10") }]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <Gallery10 />
        </BlockExample>
      </div>
    </article>
  )
}
