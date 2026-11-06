import { NextResponse } from "next/server"

import { listAdminPlans } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const plans = await listAdminPlans()
    return NextResponse.json({ plans })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/plans failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
