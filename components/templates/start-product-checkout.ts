export type StartProductCheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string; unauthorized?: boolean }

const ERROR_MESSAGES: Record<string, string> = {
  Unauthorized: "Please sign in to continue.",
  InvalidSlug: "That product is not available.",
  InvalidJson: "Something went wrong. Please try again.",
  ProductNotFound: "That product is not available.",
  ProductNotForSale: "This product is free — use Download instead.",
  AlreadyOwned: "You already own this product.",
  PriceNotConfigured:
    "Checkout is not configured for this product yet. Please try again later.",
  StripeCheckoutFailed:
    "We could not start checkout. Please try again in a moment.",
}

function messageForApiError(code: string | undefined): string {
  if (!code) return "Something went wrong. Please try again."
  return ERROR_MESSAGES[code] ?? "Something went wrong. Please try again."
}

/**
 * Start Stripe Checkout for a paid catalog product.
 * Entitlement is granted only after the webhook writes Neon.
 */
export async function startProductCheckout(
  slug: string,
  fetchImpl: typeof fetch = fetch
): Promise<StartProductCheckoutResult> {
  let res: Response
  try {
    res = await fetchImpl("/api/products/checkout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
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
