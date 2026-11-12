"use client"

import * as React from "react"
import { useAuth, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: {
          initialize: (config: Record<string, unknown>) => void
          prompt: (listener?: (notification: GoogleOneTapNotification) => void) => void
          cancel: () => void
        }
      }
    }
    /** Populated by Clerk browser script; used as client-id fallback. */
    Clerk?: unknown
  }
}

type GoogleOneTapNotification = {
  isNotDisplayed: () => boolean
  isSkippedMoment: () => boolean
  isDismissedMoment: () => boolean
  getNotDisplayedReason?: () => string
  getSkippedReason?: () => string
  getDismissedReason?: () => string
}

type GoogleCredentialResponse = {
  credential?: string
}

const GSI_SCRIPT_SRC = "https://accounts.google.com/gsi/client"
const GSI_SCRIPT_ATTR = "data-sono-gsi"

function getGoogleOneTapClientId(clerk: unknown): string | null {
  // Clerk exposes this on the loaded client environment (Dashboard Google custom credentials).
  // Not in the public LoadedClerk typings used by useClerk().
  const env = (
    clerk as {
      environment?: {
        displayConfig?: { googleOneTapClientId?: string | null }
      } | null
    }
  ).environment
  const id = env?.displayConfig?.googleOneTapClientId
  return typeof id === "string" && id.length > 0 ? id : null
}

function loadGsiScript(signal: AbortSignal): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("No window"))
  }
  if (window.google?.accounts?.id) {
    return Promise.resolve()
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[${GSI_SCRIPT_ATTR}]`
  )
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve()
        return
      }
      const onLoad = () => resolve()
      const onError = () => reject(new Error("GSI script failed"))
      existing.addEventListener("load", onLoad, { once: true })
      existing.addEventListener("error", onError, { once: true })
      signal.addEventListener(
        "abort",
        () => {
          existing.removeEventListener("load", onLoad)
          existing.removeEventListener("error", onError)
          reject(new DOMException("Aborted", "AbortError"))
        },
        { once: true }
      )
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = GSI_SCRIPT_SRC
    script.async = true
    script.setAttribute(GSI_SCRIPT_ATTR, "1")
    const onLoad = () => resolve()
    const onError = () => reject(new Error("GSI script failed"))
    script.addEventListener("load", onLoad, { once: true })
    script.addEventListener("error", onError, { once: true })
    signal.addEventListener(
      "abort",
      () => {
        script.removeEventListener("load", onLoad)
        script.removeEventListener("error", onError)
        script.remove()
        reject(new DOMException("Aborted", "AbortError"))
      },
      { once: true }
    )
    document.head.appendChild(script)
  })
}

/**
 * Clerk Custom Google One Tap flow (headless).
 * Uses GIS + authenticateWithGoogleOneTap — no Clerk UI / openGoogleOneTap.
 * @see https://clerk.com/docs/nextjs/guides/development/custom-flows/authentication/google-one-tap
 */
export function CustomGoogleOneTapFlow() {
  const clerk = useClerk()
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const authenticatingRef = React.useRef(false)
  const clerkRef = React.useRef(clerk)
  const routerRef = React.useRef(router)
  clerkRef.current = clerk
  routerRef.current = router

  const clerkReady = Boolean(isLoaded && clerk.loaded)
  const signedIn = Boolean(isSignedIn)

  React.useEffect(() => {
    if (!clerkReady || signedIn) return

    const controller = new AbortController()
    let cancelled = false
    let prompted = false
    let started = false

    const run = async () => {
      if (started || cancelled) return

      const clientId =
        getGoogleOneTapClientId(clerkRef.current) ||
        getGoogleOneTapClientId(
          typeof window !== "undefined" ? window.Clerk : null
        )
      // Environment can lag briefly after clerk.loaded — retry via backup timer.
      if (!clientId) return

      started = true
      try {
        await loadGsiScript(controller.signal)
        if (cancelled || controller.signal.aborted) return

        const googleId = window.google?.accounts?.id
        if (!googleId) return

        googleId.initialize({
          client_id: clientId,
          // Match prior Clerk GoogleOneTap props (Phase H): FedCM off for Brave/privacy browsers.
          use_fedcm_for_prompt: false,
          cancel_on_tap_outside: true,
          itp_support: true,
          auto_select: false,
          callback: async (response: GoogleCredentialResponse) => {
            const token = response?.credential
            if (!token || authenticatingRef.current || cancelled) return
            authenticatingRef.current = true
            try {
              const signInOrUp =
                await clerkRef.current.authenticateWithGoogleOneTap({
                  token,
                })
              await clerkRef.current.handleGoogleOneTapCallback(signInOrUp, {
                signInFallbackRedirectUrl:
                  process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL ||
                  "/",
                signUpFallbackRedirectUrl:
                  process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL ||
                  "/",
              })
            } catch {
              // Fail closed — leave email / OAuth forms usable.
              authenticatingRef.current = false
              routerRef.current.push("/sign-in")
            }
          },
        })

        if (cancelled) return
        prompted = true
        googleId.prompt(() => {
          // Dismissal / cooldown / not-displayed are non-fatal.
        })
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return
        }
        // Optional enhancement — never block auth pages.
      }
    }

    const ric = window.requestIdleCallback?.(run, { timeout: 2500 })
    const timeoutId =
      typeof ric === "number" ? undefined : window.setTimeout(run, 1)
    // Hard fallback so automation / busy main threads still load GSI.
    const backupId = window.setTimeout(run, 2600)

    return () => {
      cancelled = true
      controller.abort()
      if (typeof ric === "number") {
        window.cancelIdleCallback?.(ric)
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId)
      }
      window.clearTimeout(backupId)
      if (prompted) {
        try {
          window.google?.accounts?.id?.cancel()
        } catch {
          /* ignore */
        }
      }
    }
  }, [clerkReady, signedIn])

  return null
}
