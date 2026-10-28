"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

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
const STEP = 2
const TOTAL = 3

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
  const progress = (STEP / TOTAL) * 100

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-md flex-col gap-6 bg-white p-6 sm:p-8 dark:bg-background",
        className
      )}
      {...props}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <span>
            Step {STEP} of {TOTAL}
          </span>
          <span className="text-foreground">Verify</span>
        </div>
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={STEP}
          aria-valuemin={1}
          aria-valuemax={TOTAL}
          aria-label={`Step ${STEP} of ${TOTAL}`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <header className="space-y-1.5 text-start">
        <h1 className="text-h3 font-semibold tracking-tight text-foreground">
          Verify your email
        </h1>
        <p className="text-sm text-muted-foreground">
          Almost done — enter the code we sent to{" "}
          <span dir="ltr" className="font-medium text-foreground">
            a***@company.com
          </span>
        </p>
      </header>

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="otp-06" className="sr-only">
            Verification code
          </Label>
          <InputOTP
            id="otp-06"
            maxLength={6}
            value={otp}
            onChange={setOtp}
            autoFocus
            containerClassName="justify-start"
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
          <div className="text-sm">
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

        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
          >
            <ArrowLeftIcon className="size-4 icon-dir" aria-hidden />
            Back
          </Button>
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={!ready}
          >
            Continue
            <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
          </Button>
        </div>
      </form>
    </div>
  )
}
