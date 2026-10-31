import { beforeEach, describe, expect, it, vi } from "vitest"

const getAuthUserId = vi.fn()
const createBillingCheckout = vi.fn()

vi.mock("@/lib/clerk-auth", () => ({
  getAuthUserId: () => getAuthUserId(),
}))

vi.mock("@/lib/stripe/billing-checkout", () => ({
  createBillingCheckout: (input: unknown) => createBillingCheckout(input),
}))

describe("POST /api/billing/checkout", () => {
  beforeEach(() => {
    getAuthUserId.mockReset()
    createBillingCheckout.mockReset()
  })

  it("returns 401 when unauthenticated", async () => {
    getAuthUserId.mockResolvedValue(null)
    const { POST } = await import("@/app/api/billing/checkout/route")
    const res = await POST(
      new Request("http://localhost/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({ planSlug: "pro-monthly" }),
        headers: { "Content-Type": "application/json" },
      })
    )
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: "Unauthorized" })
    expect(createBillingCheckout).not.toHaveBeenCalled()
  })

  it("returns 400 for missing planSlug", async () => {
    getAuthUserId.mockResolvedValue("user_auth")
    const { POST } = await import("@/app/api/billing/checkout/route")
    const res = await POST(
      new Request("http://localhost/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      })
    )
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: "InvalidPlanSlug" })
  })

  it("returns 200 with checkout url for authenticated user", async () => {
    getAuthUserId.mockResolvedValue("user_auth")
    createBillingCheckout.mockResolvedValue({
      ok: true,
      url: "https://checkout.stripe.com/c/pay/cs_auth",
      sessionId: "cs_auth",
    })
    const { POST } = await import("@/app/api/billing/checkout/route")
    const res = await POST(
      new Request("http://localhost/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({ planSlug: "pro-monthly" }),
        headers: { "Content-Type": "application/json" },
      })
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      url: "https://checkout.stripe.com/c/pay/cs_auth",
      sessionId: "cs_auth",
    })
    expect(createBillingCheckout).toHaveBeenCalledWith({
      clerkUserId: "user_auth",
      planSlug: "pro-monthly",
    })
  })

  it("maps PriceNotConfigured to 422", async () => {
    getAuthUserId.mockResolvedValue("user_auth")
    createBillingCheckout.mockResolvedValue({
      ok: false,
      status: 422,
      error: "PriceNotConfigured",
      planSlug: "pro-monthly",
    })
    const { POST } = await import("@/app/api/billing/checkout/route")
    const res = await POST(
      new Request("http://localhost/api/billing/checkout", {
        method: "POST",
        body: JSON.stringify({ planSlug: "pro-monthly" }),
        headers: { "Content-Type": "application/json" },
      })
    )
    expect(res.status).toBe(422)
    expect(await res.json()).toEqual({
      error: "PriceNotConfigured",
      planSlug: "pro-monthly",
    })
  })
})
