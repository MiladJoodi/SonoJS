import "server-only"

import { getActiveSubscriptionByClerkId } from "@/db/queries/subscriptions"
import { syncClerkPlanFromDb } from "@/db/queries/sync-clerk-plan"
import type { SyncedPlan } from "@/db/lib/plan-fingerprint"

export type CheckoutReturnActive = {
  status: "active"
  plan: "pro"
  planInterval: SyncedPlan["planInterval"]
  planExpiresAt: string | null
}

export type CheckoutReturnPending = {
  status: "pending"
}

export type CheckoutReturnStatusResult =
  | CheckoutReturnActive
  | CheckoutReturnPending

/**
 * Server truth for post-Checkout return:
 * Pro is active only when Neon has an active subscription.
 * On active, push Clerk metadata from DB (same path as webhook afterDb).
 */
export async function resolveCheckoutReturnStatus(
  clerkUserId: string,
  options?: {
    getActiveSub?: typeof getActiveSubscriptionByClerkId
    syncClerk?: typeof syncClerkPlanFromDb
  }
): Promise<CheckoutReturnStatusResult> {
  const getActiveSub =
    options?.getActiveSub ?? getActiveSubscriptionByClerkId
  const syncClerk = options?.syncClerk ?? syncClerkPlanFromDb

  const active = await getActiveSub(clerkUserId)
  if (!active) {
    return { status: "pending" }
  }

  const synced = await syncClerk(clerkUserId)
  if (synced.plan !== "pro") {
    // Race: sub row briefly inconsistent — keep waiting
    return { status: "pending" }
  }

  return {
    status: "active",
    plan: "pro",
    planInterval: synced.planInterval,
    planExpiresAt: synced.planExpiresAt,
  }
}
