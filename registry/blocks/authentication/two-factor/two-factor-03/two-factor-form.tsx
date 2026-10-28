"use client"

import * as React from "react"
import { KeyRoundIcon } from "lucide-react"

import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export default function TwoFactorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [code, setCode] = React.useState("")
  const ready = code.replace(/[^a-zA-Z0-9]/g, "").length >= 8

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
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <KeyRoundIcon className="size-5" aria-hidden />
          </span>
          <Badge
            variant="secondary"
            className="border-0 bg-muted text-muted-foreground"
          >
            3 codes left
          </Badge>
        </div>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Backup code
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter one of your single-use backup codes. Each code works once.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="tfa-03-code">Backup code</Label>
          <Input
            id="tfa-03-code"
            dir="ltr"
            autoFocus
            autoComplete="one-time-code"
            placeholder="XXXX-XXXX-XXXX"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="h-[46px] rounded-[12px] border-border/70 font-mono tracking-wider shadow-none"
          />
          <p className="text-xs text-muted-foreground">
            Format: letters and numbers, often with dashes
          </p>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={!ready}
        >
          Verify backup code
        </Button>
      </form>

      <p className="text-start text-sm">
        <a
          href="#"
          className="cursor-pointer font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Use authenticator instead
        </a>
      </p>
    </div>
  )
}
