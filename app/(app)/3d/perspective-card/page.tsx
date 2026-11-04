import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Perspective Card",
  description:
    "A floating photo card that tilts, shines, and parallax-scrolls with the pointer. Install with the SonoJS CLI.",
  path: "/3d/perspective-card",
})

const exampleDefs = [
  {
    name: "perspective-card-default",
    title: "Default",
    description:
      "Move the pointer across the page - the card tilts, floats, and the image drifts under a soft shine.",
  },
]

const usage = `"use client"

import { PerspectiveCard } from "@/components/3d/perspective-card"

export default function Page() {
  return (
    <PerspectiveCard
      image="/media/hero.jpg"
      width="320px"
      height="360px"
    />
  )
}`

export default async function PerspectiveCardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Perspective Card"
        pathname="/3d/perspective-card"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A pointer-driven card with 3D tilt, soft shadow, specular shine, and
            background parallax. Respects{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              prefers-reduced-motion
            </code>
            . A demo photo ships under{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              components/3d/perspective-card/images
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
        />
      </section>

      <DocsInstallation name="perspective-card" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "image",
              type: "string",
              defaultValue: "bundled demo",
              description: "Background image URL.",
            },
            {
              name: "width",
              type: "string",
              defaultValue: '"300px"',
              description: "Card width (CSS length).",
            },
            {
              name: "height",
              type: "string",
              defaultValue: '"350px"',
              description: "Card height (CSS length).",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
