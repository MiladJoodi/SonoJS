"use client"

import { KeyRoundIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 px-3 shadow-none"

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
      <KeyRoundIcon className="size-24 text-muted-foreground/50 md:size-40" strokeWidth={1.25} />
    </div>
  )
}

export default function ForgotPasswordForm({
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
            "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
            "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]"
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Forgot password?</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and we will send a recovery link.
              </p>
            </div>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="forgot-02-email">Email</Label>
              <Input
                id="forgot-02-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className={controlClass}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
            >
              Send recovery link
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Remembered it?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
