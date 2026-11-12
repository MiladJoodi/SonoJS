"use client"

import * as React from "react"
import { LockIcon } from "lucide-react"

import { PasswordInput } from "@sonojs/ui/components/password-input"

export function PasswordInputGallery() {
  const [value, setValue] = React.useState("SonoJS1!")

  return (
    <div className="w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LockIcon className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 space-y-1">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">
            Create password
          </h3>
          <p className="text-xs text-muted-foreground">
            Strength, requirements, copy, and show/hide in one control.
          </p>
        </div>
      </div>
      <PasswordInput
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoComplete="new-password"
        placeholder="Enter a strong password"
        showStrength
        showRequirements
        showCopy
      />
    </div>
  )
}
