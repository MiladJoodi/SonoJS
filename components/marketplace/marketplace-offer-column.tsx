"use client"

import { useAuth } from "@clerk/nextjs"

import { useSignedInHint } from "@/components/auth"
import { WorkspaceOfferRail } from "@/components/workspace-offer-rail"

/**
 * Guest offer rail for marketplace grids.
 * Server SignedInHint keeps the column out for members on first paint;
 * guests keep the column before Clerk JS loads (no jump-in).
 */
export function useMarketplaceOfferRail() {
  const { isLoaded, isSignedIn } = useAuth()
  const initialSignedIn = useSignedInHint()
  const signedIn = isLoaded ? Boolean(isSignedIn) : initialSignedIn
  return !signedIn
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
