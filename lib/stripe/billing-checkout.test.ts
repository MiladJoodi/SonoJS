import { config } from "dotenv"

config({ path: ".env.local" })

import { describe, expect, it, vi } from "vitest"

const baseUser = {
  id: "11111111-1111-1111-1111-111111111111",
  clerkUserId: "user_checkout",
  email: null,
  stripeCustomerId: null as string | null,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const basePlan = {
  id: "22222222-2222-2222-2222-222222222222",
  slug: "pro-monthly",
  name: "Pro Monthly",
  interval: "month" as const,
  stripeProductId: null,
  stripePriceId: "price_test_configured",
  amountCents: 0,
  currency: "usd",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe("createBillingCheckout", () => {
  it("rejects invalid planSlug", async () => {
    const { createBillingCheckout } = await import(
      "@/lib/stripe/billing-checkout"
    )
    const result = await createBillingCheckout({
      clerkUserId: "user_x",
      planSlug: "free",
    })
    expect(result).toEqual({
      ok: false,
      status: 400,
      error: "InvalidPlanSlug",
    })
  })

  it("returns 422 when plan has no Stripe Price ID", async () => {
    const { createBillingCheckout } = await import(
      "@/lib/stripe/billing-checkout"
    )
    const result = await createBillingCheckout({
      clerkUserId: "user_checkout",
      planSlug: "pro-monthly",
      deps: {
        upsertUser: async () => baseUser,
        getActiveSub: async () => null,
        getPlan: async () => ({ ...basePlan, stripePriceId: null }),
        createSession: async () => {
          throw new Error("should not create session")
        },
      },
    })
    expect(result).toEqual({
      ok: false,
      status: 422,
      error: "PriceNotConfigured",
      planSlug: "pro-monthly",
    })
  })

  it("returns 409 when user already has an active subscription", async () => {
    const { createBillingCheckout } = await import(
      "@/lib/stripe/billing-checkout"
    )
    const result = await createBillingCheckout({
      clerkUserId: "user_checkout",
      planSlug: "pro-monthly",
      deps: {
        upsertUser: async () => baseUser,
        getActiveSub: async () =>
          ({
            id: "sub-row",
            status: "active",
          }) as never,
        getPlan: async () => basePlan,
        createSession: async () => {
          throw new Error("should not create session")
        },
      },
    })
    expect(result).toEqual({
      ok: false,
      status: 409,
      error: "AlreadySubscribed",
    })
  })

  it("creates a checkout session and passes clerk metadata via helper", async () => {
    const { createBillingCheckout } = await import(
      "@/lib/stripe/billing-checkout"
    )
    const createSession = vi.fn(
      async (input: { clerkUserId: string; stripePriceId: string }) => {
        expect(input.clerkUserId).toBe("user_checkout")
        expect(input.stripePriceId).toBe("price_test_configured")
        return {
          id: "cs_ok",
          url: "https://checkout.stripe.com/c/pay/cs_ok",
        }
      }
    )

    const result = await createBillingCheckout({
      clerkUserId: "user_checkout",
      planSlug: "pro-yearly",
      deps: {
        upsertUser: async () => ({
          ...baseUser,
          stripeCustomerId: "cus_linked",
        }),
        getActiveSub: async () => null,
        getPlan: async (slug) => ({
          ...basePlan,
          slug,
          stripePriceId: "price_test_configured",
        }),
        createSession,
      },
    })

    expect(result).toEqual({
      ok: true,
      url: "https://checkout.stripe.com/c/pay/cs_ok",
      sessionId: "cs_ok",
    })
    expect(createSession).toHaveBeenCalledWith(
      expect.objectContaining({
        clerkUserId: "user_checkout",
        stripePriceId: "price_test_configured",
        stripeCustomerId: "cus_linked",
        successUrl: expect.stringContaining(
          "/pricing?checkout=success&session_id={CHECKOUT_SESSION_ID}"
        ),
        cancelUrl: expect.stringContaining("/pricing?checkout=cancel"),
      })
    )
  })
})
