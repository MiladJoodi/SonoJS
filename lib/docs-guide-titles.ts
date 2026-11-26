import { normalizePath } from "@/lib/seo"

/**
 * Canonical titles for `/docs` guide pages.
 * Keep in sync with each guide page `docsGuideMetadata` title and on-page `h1`.
 */
export const DOCS_GUIDE_PAGE_TITLES = {
  "/docs": "Introduction",
  "/docs/installation": "Installation",
  "/docs/guide": "Guide",
  "/docs/tips": "Tips",
  "/docs/cli": "CLI",
  "/docs/mcp": "MCP Server",
  "/docs/direction": "Direction (RTL / LTR)",
} as const satisfies Record<string, string>

export type DocsGuidePagePath = keyof typeof DOCS_GUIDE_PAGE_TITLES

/** Meta descriptions for guide pages — keep in sync with each page `docsGuideMetadata`. */
export const DOCS_GUIDE_PAGE_DESCRIPTIONS: Record<DocsGuidePagePath, string> = {
  "/docs":
    "SonoJS is a copy-source React component system. Init once, add what you need, and own the files in your app.",
  "/docs/installation":
    "Set up the SonoJS design system once, then add React components as you need them with the CLI.",
  "/docs/guide":
    "A short path from an empty project to your first SonoJS React component.",
  "/docs/tips":
    "Practical notes and common gotchas when installing and using SonoJS components.",
  "/docs/cli":
    "SonoJS copy-source CLI - init the design system and add components with npx @sonojs/ui.",
  "/docs/mcp":
    "Connect Cursor, Claude, Codex, and other MCP clients so agents can discover SonoJS registry items the same way the CLI does.",
  "/docs/direction":
    "Use SonoJS in right-to-left or left-to-right layouts. Set dir on the HTML element; components inherit direction automatically.",
}

export function getDocsGuideBreadcrumbTitle(pathname: string): string | null {
  const normalized = normalizePath(pathname)
  return (
    DOCS_GUIDE_PAGE_TITLES[normalized as DocsGuidePagePath] ?? null
  )
}