"use client"

import { WorkspaceOfferRail } from "@/components/workspace-offer-rail"

/** Marketplace keeps an xl offer column when the rail is open. */
export function useMarketplaceOfferRail() {
  return true
}

export function MarketplaceOfferColumn() {
  return (
    <div className="hidden min-w-0 xl:block">
      <WorkspaceOfferRail className="w-full max-w-none pe-0" />
    </div>
  )
}
