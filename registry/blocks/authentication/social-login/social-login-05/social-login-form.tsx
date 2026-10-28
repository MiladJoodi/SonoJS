"use client"

import type * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
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
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Continue with the provider you used last time, or pick another.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          className="relative h-[46px] w-full cursor-pointer justify-start gap-3 rounded-[12px]"
        >
          <span className="flex size-5 items-center justify-center rounded-sm bg-white">
            <GoogleIcon className="size-4" />
          </span>
          Continue with Google
          <Badge className="absolute end-3 border-0 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
            Last used
          </Badge>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full cursor-pointer justify-start gap-3 rounded-[12px] border-border/70 bg-card hover:bg-muted"
        >
          <AppleIcon />
          Continue with Apple
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-[46px] w-full cursor-pointer justify-start gap-3 rounded-[12px] border-border/70 bg-card hover:bg-muted"
        >
          <GithubIcon />
          Continue with GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Prefer email?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in with password
        </a>
      </p>
    </div>
  )
}
