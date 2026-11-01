import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

describe("readRegistryJsonText", () => {
  const prevFetch = globalThis.fetch
  const prevAppUrl = process.env.NEXT_PUBLIC_APP_URL

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    globalThis.fetch = prevFetch
    if (prevAppUrl === undefined) delete process.env.NEXT_PUBLIC_APP_URL
    else process.env.NEXT_PUBLIC_APP_URL = prevAppUrl
    vi.unstubAllEnvs()
  })

  it("rejects invalid names", async () => {
    const { readRegistryJsonText } = await import("@/lib/read-registry-json")
    expect(await readRegistryJsonText("../evil")).toBeNull()
    expect(await readRegistryJsonText("has space")).toBeNull()
  })

  it("reads accordion from disk when present", async () => {
    const { readRegistryJsonText } = await import("@/lib/read-registry-json")
    const raw = await readRegistryJsonText("accordion")
    expect(raw).toBeTruthy()
    expect(raw).toContain("accordion")
  })

  it("falls back to fetch when disk miss", async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ name: "fake-from-net" }), { status: 200 })
    ) as typeof fetch

    const { readRegistryJsonText } = await import("@/lib/read-registry-json")
    const raw = await readRegistryJsonText("zz-missing-registry-item-xyz")
    expect(raw).toContain("fake-from-net")
    expect(globalThis.fetch).toHaveBeenCalled()
  })

  it("uses PRODUCTION_ORIGIN in production when APP_URL unset", async () => {
    delete process.env.NEXT_PUBLIC_APP_URL
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("VERCEL_ENV", "production")

    globalThis.fetch = vi.fn(async (input) => {
      const url = String(input)
      expect(url.startsWith("https://sonojs.com/r/")).toBe(true)
      return new Response("{}", { status: 200 })
    }) as typeof fetch

    const { readRegistryJsonText } = await import("@/lib/read-registry-json")
    await readRegistryJsonText("zz-missing-registry-item-xyz")
    expect(globalThis.fetch).toHaveBeenCalled()
  })
})
