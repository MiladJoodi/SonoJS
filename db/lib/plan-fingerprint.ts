export type SyncedPlan = {
  plan: "free" | "pro"
  planInterval: "monthly" | "yearly" | null
  planExpiresAt: string | null
}

/** Stable fingerprint of gating plan fields for Clerk sync recovery. */
export function planFingerprint(fields: SyncedPlan): string {
  return `${fields.plan}|${fields.planExpiresAt ?? ""}|${fields.planInterval ?? ""}`
}
