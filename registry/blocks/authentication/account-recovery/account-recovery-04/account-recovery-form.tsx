"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass = "font-mono shadow-none"

export default function AccountRecoveryForm({
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
          <h1 className="text-h3 text-foreground">Enter a recovery code</h1>
          <p className="text-sm text-muted-foreground">
            Use one of the one-time codes you saved when you set up recovery.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="recovery-04-code">Recovery code</Label>
          <Input
            id="recovery-04-code"
            type="text"
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
          Verify recovery code
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Lost your codes?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Try another method
        </a>
      </p>
    </div>
  )
}
