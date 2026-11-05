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
  "progressive-blur",
  "Progressive Blur"
)

const exampleDefs = [
  {
    name: "progressive-blur-default",
    title: "Default",
    description:
      "Bottom-edge fade over a scrollable list — `position=\"bottom\"` and `height=\"40%\"`.",
    requires: ["scroll-area"],
  },
]

const usageSource = `"use client"

import { ProgressiveBlur } from "@/components/progressive-blur"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ProgressiveBlurDemo() {
  return (
    <div className="relative w-full overflow-hidden rounded-[12px] border border-border/70">
      <ScrollArea className="relative h-[400px] overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="flex h-20 w-full items-center justify-center rounded-[12px] border border-border/70 bg-card"
            >
              {index}
            </div>
          ))}
        </div>
        <ProgressiveBlur position="bottom" height="40%" />
      </ScrollArea>
    </div>
  )
}`

export default async function ProgressiveBlurDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Progressive Blur"
        pathname="/docs/components/progressive-blur"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Layered backdrop blur that softens the edge of scrollable content —
            place it inside a relative overflow container and pick{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              top
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              bottom
            </code>
            , or{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              both
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="progressive-blur" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "className",
              type: "string",
              description: "Extra classes on the blur overlay container.",
            },
            {
              name: "height",
              type: "string",
              defaultValue: '"30%"',
              description:
                "Height of the blur band when position is top or bottom.",
            },
            {
              name: "position",
              type: '"top" | "bottom" | "both"',
              defaultValue: '"bottom"',
              description: "Which edge(s) receive the progressive blur.",
            },
            {
              name: "blurLevels",
              type: "number[]",
              defaultValue: "[0.5, 1, 2, 4, 8, 16, 32, 64]",
              description: "Blur radii in px for each stacked layer.",
            },
            {
              name: "children",
              type: "React.ReactNode",
              description: "Optional content rendered inside the blur overlay.",
            },
          ]}
        />
      </section>
    </article>
  )
}
