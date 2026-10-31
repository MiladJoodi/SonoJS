import { config } from "dotenv"

config({ path: ".env.local" })

import { eq } from "drizzle-orm"
import { beforeAll, describe, expect, it } from "vitest"

import { BillingIdentityConflictError } from "@/db/errors"
import { STRIPE_API_VERSION } from "@/lib/stripe/env"
import {
  pipelineResultToHttpStatus,
  type PipelineHttpResult,
} from "@/lib/stripe/http-status"
import {
  signStripeWebhookBody,
  verifyStripeWebhook,
} from "@/lib/stripe/verify-webhook"

const hasDb = Boolean(process.env.DATABASE_URL?.trim())

describe("stripe webhook HTTP mapping", () => {
  it("maps pipeline results to Stripe retry-safe statuses", () => {
    const cases: Array<[PipelineHttpResult, number]> = [
      [{ status: "processed" }, 200],
      [{ status: "skipped", reason: "duplicate" }, 200],
      [{ status: "skipped", reason: "in_flight" }, 503],
      [{ status: "failed", error: "x" }, 500],
    ]
    for (const [result, status] of cases) {
      expect(pipelineResultToHttpStatus(result)).toBe(status)
    }
  })

  it("documents API version used by retrieve helpers", () => {
    expect(STRIPE_API_VERSION).toBe("2024-11-20.acacia")
  })
})

describe.runIf(hasDb)("stripe webhook integration", () => {
  let createDb: typeof import("@/db/client").createDb
  let schema: typeof import("@/db/schema")
  let claimStripeWebhookEvent: typeof import("@/db/queries/webhook-events").claimStripeWebhookEvent
  let runStripeEventPipeline: typeof import("@/db/queries/stripe-event-pipeline").runStripeEventPipeline
  let upsertUserFromClerk: typeof import("@/db/queries/users").upsertUserFromClerk
  let linkStripeCustomerToClerkUser: typeof import("@/db/queries/users").linkStripeCustomerToClerkUser
  let setUserStripeCustomerId: typeof import("@/db/queries/users").setUserStripeCustomerId
  let upsertPayment: typeof import("@/db/queries/payments").upsertPayment
  let getPaymentByStripeInvoiceId: typeof import("@/db/queries/payments").getPaymentByStripeInvoiceId
  let getActiveSubscriptionByClerkId: typeof import("@/db/queries/subscriptions").getActiveSubscriptionByClerkId
  let reconcileSubscriptionFromStripe: typeof import("@/db/queries/subscriptions").reconcileSubscriptionFromStripe
  let getSubscriptionByStripeId: typeof import("@/db/queries/subscriptions").getSubscriptionByStripeId
  let handleStripeEvent: typeof import("@/lib/stripe/handle-stripe-event").handleStripeEvent
  let POST: typeof import("@/app/api/webhooks/stripe/route").POST

  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  beforeAll(async () => {
    ;({ createDb } = await import("@/db/client"))
    schema = await import("@/db/schema")
    ;({ claimStripeWebhookEvent } = await import("@/db/queries/webhook-events"))
    ;({ runStripeEventPipeline } = await import(
      "@/db/queries/stripe-event-pipeline"
    ))
    ;({
      upsertUserFromClerk,
      linkStripeCustomerToClerkUser,
      setUserStripeCustomerId,
    } = await import("@/db/queries/users"))
    ;({ upsertPayment, getPaymentByStripeInvoiceId } = await import(
      "@/db/queries/payments"
    ))
    ;({
      getActiveSubscriptionByClerkId,
      reconcileSubscriptionFromStripe,
      getSubscriptionByStripeId,
    } = await import("@/db/queries/subscriptions"))
    ;({ handleStripeEvent } = await import("@/lib/stripe/handle-stripe-event"))
    ;({ POST } = await import("@/app/api/webhooks/stripe/route"))
  })

  function mockSubFetch(
    stripeSub: string,
    status: string,
    periodEnd = 1_900_000_000,
    metadata: Record<string, string> = {}
  ): typeof fetch {
    return async () =>
      new Response(
        JSON.stringify({
          id: stripeSub,
          status,
          cancel_at_period_end: false,
          current_period_start: 1_700_000_000,
          current_period_end: periodEnd,
          canceled_at: null,
          ended_at: null,
          metadata,
          items: { data: [{ price: { id: "price_test" } }] },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
  }

  it("POST rejects invalid signature with 400", async () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_route_test"
    const req = new Request("http://localhost/api/webhooks/stripe", {
      method: "POST",
      body: JSON.stringify({
        id: "evt_bad",
        type: "invoice.paid",
        created: 1,
        data: { object: {} },
      }),
      headers: { "stripe-signature": "t=1,v1=nope" },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("POST accepts valid signature then processes unknown type as 200", async () => {
    const secret = "whsec_route_ok"
    process.env.STRIPE_WEBHOOK_SECRET = secret
    const body = JSON.stringify({
      id: `evt_ping_${suffix}`,
      type: "ping",
      created: Math.floor(Date.now() / 1000),
      data: { object: { id: "obj" } },
    })
    const t = Math.floor(Date.now() / 1000)
    const header = signStripeWebhookBody(body, secret, t)
    expect(verifyStripeWebhook(body, header, secret, { nowSec: t }).type).toBe(
      "ping"
    )

    const res = await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body,
        headers: { "stripe-signature": header },
      })
    )
    expect(res.status).toBe(200)
  })

  it("in_flight returns 503; stale reclaim acquires again", async () => {
    const eventId = `evt_inflight_${suffix}`
    const first = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "invoice.paid",
    })
    expect(first.outcome).toBe("acquired")

    const second = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "invoice.paid",
      handle: async () => {},
    })
    expect(second).toEqual({ status: "skipped", reason: "in_flight" })
    expect(pipelineResultToHttpStatus(second)).toBe(503)

    const db = createDb()
    await db
      .update(schema.stripeWebhookEvents)
      .set({ updatedAt: new Date(Date.now() - 10 * 60 * 1000) })
      .where(eq(schema.stripeWebhookEvents.stripeEventId, eventId))

    const reclaimed = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "invoice.paid",
      handle: async () => {},
    })
    expect(reclaimed.status).toBe("processed")
  })

  it("duplicate after processed returns 200 mapping", async () => {
    const eventId = `evt_dup_pipe_${suffix}`
    const once = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "ping",
      handle: async () => {},
    })
    expect(once.status).toBe("processed")
    const again = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "ping",
      handle: async () => {
        throw new Error("should not run")
      },
    })
    expect(again).toEqual({ status: "skipped", reason: "duplicate" })
    expect(pipelineResultToHttpStatus(again)).toBe(200)
  })

  it("identity conflict: never overwrite customer mapping", async () => {
    const cus = `cus_conflict_${suffix}`
    await linkStripeCustomerToClerkUser({
      clerkUserId: `user_own_${suffix}`,
      stripeCustomerId: cus,
    })
    await expect(
      linkStripeCustomerToClerkUser({
        clerkUserId: `user_other_${suffix}`,
        stripeCustomerId: cus,
      })
    ).rejects.toBeInstanceOf(BillingIdentityConflictError)

    const u = await upsertUserFromClerk({
      clerkUserId: `user_linked_${suffix}`,
    })
    await setUserStripeCustomerId(u.id, `cus_a_${suffix}`)
    await expect(
      setUserStripeCustomerId(u.id, `cus_b_${suffix}`)
    ).rejects.toBeInstanceOf(BillingIdentityConflictError)
  })

  it("invoice.paid for new customer resolves via subscription metadata.clerkUserId", async () => {
    const clerkId = `user_inv_meta_${suffix}`
    const customerId = `cus_inv_meta_${suffix}`
    const stripeSub = `sub_inv_meta_${suffix}`
    const invoiceId = `in_inv_meta_${suffix}`
    const eventId = `evt_inv_meta_${suffix}`

    // Ensure Clerk user exists in Neon without stripe_customer_id yet
    await upsertUserFromClerk({ clerkUserId: clerkId })

    const claim = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "invoice.paid",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
    const fetchImpl = mockSubFetch(stripeSub, "active", 1_900_000_000, {
      clerkUserId: clerkId,
    })

    try {
      const result = await handleStripeEvent(
        {
          id: eventId,
          type: "invoice.paid",
          created: 5_000,
          data: {
            object: {
              id: invoiceId,
              object: "invoice",
              customer: customerId,
              subscription: stripeSub,
              // No invoice.metadata — typical Checkout invoice
              amount_paid: 1200,
              currency: "usd",
            },
          },
        },
        { stripeEventId: eventId, claimToken: claim.claimToken },
        { fetchImpl }
      )

      expect(result.shouldSyncClerk).toBe(true)
      expect(result.clerkUserId).toBe(clerkId)

      const payment = await getPaymentByStripeInvoiceId(invoiceId)
      expect(payment?.status).toBe("succeeded")
      expect(payment?.amountCents).toBe(1200)

      const sub = await getSubscriptionByStripeId(stripeSub)
      expect(sub?.status).toBe("active")

      const active = await getActiveSubscriptionByClerkId(clerkId)
      expect(active?.stripeSubscriptionId).toBe(stripeSub)

      const db = createDb()
      const linked = await db.query.users.findFirst({
        where: eq(schema.users.clerkUserId, clerkId),
      })
      expect(linked?.stripeCustomerId).toBe(customerId)
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("invoice.paid without subscription metadata stays unlinked (no Pro)", async () => {
    const eventId = `evt_inv_nometasub_${suffix}`
    const invoiceId = `in_inv_nometasub_${suffix}`
    const stripeSub = `sub_inv_nometasub_${suffix}`

    const claim = await claimStripeWebhookEvent({
      stripeEventId: eventId,
      type: "invoice.paid",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"

    try {
      const result = await handleStripeEvent(
        {
          id: eventId,
          type: "invoice.paid",
          created: 5_100,
          data: {
            object: {
              id: invoiceId,
              customer: `cus_nometasub_${suffix}`,
              subscription: stripeSub,
              amount_paid: 500,
              currency: "usd",
            },
          },
        },
        { stripeEventId: eventId, claimToken: claim.claimToken },
        { fetchImpl: mockSubFetch(stripeSub, "active") }
      )
      expect(result.shouldSyncClerk).toBe(false)
      expect(result.auditNote).toMatch(/unlinked_invoice/)
      expect(await getPaymentByStripeInvoiceId(invoiceId)).toBeNull()
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("unlinked invoice.paid (no clerk link) acks 200, no payment, audit note", async () => {
    const eventId = `evt_unlinked_${suffix}`
    const invoiceId = `in_unlinked_${suffix}`
    const customerId = `cus_unlinked_${suffix}`

    const pipe = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "invoice.paid",
      handle: async (claim) => {
        const result = await handleStripeEvent(
          {
            id: eventId,
            type: "invoice.paid",
            created: 4_000,
            data: {
              object: {
                id: invoiceId,
                object: "invoice",
                customer: customerId,
                // Stripe CLI fixtures often omit subscription
                amount_paid: 2000,
                currency: "usd",
              },
            },
          },
          claim
        )
        expect(result.shouldSyncClerk).toBe(false)
        expect(result.clerkUserId).toBeNull()
        expect(result.auditNote).toMatch(/unlinked_invoice/)
        return { auditNote: result.auditNote }
      },
    })

    expect(pipe.status).toBe("processed")
    expect(pipelineResultToHttpStatus(pipe)).toBe(200)

    const payment = await getPaymentByStripeInvoiceId(invoiceId)
    expect(payment).toBeNull()

    const db = createDb()
    const row = await db.query.stripeWebhookEvents.findFirst({
      where: eq(schema.stripeWebhookEvents.stripeEventId, eventId),
    })
    expect(row?.status).toBe("processed")
    expect(row?.lastError).toMatch(/unlinked_invoice/)
    expect(row?.lastError).toMatch(/no_payment_row/)
    expect(row?.lastError).toMatch(/no_pro_grant/)
  })

  it("payment_action_required after invoice.paid keeps succeeded and Pro from sub", async () => {
    const clerkId = `user_par_${suffix}`
    const user = await upsertUserFromClerk({ clerkUserId: clerkId })
    await setUserStripeCustomerId(user.id, `cus_par_${suffix}`)
    const stripeSub = `sub_par_${suffix}`
    const invoice = `in_par_${suffix}`

    const evtPaid = `evt_paid_${suffix}`
    const paidClaim = await claimStripeWebhookEvent({
      stripeEventId: evtPaid,
      type: "invoice.paid",
    })
    expect(paidClaim.outcome).toBe("acquired")
    if (paidClaim.outcome !== "acquired") return

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
    const fetchImpl = mockSubFetch(stripeSub, "active")

    try {
      await reconcileSubscriptionFromStripe({
        userId: user.id,
        stripeSubscriptionId: stripeSub,
        claim: {
          stripeEventId: evtPaid,
          claimToken: paidClaim.claimToken,
        },
        triggerEventId: evtPaid,
        fetchImpl,
      })

      await upsertPayment({
        userId: user.id,
        stripeInvoiceId: invoice,
        amountCents: 5000,
        status: "succeeded",
        claim: {
          stripeEventId: evtPaid,
          claimToken: paidClaim.claimToken,
        },
        lastStripeEventCreated: 2_000,
      })

      const evtPar = `evt_par_${suffix}`
      const parClaim = await claimStripeWebhookEvent({
        stripeEventId: evtPar,
        type: "invoice.payment_action_required",
      })
      expect(parClaim.outcome).toBe("acquired")
      if (parClaim.outcome !== "acquired") return

      const result = await handleStripeEvent(
        {
          id: evtPar,
          type: "invoice.payment_action_required",
          created: 1_500,
          data: {
            object: {
              id: invoice,
              object: "invoice",
              customer: `cus_par_${suffix}`,
              subscription: stripeSub,
              amount_due: 5000,
              currency: "usd",
              payment_intent: { id: `pi_par_${suffix}` },
            },
          },
        },
        { stripeEventId: evtPar, claimToken: parClaim.claimToken },
        { fetchImpl }
      )
      expect(result.shouldSyncClerk).toBe(true)

      const payment = await getPaymentByStripeInvoiceId(invoice)
      expect(payment?.status).toBe("succeeded")

      const active = await getActiveSubscriptionByClerkId(clerkId)
      expect(active?.status).toBe("active")
      expect(active?.stripeSubscriptionId).toBe(stripeSub)
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })

  it("payment_failed does not invent cancel; reconcile keeps live status", async () => {
    const clerkId = `user_fail_${suffix}`
    const user = await upsertUserFromClerk({ clerkUserId: clerkId })
    await setUserStripeCustomerId(user.id, `cus_fail_${suffix}`)
    const stripeSub = `sub_fail_${suffix}`

    const evt = `evt_fail_${suffix}`
    const claim = await claimStripeWebhookEvent({
      stripeEventId: evt,
      type: "invoice.payment_failed",
    })
    expect(claim.outcome).toBe("acquired")
    if (claim.outcome !== "acquired") return

    const prevKey = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"

    try {
      await handleStripeEvent(
        {
          id: evt,
          type: "invoice.payment_failed",
          created: 3_000,
          data: {
            object: {
              id: `in_fail_${suffix}`,
              customer: `cus_fail_${suffix}`,
              subscription: { id: stripeSub },
              amount_due: 100,
              currency: "usd",
            },
          },
        },
        { stripeEventId: evt, claimToken: claim.claimToken },
        { fetchImpl: mockSubFetch(stripeSub, "past_due") }
      )

      const sub = await getSubscriptionByStripeId(stripeSub)
      expect(sub?.status).toBe("past_due")
      expect(sub?.status).not.toBe("canceled")
    } finally {
      if (prevKey === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prevKey
    }
  })

  it("ops reprocess of unlinked invoice.paid grants Pro once; Stripe idempotency unchanged", async () => {
    const clerkId = `user_reproc_${suffix}`
    const customerId = `cus_reproc_${suffix}`
    const stripeSub = `sub_reproc_${suffix}`
    const invoiceId = `in_reproc_${suffix}`
    const eventId = `evt_reproc_${suffix}`

    await upsertUserFromClerk({ clerkUserId: clerkId })

    // 1) First delivery: unlinked (no sub metadata) → processed + audit
    const first = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "invoice.paid",
      handle: async (claim) => {
        const result = await handleStripeEvent(
          {
            id: eventId,
            type: "invoice.paid",
            created: 6_000,
            data: {
              object: {
                id: invoiceId,
                customer: customerId,
                subscription: stripeSub,
                amount_paid: 1200,
                currency: "usd",
              },
            },
          },
          claim,
          { fetchImpl: mockSubFetch(stripeSub, "active") }
        )
        expect(result.auditNote).toMatch(/unlinked_invoice/)
        return { auditNote: result.auditNote }
      },
    })
    expect(first.status).toBe("processed")
    expect(await getPaymentByStripeInvoiceId(invoiceId)).toBeNull()

    // 2) Normal Stripe retry stays duplicate (idempotency unchanged)
    const retry = await runStripeEventPipeline({
      stripeEventId: eventId,
      type: "invoice.paid",
      handle: async () => {
        throw new Error("must not run handle on duplicate")
      },
    })
    expect(retry).toEqual({ status: "skipped", reason: "duplicate" })

    const prev = process.env.STRIPE_SECRET_KEY
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"

    let clerkSyncCalls = 0
    try {
      const { reprocessStripeWebhookEvent } = await import(
        "@/lib/stripe/reprocess-webhook-event"
      )
      const { acquireOpsUnlinkedReprocessClaim } = await import(
        "@/db/queries/webhook-events"
      )

      const fetchImpl = mockSubFetch(stripeSub, "active", 1_900_000_000, {
        clerkUserId: clerkId,
      })

      // 3) Ops reprocess with subscription metadata → payment + Pro
      const ops = await reprocessStripeWebhookEvent(eventId, {
        fetchImpl,
        event: {
          id: eventId,
          type: "invoice.paid",
          created: 6_000,
          data: {
            object: {
              id: invoiceId,
              customer: customerId,
              subscription: stripeSub,
              amount_paid: 1200,
              currency: "usd",
            },
          },
        },
        afterDb: async (result) => {
          expect(result.shouldSyncClerk).toBe(true)
          expect(result.clerkUserId).toBe(clerkId)
          clerkSyncCalls += 1
        },
      })
      expect(ops.status).toBe("processed")
      expect(ops.clerkUserId).toBe(clerkId)
      expect(clerkSyncCalls).toBe(1)

      const payment = await getPaymentByStripeInvoiceId(invoiceId)
      expect(payment?.status).toBe("succeeded")
      expect(payment?.amountCents).toBe(1200)

      const active = await getActiveSubscriptionByClerkId(clerkId)
      expect(active?.stripeSubscriptionId).toBe(stripeSub)
      expect(active?.status).toBe("active")

      const db = createDb()
      const subRows = await db.query.subscriptions.findMany({
        where: eq(schema.subscriptions.stripeSubscriptionId, stripeSub),
      })
      expect(subRows).toHaveLength(1)

      const payRows = await db.query.payments.findMany({
        where: eq(schema.payments.stripeInvoiceId, invoiceId),
      })
      expect(payRows).toHaveLength(1)

      const row = await db.query.stripeWebhookEvents.findFirst({
        where: eq(schema.stripeWebhookEvents.stripeEventId, eventId),
      })
      expect(row?.status).toBe("processed")
      expect(row?.lastError).toBeNull()

      // 4) Second ops reprocess rejected (no duplicate Pro grant path)
      const again = await reprocessStripeWebhookEvent(eventId, {
        fetchImpl,
        event: {
          id: eventId,
          type: "invoice.paid",
          created: 6_000,
          data: {
            object: {
              id: invoiceId,
              customer: customerId,
              subscription: stripeSub,
              amount_paid: 1200,
              currency: "usd",
            },
          },
        },
        afterDb: async () => {
          clerkSyncCalls += 1
        },
      })
      expect(again.status).toBe("rejected")
      if (again.status === "rejected") {
        expect(again.reason).toBe("not_eligible")
      }
      expect(clerkSyncCalls).toBe(1)

      const notEligible = await acquireOpsUnlinkedReprocessClaim(eventId)
      expect(notEligible.outcome).toBe("rejected")
      if (notEligible.outcome === "rejected") {
        expect(notEligible.reason).toBe("not_eligible")
      }

      // Stripe path still duplicate
      const stripeAgain = await runStripeEventPipeline({
        stripeEventId: eventId,
        type: "invoice.paid",
        handle: async () => {
          throw new Error("must not run")
        },
      })
      expect(stripeAgain).toEqual({ status: "skipped", reason: "duplicate" })

      // Still exactly one Pro subscription + one payment
      expect(
        (
          await db.query.subscriptions.findMany({
            where: eq(schema.subscriptions.stripeSubscriptionId, stripeSub),
          })
        ).length
      ).toBe(1)
      expect(
        (
          await db.query.payments.findMany({
            where: eq(schema.payments.stripeInvoiceId, invoiceId),
          })
        ).length
      ).toBe(1)
    } finally {
      if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
      else process.env.STRIPE_SECRET_KEY = prev
    }
  })
})
