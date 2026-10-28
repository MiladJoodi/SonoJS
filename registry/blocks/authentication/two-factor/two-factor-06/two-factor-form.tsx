"use client"

import * as React from "react"
import {
  GlobeIcon,
  MapPinIcon,
  MonitorIcon,
  ShieldAlertIcon,
} from "lucide-react"

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
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="flex flex-col justify-between gap-6 border-b border-border/70 bg-amber-500/10 p-6 sm:p-8 lg:border-b-0 lg:border-e">
        <div className="space-y-4 text-start">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-400">
            <ShieldAlertIcon className="size-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <h1 className="text-h3 font-semibold tracking-tight text-foreground">
              New sign-in detected
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Someone is trying to access your account from a device we
              haven&apos;t seen. Confirm with your authenticator to approve.
            </p>
          </div>
        </div>

        <ul className="space-y-2.5 text-sm text-foreground">
          <li className="flex items-center gap-2.5">
            <MonitorIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span>Chrome on Windows</span>
          </li>
          <li className="flex items-center gap-2.5">
            <MapPinIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span>Tehran, IR · approx.</span>
          </li>
          <li className="flex items-center gap-2.5">
            <GlobeIcon
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <span dir="ltr">Just now · IP ···.··.84.12</span>
          </li>
        </ul>
      </aside>

      <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Approve this sign-in
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code from your authenticator app.
          </p>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="tfa-06" className="sr-only">
              Authenticator code
            </Label>
            <InputOTP
              id="tfa-06"
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
            Approve sign-in
          </Button>
        </form>

        <p className="text-start text-sm">
          <a
            href="#"
            className="cursor-pointer font-medium text-destructive underline-offset-4 hover:underline"
          >
            Deny — this wasn&apos;t me
          </a>
        </p>
      </div>
    </div>
  )
}
