"use client"

import * as React from "react"
import { StarIcon } from "lucide-react"

import { AppleIcon } from "@/registry/icons/apple"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

import panelImage from "./images/01.webp"
import profileImage from "./images/02.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function QuotePanel({ className }: { className?: string }) {
  const [missing, setMissing] = React.useState(false)

  return (
    <aside
      className={cn(
        "relative min-h-56 w-full overflow-hidden rounded-[12px] bg-muted",
        "aspect-[5/4] max-h-72 md:aspect-auto md:h-[42rem] md:max-h-none md:w-full md:max-w-md md:flex-none",
        className
      )}
    >
      {missing ? null : (
        <img
          src={assetSrc(panelImage)}
          alt=""
          className="absolute inset-0 size-full object-cover"
          onError={() => setMissing(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <figure className="relative flex h-full w-full flex-col justify-end gap-3 p-4 text-start text-white sm:gap-4 sm:p-6">
        <div className="flex gap-1" aria-label="5 out of 5">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className="size-4 fill-current"
              aria-hidden="true"
            />
          ))}
        </div>
        <blockquote className="text-base font-medium leading-snug sm:text-h4">
          I signed up in a minute and had my first project live before lunch.
        </blockquote>
        <figcaption className="flex items-center gap-3">
          <Avatar size="lg" className="ring-2 ring-white/30">
            <AvatarImage src={assetSrc(profileImage)} alt="" />
            <AvatarFallback className="bg-white/20 text-white">LR</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium">Lila Reyes</p>
            <p className="text-sm text-white/80">Designer, Cove Studio</p>
          </div>
        </figcaption>
      </figure>
    </aside>
  )
}

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-background px-4 py-8",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-center md:justify-center md:gap-8">
        <div
          className={cn(
            "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
            "mx-auto flex w-full max-w-md flex-col gap-6 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding) md:mx-0 md:max-w-sm md:shrink-0",
            "shadow-soft",
            ""
          )}

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <header className="space-y-1.5 text-start">
            <h1 className="text-h3 text-foreground">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Name, email, and a password. Google and Apple are optional.
            </p>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="signup-05-name">Name</Label>
              <Input
                id="signup-05-name"
                autoComplete="name"
                placeholder="Lila Reyes"
                required
                className="shadow-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-05-email">Email</Label>
              <Input
                id="signup-05-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className="shadow-none"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signup-05-password">Password</Label>
              <Input
                id="signup-05-password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                required
                className="shadow-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full shadow-none"
            >
              Create account
            </Button>
          </form>

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <div className="grid gap-2">
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted">
              <AppleIcon />
              Continue with Apple
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
        <QuotePanel />
      </div>
    </div>
  )
}
