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
    "A modern React UI library with beautifully crafted components, blocks, and charts. Connect your AI agent via MCP to build with SonoJS and generate real UI directly in your codebase.",
  /** Placeholder until the real npx MCP command ships. Works with any MCP client. */
  mcpInitCommand: "npx @sonojs/ui@latest mcp init",
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
    { href: "/tools", label: "Tools" },
    {
      href: "https://icons.sonojs.com",
      label: "Icons",
      external: true,
    },
  ] satisfies SiteNavItem[],
}
