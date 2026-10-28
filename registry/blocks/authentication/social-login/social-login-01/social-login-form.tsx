"use client"

import type * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const providers = [
  { name: "Continue with Google", Icon: GoogleIcon },
  { name: "Continue with Apple", Icon: AppleIcon },
  { name: "Continue with GitHub", Icon: GithubIcon },
  { name: "Continue with Facebook", Icon: FacebookIcon },
] as const

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
      <header className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="text-h3 font-semibold tracking-tight text-foreground">
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Continue with a social account. No password needed.
        </p>
      </header>

      <div className="flex flex-col gap-2">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            className="h-[46px] w-full cursor-pointer justify-start gap-3 rounded-[12px] border-border/70 bg-card hover:bg-muted"
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create account
        </a>
      </p>
    </div>
  )
}
