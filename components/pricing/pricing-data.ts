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
    description: "Public and member library with a free account.",
    price: "0",
    currency: "forever",
    priceNote: "",
    features: [
      "Public and member components",
      "Live previews",
      "CLI for public and member items",
      "Account and profile",
      "Email support",
    ],
    cta: "Create account",
    href: "/sign-up",
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    description:
      "Full Pro library for 30 days. One payment. No automatic renewal.",
    price: "12",
    currency: "/ month",
    priceNote: "",
    features: [
      "Everything in Free",
      "Pro components",
      "Pro blocks",
      "Pro charts",
      "All templates",
      "Telegram support",
    ],
    cta: "Get Pro Monthly",
    href: "/sign-up",
  },
  {
    id: "pro-yearly",
    name: "Pro Yearly",
    description:
      "Full Pro library for 12 months. One payment. Lowest price per month.",
    price: "99",
    currency: "/ year",
    priceNote: "",
    compareAtPrice: "144",
    savingsNote: "Save 31% · equals $8.25/mo",
    featured: true,
    badge: "Best Value",
    features: [
      "Everything in Free",
      "Pro components",
      "Pro blocks",
      "Pro charts",
      "All templates",
      "Telegram support",
    ],
    cta: "Get Pro Yearly",
    href: "/sign-up",
  },
]

export const TABLE_HEADERS = [
  { id: "free" as const, name: "Free", sub: "With account" },
  { id: "pro-monthly" as const, name: "Pro Monthly", sub: "$12 / 30 days" },
  { id: "pro-yearly" as const, name: "Pro Yearly", sub: "$99 / 12 months" },
]

export const COMPARISON: ComparisonSection[] = [
  {
    category: "Access",
    features: [
      {
        label: "Public docs and previews",
        values: [true, true, true],
      },
      {
        label: "Member components",
        values: [true, true, true],
      },
      {
        label: "Pro components",
        values: [false, true, true],
      },
      {
        label: "Pro blocks",
        values: [false, true, true],
      },
      {
        label: "Pro charts",
        values: [false, true, true],
      },
      {
        label: "All templates",
        values: [false, true, true],
      },
      {
        label: "Account and profile",
        values: [true, true, true],
      },
    ],
  },
  {
    category: "Library",
    features: [
      {
        label: "UI components",
        values: ["Public and member", "Full library", "Full library"],
      },
      {
        label: "Blocks",
        values: ["Member only", "All blocks", "All blocks"],
      },
      {
        label: "Charts",
        values: ["Free charts", "Free and Pro charts", "Free and Pro charts"],
      },
      {
        label: "Templates",
        values: [false, "All templates", "All templates"],
      },
      {
        label: "Registry installs",
        values: [true, true, true],
      },
      {
        label: "Updates during access",
        values: [true, true, true],
      },
    ],
  },
  {
    category: "Install and agents",
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
        label: "Docs for AI coding agents",
        values: [true, true, true],
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        label: "Support",
        values: ["Email", "Telegram", "Telegram"],
      },
    ],
  },
]
