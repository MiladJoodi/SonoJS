import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MediaPlayer01 from "@/registry/blocks/files-media/media-player/media-player-01/media-player"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/media-player",
  "Media Player",
  "Ready-to-use Media Player UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import MediaPlayer from "@/components/blocks/files-media/${name}/media-player"

export default function Page() {
  return <MediaPlayer />
}`

export default function BlockMediaPlayerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Media Player"
        pathname="/blocks/files-media/media-player"
        description="Editorial video showcase with a local film, caption, metadata, and watch CTA."
      />

      <div className="flex flex-col gap-8">
        <BlockExample
          name="media-player-01"
          usage={[
            {
              title: "app/page.tsx",
              code: usage("media-player-01"),
            },
          ]}
          previewAlign="start"
          previewClassName="bg-canvas p-0"
        >
          <MediaPlayer01 />
        </BlockExample>
      </div>
    </article>
  )
}
