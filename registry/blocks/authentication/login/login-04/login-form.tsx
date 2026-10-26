"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

import panelImage from "./images/01.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const controlClass = "px-3 shadow-none"

function LoginPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "relative aspect-[5/4] max-h-64 w-full overflow-hidden rounded-[12px] bg-muted",
        "md:aspect-auto md:h-[42rem] md:max-h-none md:w-full md:max-w-md md:flex-none",
        className
      )}
    >
      {missing ? null : (
        <img
          src={assetSrc(panelImage)}
          alt=""
          className="absolute inset-0 size-full object-cover"
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
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-background px-3 py-6 sm:px-4 md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        <LoginPanel className="order-2 md:order-1" />

        <div
          className={cn(
            "[--login-card-padding:1.25rem] sm:[--login-card-padding:1.5rem] md:[--login-card-padding:2rem]",
            "order-1 mx-auto flex w-full max-w-md flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) md:order-2 md:mx-0 md:max-w-sm md:shrink-0",
            "shadow-soft",
            ""
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Use your email and password to continue.
              </p>
            </div>
          </header>

          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <AppleIcon />
              Continue with Apple
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
              <Label htmlFor="login-04-email">Email</Label>
              <Input
                id="login-04-email"
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
                <Label htmlFor="login-04-password">Password</Label>
                <a
                  href="#"
                  className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="login-04-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className={cn(controlClass, "pe-12")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 end-2 flex w-10 cursor-pointer items-center justify-center text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="mt-1 w-full shadow-none"
            >
              Sign in
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
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
