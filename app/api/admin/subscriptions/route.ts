import { NextResponse } from "next/server"

import { listAdminSubscriptions } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const subscriptions = await listAdminSubscriptions(100)
    return NextResponse.json({ subscriptions })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/subscriptions failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
