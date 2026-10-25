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
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <header className="space-y-1.5 text-start">
        <h1 className="text-h3 text-foreground">Sign in</h1>
        <p className="text-start text-sm text-muted-foreground">
          <span dir="ltr">We email you a link. No password.</span>
        </p>
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
            autoComplete="email"
            placeholder="name@example.com"
            required
            className="h-[46px]"
          />
        </div>
        <Button type="submit" className="h-[46px] w-full">
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
            className="h-[46px] w-full"
          >
            <Icon />
            <span className="sr-only">{name}</span>
          </Button>
        ))}
      </div>

      <p dir="ltr" className="text-center text-sm text-muted-foreground">
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
