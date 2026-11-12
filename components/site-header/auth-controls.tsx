"use client"

import dynamic from "next/dynamic"

import { UserMenuLazy } from "@/components/auth/user-menu-lazy"

import { GuestAuthControls } from "./guest-auth-controls"

const SignedInAuthControls = dynamic(
  () =>
    import("./signed-in-auth-controls").then((m) => m.SignedInAuthControls),
  {
    loading: () => <UserMenuLazy />,
    ssr: true,
  }
)

/**
 * Header auth chrome.
 * Server session hint picks the branch; guest path never imports Clerk.
 * Signed-in Clerk hooks load in a separate chunk so MainNav can hydrate first.
 */
export function AuthControls({
  initialSignedIn = false,
}: {
  /** From server auth cookie - first paint without waiting on Clerk JS. */
  initialSignedIn?: boolean
}) {
  if (initialSignedIn) {
    return <SignedInAuthControls initialSignedIn />
  }

  return <GuestAuthControls />
}
