import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata(
  "image-generation-2",
  "Image Generation 2"
)

const exampleDefs = [
  {
    name: "image-generation-2-default",
    title: "Default",
    description:
      "Self-paced grid split with a caption. Pass `src`; the photo reveals once when ready.",
    npmRequires: ["motion"],
  },
  {
    name: "image-generation-2-revealed",
    title: "Revealed",
    description:
      "Same orb without a caption and a shorter `estimatedDuration` so the settle reads faster.",
    npmRequires: ["motion"],
  },
]

const usageSource = `import {
  GridReveal,
  imageGeneration2DemoSrc,
} from "@/components/sonojs/image-generation-2"

export function Example() {
  return (
    <GridReveal
      src={imageGeneration2DemoSrc}
      alt="Generated portrait"
      caption="Generating image…"
      estimatedDuration={6000}
      aspect={1}
    />
  )
}`

export default async function ImageGeneration2DocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Generation 2"
        pathname="/docs/components/image-generation-2"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An animated loading state that reveals an AI-generated image when
            it is ready — canvas grid split, optional caption shimmer, then the
            photo.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="image-generation-2" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="image-generation-2.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "src",
              type: "string | null",
              defaultValue: "—",
              description:
                "Image URL. Arrival finishes the reveal; omit while waiting.",
            },
            {
              name: "alt",
              type: "string",
              defaultValue: '""',
              description: "Accessible label on the canvas when set.",
            },
            {
              name: "progress",
              type: "number",
              defaultValue: "self-paced",
              description:
                "0–1 controlled progress. Omit to use `estimatedDuration`.",
            },
            {
              name: "aspect",
              type: "number",
              defaultValue: "1",
              description: "Width / height ratio for the frame.",
            },
            {
              name: "caption",
              type: "string",
              defaultValue: "—",
              description: "Shimmer status chip; fades out when revealed.",
            },
            {
              name: "estimatedDuration",
              type: "number",
              defaultValue: "6000",
              description: "Self-paced wait length in ms when `progress` is omitted.",
            },
            {
              name: "onRevealComplete",
              type: "() => void",
              defaultValue: "—",
              description: "Fires once when the photo settle finishes.",
            },
            {
              name: "onError",
              type: "() => void",
              defaultValue: "—",
              description: "Fires if the image fails to load (after CORS retry).",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the root frame.",
            },
          ]}
        />
      </section>
    </article>
  )
}
