import type { PlanId } from "@/components/pricing/pricing-data"
import type { BillingSummarySubscription } from "@/hooks/use-billing-summary"
import {
  formatPlanExpiry,
  getEffectivePlanExpiresAt,
  getUserPlan,
  getViewerPlanId,
  planLabel,
} from "@/lib/access"

export type AccountPlanDisplay = {
  isPro: boolean
  planId: PlanId
  planName: string
  expiryLabel: string | null
  source: "billing" | "clerk"
}

/** Match `getActiveSubscriptionByClerkId` active set. */
const ACTIVE_STATUSES = new Set(["active", "trialing", "past_due"])

/**
 * Prefer live billing summary so Clerk metadata lag never shows Free
 * while Stripe/Neon already show Pro. Shared by header + /account.
 */
export function resolveAccountPlanDisplay(
  subscription: BillingSummarySubscription | null | undefined,
  clerkMetadata: unknown
): AccountPlanDisplay {
  if (subscription && ACTIVE_STATUSES.has(subscription.status)) {
    const slug = subscription.plan.slug
    const planId: PlanId =
      slug === "pro-yearly" ? "pro-yearly" : "pro-monthly"
    const planName =
      subscription.plan.name?.trim() ||
      (planId === "pro-yearly" ? "Pro Yearly" : "Pro Monthly")
    const expiry = subscription.currentPeriodEnd
      ? new Date(subscription.currentPeriodEnd)
      : null
    return {
      isPro: true,
      planId,
      planName,
      expiryLabel: formatPlanExpiry(
        expiry && !Number.isNaN(expiry.getTime()) ? expiry : null
      ),
      source: "billing",
    }
  }

  return {
    isPro: getUserPlan(clerkMetadata) === "pro",
    planId: getViewerPlanId(clerkMetadata),
    planName: planLabel(clerkMetadata),
    expiryLabel: formatPlanExpiry(getEffectivePlanExpiresAt(clerkMetadata)),
    source: "clerk",
  }
}
