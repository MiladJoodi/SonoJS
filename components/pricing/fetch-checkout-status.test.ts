import { describe, expect, it, vi } from "vitest"

import { fetchCheckoutStatus } from "@/components/pricing/fetch-checkout-status"

describe("fetchCheckoutStatus", () => {
  it("returns active payload", async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json({
        status: "active",
        plan: "pro",
        planInterval: "monthly",
        planExpiresAt: "2030-01-01T00:00:00.000Z",
      })
    )
    const result = await fetchCheckoutStatus(fetchImpl)
    expect(result).toEqual({
      ok: true,
      data: {
        status: "active",
        plan: "pro",
        planInterval: "monthly",
        planExpiresAt: "2030-01-01T00:00:00.000Z",
      },
    })
  })

  it("returns pending without treating as success", async () => {
    const fetchImpl = vi.fn(async () =>
      Response.json({ status: "pending" })
    )
    const result = await fetchCheckoutStatus(fetchImpl)
    expect(result).toEqual({ ok: true, data: { status: "pending" } })
  })

  it("maps 401 to unauthorized", async () => {
    const fetchImpl = vi.fn(async () => new Response("nope", { status: 401 }))
    const result = await fetchCheckoutStatus(fetchImpl)
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.unauthorized).toBe(true)
  })
})
