"use client"

import * as React from "react"

/**
 * Server cookie hint for first paint before Clerk JS finishes.
 * Same idea as SiteHeader `initialSignedIn` — avoid signed-in flash of guest chrome.
 */
const SignedInHintContext = React.createContext(false)

export function SignedInHintProvider({
  value,
  children,
}: {
  value: boolean
  children: React.ReactNode
}) {
  return (
    <SignedInHintContext.Provider value={value}>
      {children}
    </SignedInHintContext.Provider>
  )
}

export function useSignedInHint() {
  return React.useContext(SignedInHintContext)
}
