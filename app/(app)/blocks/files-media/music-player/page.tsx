import {
  BlockExample,
  BlocksPageHeader,
} from "@/components/blocks"
import MusicPlayer01 from "@/registry/blocks/files-media/music-player/music-player-01/music-player"
import MusicPlayer02 from "@/registry/blocks/files-media/music-player/music-player-02/music-player"
import MusicPlayer03 from "@/registry/blocks/files-media/music-player/music-player-03/music-player"
import MusicPlayer04 from "@/registry/blocks/files-media/music-player/music-player-04/music-player"
import MusicPlayer05 from "@/registry/blocks/files-media/music-player/music-player-05/music-player"
import MusicPlayer06 from "@/registry/blocks/files-media/music-player/music-player-06/music-player"
import MusicPlayer07 from "@/registry/blocks/files-media/music-player/music-player-07/music-player"
import MusicPlayer08 from "@/registry/blocks/files-media/music-player/music-player-08/music-player"
import MusicPlayer09 from "@/registry/blocks/files-media/music-player/music-player-09/music-player"
import MusicPlayer10 from "@/registry/blocks/files-media/music-player/music-player-10/music-player"
import MusicPlayer11 from "@/registry/blocks/files-media/music-player/music-player-11/music-player"
import MusicPlayer12 from "@/registry/blocks/files-media/music-player/music-player-12/music-player"

import { blocksPageMetadata } from "@/lib/seo"

export const metadata = blocksPageMetadata(
  "/blocks/files-media/music-player",
  "Music Player",
  "Ready-to-use Music Player UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI."
)

const usage = (name: string) =>
  `import MusicPlayer from "@/components/blocks/files-media/${name}/music-player"

export default function Page() {
  return <MusicPlayer />
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
  { name: "music-player-01", Component: MusicPlayer01 },
  { name: "music-player-02", Component: MusicPlayer02 },
  { name: "music-player-03", Component: MusicPlayer03 },
  { name: "music-player-04", Component: MusicPlayer04 },
  { name: "music-player-05", Component: MusicPlayer05 },
  { name: "music-player-06", Component: MusicPlayer06 },
  { name: "music-player-07", Component: MusicPlayer07 },
  { name: "music-player-08", Component: MusicPlayer08 },
  { name: "music-player-09", Component: MusicPlayer09 },
  { name: "music-player-10", Component: MusicPlayer10 },
  { name: "music-player-11", Component: MusicPlayer11 },
  { name: "music-player-12", Component: MusicPlayer12 },
] as const

export default function BlockMusicPlayerDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <BlocksPageHeader
        title="Music Player"
        pathname="/blocks/files-media/music-player"
        description="Twelve audio players from minimal bar to neon EQ, waveform scrubber, lyrics, pastel, cover-forward, dock, One UI, and queue — separate from video Media Player."
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
