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
  title: "Hanging Id Card",
  description:
    "Pendulum ID badge on a lanyard with drag, flick, and gravity physics. Install with the SonoJS CLI.",
  path: "/3d/hanging-id-card",
})

const exampleDefs = [
  {
    name: "hanging-id-card-default",
    title: "Default",
    description:
      "Drag sideways to swing, or click when settled for a soft impulse. Respects `prefers-reduced-motion`.",
  },
]

const usage = `"use client"

import { HangingIdCard } from "@/components/3d/hanging-id-card"

export default function Page() {
  return (
    <div className="flex justify-center px-4 py-10">
      <HangingIdCard showHint />
    </div>
  )
}`

export default async function HangingIdCardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Hanging Id Card"
        pathname="/3d/hanging-id-card"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Ceiling-anchored lanyard badge with realistic pendulum physics -
            drag to swing, release with inertia, or tap for a nudge. Pass{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              children
            </code>{" "}
            to replace the default badge face.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="card"
          previewClassName="p-0"
        />
      </section>

      <DocsInstallation name="hanging-id-card" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="page.tsx" lang="tsx" code={usage} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "name",
              type: "string",
              defaultValue: '"Alex Rivera"',
              description: "Badge display name (default face).",
            },
            {
              name: "role",
              type: "string",
              defaultValue: '"Product Designer"',
              description: "Title under the name.",
            },
            {
              name: "badgeId",
              type: "string",
              defaultValue: '"ID-84920"',
              description: "Monospace ID under the barcode.",
            },
            {
              name: "accentColor",
              type: "string",
              defaultValue: '"#2563EB"',
              description: "Header gradient start, ID text, and status chip.",
            },
            {
              name: "company",
              type: "string",
              defaultValue: '"SonoJS"',
              description: "Small uppercase label above the avatar.",
            },
            {
              name: "ropeLength",
              type: "number",
              defaultValue: "120",
              description:
                "Lanyard strap length (auto-shrinks on narrow screens).",
            },
            {
              name: "ropeColor",
              type: "string",
              defaultValue: '"#18181b"',
              description: "Strap fill color.",
            },
            {
              name: "showHint",
              type: "boolean",
              defaultValue: "false",
              description: "Show “Drag to swing · click to nudge” under the badge.",
            },
            {
              name: "className",
              type: "string",
              description: "Classes on the outer stage.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Custom card face (replaces the default badge body).",
            },
          ]}
        />
      </section>
    </article>
  )
}
