import { config } from "dotenv"

config({ path: ".env.local" })

import { describe, expect, it, vi } from "vitest"

describe("resolveCheckoutReturnStatus", () => {
  it("returns pending when Neon has no active subscription", async () => {
    const { resolveCheckoutReturnStatus } = await import(
      "@/lib/stripe/checkout-return-status"
    )
    const syncClerk = vi.fn()
    const result = await resolveCheckoutReturnStatus("user_x", {
      getActiveSub: async () => null,
      syncClerk,
    })
    expect(result).toEqual({ status: "pending" })
    expect(syncClerk).not.toHaveBeenCalled()
  })

  it("syncs Clerk and returns active when Neon has Pro", async () => {
    const { resolveCheckoutReturnStatus } = await import(
      "@/lib/stripe/checkout-return-status"
    )
    const syncClerk = vi.fn(async () => ({
      plan: "pro" as const,
      planInterval: "yearly" as const,
      planExpiresAt: "2031-06-01T00:00:00.000Z",
    }))
    const result = await resolveCheckoutReturnStatus("user_pro", {
      getActiveSub: async () => ({ id: "sub_row" }) as never,
      syncClerk,
    })
    expect(syncClerk).toHaveBeenCalledWith("user_pro")
    expect(result).toEqual({
      status: "active",
      plan: "pro",
      planInterval: "yearly",
      planExpiresAt: "2031-06-01T00:00:00.000Z",
    })
  })

  it("stays pending if sync reports free after active row", async () => {
    const { resolveCheckoutReturnStatus } = await import(
      "@/lib/stripe/checkout-return-status"
    )
    const result = await resolveCheckoutReturnStatus("user_race", {
      getActiveSub: async () => ({ id: "x" }) as never,
      syncClerk: async () => ({
        plan: "free",
        planInterval: null,
        planExpiresAt: null,
      }),
    })
    expect(result).toEqual({ status: "pending" })
  })
})
