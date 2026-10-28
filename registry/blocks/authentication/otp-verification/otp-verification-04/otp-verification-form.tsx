"use client"

import * as React from "react"
import { AlertCircleIcon, MailIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
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
  const [otp, setOtp] = React.useState("482")
  const [invalid, setInvalid] = React.useState(true)
  const [seconds, setSeconds] = React.useState(0)

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
        <span className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircleIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            That code didn&apos;t work
          </h1>
          <p className="text-sm text-muted-foreground">
            It may be expired or mistyped. We sent a new one to{" "}
            <span dir="ltr" className="font-medium text-foreground">
              a***@company.com
            </span>
          </p>
        </div>
      </header>

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (!ready) return
          // Demo: treat incomplete/wrong as invalid until user clears & retries
          setInvalid(otp !== "482910")
        }}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Label htmlFor="otp-04" className="sr-only">
            Verification code
          </Label>
          <InputOTP
            id="otp-04"
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value)
              setInvalid(false)
            }}
            autoFocus
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={1} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={2} aria-invalid={invalid || undefined} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={4} aria-invalid={invalid || undefined} />
              <InputOTPSlot index={5} aria-invalid={invalid || undefined} />
            </InputOTPGroup>
          </InputOTP>
          {invalid ? (
            <p
              className="flex items-center gap-1.5 text-sm text-destructive"
              role="alert"
            >
              <MailIcon className="size-3.5 shrink-0" aria-hidden />
              Code expired or incorrect — try again
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:flex-row">
          <Button
            type="submit"
            className="w-full cursor-pointer sm:flex-1"
            disabled={!ready}
          >
            Try again
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer sm:flex-1"
            disabled={seconds > 0}
            onClick={() => {
              setSeconds(RESEND_SECONDS)
              setOtp("")
              setInvalid(false)
            }}
          >
            {seconds > 0 ? (
              <span dir="ltr">Resend in {seconds}s</span>
            ) : (
              "Resend code"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
