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
  | "portfolio"

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
  | "gsap"
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
  portfolio: "Portfolio",
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
  gsap: "GSAP",
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
    badge: null,
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
    badge: null,
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
  {
    slug: "sonojs-ecommerce-01",
    title: "VirtualFit",
    tagline:
      "Spatial try-on - drag the garment arc, try on, pick size and color.",
    description:
      "VirtualFit is a single-file spatial try-on storefront by SonoJS. Built with plain HTML, CSS, and vanilla JavaScript - no framework. A blurred room backdrop holds a model stage while a glass garment carousel arcs across the bottom. Drag or scroll to browse tops (Basic T-shirt, Sweater, Linen Shirt, Grey Hoodie, Ringer Tee), tap TRY ON for a scan reveal, then set size (S–XL) and color on the buy card. Custom cursor modes (TRY ON / DRAG), category tabs, side rail, and prefers-reduced-motion support. Assets ship locally (Inter woff2 + WebP room/model/garment sprites). Demo UI only - no cart backend. Open virtualfit.html or host as static assets on Cloudflare Workers.",
    category: "ecommerce",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 32,
    accent: "32",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "shop",
    coverImage: "/marketplace/projects/ecommerce/sonojs-ecommerce-01/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/ecommerce/sonojs-ecommerce-01/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/ecommerce/sonojs-ecommerce-01/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-ecommerce-01.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 1,
    highlights: [
      {
        title: "Spatial garment arc",
        body: "Drag or scroll a glass card carousel of tops; each card shows garment crop, name, and price.",
      },
      {
        title: "Try-on scan",
        body: "TRY ON runs a scan reveal that layers the selected garment onto the model stage.",
      },
      {
        title: "Buy card controls",
        body: "Size chips (S–XL), color dots with rolling Color · label, and live name/price updates.",
      },
      {
        title: "Zero-build static",
        body: "One HTML file plus local fonts and WebP sprites - open locally or deploy to Workers.",
      },
    ],
    includes: [
      "virtualfit.html (complete UI + interaction logic)",
      "virtualfit-assets/fonts/inter-latin.woff2",
      "virtualfit-assets/images (room, model, garment WebP sprites)",
      "Custom cursor, category tabs, side rail, buy card",
      "prefers-reduced-motion friendly motion paths",
    ],
    requirements: [
      "Modern browser (CSS backdrop-filter, pointer events)",
      "No build step - open virtualfit.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-portfolio-01",
    title: "Jack",
    tagline:
      "Dark 3D-creator portfolio - hero, marquee, services, and project cases.",
    description:
      "Jack is a dark personal portfolio for a 3D creator by SonoJS. Built with Vite, React 19, TypeScript, Tailwind CSS 3, Framer Motion, and Lucide. You get a full-viewport hero (Hi, i'm jack + magnetic portrait), image marquee, about, services (3D Modeling, Rendering, Motion Design, Branding, Web Design), project cases (Nextlevel Studio, Aura Brand Identity, Solaris Digital), and a contact footer. Motion helpers include FadeIn, Magnet, and AnimatedText. Demo content only - no CMS backend. Static build ready for Cloudflare Workers or GitHub Pages.",
    category: "portfolio",
    stack: ["react", "vite", "typescript", "tailwind", "lucide"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 200,
    accent: "200",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage: "/marketplace/projects/portfolio/sonojs-portfolio-01/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/portfolio/sonojs-portfolio-01/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/portfolio/sonojs-portfolio-01/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-portfolio-01.winbeta-com.workers.dev/",
    downloadUrl:
      "https://drive.google.com/file/d/1nwcl6fmYZ008PSbbXC-QFdrPn14DRHE7/view?usp=drive_link",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 6,
    highlights: [
      {
        title: "Hero with magnetic portrait",
        body: "Giant Hi, i'm jack headline, magnet-follow portrait, and Contact CTA over a dark stage.",
      },
      {
        title: "Services and cases",
        body: "3D Modeling, Rendering, Motion, Branding, Web Design - plus three project case layouts.",
      },
      {
        title: "Motion polish",
        body: "Framer Motion FadeIn / AnimatedText and a Magnet pointer pull on the portrait.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/. Open the live preview or download and run locally.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Jack)",
      "Hero, marquee, about, services, projects, footer sections",
      "Framer Motion helpers (FadeIn, Magnet, AnimatedText)",
      "Project and service demo data + local image assets",
      "Static build ready for Cloudflare Workers or GitHub Pages",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 3",
      "Framer Motion (included in package.json)",
    ],
  },
  {
    slug: "sonojs-portfolio-02",
    title: "Folio",
    tagline:
      "Wheel-jacked infinite portfolio reel - titles, images, and tilt detail.",
    description:
      "Folio is a wheel-driven infinite portfolio reel by SonoJS. Built with Vite, React 19, TypeScript, Tailwind CSS 4, and GSAP. Scroll or wheel through stacked project titles and synced image strips; open a case for a 3D-tilt detail view. Local Geist Variable font and all folio stills under public/folio - no CDN at runtime. Demo selected-work UI only - no CMS. Static build ready for Cloudflare Workers.",
    category: "portfolio",
    stack: ["react", "vite", "typescript", "tailwind", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 30,
    accent: "30",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "landing",
    coverImage: "/marketplace/projects/portfolio/sonojs-portfolio-02/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/portfolio/sonojs-portfolio-02/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/portfolio/sonojs-portfolio-02/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-portfolio-02.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Infinite wheel reel",
        body: "Wheel / scroll drives synced title and image strips through demo cases (Aurora, Strider, Hearth, and more).",
      },
      {
        title: "Tilt detail modal",
        body: "Open a project for a 3D-tilt case view with copy and local stills.",
      },
      {
        title: "Local media only",
        body: "Geist Variable and public/folio images ship in-repo - no remote CDN at runtime.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/ - deploy on Cloudflare Workers or any static host.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Folio)",
      "folio module (reel layout, detail modal, project data)",
      "public/folio project stills",
      "Tailwind CSS 4 + GSAP + Geist Variable",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5+",
      "Tailwind CSS 4",
      "GSAP (included in package.json)",
    ],
  },
  {
    slug: "sonojs-hero-04",
    title: "Mossline",
    tagline:
      "Scroll-driven climate hero - Measure the Living Planet with video, fog, and HUD.",
    description:
      "Mossline is a scroll-storytelling marketing hero for a climate / earth-sensing brand by SonoJS. Built as a single HTML page with local CSS, fonts, WebP plates, and a fly-in MP4. A sticky stage (~640vh story) drives camera motion, mist, floating rocks, HUD telemetry, and the headline Measure the Living Planet. Progress bar, SCROLL TO EXPLORE hint, and glass product cards (field sensors, living species baselines) continue the narrative. Demo UI only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 95,
    accent: "95",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-04/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-04/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-04/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-04.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-06",
    firstReleasedAt: "2026-11-06",
    screens: 1,
    highlights: [
      {
        title: "Scroll-scrubbed stage",
        body: "Sticky full-viewport camera stage over a long story scroll - video fly-in, mist, and rock layers.",
      },
      {
        title: "Climate brand chrome",
        body: "Mossline wordmark, lime chips, HUD crosshair, and Measure the Living Planet headline.",
      },
      {
        title: "Sensor story cards",
        body: "Glass cards for field sensors and living-species baselines continue after the hero stage.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus local fonts, WebP plates, and flyin.mp4 - deploy anywhere static.",
      },
    ],
    includes: [
      "index.html (complete scroll story + HUD UI)",
      "assets/fonts (Inter Tight + JetBrains Mono)",
      "assets/img (hero still/cutout, island, rocks, sensor)",
      "assets/video/flyin.mp4",
      "Fog, rock bob, progress bar, and explore hint motion",
    ],
    requirements: [
      "Modern browser (CSS mask, sticky, canvas/video)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-hero-05",
    title: "Planet Jumping",
    tagline:
      "Ubernatural planet hopper - portal jumps between Mars, Earth, Venus with video transitions.",
    description:
      "Planet Jumping is a full-viewport interactive space hero by SonoJS (demo brand Ubernatural). Built as a single HTML page with vanilla JS, local videos, and canvas FX. Start on Mars with a video preloader, pick the next world from a planet rail (Mercury through Neptune), and travel through a portal with to-earth / to-venus / to-mars MP4 transitions. Giant planet titles, fact blocks, custom cursor, floating logo, and a soft bottom shade keep the chrome cinematic. Demo UI only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 18,
    accent: "18",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-05/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-05/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-05/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-05.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Portal planet jumps",
        body: "Click the Next portal to travel - video transitions between Mars, Earth, Venus and more.",
      },
      {
        title: "Full planet rail",
        body: "Mercury through Neptune in a side list; active world drives title, facts, and next destination.",
      },
      {
        title: "Cinematic chrome",
        body: "Custom cursor, floating Ubernatural logo, preloader percent, and soft bottom shade.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus local videos, mercury still, and logo - deploy anywhere static.",
      },
    ],
    includes: [
      "index.html (complete planet-jump experience)",
      "assets/mars-background.mp4, to-mars / to-earth / to-venus transitions",
      "assets/mercury.jpg and assets/logo.svg",
      "Custom cursor, portal canvas, planet facts UI",
    ],
    requirements: [
      "Modern browser (video, canvas, CSS transitions)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-hero-06",
    title: "SpaceEdu",
    tagline:
      "Education space hero - swap Earth, Venus, and Mars with video skies and course CTA.",
    description:
      "SpaceEdu is a full-viewport planet education hero by SonoJS. Built as a single HTML page with local fonts, stills, cutouts, and looping sky videos. Click the side planets to feature EARTH, VENUS, or MARS - the sky video crossfades, title and copy update, and GET STARTED drives enrollment. Nav covers Planets, Tuition, Tutorials, Blog, and Enroll. prefers-reduced-motion falls back to still skies. Demo UI only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
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
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-06/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-06/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-06/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-06.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Clickable side planets",
        body: "Swap the featured world between Earth, Venus, and Mars - title, copy, and sky update together.",
      },
      {
        title: "Video sky stage",
        body: "Looping planet sky videos with still fallbacks and reduced-motion support.",
      },
      {
        title: "Course enrollment chrome",
        body: "PLANET eyebrow, serif headline, enrollment blurb, and GET STARTED CTA.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus fonts, stills, cutouts, and sky videos - deploy anywhere static.",
      },
    ],
    includes: [
      "index.html (complete SpaceEdu hero)",
      "assets/video (earth / mars / venus sky loops)",
      "assets/still and assets/cutout planet art",
      "assets/fonts (Prata, Hanken Grotesk, Poppins)",
      "CREDITS.txt",
    ],
    requirements: [
      "Modern browser (video, CSS custom properties)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-hero-07",
    title: "Lumen Roof",
    tagline:
      "Solar farmhouse hero - Morning / Night toggle with $0 bills for 7 years.",
    description:
      "Lumen Roof is a full-viewport solar marketing hero by SonoJS. Built as a single HTML page with Instrument Sans, layered WebP skies/grounds/house cuts, and a WebGL fog canvas. A glass Morning / Night toggle crossfades the scene and ink colors while the headline promises $0 Electricity Bills for the next 7 Years. Nav, Get an Instant Quote CTA, and Smart Controller caption complete the chrome. prefers-reduced-motion softens the blend. Demo UI only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 48,
    accent: "48",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-07/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-07/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-07/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-07.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Morning / Night toggle",
        body: "One control crossfades sky, ground, house cutouts, and UI ink between day and dusk.",
      },
      {
        title: "Layered solar scene",
        body: "Blurred sky, masked ground, farmhouse with panels, tilt blur, and WebGL fog.",
      },
      {
        title: "Zero-bill pitch",
        body: "$0 Electricity Bills for 7 Years plus Smart Controller caption and quote CTA.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus Instrument Sans and six WebP plates - deploy anywhere static.",
      },
    ],
    includes: [
      "index.html (complete Lumen Roof hero)",
      "assets/images (sky / ground / house morning + night WebP)",
      "assets/fonts (Instrument Sans)",
      "WebGL fog canvas and day/night blend logic",
    ],
    requirements: [
      "Modern browser (CSS color-mix, backdrop-filter; WebGL2 optional for fog)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-landing-04",
    title: "HUM One",
    tagline:
      "Silence, engineered - ANC headphone landing with 3D hero, anatomy, and pre-order.",
    description:
      "HUM One is a cinematic product landing for noise-cancelling headphones by SonoJS (demo brand HUM Audio, Rotterdam). Built as a static HTML / CSS / JS site with GSAP, Lenis, ScrollTrigger, and Three.js. An intro gate measures the room and quiets the page; the hero mounts a live 3D headset with poster fallback. Sections cover anatomy (cushions, drivers, band, repair), ANC modes (Open / Adaptive / Full quiet), three colourways (Graphite, Fog, Violet), voice quotes, and a Pre-order · €349 close. Demo marketing UI only - no cart backend. Open index.html or host the folder on Cloudflare Workers.",
    category: "landing",
    stack: ["html", "css", "javascript", "threejs", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 172,
    accent: "172",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "landing",
    coverImage: "/marketplace/projects/landing/sonojs-landing-04/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/landing/sonojs-landing-04/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-04/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-landing-04.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Quiet intro gate",
        body: "Room dB meter and Put them on entry - the page gets quieter as you scroll.",
      },
      {
        title: "3D headset hero",
        body: "Three.js headphones with poster still until the live scene is ready.",
      },
      {
        title: "Anatomy to pre-order",
        body: "Cushions, drivers, band, repair grid, ANC modes, colours, voices, and €349 CTA.",
      },
      {
        title: "Static and fork-ready",
        body: "HTML + vendor GSAP / Lenis / Three - open locally or deploy to Workers.",
      },
    ],
    includes: [
      "index.html + css/style.css",
      "js (main, headphones, quiet, waves) + GSAP / Lenis / Three vendors",
      "3D headphones model and hero posters",
      "Product photography WebP set (anatomy, modes, colours, voices)",
      "Local fonts (Red Hat Display, Be Vietnam Pro, Cutiva Mono)",
    ],
    requirements: [
      "Modern browser (WebGL for 3D hero; poster fallback without it)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-hero-08",
    title: "Lumora",
    tagline:
      "Cadet Skyranger hero - head-turn video stage with toggleable helmet overlay.",
    description:
      "Lumora is a full-viewport Cadet Skyranger marketing hero by SonoJS. Built as a single HTML page with Urbanist and Archivo Italic, a fixed artboard frame, plate background, masked head-turn MP4, and a screen-blend helmet still. Push Me toggles the helmet on and off with a short motion. Custom fine-pointer cursor, intro stagger for logo / menu / SKYRANGER headline / captions. Demo UI only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 230,
    accent: "230",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-08/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-08/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-08/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-08.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Head-turn stage",
        body: "Masked looping head-turn video over a plate still - cadet portrait as the hero plane.",
      },
      {
        title: "Helmet toggle",
        body: "Push Me drops a screen-blend helmet on/off with a short enter/exit animation.",
      },
      {
        title: "Skyranger chrome",
        body: "Lumora brand, SKYRANGER headline, captions, and custom cursor on fine pointers.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus fonts, plate, helmet still, and head-turn MP4.",
      },
    ],
    includes: [
      "index.html (complete Lumora hero)",
      "assets/media (plate.jpg, helmet.jpg, head-turn.mp4)",
      "assets/fonts (Urbanist + Archivo Italic)",
      "Intro stagger and helmet toggle logic",
    ],
    requirements: [
      "Modern browser (CSS mask, Web Animations API)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-landing-05",
    title: "VEYRA",
    tagline:
      "Electric, inside out - hover films, cutaways, paint and wheel configurator.",
    description:
      "VEYRA is an interactive automotive design study by SonoJS. Built with Vite, React 18, TypeScript, Tailwind CSS 3, and Lucide. Explore an electric vehicle through short hover films (hood / battery open and close), click-to-detail cutaways, and a compact appearance configurator for five paints and three wheel designs. Media-driven interaction - no WebGL model required. Space Grotesk, blue studio frame, electric-green controls. Demo concept only - not a real automaker. Static build ready for Cloudflare Workers or GitHub Pages.",
    category: "landing",
    stack: ["react", "vite", "typescript", "tailwind", "lucide"],
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
    coverVariant: "landing",
    coverImage: "/marketplace/projects/landing/sonojs-landing-05/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/landing/sonojs-landing-05/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-05/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-landing-05.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Hover-driven films",
        body: "Electric drive and battery zones play forward/reverse video on hover - click for cutaway detail.",
      },
      {
        title: "Appearance configurator",
        body: "Five body paints and three wheel designs, active only from the neutral pose.",
      },
      {
        title: "Product-UI craft",
        body: "Blue studio, white type, electric-green controls, and a tight media frame.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/ with bundled hover films - no API key or GPU required to run.",
      },
    ],
    includes: [
      "Full Vite + React 18 + TypeScript source (VEYRA)",
      "HoverVideo, AppearanceMenu, and content/appearance modules",
      "Bundled public/media hover films and stills",
      "Tailwind CSS 3 + Lucide",
      "Docs for setup, architecture, and media workflow",
    ],
    requirements: [
      "Node.js 22 or newer",
      "pnpm 10 (or npm)",
      "Vite 5",
      "React 18",
      "TypeScript 5",
      "Tailwind CSS 3",
    ],
  },
  {
    slug: "sonojs-landing-06",
    title: "Cinema Reel",
    tagline:
      "Vertical film-festival slider - snap physics, parallax frames, and tilt modal.",
    description:
      "Cinema Reel is a vertical film-festival landing by SonoJS. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and GSAP. Snap-scroll through festival slides with parallax frames, an old-reel entrance timeline, and a 3D-tilt detail modal. All slide images and award SVGs ship under public/ - no remote media URLs. Demo festival chrome only - no ticket backend. Deploy with Next.js on Cloudflare Workers or Node.",
    category: "landing",
    stack: ["nextjs", "react", "typescript", "tailwind", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 18,
    accent: "18",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "landing",
    coverImage: "/marketplace/projects/landing/sonojs-landing-06/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/landing/sonojs-landing-06/cover.mp4",
    detailCoverImage:
      "/marketplace/projects/landing/sonojs-landing-06/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-landing-06.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Snap vertical reel",
        body: "Festival slides snap with parallax frames and an old-reel entrance timeline.",
      },
      {
        title: "3D-tilt detail modal",
        body: "Open a slide for a tilted detail view with title lines and award chrome.",
      },
      {
        title: "Local media only",
        body: "All stills and award SVGs live under public/ - no remote image URLs in source.",
      },
      {
        title: "Next App Router ready",
        body: "Next.js 16 + React 19 + Tailwind 4 - deploy on Workers or any Node host.",
      },
    ],
    includes: [
      "Full Next.js 16 + React 19 + TypeScript source (Cinema Reel)",
      "CinemaReel section with snap scroll, parallax, and tilt modal",
      "Festival slide content and award SVGs under public/",
      "Tailwind CSS 4 + GSAP",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 4",
      "GSAP (included in package.json)",
    ],
  },
  {
    slug: "sonojs-hero-09",
    title: "Sellix",
    tagline:
      "Cross-border finance hero - full-bleed video stage, glass nav, Get Started CTAs.",
    description:
      "Sellix is a full-viewport cross-border finance marketing hero by SonoJS. Built as a single HTML page with Plus Jakarta Sans, a looping background MP4 (poster still until active), glass dark nav, and a stacked Cross-border finance headline with Get Started / secondary CTAs. Mobile burger menu included. Demo fintech chrome only - no backend. Open index.html or host the folder statically on Cloudflare Workers.",
    category: "hero",
    stack: ["html", "css", "javascript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 220,
    accent: "220",
    enabled: true,
    access: "member",
    badge: null,
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-09/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-09/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-09/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-09.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Full-bleed video plane",
        body: "Centered cover video with poster fallback - fades in when ready.",
      },
      {
        title: "Glass finance chrome",
        body: "Sellix wordmark, dark glass nav, and dual Get Started CTAs over the stage.",
      },
      {
        title: "Cross-border headline",
        body: "Stacked Cross-border / finance type with reveal easing and responsive scale.",
      },
      {
        title: "Zero-build static",
        body: "One index.html plus Plus Jakarta Sans, bg.mp4, and poster.webp.",
      },
    ],
    includes: [
      "index.html (complete Sellix hero)",
      "assets/media/bg.mp4 and poster.webp",
      "assets/fonts (Plus Jakarta Sans)",
      "Mobile burger menu and CTA buttons",
    ],
    requirements: [
      "Modern browser (CSS dvh, video autoplay muted)",
      "No build step - open index.html or static-host the folder",
      "Optional: Cloudflare Workers / Pages for hosting",
    ],
  },
  {
    slug: "sonojs-hero-10",
    title: "Visionaries",
    tagline:
      "Orbital art carousel - drag or wheel through painted scenes with glass chrome.",
    description:
      "Visionaries is a full-viewport interactive art hero by SonoJS. Built with Vite, React 19, and TypeScript. A ring of scene cards (Emerald Gate, Mirror, Crossing, Threshold, and more) orbits with drag, wheel, and autoplay; the featured piece fills the stage with title and caption. Chromium glass displacement, chroma accents, and phone layout scaling are included. Local scene JPGs under public/visionaries. Demo gallery UI only - no CMS. Static build ready for Cloudflare Workers.",
    category: "hero",
    stack: ["react", "vite", "typescript"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 95,
    accent: "95",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-10/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-10/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-10/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-10.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Orbital scene ring",
        body: "Drag, wheel, or autoplay through painted scenes arranged on a responsive circle.",
      },
      {
        title: "Featured stage",
        body: "Active card lifts to fill the background with title, caption, and accent tone.",
      },
      {
        title: "Glass chrome",
        body: "Displacement map / chroma glass filter on Chromium for a liquid UI rim.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/ with local visionaries JPGs - deploy anywhere static.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Visionaries)",
      "visionaries module (carousel, glass filter, math, scene data)",
      "public/visionaries scene JPGs",
      "Phone and desktop ring layouts",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5+",
    ],
  },
  {
    slug: "sonojs-hero-11",
    title: "Atlas",
    tagline:
      "Interactive 3D Earth explorer - country pick, fly-to, and landmark cards.",
    description:
      "Atlas is a full-viewport interactive 3D Earth explorer by SonoJS. Built with Vite, React 19, TypeScript, Three.js, and GSAP. Custom day/night Earth shaders, clouds, and stars; pixel-accurate country picking via a GeoJSON-rasterized ID map; fly-to and panel UI for curated places plus local Wikimedia assets under public/assets/atlas. Self-hosted Poppins and Inter. Demo explorer UI only - no backend. Static build ready for Cloudflare Workers.",
    category: "hero",
    stack: ["react", "vite", "typescript", "threejs", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 205,
    accent: "205",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-11/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-11/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-11/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-11.winbeta-com.workers.dev/",
    downloadUrl:
      "https://drive.google.com/file/d/1SkqOMkM8hlCQQFIBfKcHbLvelcHkN6yg/view?usp=drive_link",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Physics-lit Earth",
        body: "Custom Three.js day / night / specular / cloud shaders - not a stock MeshStandardMaterial globe.",
      },
      {
        title: "Pixel-accurate countries",
        body: "GeoJSON-rasterized ID map so hover and pick resolve to the right admin-0 boundary.",
      },
      {
        title: "Fly-to and place cards",
        body: "GSAP camera fly-to with landmark photography and expandable place panels.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/ with local atlas textures and content.json - deploy anywhere static.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Atlas)",
      "atlas module (globe shaders, country pick, panels, content)",
      "public/assets/atlas (Earth textures, GeoJSON, places, content.json)",
      "Self-hosted Poppins + Inter via @fontsource",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5+",
      "Three.js + GSAP (included in package.json)",
      "WebGL2-capable browser",
    ],
  },
  {
    slug: "sonojs-hero-12",
    title: "Liquid Type",
    tagline:
      "Cursor-driven variable typography - every character springs with weight.",
    description:
      "Liquid Type is a full-viewport typography hero by SonoJS. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP, and Geist. The headline Words have weight responds to the cursor with spring physics - variable font weight, scale, trail dots, and ripples. Light/dark theme chrome and local media (liquid-type / membrane webm) under public/media. Demo type study only - no CMS. Deploy with Next.js on Cloudflare Workers or Node.",
    category: "hero",
    stack: ["nextjs", "react", "typescript", "tailwind", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 40,
    accent: "40",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-12/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-12/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-12/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-12.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Spring-weight type",
        body: "Each character tracks the cursor with dampened weight and scale - Words have weight.",
      },
      {
        title: "Trail and ripples",
        body: "Soft pointer trail and ripple accents that follow motion across the stage.",
      },
      {
        title: "Liquid media accents",
        body: "Local liquid-type / membrane webm and PNG under public/media - no remote CDN.",
      },
      {
        title: "Next App Router ready",
        body: "Next.js 16 + React 19 + Tailwind 4 + Geist - deploy on Workers or any Node host.",
      },
    ],
    includes: [
      "Full Next.js 16 + React 19 + TypeScript source (Liquid Type)",
      "LiquidTypeHero + loader components with GSAP springs",
      "public/media liquid-type and membrane assets",
      "Geist sans/mono + Tailwind CSS 4",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Tailwind CSS 4",
      "GSAP + geist (included in package.json)",
    ],
  },
  {
    slug: "sonojs-hero-13",
    title: "Membrane",
    tagline:
      "Interactive mesh hero - spring-physics canvas that deforms under the cursor.",
    description:
      "Membrane is a full-viewport interactive mesh hero by SonoJS. Built with Vite, React 19, TypeScript, Tailwind CSS 4, and GSAP. A 50×30 spring-physics canvas surface deforms under the cursor, with a staggered content entrance. Playfair Display and Geist Variable ship via Fontsource; award SVGs, avatars, and thumbnail live under public/ - no remote media URLs. Demo mesh study only - no CMS. Static build ready for Cloudflare Workers.",
    category: "hero",
    stack: ["react", "vite", "typescript", "tailwind", "gsap"],
    priceLabel: "Free",
    priceCents: 0,
    rating: 0,
    reviewCount: 0,
    salesLabel: "",
    coverHue: 250,
    accent: "250",
    enabled: true,
    access: "member",
    badge: "new",
    coverVariant: "hero",
    coverImage: "/marketplace/projects/hero/sonojs-hero-13/main.webp",
    coverImageDark: null,
    coverVideo: "/marketplace/projects/hero/sonojs-hero-13/cover.mp4",
    detailCoverImage: "/marketplace/projects/hero/sonojs-hero-13/main.webp",
    detailCoverImageDark: null,
    liveUrl: "https://sonojs-hero-13.winbeta-com.workers.dev/",
    downloadUrl: "",
    version: "1.0.0",
    updatedAt: "2026-11-07",
    firstReleasedAt: "2026-11-07",
    screens: 1,
    highlights: [
      {
        title: "Spring mesh surface",
        body: "50×30 canvas points deform under the cursor with dampened spring physics.",
      },
      {
        title: "Staggered content reveal",
        body: "GSAP fades the canvas and staggers headline / CTA entrance over the mesh.",
      },
      {
        title: "Local chrome only",
        body: "Award SVGs, avatars, and thumbnail under public/ - Playfair + Geist via Fontsource.",
      },
      {
        title: "Static and fork-ready",
        body: "Vite build to dist/ - deploy on Cloudflare Workers or any static host.",
      },
    ],
    includes: [
      "Full Vite + React 19 + TypeScript source (Membrane)",
      "Interactive mesh hero canvas + content entrance",
      "public/ award SVGs, avatars, and thumbnail",
      "Tailwind CSS 4 + GSAP + Playfair Display + Geist Variable",
    ],
    requirements: [
      "Node.js 20 or newer",
      "Vite 8",
      "React 19",
      "TypeScript 5+",
      "Tailwind CSS 4",
      "GSAP (included in package.json)",
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
    "portfolio",
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
    "gsap",
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
