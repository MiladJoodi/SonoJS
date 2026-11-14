/** Shared library DTO — safe for client components (no server-only). */

export type ProductLibraryItem = {
  slug: string
  title: string
  tagline: string
  href: string
  coverSrc: string
  source: "purchase" | "admin_grant"
  amountCents: number | null
  createdAt: string
}
