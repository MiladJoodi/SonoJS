export type LegalNavPage = {
  id: string
  title: string
  href: string
  description: string
}

/** Sidebar + index list for /legal. */
export const legalNav: LegalNavPage[] = [
  {
    id: "terms",
    title: "Terms of Service",
    href: "/legal/terms",
    description: "Rules for using SonoJS and purchasing Pro.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    href: "/legal/privacy",
    description: "How we handle account, billing, and support data.",
  },
  {
    id: "license",
    title: "Pro License",
    href: "/legal/license",
    description: "Usage rights for Pro components and blocks.",
  },
  {
    id: "refund",
    title: "Refund Policy",
    href: "/legal/refund",
    description: "How refund requests for Pro are handled.",
  },
]

export function getLegalCurrentLabel(pathname: string): string | null {
  if (pathname === "/legal") return "Legal"
  const page = legalNav.find(
    (p) => pathname === p.href || pathname.startsWith(`${p.href}/`)
  )
  return page?.title ?? null
}

export function getLegalAdjacent(pathname: string): {
  previous: { href: string; title: string } | null
  next: { href: string; title: string } | null
} {
  if (pathname === "/legal") {
    const first = legalNav[0]
    return {
      previous: null,
      next: first ? { href: first.href, title: first.title } : null,
    }
  }

  const index = legalNav.findIndex(
    (p) => pathname === p.href || pathname.startsWith(`${p.href}/`)
  )
  if (index < 0) return { previous: null, next: null }
  const previous = index > 0 ? legalNav[index - 1]! : null
  const next = index < legalNav.length - 1 ? legalNav[index + 1]! : null
  return {
    previous: previous
      ? { href: previous.href, title: previous.title }
      : { href: "/legal", title: "Legal" },
    next: next ? { href: next.href, title: next.title } : null,
  }
}
