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
  title: "Smokey Frame",
  description:
    "A WebGL edge of animated smoke that can wrap any content. Install with the SonoJS CLI.",
  path: "/3d/smokey-frame",
})

const exampleDefs = [
  {
    name: "smokey-frame-default",
    title: "Default",
    description:
      "Procedural smoke along the border. Move the pointer to push the field. Preview stage is black so the emission reads clearly.",
  },
]

const usage = `"use client"

import { SmokeyFrame } from "@/components/3d/smokey-frame"

export default function Page() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[12px] bg-black">
      <SmokeyFrame
        className="h-full w-full"
        frameColor="#2563EB"
        frameWidth={0.3}
        interactive
      >
        <p className="text-sm text-white/80">Your content</p>
      </SmokeyFrame>
    </div>
  )
}`

export default async function SmokeyFrameDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Smokey Frame"
        pathname="/3d/smokey-frame"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A WebGL smoke rim with noise, falloff, and optional pointer
            turbulence. Defaults to SonoJS primary blue. Respects{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              prefers-reduced-motion
            </code>
            . This docs preview uses a black stage so the glow stays visible.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="bg-black p-0"
        />
      </section>

      <DocsInstallation name="smokey-frame" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "frameColor",
              type: "string",
              defaultValue: '"#2563EB"',
              description: "Smoke / emission color (hex or rgb).",
            },
            {
              name: "frameBgColor",
              type: "string",
              description:
                "Interior fill when `transparentBg` is false. Defaults from light/dark html class.",
            },
            {
              name: "transparentBg",
              type: "boolean",
              defaultValue: "true",
              description: "Leave the center transparent for slotted content.",
            },
            {
              name: "frameWidth",
              type: "number",
              defaultValue: "0.3",
              description: "Normalized rim thickness from the edge (0.01–0.5).",
            },
            {
              name: "speed",
              type: "number",
              defaultValue: "0.15",
              description: "Smoke animation speed.",
            },
            {
              name: "falloff",
              type: "number",
              defaultValue: "6",
              description: "Edge sharpness exponent.",
            },
            {
              name: "noiseScale",
              type: "number",
              defaultValue: "3",
              description: "Noise granularity.",
            },
            {
              name: "noiseStrength",
              type: "number",
              defaultValue: "1",
              description: "How much noise modulates the rim (0–1).",
            },
            {
              name: "intensity",
              type: "number",
              defaultValue: "1.2",
              description: "Emission brightness.",
            },
            {
              name: "gamma",
              type: "number",
              defaultValue: "2",
              description: "Contrast curve.",
            },
            {
              name: "opacity",
              type: "number",
              defaultValue: "1",
              description: "Overall canvas opacity.",
            },
            {
              name: "interactive",
              type: "boolean",
              defaultValue: "true",
              description: "Pointer displaces the smoke field.",
            },
            {
              name: "glow",
              type: "boolean",
              defaultValue: "true",
              description: "Soft radial glow behind the frame.",
            },
            {
              name: "glowBlur",
              type: "number",
              defaultValue: "36",
              description: "Glow blur in px.",
            },
            {
              name: "glowOpacity",
              type: "number",
              defaultValue: "0.45",
              description: "Glow opacity.",
            },
            {
              name: "radius",
              type: "string | number",
              defaultValue: '"12px"',
              description: "Corner radius.",
            },
            {
              name: "dpr",
              type: "number",
              defaultValue: "2",
              description: "Max device pixel ratio.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Content centered over the transparent interior.",
            },
            {
              name: "className",
              type: "string",
              description: "Outer wrapper classes.",
            },
            {
              name: "canvasClassName",
              type: "string",
              description: "Canvas element classes.",
            },
          ]}
        />
      </section>
    </article>
  )
}
