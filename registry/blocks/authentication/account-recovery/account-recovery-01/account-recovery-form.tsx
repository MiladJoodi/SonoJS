"use client"

import type * as React from "react"
import { MailIcon, ShieldCheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export default function AccountRecoveryForm({
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
          <MailIcon className="size-7" strokeWidth={1.5} aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Recover your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the email on your account. We&apos;ll send recovery steps.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2 text-start">
          <Label htmlFor="recovery-01-email">Email</Label>
          <Input
            id="recovery-01-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Send recovery email
        </Button>
      </form>

      <p className="inline-flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
        <ShieldCheckIcon className="size-3.5 text-primary" aria-hidden />
        We&apos;ll never ask for your password
      </p>

      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to sign in
        </a>
      </p>
    </div>
  )
}
