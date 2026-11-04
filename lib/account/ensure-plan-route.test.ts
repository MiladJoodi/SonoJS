import { beforeEach, describe, expect, it, vi } from "vitest"

const getAuthUserId = vi.fn()
const getUser = vi.fn()
const syncClerkPlanFromDb = vi.fn()

vi.mock("@/lib/clerk-auth", () => ({
  getAuthUserId: () => getAuthUserId(),
}))

vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: async () => ({
    users: {
      getUser: (id: string) => getUser(id),
    },
  }),
}))

vi.mock("@/db/queries/sync-clerk-plan", () => ({
  syncClerkPlanFromDb: (id: string) => syncClerkPlanFromDb(id),
}))

describe("POST /api/account/ensure-plan", () => {
  beforeEach(() => {
    getAuthUserId.mockReset()
    getUser.mockReset()
    syncClerkPlanFromDb.mockReset()
    vi.resetModules()
  })

  it("returns 401 when unauthenticated", async () => {
    getAuthUserId.mockResolvedValue(null)
    const { POST } = await import("@/app/api/account/ensure-plan/route")
    const res = await POST()
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: "Unauthorized" })
    expect(syncClerkPlanFromDb).not.toHaveBeenCalled()
  })

  it("heals Clerk free → pro when Neon has an active subscription", async () => {
    getAuthUserId.mockResolvedValue("user_pro")
    getUser.mockResolvedValue({
      id: "user_pro",
      publicMetadata: {
        plan: "free",
        planExpiresAt: null,
        planInterval: null,
      },
    })
    syncClerkPlanFromDb.mockResolvedValue({
      plan: "pro",
      planInterval: "monthly",
      planExpiresAt: "2026-11-30T00:00:00.000Z",
    })

    const { POST } = await import("@/app/api/account/ensure-plan/route")
    const res = await POST()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      plan: "pro",
      planInterval: "monthly",
      planExpiresAt: "2026-11-30T00:00:00.000Z",
      updated: true,
    })
    expect(syncClerkPlanFromDb).toHaveBeenCalledWith("user_pro")
  })

  it("returns updated:false when Clerk already matches Neon", async () => {
    getAuthUserId.mockResolvedValue("user_pro")
    getUser.mockResolvedValue({
      id: "user_pro",
      publicMetadata: {
        plan: "pro",
        planInterval: "monthly",
        planExpiresAt: "2026-11-30T00:00:00.000Z",
      },
    })
    syncClerkPlanFromDb.mockResolvedValue({
      plan: "pro",
      planInterval: "monthly",
      planExpiresAt: "2026-11-30T00:00:00.000Z",
    })

    const { POST } = await import("@/app/api/account/ensure-plan/route")
    const res = await POST()
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      plan: "pro",
      planInterval: "monthly",
      planExpiresAt: "2026-11-30T00:00:00.000Z",
      updated: false,
    })
  })
})
