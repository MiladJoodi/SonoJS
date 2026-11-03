import { AccessGate } from "@/components/access/access-gate"
import {
  ComponentSource,
  ComponentVariantPreview,
  DocsApiProps,
  DocsPageHeader,
} from "@/components/docs"
import { ProArchiveDownload } from "@/components/pro"
import { canAccessContent } from "@/lib/access-server"
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
      "`primary`, `secondary`, and `outline` — same control scale as Button.",
  },
]

const usageSource = `import { ProButton } from "@/components/pro/pro-button"

export function Example() {
  return <ProButton>Primary</ProButton>
}`

async function loadProMeta() {
  try {
    const source = await getProComponentSource("pro-button")
    return { ok: true as const, source }
  } catch (err) {
    if (err instanceof ProComponentNotFoundError) {
      return { ok: false as const, error: err.message }
    }
    if (err instanceof GitHubProApiError) {
      return { ok: false as const, error: err.message }
    }
    return {
      ok: false as const,
      error: err instanceof Error ? err.message : "Failed to load Pro meta",
    }
  }
}

export default async function ProButtonDocsPage() {
  const examples = await withVariantCode(exampleDefs)
  const canViewSource = await canAccessContent("pro")
  const loaded = canViewSource ? await loadProMeta() : null
  const archiveName =
    loaded?.ok && loaded.source.archive
      ? (loaded.source.archive.split("/").pop() ?? "archive.zip")
      : "archive.zip"

  return (
    <article className="w-full min-w-0 space-y-10">
      <DocsPageHeader
        title="Pro Button"
        pathname="/docs/components/pro-button"
        description={
          <p className="leading-relaxed text-muted-foreground">
            Test Pro component — download the ready zip from the private{" "}
            <code className="rounded-md border border-border/70 bg-muted/50 px-1 py-0.5 font-mono text-[0.9em]">
              sonojs-pro
            </code>{" "}
            registry (manual install, no CLI).
          </p>
        }
      />

      <section className="space-y-4">
        <ComponentVariantPreview examples={examples} />
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Installation</h2>
        <AccessGate access="pro">
          {loaded?.ok && loaded.source.archive ? (
            <ProArchiveDownload
              slug="pro-button"
              filename={archiveName}
              title={loaded.source.name}
            />
          ) : (
            <div className="sono-code-block px-4 py-3 font-mono text-[14px] leading-[1.65] text-(--code-header-fg)">
              <p className="text-(--code-fg)">Could not resolve Pro archive</p>
              <p className="mt-1">
                {loaded && !loaded.ok
                  ? loaded.error
                  : "Registry entry has no archive field."}
              </p>
            </div>
          )}
        </AccessGate>
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Usage</h2>
        <AccessGate access="pro">
          <ComponentSource
            title="pro-button.tsx"
            lang="tsx"
            code={usageSource}
          />
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
