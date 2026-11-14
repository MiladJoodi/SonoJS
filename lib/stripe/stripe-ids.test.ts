import { describe, expect, it } from "vitest"

import {
  stripeId,
  stripeInvoicePaymentIntentId,
  stripeMetadataClerkUserId,
} from "@/lib/stripe/stripe-ids"

describe("stripeId", () => {
  it("reads string ids", () => {
    expect(stripeId("cus_123")).toBe("cus_123")
    expect(stripeId("  sub_1  ")).toBe("sub_1")
  })

  it("reads expanded objects", () => {
    expect(stripeId({ id: "cus_exp" })).toBe("cus_exp")
  })

  it("handles nullish and empty", () => {
    expect(stripeId(null)).toBeNull()
    expect(stripeId(undefined)).toBeNull()
    expect(stripeId("")).toBeNull()
    expect(stripeId({ id: "" })).toBeNull()
    expect(stripeId({ id: null })).toBeNull()
  })
})

describe("stripeMetadataClerkUserId", () => {
  it("reads clerkUserId and clerk_user_id", () => {
    expect(stripeMetadataClerkUserId({ clerkUserId: "user_a" })).toBe(
      "user_a"
    )
    expect(stripeMetadataClerkUserId({ clerk_user_id: "user_b" })).toBe(
      "user_b"
    )
  })
})

describe("stripeInvoicePaymentIntentId", () => {
  it("reads legacy payment_intent", () => {
    expect(
      stripeInvoicePaymentIntentId({ payment_intent: "pi_legacy" })
    ).toBe("pi_legacy")
  })

  it("reads basil payments.data[].payment.payment_intent", () => {
    expect(
      stripeInvoicePaymentIntentId({
        payments: {
          data: [
            {
              payment: {
                type: "payment_intent",
                payment_intent: "pi_basil",
              },
            },
          ],
        },
      })
    ).toBe("pi_basil")
  })

  it("returns null when missing", () => {
    expect(stripeInvoicePaymentIntentId({})).toBeNull()
    expect(stripeInvoicePaymentIntentId(null)).toBeNull()
  })
})
