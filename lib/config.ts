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
    {
      href: "https://icons.sonojs.com",
      label: "Icons",
      external: true,
    },
  ] satisfies SiteNavItem[],
}
