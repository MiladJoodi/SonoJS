"use client"

import * as React from "react"
import { SmartphoneIcon } from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
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
          <SmartphoneIcon className="size-5" aria-hidden />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Check your phone
          </h1>
          <p className="text-sm text-muted-foreground">
            We texted a code to{" "}
            <span dir="ltr" className="font-medium text-foreground">
              +1 ••• ••• 4242
            </span>
          </p>
        </div>
      </header>

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Label htmlFor="otp-02" className="sr-only">
            SMS verification code
          </Label>
          {/* Continuous 6 slots — no separator (SMS pattern) */}
          <InputOTP
            id="otp-02"
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
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          type="submit"
          className="mt-1 w-full cursor-pointer"
          disabled={!ready}
        >
          Verify phone
        </Button>
      </form>

      <div className="flex flex-col items-center gap-2 text-center text-sm">
        {seconds > 0 ? (
          <p className="text-muted-foreground" dir="ltr">
            Resend SMS in {seconds}s
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
            Resend SMS
          </button>
        )}
        <a
          href="#"
          className="cursor-pointer text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Change number
        </a>
      </div>
    </div>
  )
}
