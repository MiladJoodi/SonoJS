/** Lightweight templates types + labels (safe for client imports). */

export type TemplateCategory =
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

export type TemplateStack =
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

export type TemplateBadge = "bestseller" | "new" | "free"

export type TemplateCoverVariant =
  | "dashboard"
  | "landing"
  | "auth"
  | "shop"
  | "ai"
  | "saas"
  | "hero"

export type TemplateProject = {
  slug: string
  title: string
  tagline: string
  description: string
  category: TemplateCategory
  stack: TemplateStack[]
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
  badge: TemplateBadge | null
  coverVariant: TemplateCoverVariant
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
  /** Optional local run command shown on the detail page (copyable). */
  runCommand?: string
}

export const TEMPLATE_BADGE_LABEL: Record<TemplateBadge, string> = {
  bestseller: "Bestseller",
  new: "New",
  free: "Free",
}

export const TEMPLATE_CATEGORY_LABEL: Record<TemplateCategory, string> = {
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

export const TEMPLATE_STACK_LABEL: Record<TemplateStack, string> = {
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
