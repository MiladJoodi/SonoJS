import { AgentPromptCard, ComponentSource } from "@/components/docs"
import { siteConfig } from "@/lib/config"
import { docsGuideMetadata } from "@/lib/seo"

export const metadata = docsGuideMetadata(
  "/docs/mcp",
  "MCP Server",
  "Connect Cursor, Claude, Codex, and other MCP clients so agents can discover SonoJS registry items the same way the CLI does."
)

export default function McpDocsPage() {
  return (
    <article className="w-full min-w-0 space-y-8">
      <header className="space-y-3">
        <h1 className="text-h1">MCP Server</h1>
        <p className="leading-relaxed text-muted-foreground">
          SonoJS ships an MCP stdio server inside{" "}
          <code className="sono-inline-code">@sonojs/ui</code>. Agents can list,
          search, and inspect registry items, then get the exact{" "}
          <code className="sono-inline-code">add</code> command — no silent file
          writes.
        </p>
      </header>

      <AgentPromptCard />

      <section className="space-y-4">
        <h2 className="text-h3">Init</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Auto-detects MCP clients in the project and home directory, then
          upserts a merge-safe <code className="sono-inline-code">sonojs</code>{" "}
          server entry. If nothing is detected, writes Cursor{" "}
          <code className="sono-inline-code">.cursor/mcp.json</code> by default.
        </p>
        <ComponentSource
          title="Terminal"
          lang="bash"
          code={siteConfig.mcpInitCommand}
        />
        <ComponentSource
          title="Flags"
          lang="bash"
          code={`npx @sonojs/ui@latest mcp init --dry-run
npx @sonojs/ui@latest mcp init --client cursor
npx @sonojs/ui@latest mcp init --all`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">What gets written</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Launch command in every client config:
        </p>
        <ComponentSource
          title="mcp.json (Cursor / Claude)"
          lang="json"
          code={`{
  "mcpServers": {
    "sonojs": {
      "command": "npx",
      "args": ["-y", "@sonojs/ui@latest", "mcp"]
    }
  }
}`}
        />
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong>Cursor</strong> — project{" "}
            <code className="sono-inline-code">.cursor/mcp.json</code>
          </li>
          <li>
            <strong>VS Code / Copilot</strong> — project{" "}
            <code className="sono-inline-code">.vscode/mcp.json</code>
          </li>
          <li>
            <strong>Claude Desktop</strong> — user{" "}
            <code className="sono-inline-code">claude_desktop_config.json</code>
          </li>
          <li>
            <strong>Claude Code</strong> — project{" "}
            <code className="sono-inline-code">.mcp.json</code>
          </li>
          <li>
            <strong>Codex</strong> —{" "}
            <code className="sono-inline-code">~/.codex/config.toml</code>
          </li>
          <li>
            <strong>Windsurf</strong> — Windsurf MCP config under{" "}
            <code className="sono-inline-code">~/.codeium/windsurf/</code>
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Only the <code className="sono-inline-code">sonojs</code> key is
          upserted; other servers are left alone. Re-running is idempotent (
          <code className="sono-inline-code">~ already configured</code>).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Tools</h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            <code className="sono-inline-code">list_components</code> — registry
            index (name, title, type)
          </li>
          <li>
            <code className="sono-inline-code">search_components</code> — filter
            by query
          </li>
          <li>
            <code className="sono-inline-code">get_component</code> — summary,
            deps, file list
          </li>
          <li>
            <code className="sono-inline-code">get_add_command</code> — exact{" "}
            <code className="sono-inline-code">npx @sonojs/ui@latest add …</code>{" "}
            plus Also-needs style npm hint
          </li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Registry URL follows{" "}
          <code className="sono-inline-code">SONOJS_REGISTRY</code> /{" "}
          <code className="sono-inline-code">--registry</code> (default{" "}
          <code className="sono-inline-code">https://sonojs.com/r</code>).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Verify</h2>
        <ol className="list-decimal space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>
            Run <code className="sono-inline-code">mcp init</code> in your app
            root.
          </li>
          <li>Reload MCP in the client (see tips below).</li>
          <li>
            Ask the agent to list or search SonoJS components, or call{" "}
            <code className="sono-inline-code">get_add_command</code> for{" "}
            <code className="sono-inline-code">button</code>.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-h3">Reload tips</h2>
        <ul className="list-disc space-y-2 ps-5 text-sm leading-relaxed text-muted-foreground">
          <li>Cursor — Settings → MCP, or restart Cursor</li>
          <li>VS Code — reload the window</li>
          <li>Claude Desktop — fully quit and reopen</li>
          <li>Codex / Windsurf / Claude Code — restart the client</li>
        </ul>
      </section>
    </article>
  )
}
