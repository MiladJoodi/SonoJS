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

function SignupPanel({ className }: { className?: string }) {
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

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        <SignupPanel className="order-2 md:order-1" />

        <div
          className={cn(
            "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
            "order-1 mx-auto flex w-full max-w-md flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) md:order-2 md:mx-0 md:max-w-sm md:shrink-0",
            "shadow-soft",
            ""
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Create an account</h1>
              <p className="text-sm text-muted-foreground">
                Sign up to get started and enjoy full access to all features.
              </p>
            </div>
          </header>

          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <AppleIcon />
              Sign up with Apple
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">
              Or register with email
            </span>
            <Separator className="flex-1" />
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="signup-first-name">First Name</Label>
                <Input
                  id="signup-first-name"
                  autoComplete="given-name"
                  placeholder="Cameron"
                  required
                  className={controlClass}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-last-name">Last Name</Label>
                <Input
                  id="signup-last-name"
                  autoComplete="family-name"
                  placeholder="Williamson"
                  required
                  className={controlClass}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="Enter your email"
                required
                className={controlClass}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password"
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
              className="w-full shadow-none"
            >
              Create Account
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
    </div>
  )
}
