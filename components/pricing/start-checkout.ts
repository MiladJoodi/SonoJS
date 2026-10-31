export type CheckoutPlanSlug = "pro-monthly" | "pro-yearly"

export type StartCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string; unauthorized?: boolean }

const ERROR_MESSAGES: Record<string, string> = {
  Unauthorized: "Please sign in to continue.",
  InvalidPlanSlug: "That plan is not available.",
  InvalidJson: "Something went wrong. Please try again.",
  AlreadySubscribed: "You already have an active Pro subscription.",
  PriceNotConfigured:
    "Checkout is not configured for this plan yet. Please try again later.",
  PlanNotFound: "That plan is not available.",
  StripeCheckoutFailed:
    "We could not start checkout. Please try again in a moment.",
}

function messageForApiError(code: string | undefined): string {
  if (!code) return "Something went wrong. Please try again."
  return ERROR_MESSAGES[code] ?? "Something went wrong. Please try again."
}

/**
 * Start Stripe Checkout for a Pro plan via the billing API.
 * Does not grant Pro — that happens only after the webhook reconciles Neon.
 */
export async function startCheckout(
  planSlug: CheckoutPlanSlug,
  fetchImpl: typeof fetch = fetch
): Promise<StartCheckoutResult> {
  let res: Response
  try {
    res = await fetchImpl("/api/billing/checkout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planSlug }),
    })
  } catch {
    return {
      ok: false,
      error: "Network error. Check your connection and try again.",
    }
  }

  let data: { url?: unknown; error?: unknown } = {}
  try {
    data = (await res.json()) as { url?: unknown; error?: unknown }
  } catch {
    /* empty body */
  }

  if (res.status === 401) {
    return {
      ok: false,
      unauthorized: true,
      error: messageForApiError("Unauthorized"),
    }
  }

  if (!res.ok) {
    const code = typeof data.error === "string" ? data.error : undefined
    return { ok: false, error: messageForApiError(code) }
  }

  const url = typeof data.url === "string" ? data.url.trim() : ""
  if (!url) {
    return {
      ok: false,
      error: "Checkout URL was missing. Please try again.",
    }
  }

  return { ok: true, url }
}
