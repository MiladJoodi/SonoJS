"use client"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GoogleIcon } from "@/registry/icons/google"
import { XIcon } from "@/registry/icons/x"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

const providers = [
  { name: "Google", Icon: GoogleIcon },
  { name: "Facebook", Icon: FacebookIcon },
  { name: "X", Icon: XIcon },
] as const

export default function LoginForm({
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
            We email you a link. No password.
          </p>
        </div>
      </header>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-2">
          <Label htmlFor="passwordless-email">Email</Label>
          <Input
            id="passwordless-email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className="shadow-none"
          />
        </div>
        <Button
          type="submit"
          className="mt-1 w-full shadow-none"
        >
          Email me a link
        </Button>
      </form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {providers.map(({ name, Icon }) => (
          <Button
            key={name}
            type="button"
            variant="outline"
            className="h-[46px] w-full rounded-[12px] border-border/70 bg-card shadow-none hover:bg-muted"
          >
            <Icon />
            <span className="sr-only">{name}</span>
          </Button>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New here?{" "}
        <a
          href="#"
          className="cursor-pointer font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </a>
      </p>
    </div>
  )
}
