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
  title: "Orbiting Circles",
  description:
    "CSS-driven icon orbits with optional path rings, reverse, and speed. Install with the SonoJS CLI.",
  path: "/3d/orbiting-circles",
})

const exampleDefs = [
  {
    name: "orbiting-circles-default",
    title: "Default",
    description:
      "Two rings — outer clockwise and inner reverse at higher speed. Compose any children as orbiting nodes.",
  },
]

const usage = `"use client"

import {
  GitHubIcon,
  GoogleIcon,
  NextjsIcon,
  NotionIcon,
  OpenAIIcon,
  OrbitingCircles,
  ReactIcon,
  TypescriptIcon,
  VercelIcon,
} from "@/components/3d/orbiting-circles"

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
      <OrbitingCircles iconSize={40}>
        <GitHubIcon />
        <GoogleIcon />
        <OpenAIIcon />
        <VercelIcon />
        <NotionIcon />
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={2}>
        <ReactIcon />
        <NextjsIcon />
        <TypescriptIcon />
        <GitHubIcon />
      </OrbitingCircles>
    </div>
  )
}`

export default async function OrbitingCirclesDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Orbiting Circles"
        pathname="/3d/orbiting-circles"
        description={
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              Place icons (or any nodes) on a circular path that rotates with
              pure CSS. Nest multiple rings for layered motion — flip{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                reverse
              </code>{" "}
              and tune{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                speed
              </code>{" "}
              /{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                radius
              </code>
              .
            </p>
            <p>
              Animation keyframes ship in{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                orbiting-circles.css
              </code>{" "}
              next to the component — not in your global stylesheet. Respects{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                prefers-reduced-motion
              </code>
              .
            </p>
          </div>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="transparent"
        />
      </section>

      <DocsInstallation name="orbiting-circles" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "ReactNode",
              description: "Orbiting nodes — evenly spaced around the ring.",
            },
            {
              name: "radius",
              type: "number",
              defaultValue: "160",
              description: "Orbit radius in pixels.",
            },
            {
              name: "iconSize",
              type: "number",
              defaultValue: "30",
              description: "Width/height of each orbiting slot in pixels.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "20",
              description: "Base seconds per full rotation (before speed).",
            },
            {
              name: "speed",
              type: "number",
              defaultValue: "1",
              description: "Divides duration — higher is faster.",
            },
            {
              name: "reverse",
              type: "boolean",
              defaultValue: "false",
              description: "Reverse animation direction.",
            },
            {
              name: "path",
              type: "boolean",
              defaultValue: "true",
              description: "Draw the faint circular guide path.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on each orbiting slot.",
            },
          ]}
        />
      </section>
    </article>
  )
}
