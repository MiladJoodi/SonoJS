import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("lens", "Lens")

const exampleDefs = [
  {
    name: "lens-default",
    title: "Default",
    description:
      "Hover the image to magnify under the cursor. `zoomFactor={2}` and `lensSize={150}`.",
    requires: ["card", "button"],
  },
  {
    name: "lens-static",
    title: "Static",
    description:
      "`isStatic` keeps the lens fixed at `position` — useful for marketing frames.",
    requires: ["card", "button"],
  },
  {
    name: "lens-default-position",
    title: "Default position",
    description:
      "`defaultPosition` shows a lens until hover, then the magnifier follows the pointer.",
    requires: ["card", "button"],
  },
]

const usageSource = `import { Lens } from "@/components/lens"

export function Example() {
  return (
    <Lens zoomFactor={2} lensSize={150}>
      <img src="/images/lens-demo.jpg" alt="Lens demo" />
    </Lens>
  )
}`

export default async function LensDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Lens"
        pathname="/docs/components/lens"
        description={
          <p className="leading-relaxed text-muted-foreground">
            An interactive magnifier for images, videos, and other elements —
            follow the pointer, stay static, or start from a default spot.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <DocsInstallation name="lens" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="lens.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "children",
              type: "React.ReactNode",
              description: "Content magnified by the lens.",
            },
            {
              name: "zoomFactor",
              type: "number",
              defaultValue: "1.3",
              description: "Magnification scale (must be greater than 1).",
            },
            {
              name: "lensSize",
              type: "number",
              defaultValue: "170",
              description: "Lens diameter in pixels.",
            },
            {
              name: "position",
              type: "{ x: number; y: number }",
              description: "Controlled lens position (required when static).",
            },
            {
              name: "defaultPosition",
              type: "{ x: number; y: number }",
              description: "Initial lens position before hover.",
            },
            {
              name: "isStatic",
              type: "boolean",
              defaultValue: "false",
              description: "Keep the lens fixed instead of following the pointer.",
            },
            {
              name: "duration",
              type: "number",
              defaultValue: "0.1",
              description: "Enter/exit animation duration in seconds.",
            },
            {
              name: "lensColor",
              type: "string",
              defaultValue: '"black"',
              description: "Mask fill color used for the circular lens.",
            },
            {
              name: "ariaLabel",
              type: "string",
              defaultValue: '"Zoom Area"',
              description: "Accessible label for the lens region.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the root wrapper.",
            },
          ]}
        />
      </section>
    </article>
  )
}
