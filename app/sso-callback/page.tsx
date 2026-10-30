"use client"

import { HandleSSOCallback } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { AuthPageShell } from "@/components/auth"
import { SSO_DONE } from "@/components/auth/sso-message"
import { Spinner } from "@sonojs/ui/components/spinner"

function finishInPopup(url: string) {
  if (typeof window === "undefined") return
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage({ type: SSO_DONE, url }, window.location.origin)
    window.close()
    return
  }
  window.location.assign(url)
}

export default function SsoCallbackPage() {
  const router = useRouter()

  return (
    <AuthPageShell>
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <Spinner className="size-5" />
        <p>Finishing sign-in…</p>
      </div>
      <HandleSSOCallback
        navigateToApp={({ session, decorateUrl }) => {
          if (session?.currentTask) return
          const url = decorateUrl("/")
          if (window.opener && !window.opener.closed) {
            finishInPopup(url.startsWith("http") ? url : "/")
            return
          }
          if (url.startsWith("http")) {
            window.location.href = url
            return
          }
          router.push(url)
        }}
        navigateToSignIn={() => {
          if (window.opener && !window.opener.closed) {
            finishInPopup("/sign-in")
            return
          }
          router.push("/sign-in")
        }}
        navigateToSignUp={() => {
          if (window.opener && !window.opener.closed) {
            finishInPopup("/sign-up")
            return
          }
          router.push("/sign-up")
        }}
      />
    </AuthPageShell>
  )
}
