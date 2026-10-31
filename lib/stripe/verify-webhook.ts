import { createHmac, timingSafeEqual } from "node:crypto"

export class StripeWebhookSignatureError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "StripeWebhookSignatureError"
  }
}

export type StripeWebhookEvent = {
  id: string
  type: string
  created: number
  data: { object: Record<string, unknown> }
}

const DEFAULT_TOLERANCE_SEC = 300

function parseSignatureHeader(header: string): {
  timestamp: number
  v1: string[]
} {
  const parts = header.split(",").map((p) => p.trim())
  let timestamp: number | null = null
  const v1: string[] = []

  for (const part of parts) {
    const eq = part.indexOf("=")
    if (eq <= 0) continue
    const key = part.slice(0, eq)
    const value = part.slice(eq + 1)
    if (key === "t") {
      if (!/^\d+$/.test(value)) {
        throw new StripeWebhookSignatureError(
          "Malformed Stripe-Signature timestamp"
        )
      }
      timestamp = Number(value)
    } else if (key === "v1" && value.length > 0) {
      v1.push(value)
    }
  }

  if (timestamp == null) {
    throw new StripeWebhookSignatureError(
      "Stripe-Signature missing timestamp"
    )
  }
  if (v1.length === 0) {
    throw new StripeWebhookSignatureError("Stripe-Signature missing v1")
  }

  return { timestamp, v1 }
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "utf8")
    const bufB = Buffer.from(b, "utf8")
    if (bufA.length !== bufB.length) return false
    return timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

/**
 * Verify Stripe webhook signature (multi-v1 + timing-safe compare).
 * Call with the raw request body string — never a re-serialized JSON object.
 */
export function verifyStripeWebhook(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string,
  options?: { toleranceSec?: number; nowSec?: number }
): StripeWebhookEvent {
  if (!signatureHeader?.trim()) {
    throw new StripeWebhookSignatureError("Missing Stripe-Signature header")
  }
  if (!secret) {
    throw new StripeWebhookSignatureError("Webhook secret is empty")
  }
  if (typeof rawBody !== "string") {
    throw new StripeWebhookSignatureError("Raw body must be a string")
  }

  const { timestamp, v1 } = parseSignatureHeader(signatureHeader)
  const tolerance = options?.toleranceSec ?? DEFAULT_TOLERANCE_SEC
  const nowSec = options?.nowSec ?? Math.floor(Date.now() / 1000)

  if (Math.abs(nowSec - timestamp) > tolerance) {
    throw new StripeWebhookSignatureError(
      "Stripe-Signature timestamp outside tolerance"
    )
  }

  const signedPayload = `${timestamp}.${rawBody}`
  const expected = createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex")

  const matched = v1.some((sig) => safeEqualHex(sig, expected))
  if (!matched) {
    throw new StripeWebhookSignatureError("No matching Stripe v1 signature")
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(rawBody)
  } catch {
    throw new StripeWebhookSignatureError("Invalid JSON body")
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    typeof (parsed as { id?: unknown }).id !== "string" ||
    typeof (parsed as { type?: unknown }).type !== "string" ||
    typeof (parsed as { created?: unknown }).created !== "number" ||
    !(parsed as { data?: { object?: unknown } }).data ||
    typeof (parsed as { data: { object?: unknown } }).data.object !== "object" ||
    (parsed as { data: { object: unknown } }).data.object == null
  ) {
    throw new StripeWebhookSignatureError("Unexpected Stripe event shape")
  }

  const event = parsed as StripeWebhookEvent
  return {
    id: event.id,
    type: event.type,
    created: event.created,
    data: { object: event.data.object as Record<string, unknown> },
  }
}

/** Test helper: build a valid Stripe-Signature header for a body. */
export function signStripeWebhookBody(
  rawBody: string,
  secret: string,
  timestampSec: number,
  extraV1: string[] = []
): string {
  const expected = createHmac("sha256", secret)
    .update(`${timestampSec}.${rawBody}`, "utf8")
    .digest("hex")
  const parts = [`t=${timestampSec}`, `v1=${expected}`, ...extraV1.map((v) => `v1=${v}`)]
  return parts.join(",")
}
