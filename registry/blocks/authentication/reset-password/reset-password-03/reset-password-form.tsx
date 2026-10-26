"use client"

import { KeyRoundIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass = "px-3 shadow-none"

function IconPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[5/4] max-h-64 w-full items-center justify-center overflow-hidden rounded-[12px] border border-border/70 bg-muted",
        "md:aspect-auto md:h-[42rem] md:max-h-none md:w-full md:max-w-md md:flex-none",
        className
      )}
      aria-hidden
    >
      <KeyRoundIcon
        className="size-24 text-muted-foreground/50 md:size-40"
        strokeWidth={1.25}
      />
    </div>
  )
}

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-background px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        <IconPanel className="order-2 md:order-1" />

        <div
          className={cn(
            "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
            "order-1 mx-auto flex w-full max-w-md flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) md:order-2 md:mx-0 md:max-w-sm md:shrink-0",
            "shadow-soft",
            ""
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Set a new password</h1>
              <p className="text-sm text-muted-foreground">
                Choose a new password for your account.
              </p>
            </div>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="reset-03-password">New password</Label>
              <Input
                id="reset-03-password"
                type="password"
                autoComplete="new-password"
                placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reset-03-confirm">Confirm password</Label>
              <Input
                id="reset-03-confirm"
                type="password"
                autoComplete="new-password"
                placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
                required
                className={controlClass}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 w-full shadow-none"
            >
              Update password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
