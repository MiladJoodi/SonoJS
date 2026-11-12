"use client"

import * as React from "react"

import { PasswordInput } from "@sonojs/ui/components/password-input"

export function PasswordInputRequirements() {
  const [value, setValue] = React.useState("")

  return (
    <PasswordInput
      className="w-full max-w-sm"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="New password"
      autoComplete="new-password"
      showRequirements
    />
  )
}
