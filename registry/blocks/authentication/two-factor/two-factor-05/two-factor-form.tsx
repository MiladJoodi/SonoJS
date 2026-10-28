"use client"

import * as React from "react"
import { FingerprintIcon, KeyRoundIcon } from "lucide-react"

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
  const [mode, setMode] = React.useState<"passkey" | "code">("passkey")
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
          {mode === "passkey" ? (
            <FingerprintIcon className="size-5" aria-hidden />
          ) : (
            <KeyRoundIcon className="size-5" aria-hidden />
          )}
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            {mode === "passkey" ? "Confirm with a passkey" : "Enter a code"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "passkey"
              ? "Use Face ID, Touch ID, or your security key — the fastest 2FA path in 2026."
              : "Use a code from your authenticator if your passkey isn’t available."}
          </p>
        </div>
      </header>

      {mode === "passkey" ? (
        <div className="flex flex-col gap-3">
          <Button type="button" className="w-full cursor-pointer">
            <FingerprintIcon className="size-4" aria-hidden />
            Continue with passkey
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => setMode("code")}
          >
            Enter a code instead
          </Button>
        </div>
      ) : (
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <Label htmlFor="tfa-05" className="sr-only">
              Authenticator code
            </Label>
            <InputOTP
              id="tfa-05"
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
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={!ready}
          >
            Verify code
          </Button>
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              setMode("passkey")
              setOtp("")
            }}
          >
            Back to passkey
          </button>
        </form>
      )}
    </div>
  )
}
