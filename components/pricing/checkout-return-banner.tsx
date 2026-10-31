"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from "lucide-react"

import { fetchCheckoutStatus } from "@/components/pricing/fetch-checkout-status"
import { Alert, AlertDescription, AlertTitle } from "@sonojs/ui/components/alert"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const POLL_INTERVAL_MS = 1_500
const MAX_ATTEMPTS = 24 // ~36s

type BannerPhase =
  | "idle"
  | "confirming"
  | "success"
  | "waiting"
  | "cancel"
  | "error"

function clearCheckoutParams(): string {
  const url = new URL(window.location.href)
  url.searchParams.delete("checkout")
  url.searchParams.delete("session_id")
  const q = url.searchParams.toString()
  return q ? `${url.pathname}?${q}` : url.pathname
}

/**
 * After Stripe Checkout redirect: poll Neon for Pro, sync Clerk, reload
 * client user so header/menu update without a full page refresh.
 * Never shows success while status is still pending.
 */
export function CheckoutReturnBanner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()
  const { user, isLoaded: userLoaded } = useUser()

  const checkout = searchParams.get("checkout")
  const [phase, setPhase] = React.useState<BannerPhase>("idle")
  const [error, setError] = React.useState<string | null>(null)
  const [pollNonce, setPollNonce] = React.useState(0)
  const confirmedRef = React.useRef(false)
  const userRef = React.useRef(user)
  userRef.current = user

  const dismiss = React.useCallback(() => {
    confirmedRef.current = false
    setPhase("idle")
    router.replace(clearCheckoutParams(), { scroll: false })
  }, [router])

  React.useEffect(() => {
    if (!authLoaded || !userLoaded) return

    if (checkout === "cancel") {
      setPhase("cancel")
      return
    }

    if (checkout !== "success") {
      confirmedRef.current = false
      setPhase("idle")
      return
    }

    if (confirmedRef.current) {
      setPhase("success")
      return
    }

    if (!isSignedIn || !userRef.current) {
      setPhase("error")
      setError("Sign in to confirm your payment.")
      return
    }

    let cancelled = false
    setPhase("confirming")
    setError(null)

    async function poll() {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        if (cancelled) return
        const result = await fetchCheckoutStatus()
        if (cancelled) return

        if (!result.ok) {
          if (result.unauthorized) {
            setPhase("error")
            setError("Sign in to confirm your payment.")
            return
          }
          await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
          continue
        }

        if (result.data.status === "active") {
          confirmedRef.current = true
          await userRef.current?.reload()
          if (cancelled) return
          setPhase("success")
          return
        }

        setPhase("confirming")
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
      }

      if (!cancelled) setPhase("waiting")
    }

    void poll()
    return () => {
      cancelled = true
    }
  }, [authLoaded, userLoaded, checkout, isSignedIn, pollNonce])

  if (phase === "idle") return null

  if (phase === "confirming") {
    return (
      <Alert
        className="mb-8 border-border/70 bg-card shadow-soft"
        role="status"
        aria-live="polite"
      >
        <Loader2Icon className="size-4 animate-spin text-primary" aria-hidden />
        <AlertTitle>Confirming your payment</AlertTitle>
        <AlertDescription>
          Stripe checkout finished. We are verifying your subscription — this
          usually takes a few seconds.
        </AlertDescription>
      </Alert>
    )
  }

  if (phase === "waiting") {
    return (
      <Alert
        className="mb-8 border-border/70 bg-card shadow-soft"
        role="status"
        aria-live="polite"
      >
        <Loader2Icon className="size-4 text-primary" aria-hidden />
        <AlertTitle>Still confirming your payment</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Your payment may still be processing. Check again in a moment —
            Pro unlocks as soon as the subscription is confirmed.
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-10 shrink-0 cursor-pointer"
            onClick={() => setPollNonce((n) => n + 1)}
          >
            Check again
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (phase === "success") {
    return (
      <Alert
        className={cn(
          "mb-8 border-emerald-500/30 bg-emerald-500/10 text-foreground shadow-soft"
        )}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2Icon
          className="size-4 text-emerald-600 dark:text-emerald-400"
          aria-hidden
        />
        <AlertTitle>You are on Pro</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Payment confirmed. Your account, header, and menu now show Pro
            access.
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-10 shrink-0 cursor-pointer"
            onClick={dismiss}
          >
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  if (phase === "cancel") {
    return (
      <Alert className="mb-8 border-border/70 bg-card shadow-soft" role="status">
        <XCircleIcon className="size-4 text-muted-foreground" aria-hidden />
        <AlertTitle>Checkout canceled</AlertTitle>
        <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>No charge was made. You can start checkout again anytime.</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-10 shrink-0 cursor-pointer"
            onClick={dismiss}
          >
            Dismiss
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="mb-8 shadow-soft" role="alert">
      <XCircleIcon className="size-4" aria-hidden />
      <AlertTitle>Could not confirm payment</AlertTitle>
      <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span>{error ?? "Something went wrong. Please try again."}</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-10 shrink-0 cursor-pointer"
          onClick={dismiss}
        >
          Dismiss
        </Button>
      </AlertDescription>
    </Alert>
  )
}
