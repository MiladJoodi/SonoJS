/** Stripe secrets — never log return values. */

export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set")
  }
  return secret
}

export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set")
  }
  return key
}

/** Must match retrieve helpers and Dashboard webhook endpoint API version. */
export const STRIPE_API_VERSION = "2024-11-20.acacia" as const
