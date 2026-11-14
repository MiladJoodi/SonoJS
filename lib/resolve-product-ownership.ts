import "server-only"

import { getViewer } from "@/lib/access-server"
import { userOwnsProductSlug } from "@/db/queries/product-entitlements"
import { projectRequiresPurchase } from "@/lib/product-entitlement-access"

/** Server ownership for a catalog slug (paid products only). */
export async function resolveProductOwnership(
  slug: string,
  priceCents: number
): Promise<boolean> {
  if (!projectRequiresPurchase({ priceCents })) return false
  const viewer = await getViewer()
  if (viewer.kind === "guest" || !viewer.userId) return false
  return userOwnsProductSlug(viewer.userId, slug)
}
