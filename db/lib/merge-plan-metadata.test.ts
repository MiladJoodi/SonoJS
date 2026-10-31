import { describe, expect, it } from "vitest"

import { mergePlanPublicMetadata } from "@/db/lib/merge-plan-metadata"

describe("mergePlanPublicMetadata", () => {
  it("preserves unrelated keys", () => {
    const merged = mergePlanPublicMetadata(
      { theme: "dark", plan: "free", nested: { a: 1 } },
      {
        plan: "pro",
        planExpiresAt: "2030-01-01T00:00:00.000Z",
        planInterval: "yearly",
      }
    )
    expect(merged).toEqual({
      theme: "dark",
      nested: { a: 1 },
      plan: "pro",
      planExpiresAt: "2030-01-01T00:00:00.000Z",
      planInterval: "yearly",
    })
  })

  it("works with empty existing metadata", () => {
    const merged = mergePlanPublicMetadata(null, {
      plan: "free",
      planExpiresAt: null,
      planInterval: null,
    })
    expect(merged.plan).toBe("free")
    expect(merged.planExpiresAt).toBeNull()
  })
})
