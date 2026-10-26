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
      "Prompt Input",
      "Message Thread",
      "Agent Run Timeline",
      "Tool Execution Viewer",
      "Human Approval",
      "Agent Activity",
      "Multi-Agent Workflow",
      "AI Artifact Viewer",
      "AI Response Actions",
      "Streaming Response",
      "Prompt Library",
    ].map((title) =>
      title === "Agent Run Timeline"
        ? block("ai-agents", title, { status: "ready", featured: true })
        : block("ai-agents", title)
    ),
  },
  group("Application Layouts", "application-layouts", [
    "App Shell",
    "Dashboard Layout",
    "Sidebar Layout",
    "Split View",
    "Master-Detail Layout",
    "Multi-Panel Workspace",
    "Resizable Panels",
    "Full-Screen Workspace",
  ]),
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
  group("Dashboards & Analytics", "dashboards-analytics", [
    "Dashboard Overview",
    "KPI Cards",
    "KPI Board",
    "Analytics Dashboard",
    "Monitoring Dashboard",
    "Usage Analytics",
    "Reports Overview",
    "Activity Overview",
    "Performance Metrics",
  ]),
  group("Data & Tables", "data-tables", [
    "Data Table",
    "Advanced Data Grid",
    "Table Toolbar",
    "Filter Panel",
    "Advanced Filters",
    "Sorting Controls",
    "Bulk Actions",
    "Row Actions",
    "Pagination",
    "Data Inspector",
    "CRUD Management",
    "Audit Log",
  ]),
  {
    title: "Marketing",
    items: [
      block("marketing", "Hero", { status: "ready" }),
      block("marketing", "Features", { status: "ready" }),
      block("marketing", "Feature Split"),
      block("marketing", "Bento Grid"),
      block("marketing", "Pricing", { status: "ready" }),
      block("marketing", "CTA", { status: "ready" }),
      block("marketing", "Banner", { status: "ready", featured: true }),
      block("marketing", "Jumbotron", { status: "ready" }),
      block("marketing", "Stats"),
      block("marketing", "Testimonials", { status: "ready" }),
      block("marketing", "Logo Cloud"),
      block("marketing", "Newsletter", { status: "ready" }),
      block("marketing", "Blog", { status: "ready" }),
      block("marketing", "Comparison"),
      block("marketing", "FAQ"),
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
      block("forms", "Application Form"),
      block("forms", "Feedback Form"),
      block("forms", "Support Request Form"),
      block("forms", "Newsletter Form"),
      block("forms", "Profile Form"),
      block("forms", "File Upload Form"),
    ],
  },
  group("Feedback & States", "feedback-states", [
    "Empty State",
    "Loading State",
    "Skeleton Screen",
    "Error State",
    "Success State",
    "Not Found",
    "Access Denied",
    "Offline State",
    "Maintenance",
    "Coming Soon",
    "Error Boundary",
  ]),
  group("User & Account", "user-account", [
    "User Profile",
    "Team Members",
    "Account Settings",
    "Security Settings",
    "Session Management",
    "Connected Accounts",
    "Notification Preferences",
    "Organization Management",
    "Roles & Permissions",
  ]),
  group("Onboarding", "onboarding", [
    "Welcome Screen",
    "Product Tour",
    "Setup Wizard",
    "Progress Checklist",
    "Workspace Setup",
    "First-Run Experience",
    "Data Import",
    "Invite Team",
  ]),
  group("Communication", "communication", [
    "Chat",
    "Message List",
    "Inbox",
    "Comments",
    "Discussion Thread",
    "Team Chat",
    "Activity Feed",
    "Notification Center",
    "Announcement Feed",
    "Mention System",
  ]),
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
  group("Developer Tools", "developer-tools", [
    "API Key Management",
    "Webhook Management",
    "API Request Inspector",
    "Code Preview",
    "Code Editor",
    "Environment Variables",
    "Logs Viewer",
    "Event Inspector",
    "JSON Viewer",
    "Deployment Status",
  ]),
  {
    title: "E-commerce",
    items: [
      block("ecommerce", "Product Grid"),
      block("ecommerce", "Product Details"),
      block("ecommerce", "Product Gallery"),
      block("ecommerce", "Shopping Cart"),
      block("ecommerce", "Checkout"),
      block("ecommerce", "Order Summary"),
      block("ecommerce", "Order History"),
      block("ecommerce", "Wishlist"),
      block("ecommerce", "Product Comparison"),
      block("ecommerce", "Reviews & Ratings", { status: "ready" }),
      block("ecommerce", "Inventory Management"),
    ],
  },
  group("Payments & Billing", "payments-billing", [
    "Payment Methods",
    "Payment Form",
    "Subscription Management",
    "Invoice",
    "Billing History",
    "Usage-Based Billing",
    "Plan Management",
    "Upgrade / Downgrade Plan",
    "Payment Status",
  ]),
  group("Search & Filtering", "search-filtering", [
    "Search Bar",
    "Search Results",
    "Advanced Search",
    "Filter Panel",
    "Sort & Filter",
    "Command Search",
    "Search Suggestions",
    "Recent Searches",
    "Empty Search State",
  ]),
  group("Files & Media", "files-media", [
    "File Upload",
    "File Manager",
    "Image Gallery",
    "Media Grid",
    "Attachment List",
    "Avatar Upload",
    "Document Preview",
    "Media Player",
    "Asset Library",
    "File Processing Status",
  ]),
  group("Calendar & Scheduling", "calendar-scheduling", [
    "Calendar",
    "Event List",
    "Event Details",
    "Schedule",
    "Date & Time Selection",
    "Booking",
    "Appointment Scheduler",
    "Availability Calendar",
    "Resource Scheduling",
  ]),
  group("Content & Publishing", "content-publishing", [
    "Blog Grid",
    "Article Layout",
    "Author Profile",
    "Changelog",
    "Documentation Layout",
    "Release Notes",
    "Table of Contents",
    "Content Editor",
    "Media-Rich Article",
  ]),
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
