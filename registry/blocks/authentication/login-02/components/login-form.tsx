"use client"

import { FacebookIcon } from "@/registry/icons/facebook"
import { GoogleIcon } from "@/registry/icons/google"
import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import { Checkbox } from "@sonojs/ui/components/checkbox"
import { Input } from "@sonojs/ui/components/input"
import { Label } from "@sonojs/ui/components/label"
import { Separator } from "@sonojs/ui/components/separator"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      <header className="space-y-1.5 text-start">
        <h1 className="text-h3 text-foreground">Sign in</h1>
        <p dir="ltr" className="text-end text-sm text-muted-foreground">
          Use Google, Facebook, or your email.
        </p>
      </header>

      <div className="grid gap-2">
        <Button type="button" variant="outline" className="h-[46px] w-full">
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button type="button" variant="outline" className="h-[46px] w-full">
          <FacebookIcon />
          Continue with Facebook
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
          <Label htmlFor="social-email">Email</Label>
          <Input
            id="social-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className="h-[46px]"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="social-password">Password</Label>
          <Input
            id="social-password"
            type="password"
            autoComplete="current-password"
            required
            className="h-[46px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="social-remember" />
          <Label htmlFor="social-remember" className="font-normal">
            Remember me
          </Label>
          <a
            href="#"
            className="ms-auto cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <span dir="ltr">Forgot password?</span>
          </a>
        </div>
        <Button type="submit" className="h-[46px] w-full">
          Sign in
        </Button>
      </form>

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
