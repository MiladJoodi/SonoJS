import type { Metadata } from "next"
import { redirect } from "next/navigation"

import { AccountSettings } from "@/components/auth/account-settings"
import { getAuthUserId } from "@/lib/clerk-auth"

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const userId = await getAuthUserId()
  if (!userId) redirect("/sign-in")

  return <AccountSettings />
}
