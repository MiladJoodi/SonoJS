export type ToolsNavItem = {
  title: string
  href: string
  description: string
  featured?: boolean
}

export type ToolsNavGroup = {
  title: string
  items: ToolsNavItem[]
}

/** Route for one tool. Folder name matches this slug. */
export function toolHref(slug: string) {
  return `/tools/${slug}`
}

/**
 * Tools catalog. Add an entry only when the tool exists.
 *
 * Per tool:
 * - route: `app/(app)/tools/<slug>/page.tsx`
 * - UI: `components/tools/<slug>/` with `index.ts`
 */
export const toolsNav: ToolsNavGroup[] = [
  {
    title: "HTTP",
    items: [
      {
        title: "API Client",
        href: toolHref("endpoints"),
        description:
          "Send HTTP requests, inspect responses, and keep collections in the browser.",
        featured: true,
      },
    ],
  },
]

export function getAllToolItems(): ToolsNavItem[] {
  return toolsNav.flatMap((group) => group.items)
}

export function getToolByHref(pathname: string): {
  group: ToolsNavGroup
  item: ToolsNavItem
} | null {
  for (const group of toolsNav) {
    for (const item of group.items) {
      if (item.href === pathname) return { group, item }
    }
  }
  return null
}

export function getToolsCurrentLabel(pathname: string): string | null {
  const match = getToolByHref(pathname)
  if (match) return match.item.title
  if (pathname === "/tools") return "Tools"
  return null
}
