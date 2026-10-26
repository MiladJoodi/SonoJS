"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass = "shadow-none"

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-soft",
        className
      )}
      {...props}
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
          <Label htmlFor="reset-01-password">New password</Label>
          <Input
            id="reset-01-password"
            type="password"
            autoComplete="new-password"
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            required
            className={controlClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reset-01-confirm">Confirm password</Label>
          <Input
            id="reset-01-confirm"
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
  )
}
