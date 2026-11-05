import { ComponentSource } from "@/components/docs"
import { docsGuideMetadata } from "@/lib/seo"

export const metadata = docsGuideMetadata(
  "/docs/tips",
  "Tips",
  "Practical notes and common gotchas when installing and using SonoJS components."
)

export default function TipsDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">Tips</h1>
        <p className="leading-relaxed text-muted-foreground">
          Short notes from real setup issues — path aliases, installs, and
          things that break quietly until TypeScript complains.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-h3">Enable the `@/` path alias</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Installed files import with{" "}
          <code className="sono-inline-code">@/…</code> (for example{" "}
          <code className="sono-inline-code">@/components/ui/button</code>
          ). If that alias is missing, TypeScript reports{" "}
          <code className="sono-inline-code">Cannot find module &apos;@/…&apos;</code>
          {" "}even though the file is on disk.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          In <code className="sono-inline-code">tsconfig.json</code> (or{" "}
          <code className="sono-inline-code">jsconfig.json</code>), set{" "}
          <code className="sono-inline-code">baseUrl</code> and map{" "}
          <code className="sono-inline-code">@/*</code> to the project root:
        </p>
        <ComponentSource
          title="tsconfig.json"
          lang="json"
          code={`{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
        />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Next.js apps created with{" "}
          <code className="sono-inline-code">create-next-app</code> usually
          already have this. If you started from a custom template, add it
          before (or right after){" "}
          <code className="sono-inline-code">npx @sonojs/ui@latest add …</code>.
          Restart the TypeScript server / dev process if the editor still
          underlines imports after saving.
        </p>
      </section>
    </article>
  )
}
