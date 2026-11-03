import { NextResponse } from "next/server"

import { StripeApiError } from "@/db/errors"
import { createBillingPortalSession } from "@/db/lib/stripe-api"
import { getUserByClerkId } from "@/db/queries"
import { getAuthUserId } from "@/lib/clerk-auth"
import { siteConfig } from "@/lib/config"

/**
 * Open Stripe Customer Portal for card / cancel / invoices management.
 * Requires a linked `stripeCustomerId` on the Neon user row.
 */
export async function POST() {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await getUserByClerkId(clerkUserId)
  const customerId = user?.stripeCustomerId?.trim() || null
  if (!customerId) {
    return NextResponse.json(
      { error: "NoStripeCustomer" },
      { status: 422 }
    )
  }

  const returnUrl = `${siteConfig.url}/account?tab=billing`

  try {
    const session = await createBillingPortalSession({
      customerId,
      returnUrl,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    if (err instanceof StripeApiError) {
      const status = err.status >= 400 && err.status < 600 ? err.status : 502
      return NextResponse.json(
        { error: "StripePortalFailed" },
        { status: status === 401 || status === 403 ? 502 : status }
      )
    }
    throw err
  }
}
