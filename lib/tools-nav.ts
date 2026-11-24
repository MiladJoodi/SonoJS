import { siteConfig } from "@/lib/config"

export type ToolsNavItem = {
  title: string
  href: string
  description: string
  featured?: boolean
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
  },
]

export function getAllToolItems(): ToolsNavItem[] {
  return toolsNav
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
