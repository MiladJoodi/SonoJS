"use client"

import { AppleIcon } from "@/registry/icons/apple"
import { FacebookIcon } from "@/registry/icons/facebook"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"

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
        "[--login-card-padding:1.5rem] sm:[--login-card-padding:2rem]",
        "flex w-full flex-col gap-8 rounded-[12px] border border-border/70 bg-card p-(--login-card-padding)",
        "shadow-soft",
        className
      )}
      {...props}
    >
      <header className="flex flex-col items-start gap-3">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <div className="space-y-1.5">
          <h1 className="text-h3 text-foreground">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Continue with a social account. No password needed.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-2">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            className="h-[46px] w-full justify-start gap-3 rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
