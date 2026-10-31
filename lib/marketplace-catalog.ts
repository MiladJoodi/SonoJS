export type MarketplaceCategory =
  | "dashboard"
  | "landing"
  | "saas"
  | "auth"
  | "ecommerce"
  | "ai"
  | "betting"

export type MarketplaceStack =
  | "nextjs"
  | "react"
  | "tailwind"
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "sass"
  | "nodejs"
  | "d3"
  | "threejs"
  | "reactquery"
  | "socketio"
  | "recharts"
  | "clerk"
  | "authjs"
  | "jwt"
  | "linkedin"
  | "github"
  | "medium"
  | "devto"
  | "stripe"
  | "drizzle"
  | "prisma"
  | "npm"
  | "gmail"

export type MarketplaceBadge = "bestseller" | "new" | "free"

export type MarketplaceCoverVariant =
  | "dashboard"
  | "landing"
  | "auth"
  | "shop"
  | "ai"
  | "saas"

export type MarketplaceProject = {
  slug: string
  title: string
  tagline: string
  description: string
  category: MarketplaceCategory
  stack: MarketplaceStack[]
  priceLabel: string
  priceCents: number
  rating: number
  reviewCount: number
  salesLabel: string
  /** Cover tint / accent hue for prototype thumbnails & halos */
  coverHue: number
  /** Accent token used for cover glow (defaults to coverHue) */
  accent: string
  /** When false: still listed, but Live/Buy stay disabled (Coming soon). */
  enabled: boolean
  /**
   * Download gate — same model as docs (`public` | `member` | `pro`).
   * Templates default to `member` (signed-in free). Live preview stays public.
   */
  access?: "public" | "member" | "pro"
  badge: MarketplaceBadge | null
  coverVariant: MarketplaceCoverVariant
  /** Public path under /public (light / default cover) */
  coverImage?: string | null
  /** Optional dark-mode cover; falls back to coverImage */
  coverImageDark?: string | null
  /** Detail-page hero; falls back to coverImage */
  detailCoverImage?: string | null
  liveUrl: string
  /** Optional public / absolute download URL (redirect). Prefer `archivePath`. */
  downloadUrl: string
  /**
   * Zip path inside the private Pro GitHub repo
   * (e.g. `templates/dashboards/…/file.zip`).
   */
  archivePath?: string | null
  version: string
  updatedAt: string
  firstReleasedAt: string
  screens: number
  highlights: { title: string; body: string }[]
  includes: string[]
  requirements: string[]
}

export const MARKETPLACE_BADGE_LABEL: Record<MarketplaceBadge, string> = {
  bestseller: "Bestseller",
  new: "New",
  free: "Free",
}

export const MARKETPLACE_CATEGORY_LABEL: Record<MarketplaceCategory, string> = {
  dashboard: "Admin & Dashboard",
  landing: "Landing & Marketing",
  saas: "SaaS Starter",
  auth: "Authentication",
  ecommerce: "Ecommerce",
  ai: "AI & Agents",
  betting: "Betting & Casino",
}

export const MARKETPLACE_STACK_LABEL: Record<MarketplaceStack, string> = {
  nextjs: "Next.js",
  react: "React",
  tailwind: "Tailwind CSS",
  typescript: "TypeScript",
  javascript: "JavaScript",
  html: "HTML",
  css: "CSS",
  sass: "Sass",
  nodejs: "Node.js",
  d3: "D3",
  threejs: "Three.js",
  reactquery: "React Query",
  socketio: "Socket.IO",
  recharts: "Recharts",
  clerk: "Clerk",
  authjs: "Auth.js",
  jwt: "JWT",
  linkedin: "LinkedIn",
  github: "GitHub",
  medium: "Medium",
  devto: "DEV",
  stripe: "Stripe",
  drizzle: "Drizzle",
  prisma: "Prisma",
  npm: "npm",
  gmail: "Gmail",
}

export const marketplaceProjects: MarketplaceProject[] = [
  {
    slug: "sonojs-dashboard-01",
    title: "Commerce Admin Dashboard",
    tagline:
      "Manage orders, products, customers, and sales reports in one admin panel.",
    description:
      "A ready-made admin panel for an online store. You get pages for the home dashboard, orders, products, stock, customers, invoices, discounts, reports, calendar, team, activity, notifications, settings, profile, and help. Sign in, sign up, and password reset pages are included. Sample data is stored in the browser so you can try it without a real server. Built with Next.js 16, React 19, Tailwind CSS 4, and multi-language support. You can also publish it as a static site.",
    category: "dashboard",
    stack: ["nextjs", "react", "tailwind", "typescript", "nodejs"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 210,
    accent: "210",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "dashboard",
    coverImage: "/marketplace/projects/dashboard/sonojs-dashboard-01/main-light.webp",
    coverImageDark: "/marketplace/projects/dashboard/sonojs-dashboard-01/main-dark.webp",
    detailCoverImage: null,
    liveUrl: "https://miladjoodi.github.io/sonojs-dashboard-01/signin/",
    downloadUrl: "",
    archivePath:
      "templates/dashboards/sonojs-dashboard-01/sonojs-dashboard-01.zip",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-10-31",
    screens: 35,
    highlights: [
      {
        title: "Store tools in one place",
        body: "Orders, products, stock, customers, invoices, and discounts. Open a record or add a new one.",
      },
      {
        title: "Reports and charts",
        body: "See sales and activity with clear charts. Extra chart demo pages are included.",
      },
      {
        title: "Login and languages",
        body: "Sign in, sign up, and reset password pages. Text can switch language.",
      },
      {
        title: "Try it without a server",
        body: "Sample data saves in your browser. Open the live demo or download and run it locally.",
      },
    ],
    includes: [
      "Full project source code",
      "Orders, products, stock, customers, invoices, discounts",
      "Reports, calendar, team, activity, notifications",
      "Login pages and UI demo pages",
      "Multi-language support and sample data",
      "Guide to publish as a static site",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16.4 or newer",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
  {
    slug: "sonojs-betting-01",
    title: "Casino Lobby",
    tagline:
      "Browse games, search fast, save favorites, and try the live demo.",
    description:
      "Frontend-only casino lobby built with Vite, React 19, and Tailwind CSS 4. You get a narrow icon rail, sticky category bar, quick search (Ctrl/Cmd+K), square game tiles with favorites, a featured hero, live wins, promotions, providers, trust block, about, activity feed, and mobile bottom nav. Login dialog is included. Sample games are in the project so you can try it without a real backend. Ready to build and host as a static site.",
    category: "betting",
    stack: ["react", "tailwind", "typescript", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 280,
    accent: "280",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "shop",
    coverImage: "/marketplace/projects/betting/sonojs-betting-01/cover.webp",
    coverImageDark: null,
    detailCoverImage: "/marketplace/projects/betting/sonojs-betting-01/cover.webp",
    liveUrl: "https://miladjoodi.github.io/sonojs-betting-01/",
    downloadUrl: "",
    archivePath: "templates/betting/sonojs-betting-01/sonojs-betting-01.zip",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 12,
    highlights: [
      {
        title: "Lobby built for browsing",
        body: "Icon rail, sticky categories, and game rails for popular, new, live, slots, and more.",
      },
      {
        title: "Fast search and favorites",
        body: "Open search with Ctrl/Cmd+K. Save games you like and find them again quickly.",
      },
      {
        title: "Mobile-ready shell",
        body: "Bottom nav, drawer menu, and a layout that works on phone and desktop.",
      },
      {
        title: "No server needed to try",
        body: "Sample game data is in the project. Open the live demo or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React project source",
      "Casino lobby layout and game rails",
      "Search dialog, favorites, and auth dialog",
      "Hero, live wins, promotions, providers, footer",
      "Sample game data and UI components",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
  {
    slug: "sonojs-betting-02",
    title: "Casino Homepage",
    tagline:
      "A big hero, game discovery, search, and a clean casino home you can demo live.",
    description:
      "Frontend-only online casino homepage built with Vite, React 19, and Tailwind CSS 4. You get a cinematic hero, search that leads into the game catalog, mid-page discovery tabs, game rails, live wins, promotions, providers, trust and about blocks, activity feed, mobile menu, and bottom nav. Login UI is included. Sample games ship in the project so you can try it without a real backend. Casino discovery only (no sportsbook). Static build ready for GitHub Pages.",
    category: "betting",
    stack: ["react", "tailwind", "typescript", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 265,
    accent: "265",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage: "/marketplace/projects/betting/sonojs-betting-02/cover.webp",
    coverImageDark: null,
    detailCoverImage:
      "/marketplace/projects/betting/sonojs-betting-02/cover.webp",
    liveUrl: "https://miladjoodi.github.io/sonojs-betting-02/",
    downloadUrl: "",
    archivePath: "templates/betting/sonojs-betting-02/sonojs-betting-02.zip",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 12,
    highlights: [
      {
        title: "Hero-first home",
        body: "A large featured hero sets the tone, then discovery tabs and game rails take over.",
      },
      {
        title: "Search into the catalog",
        body: "Search sits in the flow so people can jump straight to games they want.",
      },
      {
        title: "Built for phone and desktop",
        body: "Full-screen mobile menu, bottom nav, and a layout that stays usable on small screens.",
      },
      {
        title: "Try it without a server",
        body: "Sample game data is included. Open the live demo or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React project source",
      "Casino homepage with hero and discovery",
      "Search, game rails, promotions, and providers",
      "Mobile menu, bottom nav, and auth UI",
      "Sample game data and UI components",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
  {
    slug: "sonojs-betting-03",
    title: "Casino Catalogue",
    tagline:
      "Sticky category tabs, always-on search, and wide game tiles for browsing.",
    description:
      "Frontend-only casino catalogue lobby built with Vite, React 19, and Tailwind CSS 4. You get sticky top category tabs, search always available in the header, a compact promo ticker, wide landscape game tiles, game rails, live wins, promotions, providers, trust and about blocks, activity feed, menu sheet, and mobile bottom nav. Guest demo state only — no real backend. Static build ready for GitHub Pages.",
    category: "betting",
    stack: ["react", "tailwind", "typescript", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 300,
    accent: "300",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "shop",
    coverImage: "/marketplace/projects/betting/sonojs-betting-03/cover.webp",
    coverImageDark: null,
    detailCoverImage:
      "/marketplace/projects/betting/sonojs-betting-03/cover.webp",
    liveUrl: "https://miladjoodi.github.io/sonojs-betting-03/",
    downloadUrl: "",
    archivePath: "templates/betting/sonojs-betting-03/sonojs-betting-03.zip",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 12,
    highlights: [
      {
        title: "Browse by category",
        body: "Sticky tabs keep categories in reach while you scroll the catalogue.",
      },
      {
        title: "Search stays open",
        body: "Header search is always there on desktop so finding games is quick.",
      },
      {
        title: "Wide game tiles",
        body: "Landscape cards and rails make the catalogue feel dense but readable.",
      },
      {
        title: "Try it without a server",
        body: "Sample data and guest demo state. Open the live demo or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React project source",
      "Catalogue lobby with sticky category tabs",
      "Always-on search and promo ticker",
      "Wide game tiles, rails, promotions, providers",
      "Mobile menu, bottom nav, and guest demo UI",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
]

export function getMarketplaceProject(
  slug: string
): MarketplaceProject | undefined {
  return marketplaceProjects.find((p) => p.slug === slug)
}

export function getRelatedMarketplaceProjects(
  project: MarketplaceProject,
  limit = 3
): MarketplaceProject[] {
  return marketplaceProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .concat(
      marketplaceProjects.filter(
        (p) => p.slug !== project.slug && p.category !== project.category
      )
    )
    .slice(0, limit)
}

export function listMarketplaceCategories(): MarketplaceCategory[] {
  return [
    "dashboard",
    "landing",
    "saas",
    "auth",
    "ecommerce",
    "ai",
    "betting",
  ]
}

export function listMarketplaceStacks(): MarketplaceStack[] {
  return [
    "nextjs",
    "react",
    "tailwind",
    "typescript",
    "javascript",
    "html",
    "css",
    "sass",
    "nodejs",
    "d3",
    "threejs",
    "reactquery",
    "socketio",
    "recharts",
    "clerk",
    "authjs",
    "jwt",
    "linkedin",
    "github",
    "medium",
    "devto",
    "stripe",
    "drizzle",
    "prisma",
    "npm",
    "gmail",
  ]
}
