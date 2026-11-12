import { NextResponse } from "next/server"

import { getAdminOverview } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const overview = await getAdminOverview()
    return NextResponse.json({ overview })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/overview failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
