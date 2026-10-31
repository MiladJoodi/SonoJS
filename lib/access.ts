/** Installable / docs content tier (omit on registry item → public). */
export type ContentAccess = "public" | "member" | "pro"

/** Clerk `publicMetadata.plan` — missing or anything else → free. */
export type UserPlan = "free" | "pro"

/** Billing cadence when Pro — drives silver (monthly) vs gold (yearly) marks. */
export type PlanInterval = "monthly" | "yearly"

/** Shape we store on Clerk `publicMetadata`. */
export type PlanMetadata = {
  plan?: unknown
  planExpiresAt?: unknown
  /** `"monthly"` | `"yearly"` — only meaningful when plan is pro. */
  planInterval?: unknown
}

export type Viewer =
  | { kind: "guest" }
  | { kind: "free" | "pro"; userId: string; planExpiresAt: Date | null }

export function normalizeContentAccess(
  value: unknown
): ContentAccess {
  if (value === "member" || value === "pro") return value
  return "public"
}

/** Parse `planExpiresAt` ISO string from Clerk metadata. Free has none. */
export function getPlanExpiresAt(metadata: unknown): Date | null {
  if (!metadata || typeof metadata !== "object") return null
  const raw = (metadata as PlanMetadata).planExpiresAt
  if (typeof raw !== "string" || !raw.trim()) return null
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? null : date
}

export function isProExpired(
  metadata: unknown,
  now: Date = new Date()
): boolean {
  if (!metadata || typeof metadata !== "object") return false
  if ((metadata as PlanMetadata).plan !== "pro") return false
  const expiresAt = getPlanExpiresAt(metadata)
  // Pro without expiry = manual / lifetime Pro (never auto-expires).
  if (!expiresAt) return false
  return expiresAt.getTime() <= now.getTime()
}

/**
 * Effective plan for gating. Expired Pro counts as Free.
 * Missing plan → free.
 */
export function getUserPlan(
  metadata: unknown,
  now: Date = new Date()
): UserPlan {
  if (
    metadata &&
    typeof metadata === "object" &&
    (metadata as PlanMetadata).plan === "pro" &&
    !isProExpired(metadata, now)
  ) {
    return "pro"
  }
  return "free"
}

/** Expiry to show in UI — only when effectively Pro. */
export function getEffectivePlanExpiresAt(
  metadata: unknown,
  now: Date = new Date()
): Date | null {
  if (getUserPlan(metadata, now) !== "pro") return null
  return getPlanExpiresAt(metadata)
}

/**
 * Pro billing interval from Clerk metadata.
 * Defaults to monthly (silver) when Pro has no `planInterval`.
 */
export function getPlanInterval(
  metadata: unknown,
  now: Date = new Date()
): PlanInterval | null {
  if (getUserPlan(metadata, now) !== "pro") return null
  if (
    metadata &&
    typeof metadata === "object" &&
    (metadata as PlanMetadata).planInterval === "yearly"
  ) {
    return "yearly"
  }
  return "monthly"
}

export function planLabel(
  metadata: unknown,
  now: Date = new Date()
): string {
  const plan = getUserPlan(metadata, now)
  if (plan !== "pro") return "Free"
  const interval = getPlanInterval(metadata, now)
  return interval === "yearly" ? "Pro Yearly" : "Pro Monthly"
}

/** Plan id for shared PlanIcon (matches pricing cards). */
export function getViewerPlanId(
  metadata: unknown,
  now: Date = new Date()
): "free" | "pro-monthly" | "pro-yearly" {
  if (getUserPlan(metadata, now) !== "pro") return "free"
  return getPlanInterval(metadata, now) === "yearly"
    ? "pro-yearly"
    : "pro-monthly"
}

export function formatPlanExpiry(
  date: Date | null,
  locale?: string
): string | null {
  if (!date) return null
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

/** Highest requirement wins when composing multiple items. */
export function maxContentAccess(
  levels: ContentAccess[]
): ContentAccess {
  if (levels.includes("pro")) return "pro"
  if (levels.includes("member")) return "member"
  return "public"
}

export function canAccess(
  viewer: Viewer,
  access: ContentAccess
): boolean {
  if (access === "public") return true
  if (viewer.kind === "guest") return false
  if (access === "member") return true
  return viewer.kind === "pro"
}
