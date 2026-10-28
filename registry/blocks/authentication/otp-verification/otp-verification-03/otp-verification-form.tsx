"use client"

import * as React from "react"
import { CheckIcon, LockIcon, ShieldCheckIcon } from "lucide-react"

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

const TRUST = [
  "Encrypted in transit",
  "Expires in 10 minutes",
  "Never shared with apps",
] as const

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
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
        <div className="space-y-4 text-start">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
            <ShieldCheckIcon className="size-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <h1 className="text-h3 font-semibold tracking-tight">
              Secure your account
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              One short code confirms it&apos;s you — the same beat banks and
              workspaces use in 2026.
            </p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {TRUST.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <CheckIcon className="size-3" aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <LockIcon className="size-3.5" aria-hidden />
          Protected by Sono Auth
        </p>
      </aside>

      <div className="flex flex-col justify-center gap-6 bg-card p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Enter verification code
          </h2>
          <p className="text-sm text-muted-foreground">
            Sent to{" "}
            <span dir="ltr" className="font-medium text-foreground">
              a***@company.com
            </span>
          </p>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="otp-03" className="sr-only">
              Verification code
            </Label>
            <InputOTP
              id="otp-03"
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
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer sm:w-auto sm:self-start"
            disabled={!ready}
          >
            Continue
          </Button>
        </form>

        <div className="text-start text-sm">
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
    </div>
  )
}
