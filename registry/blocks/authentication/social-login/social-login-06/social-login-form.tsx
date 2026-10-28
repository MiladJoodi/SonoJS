"use client"

import type * as React from "react"
import { CheckIcon, ZapIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const POINTS = [
  "No password to remember",
  "Works across your devices",
  "Takes about two seconds",
] as const

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
      <aside className="relative flex flex-col justify-between gap-8 bg-zinc-950 p-6 text-zinc-50 sm:p-8">
        <div className="space-y-4 text-start">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/20 text-primary">
            <ZapIcon className="size-5" aria-hidden />
          </span>
          <div className="space-y-2">
            <h1 className="text-h3 font-semibold tracking-tight">
              One tap. You&apos;re in.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Social sign-in gets people into the product without another
              password — the default people expect in 2026.
            </p>
          </div>
        </div>
        <ul className="space-y-2.5">
          {POINTS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 text-sm text-zinc-300"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-primary">
                <CheckIcon className="size-3" aria-hidden />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="flex flex-col justify-center gap-6 bg-card p-6 sm:p-8">
        <header className="space-y-1.5 text-start">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="text-sm text-muted-foreground">
            Sign in with a provider or get a magic link.
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
            <Label htmlFor="social-06-email">Email</Label>
            <Input
              id="social-06-email"
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
      </div>
    </div>
  )
}
