export type MarketplaceCategory =
  | "dashboard"
  | "landing"
  | "saas"
  | "auth"
  | "ecommerce"
  | "ai"
  | "betting"
  | "crypto"
  | "fintech"
  | "hero"

export type MarketplaceStack =
  | "nextjs"
  | "react"
  | "vite"
  | "vercel"
  | "bun"
  | "lucide"
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
  | "zustand"
  | "axios"
  | "reactrouter"
  | "socketio"
  | "recharts"
  | "chartjs"
  | "lightweightcharts"
  | "clerk"
  | "authjs"
  | "jwt"
  | "linkedin"
  | "indeed"
  | "github"
  | "medium"
  | "devto"
  | "stripe"
  | "visa"
  | "resend"
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
  | "hero"

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
   * Download gate - same model as docs (`public` | `member` | `pro`).
   * Templates default to `member` (signed-in free). Live preview stays public.
   */
  access?: "public" | "member" | "pro"
  badge: MarketplaceBadge | null
  coverVariant: MarketplaceCoverVariant
  /** Catalog card cover (light) - file: cover-light.webp */
  coverImage?: string | null
  /** Catalog card cover (dark) - file: cover-dark.webp */
  coverImageDark?: string | null
  /**
   * Catalog / detail cover video - file: cover.mp4 (muted).
   * With a still cover: catalog card plays on hover.
   * Video-only: catalog autoplays. Detail gallery prefers video when set.
   */
  coverVideo?: string | null
  /** Detail-page hero (light) - file: main-light.webp; falls back to coverImage */
  detailCoverImage?: string | null
  /** Detail-page hero (dark) - file: main-dark.webp */
  detailCoverImageDark?: string | null
  liveUrl: string
  /** Optional public / absolute download URL (redirect). Prefer Pro registry zip via slug. */
  downloadUrl: string
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
  crypto: "Crypto & Trading",
  fintech: "Fintech & Payments",
  hero: "Hero & Interaction",
}

export const MARKETPLACE_STACK_LABEL: Record<MarketplaceStack, string> = {
  nextjs: "Next.js",
  react: "React",
  vite: "Vite",
  vercel: "Vercel",
  bun: "Bun",
  lucide: "Lucide",
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
  zustand: "Zustand",
  axios: "Axios",
  reactrouter: "React Router",
  socketio: "Socket.IO",
  recharts: "Recharts",
  chartjs: "Chart.js",
  lightweightcharts: "Lightweight Charts",
  clerk: "Clerk",
  authjs: "Auth.js",
  jwt: "JWT",
  linkedin: "LinkedIn",
  indeed: "Indeed",
  github: "GitHub",
  medium: "Medium",
  devto: "DEV",
  stripe: "Stripe",
  visa: "Visa",
  resend: "Resend",
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
    coverImage: "/marketplace/projects/dashboard/sonojs-dashboard-01/cover-light.webp",
    coverImageDark: "/marketplace/projects/dashboard/sonojs-dashboard-01/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/dashboard/sonojs-dashboard-01/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/dashboard/sonojs-dashboard-01/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-dashboard-01/",
    downloadUrl: "",
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
    stack: ["react", "vite", "tailwind", "typescript", "javascript"],
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
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-betting-01/",
    downloadUrl: "",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 1,
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
    stack: ["react", "vite", "tailwind", "typescript", "javascript"],
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
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-betting-02/",
    downloadUrl: "",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 1,
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
      "Frontend-only casino catalogue lobby built with Vite, React 19, and Tailwind CSS 4. You get sticky top category tabs, search always available in the header, a compact promo ticker, wide landscape game tiles, game rails, live wins, promotions, providers, trust and about blocks, activity feed, menu sheet, and mobile bottom nav. Guest demo state only - no real backend. Static build ready for GitHub Pages.",
    category: "betting",
    stack: ["react", "vite", "tailwind", "typescript", "javascript"],
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
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-betting-03/",
    downloadUrl: "",
    version: "0.1.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 1,
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
  {
    slug: "sonojs-crypto-01",
    title: "Helix",
    tagline:
      "Crypto paper-trading desk with live prices, charts, and a local portfolio.",
    description:
      "Helix is a frontend crypto paper-trading desk by SonoJS. Built with Vite 8, React 19, TypeScript, TanStack Query, Zustand, and Lightweight Charts. Live spot prices come from Binance (WebSocket ticker). Market stats and news use public APIs. You get a desk home, markets table, asset pages, a trade terminal with chart, depth, and tape, plus portfolio, fill history, news, and settings. All orders are simulated and saved locally. Starting paper balance is $100,000. No wallets and no real trades. Marked as Paper Simulated. Static build ready for GitHub Pages.",
    category: "crypto",
    stack: [
      "react",
      "vite",
      "typescript",
      "reactquery",
      "zustand",
      "lightweightcharts",
      "reactrouter",
    ],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 38,
    accent: "38",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "dashboard",
    coverImage: "/marketplace/projects/crypto/sonojs-crypto-01/cover-light.webp",
    coverImageDark: "/marketplace/projects/crypto/sonojs-crypto-01/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/crypto/sonojs-crypto-01/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/crypto/sonojs-crypto-01/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-crypto-01/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 9,
    highlights: [
      {
        title: "Live market desk",
        body: "Ticker, movers, and a home pulse fed by live Binance prices.",
      },
      {
        title: "Full paper terminal",
        body: "Lightweight Charts, depth, trade tape, and market or limit tickets.",
      },
      {
        title: "Portfolio and history",
        body: "Holdings, PnL, and paper fills stay in your browser so you can reset anytime.",
      },
      {
        title: "Fast navigation",
        body: "Command palette (Ctrl/Cmd+K), favorites, and price alerts with toasts.",
      },
    ],
    includes: [
      "Full Vite 8 + React 19 + TypeScript source (Helix)",
      "Home, markets, asset, trade, portfolio, history, news, settings",
      "Paper trading with Zustand portfolio and fills",
      "Live ticker WebSocket, TanStack Query data hooks",
      "Lightweight Charts terminal, command palette, favorites, alerts",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5",
      "TanStack Query 5",
      "Zustand 5",
      "Lightweight Charts 5",
    ],
  },
  {
    slug: "sonojs-crypto-02",
    title: "Aether",
    tagline:
      "Crypto exchange landing - markets, portfolio story, and a desk built for demos.",
    description:
      "Aether is a production-grade crypto exchange marketing desk by SonoJS. Built with Next.js, React, and Tailwind CSS. You get a light/dark landing with hero, featured coins, feature blocks, stats, process timeline, portfolio pitch, upgrade grid, perks, FAQ, auth screens, and documentation pages. Demo marketing surface only - paper / simulated flows, not financial advice. Static build ready for GitHub Pages.",
    category: "crypto",
    stack: ["nextjs", "react", "tailwind", "typescript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 265,
    accent: "265",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "landing",
    coverImage: "/marketplace/projects/crypto/sonojs-crypto-02/cover-light.webp",
    coverImageDark: "/marketplace/projects/crypto/sonojs-crypto-02/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/crypto/sonojs-crypto-02/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/crypto/sonojs-crypto-02/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-crypto-02/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-03",
    firstReleasedAt: "2026-11-03",
    screens: 8,
    highlights: [
      {
        title: "Exchange-first landing",
        body: "Hero, coin rails, and CTAs framed for a trading product - not a generic SaaS shell.",
      },
      {
        title: "Full marketing sections",
        body: "Features, stats, process, portfolio, upgrade, perks, and FAQ in one scroll.",
      },
      {
        title: "Theme-aware desk",
        body: "Light and dark share one token system so demos stay sharp in either mode.",
      },
      {
        title: "Static and fork-ready",
        body: "Open the live preview or download and run locally. Auth screens included.",
      },
    ],
    includes: [
      "Full Next.js + React + TypeScript source (Aether)",
      "Landing sections: hero, coins, features, stats, timeline, portfolio, upgrade, FAQ",
      "Sign in / sign up screens and documentation pages",
      "Light and dark theme toggle",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 15+",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
  {
    slug: "sonojs-fintech-01",
    title: "Pocket",
    tagline: "Simple modern payments landing - clear hierarchy, ready to demo live.",
    description:
      "Pocket is a frontend payments marketing landing by SonoJS. Built with Vite, React, and Tailwind CSS. You get a dark fintech hero, stats, feature business block, billing and card-deal sections, testimonials, client logos, CTA, and footer. Motion accents use Framer Motion. Single-page scroll landing with navbar anchors for Home, Features, Product, and Clients. Demo marketing surface only - no real payments or accounts. Static build ready for GitHub Pages.",
    category: "fintech",
    stack: ["react", "vite", "javascript", "tailwind"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 195,
    accent: "195",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage: "/marketplace/projects/fintech/sonojs-fintech-01/cover-light.webp",
    coverImageDark: null,
    detailCoverImage:
      "/marketplace/projects/fintech/sonojs-fintech-01/cover-light.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-fintech-01/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-01",
    firstReleasedAt: "2026-11-01",
    screens: 1,
    highlights: [
      {
        title: "Payments-first landing",
        body: "Hero, stats, and product story framed for a simple payments brand - not a generic SaaS shell.",
      },
      {
        title: "Billing and card deal blocks",
        body: "Dedicated billing and card sections keep the product pitch visual and skimmable.",
      },
      {
        title: "Social proof built in",
        body: "Testimonials, client logos, and a clear CTA close the page without extra routes.",
      },
      {
        title: "Static and demo-ready",
        body: "Open the live preview or download and run locally. No backend required.",
      },
    ],
    includes: [
      "Full Vite + React project source (Pocket)",
      "Navbar, hero, stats, business, billing, card deal",
      "Testimonials, clients, CTA, and footer",
      "Framer Motion accents and Tailwind layout",
      "Asset pack for logos, icons, and people",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 18 or newer",
      "Vite 5",
      "React 18",
      "Tailwind CSS 3",
      "Framer Motion 11",
    ],
  },
  {
    slug: "sonojs-landing-01",
    title: "Mainline",
    tagline:
      "Calm SaaS marketing site - ink & champagne, full-bleed hero, pricing and auth.",
    description:
      "Mainline is a premium product-marketing template by SonoJS. Built with Next.js 16, React 19, Tailwind CSS 4, and Motion. You get a full-bleed home (hero, logo marquee, features, resource allocation, testimonials, pricing, FAQ), plus About, Pricing, FAQ, Contact with form, Login, and Signup. Instrument Serif + Manrope, next-themes (default dark), MDX-ready content surfaces, and shadcn/ui blocks. Demo marketing and auth UI only - no real accounts or payments. Static build ready for GitHub Pages.",
    category: "landing",
    stack: ["nextjs", "react", "tailwind", "typescript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 38,
    accent: "38",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage:
      "/marketplace/projects/landing/sonojs-landing-01/cover-light.webp",
    coverImageDark:
      "/marketplace/projects/landing/sonojs-landing-01/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-01/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/landing/sonojs-landing-01/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-landing-01/",
    downloadUrl: "",
    version: "1.2.0",
    updatedAt: "2026-11-03",
    firstReleasedAt: "2026-11-03",
    screens: 8,
    highlights: [
      {
        title: "Product-first landing",
        body: "Full-bleed hero, logo marquee, features, and a resource block that feel like a real SaaS launch - not a generic kit demo.",
      },
      {
        title: "Pages that ship together",
        body: "Home, About, Pricing, FAQ, Contact, Login, and Signup share one ink & champagne system.",
      },
      {
        title: "Motion without noise",
        body: "Motion accents on the hero and sections stay calm; light and dark stay on the same tokens.",
      },
      {
        title: "Static and fork-ready",
        body: "Open the live preview or download and run locally. GitHub Pages export included.",
      },
    ],
    includes: [
      "Full Next.js 16 + React 19 + TypeScript source (Mainline)",
      "Home blocks: hero, logos, features, resources, testimonials, pricing, FAQ",
      "Pages: About, Pricing, FAQ, Contact, Login, Signup, Privacy",
      "shadcn/ui primitives, Motion, next-themes, MDX support",
      "Instrument Serif + Manrope and champagne accent tokens",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
    ],
  },
  {
    slug: "sonojs-landing-02",
    title: "Changelog Template",
    tagline:
      "Minimal changelog template - product releases, features, and fixes in chronological order.",
    description:
      "Changelog Template is a minimal changelog built with Next.js 16.4, React 19.2, and Tailwind CSS 4.1. Showcase product releases, features, and bug fixes in chronological order. Visual timeline with dates and versions, automatic dark mode, responsive layout, and MDX entries via Fumadocs. Write YYYY-MM-DD.mdx files under changelog/content - title, description, date, tags, and version in frontmatter. shadcn/ui components, full TypeScript, next-themes. Demo content only - no live CMS. Deploy to Vercel, Netlify, Cloudflare Pages, or static GitHub Pages.",
    category: "landing",
    stack: ["nextjs", "react", "tailwind", "typescript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 42,
    accent: "42",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage:
      "/marketplace/projects/landing/sonojs-landing-02/cover-light.webp",
    coverImageDark:
      "/marketplace/projects/landing/sonojs-landing-02/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-02/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/landing/sonojs-landing-02/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-landing-02/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-03",
    firstReleasedAt: "2026-11-03",
    screens: 4,
    highlights: [
      {
        title: "Timeline design",
        body: "Visual timeline with dates and versions - releases, features, and fixes in chronological order.",
      },
      {
        title: "MDX changelog entries",
        body: "Add YYYY-MM-DD.mdx under changelog/content with title, description, date, tags, and version.",
      },
      {
        title: "Dark mode",
        body: "Automatic theme switching with next-themes - calm on every device.",
      },
      {
        title: "Fast and fork-ready",
        body: "Next.js App Router and React Server Components. Open the live preview or deploy anywhere Next.js runs.",
      },
    ],
    includes: [
      "Full Next.js 16.4 + React 19.2 + TypeScript 5.9 source (Changelog Template)",
      "App Router pages, layout, metadata, and opengraph image",
      "changelog/content MDX entries via Fumadocs",
      "Timeline UI, theme provider / toggle, shadcn/ui primitives",
      "Responsive layout optimized for all devices",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16.4",
      "React 19.2",
      "Tailwind CSS 4.1",
      "TypeScript 5.9",
      "pnpm (or npm) to install and run",
    ],
  },
  {
    slug: "sonojs-landing-03",
    title: "Aether",
    tagline:
      "Cinematic AI SaaS landing - WebGL hero, Lenis scroll, pricing and FAQ.",
    description:
      "Aether is a premium AI/SaaS landing page template built by SonoJS. It uses Next.js 16, React 19, Tailwind CSS 4, Three.js, Framer Motion, and Lenis to create a polished, interactive experience. The page includes a WebGL hero section, logo marquee, product features, how it works, a live studio showcase, pricing, FAQ, and footer CTAs. It uses Syne and DM Sans for typography, with customizable accent colors and a centralized site config for managing content. The hero animation loads on the client, pauses when out of view, and respects reduced-motion preferences. There’s no backend, authentication, or CMS to set up. The template is also easy to customize, fork, and deploy to GitHub Pages.",
    category: "landing",
    stack: ["nextjs", "react", "tailwind", "typescript", "threejs"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 265,
    accent: "265",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "landing",
    coverImage:
      "/marketplace/projects/landing/sonojs-landing-03/main.webp",
    coverImageDark: null,
    coverVideo:
      "/marketplace/projects/landing/sonojs-landing-03/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-03/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-landing-03/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 1,
    highlights: [
      {
        title: "WebGL hero that sells the product",
        body: "Interactive Three.js scene via React Three Fiber - cinematic first impression without a generic kit look.",
      },
      {
        title: "One-page SaaS story",
        body: "Hero, logos, features, steps, showcase, pricing, and FAQ share one Aether brand system.",
      },
      {
        title: "Motion with restraint",
        body: "Framer Motion + Lenis smooth scroll; the canvas pauses when off-screen and respects reduced motion.",
      },
      {
        title: "Edit content in one file",
        body: "Brand name, copy, pricing, and FAQ live in content/site.ts - swap the demo brand before you ship.",
      },
    ],
    includes: [
      "Full Next.js 16 + React 19 + TypeScript source (Aether)",
      "WebGL hero (Three.js, @react-three/fiber, @react-three/drei)",
      "Landing sections: logos, features, steps, showcase, pricing, FAQ",
      "Framer Motion, Lenis, Tailwind CSS 4, Syne + DM Sans",
      "Central content config (content/site.ts)",
      "Static-friendly build for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
      "Three.js / React Three Fiber (included in package.json)",
    ],
  },
  {
    slug: "sonojs-saas-01",
    title: "Glyph",
    tagline:
      "AI SaaS starter - marketing shell, auth, pricing, and a text generator workspace.",
    description:
      "Glyph is a Next.js AI SaaS starter by SonoJS. Built with Next.js 15, React 19, Tailwind CSS 4, AI SDK, and OpenAI. You get a calm marketing site, sign-in / sign-up / reset screens, readable pricing, FAQ, contact, and a text generator chat workspace. Light and dark share one token system. Framer Motion on the hero stays restrained. Demo marketing and UI surface - chat streaming needs a Node host and OPENAI_API_KEY; the GitHub Pages static export keeps marketing pages working without the API. Static build ready for GitHub Pages.",
    category: "saas",
    stack: ["nextjs", "react", "tailwind", "typescript", "nodejs"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 78,
    accent: "78",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "saas",
    coverImage: "/marketplace/projects/saas/sonojs-saas-01/cover-light.webp",
    coverImageDark: "/marketplace/projects/saas/sonojs-saas-01/cover-dark.webp",
    detailCoverImage:
      "/marketplace/projects/saas/sonojs-saas-01/main-light.webp",
    detailCoverImageDark:
      "/marketplace/projects/saas/sonojs-saas-01/main-dark.webp",
    liveUrl: "https://sonojs.github.io/sonojs-saas-01/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-02",
    firstReleasedAt: "2026-11-02",
    screens: 8,
    highlights: [
      {
        title: "Generator as the product",
        body: "Text workspace with streaming chat patterns - OpenAI-ready, built to extend.",
      },
      {
        title: "Auth and pricing that ship",
        body: "Sign in, sign up, reset, plan cards, and FAQ in one voice - ready to rebrand.",
      },
      {
        title: "Theme-aware shell",
        body: "Light and dark share tokens so demos stay sharp in either mode.",
      },
      {
        title: "Static and fork-ready",
        body: "Open the live preview or download and run locally. Modular sections, clear assets.",
      },
    ],
    includes: [
      "Full Next.js 15 + React 19 + TypeScript source (Glyph)",
      "Marketing pages: home, pricing, FAQ, contact",
      "Auth screens: sign in, sign up, reset password",
      "Text generator workspace with AI SDK patterns",
      "Framer Motion hero, next-themes light/dark",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 15",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
      "OPENAI_API_KEY for live chat (optional on static demo)",
    ],
  },
  {
    slug: "sonojs-hero-01",
    title: "Otis",
    tagline:
      "Grab his cartoon face and pull it like taffy: stretch, wobble, new expression, patience bar.",
    description:
      "Otis is an interactive portfolio hero. Grab the cartoon face and pull it like taffy: it stretches into a tube, wobbles back, swaps to a new expression, and flushes red as the patience bar runs out. Stack: Vite, React 19, TypeScript, Tailwind CSS 4, and a Canvas 2D face engine (no Three.js). Includes light and dark theme toggle, mood meter, and a subscribe demo UI. Static build ready for GitHub Pages.",
    category: "hero",
    stack: ["react", "vite", "typescript", "tailwind"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 225,
    accent: "225",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: null,
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-01/cover.mp4",
    detailCoverImage: null,
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-hero-01/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-02",
    firstReleasedAt: "2026-11-02",
    screens: 1,
    highlights: [
      {
        title: "Pull-to-stretch face",
        body: "Grab opaque pixels, stretch like taffy, release into a random expression.",
      },
      {
        title: "Patience meter",
        body: "Pulls drain patience; the bust flushes red as the bar runs out.",
      },
      {
        title: "Light and dark",
        body: "One token set for page, ink, and cobalt disc. Toggle theme in the header.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/. Open live preview or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Otis)",
      "Canvas 2D face engine and expression cutouts",
      "Mood / patience UI and subscribe demo",
      "Light and dark theme toggle",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 6",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 4",
    ],
  },
  {
    slug: "sonojs-hero-02",
    title: "Juicy",
    tagline:
      "3D juice can carousel - scroll to spin, flavour themes, floating fruit, water ripple.",
    description:
      "Juicy is an interactive juice product showcase by SonoJS. Built with Next.js 15, React 19, Tailwind CSS 4, React Three Fiber, and Three.js. A wheel of four juice cans turns with the mouse wheel, arrow keys, or buttons, and the page takes on the colours of the flavour in front (Lemon Ginger, Blueberry Açai, Mango Burst, Raspberry Rosé). Floating fruit, ice and leaves, a pointer water ripple, and a phone layout are included. Sign-in and cart are demo UI only - no backend. Static build ready for GitHub Pages.",
    category: "hero",
    stack: ["nextjs", "react", "tailwind", "typescript", "threejs"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 42,
    accent: "42",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-02/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-02/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-02/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs.github.io/sonojs-hero-02/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 1,
    highlights: [
      {
        title: "3D can wheel",
        body: "Four juice cans on a React Three Fiber carousel - spin with wheel, keys, or buttons.",
      },
      {
        title: "Theme per flavour",
        body: "Background, glow, and chrome shift with Lemon Ginger, Blueberry Açai, Mango Burst, or Raspberry Rosé.",
      },
      {
        title: "Scene polish",
        body: "Floating fruit, ice, leaves, and a pointer water ripple keep the showcase lively.",
      },
      {
        title: "Static and fork-ready",
        body: "Open the live preview or download and run locally. GitHub Pages export included.",
      },
    ],
    includes: [
      "Full Next.js 15 + React 19 + TypeScript source (Juicy)",
      "3D carousel (Three.js, @react-three/fiber, @react-three/drei)",
      "Flavour themes, floating fruit, ice/leaf decor, water ripple",
      "Demo sign-in form and cart panel (no backend)",
      "Responsive phone layout",
      "Static build ready for GitHub Pages",
    ],
    requirements: [
      "Node.js 22 or newer (or Docker)",
      "Next.js 15",
      "React 19",
      "Tailwind CSS 4",
      "TypeScript 5",
      "Yarn 4 (Corepack) or npm",
      "Three.js / React Three Fiber (included in package.json)",
    ],
  },
  {
    slug: "sonojs-hero-03",
    title: "SkyElite",
    tagline:
      "Full-bleed private-jet video hero - Premium. Accessible. Book Now.",
    description:
      "SkyElite is a full-viewport marketing hero for a private-jet brand. Built with Vite, React 19, TypeScript, Tailwind CSS 4, and Lucide. A looping jet video fills the screen behind a clear nav, stacked Premium / Accessible headline, short line, and Discover / Book Now CTAs. Includes a mobile menu. Demo UI only - no booking backend. Static build ready for Workers or GitHub Pages.",
    category: "hero",
    stack: ["react", "vite", "typescript", "tailwind", "lucide"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 215,
    accent: "215",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-03/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-03/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-03/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-03.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 1,
    highlights: [
      {
        title: "Full-bleed video plane",
        body: "Edge-to-edge looping jet footage as the hero background - muted, autoplay, playsInline.",
      },
      {
        title: "Brand-first type",
        body: "SkyElite wordmark, PRIVATE JETS eyebrow, and a two-line Premium / Accessible headline.",
      },
      {
        title: "Tight CTA pair",
        body: "Discover and Book Now sit under one short supporting line - demo controls only.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/. Open the live preview or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (SkyElite)",
      "Full-viewport video hero and responsive nav / mobile menu",
      "Lucide menu icons and Tailwind CSS 4 styling",
      "Static build ready for Cloudflare Workers or GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 4",
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
    "crypto",
    "fintech",
    "hero",
  ]
}

export function listMarketplaceStacks(): MarketplaceStack[] {
  return [
    "nextjs",
    "react",
    "vite",
    "vercel",
    "bun",
    "lucide",
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
    "zustand",
    "axios",
    "reactrouter",
    "socketio",
    "recharts",
    "chartjs",
    "lightweightcharts",
    "clerk",
    "authjs",
    "jwt",
    "linkedin",
    "indeed",
    "github",
    "medium",
    "devto",
    "stripe",
    "visa",
    "resend",
    "drizzle",
    "prisma",
    "npm",
    "gmail",
  ]
}
