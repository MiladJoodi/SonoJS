import { beforeEach, describe, expect, it, vi } from "vitest"

const getAuthUserId = vi.fn()
const getPaymentForClerkUser = vi.fn()
const fetchStripeInvoice = vi.fn()

vi.mock("@/lib/clerk-auth", () => ({
  getAuthUserId: () => getAuthUserId(),
}))

vi.mock("@/db/queries", () => ({
  getPaymentForClerkUser: (paymentId: string, clerkUserId: string) =>
    getPaymentForClerkUser(paymentId, clerkUserId),
}))

vi.mock("@/db/lib/stripe-api", () => ({
  fetchStripeInvoice: (invoiceId: string) => fetchStripeInvoice(invoiceId),
}))

describe("GET /api/billing/invoices/[paymentId]", () => {
  beforeEach(() => {
    getAuthUserId.mockReset()
    getPaymentForClerkUser.mockReset()
    fetchStripeInvoice.mockReset()
  })

  it("returns 401 when unauthenticated", async () => {
    getAuthUserId.mockResolvedValue(null)
    const { GET } = await import(
      "@/app/api/billing/invoices/[paymentId]/route"
    )
    const res = await GET(new Request("http://localhost/api/billing/invoices/p1"), {
      params: Promise.resolve({ paymentId: "p1" }),
    })
    expect(res.status).toBe(401)
    expect(fetchStripeInvoice).not.toHaveBeenCalled()
  })

  it("returns 404 for another user's payment id", async () => {
    getAuthUserId.mockResolvedValue("user_a")
    getPaymentForClerkUser.mockResolvedValue(null)
    const { GET } = await import(
      "@/app/api/billing/invoices/[paymentId]/route"
    )
    const res = await GET(
      new Request("http://localhost/api/billing/invoices/pay_other"),
      { params: Promise.resolve({ paymentId: "pay_other" }) }
    )
    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: "NotFound" })
    expect(getPaymentForClerkUser).toHaveBeenCalledWith("pay_other", "user_a")
    expect(fetchStripeInvoice).not.toHaveBeenCalled()
  })

  it("redirects to hosted invoice url for owned payment", async () => {
    getAuthUserId.mockResolvedValue("user_a")
    getPaymentForClerkUser.mockResolvedValue({
      id: "pay_1",
      stripeInvoiceId: "in_123",
    })
    fetchStripeInvoice.mockResolvedValue({
      hostedInvoiceUrl: "https://invoice.stripe.com/i/acct_test/test",
      invoicePdf: "https://pay.stripe.com/invoice/test/pdf",
    })
    const { GET } = await import(
      "@/app/api/billing/invoices/[paymentId]/route"
    )
    const res = await GET(
      new Request("http://localhost/api/billing/invoices/pay_1"),
      { params: Promise.resolve({ paymentId: "pay_1" }) }
    )
    expect(res.status).toBe(302)
    expect(res.headers.get("location")).toBe(
      "https://invoice.stripe.com/i/acct_test/test"
    )
  })
})
