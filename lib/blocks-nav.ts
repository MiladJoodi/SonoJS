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

export const blocksNav: BlocksNavGroup[] = [
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
  group("Navigation", "navigation", [
    "Navbar",
    "Header",
    "Mega Menu",
    "Sidebar",
    "Mobile Navigation",
    "Breadcrumbs",
    "Tabs",
    "Command Menu",
    "Navigation Rail",
  ]),
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
  group("Marketing", "marketing", [
    "Hero",
    "Features",
    "Feature Split",
    "Bento Grid",
    "Pricing",
    "CTA",
    "Banner",
    "Stats",
    "Testimonials",
    "Logo Cloud",
    "Newsletter",
    "Comparison",
    "FAQ",
    "Team",
    "Contact Section",
    "Footer",
  ]),
  {
    title: "Authentication",
    items: [
      {
        title: "Login",
        href: "/blocks/authentication/login",
        featured: true,
        status: "ready",
      },
      block("authentication", "Signup", { status: "ready" }),
      block("authentication", "Forgot Password"),
      block("authentication", "Reset Password"),
      block("authentication", "OTP Verification"),
      block("authentication", "Two-Factor Authentication"),
      block("authentication", "Social Login"),
      block("authentication", "Passkey Authentication"),
      block("authentication", "Account Recovery"),
    ],
  },
  group("Forms", "forms", [
    "Contact Form",
    "Multi-Step Form",
    "Form Wizard",
    "Form Builder",
    "Survey Form",
    "Application Form",
    "Feedback Form",
    "Support Request Form",
    "Newsletter Form",
    "Profile Form",
    "File Upload Form",
  ]),
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
  group("E-commerce", "ecommerce", [
    "Product Grid",
    "Product Details",
    "Product Gallery",
    "Shopping Cart",
    "Checkout",
    "Order Summary",
    "Order History",
    "Wishlist",
    "Product Comparison",
    "Reviews & Ratings",
    "Inventory Management",
  ]),
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

export function getAllBlockItems(): BlocksNavItem[] {
  return blocksNav.flatMap((group) => group.items)
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
  const items = getAllBlockItems()
  return {
    categories: blocksNav.length,
    total: items.length,
    ready: items.filter((item) => item.status === "ready").length,
    comingSoon: items.filter((item) => item.status !== "ready").length,
  }
}
