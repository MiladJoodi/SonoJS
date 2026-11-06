import { NextResponse } from "next/server"

import { listAdminStripeEvents } from "@/db/queries/admin-read"
import { AdminAuthError, requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    const events = await listAdminStripeEvents(100)
    return NextResponse.json({
      events: events.map((e) => ({
        id: e.id,
        stripeEventId: e.stripeEventId,
        type: e.type,
        status: e.status,
        attemptCount: e.attemptCount,
        lastError: e.lastError,
        processedAt: e.processedAt ? e.processedAt.toISOString() : null,
        createdAt: e.createdAt.toISOString(),
      })),
    })
  } catch (err) {
    if (err instanceof AdminAuthError) {
      return NextResponse.json({ error: err.message }, { status: err.status })
    }
    console.error("GET /api/admin/stripe-events failed:", err)
    return NextResponse.json({ error: "ServerError" }, { status: 500 })
  }
}
