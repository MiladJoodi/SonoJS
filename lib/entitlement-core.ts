import type { Viewer } from "@/lib/access"

export type Entitlement = {
  kind: "free" | "pro"
  planExpiresAt: Date | null
  planSlug: string | null
}

const ACTIVE = new Set(["active", "trialing", "past_due"])

/**
 * Authoritative Pro check from Neon (not Clerk metadata alone).
 * Pro iff subscription status is active-like and period has not ended.
 */
export function entitlementFromSubscription(
  sub: {
    status: string
    currentPeriodEnd: Date | null
    plan: { slug: string }
  } | null,
  now: Date = new Date()
): Entitlement {
  if (!sub || !ACTIVE.has(sub.status)) {
    return { kind: "free", planExpiresAt: null, planSlug: null }
  }
  const end = sub.currentPeriodEnd
  if (end && end.getTime() <= now.getTime()) {
    return { kind: "free", planExpiresAt: null, planSlug: null }
  }
  return {
    kind: "pro",
    planExpiresAt: end,
    planSlug: sub.plan.slug,
  }
}

export function viewerFromEntitlement(
  userId: string,
  entitlement: Entitlement
): Viewer {
  return {
    kind: entitlement.kind,
    userId,
    planExpiresAt: entitlement.planExpiresAt,
  }
}
