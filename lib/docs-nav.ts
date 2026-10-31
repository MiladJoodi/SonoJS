export type DocsNavPage = {
  title: string
  href: string
  featured?: boolean
}

export type DocsNavGroup = {
  title: string
  pages: DocsNavPage[]
}

/** Guide docs under `/docs` (not components). Keep lean. */
export const docsNav: {
  top: DocsNavPage[]
  groups: DocsNavGroup[]
} = {
  top: [
    { title: "Introduction", href: "/docs" },
    { title: "Installation", href: "/docs/installation", featured: true },
    { title: "Guide", href: "/docs/guide" },
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
      title: "AI",
      pages: [
        { title: "Agent Activity", href: "/docs/components/agent-activity" },
        {
          title: "Agent Activity 2",
          href: "/docs/components/agent-activity-2",
        },
        { title: "AI Sidebar", href: "/docs/components/ai-sidebar" },
        { title: "Approval Card", href: "/docs/components/approval-card" },
        { title: "Attachment", href: "/docs/components/attachment" },
        { title: "Bubble", href: "/docs/components/bubble" },
        { title: "Citations", href: "/docs/components/citations" },
        { title: "Code Block", href: "/docs/components/code-block" },
        { title: "File Diff", href: "/docs/components/file-diff" },
        { title: "Fluid AI Orb", href: "/docs/components/fluid-orb" },
        { title: "Voice AI Orb", href: "/docs/components/voice-ai-orb" },
        { title: "Voice Selector", href: "/docs/components/voice-selector" },
        {
          title: "Image Generation",
          href: "/docs/components/image-generation",
        },
        {
          title: "Image Generation 2",
          href: "/docs/components/image-generation-2",
        },
        {
          title: "Inline Citation",
          href: "/docs/components/inline-citation",
        },
        { title: "Loading States", href: "/docs/components/loading-states" },
        { title: "Mic Selector", href: "/docs/components/mic-selector" },
        { title: "Model Selector", href: "/docs/components/model-selector" },
        { title: "Open In Chat", href: "/docs/components/open-in-chat" },
        { title: "Persona", href: "/docs/components/persona" },
        { title: "Prompt Input", href: "/docs/components/prompt-input" },
        { title: "Prompt Input 2", href: "/docs/components/prompt-input-2" },
        { title: "Queue", href: "/docs/components/queue" },
        { title: "Reasoning Text", href: "/docs/components/reasoning-text" },
        {
          title: "Selection Actions",
          href: "/docs/components/selection-actions",
        },
        {
          title: "Streaming Response",
          href: "/docs/components/streaming-response",
        },
        {
          title: "Structured Output",
          href: "/docs/components/structured-output",
        },
        { title: "Task Rows", href: "/docs/components/task-rows" },
        { title: "Terminal", href: "/docs/components/terminal" },
        { title: "Thinking Orbs", href: "/docs/components/thinking-orbs" },
        { title: "Todo List", href: "/docs/components/todo-list" },
        { title: "Tool Approval", href: "/docs/components/tool-approval" },
        { title: "Trace", href: "/docs/components/trace" },
        { title: "Transcription", href: "/docs/components/transcription" },
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
        { title: "Field", href: "/docs/components/field", featured: true },
        { title: "Input", href: "/docs/components/input", featured: true },
        { title: "Input Group", href: "/docs/components/input-group" },
        { title: "Input OTP", href: "/docs/components/input-otp" },
        { title: "Label", href: "/docs/components/label", featured: true },
        { title: "Native Select", href: "/docs/components/native-select" },
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
        { title: "Card", href: "/docs/components/card", featured: true },
        { title: "Collapsible", href: "/docs/components/collapsible" },
        { title: "Electro Border", href: "/docs/components/electro-border" },
        { title: "Item", href: "/docs/components/item" },
        { title: "Marquee", href: "/docs/components/marquee" },
        { title: "Resizable", href: "/docs/components/resizable" },
        { title: "Scroll Area", href: "/docs/components/scroll-area" },
        { title: "Separator", href: "/docs/components/separator" },
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

/** All component groups in sidebar order — for directory + prev/next. */
export function getDocsComponentPages(): DocsNavPage[] {
  return componentsNav.groups.flatMap((group) => group.pages)
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
