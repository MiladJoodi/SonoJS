"use client"

import type * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

export default function SocialLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-1.5 text-start">
        <h1 className="text-h3 font-semibold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Continue with a provider, or get a magic link by email.
        </p>
      </header>

      <div className="grid gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full cursor-pointer rounded-[12px] border-border/70 bg-card hover:bg-muted"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full cursor-pointer rounded-[12px] border-border/70 bg-card hover:bg-muted"
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
          <Label htmlFor="social-02-email">Email</Label>
          <Input
            id="social-02-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Send magic link
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Prefer a password?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Use a password instead
        </a>
      </p>
    </div>
  )
}
