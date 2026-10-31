import { AccessGate } from "@/components/access/access-gate"
import {
  DocsApiProps,
  DocsPageHeader,
} from "@/components/docs"
import { ProArchiveDownload, ProButton } from "@/components/pro"
import { canAccessContent } from "@/lib/access-server"
import {
  getProComponentSource,
  GitHubProApiError,
  ProComponentNotFoundError,
} from "@/lib/github-pro"
import { componentDocsMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata = componentDocsMetadata("pro-button", "Pro Button")

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
            <code className="text-foreground">sonojs-pro</code> registry
            (manual install, no CLI).
          </p>
        }
      />

      <section className="space-y-3">
        <h2 className="text-h3">Preview</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft">
          <ProButton>Primary</ProButton>
          <ProButton variant="secondary">Secondary</ProButton>
          <ProButton variant="outline">Outline</ProButton>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-h3">Download</h2>
        <AccessGate access="pro">
          {loaded?.ok && loaded.source.archive ? (
            <ProArchiveDownload
              slug="pro-button"
              filename={archiveName}
              title={loaded.source.name}
            />
          ) : (
            <div className="sono-code-block p-4 text-sm text-(--code-fg)">
              <p className="font-medium">Could not resolve Pro archive</p>
              <p className="mt-1 text-(--code-header-fg)">
                {loaded && !loaded.ok
                  ? loaded.error
                  : "Registry entry has no archive field."}
              </p>
              <p className="mt-3 text-(--code-header-fg)">
                Expected in private repo:{" "}
                <code>components/buttons/01/01.zip</code>
              </p>
            </div>
          )}
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
