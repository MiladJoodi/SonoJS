"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

import logoWhiteAsset from "./logo-white.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div
      className={cn(
        "w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800",
        className
      )}
      {...props}
    >
      <div className="flex min-h-svh flex-col items-center justify-center px-3 py-6 sm:px-4 md:p-8">
        <div className="grid w-full max-w-6xl items-center gap-x-10 gap-y-8 lg:grid-cols-2 lg:gap-y-14">
          <div className="mx-auto w-full max-w-lg text-start lg:mx-0">
            <a
              href="#"
              className="mb-8 inline-flex cursor-pointer items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 sm:mb-12"
              aria-label="Home"
            >
              <img
                src={assetSrc(logoWhiteAsset)}
                alt=""
                aria-hidden="true"
                width={28}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-xl font-semibold tracking-tight text-white">
                Sono
              </span>
            </a>

            <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
              Seamless Login for Exclusive Access
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-100/90">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your
              account.
            </p>

            <p className="mt-12 text-sm text-slate-50">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="cursor-pointer font-semibold text-white underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Register here
              </a>
            </p>
          </div>

          <div className="mx-auto w-full max-w-lg rounded-[12px] border border-border/70 bg-card px-4 py-6 shadow-soft sm:px-6 sm:py-8 md:px-8 lg:max-w-md"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
            <h1 className="mb-6 text-2xl font-semibold tracking-tight text-foreground sm:mb-10 sm:text-3xl">
              Sign in
            </h1>

            <form
              className="flex flex-col gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-2">
                <Label htmlFor="login-16-email">Email</Label>
                <Input
                  id="login-16-email"
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
                <Label htmlFor="login-16-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-16-password"
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
                  <Checkbox id="login-16-remember" />
                  <Label htmlFor="login-16-remember" className="font-normal">
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

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
                <GoogleIcon />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
                <AppleIcon />
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
