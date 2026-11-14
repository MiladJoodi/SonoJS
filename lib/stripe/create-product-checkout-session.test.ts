import { describe, expect, it } from "vitest"

import {
  PRODUCT_CHECKOUT_KIND,
  PRODUCT_CHECKOUT_TAX_CODE,
  buildProductCheckoutSessionFormBody,
} from "@/lib/stripe/create-product-checkout-session"

describe("buildProductCheckoutSessionFormBody", () => {
  it("builds payment mode with catalog amount (not a Stripe Price id)", () => {
    const body = buildProductCheckoutSessionFormBody({
      clerkUserId: "user_123",
      productSlug: "sonojs-website-05",
      productTitle: "ORNA",
      amountCents: 2900,
      successUrl: "http://localhost:3000/websites/sonojs-website-05?checkout=success",
      cancelUrl: "http://localhost:3000/websites/sonojs-website-05?checkout=cancel",
    })

    expect(body.get("mode")).toBe("payment")
    expect(body.get("line_items[0][price_data][unit_amount]")).toBe("2900")
    expect(body.get("line_items[0][price_data][currency]")).toBe("usd")
    expect(body.get("line_items[0][price_data][product_data][name]")).toBe(
      "ORNA"
    )
    expect(
      body.get("line_items[0][price_data][product_data][tax_code]")
    ).toBe(PRODUCT_CHECKOUT_TAX_CODE)
    expect(body.get("line_items[0][price_data][tax_behavior]")).toBe(
      "inclusive"
    )
    expect(body.get("metadata[kind]")).toBe(PRODUCT_CHECKOUT_KIND)
    expect(body.get("metadata[productSlug]")).toBe("sonojs-website-05")
    expect(body.get("metadata[clerkUserId]")).toBe("user_123")
    expect(body.get("client_reference_id")).toBe("user_123")
    expect(body.get("line_items[0][price]")).toBeNull()
    expect(body.get("customer_creation")).toBe("if_required")
  })

  it("attaches existing Stripe customer when provided", () => {
    const body = buildProductCheckoutSessionFormBody({
      clerkUserId: "user_123",
      productSlug: "sonojs-website-05",
      productTitle: "ORNA",
      amountCents: 2900,
      successUrl: "https://example.com/ok",
      cancelUrl: "https://example.com/cancel",
      stripeCustomerId: "cus_abc",
    })
    expect(body.get("customer")).toBe("cus_abc")
    expect(body.get("customer_creation")).toBeNull()
  })

  it("rejects non-positive amounts", () => {
    expect(() =>
      buildProductCheckoutSessionFormBody({
        clerkUserId: "user_123",
        productSlug: "sonojs-website-05",
        productTitle: "ORNA",
        amountCents: 0,
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/cancel",
      })
    ).toThrow(/amountCents/)
  })
})
