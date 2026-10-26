"use client"

import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

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
              Continue with Google or GitHub, or use email.
            </p>
          </div>
        </header>

        <div className="grid gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
          >
            <GithubIcon />
            Continue with GitHub
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-2">
            <Label htmlFor="signup-02-email">Email</Label>
            <Input
              id="signup-02-email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder="name@example.com"
              required
              className={controlClass}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-02-password">Password</Label>
            <Input
              id="signup-02-password"
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
