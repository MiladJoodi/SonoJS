export type DocsNavPage = {
  title: string
  href: string
  /** Green sidebar bullet — standout / high-value items (not every primitive). */
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
          title: "Phone Input with Validation",
          href: "/docs/components/phone-input-validation",
          featured: true,
          badge: "new",
        },
        {
          title: "Payment Input",
          href: "/docs/components/payment-input",
          featured: true,
          badge: "new",
        },
        {
          title: "Address Autocomplete",
          href: "/docs/components/address-autocomplete",
          featured: true,
          badge: "new",
        },
        {
          title: "Multi Select",
          href: "/docs/components/multi-select",
          featured: true,
        },
        {
          title: "Password Input",
          href: "/docs/components/password-input",
          featured: true,
          badge: "new",
        },
        {
          title: "Data Table Grid",
          href: "/docs/components/data-table-grid",
          featured: true,
          badge: "new",
        },
        {
          title: "Dropzone",
          href: "/docs/components/dropzone",
          featured: true,
          badge: "new",
        },
        {
          title: "Rich Text Editor",
          href: "/docs/components/rich-text-editor",
          featured: true,
          badge: "new",
        },
      ],
    },
    {
      title: "Forms",
      pages: [
        {
          title: "Address Autocomplete",
          href: "/docs/components/address-autocomplete",
          featured: true,
          badge: "new",
        },
        {
          title: "Availability",
          href: "/docs/components/availability",
          featured: true,
          badge: "new",
        },
        {
          title: "Availability Slots",
          href: "/docs/components/availability-slots",
          featured: true,
          badge: "new",
        },
        { title: "Button", href: "/docs/components/button" },
        { title: "Button Group", href: "/docs/components/button-group" },
        { title: "Calendar", href: "/docs/components/calendar" },
        { title: "Checkbox", href: "/docs/components/checkbox" },
        {
          title: "Color Picker",
          href: "/docs/components/color-picker",
          featured: true,
          badge: "new",
        },
        {
          title: "Combobox",
          href: "/docs/components/combobox",
          featured: true,
        },
        {
          title: "Currency Input",
          href: "/docs/components/currency-input",
          featured: true,
          badge: "new",
        },
        { title: "Date Picker", href: "/docs/components/date-picker" },
        {
          title: "Dropzone",
          href: "/docs/components/dropzone",
          featured: true,
          badge: "new",
        },
        { title: "Field", href: "/docs/components/field" },
        {
          title: "Image Cropper",
          href: "/docs/components/image-cropper",
          featured: true,
          badge: "new",
        },
        { title: "Input", href: "/docs/components/input" },
        { title: "Input Group", href: "/docs/components/input-group" },
        {
          title: "Input OTP",
          href: "/docs/components/input-otp",
          featured: true,
        },
        { title: "Label", href: "/docs/components/label" },
        {
          title: "Multi Select",
          href: "/docs/components/multi-select",
          featured: true,
        },
        { title: "Native Select", href: "/docs/components/native-select" },
        {
          title: "Password Input",
          href: "/docs/components/password-input",
          featured: true,
          badge: "new",
        },
        {
          title: "Payment Input",
          href: "/docs/components/payment-input",
          featured: true,
          badge: "new",
        },
        {
          title: "Phone Input",
          href: "/docs/components/phone-input",
          featured: true,
        },
        {
          title: "Phone Input with Validation",
          href: "/docs/components/phone-input-validation",
          featured: true,
          badge: "new",
        },
        { title: "Radio Group", href: "/docs/components/radio-group" },
        { title: "Rainbow Button", href: "/docs/components/rainbow-button" },
        { title: "Select", href: "/docs/components/select" },
        {
          title: "Signature Pad",
          href: "/docs/components/signature-pad",
          featured: true,
          badge: "new",
        },
        { title: "Slider", href: "/docs/components/slider" },
        { title: "Switch", href: "/docs/components/switch" },
        {
          title: "Tags Input",
          href: "/docs/components/tags-input",
          featured: true,
          badge: "new",
        },
        { title: "Textarea", href: "/docs/components/textarea" },
        {
          title: "Rich Text Editor",
          href: "/docs/components/rich-text-editor",
          featured: true,
          badge: "new",
        },
        { title: "Toggle", href: "/docs/components/toggle" },
        { title: "Toggle Group", href: "/docs/components/toggle-group" },
        {
          title: "Tree Checkbox",
          href: "/docs/components/tree-checkbox",
          featured: true,
          badge: "new",
        },
        {
          title: "Wheel Picker",
          href: "/docs/components/wheel-picker",
          featured: true,
          badge: "new",
        },
      ],
    },
    {
      title: "Layout",
      pages: [
        { title: "Accordion", href: "/docs/components/accordion" },
        { title: "Border Beam", href: "/docs/components/border-beam" },
        { title: "Card", href: "/docs/components/card" },
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
        { title: "Tabs", href: "/docs/components/tabs" },
        { title: "Timeline", href: "/docs/components/timeline" },
      ],
    },
    {
      title: "Overlays",
      pages: [
        { title: "Alert Dialog", href: "/docs/components/alert-dialog" },
        { title: "Command", href: "/docs/components/command" },
        { title: "Context Menu", href: "/docs/components/context-menu" },
        { title: "Dialog", href: "/docs/components/dialog" },
        { title: "Drawer", href: "/docs/components/drawer" },
        { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
        { title: "Hover Card", href: "/docs/components/hover-card" },
        { title: "Menubar", href: "/docs/components/menubar" },
        { title: "Popover", href: "/docs/components/popover" },
        { title: "Sheet", href: "/docs/components/sheet" },
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
        },
      ],
    },
    {
      title: "Data display",
      pages: [
        { title: "Avatar", href: "/docs/components/avatar" },
        { title: "Bubble", href: "/docs/components/bubble" },
        { title: "Carousel", href: "/docs/components/carousel" },
        { title: "Code Panel", href: "/docs/components/code-panel" },
        {
          title: "Data Table",
          href: "/docs/components/data-table",
          featured: true,
        },
        {
          title: "Data Table Grid",
          href: "/docs/components/data-table-grid",
          featured: true,
          badge: "new",
        },
        { title: "Message", href: "/docs/components/message" },
        {
          title: "Message Scroller",
          href: "/docs/components/message-scroller",
        },
        { title: "Pagination", href: "/docs/components/pagination" },
        { title: "Table", href: "/docs/components/table" },
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
        { title: "Navigation Menu", href: "/docs/components/navigation-menu" },
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
