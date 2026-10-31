import { describe, expect, it } from "vitest"

import {
  stripeId,
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
