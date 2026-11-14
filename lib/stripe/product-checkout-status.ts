import "server-only"

import { userOwnsProductSlug } from "@/db/queries/product-entitlements"
import { getTemplateProject } from "@/lib/templates-catalog"
import { projectRequiresPurchase } from "@/lib/product-entitlement-access"

export type ProductCheckoutStatusResult =
  | { status: "owned"; slug: string }
  | { status: "pending"; slug: string }
  | { status: "not_for_sale"; slug: string }
  | { status: "not_found"; slug: string }

/**
 * Post-Checkout poll: ownership only when Neon has an active entitlement.
 * Never trust the Stripe redirect alone.
 */
export async function resolveProductCheckoutStatus(
  clerkUserId: string,
  slug: string
): Promise<ProductCheckoutStatusResult> {
  const productSlug = slug.trim()
  if (!productSlug) {
    return { status: "not_found", slug: productSlug }
  }

  const project = getTemplateProject(productSlug)
  if (!project || !project.enabled) {
    return { status: "not_found", slug: productSlug }
  }

  if (!projectRequiresPurchase(project)) {
    return { status: "not_for_sale", slug: productSlug }
  }

  const owned = await userOwnsProductSlug(clerkUserId, project.slug)
  if (owned) {
    return { status: "owned", slug: project.slug }
  }

  return { status: "pending", slug: project.slug }
}
