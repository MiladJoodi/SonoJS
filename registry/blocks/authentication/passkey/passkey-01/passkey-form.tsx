"use client"

import { FingerprintIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

export default function PasskeyForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-soft",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-muted text-foreground">
          <FingerprintIcon className="size-7" strokeWidth={1.5} />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Sign in with a passkey</h1>
          <p className="text-sm text-muted-foreground">
            Use Face ID, Touch ID, or your device lock to continue.
          </p>
        </div>
      </header>

      <Button
        type="button"
        className="w-full shadow-none"
      >
        Continue with passkey
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Prefer a password?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in another way
        </a>
      </p>
    </div>
  )
}
