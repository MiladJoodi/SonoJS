import {
  siteConfig,
  type SiteNavEntry,
  type SiteNavSection,
} from "@/lib/config"

export type ToolsNavItem = {
  title: string
  href: string
  description: string
  featured?: boolean
  badge?: "new"
  /** Opens outside the docs app (new tab). */
  external?: boolean
}

/** Route for one tool. Folder name matches this slug. */
export function toolHref(slug: string) {
  return `/tools/${slug}`
}

/**
 * Tools catalog. Add an entry only when the tool exists
 * (or an external product URL with `external: true`).
 *
 * Per in-app tool:
 * - route: `app/(app)/tools/<slug>/page.tsx`
 * - UI: `components/tools/<slug>/` with `index.ts`
 */
export const toolsNav: ToolsNavItem[] = [
  {
    title: "API Client",
    href: toolHref("endpoints"),
    description:
      "Send HTTP requests, inspect responses, and keep collections in the browser.",
    featured: true,
  },
  {
    title: "Mock API",
    href: siteConfig.links.mockApi,
    description: "Ready-to-use fake HTTP endpoints for demos and prototyping.",
    external: true,
    featured: true,
  },
  {
    title: "Markdown Editor",
    href: toolHref("markdown-editor"),
    description:
      "Full Markdown editor: rich text, source, diff, tables, code, images, and more. Drafts auto-save.",
  },
  {
    title: "Flags",
    href: toolHref("flags"),
    description: "Browse flags and copy CDN URLs.",
    featured: true,
  },
  {
    title: "Geo",
    href: toolHref("geo"),
    description: "Try country, state, and city selection with @sonojs/geo.",
    featured: true,
    badge: "new",
  },
  {
    title: "Captcha",
    href: toolHref("captcha"),
    description:
      "Live CaptchaKit playground — self-hosted CAPTCHA for React and Next.js.",
    featured: true,
    badge: "new",
  },
]

export function getAllToolItems(): ToolsNavItem[] {
  return toolsNav
}

export function toolsDisplayDescription(item: ToolsNavItem): string {
  return TOOLS_SHORT_BLURB[item.href] ?? item.description
}

/** Short lines for the header dropdown (sidebar/catalog keep full `description`). */
/** Short catalog + header lines (full `description` stays for docs/search if needed). */
export const TOOLS_SHORT_BLURB: Record<string, string> = {
  [toolHref("endpoints")]: "Send requests and inspect responses.",
  [siteConfig.links.mockApi]: "Fake HTTP endpoints for prototyping.",
  [toolHref("markdown-editor")]: "Write, preview, and export Markdown.",
  [toolHref("flags")]: "Browse flags and copy CDN URLs.",
  [toolHref("geo")]: "Country / state / city picker demo.",
  [toolHref("captcha")]: "Live self-hosted CAPTCHA demo.",
}

/** Header mega-menu entry (merged into `siteConfig.navItems` in MainNav). */
export function buildToolsHeaderNavEntry(): Extract<
  SiteNavEntry,
  { sections: SiteNavSection[] }
> {
  return {
    label: "Tools",
    sections: [
      {
        items: toolsNav.map((item) => ({
          href: item.href,
          label: item.title,
          description: TOOLS_SHORT_BLURB[item.href] ?? item.description,
          ...(item.external ? { external: true as const } : {}),
        })),
      },
    ],
  }
}

/** Insert Tools dropdown immediately before MCP. */
export function withToolsHeaderNav(entries: SiteNavEntry[]): SiteNavEntry[] {
  const mcpIndex = entries.findIndex(
    (entry) => !("sections" in entry) && entry.href === "/docs/mcp"
  )
  const insertAt = mcpIndex >= 0 ? mcpIndex : entries.length
  const next = [...entries]
  next.splice(insertAt, 0, buildToolsHeaderNavEntry())
  return next
}

/** In-app tools only (for prev/next and route matching). */
export function getInternalToolItems(): ToolsNavItem[] {
  return toolsNav.filter((item) => !item.external)
}

export function getToolByHref(pathname: string): ToolsNavItem | null {
  return getInternalToolItems().find((item) => item.href === pathname) ?? null
}

export function getToolsCurrentLabel(pathname: string): string | null {
  const match = getToolByHref(pathname)
  if (match) return match.title
  if (pathname === "/tools") return "Tools"
  return null
}

export function getToolsAdjacent(pathname: string): {
  previous: ToolsNavItem | null
  next: ToolsNavItem | null
} {
  const items = getInternalToolItems()
  const index = items.findIndex((item) => item.href === pathname)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: index > 0 ? items[index - 1]! : null,
    next: index < items.length - 1 ? items[index + 1]! : null,
  }
}
