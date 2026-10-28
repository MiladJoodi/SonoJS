"use client"

import * as React from "react"
import { FingerprintIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"
import { Label } from "@sonojs/ui/components/label"
import { cn } from "@/lib/utils"

const RESEND_SECONDS = 30

export default function OtpVerificationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [otp, setOtp] = React.useState("")
  const [trust, setTrust] = React.useState(true)
  const [seconds, setSeconds] = React.useState(RESEND_SECONDS)

  React.useEffect(() => {
    if (seconds <= 0) return
    const id = window.setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => window.clearTimeout(id)
  }, [seconds])

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
          <FingerprintIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Confirm it&apos;s you
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter the code from your email, then choose whether to trust this
            device.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Label htmlFor="otp-05" className="sr-only">
            Verification code
          </Label>
          <InputOTP
            id="otp-05"
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
        </div>

        <div className="flex w-full items-start gap-3 rounded-[12px] border border-border/70 bg-muted/40 px-3 py-3 text-start">
          <Checkbox
            id="trust-device"
            checked={trust}
            onCheckedChange={(v) => setTrust(v === true)}
            className="mt-0.5 cursor-pointer"
          />
          <div className="min-w-0 space-y-0.5">
            <Label
              htmlFor="trust-device"
              className="cursor-pointer text-sm font-medium text-foreground"
            >
              Trust this device for 30 days
            </Label>
            <p className="text-xs text-muted-foreground">
              Skip the code next time on this browser. Revoke anytime in
              settings.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={!ready}
        >
          Verify &amp; continue
        </Button>
      </form>

      <div className="text-center text-sm">
        {seconds > 0 ? (
          <p className="text-muted-foreground" dir="ltr">
            Resend in {seconds}s
          </p>
        ) : (
          <button
            type="button"
            className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline"
            onClick={() => {
              setSeconds(RESEND_SECONDS)
              setOtp("")
            }}
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  )
}
