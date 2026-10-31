/**
 * Normalize Stripe expandable references (string id or expanded `{ id }`).
 * Compatible with API version 2024-11-20.acacia webhook payloads.
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
