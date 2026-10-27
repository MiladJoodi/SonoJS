"use client"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "[--login-card-padding:1.25rem] sm:[--login-card-padding:1.5rem] md:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) sm:gap-8",
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
          <h1 className="text-h3 text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Use Google, Facebook, or your email.
          </p>
        </div>
      </header>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
          <FacebookIcon />
          Continue with Facebook
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
          <Label htmlFor="social-email">Email</Label>
          <Input
            id="social-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className="shadow-none"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="social-password">Password</Label>
          <Input
            id="social-password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
            className="shadow-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="social-remember" />
          <Label htmlFor="social-remember" className="font-normal">
            Remember me
          </Label>
          <a
            href="#"
            className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <Button
          type="submit"
          className="mt-1 w-full shadow-none"
        >
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </a>
      </p>
    </div>
  )
}
