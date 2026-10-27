"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none font-mono tracking-wider"

export default function TwoFactorForm({
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
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Backup code</h1>
          <p className="text-sm text-muted-foreground">
            Enter one of your single-use backup codes to continue.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="tfa-03-code">Backup code</Label>
          <Input
            id="tfa-03-code"
            dir="ltr"
            autoComplete="one-time-code"
            placeholder="XXXX-XXXX-XXXX"
            required
            className={controlClass}
          />
        </div>
        <Button
          type="submit"
          className="mt-1 w-full shadow-none"
        >
          Verify backup code
        </Button>
      </form>
    </div>
  )
}
