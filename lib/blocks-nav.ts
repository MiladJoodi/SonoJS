export type BlockStatus = "ready" | "coming-soon"

export type BlocksNavItem = {
  title: string
  href: string
  featured?: boolean
  status?: BlockStatus
}

export type BlocksNavGroup = {
  title: string
  items: BlocksNavItem[]
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function block(
  category: string,
  title: string,
  options?: { featured?: boolean; status?: BlockStatus; slug?: string }
): BlocksNavItem {
  const slug = options?.slug ?? slugify(title)
  return {
    title,
    href: `/blocks/${category}/${slug}`,
    featured: options?.featured,
    status: options?.status ?? "coming-soon",
  }
}

function group(title: string, category: string, titles: string[]): BlocksNavGroup {
  return {
    title,
    items: titles.map((itemTitle) => block(category, itemTitle)),
  }
}

/** Full catalog (ready + placeholders). Prefer `blocksNav` for UI. */
export const blocksNavCatalog: BlocksNavGroup[] = [
  {
    title: "AI & Agents",
    items: [
      "Agent Workspace",
      "AI Chat",
      "Chat Composer",
      "Message Thread",
      "Agent Run Timeline",
      "AI Usage Chart",
      "Tool Execution Viewer",
      "Human Approval",
      "Agent Activity",
      "Multi-Agent Workflow",
      "AI Artifact Viewer",
      "AI Response Actions",
      "Streaming Response",
      "Prompt Library",
    ].map((title) => {
      if (title === "Agent Workspace") {
        return block("ai-agents", title, { status: "ready", featured: true })
      }
      if (title === "Agent Run Timeline") {
        return block("ai-agents", title, { status: "ready", featured: true })
      }
      if (title === "AI Chat") {
        return block("ai-agents", title, { status: "ready", featured: true })
      }
      if (title === "Chat Composer") {
        return block("ai-agents", title, { status: "ready" })
      }
      if (title === "AI Usage Chart") {
        return block("ai-agents", title, { status: "ready" })
      }
      return block("ai-agents", title)
    }),
  },
  {
    title: "Application Layouts",
    items: [
      block("application-layouts", "App Shell"),
      block("application-layouts", "Dashboard Layout", {
        status: "ready",
        featured: true,
      }),
      block("application-layouts", "Sidebar Layout"),
      block("application-layouts", "Split View"),
      block("application-layouts", "Master-Detail Layout"),
      block("application-layouts", "Multi-Panel Workspace"),
      block("application-layouts", "Resizable Panels"),
      block("application-layouts", "Full-Screen Workspace"),
    ],
  },
  {
    title: "Navigation",
    items: [
      block("navigation", "Navbar", { status: "ready", featured: true }),
      block("navigation", "Mega Menu", { status: "ready", featured: true }),
      block("navigation", "Sidebar", { status: "ready", featured: true }),
      block("navigation", "Mobile Navigation", {
        status: "ready",
        featured: true,
      }),
      block("navigation", "Breadcrumbs", { status: "ready", featured: true }),
      block("navigation", "Tabs", { status: "ready", featured: true }),
      block("navigation", "Command Menu", { status: "ready" }),
      block("navigation", "Navigation Rail"),
    ],
  },
  {
    title: "Dashboards & Analytics",
    items: [
      block("dashboards-analytics", "Dashboard Overview"),
      block("dashboards-analytics", "KPI Cards", { status: "ready" }),
      block("dashboards-analytics", "KPI Board"),
      block("dashboards-analytics", "Analytics Dashboard", { status: "ready" }),
      block("dashboards-analytics", "Crypto Portfolio", {
        status: "ready",
        featured: true,
      }),
      block("dashboards-analytics", "Monitoring Dashboard"),
      block("dashboards-analytics", "Usage Analytics"),
      block("dashboards-analytics", "Reports Overview"),
      block("dashboards-analytics", "Activity Overview"),
      block("dashboards-analytics", "Performance Metrics"),
    ],
  },
  {
    title: "Data & Tables",
    items: [
      block("data-tables", "Data Table", { status: "ready" }),
      block("data-tables", "Advanced Data Grid", { status: "ready" }),
      block("data-tables", "Table Toolbar"),
      block("data-tables", "Filter Panel"),
      block("data-tables", "Advanced Filters"),
      block("data-tables", "Sorting Controls"),
      block("data-tables", "Bulk Actions"),
      block("data-tables", "Row Actions", { status: "ready" }),
      block("data-tables", "Pagination"),
      block("data-tables", "Data Inspector"),
      block("data-tables", "CRUD Management"),
      block("data-tables", "Audit Log"),
    ],
  },
  {
    title: "Marketing",
    items: [
      block("marketing", "Hero", { status: "ready" }),
      block("marketing", "Features", { status: "ready" }),
      block("marketing", "Feature Split"),
      block("marketing", "Bento Grid", { status: "ready" }),
      block("marketing", "How It Works", { status: "ready", featured: true }),
      block("marketing", "Pricing", { status: "ready" }),
      block("marketing", "CTA", { status: "ready" }),
      block("marketing", "Banner", { status: "ready", featured: true }),
      block("marketing", "Cookie Consent", { status: "ready" }),
      block("marketing", "Jumbotron", { status: "ready" }),
      block("marketing", "Stats", { status: "ready" }),
      block("marketing", "Testimonials", { status: "ready" }),
      block("marketing", "Logo Cloud"),
      block("marketing", "Newsletter", { status: "ready" }),
      block("marketing", "Blog", { status: "ready" }),
      block("marketing", "Portfolio", {
        status: "ready",
        featured: true,
      }),
      block("marketing", "Social Links", {
        status: "ready",
        featured: true,
      }),
      block("marketing", "Content Section", { status: "ready" }),
      block("marketing", "Comparison"),
      block("marketing", "FAQ", { status: "ready" }),
      block("marketing", "Team", { status: "ready" }),
      block("marketing", "Contact Section"),
      block("marketing", "Footer", { status: "ready" }),
    ],
  },
  {
    title: "Authentication",
    items: [
      {
        title: "Login",
        href: "/blocks/authentication/login",
        featured: true,
        status: "ready",
      },
      block("authentication", "Signup", { status: "ready", featured: true }),
      block("authentication", "Forgot Password", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "Reset Password", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "OTP Verification", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "Two-Factor Authentication", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "Social Login", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "Passkey Authentication", {
        status: "ready",
        featured: true,
      }),
      block("authentication", "Account Recovery", {
        status: "ready",
        featured: true,
      }),
    ],
  },
  {
    title: "Forms",
    items: [
      block("forms", "Contact Form", { status: "ready" }),
      block("forms", "Multi-Step Form"),
      block("forms", "Form Wizard"),
      block("forms", "Form Builder"),
      block("forms", "Survey Form"),
      block("forms", "Application Form", { status: "ready" }),
      block("forms", "Feedback Form"),
      block("forms", "Support Request Form"),
      block("forms", "Newsletter Form"),
      block("forms", "Profile Form"),
      block("forms", "File Upload Form"),
    ],
  },
  {
    title: "Feedback & States",
    items: [
      block("feedback-states", "Empty State", {
        status: "ready",
        featured: true,
      }),
      block("feedback-states", "Loading State"),
      block("feedback-states", "Skeleton Screen"),
      block("feedback-states", "Error State", { status: "ready" }),
      block("feedback-states", "Success State"),
      block("feedback-states", "Not Found", { status: "ready" }),
      block("feedback-states", "Access Denied", { status: "ready" }),
      block("feedback-states", "Rate Limit", { status: "ready" }),
      block("feedback-states", "Offline State"),
      block("feedback-states", "Maintenance", { status: "ready" }),
      block("feedback-states", "Status Page", { status: "ready" }),
      block("feedback-states", "Coming Soon"),
      block("feedback-states", "Error Boundary"),
    ],
  },
  {
    title: "User & Account",
    items: [
      block("user-account", "User Profile", {
        status: "ready",
        featured: true,
      }),
      block("user-account", "Team Members", { status: "ready" }),
      block("user-account", "Account Settings", {
        status: "ready",
        featured: true,
      }),
      block("user-account", "Security Settings"),
      block("user-account", "Session Management"),
      block("user-account", "Connected Accounts"),
      block("user-account", "Notification Preferences"),
      block("user-account", "Organization Management"),
      block("user-account", "Roles & Permissions", { status: "ready" }),
    ],
  },
  {
    title: "Onboarding",
    items: [
      block("onboarding", "Welcome Screen"),
      block("onboarding", "Product Tour"),
      block("onboarding", "Setup Wizard", { status: "ready", featured: true }),
      block("onboarding", "Progress Checklist", { status: "ready" }),
      block("onboarding", "Workspace Setup", { status: "ready" }),
      block("onboarding", "First-Run Experience"),
      block("onboarding", "Data Import", { status: "ready" }),
      block("onboarding", "Invite Team"),
    ],
  },
  {
    title: "Communication",
    items: [
      block("communication", "Chat"),
      block("communication", "Message List"),
      block("communication", "Inbox"),
      block("communication", "Comments", {
        status: "ready",
        featured: true,
      }),
      block("communication", "Discussion Thread"),
      block("communication", "Team Chat"),
      block("communication", "Activity Feed", { status: "ready" }),
      block("communication", "Notification Center", {
        status: "ready",
        featured: true,
      }),
      block("communication", "Announcement Feed"),
      block("communication", "Mention System"),
    ],
  },
  group("Workflow & Automation", "workflow-automation", [
    "Workflow Builder",
    "Node-Based Editor",
    "Pipeline Builder",
    "Automation Rules",
    "Trigger & Action Editor",
    "Job Queue",
    "Run History",
    "Execution Details",
    "Workflow Status",
    "Approval Workflow",
  ]),
  {
    title: "Developer Tools",
    items: [
      block("developer-tools", "API Key Management", {
        status: "ready",
        featured: true,
      }),
      block("developer-tools", "Webhook Management", {
        status: "ready",
        featured: true,
      }),
      block("developer-tools", "Integrations", { status: "ready" }),
      block("developer-tools", "API Request Inspector"),
      block("developer-tools", "Code Preview"),
      block("developer-tools", "Code Editor"),
      block("developer-tools", "Environment Variables"),
      block("developer-tools", "Logs Viewer", { status: "ready" }),
      block("developer-tools", "Event Inspector"),
      block("developer-tools", "JSON Viewer"),
      block("developer-tools", "Deployment Status"),
    ],
  },
  {
    title: "E-commerce",
    items: [
      block("ecommerce", "Product List", { status: "ready" }),
      block("ecommerce", "Product Details", { status: "ready" }),
      block("ecommerce", "Product Categories", { status: "ready" }),
      block("ecommerce", "Product Filter", { status: "ready" }),
      block("ecommerce", "Product Gallery"),
      block("ecommerce", "Product Review", { status: "ready" }),
      block("ecommerce", "Shopping Cart", { status: "ready" }),
      block("ecommerce", "Checkout", { status: "ready" }),
      block("ecommerce", "Order Confirmation", { status: "ready" }),
      block("ecommerce", "Order Summary", { status: "ready" }),
      block("ecommerce", "Order Tracking", { status: "ready" }),
      block("ecommerce", "Order History", { status: "ready" }),
      block("ecommerce", "Wishlist", { status: "ready" }),
      block("ecommerce", "Product Comparison"),
      block("ecommerce", "Reviews & Ratings", { status: "ready" }),
      block("ecommerce", "Inventory Management"),
    ],
  },
  {
    title: "Payments & Billing",
    items: [
      block("payments-billing", "Payment Methods", {
        status: "ready",
        featured: true,
      }),
      block("payments-billing", "Payment Form", { status: "ready" }),
      block("payments-billing", "Billing Settings", {
        status: "ready",
        featured: true,
      }),
      block("payments-billing", "Subscription Management"),
      block("payments-billing", "Invoice", {
        status: "ready",
        featured: true,
      }),
      block("payments-billing", "Billing History", { status: "ready" }),
      block("payments-billing", "Usage-Based Billing", { status: "ready" }),
      block("payments-billing", "Plan Management"),
      block("payments-billing", "Upgrade / Downgrade Plan"),
      block("payments-billing", "Payment Status"),
      block("payments-billing", "Transfer Funds", { status: "ready" }),
    ],
  },
  {
    title: "Search & Filtering",
    items: [
      block("search-filtering", "Search Bar"),
      block("search-filtering", "Search Results", {
        status: "ready",
        featured: true,
      }),
      block("search-filtering", "Advanced Search"),
      block("search-filtering", "Filter Panel", {
        status: "ready",
        featured: true,
      }),
      block("search-filtering", "Sort & Filter"),
      block("search-filtering", "Command Search"),
      block("search-filtering", "Search Suggestions"),
      block("search-filtering", "Recent Searches"),
      block("search-filtering", "Empty Search State"),
    ],
  },
  {
    title: "Files & Media",
    items: [
      block("files-media", "File Upload", { status: "ready" }),
      block("files-media", "File Manager", { status: "ready" }),
      block("files-media", "Image Gallery", { status: "ready" }),
      block("files-media", "Data Export", { status: "ready", featured: true }),
      block("files-media", "Media Gallery", { status: "ready" }),
      block("files-media", "Media Grid"),
      block("files-media", "Attachment List"),
      block("files-media", "Avatar Upload"),
      block("files-media", "Document Preview"),
      block("files-media", "Media Player", {
        status: "ready",
        featured: true,
      }),
      block("files-media", "Music Player", {
        status: "ready",
        featured: true,
      }),
      block("files-media", "Asset Library"),
      block("files-media", "File Processing Status"),
    ],
  },
  {
    title: "Calendar & Scheduling",
    items: [
      block("calendar-scheduling", "Calendar", { status: "ready" }),
      block("calendar-scheduling", "Event List"),
      block("calendar-scheduling", "Event Details"),
      block("calendar-scheduling", "Schedule"),
      block("calendar-scheduling", "Date & Time Selection"),
      block("calendar-scheduling", "Booking"),
      block("calendar-scheduling", "Appointment Scheduler"),
      block("calendar-scheduling", "Availability Calendar"),
      block("calendar-scheduling", "Resource Scheduling"),
    ],
  },
  {
    title: "Content & Publishing",
    items: [
      block("content-publishing", "Blog Grid", {
        status: "ready",
        featured: true,
      }),
      block("content-publishing", "Article Layout", {
        status: "ready",
        featured: true,
      }),
      block("content-publishing", "Author Profile", {
        status: "ready",
        featured: true,
      }),
      block("content-publishing", "Changelog", {
        status: "ready",
        featured: true,
      }),
      block("content-publishing", "Reading Progress", {
        status: "ready",
        featured: true,
      }),
      block("content-publishing", "Documentation Layout"),
      block("content-publishing", "Release Notes"),
      block("content-publishing", "Table of Contents"),
      block("content-publishing", "Content Editor"),
      block("content-publishing", "Media-Rich Article"),
    ],
  },
  group("Maps & Location", "maps-location", [
    "Map View",
    "Location Search",
    "Store Locator",
    "Location Details",
    "Route Overview",
    "Delivery Tracking",
  ]),
]

/**
 * TEMP: sidebar / blocks index show only shipped blocks.
 * Coming-soon placeholders stay in `blocksNavCatalog` — restore by exporting that instead.
 */
export const blocksNav: BlocksNavGroup[] = blocksNavCatalog
  .map((group) => ({
    ...group,
    items: group.items.filter((item) => item.status === "ready"),
  }))
  .filter((group) => group.items.length > 0)

export function getAllBlockItems(): BlocksNavItem[] {
  return blocksNav.flatMap((group) => group.items)
}

export function getAllBlockCatalogItems(): BlocksNavItem[] {
  return blocksNavCatalog.flatMap((group) => group.items)
}

/** Flat ready-block order (sidebar) for prev/next on block docs pages. */
export function getBlocksAdjacent(pathname: string): {
  previous: BlocksNavItem | undefined
  next: BlocksNavItem | undefined
} {
  const items = getAllBlockItems()
  const index = items.findIndex((item) => item.href === pathname)
  if (index < 0) return { previous: undefined, next: undefined }
  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  }
}

export function getBlockByHref(pathname: string): {
  group: BlocksNavGroup
  item: BlocksNavItem
} | null {
  for (const group of blocksNav) {
    for (const item of group.items) {
      if (item.href === pathname) return { group, item }
    }
  }
  return null
}

export function getBlocksCurrentLabel(pathname: string): string | null {
  const match = getBlockByHref(pathname)
  if (match) return match.item.title
  if (pathname === "/blocks") return "Blocks"
  return null
}

export function getBlocksStats() {
  const items = getAllBlockCatalogItems()
  return {
    categories: blocksNavCatalog.length,
    total: items.length,
    ready: items.filter((item) => item.status === "ready").length,
    comingSoon: items.filter((item) => item.status !== "ready").length,
  }
}

/** URL category segment from `/blocks/{category}/{slug}`. */
export function getBlocksCategorySlug(group: BlocksNavGroup): string {
  const href = group.items[0]?.href ?? ""
  const parts = href.split("/").filter(Boolean)
  return parts[1] ?? slugify(group.title)
}

/** Deep-link into a category: first ready item (blocksNav is ready-only). */
export function getBlocksCategoryEntryHref(group: BlocksNavGroup): string {
  return group.items[0]?.href ?? "/blocks"
}
