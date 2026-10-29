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
  "image-generation",
  "Image Generation"
)

const exampleDefs = [
  {
    name: "image-generation-generating",
    title: "Generating",
    description:
      "Demo runs `generating` → `refining` → `complete` once. Pass media as `children`; it reveals when status reaches `complete`.",
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "image-generation-complete",
    title: "Complete",
    description:
      'Set `status="complete"` to reveal the image and clear the dither field.',
    npmRequires: ["lucide-react", "motion"],
  },
  {
    name: "image-generation-error",
    title: "Error",
    description: "Failed state with optional `onRetry`.",
    npmRequires: ["lucide-react", "motion"],
  },
]

const usageSource = `import {
  ImageGeneration,
  imageGenerationDemoSrc,
} from "@/components/ui/image-generation"

export function Example() {
  return (
    <ImageGeneration
      status="complete"
      prompt="Portrait study, ink stipple"
      resolution="1024 × 1024"
      aspectRatio="1 / 1"
    >
      <img
        src={imageGenerationDemoSrc}
        alt="Generated portrait"
      />
    </ImageGeneration>
  )
}`

export default async function ImageGenerationDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Image Generation"
        pathname="/docs/components/image-generation"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An image-generation state with dither progress and a completed
            result. Pass the finished media as{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              children
            </code>{" "}
            (img, Next Image, video, or a custom preview).
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="card" />
      </section>

      <DocsInstallation name="image-generation" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource
          title="image-generation.tsx"
          lang="tsx"
          code={usageSource}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "ReactNode",
              defaultValue: "—",
              description:
                "Completed media (img / Next Image / canvas / video / custom).",
            },
            {
              name: "status",
              type: "ImageGenerationStatus",
              defaultValue: '"generating"',
              description:
                "`queued` | `generating` | `refining` | `complete` | `error`.",
            },
            {
              name: "prompt",
              type: "string",
              defaultValue: "—",
              description: "Shown under the status line in quotes.",
            },
            {
              name: "resolution",
              type: "string",
              defaultValue: '"1024 × 1024"',
              description: "Badge in the media corner. Pass empty to hide.",
            },
            {
              name: "aspectRatio",
              type: 'CSSProperties["aspectRatio"]',
              defaultValue: '"1 / 1"',
              description: "Reserved frame size before media loads.",
            },
            {
              name: "size",
              type: '"compact" | "fluid"',
              defaultValue: '"compact"',
              description: "`compact` caps width at `max-w-52`.",
            },
            {
              name: "interactive",
              type: "boolean",
              defaultValue: "true",
              description:
                "Dither cluster follows fine-pointer movement when hover-capable.",
            },
            {
              name: "showStatus",
              type: "boolean",
              defaultValue: "true",
              description: "Toggle the status row under the frame.",
            },
            {
              name: "onRetry",
              type: "() => void",
              defaultValue: "—",
              description: "Shows Try again when `status` is `error`.",
            },
            {
              name: "className",
              type: "string",
              defaultValue: "—",
              description: "Merge classes on the root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
