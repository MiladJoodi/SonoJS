import { ComponentSource } from "@/components/docs"
import { siteConfig } from "@/lib/config"
import { docsGuideMetadata } from "@/lib/seo"

export const metadata = docsGuideMetadata(
  "/docs/mcp",
  "MCP Server",
  "Connect your MCP client so agents can discover and use SonoJS the same way the CLI does."
)

export default function McpDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">MCP Server</h1>
        <p className="leading-relaxed text-muted-foreground">
          Connect your MCP client so agents can discover and use SonoJS the same
          way the CLI does.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-h3">Init</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Registers the SonoJS MCP server with your client config.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={siteConfig.mcpInitCommand}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">What it enables</h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>Look up components and install commands</li>
          <li>Match docs guidance with what{" "}
            <code className="sono-inline-code">add</code> actually ships</li>
          <li>Keep agent workflows aligned with the public registry</li>
        </ul>
      </section>
    </article>
  )
}
