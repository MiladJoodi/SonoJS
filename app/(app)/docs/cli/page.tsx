import { ComponentSource } from "@/components/docs"
import { siteConfig } from "@/lib/config"
import { docsGuideMetadata } from "@/lib/seo"

export const metadata = docsGuideMetadata(
  "/docs/cli",
  "CLI",
  "SonoJS copy-source CLI — init the design system and add components with npx @sonojs/ui."
)

export default function CliDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">CLI</h1>
        <p className="leading-relaxed text-muted-foreground">
          Copy-source tooling. Run via{" "}
          <code className="sono-inline-code">npx @sonojs/ui@latest</code>.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-h3">init</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Scaffolds utils, direction helpers, styles, and baseline npm packages.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest init`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">add</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Installs one or more registry items, their nested registry deps, then
          runs <code className="sono-inline-code">npm i</code> for missing
          packages.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={`npx @sonojs/ui@latest add button
npx @sonojs/ui@latest add button card calendar`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Options</h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <code className="sono-inline-code">--cwd</code> — project directory
          </li>
          <li>
            <code className="sono-inline-code">--registry</code> — registry URL
            or local path (default:{" "}
            <code className="sono-inline-code">{siteConfig.url}/r</code>)
          </li>
          <li>
            <code className="sono-inline-code">--overwrite</code> — replace
            existing files
          </li>
        </ul>
      </section>
    </article>
  )
}
