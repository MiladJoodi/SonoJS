import { NextResponse } from "next/server"

import { getAuthUserId } from "@/lib/clerk-auth"
import { loadBillingSummary } from "@/lib/stripe/load-billing-summary"

/**
 * Account billing snapshot for the signed-in user.
 * Subscription: Neon first, else live Stripe when customer is linked.
 * Payments: Neon. Invoice hosted URLs: `/api/billing/invoices/[paymentId]`.
 */
export async function GET() {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const summary = await loadBillingSummary(clerkUserId)
  return NextResponse.json(summary)
}
