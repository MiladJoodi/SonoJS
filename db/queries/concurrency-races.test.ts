import { config } from "dotenv"
import { eq } from "drizzle-orm"
import { beforeAll, describe, expect, it } from "vitest"

import {
  LostClerkLeaseError,
  LostReconcileLeaseError,
} from "@/db/errors"
import { planFingerprint } from "@/db/lib/plan-fingerprint"

config({ path: ".env.local" })

const hasDb = Boolean(process.env.DATABASE_URL?.trim())

describe.runIf(hasDb)("concurrency race scenarios", () => {
  let createDb: typeof import("@/db/client").createDb
  let schema: typeof import("@/db/schema")
  let claimStripeWebhookEvent: typeof import("@/db/queries/webhook-events").claimStripeWebhookEvent
  let upsertUserFromClerk: typeof import("@/db/queries/users").upsertUserFromClerk
  let applySubscriptionSnapshot: typeof import("@/db/queries/subscriptions").applySubscriptionSnapshot
  let reconcileSubscriptionFromStripe: typeof import("@/db/queries/subscriptions").reconcileSubscriptionFromStripe
  let getSubscriptionByStripeId: typeof import("@/db/queries/subscriptions").getSubscriptionByStripeId
  let acquireSubscriptionReconcileLease: typeof import("@/db/queries/subscription-reconcile-leases").acquireSubscriptionReconcileLease
  let releaseSubscriptionReconcileLease: typeof import("@/db/queries/subscription-reconcile-leases").releaseSubscriptionReconcileLease
  let upsertSubscriptionByStripeId: typeof import("@/db/queries/subscriptions").upsertSubscriptionByStripeId
  let getPlanBySlug: typeof import("@/db/queries/plans").getPlanBySlug
  let syncClerkPlanFromDb: typeof import("@/db/queries/sync-clerk-plan").syncClerkPlanFromDb
  type ClerkMetadataClient =
    import("@/db/queries/sync-clerk-plan").ClerkMetadataClient

  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  beforeAll(async () => {
    ;({ createDb } = await import("@/db/client"))
    schema = await import("@/db/schema")
    ;({ claimStripeWebhookEvent } = await import("@/db/queries/webhook-events"))
    ;({ upsertUserFromClerk } = await import("@/db/queries/users"))
    ;({
      applySubscriptionSnapshot,
      reconcileSubscriptionFromStripe,
      getSubscriptionByStripeId,
      upsertSubscriptionByStripeId,
    } = await import("@/db/queries/subscriptions"))
    ;({
      acquireSubscriptionReconcileLease,
      releaseSubscriptionReconcileLease,
    } = await import("@/db/queries/subscription-reconcile-leases"))
    ;({ getPlanBySlug } = await import("@/db/queries/plans"))
    ;({ syncClerkPlanFromDb } = await import("@/db/queries/sync-clerk-plan"))
  })

  function mockStripeFetch(
    stripeSub: string,
    status: string,
    periodEnd: number
  ): typeof fetch {
    return async () =>
      new Response(
        JSON.stringify({
          id: stripeSub,
          status,
          cancel_at_period_end: status === "canceled",
          current_period_start: 1_700_000_000,
          current_period_end: periodEnd,
          canceled_at: status === "canceled" ? 1_700_050_000 : null,
          ended_at: status === "canceled" ? 1_700_050_000 : null,
          items: { data: [{ price: { id: "price_test" } }] },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
  }

  it("stale reconcile snapshot cannot overwrite newer lease holder state", async () => {
    const stripeSub = `sub_race_${suffix}`
    const user = await upsertUserFromClerk({
      clerkUserId: `user_sub_race_${suffix}`,
    })

    const evtOld = `evt_race_old_${suffix}`
    const evtNew = `evt_race_new_${suffix}`

    const claimOld = await claimStripeWebhookEvent({
      stripeEventId: evtOld,
      type: "customer.subscription.updated",
    })
    const claimNew = await claimStripeWebhookEvent({
      stripeEventId: evtNew,
      type: "customer.subscription.updated",
    })
    expect(claimOld.outcome).toBe("acquired")
    expect(claimNew.outcome).toBe("acquired")
    if (claimOld.outcome !== "acquired" || claimNew.outcome !== "acquired")
      return

    // Worker A acquires reconcile lease, then we expire it
    const leaseA = await acquireSubscriptionReconcileLease(stripeSub, {
      lockMs: 60_000,
    })
    expect(leaseA.acquired).toBe(true)
    if (!leaseA.acquired) return

    const db = createDb()
    await db
      .update(schema.subscriptionReconcileLeases)
      .set({ lockedUntil: new Date(Date.now() - 5_000) })
      .where(
        eq(schema.subscriptionReconcileLeases.stripeSubscriptionId, stripeSub)
      )

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"

    try {
      // Worker B reconciles newer Stripe state under a fresh lease
      const newer = await reconcileSubscriptionFromStripe({
        userId: user.id,
        stripeSubscriptionId: stripeSub,
        claim: {
          stripeEventId: evtNew,
          claimToken: claimNew.claimToken,
        },
        triggerEventId: evtNew,
        fetchImpl: mockStripeFetch(stripeSub, "canceled", 1_700_200_000),
      })
      expect(newer.applied).toBe(true)
      expect(newer.subscription.status).toBe("canceled")

      const afterB = await getSubscriptionByStripeId(stripeSub)
      expect(afterB?.status).toBe("canceled")
      const watermark = afterB!.lastReconciledAt!

      // Worker A tries to apply stale "active" snapshot with expired fence
      await expect(
        applySubscriptionSnapshot({
          userId: user.id,
          stripeSubscriptionId: stripeSub,
          snapshot: {
            id: stripeSub,
            status: "active",
            cancelAtPeriodEnd: false,
            currentPeriodStart: 1_700_000_000,
            currentPeriodEnd: 1_700_100_000,
            canceledAt: null,
            endedAt: null,
            priceId: "price_test",
          },
          claim: {
            stripeEventId: evtOld,
            claimToken: claimOld.claimToken,
          },
          reconcileLease: {
            fence: leaseA.fence,
            holderToken: leaseA.holderToken,
          },
          // Even with a "later" clock, lost lease must block
          snapshotFetchedAt: new Date(watermark.getTime() + 60_000),
          triggerEventId: evtOld,
        })
      ).rejects.toBeInstanceOf(LostReconcileLeaseError)

      const final = await getSubscriptionByStripeId(stripeSub)
      expect(final?.status).toBe("canceled")
      expect(final?.lastReconciledAt?.getTime()).toBe(watermark.getTime())
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("older snapshotFetchedAt watermark cannot overwrite newer reconcile", async () => {
    const stripeSub = `sub_wm_${suffix}`
    const user = await upsertUserFromClerk({
      clerkUserId: `user_wm_${suffix}`,
    })

    const evt1 = `evt_wm1_${suffix}`
    const evt2 = `evt_wm2_${suffix}`
    const c1 = await claimStripeWebhookEvent({
      stripeEventId: evt1,
      type: "customer.subscription.updated",
    })
    const c2 = await claimStripeWebhookEvent({
      stripeEventId: evt2,
      type: "customer.subscription.updated",
    })
    expect(c1.outcome).toBe("acquired")
    expect(c2.outcome).toBe("acquired")
    if (c1.outcome !== "acquired" || c2.outcome !== "acquired") return

    const tNew = new Date("2030-01-02T00:00:00.000Z")
    const tOld = new Date("2030-01-01T00:00:00.000Z")

    const leaseNew = await acquireSubscriptionReconcileLease(stripeSub)
    expect(leaseNew.acquired).toBe(true)
    if (!leaseNew.acquired) return

    const appliedNew = await applySubscriptionSnapshot({
      userId: user.id,
      stripeSubscriptionId: stripeSub,
      snapshot: {
        id: stripeSub,
        status: "canceled",
        cancelAtPeriodEnd: true,
        currentPeriodStart: 1_700_000_000,
        currentPeriodEnd: 1_700_200_000,
        canceledAt: 1_700_050_000,
        endedAt: 1_700_050_000,
        priceId: "price_test",
      },
      claim: { stripeEventId: evt2, claimToken: c2.claimToken },
      reconcileLease: {
        fence: leaseNew.fence,
        holderToken: leaseNew.holderToken,
      },
      snapshotFetchedAt: tNew,
      triggerEventId: evt2,
    })
    expect(appliedNew.applied).toBe(true)
    await releaseSubscriptionReconcileLease(
      stripeSub,
      leaseNew.fence,
      leaseNew.holderToken
    )

    const leaseOld = await acquireSubscriptionReconcileLease(stripeSub)
    expect(leaseOld.acquired).toBe(true)
    if (!leaseOld.acquired) return

    const stale = await applySubscriptionSnapshot({
      userId: user.id,
      stripeSubscriptionId: stripeSub,
      snapshot: {
        id: stripeSub,
        status: "active",
        cancelAtPeriodEnd: false,
        currentPeriodStart: 1_700_000_000,
        currentPeriodEnd: 1_700_100_000,
        canceledAt: null,
        endedAt: null,
        priceId: "price_test",
      },
      claim: { stripeEventId: evt1, claimToken: c1.claimToken },
      reconcileLease: {
        fence: leaseOld.fence,
        holderToken: leaseOld.holderToken,
      },
      snapshotFetchedAt: tOld,
      triggerEventId: evt1,
    })
    expect(stale.applied).toBe(false)
    expect(stale.subscription.status).toBe("canceled")

    await releaseSubscriptionReconcileLease(
      stripeSub,
      leaseOld.fence,
      leaseOld.holderToken
    )

    const final = await getSubscriptionByStripeId(stripeSub)
    expect(final?.status).toBe("canceled")
  })

  it("Clerk delayed stale write: pending recovery re-reads DB and repairs metadata", async () => {
    /**
     * Clerk limitation: updateUserMetadata is not CAS. Worker A's in-flight
     * write can land after B. We prove recovery: lost lease after write keeps
     * pending, and the next sync rewrites Clerk from the latest Neon state.
     */
    const clerkId = `user_clerk_race_${suffix}`
    const user = await upsertUserFromClerk({ clerkUserId: clerkId })
    const monthly = await getPlanBySlug("pro-monthly")
    const yearly = await getPlanBySlug("pro-yearly")
    expect(monthly && yearly).toBeTruthy()

    const evtSeed = `evt_clerk_seed_${suffix}`
    const claimSeed = await claimStripeWebhookEvent({
      stripeEventId: evtSeed,
      type: "test.seed",
    })
    expect(claimSeed.outcome).toBe("acquired")
    if (claimSeed.outcome !== "acquired") return

    // DB starts monthly — A will read this and attempt to write it to Clerk
    await upsertSubscriptionByStripeId({
      userId: user.id,
      planId: monthly!.id,
      status: "active",
      stripeSubscriptionId: `sub_clerk_race_${suffix}`,
      claim: {
        stripeEventId: evtSeed,
        claimToken: claimSeed.claimToken,
      },
      currentPeriodEnd: new Date("2030-06-01T00:00:00.000Z"),
    })

    type Store = Record<string, unknown>
    let clerkStore: Store = { otherKey: "keep-me" }
    let releaseAWrite!: () => void
    const aWriteGate = new Promise<void>((resolve) => {
      releaseAWrite = resolve
    })
    let aWriteStarted = false
    const writeOrder: string[] = []

    const makeClerk = (label: "A" | "B" | "C"): ClerkMetadataClient => ({
      async getUserPublicMetadata() {
        return { ...clerkStore }
      },
      async updateUserPublicMetadata(_id, publicMetadata) {
        if (label === "A") {
          aWriteStarted = true
          await aWriteGate
        }
        writeOrder.push(label)
        clerkStore = { ...publicMetadata }
      },
    })

    // Worker A: acquires lease, reads monthly, blocks inside updateUserMetadata
    const workerA = syncClerkPlanFromDb(clerkId, { clerk: makeClerk("A") })

    for (let i = 0; i < 80 && !aWriteStarted; i++) {
      await new Promise((r) => setTimeout(r, 25))
    }
    expect(aWriteStarted).toBe(true)

    const db = createDb()
    // Expire A's lease so B can acquire while A's HTTP write is still in flight
    await db
      .update(schema.clerkSyncLeases)
      .set({ lockedUntil: new Date(Date.now() - 2_000) })
      .where(eq(schema.clerkSyncLeases.clerkUserId, clerkId))

    // DB advances to yearly (S_new) before B syncs
    const evtYear = `evt_clerk_year_${suffix}`
    const claimYear = await claimStripeWebhookEvent({
      stripeEventId: evtYear,
      type: "test.year",
    })
    expect(claimYear.outcome).toBe("acquired")
    if (claimYear.outcome !== "acquired") return

    await upsertSubscriptionByStripeId({
      userId: user.id,
      planId: yearly!.id,
      status: "active",
      stripeSubscriptionId: `sub_clerk_race_${suffix}`,
      claim: {
        stripeEventId: evtYear,
        claimToken: claimYear.claimToken,
      },
      currentPeriodEnd: new Date("2031-01-01T00:00:00.000Z"),
    })

    // Worker B writes yearly and completes before A's delayed request finishes
    const bResult = await syncClerkPlanFromDb(clerkId, {
      clerk: makeClerk("B"),
    })
    expect(bResult.plan).toBe("pro")
    expect(bResult.planInterval).toBe("yearly")
    expect(clerkStore.planInterval).toBe("yearly")

    // A's stale monthly write lands after B (Clerk API has no CAS)
    releaseAWrite()
    await expect(workerA).rejects.toBeInstanceOf(LostClerkLeaseError)

    const leaseRow = await db.query.clerkSyncLeases.findFirst({
      where: eq(schema.clerkSyncLeases.clerkUserId, clerkId),
    })
    expect(leaseRow?.pending).toBe(true)
    // Stale A write may have clobbered Clerk to monthly
    expect(clerkStore.planInterval).toBe("monthly")

    // Recovery: next sync re-reads Neon and reconciles Clerk to yearly
    const repaired = await syncClerkPlanFromDb(clerkId, {
      clerk: makeClerk("C"),
    })
    expect(repaired.planInterval).toBe("yearly")
    expect(clerkStore.plan).toBe("pro")
    expect(clerkStore.planInterval).toBe("yearly")
    expect(clerkStore.planExpiresAt).toBe("2031-01-01T00:00:00.000Z")
    expect(clerkStore.otherKey).toBe("keep-me")
    expect(planFingerprint(repaired)).toBe(
      planFingerprint({
        plan: "pro",
        planInterval: "yearly",
        planExpiresAt: "2031-01-01T00:00:00.000Z",
      })
    )

    const after = await db.query.clerkSyncLeases.findFirst({
      where: eq(schema.clerkSyncLeases.clerkUserId, clerkId),
    })
    expect(after?.pending).toBe(false)
    expect(writeOrder).toEqual(["B", "A", "C"])
  })
})

