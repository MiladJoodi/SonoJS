"use client"

import { FingerprintIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

const steps = [
  "Confirm it is you with your device lock.",
  "Save this passkey for faster sign-in next time.",
  "You can still use a password as a backup.",
] as const

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <h1 className="text-h3 text-foreground">Create a passkey</h1>
          <p className="text-sm text-muted-foreground">
            Register this device so you can sign in without a password.
          </p>
        </div>
      </header>

      <ul className="space-y-3">
        {steps.map((step) => (
          <li
            key={step}
            className="flex items-start gap-2 text-start text-sm text-foreground"
          >
            <FingerprintIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{step}</span>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        className="h-[46px] w-full rounded-[12px] shadow-none"
      >
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
