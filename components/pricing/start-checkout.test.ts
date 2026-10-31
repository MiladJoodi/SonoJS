import { afterEach, describe, expect, it, vi } from "vitest"

import { startCheckout } from "@/components/pricing/start-checkout"

describe("startCheckout", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("returns checkout url on success", async () => {
    const fetchImpl = vi.fn(async () =>
      new Response(
        JSON.stringify({
          url: "https://checkout.stripe.com/c/pay/cs_test",
          sessionId: "cs_test",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
    )

    const result = await startCheckout("pro-monthly", fetchImpl)
    expect(result).toEqual({
      ok: true,
      url: "https://checkout.stripe.com/c/pay/cs_test",
    })
    expect(fetchImpl).toHaveBeenCalledWith(
      "/api/billing/checkout",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ planSlug: "pro-monthly" }),
      })
    )
  })

  it("marks unauthorized on 401", async () => {
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
        })
    )
    const result = await startCheckout("pro-yearly", fetchImpl)
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.unauthorized).toBe(true)
    expect(result.error).toMatch(/sign in/i)
  })

  it("maps PriceNotConfigured", async () => {
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ error: "PriceNotConfigured" }), {
          status: 422,
        })
    )
    const result = await startCheckout("pro-monthly", fetchImpl)
    expect(result).toEqual({
      ok: false,
      error: expect.stringMatching(/not configured/i),
    })
  })

  it("maps AlreadySubscribed", async () => {
    const fetchImpl = vi.fn(
      async () =>
        new Response(JSON.stringify({ error: "AlreadySubscribed" }), {
          status: 409,
        })
    )
    const result = await startCheckout("pro-yearly", fetchImpl)
    expect(result).toEqual({
      ok: false,
      error: expect.stringMatching(/already have an active/i),
    })
  })
})
