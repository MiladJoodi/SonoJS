"use client"

import { FingerprintIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

const controlClass = "shadow-none"

export default function PasskeyForm({
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
          <h1 className="text-h3 text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Prefer a passkey. Password is available as a fallback.
          </p>
        </div>
      </header>

      <Button
        type="button"
        className="w-full shadow-none"
      >
        <FingerprintIcon className="size-4" />
        Continue with passkey
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or password</span>
        <Separator className="flex-1" />
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="passkey-02-email">Email</Label>
          <Input
            id="passkey-02-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className={controlClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passkey-02-password">Password</Label>
          <Input
            id="passkey-02-password"
            type="password"
            autoComplete="current-password"
            placeholder={"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"}
            required
            className={controlClass}
          />
        </div>
        <Button
          type="submit"
          variant="outline"
          className="mt-1 h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
        >
          Sign in with password
        </Button>
      </form>
    </div>
  )
}
