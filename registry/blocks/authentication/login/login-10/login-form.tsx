"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex w-full max-w-md flex-col items-center", className)}
      {...props}
    >
      <a
        href="#"
        className="mb-8 inline-flex cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        aria-label="Home"
      >
        <img
          src={assetSrc(logoAsset)}
          alt=""
          aria-hidden="true"
          width={40}
          height={45}
          className="h-11 w-auto"
        />
      </a>

      <div
        className={cn(
          "w-full rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:p-6 md:p-8"
        )}
      >
        <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
          Sign in
        </h1>

        <form
          className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-2">
            <Label htmlFor="login-10-email">Email</Label>
            <Input
              id="login-10-email"
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
            <Label htmlFor="login-10-password">Password</Label>
            <Input
              id="login-10-password"
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
              <Checkbox id="login-10-remember" />
              <Label htmlFor="login-10-remember" className="font-normal">
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
    </div>
  )
}
