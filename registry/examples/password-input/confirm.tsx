"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@sonojs/ui/components/field"
import { PasswordInput } from "@sonojs/ui/components/password-input"

export function PasswordInputConfirm() {
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const mismatch = confirm.length > 0 && confirm !== password

  return (
    <FieldGroup className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="password-new">New password</FieldLabel>
        <PasswordInput
          id="password-new"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          showStrength
          showRequirements
        />
      </Field>
      <Field data-invalid={mismatch || undefined}>
        <FieldLabel htmlFor="password-confirm">Confirm password</FieldLabel>
        <PasswordInput
          id="password-confirm"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          autoComplete="new-password"
          aria-invalid={mismatch || undefined}
        />
        <FieldDescription
          className={mismatch ? "text-destructive" : undefined}
        >
          {mismatch
            ? "Passwords do not match."
            : "Re-enter the same password to confirm."}
        </FieldDescription>
      </Field>
    </FieldGroup>
  )
}
