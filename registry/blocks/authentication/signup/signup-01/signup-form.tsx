"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none"

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-6 py-10",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
          "flex w-full max-w-md flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
          "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
          "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]"
        )}
      >
        <header className="flex flex-col items-start gap-3">
          <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
          <div className="space-y-1.5">
            <h1 className="text-h3 text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Name, email, and a password. That&apos;s all.
            </p>
          </div>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="signup-01-first">First name</Label>
              <Input
                id="signup-01-first"
                autoComplete="given-name"
                placeholder="Cameron"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-01-last">Last name</Label>
              <Input
                id="signup-01-last"
                autoComplete="family-name"
                placeholder="Williamson"
                required
                className={controlClass}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-01-email">Email</Label>
            <Input
              id="signup-01-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
              required
              className={controlClass}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-01-password">Password</Label>
            <Input
              id="signup-01-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              required
              className={controlClass}
            />
          </div>
          <Button
            type="submit"
            className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
          >
            Create account
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
