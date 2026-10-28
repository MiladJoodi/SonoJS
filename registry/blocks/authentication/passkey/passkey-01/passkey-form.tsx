"use client"

import type * as React from "react"
import { FingerprintIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

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
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <FingerprintIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Sign in with a passkey
          </h1>
          <p className="text-sm text-muted-foreground">
            Use Face ID, Touch ID, Windows Hello, or your security key.
          </p>
        </div>
      </header>

      <Button type="button" className="w-full cursor-pointer">
        <FingerprintIcon className="size-4" aria-hidden />
        Continue with passkey
      </Button>

      <p className="inline-flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheckIcon className="size-3.5 text-primary" aria-hidden />
        Synced across your devices
      </p>

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
