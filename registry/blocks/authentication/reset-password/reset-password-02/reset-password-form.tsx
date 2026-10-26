"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none"

function strengthScore(value: string) {
  let score = 0
  if (value.length >= 8) score += 1
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  return score
}

const labels = ["Too weak", "Weak", "Okay", "Strong", "Very strong"] as const

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [password, setPassword] = React.useState("")
  const score = strengthScore(password)

  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
        "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Set a new password</h1>
          <p className="text-sm text-muted-foreground">
            Use a strong password. We show strength as you type.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="reset-02-password">New password</Label>
          <Input
            id="reset-02-password"
            type="password"
            autoComplete="new-password"
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={controlClass}
          />
          <div className="grid grid-cols-4 gap-1.5 pt-1" aria-hidden>
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-1.5 rounded-full bg-muted",
                  index < score && "bg-primary"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {password ? labels[score] : "Enter a password to check strength"}
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reset-02-confirm">Confirm password</Label>
          <Input
            id="reset-02-confirm"
            type="password"
            autoComplete="new-password"
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            required
            className={controlClass}
          />
        </div>
        <Button
          type="submit"
          className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
        >
          Update password
        </Button>
      </form>
    </div>
  )
}
