import "server-only"

import { getActiveSubscriptionByClerkId } from "@/db/queries/subscriptions"
import {
  entitlementFromSubscription,
  type Entitlement,
} from "@/lib/entitlement-core"

export type { Entitlement }
export {
  entitlementFromSubscription,
  viewerFromEntitlement,
} from "@/lib/entitlement-core"

export async function resolveEntitlement(
  clerkUserId: string,
  now: Date = new Date()
): Promise<Entitlement> {
  const sub = await getActiveSubscriptionByClerkId(clerkUserId)
  return entitlementFromSubscription(sub, now)
}
