export class DbError extends Error {
  cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.name = "DbError"
    this.cause = cause
  }
}

export class LostWebhookClaimError extends Error {
  constructor(message = "Webhook claim is no longer held") {
    super(message)
    this.name = "LostWebhookClaimError"
  }
}

export class LostClerkLeaseError extends Error {
  constructor(message = "Clerk sync lease is no longer held") {
    super(message)
    this.name = "LostClerkLeaseError"
  }
}

export class LostReconcileLeaseError extends Error {
  constructor(
    message = "Subscription reconcile lease is no longer held"
  ) {
    super(message)
    this.name = "LostReconcileLeaseError"
  }
}

export class StripeApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "StripeApiError"
    this.status = status
  }
}

/** Stripe customer ↔ Clerk user mapping conflict — requires manual investigation. */
export class BillingIdentityConflictError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "BillingIdentityConflictError"
  }
}

export function wrapDbError(message: string, err: unknown): never {
  if (
    err instanceof LostWebhookClaimError ||
    err instanceof LostClerkLeaseError ||
    err instanceof LostReconcileLeaseError ||
    err instanceof StripeApiError ||
    err instanceof BillingIdentityConflictError
  ) {
    throw err
  }
  throw new DbError(message, err)
}
