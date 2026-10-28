"use client"

import type * as React from "react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { Button } from "@sonojs/ui/components/button"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

import coverImage from "./images/cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

export default function SocialLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid w-full overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft lg:grid-cols-2",
        className
      )}
      {...props}
    >
      <aside className="relative min-h-56 overflow-hidden bg-muted lg:min-h-[22rem]">
        <img
          src={assetSrc(coverImage)}
          alt=""
          width={720}
          height={540}
          className="absolute inset-0 size-full object-cover"
          decoding="async"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 text-start sm:p-5">
          <div className="rounded-[12px] bg-black/70 px-4 py-3 backdrop-blur-[2px]">
            <p className="text-sm font-semibold text-white">
              Pick up where you left off
            </p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/90">
              One tap with Google or Apple — your workspace stays in sync.
            </p>
          </div>
        </div>
      </aside>

      <div className="flex flex-col justify-center gap-6 p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h1 className="text-h3 font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with a social account to continue.
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
    </div>
  )
}
