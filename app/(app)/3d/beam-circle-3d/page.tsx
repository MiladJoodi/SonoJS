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
  title: "3D Beam Circle",
  description:
    "SVG orbital arcs with traveling badges - semi or full circle, no WebGL. Install with the SonoJS CLI.",
  path: "/3d/beam-circle-3d",
})

const exampleDefs = [
  {
    name: "beam-circle-3d-default",
    title: "Default",
    description:
      "Semi-circle arcs with shipped tech marks (React, TypeScript, Tailwind) and a Next.js hub. Icons install under `icons/`.",
  },
]

const usage = `"use client"

import {
  BeamCircle3D,
  NextjsIcon,
  ReactIcon,
} from "@/components/3d/beam-circle-3d"

export default function Page() {
  return (
    <BeamCircle3D
      className="aspect-[8/3] w-full"
      mode="semi-circle"
      centerGlow
      centerNodeSize={48}
      centerContent={<NextjsIcon size={44} />}
      orbits={[
        {
          id: 0,
          radiusFactor: 0.28,
          speed: 12,
          size: 44,
          children: <ReactIcon size={38} />,
        },
      ]}
    />
  )
}`

export default async function BeamCircle3DDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="3D Beam Circle"
        pathname="/3d/beam-circle-3d"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Concentric elliptical orbits with glowing traveler badges. No Three.js
            - SVG paths plus a lightweight animation loop. Sibling of{" "}
            <a
              href="/3d/beam-circle"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Beam Circle
            </a>{" "}
            (icon rings with motion).
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="items-end justify-center px-4 pt-6 pb-0 sm:px-6 sm:pt-8"
        />
      </section>

      <DocsInstallation name="3d-beam-circle" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "mode",
              type: '"semi-circle" | "full-circle"',
              defaultValue: '"semi-circle"',
              description: "Half-dome from the bottom, or full rings.",
            },
            {
              name: "orbits",
              type: "BeamOrbitConfig[]",
              defaultValue: "bundled demo",
              description:
                "Per-orbit radius, speed, colors, direction, and optional badge children.",
            },
            {
              name: "orbitDirection",
              type: '"cw" | "ccw"',
              defaultValue: '"cw"',
              description: "Default travel direction for all orbits.",
            },
            {
              name: "showArcs",
              type: "boolean",
              defaultValue: "true",
              description: "Draw the orbit path strokes.",
            },
            {
              name: "centerContent",
              type: "ReactNode",
              description: "Node at the orbit origin.",
            },
            {
              name: "centerGlow",
              type: "boolean",
              defaultValue: "true",
              description: "Soft glow behind the center node.",
            },
            {
              name: "animationPaused",
              type: "boolean",
              defaultValue: "false",
              description: "Freeze all travelers.",
            },
            {
              name: "speedMultiplier",
              type: "number",
              defaultValue: "1",
              description: "Global speed scale.",
            },
            {
              name: "viewBoxWidth",
              type: "number",
              defaultValue: "800",
              description: "SVG viewBox width.",
            },
            {
              name: "viewBoxHeight",
              type: "number",
              defaultValue: "440",
              description: "SVG viewBox height.",
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
