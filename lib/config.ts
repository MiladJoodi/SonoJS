import { PRODUCTION_ORIGIN } from "@/lib/site-origin"

const LOCAL_APP_URL = "http://localhost:3000"
const MOCK_API_URL = "https://api.sonojs.com"

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
  /** Short line for rich header dropdowns. */
  description?: string
}

/** Optional labeled cluster inside a header dropdown. */
export type SiteNavSection = {
  title?: string
  items: SiteNavItem[]
}

/** Top-level link or a dropdown (Products / More). */
export type SiteNavEntry =
  | SiteNavItem
  | {
      label: string
      sections: SiteNavSection[]
    }

export function isSiteNavDropdown(
  entry: SiteNavEntry
): entry is Extract<SiteNavEntry, { sections: SiteNavSection[] }> {
  return "sections" in entry
}

/** Flat links for mobile More sheet / active-path helpers. */
export function flattenSiteNavEntries(entries: SiteNavEntry[]): SiteNavItem[] {
  const out: SiteNavItem[] = []
  for (const entry of entries) {
    if (isSiteNavDropdown(entry)) {
      for (const section of entry.sections) out.push(...section.items)
    } else {
      out.push(entry)
    }
  }
  return out
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
    npm: "https://www.npmjs.com/package/@sonojs/ui",
    /** Support inbox, override with SUPPORT_EMAIL / NEXT_PUBLIC_SUPPORT_EMAIL. */
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
    buyMeACoffee: "https://buymeacoffee.com/sonojs",
    /** Public mock HTTP API for demos and tooling. */
    mockApi: MOCK_API_URL,
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
    {
      label: "Components",
      sections: [
        {
          items: [
            {
              href: "/docs/components",
              label: "All Components",
              description: "Browse primitives, forms, and building blocks.",
            },
            {
              href: "/ai",
              label: "AI",
              description: "Chat and agent UI blocks.",
            },
            {
              href: "/cursors",
              label: "Cursors",
              description: "Pointer effects and trails.",
            },
            {
              href: "/backgrounds",
              label: "Backgrounds",
              description: "Animated HTML scenes.",
            },
            {
              href: "/3d",
              label: "3D",
              description: "Installable WebGL scenes.",
            },
            {
              href: "/popups",
              label: "Popups",
              description: "Age gates, sale overlays, signup popups, and ribbons.",
            },
            {
              href: "/carousels",
              label: "Carousels",
              description: "Motion image galleries.",
            },
          ],
        },
      ],
    },
    { href: "/blocks", label: "Blocks" },
    { href: "/charts", label: "Charts" },
    {
      label: "Products",
      sections: [
        {
          items: [
            {
              href: "/templates",
              label: "Templates",
              description: "Product UI kits ready to ship.",
            },
            {
              href: "/websites",
              label: "Websites",
              description: "Full marketing sites, ready to launch.",
            },
          ],
        },
      ],
    },
    { href: "/docs/mcp", label: "MCP" },
    { href: "/pricing", label: "Pricing" },
  ] satisfies SiteNavEntry[],
  /** Secondary explore links shown in the site footer. */
  footerNavItems: [
    { href: "/about", label: "About" },
    { href: "/tools", label: "Tools" },
    { href: "/pricing", label: "Pricing" },
    {
      href: "https://icons.sonojs.com",
      label: "Icons",
      external: true,
    },
    {
      href: MOCK_API_URL,
      label: "Mock API",
      external: true,
    },
  ] satisfies SiteNavItem[],
}
