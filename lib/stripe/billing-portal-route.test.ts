import { beforeEach, describe, expect, it, vi } from "vitest"

const getAuthUserId = vi.fn()
const getUserByClerkId = vi.fn()
const createBillingPortalSession = vi.fn()

vi.mock("@/lib/clerk-auth", () => ({
  getAuthUserId: () => getAuthUserId(),
}))

vi.mock("@/db/queries", () => ({
  getUserByClerkId: (id: string) => getUserByClerkId(id),
}))

vi.mock("@/db/lib/stripe-api", () => ({
  createBillingPortalSession: (input: unknown) =>
    createBillingPortalSession(input),
}))

vi.mock("@/lib/config", () => ({
  siteConfig: { url: "http://localhost:3000" },
}))

describe("POST /api/billing/portal", () => {
  beforeEach(() => {
    getAuthUserId.mockReset()
    getUserByClerkId.mockReset()
    createBillingPortalSession.mockReset()
  })

  it("returns 401 when unauthenticated", async () => {
    getAuthUserId.mockResolvedValue(null)
    const { POST } = await import("@/app/api/billing/portal/route")
    const res = await POST()
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: "Unauthorized" })
    expect(createBillingPortalSession).not.toHaveBeenCalled()
  })

  it("returns 422 when user has no stripeCustomerId", async () => {
    getAuthUserId.mockResolvedValue("user_free")
    getUserByClerkId.mockResolvedValue({
      id: "uuid-1",
      clerkUserId: "user_free",
      stripeCustomerId: null,
    })
    const { POST } = await import("@/app/api/billing/portal/route")
    const res = await POST()
    expect(res.status).toBe(422)
    expect(await res.json()).toEqual({ error: "NoStripeCustomer" })
    expect(createBillingPortalSession).not.toHaveBeenCalled()
  })

  it("returns portal url when customer is linked", async () => {
    getAuthUserId.mockResolvedValue("user_pro")
    getUserByClerkId.mockResolvedValue({
      id: "uuid-2",
      clerkUserId: "user_pro",
      stripeCustomerId: "cus_test_123",
    })
    createBillingPortalSession.mockResolvedValue({
      url: "https://billing.stripe.com/session/test",
    })
    const { POST } = await import("@/app/api/billing/portal/route")
    const res = await POST()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      url: "https://billing.stripe.com/session/test",
    })
    expect(createBillingPortalSession).toHaveBeenCalledWith({
      customerId: "cus_test_123",
      returnUrl: "http://localhost:3000/account?tab=billing",
    })
  })
})
