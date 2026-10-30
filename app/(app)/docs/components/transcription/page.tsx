import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("transcription", "Transcription")

const exampleDefs = [
  {
    name: "transcription-default",
    title: "Synced playback",
    description:
      "Play the audio and watch segments highlight by `currentTime`. Click a word to seek via `onSeek`.",
  },
]

const usageSource = `import {
  Transcription,
  TranscriptionSegment,
  transcriptionDemoSrc,
} from "@/components/sonojs/transcription"

export function Example({
  segments,
  currentTime,
  onSeek,
}: {
  segments: { text: string; startSecond: number; endSecond: number }[]
  currentTime: number
  onSeek: (time: number) => void
}) {
  return (
    <>
      <audio controls src={transcriptionDemoSrc} />
      <Transcription
        currentTime={currentTime}
        onSeek={onSeek}
        segments={segments}
      >
        {(segment, index) => (
          <TranscriptionSegment
            key={\`\${segment.startSecond}-\${segment.endSecond}\`}
            index={index}
            segment={segment}
          />
        )}
      </Transcription>
    </>
  )
}`

export default async function TranscriptionDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Transcription"
        pathname="/docs/components/transcription"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Interactive, time-synced transcript segments with click-to-seek —
            render-props root plus styled segment buttons.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="transcription" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="transcription.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "segments",
              type: "TranscriptionSegment[]",
              description:
                "Timed text segments (`text`, `startSecond`, `endSecond`). Empty text is filtered out.",
            },
            {
              name: "currentTime",
              type: "number",
              defaultValue: "0",
              description: "Playback position in seconds (controlled).",
            },
            {
              name: "onSeek",
              type: "(time: number) => void",
              description:
                "Called when a segment is clicked (seek to `startSecond`). Enables pointer styling.",
            },
            {
              name: "children",
              type: "(segment, index) => ReactNode",
              description:
                "Render prop for each non-empty segment — typically `TranscriptionSegment`.",
            },
          ]}
        />
      </section>
    </article>
  )
}
