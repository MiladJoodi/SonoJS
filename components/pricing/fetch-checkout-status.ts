export type CheckoutStatusResponse =
  | {
      status: "active"
      plan: "pro"
      planInterval: "monthly" | "yearly" | null
      planExpiresAt: string | null
    }
  | { status: "pending" }

export type FetchCheckoutStatusResult =
  | { ok: true; data: CheckoutStatusResponse }
  | { ok: false; unauthorized?: boolean; error: string }

/**
 * Ask the server whether Neon has granted Pro after Checkout
 * (and sync Clerk when active).
 */
export async function fetchCheckoutStatus(
  fetchImpl: typeof fetch = fetch
): Promise<FetchCheckoutStatusResult> {
  let res: Response
  try {
    res = await fetchImpl("/api/billing/checkout-status", {
      method: "POST",
      headers: { Accept: "application/json" },
    })
  } catch {
    return {
      ok: false,
      error: "We could not confirm your payment. Please try again.",
    }
  }

  if (res.status === 401) {
    return { ok: false, unauthorized: true, error: "Unauthorized" }
  }

  let body: unknown = null
  try {
    body = await res.json()
  } catch {
    body = null
  }

  if (!res.ok) {
    return {
      ok: false,
      error: "We could not confirm your payment. Please try again.",
    }
  }

  const status =
    body &&
    typeof body === "object" &&
    "status" in body &&
    ((body as { status: unknown }).status === "active" ||
      (body as { status: unknown }).status === "pending")
      ? (body as CheckoutStatusResponse)
      : null

  if (!status) {
    return {
      ok: false,
      error: "We could not confirm your payment. Please try again.",
    }
  }

  return { ok: true, data: status }
}
