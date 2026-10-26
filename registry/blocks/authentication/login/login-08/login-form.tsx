"use client"

import * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

/** Side illustration — prefer transparent PNG/WebP or SVG. */
const illustrationSrc = "/images/blocks/authentication/login/login-08/illustration.webp"

const controlClass =
  "h-[46px] rounded-[12px] border-border/70 shadow-none"

function IllustrationPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "relative flex aspect-[5/4] max-h-64 w-full items-center justify-center overflow-hidden rounded-[12px] bg-muted p-6",
        "md:aspect-auto md:h-[42rem] md:max-h-none md:w-full md:max-w-md md:flex-none md:p-8",
        className
      )}
    >
      {missing ? (
        <p className="max-w-[14rem] text-center text-sm text-muted-foreground">
          Add illustration.webp here
        </p>
      ) : (
        <img
          src={illustrationSrc}
          alt=""
          className="max-h-full max-w-full object-contain"
          onError={() => setMissing(true)}
        />
      )}
    </div>
  )
}

export default function LoginForm({
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
        <IllustrationPanel className="order-2 md:order-1" />

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
              <h1 className="text-h3 text-foreground">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Illustration on the side. Email and password to continue.
              </p>
            </div>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="login-08-email">Email</Label>
              <Input
                id="login-08-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className={controlClass}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center gap-3">
                <Label htmlFor="login-08-password">Password</Label>
                <a
                  href="#"
                  className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="login-08-password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className={controlClass}
              />
            </div>
            <Button
              type="submit"
              className="mt-1 h-[46px] w-full rounded-[12px] shadow-none"
            >
              Sign in
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[46px] rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <AppleIcon />
              Apple
            </Button>
          </div>

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
      </div>
    </div>
  )
}
