import { NextResponse } from "next/server"

import { listAdminPayments } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const payments = await listAdminPayments(100)
    return NextResponse.json({ payments })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/payments failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
