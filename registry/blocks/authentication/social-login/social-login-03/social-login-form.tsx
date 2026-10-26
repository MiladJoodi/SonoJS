"use client"

import { AppleIcon } from "@/registry/icons/apple"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

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
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_28px_56px_-28px_rgba(10,10,12,0.18)]",
        "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_28px_56px_-28px_rgba(0,0,0,0.48)]",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Pick a provider. Icon-only buttons keep the card compact.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            size="icon"
            aria-label={name}
            className="size-[46px] rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  )
}
