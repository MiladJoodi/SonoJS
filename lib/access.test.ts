import { describe, expect, it } from "vitest"

import {
  canAccess,
  getUserPlan,
  isProExpired,
  type Viewer,
} from "@/lib/access"

describe("getUserPlan / isProExpired", () => {
  const now = new Date("2026-06-15T12:00:00.000Z")

  it("treats missing plan as free", () => {
    expect(getUserPlan({}, now)).toBe("free")
    expect(getUserPlan(null, now)).toBe("free")
  })

  it("returns pro when plan is pro and not expired", () => {
    expect(
      getUserPlan(
        { plan: "pro", planExpiresAt: "2026-07-01T00:00:00.000Z" },
        now
      )
    ).toBe("pro")
  })

  it("returns free when pro expiry has passed", () => {
    const meta = {
      plan: "pro",
      planExpiresAt: "2026-06-01T00:00:00.000Z",
    }
    expect(isProExpired(meta, now)).toBe(true)
    expect(getUserPlan(meta, now)).toBe("free")
  })

  it("keeps pro without expiry (manual / lifetime)", () => {
    expect(getUserPlan({ plan: "pro" }, now)).toBe("pro")
    expect(isProExpired({ plan: "pro" }, now)).toBe(false)
  })
})

describe("canAccess", () => {
  const guest: Viewer = { kind: "guest" }
  const free: Viewer = {
    kind: "free",
    userId: "u1",
    planExpiresAt: null,
  }
  const pro: Viewer = {
    kind: "pro",
    userId: "u1",
    planExpiresAt: new Date("2026-07-01T00:00:00.000Z"),
  }

  it("gates public / member / pro correctly", () => {
    expect(canAccess(guest, "public")).toBe(true)
    expect(canAccess(guest, "member")).toBe(false)
    expect(canAccess(guest, "pro")).toBe(false)

    expect(canAccess(free, "public")).toBe(true)
    expect(canAccess(free, "member")).toBe(true)
    expect(canAccess(free, "pro")).toBe(false)

    expect(canAccess(pro, "public")).toBe(true)
    expect(canAccess(pro, "member")).toBe(true)
    expect(canAccess(pro, "pro")).toBe(true)
  })
})
