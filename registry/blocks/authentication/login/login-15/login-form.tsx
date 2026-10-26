"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

import logoAsset from "./logo.svg"
import signinImage from "./images/signin.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function IllustrationPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div className={cn("aspect-[12/11] w-full", className)}>
      {missing ? (
        <div className="flex size-full items-center justify-center rounded-[12px] bg-muted">
          <p className="text-sm text-muted-foreground">Add signin.webp here</p>
        </div>
      ) : (
        <img
          src={assetSrc(signinImage)}
          alt="Sign-in illustration"
          className="size-full object-contain"
          loading="lazy"
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
        "flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-lg rounded-[12px] border border-border/70 bg-card p-4 shadow-soft sm:p-5 md:max-w-2xl md:p-6 lg:max-w-6xl">
        <a
          href="#"
          className="mb-6 inline-flex cursor-pointer items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:mb-8 md:mb-0"
          aria-label="Home"
        >
          <img
            src={assetSrc(logoAsset)}
            alt=""
            aria-hidden="true"
            width={22}
            height={24}
            className="h-6 w-auto"
          />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Sono
          </span>
        </a>

        <div className="grid items-center gap-6 py-2 sm:gap-8 sm:py-4 md:grid-cols-2">
          <div className="order-1 md:-order-1">
            <IllustrationPanel />
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="mb-6 sm:mb-10">
              <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                Sign in
              </h1>
            </div>

            <form
              className="flex flex-col gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-2">
                <Label htmlFor="login-15-email">Email</Label>
                <Input
                  id="login-15-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                  className="shadow-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="login-15-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-15-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    className="pe-12 shadow-none"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 end-2 flex w-10 cursor-pointer items-center justify-center text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="size-4" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="login-15-remember" />
                  <Label htmlFor="login-15-remember" className="font-normal">
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="ms-auto cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full shadow-none">
                Sign in
              </Button>
            </form>

            <div className="my-8 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-sm text-muted-foreground">or</span>
              <Separator className="flex-1" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
            >
              <GoogleIcon />
              Sign in with Google
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
