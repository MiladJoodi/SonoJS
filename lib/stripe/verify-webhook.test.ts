import { describe, expect, it } from "vitest"

import {
  signStripeWebhookBody,
  StripeWebhookSignatureError,
  verifyStripeWebhook,
} from "@/lib/stripe/verify-webhook"

const SECRET = "whsec_test_secret"
const BODY = JSON.stringify({
  id: "evt_test_1",
  type: "invoice.paid",
  created: 1_700_000_000,
  data: { object: { id: "in_1", object: "invoice" } },
})

describe("verifyStripeWebhook", () => {
  it("accepts a valid signature", () => {
    const t = Math.floor(Date.now() / 1000)
    const header = signStripeWebhookBody(BODY, SECRET, t)
    const event = verifyStripeWebhook(BODY, header, SECRET, { nowSec: t })
    expect(event.id).toBe("evt_test_1")
    expect(event.type).toBe("invoice.paid")
  })

  it("accepts when any of multiple v1 signatures match", () => {
    const t = Math.floor(Date.now() / 1000)
    const header = signStripeWebhookBody(BODY, SECRET, t, [
      "deadbeef",
      "cafebabe",
    ])
    expect(
      verifyStripeWebhook(BODY, header, SECRET, { nowSec: t }).id
    ).toBe("evt_test_1")
  })

  it("rejects tampered body", () => {
    const t = Math.floor(Date.now() / 1000)
    const header = signStripeWebhookBody(BODY, SECRET, t)
    const tampered = BODY.replace("invoice.paid", "invoice.payment_failed")
    expect(() =>
      verifyStripeWebhook(tampered, header, SECRET, { nowSec: t })
    ).toThrow(StripeWebhookSignatureError)
  })

  it("rejects wrong secret", () => {
    const t = Math.floor(Date.now() / 1000)
    const header = signStripeWebhookBody(BODY, SECRET, t)
    expect(() =>
      verifyStripeWebhook(BODY, header, "whsec_other", { nowSec: t })
    ).toThrow(StripeWebhookSignatureError)
  })

  it("rejects expired timestamp", () => {
    const t = Math.floor(Date.now() / 1000) - 10_000
    const header = signStripeWebhookBody(BODY, SECRET, t)
    expect(() =>
      verifyStripeWebhook(BODY, header, SECRET, {
        nowSec: Math.floor(Date.now() / 1000),
        toleranceSec: 300,
      })
    ).toThrow(/tolerance/)
  })

  it("rejects missing header", () => {
    expect(() => verifyStripeWebhook(BODY, null, SECRET)).toThrow(
      /Missing Stripe-Signature/
    )
  })

  it("rejects malformed timestamp safely", () => {
    expect(() =>
      verifyStripeWebhook(BODY, "t=notanumber,v1=abc", SECRET)
    ).toThrow(/Malformed/)
  })

  it("rejects unequal-length v1 without throwing from timingSafeEqual", () => {
    const t = Math.floor(Date.now() / 1000)
    const header = `t=${t},v1=short`
    expect(() =>
      verifyStripeWebhook(BODY, header, SECRET, { nowSec: t })
    ).toThrow(/No matching/)
  })
})
