import { afterEach, describe, expect, it } from "vitest"

import { StripeApiError } from "@/db/errors"
import {
  buildCheckoutSessionFormBody,
  createCheckoutSession,
} from "@/lib/stripe/create-checkout-session"

describe("buildCheckoutSessionFormBody", () => {
  it("attaches clerk user to client_reference_id and metadata", () => {
    const body = buildCheckoutSessionFormBody({
      clerkUserId: "user_abc",
      stripePriceId: "price_test_123",
      successUrl: "http://localhost:3000/pricing?checkout=success",
      cancelUrl: "http://localhost:3000/pricing?checkout=cancel",
    })
    expect(body.get("mode")).toBe("subscription")
    expect(body.get("line_items[0][price]")).toBe("price_test_123")
    expect(body.get("client_reference_id")).toBe("user_abc")
    expect(body.get("metadata[clerkUserId]")).toBe("user_abc")
    expect(body.get("subscription_data[metadata][clerkUserId]")).toBe(
      "user_abc"
    )
    expect(body.get("customer")).toBeNull()
  })

  it("includes existing Stripe customer when provided", () => {
    const body = buildCheckoutSessionFormBody({
      clerkUserId: "user_abc",
      stripePriceId: "price_test_123",
      successUrl: "https://example.com/s",
      cancelUrl: "https://example.com/c",
      stripeCustomerId: "cus_existing",
    })
    expect(body.get("customer")).toBe("cus_existing")
  })
})

describe("createCheckoutSession", () => {
  const prev = process.env.STRIPE_SECRET_KEY

  afterEach(() => {
    if (prev === undefined) delete process.env.STRIPE_SECRET_KEY
    else process.env.STRIPE_SECRET_KEY = prev
  })

  it("creates a session via mocked Stripe REST", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
    let postedBody = ""
    const fetchImpl: typeof fetch = async (_url, init) => {
      postedBody = String(init?.body ?? "")
      return new Response(
        JSON.stringify({
          id: "cs_test_1",
          url: "https://checkout.stripe.com/c/pay/cs_test_1",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    }

    const session = await createCheckoutSession({
      clerkUserId: "user_meta",
      stripePriceId: "price_from_plan",
      successUrl: "http://localhost:3000/pricing?checkout=success",
      cancelUrl: "http://localhost:3000/pricing?checkout=cancel",
      fetchImpl,
    })

    expect(session.id).toBe("cs_test_1")
    expect(session.url).toContain("checkout.stripe.com")
    expect(postedBody).toContain("mode=subscription")
    expect(postedBody).toContain("client_reference_id=user_meta")
    expect(postedBody).toContain("metadata%5BclerkUserId%5D=user_meta")
    expect(postedBody).toContain(
      "subscription_data%5Bmetadata%5D%5BclerkUserId%5D=user_meta"
    )
    expect(postedBody).toContain("price_from_plan")
  })

  it("throws when STRIPE_SECRET_KEY is missing", async () => {
    delete process.env.STRIPE_SECRET_KEY
    await expect(
      createCheckoutSession({
        clerkUserId: "user_x",
        stripePriceId: "price_x",
        successUrl: "http://localhost/s",
        cancelUrl: "http://localhost/c",
        fetchImpl: async () => new Response("{}", { status: 200 }),
      })
    ).rejects.toBeInstanceOf(StripeApiError)
  })

  it("throws StripeApiError on Stripe error response", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_dummy"
    await expect(
      createCheckoutSession({
        clerkUserId: "user_x",
        stripePriceId: "price_x",
        successUrl: "http://localhost/s",
        cancelUrl: "http://localhost/c",
        fetchImpl: async () => new Response("nope", { status: 400 }),
      })
    ).rejects.toMatchObject({ name: "StripeApiError", status: 400 })
  })
})
