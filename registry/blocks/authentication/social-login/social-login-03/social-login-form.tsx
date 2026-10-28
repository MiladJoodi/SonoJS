"use client"

import type * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { XIcon } from "@/registry/icons/x"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

const providers = [
  { name: "Google", Icon: GoogleIcon },
  { name: "Apple", Icon: AppleIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "Facebook", Icon: FacebookIcon },
  { name: "X", Icon: XIcon },
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
          Pick a provider. Icon-only buttons keep the card compact.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            size="icon"
            aria-label={`Continue with ${name}`}
            className="size-[46px] cursor-pointer rounded-[12px] border-border/70 bg-card hover:bg-muted"
          >
            <Icon />
          </Button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        or{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          continue with email
        </a>
      </p>
    </div>
  )
}
