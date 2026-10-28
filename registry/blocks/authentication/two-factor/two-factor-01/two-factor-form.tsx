"use client"

import * as React from "react"
import { ShieldCheckIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

export default function TwoFactorForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [otp, setOtp] = React.useState("")
  const ready = otp.length === 6

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheckIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Authenticator code
          </h1>
          <p className="text-sm text-muted-foreground">
            Open your authenticator app and enter the 6-digit code.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Label htmlFor="tfa-01" className="sr-only">
            Authenticator code
          </Label>
          <InputOTP
            id="tfa-01"
            maxLength={6}
            value={otp}
            onChange={setOtp}
            autoFocus
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Codes refresh every 30 seconds
          </p>
        </div>

        <Button
          type="submit"
          className="mt-1 w-full cursor-pointer"
          disabled={!ready}
        >
          Continue
        </Button>
      </form>

      <p className="text-center text-sm">
        <a
          href="#"
          className="cursor-pointer font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Use another method
        </a>
      </p>
    </div>
  )
}
