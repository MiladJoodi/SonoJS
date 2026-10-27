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
        "w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6 md:p-8",
        className
      )}
      style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
      {...props}
    >
      <div className="mb-6 flex justify-center">
        <a
          href="#"
          className="inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label="Home"
        >
          <img
            src={assetSrc(logoAsset)}
            alt=""
            aria-hidden="true"
            width={36}
            height={40}
            className="h-10 w-auto"
          />
        </a>
      </div>

      <header className="text-center">
        <h1 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in.
        </p>
      </header>

      <form
        className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="login-12-email">Email</Label>
          <Input
            id="login-12-email"
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
          <Label htmlFor="login-12-password">Password</Label>
          <div className="relative">
            <Input
              id="login-12-password"
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
              aria-label={showPassword ? "Hide password" : "Show password"}
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
            <Checkbox id="login-12-remember" />
            <Label htmlFor="login-12-remember" className="font-normal">
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

      <div className="my-6 flex items-center gap-3">
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
  )
}
