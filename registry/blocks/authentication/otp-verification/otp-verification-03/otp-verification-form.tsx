"use client"

import * as React from "react"
import { MailIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@sonojs/ui/components/input-otp"
import { Label } from "@sonojs/ui/components/label"

export default function OtpVerificationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [otp, setOtp] = React.useState("")

  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-soft",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
          <MailIcon className="size-5" />
        </span>
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We sent a code to{" "}
            <span dir="ltr" className="font-medium text-foreground">
              name@example.com
            </span>
          </p>
        </div>
      </header>

      <form
        className="flex flex-col items-center gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <Label htmlFor="otp-03" className="sr-only">
            Email verification code
          </Label>
          <div dir="ltr" className="flex w-full justify-center">
            <InputOTP
              id="otp-03"
              maxLength={6}
              value={otp}
              onChange={setOtp}
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
        </div>
        <Button
          type="submit"
          className="mt-1 w-full shadow-none"
        >
          Verify email
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Wrong inbox?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Resend code
        </a>
      </p>
    </div>
  )
}
