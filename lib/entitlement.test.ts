import { describe, expect, it } from "vitest"

import { entitlementFromSubscription } from "@/lib/entitlement-core"

describe("entitlementFromSubscription", () => {
  const now = new Date("2026-06-15T12:00:00.000Z")

  it("returns free when there is no subscription", () => {
    expect(entitlementFromSubscription(null, now)).toEqual({
      kind: "free",
      planExpiresAt: null,
      planSlug: null,
    })
  })

  it("returns pro for active sub with future period end", () => {
    const end = new Date("2026-07-01T00:00:00.000Z")
    expect(
      entitlementFromSubscription(
        {
          status: "active",
          currentPeriodEnd: end,
          plan: { slug: "pro-monthly" },
        },
        now
      )
    ).toEqual({
      kind: "pro",
      planExpiresAt: end,
      planSlug: "pro-monthly",
    })
  })

  it("returns free when period has ended even if status is active", () => {
    expect(
      entitlementFromSubscription(
        {
          status: "active",
          currentPeriodEnd: new Date("2026-06-01T00:00:00.000Z"),
          plan: { slug: "pro-yearly" },
        },
        now
      ).kind
    ).toBe("free")
  })

  it("returns free for canceled status", () => {
    expect(
      entitlementFromSubscription(
        {
          status: "canceled",
          currentPeriodEnd: new Date("2026-07-01T00:00:00.000Z"),
          plan: { slug: "pro-monthly" },
        },
        now
      ).kind
    ).toBe("free")
  })

  it("treats trialing as pro when not expired", () => {
    expect(
      entitlementFromSubscription(
        {
          status: "trialing",
          currentPeriodEnd: new Date("2026-08-01T00:00:00.000Z"),
          plan: { slug: "pro-monthly" },
        },
        now
      ).kind
    ).toBe("pro")
  })
})
