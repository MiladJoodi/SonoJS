import { readFile } from "node:fs/promises"
import path from "node:path"

import { AccessGate } from "@/components/access/access-gate"
import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsPageHeader,
} from "@/components/docs"
import { ProArchiveDownload } from "@/components/pro"
import { withVariantCode } from "@/lib/docs-variant-examples"
import {
  getProComponentSource,
  GitHubProApiError,
  ProComponentNotFoundError,
} from "@/lib/github-pro"
import { componentDocsMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata = componentDocsMetadata("pro-button", "Pro Button")

const exampleDefs = [
  {
    name: "pro-button-default",
    title: "Variants",
    description:
      "`primary`, `secondary`, and `outline` - same control scale as Button.",
  },
]

const usageSource = `import { ProButton } from "@/components/pro/pro-button"

export function Example() {
  return <ProButton>Primary</ProButton>
}`

async function readProButtonSource() {
  return readFile(
    path.join(process.cwd(), "components/pro/pro-button.tsx"),
    "utf8"
  )
}

async function loadProArchive() {
  try {
    const source = await getProComponentSource("pro-button")
    if (!source.archive) return null
    return {
      filename: source.archive.split("/").pop() ?? "archive.zip",
      name: source.name,
    }
  } catch (err) {
    if (
      err instanceof ProComponentNotFoundError ||
      err instanceof GitHubProApiError
    ) {
      return null
    }
    return null
  }
}

export default async function ProButtonDocsPage() {
  const [examples, source, archive] = await Promise.all([
    withVariantCode(exampleDefs),
    readProButtonSource(),
    loadProArchive(),
  ])

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Pro Button"
        pathname="/docs/components/pro-button"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Test Pro component - preview is public; source is Pro-gated. Optional
            zip download when an archive is set in{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              sonojs-pro
            </code>
            .
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      {archive ? (
        <section className="space-y-3">
          <h2 className="text-h3">Installation</h2>
          <AccessGate access="pro">
            <ProArchiveDownload
              slug="pro-button"
              filename={archive.filename}
              title={archive.name}
            />
          </AccessGate>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <AccessGate access="pro">
          <ComponentSource title="usage.tsx" lang="tsx" code={usageSource} />
        </AccessGate>
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Source</h2>
        <AccessGate access="pro">
          <ComponentSource title="pro-button.tsx" lang="tsx" code={source} />
        </AccessGate>
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Props</h2>
        <DocsApiProps
          rows={[
            {
              name: "variant",
              type: '"primary" | "secondary" | "outline"',
              defaultValue: '"primary"',
              description: "Visual style of the button.",
            },
            {
              name: "…props",
              type: "ButtonHTMLAttributes",
              description: "Native button attributes are forwarded.",
            },
          ]}
        />
      </section>
    </article>
  )
}
