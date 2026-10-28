"use client"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"

import coverImage from "./images/cover.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const controlClass = "px-3 shadow-none"

function PhotoPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[12px] bg-muted",
        "aspect-[4/3] max-h-72",
        "md:aspect-auto md:h-full md:min-h-[22rem] md:max-h-none md:max-w-md md:flex-1",
        className
      )}
    >
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
            Reset access in a minute
          </p>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-white/90">
            We send a recovery link — no password guessing required.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center bg-canvas px-4 py-8 md:py-12",
        className
      )}
      {...props}
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-6 md:flex-row md:items-stretch md:gap-8">
        <PhotoPanel className="order-2 md:order-1" />

        <div
          className={cn(
            "order-1 mx-auto flex w-full max-w-md flex-col justify-center gap-6 rounded-[12px] border border-border/70 bg-card p-6 shadow-soft sm:p-8",
            "md:order-2 md:mx-0 md:max-w-sm md:shrink-0"
          )}
        >
          <header className="flex flex-col items-start gap-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <div className="space-y-1.5">
              <h1 className="text-h3 text-foreground">Forgot password?</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and we will send a recovery link.
              </p>
            </div>
          </header>

          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-2">
              <Label htmlFor="forgot-02-email">Email</Label>
              <Input
                id="forgot-02-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@example.com"
                required
                className={controlClass}
              />
            </div>
            <Button type="submit" className="mt-1 w-full cursor-pointer shadow-none">
              Send recovery link
            </Button>
          </form>

          <p className="text-sm text-muted-foreground">
            Remembered it?{" "}
            <a
              href="#"
              className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
            >
              Back to sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
