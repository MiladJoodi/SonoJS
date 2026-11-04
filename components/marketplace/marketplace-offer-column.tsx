"use client"

import { WorkspaceOfferRail } from "@/components/workspace-offer-rail"

/**
 * Offer rail column for marketplace grids (guests + members).
 * Always reserve the xl column — copy switches inside WorkspaceOfferRail.
 */
export function useMarketplaceOfferRail() {
  return true
}

export function MarketplaceOfferColumn() {
  const show = useMarketplaceOfferRail()
  if (!show) return null

  return (
    <div className="hidden min-w-0 xl:block">
      <WorkspaceOfferRail className="w-full max-w-none pe-0" />
    </div>
  )
}
