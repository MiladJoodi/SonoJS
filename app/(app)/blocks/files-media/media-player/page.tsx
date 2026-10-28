import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MediaPlayer01 from "@/registry/blocks/files-media/media-player/media-player-01/media-player"
import MediaPlayer02 from "@/registry/blocks/files-media/media-player/media-player-02/media-player"
import MediaPlayer03 from "@/registry/blocks/files-media/media-player/media-player-03/media-player"
import MediaPlayer04 from "@/registry/blocks/files-media/media-player/media-player-04/media-player"
import MediaPlayer05 from "@/registry/blocks/files-media/media-player/media-player-05/media-player"
import MediaPlayer06 from "@/registry/blocks/files-media/media-player/media-player-06/media-player"
import MediaPlayer07 from "@/registry/blocks/files-media/media-player/media-player-07/media-player"
import MediaPlayer08 from "@/registry/blocks/files-media/media-player/media-player-08/media-player"
import MediaPlayer09 from "@/registry/blocks/files-media/media-player/media-player-09/media-player"
import MediaPlayer10 from "@/registry/blocks/files-media/media-player/media-player-10/media-player"

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

const examples = [
  { name: "media-player-01", Component: MediaPlayer01 },
  { name: "media-player-02", Component: MediaPlayer02 },
  { name: "media-player-03", Component: MediaPlayer03 },
  { name: "media-player-04", Component: MediaPlayer04 },
  { name: "media-player-05", Component: MediaPlayer05 },
  { name: "media-player-06", Component: MediaPlayer06 },
  { name: "media-player-07", Component: MediaPlayer07 },
  { name: "media-player-08", Component: MediaPlayer08 },
  { name: "media-player-09", Component: MediaPlayer09 },
  { name: "media-player-10", Component: MediaPlayer10 },
] as const

export default function BlockMediaPlayerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Media Player"
        pathname="/blocks/files-media/media-player"
        description="Ten production video players — dense watch, cinema, clean embed, live+chat, next-up, info panel, course, share embed, vertical short, and mini dock. Audio lives in a separate catalog."
      />

      <div className="flex flex-col gap-8">
        {examples.map(({ name, Component }, i) => (
          <div key={name} className="flex flex-col gap-8">
            {i > 0 ? <ExampleRule /> : null}
            <BlockExample
              name={name}
              usage={[{ title: "app/page.tsx", code: usage(name) }]}
              previewAlign="start"
              previewClassName="bg-white p-0 dark:bg-background"
            >
              <Component />
            </BlockExample>
          </div>
        ))}
      </div>
    </article>
  )
}
