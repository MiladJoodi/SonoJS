"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

import illustrationSrc from "./images/illustration.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function IllustrationPanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <div
      className={cn(
        "mx-auto aspect-[71/50] w-full max-w-xl overflow-hidden lg:mx-0",
        className
      )}
    >
      {missing ? (
        <div className="flex size-full items-center justify-center rounded-[12px] bg-muted">
          <p className="max-w-[14rem] text-center text-sm text-muted-foreground">
            Add illustration.webp here
          </p>
        </div>
      ) : (
        <img
          src={assetSrc(illustrationSrc)}
          alt="Product integrations illustration"
          className="size-full object-cover"
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
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-3 py-6 sm:px-4 md:px-8 md:py-10",
        className
      )}
      {...props}
    >
      <div className="grid w-full max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
        <div
          className={cn(
            "mx-auto w-full max-w-md rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6 md:p-8 lg:mx-0"
          )}
        >
          <header className="mb-6 text-start sm:mb-8">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:mb-3 sm:text-3xl">
              Sign in
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Sign in to your account to access your dashboard and manage your
              projects.
            </p>
          </header>

          <form
            className="flex flex-col gap-5 sm:gap-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="login-11-email">Email</Label>
              <Input
                id="login-11-email"
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
              <Label htmlFor="login-11-password">Password</Label>
              <Input
                id="login-11-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                className="shadow-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="login-11-remember" />
                <Label htmlFor="login-11-remember" className="font-normal">
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

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="cursor-pointer font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>

        <IllustrationPanel />
      </div>
    </div>
  )
}
