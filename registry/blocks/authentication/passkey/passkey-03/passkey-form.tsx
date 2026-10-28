"use client"

import type * as React from "react"
import { FingerprintIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const steps = [
  {
    n: "1",
    title: "Confirm it's you",
    body: "Unlock with Face ID, Touch ID, or your device PIN.",
  },
  {
    n: "2",
    title: "Save this passkey",
    body: "Stored in your password manager / platform keychain.",
  },
  {
    n: "3",
    title: "Sign in faster next time",
    body: "No password to remember — you can still keep a backup.",
  },
] as const

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3 text-start">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FingerprintIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Create a passkey
          </h1>
          <p className="text-sm text-muted-foreground">
            Register this device so you can sign in without a password.
          </p>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={1}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-label="Setup progress"
        >
          <div className="h-full w-1/3 rounded-full bg-primary" />
        </div>
      </header>

      <ol className="space-y-3">
        {steps.map((step) => (
          <li
            key={step.n}
            className="flex items-start gap-3 rounded-[12px] border border-border/70 bg-muted/30 px-3 py-3 text-start"
          >
            <span
              dir="ltr"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-foreground ring-1 ring-border/70 dark:bg-card"
            >
              {step.n}
            </span>
            <span className="min-w-0 space-y-0.5">
              <span className="block text-sm font-semibold text-foreground">
                {step.title}
              </span>
              <span className="block text-xs text-muted-foreground">
                {step.body}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <Button type="button" className="w-full cursor-pointer">
        <FingerprintIcon className="size-4" aria-hidden />
        Set up passkey
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Not now?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Skip for later
        </a>
      </p>
    </div>
  )
}
