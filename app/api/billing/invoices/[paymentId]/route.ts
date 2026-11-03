import { NextResponse } from "next/server"

import { StripeApiError } from "@/db/errors"
import { fetchStripeInvoice } from "@/db/lib/stripe-api"
import { getPaymentForClerkUser } from "@/db/queries"
import { getAuthUserId } from "@/lib/clerk-auth"

type RouteContext = {
  params: Promise<{ paymentId: string }>
}

/**
 * Resolve a payment's Stripe invoice and redirect to the hosted page / PDF.
 * Ownership is enforced via Clerk id → Neon payment row.
 */
export async function GET(_req: Request, context: RouteContext) {
  const clerkUserId = await getAuthUserId()
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { paymentId } = await context.params
  if (!paymentId?.trim()) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 })
  }

  const payment = await getPaymentForClerkUser(paymentId.trim(), clerkUserId)
  if (!payment) {
    return NextResponse.json({ error: "NotFound" }, { status: 404 })
  }

  const invoiceId = payment.stripeInvoiceId?.trim() || null
  if (!invoiceId) {
    return NextResponse.json({ error: "NoInvoice" }, { status: 404 })
  }

  try {
    const invoice = await fetchStripeInvoice(invoiceId)
    const target = invoice.hostedInvoiceUrl || invoice.invoicePdf
    if (!target) {
      return NextResponse.json({ error: "InvoiceUnavailable" }, { status: 502 })
    }
    return NextResponse.redirect(target, 302)
  } catch (err) {
    if (err instanceof StripeApiError) {
      if (err.status === 404) {
        return NextResponse.json({ error: "NotFound" }, { status: 404 })
      }
      return NextResponse.json({ error: "StripeInvoiceFailed" }, { status: 502 })
    }
    throw err
  }
}
