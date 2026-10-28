"use client"

import type * as React from "react"
import { KeyRoundIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
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
      <header className="flex flex-col items-start gap-3 text-start">
        <div className="flex w-full items-start justify-between gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <KeyRoundIcon className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className="shrink-0 border-0 bg-muted text-muted-foreground"
          >
            1 of 8 remaining
          </Badge>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Enter a recovery code
          </h1>
          <p className="text-sm text-muted-foreground">
            Use one of the one-time codes you saved when you set up recovery.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="recovery-04-code">Recovery code</Label>
          <Input
            id="recovery-04-code"
            type="text"
            dir="ltr"
            autoComplete="one-time-code"
            placeholder="XXXX-XXXX-XXXX"
            required
            className="font-mono tracking-wider"
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Verify recovery code
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Lost your codes?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Try another method
        </a>
      </p>
    </div>
  )
}
