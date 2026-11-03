import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsInstallation,
  DocsPageHeader,
} from "@/components/docs"
import { withVariantCode } from "@/lib/docs-variant-examples"
import { componentDocsMetadata } from "@/lib/seo"

export const metadata = componentDocsMetadata("tweet-card", "Tweet Card")

const exampleDefs = [
  {
    name: "tweet-card-default",
    title: "Default",
    description:
      "Static card with the bundled `@_sonojs` avatar and Introducing SonoJS copy.",
  },
]

const usage = `import { TweetCard } from "@/components/tweet-card"

export default function Page() {
  return <TweetCard />
}`

export default async function TweetCardDocsPage() {
  const examples = await withVariantCode(exampleDefs)

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Tweet Card"
        pathname="/docs/components/tweet-card"
        description={
          <p className="leading-relaxed text-muted-foreground">
            A presentational tweet-style card. Pass your own{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              name
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              handle
            </code>
            ,{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              avatar
            </code>
            , and{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              text
            </code>
            — or use the SonoJS defaults.
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview
          examples={examples}
          previewSurface="canvas"
        />
      </section>

      <DocsInstallation name="tweet-card" />

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
              defaultValue: '"SonoJS"',
              description: "Display name.",
            },
            {
              name: "handle",
              type: "string",
              defaultValue: '"_sonojs"',
              description: "Handle without `@`.",
            },
            {
              name: "avatar",
              type: "string",
              defaultValue: "bundled avatar",
              description: "Profile image URL.",
            },
            {
              name: "text",
              type: "ReactNode",
              defaultValue: "Introducing SonoJS…",
              description: "Tweet body content.",
            },
            {
              name: "profileUrl",
              type: "string",
              defaultValue: '"https://x.com/_sonojs"',
              description: "Link for the avatar and name.",
            },
            {
              name: "href",
              type: "string",
              defaultValue: "Introducing post URL",
              description: "Link for the X icon.",
            },
            {
              name: "verified",
              type: "boolean",
              defaultValue: "true",
              description: "Show the verified badge.",
            },
            {
              name: "className",
              type: "string",
              description: "Extra classes on the card root.",
            },
          ]}
        />
      </section>
    </article>
  )
}
