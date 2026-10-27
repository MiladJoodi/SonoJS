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
import teamImage from "./images/team.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function PhotoPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-[12px] bg-muted",
        className
      )}
    >
      {!missing ? (
        <img
          src={assetSrc(teamImage)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
          onError={() => setMissing(true)}
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor:
            "color-mix(in oklab, var(--primary) 70%, transparent)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 m-auto flex max-w-sm items-center justify-center p-6">
        <div className="text-start">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Sign in
          </h2>
          <p className="mt-6 text-base font-medium leading-relaxed text-primary-foreground/90">
            Sign in to your account and explore a world of possibilities. Your
            journey begins here.
          </p>
        </div>
      </div>
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
      <div className="w-full max-w-6xl rounded-[12px] border border-border/70 bg-card p-3 shadow-soft sm:p-4 lg:p-6"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
        <div className="grid items-center gap-x-8 gap-y-6 md:grid-cols-2 md:gap-y-10">
          <div className="mx-auto w-full max-w-md p-1 sm:p-2 md:p-4">
            <a
              href="#"
              className="mb-6 inline-flex cursor-pointer items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:mb-10"
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

            <form
              className="flex flex-col gap-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="grid gap-2">
                <Label htmlFor="login-13-email">Email</Label>
                <Input
                  id="login-13-email"
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
                <Label htmlFor="login-13-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-13-password"
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
                  <Checkbox id="login-13-remember" />
                  <Label htmlFor="login-13-remember" className="font-normal">
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
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
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

          <PhotoPanel />
        </div>
      </div>
    </div>
  )
}
