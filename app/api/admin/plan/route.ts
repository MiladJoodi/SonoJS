import { NextResponse } from "next/server"

import {
  grantManualPro,
  revokeToFree,
  type AdminPlanSlug,
} from "@/db/queries/admin-billing"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

type PlanBody = {
  clerkUserId?: unknown
  action?: unknown
  planSlug?: unknown
  days?: unknown
}

function isPlanSlug(value: unknown): value is AdminPlanSlug {
  return value === "pro-monthly" || value === "pro-yearly"
}

export async function POST(req: Request) {
  try {
    await requireAdmin()
    const body = (await req.json().catch(() => ({}))) as PlanBody
    const clerkUserId =
      typeof body.clerkUserId === "string" ? body.clerkUserId.trim() : ""
    if (!clerkUserId) {
      return NextResponse.json({ error: "clerkUserId required" }, { status: 400 })
    }

    const action = body.action === "revoke" ? "revoke" : "grant"

    if (action === "revoke") {
      const user = await revokeToFree(clerkUserId)
      return NextResponse.json({ user })
    }

    if (!isPlanSlug(body.planSlug)) {
      return NextResponse.json(
        { error: "planSlug must be pro-monthly or pro-yearly" },
        { status: 400 }
      )
    }

    const daysRaw =
      typeof body.days === "number"
        ? body.days
        : typeof body.days === "string"
          ? Number(body.days)
          : body.planSlug === "pro-yearly"
            ? 365
            : 30

    if (!Number.isFinite(daysRaw) || daysRaw < 1) {
      return NextResponse.json({ error: "Invalid days" }, { status: 400 })
    }

    const user = await grantManualPro({
      clerkUserId,
      planSlug: body.planSlug,
      days: daysRaw,
    })
    return NextResponse.json({ user })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("POST /api/admin/plan failed:", err)
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message.slice(0, 200) : "ServerError",
      },
      { status: 500 }
    )
  }
}
