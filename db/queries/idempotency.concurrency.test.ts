import { config } from "dotenv"
import { eq, sql } from "drizzle-orm"
import { beforeAll, describe, expect, it } from "vitest"

import { LostClerkLeaseError, LostWebhookClaimError } from "@/db/errors"

config({ path: ".env.local" })

const hasDb = Boolean(process.env.DATABASE_URL?.trim())

describe.runIf(hasDb)("billing idempotency + concurrency", () => {
  let createDb: typeof import("@/db/client").createDb
  let schema: typeof import("@/db/schema")
  let claimStripeWebhookEvent: typeof import("@/db/queries/webhook-events").claimStripeWebhookEvent
  let markStripeWebhookProcessed: typeof import("@/db/queries/webhook-events").markStripeWebhookProcessed
  let upsertSubscriptionByStripeId: typeof import("@/db/queries/subscriptions").upsertSubscriptionByStripeId
  let reconcileSubscriptionFromStripe: typeof import("@/db/queries/subscriptions").reconcileSubscriptionFromStripe
  let upsertPayment: typeof import("@/db/queries/payments").upsertPayment
  let upsertUserFromClerk: typeof import("@/db/queries/users").upsertUserFromClerk
  let getPlanBySlug: typeof import("@/db/queries/plans").getPlanBySlug
  let acquireClerkSyncLease: typeof import("@/db/queries/clerk-sync-leases").acquireClerkSyncLease
  let releaseClerkSyncLease: typeof import("@/db/queries/clerk-sync-leases").releaseClerkSyncLease
  let renewClerkSyncLease: typeof import("@/db/queries/clerk-sync-leases").renewClerkSyncLease
  let requestClerkSync: typeof import("@/db/queries/clerk-sync-leases").requestClerkSync
  let clearClerkSyncPendingIfHolder: typeof import("@/db/queries/clerk-sync-leases").clearClerkSyncPendingIfHolder

  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  beforeAll(async () => {
    ;({ createDb } = await import("@/db/client"))
    schema = await import("@/db/schema")
    ;({
      claimStripeWebhookEvent,
      markStripeWebhookProcessed,
    } = await import("@/db/queries/webhook-events"))
    ;({
      upsertSubscriptionByStripeId,
      reconcileSubscriptionFromStripe,
    } = await import("@/db/queries/subscriptions"))
    ;({ upsertPayment } = await import("@/db/queries/payments"))
    ;({ upsertUserFromClerk } = await import("@/db/queries/users"))
    ;({ getPlanBySlug } = await import("@/db/queries/plans"))
    ;({
      acquireClerkSyncLease,
      releaseClerkSyncLease,
      renewClerkSyncLease,
      requestClerkSync,
      clearClerkSyncPendingIfHolder,
    } = await import("@/db/queries/clerk-sync-leases"))
  })

  it("concurrent claim: exactly one acquired", async () => {
    const eventId = `evt_claim_${suffix}`
    const [a, b] = await Promise.all([
      claimStripeWebhookEvent({ stripeEventId: eventId, type: "test.a" }),
      claimStripeWebhookEvent({ stripeEventId: eventId, type: "test.a" }),
    ])
    const acquired = [a, b].filter((x) => x.outcome === "acquired")
    const blocked = [a, b].filter((x) => x.outcome !== "acquired")
    expect(acquired).toHaveLength(1)
    expect(blocked).toHaveLength(1)
  })

  it("duplicate after processed", async () => {
    const eventId = `evt_dup_${suffix}`
    const first = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "test.dup",
    })
    expect(first.outcome).toBe("acquired")
    if (first.outcome !== "acquired") return
    expect(
      await markStripeWebhookProcessed(eventId, first.claimToken)
    ).toBe(true)
    expect(
      (
        await claimStripeWebhookEvent({
          stripeEventId: eventId,
          type: "test.dup",
        })
      ).outcome
    ).toBe("duplicate")
  })

  it("stale reclaim fences old claim token on markProcessed", async () => {
    const eventId = `evt_fence_${suffix}`
    const first = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "test.fence",
    })
    expect(first.outcome).toBe("acquired")
    if (first.outcome !== "acquired") return

    const db = createDb()
    await db
      .update(schema.stripeWebhookEvents)
      .set({ updatedAt: new Date(Date.now() - 10 * 60 * 1000) })
      .where(eq(schema.stripeWebhookEvents.stripeEventId, eventId))

    const second = await claimStripeWebhookEvent(
      { stripeEventId: eventId, type: "test.fence" },
      { staleAfterMs: 60_000 }
    )
    expect(second.outcome).toBe("acquired")
    if (second.outcome !== "acquired") return

    expect(
      await markStripeWebhookProcessed(eventId, first.claimToken)
    ).toBe(false)
    expect(
      await markStripeWebhookProcessed(eventId, second.claimToken)
    ).toBe(true)
  })

  it("lost claim cannot mutate subscription (atomic ownership)", async () => {
    const eventId = `evt_own_${suffix}`
    const first = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "test.own",
    })
    expect(first.outcome).toBe("acquired")
    if (first.outcome !== "acquired") return

    const db = createDb()
    await db
      .update(schema.stripeWebhookEvents)
      .set({ updatedAt: new Date(Date.now() - 10 * 60 * 1000) })
      .where(eq(schema.stripeWebhookEvents.stripeEventId, eventId))

    const second = await claimStripeWebhookEvent(
      { stripeEventId: eventId, type: "test.own" },
      { staleAfterMs: 60_000 }
    )
    expect(second.outcome).toBe("acquired")
    if (second.outcome !== "acquired") return

    const user = await upsertUserFromClerk({
      clerkUserId: `user_own_${suffix}`,
    })
    const plan = await getPlanBySlug("pro-monthly")

    await expect(
      upsertSubscriptionByStripeId({
        userId: user.id,
        planId: plan!.id,
        status: "canceled",
        stripeSubscriptionId: `sub_own_stale_${suffix}`,
        claim: {
          stripeEventId: eventId,
          claimToken: first.claimToken,
        },
      })
    ).rejects.toBeInstanceOf(LostWebhookClaimError)

    const ok = await upsertSubscriptionByStripeId({
      userId: user.id,
      planId: plan!.id,
      status: "active",
      stripeSubscriptionId: `sub_own_stale_${suffix}`,
      claim: {
        stripeEventId: eventId,
        claimToken: second.claimToken,
      },
    })
    expect(ok.subscription.status).toBe("active")
  })

  it("lost claim cannot mutate payment", async () => {
    const eventId = `evt_pay_own_${suffix}`
    const first = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "test.pay",
    })
    expect(first.outcome).toBe("acquired")
    if (first.outcome !== "acquired") return

    const db = createDb()
    await db
      .update(schema.stripeWebhookEvents)
      .set({ updatedAt: new Date(Date.now() - 10 * 60 * 1000) })
      .where(eq(schema.stripeWebhookEvents.stripeEventId, eventId))

    const second = await claimStripeWebhookEvent(
      { stripeEventId: eventId, type: "test.pay" },
      { staleAfterMs: 60_000 }
    )
    expect(second.outcome).toBe("acquired")
    if (second.outcome !== "acquired") return

    const user = await upsertUserFromClerk({
      clerkUserId: `user_pay_own_${suffix}`,
    })

    await expect(
      upsertPayment({
        userId: user.id,
        stripeInvoiceId: `in_own_${suffix}`,
        amountCents: 1,
        status: "failed",
        claim: { stripeEventId: eventId, claimToken: first.claimToken },
      })
    ).rejects.toBeInstanceOf(LostWebhookClaimError)

    const ok = await upsertPayment({
      userId: user.id,
      stripeInvoiceId: `in_own_${suffix}`,
      amountCents: 5000,
      status: "succeeded",
      claim: { stripeEventId: eventId, claimToken: second.claimToken },
    })
    expect(ok.payment.amountCents).toBe(5000)
    expect(ok.payment.status).toBe("succeeded")
  })

  it("payment upsert is idempotent under same claim", async () => {
    const eventId = `evt_pay_id_${suffix}`
    const claim = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "test.pay.id",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const user = await upsertUserFromClerk({
      clerkUserId: `user_pay_id_${suffix}`,
    })
    const invoice = `in_id_${suffix}`

    await upsertPayment({
      userId: user.id,
      stripeInvoiceId: invoice,
      amountCents: 1000,
      status: "succeeded",
      claim: { stripeEventId: eventId, claimToken: claim.claimToken },
    })
    await upsertPayment({
      userId: user.id,
      stripeInvoiceId: invoice,
      amountCents: 1000,
      status: "succeeded",
      claim: { stripeEventId: eventId, claimToken: claim.claimToken },
    })

    const db = createDb()
    const rows = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(schema.payments)
      .where(eq(schema.payments.stripeInvoiceId, invoice))
    expect(rows[0]?.n).toBe(1)
  })

  it("reconcileSubscriptionFromStripe uses Stripe snapshot (mocked)", async () => {
    const eventId = `evt_rec_${suffix}`
    const claim = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "customer.subscription.updated",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const user = await upsertUserFromClerk({
      clerkUserId: `user_rec_${suffix}`,
    })
    const stripeSub = `sub_rec_${suffix}`

    const fetchImpl: typeof fetch = async () =>
      new Response(
        JSON.stringify({
          id: stripeSub,
          status: "active",
          cancel_at_period_end: false,
          current_period_start: 1_700_000_000,
          current_period_end: 1_700_100_000,
          canceled_at: null,
          ended_at: null,
          items: { data: [{ price: { id: "price_test" } }] },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )

    // Avoid needing STRIPE_SECRET_KEY for mock path — temporarily set
    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"

    try {
      const result = await reconcileSubscriptionFromStripe({
        userId: user.id,
        stripeSubscriptionId: stripeSub,
        claim: { stripeEventId: eventId, claimToken: claim.claimToken },
        triggerEventId: eventId,
        fetchImpl,
      })
      expect(result.applied).toBe(true)
      expect(result.subscription.status).toBe("active")
      expect(result.subscription.lastReconciledAt).toBeTruthy()
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("reconcile leaves event retryable when Stripe API fails", async () => {
    const eventId = `evt_rec_fail_${suffix}`
    const claim = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "customer.subscription.updated",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const user = await upsertUserFromClerk({
      clerkUserId: `user_rec_fail_${suffix}`,
    })

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
    const fetchImpl: typeof fetch = async () =>
      new Response("nope", { status: 500 })

    try {
      await expect(
        reconcileSubscriptionFromStripe({
          userId: user.id,
          stripeSubscriptionId: `sub_fail_${suffix}`,
          claim: { stripeEventId: eventId, claimToken: claim.claimToken },
          fetchImpl,
        })
      ).rejects.toMatchObject({ name: "StripeApiError", status: 500 })
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("clerk lease: acquire preserves pending; renew fences stale holder", async () => {
    const clerkId = `user_lease_${suffix}`
    await requestClerkSync(clerkId)

    const [a, b] = await Promise.all([
      acquireClerkSyncLease(clerkId),
      acquireClerkSyncLease(clerkId),
    ])
    const holders = [a, b].filter((x) => x.acquired)
    expect(holders).toHaveLength(1)
    const winner = holders[0]!
    if (!winner.acquired) return

    const db = createDb()
    const row = await db.query.clerkSyncLeases.findFirst({
      where: eq(schema.clerkSyncLeases.clerkUserId, clerkId),
    })
    // pending must still be true until clearClerkSyncPendingIfHolder
    expect(row?.pending).toBe(true)

    await renewClerkSyncLease(clerkId, winner.fence, winner.holderToken)

    await expect(
      renewClerkSyncLease(clerkId, winner.fence - 1, winner.holderToken)
    ).rejects.toBeInstanceOf(LostClerkLeaseError)

    expect(
      await clearClerkSyncPendingIfHolder(
        clerkId,
        winner.fence,
        winner.holderToken
      )
    ).toBe(true)

    const after = await db.query.clerkSyncLeases.findFirst({
      where: eq(schema.clerkSyncLeases.clerkUserId, clerkId),
    })
    expect(after?.pending).toBe(false)

    expect(
      (
        await releaseClerkSyncLease(
          clerkId,
          winner.fence,
          winner.holderToken
        )
      ).released
    ).toBe(true)
  })

  it("clerk lease: failed acquire re-requests pending", async () => {
    const clerkId = `user_lease2_${suffix}`
    const first = await acquireClerkSyncLease(clerkId, { lockMs: 60_000 })
    expect(first.acquired).toBe(true)
    if (!first.acquired) return

    const second = await acquireClerkSyncLease(clerkId)
    expect(second.acquired).toBe(false)

    await requestClerkSync(clerkId)
    const db = createDb()
    const row = await db.query.clerkSyncLeases.findFirst({
      where: eq(schema.clerkSyncLeases.clerkUserId, clerkId),
    })
    expect(row?.pending).toBe(true)

    await releaseClerkSyncLease(clerkId, first.fence, first.holderToken)
  })
})
