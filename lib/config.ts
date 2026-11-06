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
4. Install only via the returned \`npx @sonojs/ui@latest add …\` command - do not invent registry names or hand-edit unrelated MCP servers.

Ask before changing MCP config outside this project.`,
  links: {
    github: "https://github.com/MiladJoodi/SonoJS",
    /** New blank GitHub issue (report + feature request). */
    githubNewIssue: "https://github.com/MiladJoodi/SonoJS/issues/new",
    x: "https://x.com/_sonojs",
    linkedin: "https://www.linkedin.com/company/sonojs",
    youtube: "https://www.youtube.com/@SonoJSDev",
    /** Support inbox — override with SUPPORT_EMAIL / NEXT_PUBLIC_SUPPORT_EMAIL. */
    supportEmail:
      process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
      process.env.SUPPORT_EMAIL?.trim() ||
      "info@sonojs.com",
    /**
     * Public Telegram chat link for Contact (optional).
     * Prefer NEXT_PUBLIC_TELEGRAM_URL, or NEXT_PUBLIC_TELEGRAM_USERNAME → t.me/…
     */
    telegram:
      process.env.NEXT_PUBLIC_TELEGRAM_URL?.trim() ||
      (process.env.NEXT_PUBLIC_TELEGRAM_USERNAME?.trim()
        ? `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_USERNAME.trim().replace(/^@/, "")}`
        : ""),
    contact: "/contact",
  },

  legal: {
    root: "/legal",
    terms: "/legal/terms",
    privacy: "/legal/privacy",
    license: "/legal/license",
    refund: "/legal/refund",
  },
  /** `owner/repo` for GitHub API. */
  githubRepo: "MiladJoodi/SonoJS",
  navItems: [
    { href: "/docs", label: "Docs" },
    { href: "/docs/mcp", label: "MCP" },
    { href: "/docs/components", label: "Components" },
    { href: "/blocks", label: "Blocks" },
    { href: "/charts", label: "Charts" },
    { href: "/cursors", label: "Cursors" },
    { href: "/3d", label: "3D" },
    { href: "/ai", label: "AI" },
    { href: "/carousels", label: "Carousels" },
    { href: "/marketplace", label: "Marketplace" },
  ] satisfies SiteNavItem[],
  /** Secondary explore links shown in the site footer. */
  footerNavItems: [
    { href: "/tools", label: "Tools" },
    {
      href: "https://icons.sonojs.com",
      label: "Icons",
      external: true,
    },
  ] satisfies SiteNavItem[],
}
