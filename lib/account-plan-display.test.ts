import { describe, expect, it } from "vitest"

import { resolveAccountPlanDisplay } from "@/lib/account-plan-display"
import type { BillingSummarySubscription } from "@/hooks/use-billing-summary"

const proMonthlySub: BillingSummarySubscription = {
  id: "sub_1",
  status: "active",
  cancelAtPeriodEnd: false,
  currentPeriodStart: "2026-10-31T00:00:00.000Z",
  currentPeriodEnd: "2026-11-30T00:00:00.000Z",
  canceledAt: null,
  plan: { name: "Pro Monthly", slug: "pro-monthly" },
  source: "neon",
}

describe("resolveAccountPlanDisplay", () => {
  it("prefers active billing subscription over Clerk free metadata", () => {
    const display = resolveAccountPlanDisplay(proMonthlySub, {
      plan: "free",
      planExpiresAt: null,
    })
    expect(display).toMatchObject({
      isPro: true,
      planId: "pro-monthly",
      planName: "Pro Monthly",
      source: "billing",
    })
    expect(display.expiryLabel).toBeTruthy()
  })

  it("falls back to Clerk when billing has no subscription", () => {
    const display = resolveAccountPlanDisplay(null, {
      plan: "free",
    })
    expect(display).toEqual({
      isPro: false,
      planId: "free",
      planName: "Free",
      expiryLabel: null,
      source: "clerk",
    })
  })

  it("ignores canceled billing subscription and uses Clerk Pro", () => {
    const display = resolveAccountPlanDisplay(
      { ...proMonthlySub, status: "canceled" },
      {
        plan: "pro",
        planInterval: "yearly",
        planExpiresAt: "2027-01-01T00:00:00.000Z",
      }
    )
    expect(display).toMatchObject({
      isPro: true,
      planId: "pro-yearly",
      planName: "Pro Yearly",
      source: "clerk",
    })
  })

  it("treats trialing billing as Pro for the hero", () => {
    const display = resolveAccountPlanDisplay(
      { ...proMonthlySub, status: "trialing", plan: { name: "Pro Yearly", slug: "pro-yearly" } },
      { plan: "free" }
    )
    expect(display).toMatchObject({
      isPro: true,
      planId: "pro-yearly",
      planName: "Pro Yearly",
      source: "billing",
    })
  })
})
