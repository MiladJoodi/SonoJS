export type PlanId = "free" | "pro-monthly" | "pro-yearly"

export type Plan = {
  id: PlanId
  name: string
  description: string
  price: string
  currency?: string
  priceNote: string
  /** Crossed-out compare-at price (e.g. yearly vs 12× monthly). */
  compareAtPrice?: string
  /** Optional savings callout under the price (Yearly). */
  savingsNote?: string
  featured?: boolean
  badge?: string
  features: string[]
  cta: string
  href: string
}

export type ComparisonValue = boolean | string

export type ComparisonFeature = {
  label: string
  values: ComparisonValue[]
}

export type ComparisonSection = {
  category: string
  features: ComparisonFeature[]
}

/** Map card/table plan ids to the shared plan mark. */
export function planIconId(id: PlanId): "free" | "pro" {
  return id === "free" ? "free" : "pro"
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Public + member access with an account.",
    price: "0",
    currency: "forever",
    priceNote: "",
    features: [
      "Public & member components",
      "Live previews",
      "CLI for public & member",
      "Account & profile",
      "Support by email",
    ],
    cta: "Create account",
    href: "/sign-up",
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    description: "Full library, billed monthly.",
    price: "12",
    currency: "/ month",
    priceNote: "",
    features: [
      "Everything in Free",
      "Pro components & blocks",
      "Templates",
      "Pro charts",
      "Pro badge",
      "Online Telegram support",
    ],
    cta: "Get All-Access",
    href: "/sign-up",
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    description: "Same Pro access, billed yearly.",
    price: "99",
    currency: "/ year",
    priceNote: "",
    compareAtPrice: "144",
    savingsNote: "Save 31% · $8.25/mo",
    featured: true,
    badge: "Best Value",
    features: [
      "Everything in Free",
      "Pro components & blocks",
      "Templates",
      "Pro charts",
      "Pro badge",
      "Online Telegram support",
    ],
    cta: "Get All-Access",
    href: "/sign-up",
  },
]

export const TABLE_HEADERS = [
  { id: "free" as const, name: "Free", sub: "Signed in" },
  { id: "pro-monthly" as const, name: "Pro Monthly", sub: "$12 / month" },
  { id: "pro-yearly" as const, name: "Pro Yearly", sub: "$99 / year" },
]

export const COMPARISON: ComparisonSection[] = [
  {
    category: "Access",
    features: [
      {
        label: "Public docs & previews",
        values: [true, true, true],
      },
      {
        label: "Member-only components",
        values: [true, true, true],
      },
      {
        label: "Pro-only components & blocks",
        values: [false, true, true],
      },
      {
        label: "Templates",
        values: [false, true, true],
      },
      {
        label: "Account & profile",
        values: [true, true, true],
      },
      {
        label: "Pro badge",
        values: [false, true, true],
      },
    ],
  },
  {
    category: "Library",
    features: [
      {
        label: "UI components",
        values: ["Public + member", "Full library", "Full library"],
      },
      {
        label: "Blocks",
        values: ["Member installs", "All installs", "All installs"],
      },
      {
        label: "Charts",
        values: ["Free charts", "Free + Pro charts", "Free + Pro charts"],
      },
      {
        label: "Templates",
        values: [false, true, true],
      },
      {
        label: "Registry",
        values: [true, true, true],
      },
      {
        label: "Free updates",
        values: [true, true, true],
      },
    ],
  },
  {
    category: "Install & agents",
    features: [
      {
        label: "CLI for public items",
        values: [true, true, true],
      },
      {
        label: "CLI for member items",
        values: [true, true, true],
      },
      {
        label: "MCP server",
        values: [true, true, true],
      },
      {
        label: "Agent-friendly docs",
        values: [true, true, true],
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        label: "Support",
        values: ["Email", "Online Telegram", "Online Telegram"],
      },
    ],
  },
]
