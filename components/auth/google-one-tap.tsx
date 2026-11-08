"use client"

import * as React from "react"
import { GoogleOneTap } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

/**
 * Google One Tap for signed-out visitors (Clerk hides it when already signed in).
 * Client-only mount avoids ClerkHostRenderer SSR/client HTML mismatch.
 * Skip OAuth/SSO finish routes so the prompt cannot race the callback handler.
 *
 * `fedCmSupport={false}`: Brave (and some privacy browsers) report
 * "FedCM is not supported" and never show the prompt when FedCM is required.
 */
export function SonoGoogleOneTap() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (
    pathname === "/sso-callback" ||
    pathname.startsWith("/sso-callback/") ||
    pathname === "/sign-in/verify" ||
    pathname.startsWith("/sign-in/verify/")
  ) {
    return null
  }

  return (
    <GoogleOneTap
      cancelOnTapOutside
      fedCmSupport={false}
      itpSupport
    />
  )
}
