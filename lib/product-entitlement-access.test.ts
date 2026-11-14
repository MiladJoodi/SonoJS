import { describe, expect, it } from "vitest"

import type { Viewer } from "@/lib/access"
import {
  canDownloadCatalogProject,
  projectRequiresPurchase,
} from "@/lib/product-entitlement-access"

const guest: Viewer = { kind: "guest" }
const free: Viewer = { kind: "free", userId: "user_free", planExpiresAt: null }
const pro: Viewer = { kind: "pro", userId: "user_pro", planExpiresAt: null }

describe("projectRequiresPurchase", () => {
  it("is false for free / zero / missing price", () => {
    expect(projectRequiresPurchase({ priceCents: 0 })).toBe(false)
    expect(projectRequiresPurchase({})).toBe(false)
    expect(projectRequiresPurchase({ priceCents: null })).toBe(false)
  })

  it("is true when priceCents > 0", () => {
    expect(projectRequiresPurchase({ priceCents: 2900 })).toBe(true)
    expect(projectRequiresPurchase({ priceCents: 1 })).toBe(true)
  })
})

describe("canDownloadCatalogProject", () => {
  it("allows public free downloads for guests", () => {
    expect(
      canDownloadCatalogProject({
        viewer: guest,
        access: "public",
        requiresPurchase: false,
        ownsProduct: false,
      })
    ).toEqual({ ok: true })
  })

  it("requires sign-in for member free items", () => {
    const denied = canDownloadCatalogProject({
      viewer: guest,
      access: "member",
      requiresPurchase: false,
      ownsProduct: false,
    })
    expect(denied.ok).toBe(false)
    if (!denied.ok) {
      expect(denied.status).toBe(401)
      expect(denied.code).toBe("auth_required")
    }
  })

  it("allows free member downloads for signed-in free users", () => {
    expect(
      canDownloadCatalogProject({
        viewer: free,
        access: "member",
        requiresPurchase: false,
        ownsProduct: false,
      })
    ).toEqual({ ok: true })
  })

  it("requires Pro for pro-gated free items", () => {
    const denied = canDownloadCatalogProject({
      viewer: free,
      access: "pro",
      requiresPurchase: false,
      ownsProduct: false,
    })
    expect(denied.ok).toBe(false)
    if (!denied.ok) {
      expect(denied.code).toBe("pro_required")
      expect(denied.status).toBe(403)
    }

    expect(
      canDownloadCatalogProject({
        viewer: pro,
        access: "pro",
        requiresPurchase: false,
        ownsProduct: false,
      })
    ).toEqual({ ok: true })
  })

  it("does not let Pro unlock paid products without ownership", () => {
    const denied = canDownloadCatalogProject({
      viewer: pro,
      access: "member",
      requiresPurchase: true,
      ownsProduct: false,
    })
    expect(denied.ok).toBe(false)
    if (!denied.ok) {
      expect(denied.code).toBe("purchase_required")
      expect(denied.status).toBe(403)
    }
  })

  it("allows paid download only with ownership (even without Pro)", () => {
    expect(
      canDownloadCatalogProject({
        viewer: free,
        access: "member",
        requiresPurchase: true,
        ownsProduct: true,
      })
    ).toEqual({ ok: true })

    expect(
      canDownloadCatalogProject({
        viewer: pro,
        access: "member",
        requiresPurchase: true,
        ownsProduct: true,
      })
    ).toEqual({ ok: true })
  })

  it("requires auth before purchase for paid products", () => {
    const denied = canDownloadCatalogProject({
      viewer: guest,
      access: "member",
      requiresPurchase: true,
      ownsProduct: false,
    })
    expect(denied.ok).toBe(false)
    if (!denied.ok) {
      expect(denied.code).toBe("auth_required")
      expect(denied.status).toBe(401)
    }
  })

  it("ignores ownsProduct for free items (no purchase path)", () => {
    expect(
      canDownloadCatalogProject({
        viewer: free,
        access: "member",
        requiresPurchase: false,
        ownsProduct: true,
      })
    ).toEqual({ ok: true })
  })
})
