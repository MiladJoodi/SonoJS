export type DocsNavPage = {
  title: string
  href: string
  /** Green sidebar bullet - core / high-traffic items. */
  featured?: boolean
  /** Small “New” chip next to the title (manual spotlight). */
  badge?: "new"
}

export type DocsNavGroup = {
  title: string
  pages: DocsNavPage[]
}

/** Curated spotlight group - first under Components; excluded from prev/next order. */
export const COMPONENTS_FEATURED_GROUP = "Featured"

/** Guide docs under `/docs` (not components). Keep lean. */
export const docsNav: {
  top: DocsNavPage[]
  groups: DocsNavGroup[]
} = {
  top: [
    { title: "Introduction", href: "/docs" },
    { title: "Installation", href: "/docs/installation", featured: true },
    { title: "Guide", href: "/docs/guide" },
    { title: "Tips", href: "/docs/tips", badge: "new" },
    { title: "CLI", href: "/docs/cli" },
    { title: "MCP Server", href: "/docs/mcp", featured: true },
    { title: "Direction (RTL / LTR)", href: "/docs/direction", featured: true },
  ],
  groups: [],
}

/** Component reference under `/docs/components`. */
export const componentsNav: {
  top: DocsNavPage[]
  groups: DocsNavGroup[]
} = {
  top: [{ title: "All Components", href: "/docs/components" }],
  groups: [
    {
      title: COMPONENTS_FEATURED_GROUP,
      pages: [
        {
          title: "Multi Select",
          href: "/docs/components/multi-select",
          badge: "new",
        },
        {
          title: "Dropzone",
          href: "/docs/components/dropzone",
          badge: "new",
        },
        {
          title: "Clothes Rack",
          href: "/docs/components/clothes-rack",
          badge: "new",
        },
        {
          title: "Tweet Card",
          href: "/docs/components/tweet-card",
          badge: "new",
        },
        {
          title: "Verified Badge",
          href: "/docs/components/verified-badge",
        },
        { title: "Marquee", href: "/docs/components/marquee" },
      ],
    },
    {
      title: "Forms",
      pages: [
        {
          title: "Button",
          href: "/docs/components/button",
          featured: true,
        },
        { title: "Button Group", href: "/docs/components/button-group" },
        { title: "Pro Button", href: "/docs/components/pro-button" },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          featured: true,
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          featured: true,
        },
        {
          title: "Combobox",
          href: "/docs/components/combobox",
          featured: true,
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker",
          featured: true,
        },
        {
          title: "Dropzone",
          href: "/docs/components/dropzone",
          featured: true,
        },
        { title: "Field", href: "/docs/components/field", featured: true },
        { title: "Input", href: "/docs/components/input", featured: true },
        { title: "Input Group", href: "/docs/components/input-group" },
        { title: "Input OTP", href: "/docs/components/input-otp" },
        { title: "Label", href: "/docs/components/label", featured: true },
        {
          title: "Multi Select",
          href: "/docs/components/multi-select",
          featured: true,
        },
        { title: "Native Select", href: "/docs/components/native-select" },
        { title: "Phone Input", href: "/docs/components/phone-input" },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group",
          featured: true,
        },
        { title: "Rainbow Button", href: "/docs/components/rainbow-button" },
        { title: "Select", href: "/docs/components/select", featured: true },
        { title: "Slider", href: "/docs/components/slider" },
        { title: "Switch", href: "/docs/components/switch", featured: true },
        { title: "Textarea", href: "/docs/components/textarea" },
        { title: "Toggle", href: "/docs/components/toggle" },
        { title: "Toggle Group", href: "/docs/components/toggle-group" },
      ],
    },
    {
      title: "Layout",
      pages: [
        {
          title: "Accordion",
          href: "/docs/components/accordion",
          featured: true,
        },
        { title: "Border Beam", href: "/docs/components/border-beam" },
        { title: "Card", href: "/docs/components/card", featured: true },
        { title: "Collapsible", href: "/docs/components/collapsible" },
        { title: "Confetti", href: "/docs/components/confetti" },
        { title: "Dotted Map", href: "/docs/components/dotted-map" },
        { title: "Electro Border", href: "/docs/components/electro-border" },
        { title: "Item", href: "/docs/components/item" },
        { title: "Lens", href: "/docs/components/lens" },
        { title: "Magic Card", href: "/docs/components/magic-card" },
        { title: "Marquee", href: "/docs/components/marquee" },
        {
          title: "Progressive Blur",
          href: "/docs/components/progressive-blur",
        },
        { title: "Resizable", href: "/docs/components/resizable" },
        { title: "Scroll Area", href: "/docs/components/scroll-area" },
        { title: "Separator", href: "/docs/components/separator" },
        { title: "Shine Border", href: "/docs/components/shine-border" },
        { title: "Sortable", href: "/docs/components/sortable" },
        { title: "Tabs", href: "/docs/components/tabs", featured: true },
        { title: "Timeline", href: "/docs/components/timeline" },
      ],
    },
    {
      title: "Overlays",
      pages: [
        {
          title: "Alert Dialog",
          href: "/docs/components/alert-dialog",
          featured: true,
        },
        { title: "Command", href: "/docs/components/command" },
        { title: "Context Menu", href: "/docs/components/context-menu" },
        { title: "Dialog", href: "/docs/components/dialog" },
        { title: "Drawer", href: "/docs/components/drawer" },
        { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
        { title: "Hover Card", href: "/docs/components/hover-card" },
        { title: "Menubar", href: "/docs/components/menubar" },
        {
          title: "Popover",
          href: "/docs/components/popover",
          featured: true,
        },
        { title: "Sheet", href: "/docs/components/sheet", featured: true },
        { title: "Tooltip", href: "/docs/components/tooltip" },
      ],
    },
    {
      title: "Feedback",
      pages: [
        { title: "Alert", href: "/docs/components/alert" },
        { title: "Badge", href: "/docs/components/badge" },
        { title: "Empty", href: "/docs/components/empty" },
        { title: "Kbd", href: "/docs/components/kbd" },
        { title: "Marker", href: "/docs/components/marker" },
        { title: "Progress", href: "/docs/components/progress" },
        { title: "Skeleton", href: "/docs/components/skeleton" },
        { title: "Sonner", href: "/docs/components/sonner" },
        { title: "Spinner", href: "/docs/components/spinner" },
        {
          title: "Verified Badge",
          href: "/docs/components/verified-badge",
          featured: true,
        },
      ],
    },
    {
      title: "Data display",
      pages: [
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          featured: true,
        },
        { title: "Bubble", href: "/docs/components/bubble", featured: true },
        { title: "Carousel", href: "/docs/components/carousel" },
        { title: "Code Panel", href: "/docs/components/code-panel" },
        { title: "Data Table", href: "/docs/components/data-table" },
        { title: "Message", href: "/docs/components/message" },
        {
          title: "Message Scroller",
          href: "/docs/components/message-scroller",
        },
        { title: "Pagination", href: "/docs/components/pagination" },
        { title: "Table", href: "/docs/components/table", featured: true },
      ],
    },
    {
      title: "Social",
      pages: [
        {
          title: "Clothes Rack",
          href: "/docs/components/clothes-rack",
          badge: "new",
        },
        {
          title: "Tweet Card",
          href: "/docs/components/tweet-card",
          badge: "new",
        },
      ],
    },
    {
      title: "Navigation",
      pages: [
        { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
        {
          title: "Navigation Menu",
          href: "/docs/components/navigation-menu",
        },
      ],
    },
  ],
}

export function isComponentsDocsPath(pathname: string): boolean {
  return pathname === "/docs/components" || pathname.startsWith("/docs/components/")
}

export function getDocsCurrentLabel(pathname: string): string | null {
  if (isComponentsDocsPath(pathname)) {
    for (const page of componentsNav.top) {
      if (page.href === pathname) return page.title
    }
    for (const group of componentsNav.groups) {
      for (const page of group.pages) {
        if (page.href === pathname) return page.title
      }
    }
    return "Components"
  }

  for (const page of docsNav.top) {
    if (page.href === pathname) return page.title
  }
  for (const group of docsNav.groups) {
    for (const page of group.pages) {
      if (page.href === pathname) return page.title
    }
  }
  if (pathname.startsWith("/docs")) return "Docs"
  return null
}

/** All component groups in sidebar order - for directory + prev/next. */
export function getDocsComponentPages(): DocsNavPage[] {
  return componentsNav.groups
    .filter((group) => group.title !== COMPONENTS_FEATURED_GROUP)
    .flatMap((group) => group.pages)
}

export function getDocsGuidePages(): DocsNavPage[] {
  return docsNav.top
}

export function getDocsAdjacent(pathname: string): {
  previous: DocsNavPage | undefined
  next: DocsNavPage | undefined
} {
  const pages = isComponentsDocsPath(pathname)
    ? getDocsComponentPages()
    : getDocsGuidePages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index < 0) return { previous: undefined, next: undefined }
  return {
    previous: index > 0 ? pages[index - 1] : undefined,
    next: index < pages.length - 1 ? pages[index + 1] : undefined,
  }
}
