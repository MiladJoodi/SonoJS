import { NextResponse } from "next/server"

import { listUsersWithPlan } from "@/db/queries/admin-billing"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const users = await listUsersWithPlan(200)
    return NextResponse.json({ users })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/users failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
