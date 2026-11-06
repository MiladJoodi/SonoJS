import { NextResponse } from "next/server"

import { getAdminOverviewKpis } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const kpis = await getAdminOverviewKpis()
    return NextResponse.json({ kpis })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/overview failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
