"use client"

import { useAuth } from "@clerk/nextjs"

import { UserMenuLazy } from "@/components/auth/user-menu-lazy"

import { GuestAuthControls } from "./guest-auth-controls"

/**
 * Signed-in header branch - Clerk `useAuth` lives only in this chunk.
 * Falls back to guest chrome if the session hint was stale.
 */
export function SignedInAuthControls({
  initialSignedIn = true,
}: {
  initialSignedIn?: boolean
}) {
  const { isLoaded, isSignedIn } = useAuth()
  const signedIn = isLoaded ? Boolean(isSignedIn) : initialSignedIn

  if (!signedIn) {
    return <GuestAuthControls />
  }

  return <UserMenuLazy />
}
