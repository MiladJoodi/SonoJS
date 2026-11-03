import { beforeEach, describe, expect, it, vi } from "vitest"

const getAuthUserId = vi.fn()
const loadBillingSummary = vi.fn()

vi.mock("@/lib/clerk-auth", () => ({
  getAuthUserId: () => getAuthUserId(),
}))

vi.mock("@/lib/stripe/load-billing-summary", () => ({
  loadBillingSummary: (id: string) => loadBillingSummary(id),
}))

describe("GET /api/billing/summary", () => {
  beforeEach(() => {
    getAuthUserId.mockReset()
    loadBillingSummary.mockReset()
    vi.resetModules()
  })

  it("returns 401 when unauthenticated", async () => {
    getAuthUserId.mockResolvedValue(null)
    const { GET } = await import("@/app/api/billing/summary/route")
    const res = await GET()
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: "Unauthorized" })
    expect(loadBillingSummary).not.toHaveBeenCalled()
  })

  it("returns null subscription and empty payments for free user", async () => {
    getAuthUserId.mockResolvedValue("user_free")
    loadBillingSummary.mockResolvedValue({
      hasStripeCustomer: false,
      subscription: null,
      payments: [],
    })

    const { GET } = await import("@/app/api/billing/summary/route")
    const res = await GET()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      hasStripeCustomer: false,
      subscription: null,
      payments: [],
    })
    expect(loadBillingSummary).toHaveBeenCalledWith("user_free")
  })
})
