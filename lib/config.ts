import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

const LOCAL_APP_URL = "http://localhost:3000"

function resolveAppUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")
  if (process.env.NODE_ENV === "production") return PRODUCTION_ORIGIN
  return LOCAL_APP_URL
}

export type SiteNavItem = {
  href: string
  label: string
  external?: boolean
}

export const siteConfig = {
  name: "SonoJS",
  url: resolveAppUrl(),
  description:
    "React components, blocks, charts, and cursors for Tailwind apps. Add with the SonoJS CLI or generate UI via MCP.",
  /** One-command MCP client setup (auto-detect + merge-safe `sonojs` entry). */
  mcpInitCommand: "npx @sonojs/ui@latest mcp init",
  /** Short prompt users paste into coding agents to set up SonoJS MCP. */
  mcpAgentSetupPrompt: `# Set up SonoJS MCP

In this project root:

1. Run: npx @sonojs/ui@latest mcp init
2. Reload MCP in the client (Cursor: Settings → MCP, or restart).
3. Verify with list_components / search_components, or get_add_command for "button".
4. Install only via the returned \`npx @sonojs/ui@latest add …\` command — do not invent registry names or hand-edit unrelated MCP servers.

Ask before changing MCP config outside this project.`,
  links: {
    github: "https://github.com/MiladJoodi/SonoJS",
  },
  /** `owner/repo` for GitHub API (stars, etc.). */
  githubRepo: "MiladJoodi/SonoJS",
  navItems: [
    { href: "/docs", label: "Docs" },
    { href: "/docs/components", label: "Components" },
    { href: "/blocks", label: "Blocks" },
    { href: "/charts", label: "Charts" },
    { href: "/cursors", label: "Cursors" },
    { href: "/tools", label: "Tools" },
    { href: "/pricing", label: "Pricing" },
    {
      href: "https://icons.sonojs.com",
      label: "Icons",
      external: true,
    },
  ] satisfies SiteNavItem[],
}
