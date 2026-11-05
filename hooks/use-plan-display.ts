"use client"

import { useAuth, useUser } from "@clerk/nextjs"

import { useBillingSummary } from "@/hooks/use-billing-summary"
import { useEnsureUserPlan } from "@/hooks/use-ensure-user-plan"
import {
  resolveAccountPlanDisplay,
  type AccountPlanDisplay,
} from "@/lib/account-plan-display"

export type PlanDisplayState = AccountPlanDisplay & {
  planReady: boolean
  billingLoading: boolean
  /** True until ensure-plan and billing summary are ready for a signed-in user. */
  planLoading: boolean
  billingSummary: ReturnType<typeof useBillingSummary>["summary"]
  billingError: string | null
}

/**
 * Shared plan chip for header + /account.
 * Waits for ensure-plan (Neon → Clerk), then resolves via billing-preferring helper.
 */
export function usePlanDisplay(): PlanDisplayState {
  const { isSignedIn } = useAuth()
  const { user, isLoaded } = useUser()
  const signedIn = Boolean(isLoaded && isSignedIn && user)

  const { planReady } = useEnsureUserPlan()
  const {
    summary: billingSummary,
    error: billingError,
    loading: billingLoading,
  } = useBillingSummary(signedIn)

  const display = resolveAccountPlanDisplay(
    billingSummary?.subscription,
    user?.publicMetadata
  )

  const planLoading = signedIn && (!planReady || billingLoading)

  return {
    ...display,
    planReady,
    billingLoading,
    planLoading,
    billingSummary,
    billingError,
  }
}
