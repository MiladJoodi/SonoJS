import { beforeEach, describe, expect, it, vi } from "vitest"

const ensureUserFromClerk = vi.fn()
const getUserByClerkId = vi.fn()
const getBillingSubscriptionByClerkId = vi.fn()
const listPaymentsByClerkId = vi.fn()
const getPlanByStripePriceId = vi.fn()
const linkStripeCustomerToClerkUser = vi.fn()
const getUserByStripeCustomerId = vi.fn()
const clearUserStripeCustomerId = vi.fn()
const listStripeCustomerSubscriptions = vi.fn()
const findStripeCustomerIdByClerkUserId = vi.fn()
const listStripeCustomerIdsByEmail = vi.fn()
const clerkGetUser = vi.fn()

vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: async () => ({
    users: { getUser: (id: string) => clerkGetUser(id) },
  }),
}))

vi.mock("@/db/queries", () => ({
  ensureUserFromClerk: (id: string) => ensureUserFromClerk(id),
  getUserByClerkId: (id: string) => getUserByClerkId(id),
  getBillingSubscriptionByClerkId: (id: string) =>
    getBillingSubscriptionByClerkId(id),
  listPaymentsByClerkId: (id: string, opts?: { limit?: number }) =>
    listPaymentsByClerkId(id, opts),
  getPlanByStripePriceId: (id: string) => getPlanByStripePriceId(id),
  linkStripeCustomerToClerkUser: (input: unknown) =>
    linkStripeCustomerToClerkUser(input),
  getUserByStripeCustomerId: (id: string) => getUserByStripeCustomerId(id),
  clearUserStripeCustomerId: (id: string) => clearUserStripeCustomerId(id),
}))

vi.mock("@/db/lib/stripe-api", () => ({
  listStripeCustomerSubscriptions: (id: string, fetchImpl?: typeof fetch) =>
    listStripeCustomerSubscriptions(id, fetchImpl),
  findStripeCustomerIdByClerkUserId: (id: string, fetchImpl?: typeof fetch) =>
    findStripeCustomerIdByClerkUserId(id, fetchImpl),
  listStripeCustomerIdsByEmail: (email: string, fetchImpl?: typeof fetch) =>
    listStripeCustomerIdsByEmail(email, fetchImpl),
}))

const activeSub = {
  id: "sub_found",
  status: "active",
  cancelAtPeriodEnd: false,
  currentPeriodStart: 1_700_000_000,
  currentPeriodEnd: 1_702_592_000,
  canceledAt: null,
  endedAt: null,
  priceId: "price_pro",
  metadata: {},
}

describe("loadBillingSummary", () => {
  beforeEach(() => {
    ensureUserFromClerk.mockReset()
    getUserByClerkId.mockReset()
    getBillingSubscriptionByClerkId.mockReset()
    listPaymentsByClerkId.mockReset()
    getPlanByStripePriceId.mockReset()
    linkStripeCustomerToClerkUser.mockReset()
    getUserByStripeCustomerId.mockReset()
    clearUserStripeCustomerId.mockReset()
    listStripeCustomerSubscriptions.mockReset()
    findStripeCustomerIdByClerkUserId.mockReset()
    listStripeCustomerIdsByEmail.mockReset()
    clerkGetUser.mockReset()
    vi.resetModules()
  })

  it("uses Neon subscription when present", async () => {
    ensureUserFromClerk.mockResolvedValue({ id: "u1" })
    getUserByClerkId.mockResolvedValue({
      id: "u1",
      stripeCustomerId: "cus_1",
    })
    getBillingSubscriptionByClerkId.mockResolvedValue({
      id: "sub_neon",
      status: "active",
      cancelAtPeriodEnd: false,
      currentPeriodStart: new Date("2026-01-01T00:00:00.000Z"),
      currentPeriodEnd: new Date("2026-02-01T00:00:00.000Z"),
      canceledAt: null,
      plan: { name: "Pro Monthly", slug: "pro-monthly" },
    })
    listPaymentsByClerkId.mockResolvedValue([])

    const { loadBillingSummary } = await import(
      "@/lib/stripe/load-billing-summary"
    )
    const summary = await loadBillingSummary("user_1")
    expect(summary.subscription).toMatchObject({
      id: "sub_neon",
      source: "neon",
    })
    expect(findStripeCustomerIdByClerkUserId).not.toHaveBeenCalled()
  })

  it("searches Stripe by clerkUserId when Neon has no stripeCustomerId", async () => {
    ensureUserFromClerk.mockResolvedValue({ id: "u1" })
    getUserByClerkId.mockResolvedValue({
      id: "u1",
      stripeCustomerId: null,
    })
    getBillingSubscriptionByClerkId.mockResolvedValue(null)
    listPaymentsByClerkId.mockResolvedValue([])
    findStripeCustomerIdByClerkUserId.mockResolvedValue("cus_found")
    linkStripeCustomerToClerkUser.mockResolvedValue({
      id: "u1",
      stripeCustomerId: "cus_found",
    })
    listStripeCustomerSubscriptions.mockResolvedValue([activeSub])
    getPlanByStripePriceId.mockResolvedValue({
      name: "Pro Monthly",
      slug: "pro-monthly",
    })

    const { loadBillingSummary } = await import(
      "@/lib/stripe/load-billing-summary"
    )
    const summary = await loadBillingSummary("user_showcase")
    expect(findStripeCustomerIdByClerkUserId).toHaveBeenCalledWith(
      "user_showcase",
      undefined
    )
    expect(summary.subscription).toMatchObject({
      id: "sub_found",
      source: "stripe",
      status: "active",
    })
  })

  it("falls back to email when clerk metadata search misses (recreated account)", async () => {
    ensureUserFromClerk.mockResolvedValue({ id: "u_new" })
    getUserByClerkId.mockResolvedValue({
      id: "u_new",
      stripeCustomerId: null,
    })
    getBillingSubscriptionByClerkId.mockResolvedValue(null)
    listPaymentsByClerkId.mockResolvedValue([])
    findStripeCustomerIdByClerkUserId.mockResolvedValue(null)
    clerkGetUser.mockResolvedValue({
      primaryEmailAddressId: "em_1",
      emailAddresses: [
        { id: "em_1", emailAddress: "winbeta.com@gmail.com" },
      ],
    })
    listStripeCustomerIdsByEmail.mockResolvedValue(["cus_email"])
    listStripeCustomerSubscriptions.mockResolvedValue([activeSub])
    linkStripeCustomerToClerkUser.mockResolvedValue({
      id: "u_new",
      stripeCustomerId: "cus_email",
    })
    getPlanByStripePriceId.mockResolvedValue({
      name: "Pro Monthly",
      slug: "pro-monthly",
    })

    const { loadBillingSummary } = await import(
      "@/lib/stripe/load-billing-summary"
    )
    const summary = await loadBillingSummary("user_new")
    expect(listStripeCustomerIdsByEmail).toHaveBeenCalledWith(
      "winbeta.com@gmail.com",
      undefined
    )
    expect(summary.hasStripeCustomer).toBe(true)
    expect(summary.subscription).toMatchObject({
      source: "stripe",
      status: "active",
    })
  })

  it("returns null subscription when Stripe search and email miss", async () => {
    ensureUserFromClerk.mockResolvedValue({ id: "u1" })
    getUserByClerkId.mockResolvedValue({
      id: "u1",
      stripeCustomerId: null,
    })
    getBillingSubscriptionByClerkId.mockResolvedValue(null)
    listPaymentsByClerkId.mockResolvedValue([])
    findStripeCustomerIdByClerkUserId.mockResolvedValue(null)
    clerkGetUser.mockResolvedValue({
      primaryEmailAddressId: "em_1",
      emailAddresses: [{ id: "em_1", emailAddress: "free@example.com" }],
    })
    listStripeCustomerIdsByEmail.mockResolvedValue([])

    const { loadBillingSummary } = await import(
      "@/lib/stripe/load-billing-summary"
    )
    const summary = await loadBillingSummary("user_free")
    expect(summary).toEqual({
      hasStripeCustomer: false,
      subscription: null,
      payments: [],
    })
  })
})
