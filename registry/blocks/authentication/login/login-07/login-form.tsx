"use client"

import * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

import backgroundImage from "./images/bg.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const controlClass =
  "h-[46px] rounded-[12px] border-white/25 bg-white/10 text-white shadow-none backdrop-blur-sm placeholder:text-white/55"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [missingBg, setMissingBg] = React.useState(false)

  return (
    <div
      className={cn(
        "relative flex min-h-[36rem] w-full items-center justify-center overflow-hidden px-3 py-6 sm:px-4 md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      {!missingBg ? (
        <img
          src={assetSrc(backgroundImage)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={() => setMissingBg(true)}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-700 via-indigo-700 to-violet-800"
          aria-hidden
        />
      )}
      <div className="absolute inset-0 bg-black/35" aria-hidden />

      <div
        className={cn(
          "[--login-card-padding:1.25rem] sm:[--login-card-padding:1.5rem] md:[--login-card-padding:2rem]",
          "relative z-10 flex w-full max-w-md flex-col gap-6 rounded-[12px] border border-white/25 sm:gap-8",
          "bg-white/12 p-(--login-card-padding) text-white shadow-soft backdrop-blur-xl"
        )}
      >
        <header className="flex flex-col items-start gap-3">
          <span className="h-0.5 w-8 rounded-full bg-white" aria-hidden />
          <div className="space-y-1.5">
            <h1 className="text-h3 text-white">Sign in</h1>
            <p className="text-sm text-white/75">
              Glass card over your scene. Email and password to continue.
            </p>
          </div>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-2">
            <Label htmlFor="login-07-email" className="text-white/90">
              Email
            </Label>
            <Input
              id="login-07-email"
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
              <Label htmlFor="login-07-password" className="text-white/90">
                Password
              </Label>
              <a
                href="#"
                className="ms-auto cursor-pointer text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="login-07-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              className={controlClass}
            />
          </div>
          <Button
            type="submit"
            className="mt-1 w-full shadow-none"
          >
            Sign in
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Separator className="flex-1 bg-white/25" />
          <span className="text-xs text-white/65">or</span>
          <Separator className="flex-1 bg-white/25" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="h-[46px] rounded-[12px] border-white/25 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
          >
            <GoogleIcon />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-[46px] rounded-[12px] border-white/25 bg-white/10 text-white shadow-none hover:bg-white/20 hover:text-white"
          >
            <AppleIcon />
            Apple
          </Button>
        </div>

        <p className="text-center text-sm text-white/75">
          New here?{" "}
          <a
            href="#"
            className="cursor-pointer font-medium text-white underline-offset-4 hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}
