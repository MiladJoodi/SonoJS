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

const panelImage = "/blocks/signup-03/01.webp"
const controlClass = "h-[46px] rounded-lg px-3"

function SignupPanel() {
  const [missing, setMissing] = React.useState(false)

  return (
    <div className="relative h-[42rem] w-full max-w-md shrink-0 overflow-hidden rounded-3xl bg-muted">
      {missing ? null : (
        <img
          src={panelImage}
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
        "flex w-full items-center justify-center bg-background px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:justify-center">
        <SignupPanel />

        <div className="flex w-full max-w-sm flex-col gap-6">
          <header className="space-y-1.5 text-start">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign up to get started and enjoy full access to all features.
            </p>
          </header>

          <div className="grid gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-lg"
            >
              <GoogleIcon />
              Sign up with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-lg"
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

            <Button type="submit" className="h-[46px] w-full rounded-lg">
              Create Account
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
