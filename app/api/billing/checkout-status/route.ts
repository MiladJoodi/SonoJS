import { NextResponse } from "next/server"

import { getAuthUserId } from "@/lib/clerk-auth"
import { resolveCheckoutReturnStatus } from "@/lib/stripe/checkout-return-status"

/**
 * Post-Checkout poll endpoint.
 * Does not trust Stripe redirect alone — Pro only when Neon has an
 * active subscription; then syncs Clerk from DB.
 */
export async function POST() {
  const userId = await getAuthUserId()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const result = await resolveCheckoutReturnStatus(userId)
    return NextResponse.json(result)
  } catch (err) {
    console.error(
      "checkout-status failed:",
      err instanceof Error ? err.message : "unknown"
    )
    return NextResponse.json(
      { error: "CheckoutStatusFailed" },
      { status: 500 }
    )
  }
}
