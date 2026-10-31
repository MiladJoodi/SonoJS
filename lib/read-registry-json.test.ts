import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"

describe("readRegistryJsonText", () => {
  const prevFetch = globalThis.fetch

  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    globalThis.fetch = prevFetch
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
    expect(raw).toContain('"name"')
    expect(raw).toContain("accordion")
  })

  it("falls back to fetch when disk miss", async () => {
    globalThis.fetch = vi.fn(async () =>
      new Response(JSON.stringify({ name: "fake-from-net" }), { status: 200 })
    ) as typeof fetch

    const { readRegistryJsonText } = await import("@/lib/read-registry-json")
    // Use a name that will not exist on disk
    const raw = await readRegistryJsonText("zz-missing-registry-item-xyz")
    expect(raw).toContain("fake-from-net")
    expect(globalThis.fetch).toHaveBeenCalled()
  })
})
