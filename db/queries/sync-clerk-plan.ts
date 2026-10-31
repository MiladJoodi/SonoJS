import "server-only"

import { clerkClient } from "@clerk/nextjs/server"

import { LostClerkLeaseError, wrapDbError } from "@/db/errors"
import { mergePlanPublicMetadata } from "@/db/lib/merge-plan-metadata"
import {
  planFingerprint,
  type SyncedPlan,
} from "@/db/lib/plan-fingerprint"
import {
  acquireClerkSyncLease,
  clearClerkSyncPendingIfHolder,
  releaseClerkSyncLease,
  renewClerkSyncLease,
  requestClerkSync,
} from "@/db/queries/clerk-sync-leases"
import { getActiveSubscriptionByClerkId } from "@/db/queries/subscriptions"

export type { SyncedPlan }

/**
 * Injectable Clerk surface for tests (delayed updateUserMetadata races).
 *
 * ## Clerk API limitation (cannot strictly prevent)
 *
 * Clerk `updateUserMetadata` has no compare-and-swap / generation token.
 * An in-flight HTTP write from an expired lease holder can still land *after*
 * a newer holder’s write. We cannot stop that network race at the API.
 *
 * What we guarantee instead:
 * - Post-write lease renew failure → always `requestClerkSync` (pending).
 * - Next successful sync re-reads Neon and rewrites Clerk to that state.
 * - If DB plan fingerprint moved during the write window, pending stays set.
 */
export type ClerkMetadataClient = {
  getUserPublicMetadata(
    clerkUserId: string
  ): Promise<Record<string, unknown>>
  updateUserPublicMetadata(
    clerkUserId: string,
    publicMetadata: Record<string, unknown>
  ): Promise<void>
}

async function defaultClerkMetadataClient(): Promise<ClerkMetadataClient> {
  const client = await clerkClient()
  return {
    async getUserPublicMetadata(clerkUserId) {
      const user = await client.users.getUser(clerkUserId)
      return (user.publicMetadata ?? {}) as Record<string, unknown>
    },
    async updateUserPublicMetadata(clerkUserId, publicMetadata) {
      await client.users.updateUserMetadata(clerkUserId, {
        publicMetadata,
      })
    },
  }
}

function planFieldsFromSubscription(
  active: Awaited<ReturnType<typeof getActiveSubscriptionByClerkId>>
): SyncedPlan {
  if (!active) {
    return { plan: "free", planInterval: null, planExpiresAt: null }
  }

  const planInterval =
    active.plan.slug === "pro-yearly"
      ? ("yearly" as const)
      : active.plan.slug === "pro-monthly"
        ? ("monthly" as const)
        : active.plan.interval === "year"
          ? ("yearly" as const)
          : ("monthly" as const)

  return {
    plan: "pro",
    planInterval,
    planExpiresAt: active.currentPeriodEnd
      ? active.currentPeriodEnd.toISOString()
      : null,
  }
}

/**
 * Write plan fields to Clerk under lease renewals.
 * If the lease is lost after the Clerk write (stale in-flight request),
 * always re-request pending so another sync repairs metadata from DB.
 */
async function writeClerkPlanMetadata(
  clerkUserId: string,
  fields: SyncedPlan,
  lease: { fence: number; holderToken: string },
  clerk: ClerkMetadataClient
): Promise<{ fingerprint: string; dirtyAfterWrite: boolean }> {
  const fingerprint = planFingerprint(fields)
  let wrote = false

  try {
    await renewClerkSyncLease(clerkUserId, lease.fence, lease.holderToken)

    const existing = await clerk.getUserPublicMetadata(clerkUserId)

    await renewClerkSyncLease(clerkUserId, lease.fence, lease.holderToken)

    const merged = mergePlanPublicMetadata(existing, fields)
    await clerk.updateUserPublicMetadata(clerkUserId, merged)
    wrote = true

    // Confirm lease survived the Clerk round-trip
    await renewClerkSyncLease(clerkUserId, lease.fence, lease.holderToken)
    return { fingerprint, dirtyAfterWrite: false }
  } catch (err) {
    if (err instanceof LostClerkLeaseError) {
      // May have written with a stale snapshot — force another sync from DB
      if (wrote) {
        await requestClerkSync(clerkUserId)
      }
      throw err
    }
    throw err
  }
}

/**
 * Sync Clerk publicMetadata from Neon under a per-user lease (fencing + renewal).
 */
export async function syncClerkPlanFromDb(
  clerkUserId: string,
  options?: { clerk?: ClerkMetadataClient }
): Promise<SyncedPlan> {
  const clerk = options?.clerk ?? (await defaultClerkMetadataClient())

  try {
    await requestClerkSync(clerkUserId)

    let last: SyncedPlan = {
      plan: "free",
      planInterval: null,
      planExpiresAt: null,
    }

    for (let i = 0; i < 5; i++) {
      const lease = await acquireClerkSyncLease(clerkUserId)
      if (!lease.acquired) {
        // Another worker owns the lease — keep pending so they drain after release
        await requestClerkSync(clerkUserId)
        const active = await getActiveSubscriptionByClerkId(clerkUserId)
        return planFieldsFromSubscription(active)
      }

      try {
        // Always re-read DB under the current lease (latest state)
        const active = await getActiveSubscriptionByClerkId(clerkUserId)
        last = planFieldsFromSubscription(active)
        const wroteFp = planFingerprint(last)

        await writeClerkPlanMetadata(
          clerkUserId,
          last,
          { fence: lease.fence, holderToken: lease.holderToken },
          clerk
        )

        // If DB moved during the Clerk write, leave pending for another pass
        const after = await getActiveSubscriptionByClerkId(clerkUserId)
        const afterFp = planFingerprint(planFieldsFromSubscription(after))
        if (afterFp !== wroteFp) {
          await requestClerkSync(clerkUserId)
        } else {
          await clearClerkSyncPendingIfHolder(
            clerkUserId,
            lease.fence,
            lease.holderToken,
            wroteFp
          )
        }
      } catch (err) {
        if (err instanceof LostClerkLeaseError) {
          // writeClerkPlanMetadata already requestClerkSync'd if write landed;
          // also cover lost lease before write
          await requestClerkSync(clerkUserId)
          throw err
        }
        await releaseClerkSyncLease(
          clerkUserId,
          lease.fence,
          lease.holderToken
        ).catch(() => {})
        throw err
      }

      const { pending } = await releaseClerkSyncLease(
        clerkUserId,
        lease.fence,
        lease.holderToken
      )
      if (!pending) return last
      await requestClerkSync(clerkUserId)
    }

    return last
  } catch (err) {
    wrapDbError("Failed to sync Clerk plan from DB", err)
  }
}
