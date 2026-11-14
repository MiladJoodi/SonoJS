/**
 * Normalize Stripe expandable references (string id or expanded `{ id }`).
 * Compatible with API version 2025-03-31.basil webhook payloads.
 */
export function stripeId(
  ref: string | { id?: string | null } | null | undefined
): string | null {
  if (ref == null) return null
  if (typeof ref === "string") {
    const trimmed = ref.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  if (typeof ref === "object" && typeof ref.id === "string") {
    const trimmed = ref.id.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  return null
}

export function stripeMetadataClerkUserId(
  metadata: Record<string, unknown> | null | undefined
): string | null {
  if (!metadata || typeof metadata !== "object") return null
  const raw = metadata.clerkUserId ?? metadata.clerk_user_id
  if (typeof raw !== "string") return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

/**
 * Resolve PaymentIntent id from an Invoice webhook object.
 *
 * API 2025-03-31.basil removed top-level `invoice.payment_intent`. PI lives under
 * `payments.data[].payment.payment_intent` (Invoice Payment). Legacy payloads may
 * still send `payment_intent`.
 */
export function stripeInvoicePaymentIntentId(
  invoice: Record<string, unknown> | null | undefined
): string | null {
  if (!invoice) return null

  const legacy = stripeId(
    invoice.payment_intent as string | { id?: string } | null
  )
  if (legacy) return legacy

  const payments = invoice.payments
  if (!payments || typeof payments !== "object") return null
  const data = (payments as { data?: unknown }).data
  if (!Array.isArray(data)) return null

  for (const row of data) {
    if (!row || typeof row !== "object") continue
    const payment = (row as { payment?: unknown }).payment
    if (!payment || typeof payment !== "object") continue
    const pay = payment as {
      type?: unknown
      payment_intent?: string | { id?: string } | null
    }
    if (pay.type != null && pay.type !== "payment_intent") continue
    const id = stripeId(pay.payment_intent)
    if (id) return id
  }

  return null
}
