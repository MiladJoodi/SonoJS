import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
  DocsRelated,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"

import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("card", "Card")

const exampleDefs = [
  {
    name: "card-image",
    title: "Image",
    description: "Place an image before the header for a media card.",
    requires: ["badge", "button"],
  },
  {
    name: "card-image-overlay",
    title: "Image overlay",
    description:
      "Dim and grade the image with an overlay for text-heavy media cards.",
    requires: ["badge", "button"],
  },
  {
    name: "card-default",
    title: "Default",
    description:
      "A login card with header, action, form content, and footer actions.",
    requires: ["button", "input", "label"],
  },
  {
    name: "card-small",
    title: "Small",
    description: 'Use `size="sm"` for a more compact card.',
    requires: ["button"],
  },
  {
    name: "card-spacing",
    title: "Spacing",
    description:
      "Override `--card-spacing` to control inset and gaps between sections.",
    requires: ["button", "input", "label", "toggle-group"],
  },
  {
    name: "card-edge-to-edge",
    title: "Edge to Edge",
    description:
      "Use negative margins with `-mx-(--card-spacing)` for full-bleed content.",
    requires: ["button"],
  },
]

const usageSource = `import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}`

export default async function CardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Card"
        pathname="/docs/components/card"
        description={
          <div className="space-y-3 leading-relaxed text-muted-foreground">
            <p>
              Elevated surface for forms, pricing, and feature blocks. Compose
              with header, content, footer, and optional action slots —
              including image, overlay, and edge-to-edge layouts.
            </p>
            <p>
              Default radius and{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                shadow-soft
              </code>{" "}
              match SonoJS marketing and dashboard panels. Use{" "}
              <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
                size=&quot;sm&quot;
              </code>{" "}
              for denser admin UIs.
            </p>
          </div>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} previewSurface="canvas" />
      </section>

      <DocsInstallation name="card" />

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <ComponentSource title="card.tsx" lang="tsx" code={usageSource} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "size",
              type: '"default" | "sm"',
              defaultValue: '"default"',
              description:
                "Card density. Small uses tighter --card-spacing and title size.",
            },
          ]}
        />
      </section>

      <DocsRelated
        links={[
          {
            href: "/docs/components/button",
            title: "Button",
            description: "actions in card footers and headers",
          },
          {
            href: "/docs/components/badge",
            title: "Badge",
            description: "status chips on media cards",
          },
          {
            href: "/docs/components/field",
            title: "Field",
            description: "form fields inside card content",
          },
          {
            href: "/blocks/marketing/offer-card",
            title: "Offer Card blocks",
            description: "ready marketing card layouts",
          },
        ]}
      />
    </article>
  )
}
