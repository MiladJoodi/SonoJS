import type { Metadata } from "next"
import { Suspense } from "react"
import { redirect } from "next/navigation"

import { AccountSettings } from "@/components/auth/account-settings"
import { getAuthUserId } from "@/lib/clerk-auth"
import { Spinner } from "@sonojs/ui/components/spinner"

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const userId = await getAuthUserId()
  if (!userId) redirect("/sign-in")

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <Spinner className="size-5 text-muted-foreground" />
        </div>
      }
    >
      <AccountSettings />
    </Suspense>
  )
}
