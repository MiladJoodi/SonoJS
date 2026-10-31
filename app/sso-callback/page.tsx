"use client"

import { HandleSSOCallback } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

import { AuthPageShell } from "@/components/auth"
import { takeAuthReturnPath } from "@/lib/auth-return-path"
import { Spinner } from "@sonojs/ui/components/spinner"

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
          const url = decorateUrl(takeAuthReturnPath())
          if (url.startsWith("http")) {
            window.location.href = url
          } else {
            router.push(url)
          }
        }}
        navigateToSignIn={() => router.push("/sign-in")}
        navigateToSignUp={() => router.push("/sign-up/continue")}
      />
    </AuthPageShell>
  )
}
